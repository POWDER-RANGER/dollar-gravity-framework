import { PageHeader, Section, P, Bullets, Gap, Update, Cite } from "../components/ui.jsx";

export default function PageResistance() {
  const c = "#22d3ee";
  return (
    <div>
      <PageHeader eyebrow="Module 07 · Resistance and brakes" title="What actually slows the machine" color={c}
        lede="Brakes exist at the institutional and technical layers, and each can be turned against the people using it." />

      <Section title="Institutional brakes" tag="Structural" color={c}>
        <Bullets items={[
          "Courts and judicial review: Fourth Amendment challenges, preliminary injunctions, class-action standing.",
          "Federalism: state attorneys general, state privacy laws (CCPA, SHIELD Act), sanctuary jurisdictions.",
          "Congress and oversight: the FISA Court, the Senate Intelligence Committee, inspectors general (when functional).",
          "NGOs and civil society: ACLU, EFF and Brennan Center litigation pipelines; FOIA campaigns.",
          "Journalism: investigative reporting as an accountability mechanism (Snowden, ICIJ, ProPublica).",
        ]} />
        <Update>
          <p>
            Congress used a brake in 2026: Section 702 was allowed to lapse in June rather than renewed without a
            warrant requirement <Cite id="fisa-702" />. The practical effect was limited because existing FISC
            certifications keep collection running, which is itself a lesson in how brakes interact with continuity
            mechanisms.
          </p>
        </Update>
      </Section>

      <Section title="Technical brakes" tag="Technical" color={c}>
        <Bullets items={[
          "End-to-end encryption (Signal, ProtonMail) makes content collection expensive even with access.",
          "Decentralized protocols (Tor, I2P, mesh networks) raise collection cost.",
          "Metadata minimization: ephemeral messaging and VPN routing obscure the behavioral graph.",
          "Open-source intelligence democratizes surveillance capability and cuts both ways.",
          "Competing elite interests: tech companies resist government access demands when trust and valuation are at stake.",
        ]} />
      </Section>

      <Section title="The backfire dynamic" tag="Warning" color={c}>
        <P>Resistance tools can be weaponized against resistance. This is the critical non-linear dynamic:</P>
        <Bullets items={[
          "Violent events justify expanded database authorities (the post-9/11 PATRIOT Act pattern).",
          "Encrypted networks become the justification for “going dark” legislation targeting encryption.",
          "Legible opposition (organized, named, public) is easiest to map, monitor and preempt.",
          "Decentralized, lawful, low-profile organizing is structurally harder to surveil and preempt.",
          "Key distinction: the state benefits from opposition it can read; illegibility is the asymmetric advantage.",
        ]} />
        <Gap>
          If repression accelerates after violent events while lawful decentralization stays resilient, the backfire
          dynamic dominates. Track surveillance-authority expansions before and after incidents.
        </Gap>
      </Section>
    </div>
  );
}
