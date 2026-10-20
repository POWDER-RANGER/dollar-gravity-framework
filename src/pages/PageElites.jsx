import { PageHeader, Section, P, Bullets, Gap } from "../components/ui.jsx";

const link = (href, text) => <a href={href} target="_blank" rel="noopener noreferrer">{text}</a>;

export default function PageElites() {
  const c = "#a78bfa";
  return (
    <div>
      <PageHeader eyebrow="Module 04 · Elite coordination" title="Coalitions, not a board" color={c}
        lede="Coordination is real and measurable. The single-controller model is not." />

      <Section title="The coordination upgrade" tag="Critical" color={c}>
        <P>
          Elite coordination is real and measurable, but a "single board controls everything" model is analytically
          bankrupt. It produces unfalsifiable claims and blinds you to the actual dynamics: competing coalitions with
          overlapping interests, internal contradictions and genuine power struggles.
        </P>
        <P>Replace mythic framing with mechanism-level analysis. If you cannot attach a measurable mechanism, it is narrative glue.</P>
      </Section>

      <Section title="Competing coalition blocs" tag="Structure" color={c}>
        <Bullets items={[
          "Defense-industrial: contractors, think tanks (RAND, CSIS), retired-military staffing pipelines.",
          "Finance: Wall Street, Fed alumni networks, Treasury staffing, IMF and World Bank influence.",
          "Tech: Silicon Valley, the DARPA pipeline, standards bodies (IEEE, W3C), patent-system capture.",
          "Energy: fossil-fuel lobbying, regulatory capture (EPA, FERC), pipelines into state departments.",
          "Political machines: donor networks, campaign finance, PAC structures, media-incentive alignment.",
        ]} />
      </Section>

      <Section title="Measurable mechanisms" tag="Falsifiable" color={c}>
        <P>The levers you can actually track and test, and where the data lives:</P>
        <Bullets items={[
          <>Procurement awards: contract concentration, sole-source awards, hire timing. Data: {link("https://www.usaspending.gov", "USAspending.gov")}.</>,
          "Regulatory text similarity: compare lobbying-group drafts with final rule language.",
          <>Campaign finance flows: filings, PAC structure, bundler networks. Data: {link("https://www.fec.gov", "FEC")}, {link("https://www.opensecrets.org", "OpenSecrets")}.</>,
          <>Lobbying disclosures: registrants, clients, issues. Data: {link("https://lda.senate.gov", "Senate LDA database")}.</>,
          "Staffing networks: career paths between agencies, regulated industries and think tanks.",
          "Market concentration: post-merger HHI scores and regulatory-approval patterns.",
        ]} />
        <Gap>
          "Rothschild-style" shorthand is high-risk, low-signal and often a thought-terminating cliché. It drags
          analysis into unfalsifiable conspiracy heuristics. Replace it with "interlocked finance-policy networks" plus
          a specific mechanism.
        </Gap>
      </Section>
    </div>
  );
}
