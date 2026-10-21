import { useEffect, useState } from "react";
import { SOURCES } from "../data/metrics.js";
import { href } from "../pages-meta.js";
import { FALSIFIERS } from "../pages/PageFalsifiers.jsx";
import { Cite } from "./ui.jsx";

const reduced = () => typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Decorative gravity well: a warped sheet funnelling into a glowing core. Pure SVG, no data. */
export function GravityWell() {
  const W = 640, H = 400, cx = 320, RINGS = 15, MERID = 20;
  const rings = Array.from({ length: RINGS }, (_, i) => {
    const t = i / (RINGS - 1);
    const rx = 300 * Math.pow(1 - t, 1.85) + 12;
    return { i, t, rx, ry: rx * 0.24, y: 46 + 290 * Math.pow(t, 1.55) };
  });
  const meridians = Array.from({ length: MERID }, (_, k) => {
    const a = (k / MERID) * Math.PI * 2;
    return rings.map((r) => `${(cx + r.rx * Math.cos(a)).toFixed(1)},${(r.y + r.ry * Math.sin(a)).toFixed(1)}`).join(" ");
  });
  const orbit = rings[5];
  const orbit2 = rings[9];
  const still = reduced();
  const orbitPath = (r) => `M ${cx - r.rx} ${r.y} a ${r.rx} ${r.ry} 0 1 0 ${r.rx * 2} 0 a ${r.rx} ${r.ry} 0 1 0 ${-r.rx * 2} 0`;
  return (
    <svg className="well" viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="wcore" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff3c4" stopOpacity="1" />
          <stop offset=".25" stopColor="#f59e0b" stopOpacity=".85" />
          <stop offset="1" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="wline" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#22d3ee" stopOpacity=".15" />
          <stop offset="1" stopColor="#f59e0b" stopOpacity=".9" />
        </linearGradient>
      </defs>
      <ellipse cx={cx} cy={rings[RINGS - 1].y + 6} rx="120" ry="46" fill="url(#wcore)" />
      <g fill="none" stroke="url(#wline)" strokeWidth="1">
        {meridians.map((p, k) => <polyline key={k} points={p} opacity=".38" />)}
        {rings.map((r) => (
          <ellipse key={r.i} cx={cx} cy={r.y} rx={r.rx} ry={r.ry} opacity={0.25 + r.t * 0.7} />
        ))}
      </g>
      <circle cx={cx} cy={rings[RINGS - 1].y} r="6" fill="#fff3c4" />
      {[[orbit, "#22d3ee", 14, 7], [orbit2, "#a78bfa", 9, 5]].map(([r, c, dur, rad], n) => (
        <circle key={n} r={rad} fill={c} style={{ filter: `drop-shadow(0 0 6px ${c})` }}>
          {!still && <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={orbitPath(r)} />}
          {still && <animate attributeName="cx" values={`${cx + r.rx}`} dur="1s" />}
          {still && <animate attributeName="cy" values={`${r.y}`} dur="1s" />}
        </circle>
      ))}
    </svg>
  );
}

const num = (v) => parseFloat(String(v).replace(/[^0-9.]/g, ""));

const GAUGES = [
  { id: "bis-fx", short: "of FX trades have the dollar on one side", color: "#f59e0b" },
  { id: "cofer", short: "of allocated central-bank reserves", color: "#60a5fa" },
  { id: "swift", short: "of SWIFT payments by value", color: "#22d3ee" },
];

/** Three sourced dollar-share rings. Values come from data/metrics.js. */
export function Gauges() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)));
    return () => cancelAnimationFrame(id);
  }, []);
  const R = 46, C = 2 * Math.PI * R;
  return (
    <div className="gauges" role="list" aria-label="Dollar share indicators">
      {GAUGES.map((g, i) => {
        const s = SOURCES[g.id];
        const v = num(s.value);
        return (
          <div className="gauge" role="listitem" key={g.id} style={{ "--c": g.color }}>
            <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
              <circle cx="60" cy="60" r={R} className="g-track" />
              <circle cx="60" cy="60" r={R} className="g-fill" transform="rotate(-90 60 60)"
                strokeDasharray={C} strokeDashoffset={on ? C * (1 - v / 100) : C}
                style={{ transitionDelay: `${i * 140}ms` }} />
            </svg>
            <div className="g-val">{s.value}</div>
            <div className="g-label">{g.short} <Cite id={g.id} /></div>
            <div className="g-asof">{s.asOf}</div>
          </div>
        );
      })}
    </div>
  );
}

/** Five falsifiers, current status, linked to the module. */
export function FalsifierBoard() {
  return (
    <div className="fboard">
      <div className="fboard-head">
        <span>Falsifier board</span>
        <span className="fboard-count"><b>0</b> of {FALSIFIERS.length} triggered</span>
      </div>
      <ul>
        {FALSIFIERS.map((f) => (
          <li key={f.id} style={{ "--c": f.color }}>
            <a href={href("falsifiers")}>
              <span className="fid">{f.id}</span>
              <span className="ftitle">{f.title}</span>
              <span className="tag">{f.status}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
