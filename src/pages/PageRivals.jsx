import { PageHeader, Section, P, Bullets, Gap, Update, Cite, Unv, Metric, Metrics } from "../components/ui.jsx";

export default function PageRivals() {
  const c = "#f87171";
  return (
    <div>
      <PageHeader eyebrow="Module 03 · Rivals and holdouts" title="Inside the system vs constrained outside" color={c}
        lede="Three different relationships to dollar gravity: entangled rival, partial exit, and high-constraint holdout." />

      <Section title="US–China: rivals inside an entangled system" tag="Rivalry" color={c}>
        <P>
          The relationship defies clean adversary framing. They are at once strategic competitors (military, tech,
          influence), economic codependents (supply chains, Treasury holdings, consumer markets) and systemic rivals
          (dollar vs yuan, SWIFT vs CIPS, liberal order vs state capitalism).
        </P>
        <Bullets items={[
          <>China's reported Treasury holdings were $590.7B in August 2026, down from $759.0B in December 2024 <Cite id="tic-china" />. The "mutual hostage" arrangement is loosening, though custodial holdings elsewhere are not captured.</>,
          "Apple, Nike and thousands of US firms remain deeply embedded in Chinese manufacturing.",
          "CIPS and digital-yuan efforts are long-run bets on dollar independence, not near-term alternatives.",
          "Trade-war tariffs (2018 onward) are as much domestic political signaling as strategic decoupling.",
        ]} />
        <Gap>
          Does decoupling actually happen at the supply-chain level, or does it reroute through intermediaries
          (Vietnam, Mexico)? Track origin-of-manufacture data, not just trade-partner statistics.
        </Gap>
      </Section>

      <Section title="Iran: high-constraint holdout" tag="Constrained" color={c}>
        <Bullets items={[
          "Decades of sanctions forced the development of alternative financial architecture.",
          <>Oil moved through intermediaries at a discount (earlier estimate ~20–40% below market) <Unv id="u-iran-discount" />.</>,
          "Barter, cryptocurrency and gold cover some external transactions.",
          "IRGC-linked networks run shadow banking across Turkey, Afghanistan and Pakistan.",
          "Real cost: persistent currency weakness, a technology gap and reduced capital access.",
        ]} />
        <Update title="2026: Iran becomes a live test">
          <ul>
            <li>28 Feb: US and Israeli strikes begin the war; Iran closes the Strait of Hormuz.</li>
            <li>8 Apr: Pakistan-mediated ceasefire. 13 Apr: US naval blockade of Iranian ports begins.</li>
            <li>17–18 Jun: Islamabad Memorandum signed; blockade lifted. 8 Jul: ceasefire collapses. 14 Jul: blockade reinstated <Cite id="iran-war" />.</li>
            <li>19 Aug: Iran's central bank governor says oil exports have effectively ceased <Cite id="iran-blockade" />.</li>
          </ul>
          <p>
            Reading: the bypass stack that survived financial sanctions is now being tested by physical interdiction.
            This is the clearest current test of F-2.
          </p>
        </Update>
      </Section>

      <Section title="North Korea: near-outside holdout" tag="Extreme" color={c}>
        <Bullets items={[
          "The most sanctioned state on Earth; operates near the outside of mainstream finance.",
          "Keeps access through China as a structural lifeline; Beijing tolerates leakage for buffer-state reasons.",
          <>DPRK hackers stole roughly $2B in crypto in 2025, including the $1.4B Bybit hack, funding weapons programs <Cite id="dprk-crypto" />.</>,
          "Arms exports (artillery shells to Russia, ballistic technology to others) generate hard currency.",
          "Illicit-finance dependence means it is never fully outside: it needs the system's edges to function.",
        ]} />
      </Section>

      <Metrics>
        <Metric id="tic-china" label="China reported Treasury holdings" color="#f87171" />
        <Metric id="dprk-crypto" label="DPRK crypto theft (2025)" color="#f87171" />
        <Metric id="iran-blockade" label="US blockade of Iran" color="#f87171" />
      </Metrics>
    </div>
  );
}
