import { PageHeader, Section, P, Bullets, Cite } from "../components/ui.jsx";
import { href } from "../pages-meta.js";
import { countries, relationships, REL_TYPES, SCENARIOS, COUNTRY_BY_ID } from "../galaxy/data.js";

const scroll = { overflowX: "auto" };
const num = { textAlign: "right", fontVariantNumeric: "tabular-nums" };
const pct = (v) => `${Math.round(v * 100)}%`;

/** Everything here is generated from src/galaxy/data.js, so it cannot drift from the 3D page. */
export default function PageGalaxyData() {
  const c = "#22d3ee";
  const sorted = [...countries].sort((a, b) => b.mass - a.mass);
  return (
    <div>
      <PageHeader eyebrow="Module 12 · Evidence" title="Galaxy data & method" color={c}
        lede="What the 3D Galaxy shows, which inputs are sourced, which are judgments, and how to change them." />

      <Section title="What is and is not sourced" tag="Read first" color={c}>
        <Bullets items={[
          <><b>Judgments, not measurements:</b> power mass, threat and USD-integration scores are hand-assigned. Treat them as the model's opinion.</>,
          <><b>Sourced:</b> warhead counts are military-stockpile estimates from the Federation of American Scientists, 2026 edition, for the nine nuclear-armed states <Cite id="fas-nuclear" />.</>,
          <><b>Not re-verified:</b> "dataset rank" is the ordinal from the original v4.0 dataset (Global Firepower style).</>,
          <><b>Reported, not confirmed:</b> the Russia→Iran ISR edge rests on anonymous-source press reports <Cite id="russia-iran-isr" />.</>,
          <><b>Illustrative:</b> scenario presets use arbitrary visual weights to show direction of change. They are not forecasts.</>,
          <><b>Schematic:</b> 3D position carries no meaning; it is arranged for legibility.</>,
        ]} />
        <P>
          Dated, sourced figures about the real world live on the <a href={href("sources")}>Sources page</a>.
          Open the <a href="./galaxy/">3D Galaxy</a>.
        </P>
      </Section>

      <Section title="Field provenance" tag="Method" color={c}>
        <div style={scroll} role="region" aria-label="Field provenance table" tabIndex={0}>
          <table className="unv-table">
            <thead><tr><th>Field</th><th>Meaning</th><th>Provenance</th></tr></thead>
            <tbody>
              <tr><td>Power mass</td><td>Composite of economic weight, military capability and reserve-currency role. US = 1.19 by construction.</td><td>Hand-assigned (v4.0)</td></tr>
              <tr><td>Threat</td><td>0–100% adversarial posture toward the dollar order.</td><td>Hand-assigned judgment</td></tr>
              <tr><td>USD integration</td><td>0–100% integration with dollar rails and reserves.</td><td>Hand-assigned judgment</td></tr>
              <tr><td>Warheads</td><td>Military stockpile, nine states.</td><td>FAS 2026 <Cite id="fas-nuclear" /></td></tr>
              <tr><td>Dataset rank</td><td>Ordinal from the original dataset.</td><td>Carried over; not re-verified</td></tr>
              <tr><td>Position</td><td>Place in the 3D scene.</td><td>Arbitrary</td></tr>
            </tbody>
          </table>
        </div>
        <P>
          The gravity fabric is <code className="mono">y = −Σ mᵢ·14·warp / (1 + dᵢ²/25)</code> over all bodies, where dᵢ is
          the horizontal distance to body i. It is a visual device, not a physical model.
        </P>
      </Section>

      <Section title="Relationships" tag={`${relationships.length} edges`} color={c}>
        <div style={scroll} role="region" aria-label="Relationships table" tabIndex={0}>
          <table className="unv-table">
            <thead><tr><th>From → to</th><th>Type</th><th>Basis</th></tr></thead>
            <tbody>
              {relationships.map((r, i) => (
                <tr key={i}>
                  <td>{COUNTRY_BY_ID[r.from].name} → {COUNTRY_BY_ID[r.to].name}</td>
                  <td>{REL_TYPES[r.type].label}</td>
                  <td>{r.basis} {r.source && <Cite id={r.source} />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Scenario presets" tag="Illustrative" color={c}>
        <div style={scroll} role="region" aria-label="Scenario presets table" tabIndex={0}>
          <table className="unv-table">
            <thead><tr><th>Preset</th><th>What it does</th></tr></thead>
            <tbody>
              {Object.values(SCENARIOS).map((s) => <tr key={s.label}><td>{s.label}</td><td>{s.note}</td></tr>)}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="All bodies" tag={`${countries.length} rows`} color={c}>
        <div style={scroll} role="region" aria-label="All bodies table" tabIndex={0}>
          <table className="unv-table">
            <thead><tr><th>Body</th><th style={num}>Mass</th><th style={num}>Threat</th><th style={num}>USD integ.</th><th style={num}>Warheads</th><th style={num}>Dataset rank</th></tr></thead>
            <tbody>
              {sorted.map((b) => (
                <tr key={b.id}>
                  <td>{b.name}</td><td style={num}>{b.mass.toFixed(2)}</td><td style={num}>{pct(b.threat)}</td>
                  <td style={num}>{pct(b.usdDep)}</td><td style={num}>{b.nuclear ? b.nuclear.toLocaleString() : "—"}</td><td style={num}>#{b.rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Editing the data" tag="Maintainers" color="#9fb0c6">
        <P>
          All bodies, relationships and scenarios are in <code className="mono">src/galaxy/data.js</code>. This page and
          the 3D view both read that file. Edit it, run <code className="mono">npm run build</code>, and commit the
          source with the rebuilt output. See{" "}
          <a href="https://github.com/POWDER-RANGER/dollar-gravity-framework/blob/main/docs/METHODOLOGY.md" target="_blank" rel="noopener noreferrer">Methodology</a>.
        </P>
      </Section>
    </div>
  );
}
