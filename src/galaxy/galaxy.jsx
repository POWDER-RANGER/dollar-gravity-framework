import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { COUNTRY_BY_ID, REL_TYPES, SCENARIOS, SCENARIO_IDS, countries, relationships } from "./data.js";
import "./galaxy.css";

const GalaxyCanvas = lazy(() => import("./scene.jsx"));

const REPO = "https://github.com/POWDER-RANGER/dollar-gravity-framework";
const DEFAULT_LAYERS = { fabric: true, lines: true, rings: true, labels: true, rotate: false };

/* ── helpers ─────────────────────────────────────────────────────────── */
function useMedia(query) {
  const [m, setM] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setM(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return m;
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch { return false; }
}

function readHash() {
  const p = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const c = p.get("c"), s = p.get("s");
  return { c: COUNTRY_BY_ID[c] ? c : null, s: SCENARIOS[s] ? s : "baseline" };
}

const pct = (v) => `${Math.round(v * 100)}%`;
const csvCell = (v) => `"${String(v).replace(/"/g, '""')}"`;

/* ── small UI pieces ─────────────────────────────────────────────────── */
function Slider({ id, label, hint, value, onChange }) {
  return (
    <div className="g-field">
      <div className="g-row"><label htmlFor={id}>{label}</label><output htmlFor={id}>{pct(value)}</output></div>
      <input id={id} type="range" min="0" max="100" value={Math.round(value * 100)} onChange={(e) => onChange(e.target.value / 100)} aria-describedby={`${id}-h`} />
      <small id={`${id}-h`}>{hint}</small>
    </div>
  );
}

function Check({ checked, onChange, children }) {
  return <label className="g-check"><input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />{children}</label>;
}

function Meter({ label, value, color, suffix }) {
  return (
    <div className="g-meter">
      <div className="g-row"><span>{label}</span><b>{suffix ?? pct(value)}</b></div>
      <div className="g-track"><i style={{ width: `${Math.min(100, value * 100)}%`, background: color }} /></div>
    </div>
  );
}

function Modal({ title, onClose, children, wide }) {
  const ref = useRef(null);
  useEffect(() => {
    const prev = document.activeElement;
    ref.current?.focus();
    return () => prev?.focus?.();
  }, []);
  return (
    <div className="g-modal-bg" onClick={onClose}>
      <section className={`g-modal${wide ? " wide" : ""}`} role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()} tabIndex={-1} ref={ref}>
        <div className="g-modal-head"><h2>{title}</h2><button type="button" className="g-btn" onClick={onClose}>Close <kbd>Esc</kbd></button></div>
        <div className="g-modal-body">{children}</div>
      </section>
    </div>
  );
}

/* ── data table ──────────────────────────────────────────────────────── */
const COLS = [
  { key: "name", label: "Body", num: false },
  { key: "mass", label: "Power mass", num: true },
  { key: "threat", label: "Threat", num: true },
  { key: "usdDep", label: "USD integration", num: true },
  { key: "nuclear", label: "Warheads (approx.)", num: true },
  { key: "rank", label: "Dataset rank", num: true },
];

