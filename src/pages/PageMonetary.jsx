import { PageHeader, Section, P, Bullets, Gap, Update, Cite, Metric, Metrics } from "../components/ui.jsx";

export default function PageMonetary() {
  return (
    <div>
      <PageHeader eyebrow="Module 01 · Monetary core" title="USD as global architecture" color="#f59e0b"
        lede="Four layers of dollar power, each with its own leverage points and vulnerabilities." />

      <Section title="The dollar system is not just money" tag="Structural">
        <P>Dollar hegemony operates across four interdependent layers:</P>
        <Bullets items={[
          <>Global invoicing: most commodity and trade contracts are denominated in dollars regardless of US involvement. The dollar is on one side of 89% of FX trades <Cite id="bis-fx" />.</>,
          <>Reserve assets: Treasuries held by central banks and investors worldwide; demand subsidizes US borrowing costs. Foreign holdings stand at $9.33T <Cite id="tic" />.</>,
          "Payment rails: SWIFT messaging plus correspondent banking gives the US visibility and a veto over flows.",
          "Legal jurisdiction: any dollar-denominated transaction triggers US legal reach, enabling secondary sanctions.",
        ]} />
      </Section>

      <Section title="Federal Reserve" tag="Institution">
        <P>
          The Fed sets US monetary policy and operates as a global liquidity backstop through swap lines. In crises
          (2008, 2020) those swap lines became the de facto global central-bank function, extending dollar liquidity
          to allied central banks and reinforcing dependency.
        </P>
        <P>
          Fed policy transmits globally: rate hikes strengthen the dollar, tighten dollar-denominated debt for emerging
          borrowers, and create capital-flow pressure. This is structural power exercised without diplomatic intent.
        </P>
      </Section>

      <Section title="Debt limit dynamics" tag="Contested" color="#f87171">
        <P>The debt limit is two things at once, and conflating them is an analytic error:</P>
        <Bullets items={[
          "Politically performative: self-imposed, repeatedly revisited, used as legislative leverage.",
          "Operationally real: hitting it forces Treasury into extraordinary measures (prioritizing payments, accounting maneuvers).",
          "A default-risk window: if Congress fails to act, payment delays cascade into rating pressure, bill-yield spikes and eroded dollar confidence.",
        ]} />
        <Update>
          <p>
            The 2025 reconciliation law raised the limit to $41.104T. Debt subject to the limit was about $39.7T in
            August 2026, and one projection puts the limit being reached around May 2027 with an X-date near
            February 2028 <Cite id="debt-limit" />. The hard-failure window is therefore not in the near term.
          </p>
        </Update>
        <Gap>
          The "performative" label holds only if the system keeps resolving the constraint before hard failure. If
          payments halt, it stops being theater. Track the extraordinary-measures clock, not the rhetoric cycle.
        </Gap>
      </Section>

      <Section title="Is the dollar losing ground?" tag="Reading" color="#22d3ee">
        <P>
          The data are mixed rather than one-directional. The dollar's share of global reserves slipped from 57.18% to
          56.70% between Q1 and Q2 2026, while the euro and renminbi rose <Cite id="cofer" />. Yet foreign Treasury
          holdings keep growing in aggregate, even as China's reported holdings fell about 22% from December 2024
          <Cite id="tic-china" />. Reserve shares move slowly and are distorted by exchange-rate valuation, so single
          quarters say little. The F-1 thresholds (50% of reserves, 30% of SWIFT value) are the tests that matter.
        </P>
      </Section>

      <Metrics>
        <Metric id="bis-fx" label="USD share of FX trades" />
        <Metric id="cofer" label="USD share of global reserves" />
        <Metric id="swift" label="USD share of SWIFT payments (value)" />
        <Metric id="tic" label="Foreign Treasury holdings" color="#fb923c" />
        <Metric id="debt-limit" label="Debt limit" color="#f87171" />
      </Metrics>
    </div>
  );
}
