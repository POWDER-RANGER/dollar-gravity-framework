import { PageHeader, Section, P, Bullets, Gap, Update, Cite, Metric, Metrics } from "../components/ui.jsx";

export default function PageDomestic() {
  const c = "#34d399";
  return (
    <div>
      <PageHeader eyebrow="Module 06 · Domestic control drift" title="The surveillance architecture gap" color={c}
        lede="Two architectures that produce comparable outcomes by different means." />

      <Section title="China: centralized model" tag="Integrated" color={c}>
        <Bullets items={[
          "Integrated state capacity: party, military, corporate and security functions interlock by design.",
          "Social-credit and behavioral-scoring systems operate across financial, social and civic domains, with uneven national consistency.",
          <>Facial recognition at very large scale: estimates of installed cameras run to roughly 700M, with no official count <Cite id="china-cameras" />.</>,
          "Platform capture: WeChat, Alipay and Douyin operate under state data-sharing obligations.",
          "Xinjiang: an extreme surveillance architecture tested on the Uyghur population and exported to partners.",
        ]} />
      </Section>

      <Section title="US: fragmented vendor ecosystem" tag="Distributed" color={c}>
        <P>The US model is not centralized by design, but fragmentation is not absence. A distributed ecosystem produces similar outcomes through different means:</P>
        <Bullets items={[
          "Data brokers: commercial aggregation of location, financial and behavioral data sold to government agencies, often without a warrant.",
          <>Fusion centers: 80 state and local intelligence hubs in the DHS national network <Cite id="fusion-centers" />, with oversight criticized in a 2012 Senate subcommittee review <Cite id="fusion-oversight" />.</>,
          "Platform analytics: social graph, search and location data reachable through legal process (NSLs, subpoenas, emergency requests).",
          "Vendor ecosystems: Palantir, Axon, ShotSpotter and Clearview AI as nodes in a fragmented but integrated system.",
          "FISA Section 702: collection authority that targets foreign communications but inevitably sweeps in domestic ones.",
        ]} />
        <Update title="2026: Section 702 lapses, collection continues">
          <p>
            The House failed a short-term extension 198–218 on 11 June, and Section 702 reached its sunset on 12 June
            2026, the first lapse since 2008. Collection continues under FISC certifications approved in March 2026,
            reported to run to roughly March 2027 <Cite id="fisa-702" />. A Brennan Center tracker updated 17 September
            still lists no reauthorization <Cite id="fisa-702-status" />. Check Congress.gov for the current status.
          </p>
          <p>
            Reading: a lapse is not reform. The statutory lever was pulled, but the operational pipeline did not stop.
            This is a partial signal for F-3, not a trigger.
          </p>
        </Update>
      </Section>

      <Section title="Palantir as example node (not the whole story)" tag="Case study" color={c}>
        <P>
          Palantir's government work (ICE, CBP, CIA, NSA, DHS, Army) makes it a useful illustration of the
          vendor-as-infrastructure model. In August 2025 the US Army signed an enterprise agreement worth up to $10B
          over ten years that consolidates several existing contracts <Cite id="palantir-army" />. It is still one node
          among many. Treating it as the control center reproduces the "single board" error from the elite-coordination module.
        </P>
        <Gap>
          Track the pipeline: which datasets are legally shared, which vendors integrate them, and which operational
          outcomes follow (detentions, denials, predictive targeting). The pipeline matters more than any single vendor.
        </Gap>
      </Section>

      <Metrics>
        <Metric id="fisa-702" label="FISA 702 sunset" color="#34d399" />
        <Metric id="palantir-army" label="Palantir–Army agreement (max)" color="#34d399" />
      </Metrics>
    </div>
  );
}
