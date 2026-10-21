import { PageHeader, Section, P, Bullets, Gap, Update, Cite, Metric, Metrics } from "../components/ui.jsx";

export default function PageWar() {
  const c = "#fb923c";
  return (
    <div>
      <PageHeader eyebrow="Module 05 · War and conflict" title="Theater and stakes" color={c}
        lede="Conflict is a geopolitical contest, a data engine and an instrument of financial warfare at the same time." />

      <Section title="War as data engine" tag="Doctrine" color={c}>
        <P>Modern conflict is simultaneously a geopolitical contest and an accelerated R&amp;D feedback loop:</P>
        <Bullets items={[
          "Battlefield as sensor network: real-time data on weapons effectiveness, doctrine gaps and logistics chains.",
          "Procurement learns fast: systems that fail in combat get cancelled; effective ones get scaled.",
          "Doctrine updates in real time: drone and counter-drone practice in Ukraine has iterated far faster than peacetime procurement cycles (model judgment; no figure claimed).",
          "Export marketing: combat-proven systems command price premiums.",
          "Intelligence collection: adversary tactics, electronic signatures and order of battle revealed under combat conditions.",
        ]} />
      </Section>

      <Section title="War as real stakes" tag="Geopolitics" color={c}>
        <P>Security guarantees, borders, resources and alliance credibility are not "just for show". Signaling and substance are entangled:</P>
        <Bullets items={[
          "Alliance credibility: failing to defend a commitment cascades to every other guarantee.",
          "Resource access: control of energy chokepoints, rare earths and water creates structural leverage. The 2026 closure of the Strait of Hormuz made this concrete.",
          "Border legitimacy: precedent effects of territorial conquest destabilize adjacent frozen conflicts.",
          "Nuclear deterrence underlies all conventional calculations.",
        ]} />
      </Section>

      <Section title="Sanctions and seizures as war instrument" tag="Financial war" color={c}>
        <Bullets items={[
          <>Russian reserve freeze: about €210B of Russian central-bank assets sit in Europe, ~€185B at Euroclear. It showed that reserve assets are hostage to political decisions <Cite id="russia-assets" />.</>,
          "SWIFT exclusion degraded Russian banking without collapsing it; energy exports via China and India continued.",
          "Chip export controls bite with a delay while Russia substitutes lower-grade components (model judgment; the lag is not measured here).",
          "Insurance denial forced rerouting through shadow fleets.",
        ]} />
        <Update title="2026: reserve assets become a bargaining chip">
          <ul>
            <li>Dec 2025: the EU agreed a €90B Ukraine loan and immobilized the assets indefinitely using an emergency treaty provision; the loan was finalized in April 2026.</li>
            <li>Oct 2026: member states and MEPs reopened the push to use the assets directly. Belgium and the ECB warn of legal risk and damage to euro confidence <Cite id="russia-assets" />.</li>
            <li>Iran: financial sanctions were joined by a physical blockade; its central bank says exports have effectively stopped <Cite id="iran-blockade" />. By 20 October combat was paused but unresolved <Cite id="iran-status" />.</li>
          </ul>
        </Update>
        <Gap>
          If sanctions do not change battlefield sustainment, technology acquisition or state revenue over a 2–3 year
          window, they are mostly symbolic. Russia (since 2022) and Iran (2026) are the two live cases; the evidence so
          far is mixed and should be re-read each quarter.
        </Gap>
      </Section>

      <Metrics>
        <Metric id="russia-assets" label="Immobilized Russian assets (Europe)" color="#fb923c" />
        <Metric id="iran-war" label="Iran war start" color="#fb923c" />
      </Metrics>
    </div>
  );
}
