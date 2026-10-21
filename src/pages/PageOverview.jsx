import { PAGES, href } from "../pages-meta.js";
import { GRAPH_STATS } from "../data/graph.js";
import { SOURCES, UNVERIFIED, RESOLVED, REV, REVIEWED } from "../data/metrics.js";
import { Section, P, Bullets, Gap, Update, Cite } from "../components/ui.jsx";

export default function PageOverview() {
  const stats = [
    { label: "Graph nodes · links", val: `${GRAPH_STATS.nodes} · ${GRAPH_STATS.links}`, color: "#60a5fa" },
    { label: "Falsifiers tracked · triggered", val: "5 · 0", color: "#f87171" },
    { label: "Sourced figures, dated", val: String(Object.keys(SOURCES).length), color: "#22d3ee" },
    { label: `Legacy claims re-checked · still unverified`, val: `${RESOLVED.length} · ${UNVERIFIED.length}`, color: "#fb923c" },
  ];
  const modules = PAGES.filter((p) => p.id !== "overview");

  return (
    <div>
      <div className="eyebrow">Analytical framework · Rev {REV} · Reviewed {REVIEWED}</div>
      <h1 className="h1" tabIndex={-1} data-page-title>
        Dollar-Centric Global Finance<br />&amp; Security System
      </h1>
      <p className="lede">
        A falsifiable systems model: rivalries, bypasses, and competing blocs that still route through the core.
      </p>

      <div className="stat-grid">
        {stats.map((s) => (
          <div key={s.label} className="stat" style={{ "--c": s.color }}>
            <div className="stat-val">{s.val}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <Section title="What this model claims" tag="Core" color="#60a5fa">
        <P>
          The United States operates the dominant global monetary and security system through four interlocking
          instruments: the dollar as invoicing and settlement currency, US Treasuries as the primary reserve asset,
          correspondent-banking rails as a payment chokepoint, and US legal jurisdiction over any dollar-denominated
          transaction.
        </P>
        <P>
          It is not a closed system. Rivals operate inside it (China), partly outside it (Russia), or under extreme
          constraint at the edges (Iran, North Korea). Every actor, adversaries included, must account for dollar gravity.
        </P>
      </Section>

      <Update title={`What changed in rev ${REV}`}>
        <ul>
          <li>All 10 claims flagged unverified in rev 2.2 were checked: 2 confirmed, 5 replaced or corrected with sourced figures, 3 removed or restated as model judgment <Cite id="kiel-tariffs" />.</li>
          <li>The tariff ruling is now read from the Supreme Court opinion, and refunds are flowing <Cite id="scotus-ieepa" /> <Cite id="ieepa-refunds" />.</li>
          <li>Iran status through 20 Oct: combat paused, talks stalled <Cite id="iran-status" />.</li>
          <li>FISA 702 still not reauthorized as of mid-September <Cite id="fisa-702-status" />.</li>
          <li>New module 12 documents what the 3D Galaxy does and does not source.</li>
        </ul>
      </Update>

      <Section title="Start anywhere" tag="Modules" color="#a78bfa">
        <div className="cards" style={{ marginRight: -15 }}>
          {modules.map((m) => (
            <a key={m.id} className="card" href={href(m.id)} style={{ "--c": m.color }}>
              <div className="card-num">MODULE {m.num}</div>
              <div className="card-title">{m.icon} {m.label}</div>
              <div className="card-desc">{m.desc}</div>
            </a>
          ))}
        </div>
      </Section>

      <Section title="How to read the page" tag="Method" color="#34d399">
        <Bullets items={[
          <><b>Gap / falsifiability</b> boxes state what observation would weaken the claim above them.</>,
          <><b>[src]</b> links to the figure's source, as-of date and any caveats on the Sources page.</>,
          <><b>unverified</b> marks a number carried over from earlier revisions that has not been checked. None are open in this revision; see the Sources page for how each was resolved.</>,
          <>Sections marked <b>▲ 2026 update</b> record events since the original analysis. They come from the sources listed, not from the model.</>,
        ]} />
      </Section>

      <Gap>
        The model is only useful if it generates testable predictions. If you cannot attach a measurable mechanism to a
        claim, it is narrative glue, not structure.
      </Gap>
    </div>
  );
}
