import { PageHeader, Section, P, Bullets, Gap, Update, Cite } from "../components/ui.jsx";

export default function PageTrade() {
  const c = "#60a5fa";
  return (
    <div>
      <PageHeader eyebrow="Module 02 · Trade and finance instruments" title="Weapons that look like policy" color={c}
        lede="Tariffs and sanctions are different instruments with different incidence and different enforcement points." />

      <Section title="Tariffs: common misconceptions" tag="Corrective" color={c}>
        <P>Tariffs are among the most misunderstood instruments in public discourse. The mechanism:</P>
        <Bullets items={[
          "Collected from US importers at the border, not from the foreign exporting country.",
          "Revenue goes to the US Treasury. It is not a transfer to or from China or any other trade partner.",
          <>The economic burden is primarily domestic: borne by importers, then passed to consumers. A Kiel Institute analysis of more than 25 million shipment records found US buyers bore about 96% of the 2025 tariff cost <Cite id="kiel-tariffs" />.</>,
          "Exporters can absorb part of the cost through price cuts to stay competitive, but measured absorption is small: about 4% in the Kiel study, where export prices held and volumes fell instead.",
          "There is no direct causal link to Treasury interest payments: China earns interest as a bondholder through normal debt markets, not through a tariff mechanism.",
        ]} />
        <Update>
          <p>
            On 20 February 2026 the Supreme Court held 6–3 that the International Emergency Economic Powers Act does
            not authorize tariffs, voiding the IEEPA tariffs <Cite id="scotus-ieepa" />. Other authorities (Section
            232, Section 301, and a temporary Section 122 surcharge of up to 15% for 150 days) remain available.
          </p>
          <p>
            Refunds are now flowing: by 17 September CBP reported about $122B, including interest, certified for
            payment through its CAPE system <Cite id="ieepa-refunds" />.
          </p>
          <p>
            Implication for the model: tariffs as an <em>instrument</em> survive, but their legal basis, and therefore
            their speed and reversibility, changed. Track which statute each active tariff now rests on.
          </p>
        </Update>
        <Gap>
          If trade data shows exporters cutting prices enough to absorb most of a tariff, the "domestic burden" claim
          weakens. Test sector by sector: electronics, agriculture and industrial inputs behave differently.
        </Gap>
      </Section>

      <Section title="Sanctions: mechanism map" tag="Leverage" color={c}>
        <P>Sanctions operate across distinct chokepoints with variable effectiveness by sector:</P>
        <Bullets items={[
          "Finance: correspondent-banking restrictions, SWIFT access denial, asset freezes.",
          "Technology: export controls on chips, tooling and IP; the Foreign Direct Product Rule extends US reach.",
          "Shipping and insurance: Lloyd's and Western maritime insurance as an enforcement lever.",
          "Secondary sanctions: penalizing third parties that transact with sanctioned states.",
          <>Physical interdiction: the US naval blockade of Iranian ports (from 13 April 2026) moved enforcement from paper to hulls <Cite id="iran-blockade" />.</>,
        ]} />
        <P>
          Effectiveness varies by sector and target sophistication. Financial sanctions hit fast; technology gaps take
          years to show; commodity trade finds alternatives quickly through intermediaries.
        </P>
      </Section>

      <Section title="Payment rails as chokepoint" tag="Infrastructure" color={c}>
        <Bullets items={[
          "SWIFT: a messaging layer, not settlement, but denial cuts interbank communication.",
          "Correspondent banking: US banks as gateway; compliance risk causes de-risking even without sanctions.",
          "Eurodollar market: offshore dollar creation outside Fed control.",
          "CIPS (China): an alternative interbank system; growing, but reach is still limited next to SWIFT.",
          "Crypto and barter: low-volume bypass for sanctioned states; costly and illiquid at scale.",
        ]} />
      </Section>
    </div>
  );
}