function DataTable({ bodies, scenarioId, onPick }) {
  const [sort, setSort] = useState({ key: "mass", dir: -1 });
  const [q, setQ] = useState("");
  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = bodies.filter((b) => !needle || b.name.toLowerCase().includes(needle) || b.id.toLowerCase().includes(needle));
    return list.sort((a, b) => {
      const x = a[sort.key], y = b[sort.key];
      return (typeof x === "string" ? x.localeCompare(y) : x - y) * sort.dir;
    });
  }, [bodies, sort, q]);

  const exportCsv = () => {
    const head = ["id", "name", "power_mass_effective", "power_mass_base", "threat", "usd_integration", "warheads_approx", "dataset_rank", "scenario"];
    const lines = [head.join(",")].concat(
      bodies.map((b) => [b.id, b.name, b.mass.toFixed(3), b.baseMass, b.threat, b.usdDep, b.nuclear, b.rank, scenarioId].map(csvCell).join(",")),
    );
    const url = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/csv" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: `dollar-gravity-galaxy-${scenarioId}.csv` });
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <>
      <div className="g-table-tools">
        <input type="search" placeholder="Filter bodies…" aria-label="Filter bodies" value={q} onChange={(e) => setQ(e.target.value)} />
        <button type="button" className="g-btn" onClick={exportCsv}>Export CSV</button>
        <span className="g-muted">{rows.length} of {bodies.length} · scenario: {SCENARIOS[scenarioId].label}</span>
      </div>
      <div className="g-table-wrap">
        <table className="g-table">
          <thead>
            <tr>
              {COLS.map((c) => (
                <th key={c.key} scope="col" className={c.num ? "num" : ""} aria-sort={sort.key === c.key ? (sort.dir > 0 ? "ascending" : "descending") : "none"}>
                  <button type="button" onClick={() => setSort((s) => ({ key: c.key, dir: s.key === c.key ? -s.dir : c.key === "name" || c.key === "rank" ? 1 : -1 }))}>
                    {c.label}{sort.key === c.key ? (sort.dir > 0 ? " ▲" : " ▼") : ""}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((b) => (
              <tr key={b.id}>
                <th scope="row"><button type="button" onClick={() => onPick(b.id)}>{b.name}</button></th>
                <td className="num">{b.mass.toFixed(2)}{b.mass !== b.baseMass && <span className="g-muted"> (base {b.baseMass.toFixed(2)})</span>}</td>
                <td className="num">{pct(b.threat)}</td>
                <td className="num">{pct(b.usdDep)}</td>
                <td className="num">{b.nuclear ? b.nuclear.toLocaleString() : b.nuclearNow ? "scenario" : "—"}</td>
                <td className="num">#{b.rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ── about / method ──────────────────────────────────────────────────── */
function About() {
  return (
    <div className="g-prose">
      <p className="g-warn"><b>This is a schematic, not a measurement.</b> It illustrates the framework’s idea (a reserve-currency “singularity” bending the incentives of every other state) and should not be cited as data.</p>
      <h3>How to read it</h3>
      <ul>
        <li><b>Sphere size and fabric depth</b>: power mass, a composite of economic weight, military capability and reserve-currency role. The United States is 1.19 by construction.</li>
        <li><b>Gold ring</b>: integration with dollar rails and reserves (opacity = score × dollar pull).</li>
        <li><b>Halo</b>: nuclear-armed state. <b>Red glow</b> on Iran: latent threshold state, scaled by the ISR slider.</li>
        <li><b>Edges</b>: framework-asserted relationships. Toggle each type in the legend. The Russia→Iran ISR edge is unverified.</li>
        <li><b>Position</b>: arranged for legibility. Distance and height mean nothing.</li>
      </ul>
      <h3>What is and is not sourced</h3>
      <ul>
        <li>Power mass, threat and USD-integration scores are <b>hand-assigned</b> in the original v4.0 build. They are judgments, not measurements.</li>
        <li>Warhead counts are approximate stockpile estimates carried over from v4.0 and <b>were not re-verified</b> in rev 2.2. Check SIPRI or the Federation of American Scientists before citing.</li>
        <li>“Dataset rank” is the ordinal in the original dataset (Global Firepower style). It is not re-verified.</li>
        <li>Scenario presets use <b>arbitrary visual weights</b> to show direction of change. They are not forecasts.</li>
        <li>Dated, sourced figures about the real world live on the main site’s <a href="../#/sources">Sources page</a>.</li>
      </ul>
      <h3>Editing the data</h3>
      <p>All 50 bodies, relationships and scenarios are in <code>src/galaxy/data.js</code>. <a href={`${REPO}/blob/main/docs/METHODOLOGY.md`} target="_blank" rel="noopener noreferrer">Methodology</a> · <a href={REPO} target="_blank" rel="noopener noreferrer">Source</a></p>
    </div>
  );
}

/* ── detail panel ────────────────────────────────────────────────────── */
function Detail({ body, bodies, rank, onClose, onPick }) {
  const rels = relationships.filter((r) => r.from === body.id || r.to === body.id);
  const name = (id) => COUNTRY_BY_ID[id].name;
  return (
    <aside className="g-panel g-detail" aria-label={`${body.name} detail`}>
      <header>
        <h2 style={{ borderColor: body.color }}>{body.name}</h2>
        <button type="button" className="g-x" onClick={onClose} aria-label="Close detail">✕</button>
      </header>
      <Meter label="Power mass" value={body.mass / 1.2} color="#60a5fa" suffix={`${body.mass.toFixed(2)}${body.baseMass !== body.mass ? ` · base ${body.baseMass.toFixed(2)}` : ""}`} />
      <Meter label="Threat posture" value={body.threat} color="#fb7185" />
      <Meter label="USD integration" value={body.usdDep} color="#fbbf24" />
      <dl className="g-facts">
        <div><dt>Mass rank</dt><dd>#{rank} of {bodies.length}</dd></div>
        <div><dt>Dataset rank</dt><dd>#{body.rank}</dd></div>
        <div><dt>Warheads (approx.)</dt><dd>{body.nuclear ? body.nuclear.toLocaleString() : body.nuclearNow ? "none (scenario: acquired)" : "none"}</dd></div>
      </dl>
      <h3>Relationships</h3>
      {rels.length === 0 && <p className="g-muted">No relationship edges in the current dataset.</p>}
      <ul className="g-rels">
        {rels.map((r, i) => {
          const other = r.from === body.id ? r.to : r.from;
          const t = REL_TYPES[r.type];
          return (
            <li key={i}>
              <span className="swatch" style={{ background: t.color }} aria-hidden="true" />
              <div>
                <button type="button" className="g-link" onClick={() => onPick(other)}>{r.from === body.id ? "→" : "←"} {name(other)}</button>
                <span className="g-muted"> {t.label}</span>
                <p>{r.basis} {r.source && <a href={`../#/sources/${r.source}`}>Source</a>}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="g-foot">Scores are hand-assigned judgments. See About.</p>
    </aside>
  );
}

/* ── app ─────────────────────────────────────────────────────────────── */
function App() {
  const init = useMemo(readHash, []);
  const narrow = useMedia("(max-width: 760px)");
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const webgl = useMemo(hasWebGL, []);

  const [scenarioId, setScenarioId] = useState(init.s);
  const [ctl, setCtl] = useState(SCENARIOS[init.s].controls);
  const [modified, setModified] = useState(false);
  const [layers, setLayers] = useState(DEFAULT_LAYERS);
  const [hiddenTypes, setHidden] = useState(() => new Set());
  const [selectedId, setSelectedId] = useState(init.c);
  const [focusRequest, setFocusRequest] = useState(init.c ? { id: init.c, n: 1 } : null);
  const [panel, setPanel] = useState(() => (window.matchMedia("(max-width: 760px)").matches ? null : "controls"));
  const [modal, setModal] = useState(webgl ? null : "table");
  const [ready, setReady] = useState(false);
  const [q, setQ] = useState("");
  const nRef = useRef(1);

  const scenario = SCENARIOS[scenarioId];
  const bodies = useMemo(() => countries.map((c) => {
    const mult = scenario.massMult[c.id] ?? 1;
    const nuclearNow = c.nuclear > 0 || scenario.nuclear.includes(c.id);
    return {
      ...c, baseMass: c.mass, mass: c.mass * mult, size: c.size * Math.pow(mult, 0.4),
      nuclearNow, haloColor: c.haloColor || (nuclearNow ? "#ff3300" : null),
    };
  }), [scenario]);
  const masses = useMemo(() => Float32Array.from(bodies.map((b) => b.mass)), [bodies]);
  const massRank = useMemo(() => Object.fromEntries([...bodies].sort((a, b) => b.mass - a.mass).map((b, i) => [b.id, i + 1])), [bodies]);
  const selected = selectedId ? bodies.find((b) => b.id === selectedId) : null;

  const matches = useMemo(() => {
    const n = q.trim().toLowerCase();
    return n ? bodies.filter((b) => b.name.toLowerCase().includes(n) || b.id.toLowerCase() === n).slice(0, 6) : [];
  }, [q, bodies]);

  // Selection and scenario live in the URL hash so views can be shared.
  useEffect(() => {
    const p = new URLSearchParams();
    if (selectedId) p.set("c", selectedId);
    if (scenarioId !== "baseline") p.set("s", scenarioId);
    const h = p.toString();
    window.history.replaceState(null, "", h ? `#${h}` : window.location.pathname + window.location.search);
  }, [selectedId, scenarioId]);

  const focus = useCallback((id) => { nRef.current += 1; setFocusRequest({ id, n: nRef.current }); }, []);

  // Back/forward or a hand-edited hash updates the view.
  useEffect(() => {
    const on = () => {
      const h = readHash();
      setScenarioId(h.s); setCtl(SCENARIOS[h.s].controls); setModified(false);
      setSelectedId(h.c);
      if (h.c) focus(h.c);
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, [focus]);
  const pick = useCallback((id) => {
    setSelectedId(id);
    if (id) { focus(id); setModal(null); if (window.matchMedia("(max-width: 760px)").matches) setPanel(null); }
  }, [focus]);
  const select = useCallback((id) => { setSelectedId(id); }, []);

  const applyScenario = (id) => {
    setScenarioId(id); setCtl(SCENARIOS[id].controls); setModified(false);
    if (id === "iran-breakout") { setSelectedId("IRN"); focus("IRN"); }
  };
  const setCtlKey = (k) => (v) => { setCtl((c) => ({ ...c, [k]: v })); setModified(true); };
  const reset = () => {
    setScenarioId("baseline"); setCtl(SCENARIOS.baseline.controls); setModified(false);
    setLayers(DEFAULT_LAYERS); setHidden(new Set()); setSelectedId(null); setQ(""); focus("__home");
  };
  const toggleType = (t) => setHidden((s) => { const n = new Set(s); n.has(t) ? n.delete(t) : n.add(t); return n; });
  const openPanel = (p) => { setPanel((cur) => (cur === p ? null : p)); };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (modal) setModal(null);
      else if (selectedId) setSelectedId(null);
      else if (panel && narrow) setPanel(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal, selectedId, panel, narrow]);

  const showDetail = selected && !(narrow && panel);

  return (
    <div className="g-app">
      <header className="g-bar">
        <a className="g-back" href="../">← <span>FRAMEWORK</span></a>
        <div className="g-title"><b>DOLLAR GRAVITY</b> <span>GALAXY v4.0</span></div>
        <span className="g-badge" title="Scores are hand-assigned; see About">ILLUSTRATIVE MODEL</span>
        <nav className="g-actions" aria-label="Panels">
          <button type="button" className="g-btn" aria-pressed={panel === "controls"} onClick={() => openPanel("controls")}>Controls</button>
          <button type="button" className="g-btn" aria-pressed={panel === "legend"} onClick={() => openPanel("legend")}>Legend</button>
          <button type="button" className="g-btn" onClick={() => setModal("table")}>Data table</button>
          <button type="button" className="g-btn" onClick={() => setModal("about")}>About</button>
        </nav>
      </header>

      <main className="g-main">
      <div className="g-canvas" role="img" aria-label="Interactive 3D map of 50 sovereign bodies warping a gravity fabric by power mass. Use the Data table button for an accessible version.">
        {webgl ? (
          <Suspense fallback={null}>
            <GalaxyCanvas
              bodies={bodies} masses={masses} ctl={ctl} layers={layers} hiddenTypes={hiddenTypes}
              selectedId={selectedId} onSelect={select} focusRequest={focusRequest} reduced={reduced}
              onReady={() => setReady(true)}
            />
          </Suspense>
        ) : (
          <div className="g-nogl"><b>3D view unavailable.</b> This browser or device has WebGL disabled. The full dataset is in the data table.</div>
        )}
      </div>

      {webgl && !ready && <div className="g-loading" role="status">Initialising 3D renderer…</div>}

      {panel === "controls" && (
        <aside className="g-panel g-controls" aria-label="Controls">
          <div className="g-field">
            <label htmlFor="g-search">Find a body</label>
            <input id="g-search" type="search" autoComplete="off" placeholder="e.g. Iran, JPN…" value={q} onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && matches[0]) { pick(matches[0].id); setQ(""); } }} />
            {matches.length > 0 && (
              <ul className="g-results">
                {matches.map((b) => <li key={b.id}><button type="button" onClick={() => { pick(b.id); setQ(""); }}>{b.name} <span className="g-muted">{b.id}</span></button></li>)}
              </ul>
            )}
          </div>

          <fieldset className="g-scen">
            <legend>Scenario {modified && <em>(sliders modified)</em>}</legend>
            {SCENARIO_IDS.map((id) => (
              <button type="button" key={id} className="g-chip" aria-pressed={scenarioId === id} onClick={() => applyScenario(id)}>{SCENARIOS[id].label}</button>
            ))}
            <p className="g-muted">{scenario.note}</p>
          </fieldset>

          <Slider id="s-warp" label="Fabric warp" hint="Depth of the gravity wells." value={ctl.warp} onChange={setCtlKey("warp")} />
          <Slider id="s-isr" label="ISR stream" hint="Strength of the Russia→Iran ISR edge (unverified) and Iran’s latent glow." value={ctl.isr} onChange={setCtlKey("isr")} />
          <Slider id="s-dollar" label="Dollar pull" hint="Singularity brightness and the gold dollar-integration rings." value={ctl.dollar} onChange={setCtlKey("dollar")} />

          <div className="g-checks">
            <Check checked={layers.fabric} onChange={(v) => setLayers((l) => ({ ...l, fabric: v }))}>Gravity fabric</Check>
            <Check checked={layers.lines} onChange={(v) => setLayers((l) => ({ ...l, lines: v }))}>Relationship edges</Check>
            <Check checked={layers.rings} onChange={(v) => setLayers((l) => ({ ...l, rings: v }))}>Dollar rings</Check>
            <Check checked={layers.labels} onChange={(v) => setLayers((l) => ({ ...l, labels: v }))}>Labels</Check>
            <Check checked={layers.rotate} onChange={(v) => setLayers((l) => ({ ...l, rotate: v }))}>Auto-rotate</Check>
          </div>
          <div className="g-row">
            <button type="button" className="g-btn" onClick={reset}>Reset all</button>
            <button type="button" className="g-btn" onClick={() => focus("__home")}>Home view</button>
          </div>
        </aside>
      )}

      {panel === "legend" && (
        <aside className="g-panel g-controls" aria-label="Legend">
          <h3>Edges <small>(toggle)</small></h3>
          <ul className="g-legend">
            {Object.entries(REL_TYPES).map(([t, v]) => (
              <li key={t}>
                <button type="button" aria-pressed={!hiddenTypes.has(t)} onClick={() => toggleType(t)}>
                  <span className={`swatch${v.dashed ? " dashed" : ""}`} style={{ "--c": v.color }} aria-hidden="true" />{v.label}
                </button>
              </li>
            ))}
          </ul>
          <h3>Encodings</h3>
          <ul className="g-enc">
            <li><b>Size / depth</b> power mass</li>
            <li><b>Gold ring</b> USD integration</li>
            <li><b>Halo</b> nuclear-armed</li>
            <li><b>Fabric colour</b> blue shallow → amber deep</li>
            <li><b>Position</b> schematic, no meaning</li>
          </ul>
        </aside>
      )}

      {showDetail && <Detail body={selected} bodies={bodies} rank={massRank[selected.id]} onClose={() => setSelectedId(null)} onPick={pick} />}

      {webgl && <p className="g-hint">{narrow ? "Drag to orbit · pinch to zoom · tap a body" : "Drag to orbit · scroll to zoom · right-drag to pan · click a body · Esc to clear"}</p>}

      {modal === "table" && <Modal title="Data table" wide onClose={() => setModal(null)}><DataTable bodies={bodies} scenarioId={scenarioId} onPick={pick} /></Modal>}
      {modal === "about" && <Modal title="About this model" onClose={() => setModal(null)}><About /></Modal>}
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
