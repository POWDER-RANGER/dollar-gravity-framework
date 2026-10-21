import { PageHeader, Gap, Cite } from "../components/ui.jsx";

const COLS = [
  {
    id: "narrative", label: "NARRATIVE", color: "#c084fc", sub: "The constructed story", icon: "◈",
    desc: "Narrative manufactures consent by framing structural mechanisms as neutral or inevitable. It shapes which questions get asked and which stay invisible.",
    items: [
      ["Tariffs as punishment", <>Framed as foreign countries paying; measured incidence falls almost entirely on US buyers <Cite id="kiel-tariffs" />.</>],
      ["Sanctions as moral theater", "Narrated as principled response; operationally a financial chokepoint calibrated by sector and enforcement capacity."],
      ["Debt limit as crisis", <>Politically performed as existential; mechanically resolved many times (78 acts since 1960, a floor) <Cite id="debt-acts" />.</>],
      ["Surveillance as security", "Vendor ecosystems normalized as technological necessity; fragmentation framed as decentralization rather than distributed control."],
      ["War as defense", "Procurement acceleration and R&D feedback loops narrated as reactive; structurally they are forward-operating incentive systems."],
    ],
    warn: "When narrative diverges too far from measurable reality, legitimacy fractures. That is when falsifiers become visible.",
  },
  {
    id: "reality", label: "REALITY", color: "#f59e0b", sub: "The measurable bite", icon: "⚖",
    desc: "Reality is the structural layer: capital flows, sanctions incidence, payment chokepoints, procurement data. It constrains what narrative can claim and what projection can promise.",
    items: [
      ["USD dominance metrics", <>Dollar on one side of 89% of FX trades <Cite id="bis-fx" />; 56.70% of reserves <Cite id="cofer" />; 49.25% of SWIFT value <Cite id="swift" />. Slipping at the margin, no replacement at scale.</>],
      ["Tariff incidence", <>About 96% on US buyers in one large study <Cite id="kiel-tariffs" />. Legal basis changed when IEEPA tariffs fell <Cite id="scotus-ieepa" />.</>],
      ["Sanctions efficacy by sector", <>Finance hits fast; tech gaps take longer (model judgment); energy reroutes via intermediaries. Iran now faces a physical blockade <Cite id="iran-blockade" />.</>],
      ["Elite coordination metrics", <>2024 federal election spending projected at $15.9B or more <Cite id="opensecrets-2024" />; the top five contractors held about 30% of DoD contract obligations in FY2024 <Cite id="dod-top5" />. Agency-to-industry movement is tracked in OpenSecrets' revolving-door data; no figure is claimed here.</>],
      ["Surveillance pipeline", <>Army–Palantir agreement up to $10B <Cite id="palantir-army" />. Section 702 lapsed but collection continues <Cite id="fisa-702" />.</>],
    ],
    warn: "Reality is not self-interpreting. Every metric sits inside a frame that shapes which numbers get measured and how they are reported.",
  },
  {
    id: "projection", label: "PROJECTION", color: "#22d3ee", sub: "The steered future", icon: "⟡",
    desc: "Projection weaponizes narrative and reality together to accelerate desired outcomes: decoupling trajectories, procurement pipelines, surveillance normalization, alliance-credibility locks.",
    items: [
      ["Decoupling as inevitability", "A narrative of US–China separation projected as destiny; entanglement slows actual decoupling while accelerating political incentive."],
      ["War as R&D accelerant", "Battlefield data loops projected into multi-decade procurement pipelines; conflict becomes a forward-operating budget justification."],
      ["Surveillance normalization", "Each security event projects expanded data authority as rational response; the ratchet advances and rollback becomes politically costly."],
      ["Dollar alternatives as threat", "BRICS+ payment architecture projected as existential; the reality is a multi-decade transition with no current liquidity depth to displace dollar rails."],
      ["Elite coalition realignment", "Defense-tech fractures projected as rupture; iterative realignment around AI and autonomy is the likelier path."],
    ],
    warn: "Projection untethered from resistance capacity accelerates into backlash. The blind spot is illegible, decentralized opposition that does not register in projection models.",
  },
];

const FLOW = [
  ["Elite coalitions", "#a78bfa"], "fund & staff", ["Narrative construction", "#c084fc"], "shapes",
  ["Public consent", "#9fb0c6"], "enables", ["Policy / law", "#60a5fa"], "enforces",
  ["Measurable reality", "#f59e0b"], "feeds", ["Future projection", "#22d3ee"],
];

const MATRIX = [
  ["", "→ NARRATIVE", "→ REALITY", "→ PROJECTION"],
  ["NARRATIVE ↓", "Self-reinforcing loop via media and think tanks", "Distorts which metrics get measured", "Defines the “obvious” future trajectory"],
  ["REALITY ↓", "Constrains what narrative can claim long-term", "Measurable ground truth (capital, tech, law)", "Sets hard limits on projection speed"],
  ["PROJECTION ↓", "Generates future narratives retroactively", "Creates demand for new metrics and evidence", "Compounds as self-fulfilling via investment"],
];

export default function PageSteering() {
  return (
    <div>
      <PageHeader eyebrow="Module 10 · System steering field" title="Narrative · Reality · Projection" color="#c084fc"
        lede="The deepest power is not any single node. It is the field that bends all nodes toward specific futures." />

      <div className="triptych">
        {COLS.map((col) => (
          <section key={col.id} className="tcol" style={{ "--c": col.color }}>
            <div className="tcol-head">
              <div className="tcol-name">{col.icon} {col.label}</div>
              <div className="tcol-sub">{col.sub}</div>
            </div>
            <p className="tcol-desc">{col.desc}</p>
            {col.items.map(([h, b]) => (
              <div className="titem" key={h}>
                <div className="titem-h">{h}</div>
                <div className="titem-b">{b}</div>
              </div>
            ))}
            <div className="twarn">⚠ {col.warn}</div>
          </section>
        ))}
      </div>

      <div className="flow">
        <div className="eyebrow">Steering flow</div>
        <div className="flow-row">
          {FLOW.map((x, i) => Array.isArray(x)
            ? <span key={i} className="flow-node" style={{ "--c": x[1] }}>{x[0]}</span>
            : <span key={i} className="flow-arrow" aria-hidden="true"><span>→</span><span>{x}</span></span>)}
        </div>
      </div>

      <div className="eyebrow">Layer interplay matrix</div>
      <div className="matrix-wrap" role="region" aria-label="Layer interplay matrix" tabIndex={0}>
        <div className="matrix">
          {MATRIX.map((row, r) => row.map((cell, c) => (
            <div key={`${r}-${c}`} className={r === 0 ? "mh" : c === 0 ? "mr" : undefined}>{cell}</div>
          )))}
        </div>
      </div>

      <Gap label="◈ Key falsifier">
        If narrative–reality divergence becomes publicly legible at scale (investigative journalism, leaked data,
        measurable prediction failures), projection loses its self-fulfilling character. The system's resilience
        depends on keeping that gap below the visibility threshold.
      </Gap>
    </div>
  );
}
