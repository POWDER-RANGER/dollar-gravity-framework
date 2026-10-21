import { PageHeader, P, Section } from "../components/ui.jsx";
import { href } from "../pages-meta.js";
import { SOURCES, UNVERIFIED, RESOLVED, REVIEWED, REV } from "../data/metrics.js";

export default function PageSources() {
  return (
    <div>
      <PageHeader eyebrow="Module 11 · Evidence" title="Sources & method" color="#22d3ee"
        lede={`Every real-world figure on this site, with its as-of date and link. Reviewed ${REVIEWED} (rev ${REV}).`} />

      <Section title="How figures are handled" tag="Method" color="#22d3ee">
        <P>
          Numbers live in one data file and pages cite them by id. <b>Primary</b> sources are the issuing institution
          (BIS, IMF, US Treasury, SWIFT). <b>Secondary</b> sources are summaries and reporting; they are labeled and
          carry a note where verification is incomplete. Anything carried over from an earlier revision that has not
          been checked is listed in the table at the bottom and flagged <span className="unv">unverified</span> in the text.
        </P>
        <P>
          Fast-moving topics (the Iran war, Section 702, tariffs) are the most likely to be out of date. Treat the
          as-of date as part of the figure.
        </P>
      </Section>

      <Section title="Sourced figures" tag={`${Object.keys(SOURCES).length} entries`} color="#22d3ee">
        <div className="src-list">
          {Object.entries(SOURCES).map(([id, s]) => (
            <article key={id} id={id} className="src">
              <div className="src-top">
                <span className="src-label">{s.label}</span>
                <span className="src-value">{s.value}</span>
              </div>
              <p className="src-detail">{s.detail}</p>
              <div className="src-meta">
                {s.asOf} · {s.kind} · <a href={s.url} target="_blank" rel="noopener noreferrer">{s.source}</a>
              </div>
              {s.note && <div className="src-note">Caveat: {s.note}</div>}
            </article>
          ))}
        </div>
      </Section>

      <Section title="Legacy claims re-checked" tag={`${RESOLVED.length} resolved · ${UNVERIFIED.length} open`} color="#fb923c">
        <div id="unverified" className="src" style={{ padding: 0, border: 0, background: "none" }}>
          <P>Rev 2.2 flagged ten carried-over claims as unverified. Rev 2.3 traced each one; this is the outcome.</P>
          <div style={{ overflowX: "auto" }}>
            <table className="unv-table">
              <thead><tr><th>Earlier claim</th><th>Outcome</th><th>Now</th></tr></thead>
              <tbody>
                {RESOLVED.map((r) => (
                  <tr key={r.claim}>
                    <td>{r.claim}</td><td>{r.outcome}</td>
                    <td>{r.now} {r.id && <a href={href("sources", r.id)}>[src]</a>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {UNVERIFIED.length > 0 && <P>Still unverified: {UNVERIFIED.map((u) => u.claim).join("; ")}.</P>}
        </div>
      </Section>

      <Section title="Updating" tag="Maintainers" color="#9fb0c6">
        <P>
          Edit <code className="mono">src/data/metrics.js</code>, change the value, as-of date and link together, then run{" "}
          <code className="mono">npm run build</code>. Remove an item from the unverified list only after adding a source.
        </P>
      </Section>
    </div>
  );
}
