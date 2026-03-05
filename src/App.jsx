// Main app shell — imports pages and wires sidebar nav.
// Option A (fastest): Keep entire dashboard as the single-file artifact (geopolitical-system-v2.jsx).
// Option B (modular): Import each page from src/pages/ and compose here.
// This file is the Option B entry point.

import { useState } from "react";
import PageOverview   from "./pages/PageOverview.jsx";
import PageMonetary   from "./pages/PageMonetary.jsx";
import PageTrade      from "./pages/PageTrade.jsx";
import PageRivals     from "./pages/PageRivals.jsx";
import PageElites     from "./pages/PageElites.jsx";
import PageWar        from "./pages/PageWar.jsx";
import PageDomestic   from "./pages/PageDomestic.jsx";
import PageResistance from "./pages/PageResistance.jsx";
import PageFalsifiers from "./pages/PageFalsifiers.jsx";
import PageSteering   from "./pages/PageSteering.jsx";
import ForceGraph     from "./pages/ForceGraph.jsx";

const PAGES = [
  { id: "overview",   label: "OVERVIEW",         icon: "◈" },
  { id: "monetary",   label: "MONETARY CORE",    icon: "₿" },
  { id: "trade",      label: "TRADE WEAPONS",    icon: "⚖" },
  { id: "rivals",     label: "RIVALS & HOLDOUTS",icon: "⊕" },
  { id: "elites",     label: "ELITE NETWORKS",   icon: "◉" },
  { id: "war",        label: "WAR / CONFLICT",   icon: "⚔" },
  { id: "domestic",   label: "DOMESTIC DRIFT",   icon: "◎" },
  { id: "resistance", label: "RESISTANCE",       icon: "⊗" },
  { id: "falsifiers", label: "FALSIFIERS",       icon: "?" },
  { id: "graph",      label: "SYSTEM MAP",       icon: "⬡" },
  { id: "steering",   label: "SYSTEM STEERING",  icon: "⟡" },
];

const PAGE_MAP = {
  overview:   <PageOverview />,
  monetary:   <PageMonetary />,
  trade:      <PageTrade />,
  rivals:     <PageRivals />,
  elites:     <PageElites />,
  war:        <PageWar />,
  domestic:   <PageDomestic />,
  resistance: <PageResistance />,
  falsifiers: <PageFalsifiers />,
  graph:      <ForceGraph />,
  steering:   <PageSteering />,
};

export default function App() {
  const [active, setActive] = useState("overview");

  return (
    <div style={{ background: "#060d1a", minHeight: "100vh", fontFamily: "Georgia, serif", color: "#e2e8f0", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid #0f2040", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#050c1a" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f59e0b", boxShadow: "0 0 8px #f59e0b" }} />
          <span style={{ fontFamily: "monospace", fontSize: "11px", letterSpacing: "0.2em", color: "#475569" }}>
            DOLLAR GRAVITY // REV 2.1
          </span>
        </div>
        <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#1e3a5f" }}>
          {new Date().toISOString().split("T")[0]}
        </span>
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <div style={{ width: "200px", minWidth: "200px", background: "#050c1a", borderRight: "1px solid #0f2040", padding: "16px 0", display: "flex", flexDirection: "column", gap: "2px" }}>
          {PAGES.map(p => (
            <button key={p.id} onClick={() => setActive(p.id)} style={{
              background: active === p.id ? "#0f2040" : "transparent",
              border: "none",
              borderLeft: active === p.id ? "2px solid #f59e0b" : "2px solid transparent",
              padding: "10px 16px", textAlign: "left", cursor: "pointer",
              display: "flex", alignItems: "center", gap: "10px",
              color: active === p.id ? "#f59e0b" : "#334155",
              fontFamily: "monospace", fontSize: "10px", letterSpacing: "0.08em",
            }}>
              <span style={{ fontSize: "12px" }}>{p.icon}</span>
              {p.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "32px", overflowY: "auto", maxHeight: "calc(100vh - 53px)" }}>
          <div style={{ maxWidth: "800px" }}>
            {PAGE_MAP[active]}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:#050c1a}
        ::-webkit-scrollbar-thumb{background:#1e3a5f;border-radius:2px}
      `}</style>
    </div>
  );
}
