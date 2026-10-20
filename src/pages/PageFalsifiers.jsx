import { PageHeader, P, Cite } from "../components/ui.jsx";
import { href } from "../pages-meta.js";

const FALSIFIERS = [
  {
    id: "F-1", title: "De-dollarization threshold", status: "MONITOR", color: "#f59e0b",
    test: <>USD share of global reserves falls below 50%, or USD share of SWIFT payment value falls below 30%. Either would require fundamental revision of the monetary core. Watch BRICS+ payment architecture, oil-trade currency denomination and central-bank reserve-diversification filings.</>,
    reading: <>Reserves: 56.70% in Q2 2026, down from 57.18% <Cite id="cofer" />. SWIFT value share: 49.25% in Feb 2026 <Cite id="swift" />. Both are well above threshold. <b>Not triggered.</b></>,
  },
  {
    id: "F-2", title: "Sanctions efficacy collapse", status: "ACTIVE TEST", color: "#f87171",
    test: <>A sanctioned state sustains tech acquisition, military sustainment and state revenue for 3+ years despite maximum pressure. That would falsify the claim that financial warfare is decisive.</>,
    reading: <>Russia: war continues, assets immobilized indefinitely <Cite id="russia-assets" />. Iran: blockade since Apr 2026 (reinstated Jul), with its central bank reporting oil exports effectively ceased <Cite id="iran-blockade" />. Evidence is mixed and the clock has not run 3 years. <b>Not resolved.</b></>,
  },
  {
    id: "F-3", title: "Domestic surveillance rollback", status: "WATCH", color: "#22d3ee",
    test: <>Congress enacts meaningful Section 702 reform, courts invalidate data-broker-to-government pipelines, or state privacy laws create genuinely enforceable barriers. That would break the "ratchet only turns one way" assumption.</>,
    reading: <>702 lapsed on 12 Jun 2026 without reform, but collection continues under existing FISC certifications (reported to ~Mar 2027) <Cite id="fisa-702" />. A lapse is not a rollback. <b>Not triggered; the most active file.</b></>,
  },
  {
    id: "F-4", title: "Elite coalition fracture", status: "EMERGING", color: "#a78bfa",
    test: <>A major rupture between the defense-industrial and finance coalitions (forced defense cuts from a debt crisis, or a tech–defense split over AI ethics) would weaken the "coordination holds" assumption.</>,
    reading: <>No rupture found in the sources reviewed. Counter-signal: a ten-year Army enterprise agreement worth up to $10B with a single software vendor <Cite id="palantir-army" />. <b>Not triggered; thinly evidenced.</b></>,
  },
  {
    id: "F-5", title: "Debt-limit hard failure", status: "LOW PROB / HIGH IMPACT", color: "#fb923c",
    test: <>Treasury misses any payment. The "performative" label is retired permanently, and even a short technical default reprices the risk-free rate.</>,
    reading: <>Limit raised to $41.104T; ~$39.7T subject to limit in Aug 2026. Limit projected to be reached ~May 2027, X-date ~Feb 2028 <Cite id="debt-limit" />. <b>Not in the near-term window.</b></>,
  },
];

export default function PageFalsifiers() {
  return (
    <div>
      <PageHeader eyebrow="Module 08 · Falsifiers" title="What would force a rewrite" color="#9fb0c6"
        lede="Five primary triggers. Each shows the test, then the current reading against it." />
      <P>
        Monitoring these is the model's immune system. A falsifier with no current reading is decoration, so every card
        below ends with the latest evidence and its source. Readings are as of the dates on the{" "}
        <a href={href("sources")}>Sources page</a>.
      </P>
      <div className="fals-list">
        {FALSIFIERS.map((f) => (
          <article key={f.id} className="fals" style={{ "--c": f.color }}>
            <div className="fals-top">
              <div>
                <span className="fals-id">{f.id}</span>
                <span className="fals-title">{f.title}</span>
              </div>
              <span className="tag" style={{ "--c": f.color }}>{f.status}</span>
            </div>
            <p className="fals-desc">{f.test}</p>
            <div className="fals-reading"><span className="fals-label">Current reading</span>{f.reading}</div>
          </article>
        ))}
      </div>
    </div>
  );
}
