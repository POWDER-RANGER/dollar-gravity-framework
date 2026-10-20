import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import { PageHeader } from "../components/ui.jsx";
import {
  NODES, LINKS, NODE_BY_ID, GROUP_COLORS, GROUP_LABELS, DEGREE, TOP_DEGREE, GRAPH_STATS, flat,
} from "../data/graph.js";

const radius = (id) => 16 + DEGREE[id] * 1.6;
const GROUPS = Object.keys(GROUP_COLORS);

/** Anchor each group on a ring so clusters form predictably. */
function groupAnchors(w, h) {
  const R = Math.min(w, h) * 0.32;
  const ring = GROUPS.filter((g) => g !== "monetary");
  const out = { monetary: [w / 2, h / 2] };
  ring.forEach((g, i) => {
    const a = (i / ring.length) * Math.PI * 2 - Math.PI / 2;
    out[g] = [w / 2 + Math.cos(a) * R * (w / h > 1.3 ? 1.35 : 1), h / 2 + Math.sin(a) * R];
  });
  return out;
}

export default function PageGraph() {
  const wrapRef = useRef(null);
  const svgRef = useRef(null);
  const api = useRef({});            // imperative handles (zoom, reheat)
  const [width, setWidth] = useState(0);
  const [selected, setSelected] = useState(null);
  const [off, setOff] = useState(() => new Set());

  // Track container width.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let t;
    const ro = new ResizeObserver(([e]) => {
      clearTimeout(t);
      t = setTimeout(() => setWidth(Math.round(e.contentRect.width)), 120);
    });
    ro.observe(el);
    setWidth(Math.round(el.clientWidth));
    return () => { ro.disconnect(); clearTimeout(t); };
  }, []);

  const select = useCallback((id) => setSelected((cur) => (cur === id ? null : id)), []);

  // Build graph (re-runs only when the container width changes).
  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl || !width) return;
    const height = svgEl.clientHeight || 600;
    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${width} ${height}`).attr("role", "group")
      .attr("aria-label", `Interactive system map with ${GRAPH_STATS.nodes} nodes and ${GRAPH_STATS.links} links`);

    const nodes = NODES.map((n) => ({ ...n }));
    const links = LINKS.map((l) => ({ ...l }));
    const anchors = groupAnchors(width, height);

    nodes.forEach((n) => {
      const [ax, ay] = anchors[n.group];
      n.x = ax + (Math.random() - 0.5) * 60;
      n.y = ay + (Math.random() - 0.5) * 60;
    });

    const sim = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d) => d.id).distance(105).strength(0.26))
      .force("charge", d3.forceManyBody().strength(-520))
      .force("x", d3.forceX((d) => anchors[d.group][0]).strength(0.16))
      .force("y", d3.forceY((d) => anchors[d.group][1]).strength(0.16))
      .force("collide", d3.forceCollide((d) => radius(d.id) + 28))
      .stop();
    for (let i = 0; i < 320; i++) sim.tick();   // settle before first paint

    // Defs: one arrow marker per group colour.
    const defs = svg.append("defs");
    GROUPS.forEach((g) => {
      defs.append("marker").attr("id", `arrow-${g}`).attr("viewBox", "0 -5 10 10")
        .attr("refX", 10).attr("refY", 0).attr("markerWidth", 6).attr("markerHeight", 6).attr("orient", "auto")
        .append("path").attr("d", "M0,-4L10,0L0,4").attr("fill", GROUP_COLORS[g]).attr("fill-opacity", 0.75);
    });

    const root = svg.append("g").attr("class", "zoom-root");

    const linkSel = root.append("g").selectAll("g").data(links).join("g").attr("class", "glink");
    const line = linkSel.append("line")
      .attr("stroke", (d) => GROUP_COLORS[NODE_BY_ID[d.source.id ?? d.source].group])
      .attr("stroke-opacity", 0.38).attr("stroke-width", 1.3)
      .attr("marker-end", (d) => `url(#arrow-${NODE_BY_ID[d.source.id ?? d.source].group})`);
    const linkLabel = linkSel.append("text")
      .attr("text-anchor", "middle").attr("font-size", 10).attr("font-family", "ui-monospace, monospace")
      .attr("fill", "#cbd5e1").attr("paint-order", "stroke").attr("stroke", "#050b17").attr("stroke-width", 3)
      .attr("opacity", 0).text((d) => d.label);

    const nodeSel = root.append("g").selectAll("g").data(nodes).join("g")
      .attr("class", "gnode").attr("tabindex", 0).attr("role", "button").attr("cursor", "pointer")
      .attr("aria-label", (d) => `${flat(d.label)}, ${GROUP_LABELS[d.group]}, ${DEGREE[d.id]} connections`)
      .on("click", (e, d) => { if (!e.defaultPrevented) select(d.id); })
      .on("keydown", (e, d) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(d.id); } })
      .call(d3.drag()
        .on("start", (e, d) => { if (!e.active) sim.alphaTarget(0.25).restart(); d.fx = d.x; d.fy = d.y; })
        .on("drag", (e, d) => { d.fx = e.x; d.fy = e.y; })
        .on("end", (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }));

    nodeSel.append("circle").attr("class", "ring").attr("r", (d) => radius(d.id) + 5)
      .attr("fill", (d) => GROUP_COLORS[d.group]).attr("fill-opacity", 0.1)
      .attr("stroke", (d) => GROUP_COLORS[d.group]).attr("stroke-opacity", 0.55).attr("stroke-width", 1.4);
    nodeSel.append("circle").attr("r", (d) => radius(d.id) - 3).attr("fill", "#050b17")
      .attr("stroke", (d) => GROUP_COLORS[d.group]).attr("stroke-opacity", 0.5);
    nodeSel.append("text").attr("text-anchor", "middle").attr("dy", "0.35em")
      .attr("font-size", 12).attr("font-weight", 700).attr("font-family", "ui-monospace, monospace")
      .attr("fill", (d) => GROUP_COLORS[d.group]).attr("pointer-events", "none").text((d) => DEGREE[d.id]);
    nodeSel.append("text").attr("class", "nlabel").attr("text-anchor", "middle").attr("pointer-events", "none")
      .attr("font-size", 11).attr("font-family", "ui-monospace, monospace").attr("font-weight", 600)
      .attr("fill", "#e2e8f0").attr("paint-order", "stroke").attr("stroke", "#050b17").attr("stroke-width", 3.5)
      .each(function (d) {
        const lines = d.label.split("\n");
        const el = d3.select(this);
        lines.forEach((ln, i) => el.append("tspan").attr("x", 0).attr("dy", i === 0 ? radius(d.id) + 16 : 12).text(ln));
      });

    const place = () => {
      line.each(function (d) {
        const rs = radius(d.source.id), rt = radius(d.target.id) + 6;
        const dx = d.target.x - d.source.x, dy = d.target.y - d.source.y;
        const dist = Math.hypot(dx, dy) || 1;
        d3.select(this)
          .attr("x1", d.source.x + (dx / dist) * rs).attr("y1", d.source.y + (dy / dist) * rs)
          .attr("x2", d.target.x - (dx / dist) * rt).attr("y2", d.target.y - (dy / dist) * rt);
      });
      linkLabel.attr("x", (d) => (d.source.x + d.target.x) / 2).attr("y", (d) => (d.source.y + d.target.y) / 2 - 4);
      nodeSel.attr("transform", (d) => `translate(${d.x},${d.y})`);
    };
    place();
    sim.on("tick", place);

    // Zoom / pan: wheel zoom needs Ctrl/Cmd so the page can still scroll.
    const zoom = d3.zoom().scaleExtent([0.5, 3])
      .filter((e) => (e.type === "wheel" ? e.ctrlKey || e.metaKey : !e.button && e.type !== "dblclick"))
      .on("zoom", (e) => root.attr("transform", e.transform));
    svg.call(zoom);
    const fit = () => {
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      nodes.forEach((n) => {
        const r = radius(n.id);
        x0 = Math.min(x0, n.x - r - 50); x1 = Math.max(x1, n.x + r + 50);
        y0 = Math.min(y0, n.y - r - 12); y1 = Math.max(y1, n.y + r + 40);
      });
      const k = Math.min(1.15, width / (x1 - x0), height / (y1 - y0));
      return d3.zoomIdentity.translate(width / 2 - ((x0 + x1) / 2) * k, height / 2 - ((y0 + y1) / 2) * k).scale(k);
    };
    svg.call(zoom.transform, fit());
    api.current = {
      zoomIn: () => svg.transition().duration(200).call(zoom.scaleBy, 1.35),
      zoomOut: () => svg.transition().duration(200).call(zoom.scaleBy, 1 / 1.35),
      reset: () => {
        nodes.forEach((n) => { n.fx = n.fy = null; });
        sim.alpha(0.5).restart();
        setTimeout(() => svg.transition().duration(300).call(zoom.transform, fit()), 600);
      },
      nodeSel, linkSel, line, linkLabel,
    };

    return () => { sim.stop(); svg.on(".zoom", null); };
  }, [width, select]);

  // Apply selection + filter styling without rebuilding the graph.
  useEffect(() => {
    const { nodeSel, linkSel, line, linkLabel } = api.current;
    if (!nodeSel) return;
    const nb = new Set();
    if (selected) {
      nb.add(selected);
      LINKS.forEach((l) => { if (l.source === selected) nb.add(l.target); if (l.target === selected) nb.add(l.source); });
    }
    const visible = (id) => !off.has(NODE_BY_ID[id].group);
    nodeSel.attr("opacity", (d) => (!visible(d.id) ? 0.07 : selected && !nb.has(d.id) ? 0.2 : 1))
      .style("pointer-events", (d) => (visible(d.id) ? "all" : "none"))
      .attr("tabindex", (d) => (visible(d.id) ? 0 : -1))
      .attr("aria-pressed", (d) => (d.id === selected ? "true" : "false"));
    nodeSel.select("circle.ring").attr("stroke-width", (d) => (d.id === selected ? 3 : 1.4))
      .attr("fill-opacity", (d) => (d.id === selected ? 0.28 : 0.1));
    const hot = (d) => selected && (d.source.id === selected || d.target.id === selected);
    const lvis = (d) => visible(d.source.id) && visible(d.target.id);
    linkSel.attr("opacity", (d) => (!lvis(d) ? 0.04 : selected && !hot(d) ? 0.08 : 1));
    line.attr("stroke-opacity", (d) => (hot(d) ? 0.95 : 0.38)).attr("stroke-width", (d) => (hot(d) ? 2.2 : 1.3));
    linkLabel.attr("opacity", (d) => (hot(d) && lvis(d) ? 1 : 0));
  }, [selected, off, width]);

  const toggleGroup = (g) => setOff((cur) => {
    const next = new Set(cur);
    next.has(g) ? next.delete(g) : next.add(g);
    return next;
  });

  const detail = useMemo(() => {
    if (!selected) return null;
    const n = NODE_BY_ID[selected];
    return {
      n,
      out: LINKS.filter((l) => l.source === selected),
      inc: LINKS.filter((l) => l.target === selected),
    };
  }, [selected]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div>
      <PageHeader eyebrow="Module 09 · System map" title="Node interplay" color="#60a5fa"
        lede={`${GRAPH_STATS.nodes} nodes, ${GRAPH_STATS.links} directed links, ${GRAPH_STATS.groups} groups. Click or tab to a node to trace its connections. Number = links. Drag to rearrange.`} />

      <div className="legend" role="group" aria-label="Filter by group">
        {GROUPS.map((g) => (
          <button key={g} type="button" className={`chip${off.has(g) ? " off" : ""}`}
            style={{ "--c": GROUP_COLORS[g] }} aria-pressed={!off.has(g)} onClick={() => toggleGroup(g)}>
            <i /> {GROUP_LABELS[g]}
          </button>
        ))}
        {off.size > 0 && (
          <button type="button" className="chip" style={{ "--c": "#9fb0c6" }} onClick={() => setOff(new Set())}>Show all</button>
        )}
      </div>

      <div className="graph-wrap">
        <div className="graph-stage" ref={wrapRef}>
          <svg ref={svgRef} />
          <div className="graph-tools">
            <button type="button" onClick={() => api.current.zoomIn?.()} aria-label="Zoom in">+</button>
            <button type="button" onClick={() => api.current.zoomOut?.()} aria-label="Zoom out">−</button>
            <button type="button" onClick={() => api.current.reset?.()}>Reset</button>
          </div>
          <div className="graph-hint">Ctrl/⌘ + scroll to zoom · Esc to clear</div>
        </div>

        <aside className="detail" aria-live="polite" style={detail ? { "--c": GROUP_COLORS[detail.n.group] } : undefined}>
          {detail ? (
            <>
              <div className="detail-group">{GROUP_LABELS[detail.n.group]}</div>
              <div className="detail-name">{flat(detail.n.label)}</div>
              <p className="detail-about">{detail.n.about}</p>
              {detail.out.length > 0 && (
                <>
                  <h4>Acts on ({detail.out.length})</h4>
                  <ul>{detail.out.map((l, i) => (
                    <li key={i}><em>{l.label} →</em> <button type="button" style={{ "--c": GROUP_COLORS[NODE_BY_ID[l.target].group] }} onClick={() => setSelected(l.target)}>{flat(NODE_BY_ID[l.target].label)}</button></li>
                  ))}</ul>
                </>
              )}
              {detail.inc.length > 0 && (
                <>
                  <h4>Acted on by ({detail.inc.length})</h4>
                  <ul>{detail.inc.map((l, i) => (
                    <li key={i}><button type="button" style={{ "--c": GROUP_COLORS[NODE_BY_ID[l.source].group] }} onClick={() => setSelected(l.source)}>{flat(NODE_BY_ID[l.source].label)}</button> <em>→ {l.label}</em></li>
                  ))}</ul>
                </>
              )}
            </>
          ) : (
            <div className="detail-empty">
              Select a node to see what it acts on, what acts on it, and the nature of each link. Edges are
              analytical claims, not measurements; each is a hypothesis the falsifiers can test.
            </div>
          )}
        </aside>
      </div>

      <div className="degree">
        <div className="eyebrow">Most connected nodes (computed from the graph)</div>
        {TOP_DEGREE.map((n) => (
          <div className="degree-row" key={n.id}>
            <button type="button" onClick={() => { setSelected(n.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              <i style={{ background: GROUP_COLORS[n.group] }} /> {flat(n.label)}
            </button>
            <span className="n">{n.degree} links</span>
          </div>
        ))}
      </div>
    </div>
  );
}
