import { PAGES, href } from "../pages-meta.js";
import { GRAPH_STATS } from "../data/graph.js";
import { SOURCES, UNVERIFIED, REV, REVIEWED } from "../data/metrics.js";
import { Section, P, Bullets, Gap, Update, Cite } from "../components/ui.jsx";

export default function PageOverview() {
  const stats = [
    { label: "Graph nodes · links", val: `${GRAPH_STATS.nodes} · ${GRAPH_STATS.links}`, color: "#60a5fa" },
    { label: "Falsifiers tracked · triggered", val: "5 · 0", color: "#f87171" },
    { label: "Sourced figures, dated", val: String(Object.keys(SOURCES).length), color: "#22d3ee" },
    { label: "Claims flagged unverified", val: String(UNVERIFIED.length), color: "#fb923c" },
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
          <li>Figures now carry as-of dates and links <Cite id="cofer" /> and un-sourced claims are flagged, not hidden.</li>
          <li>Tariff module reflects the Feb 2026 Supreme Court ruling against IEEPA tariffs <Cite id="scotus-ieepa" />.</li>
          <li>Iran is now a live case: war, ceasefire collapse and naval blockade <Cite id="iran-blockade" />.</li>
          <li>FISA 702 lapsed in June 2026 without reform <Cite id="fisa-702" />.</li>
          <li>Each falsifier shows its current reading against its threshold.</li>
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
          <><b>unverified</b> marks a number carried over from earlier revisions that has not been checked yet.</>,
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
