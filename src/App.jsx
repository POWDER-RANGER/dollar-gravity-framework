import { useState, useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";

const PAGES = [
  { id: "overview", label: "OVERVIEW", icon: "◈" },
  { id: "monetary", label: "MONETARY CORE", icon: "₿" },
  { id: "trade", label: "TRADE WEAPONS", icon: "⚖" },
  { id: "rivals", label: "RIVALS & HOLDOUTS", icon: "⊕" },
  { id: "elites", label: "ELITE NETWORKS", icon: "◉" },
  { id: "war", label: "WAR / CONFLICT", icon: "⚔" },
  { id: "domestic", label: "DOMESTIC DRIFT", icon: "◎" },
  { id: "resistance", label: "RESISTANCE", icon: "⊗" },
  { id: "falsifiers", label: "FALSIFIERS", icon: "?" },
  { id: "graph", label: "SYSTEM MAP", icon: "⬡" },
  { id: "steering", label: "SYSTEM STEERING", icon: "⟡" },
];

const NODES = [
  { id: "usd", label: "USD Settlement\nLayer", group: "monetary", x: 400, y: 300 },
  { id: "fed", label: "Federal\nReserve", group: "monetary", x: 280, y: 200 },
  { id: "treasury", label: "US\nTreasury", group: "monetary", x: 520, y: 200 },
  { id: "debtceil", label: "Debt\nCeiling", group: "monetary", x: 640, y: 280 },
  { id: "tariffs", label: "Tariffs", group: "trade", x: 200, y: 380 },
  { id: "sanctions", label: "Sanctions", group: "trade", x: 200, y: 460 },
  { id: "rails", label: "Payment\nRails", group: "trade", x: 120, y: 300 },
  { id: "uschina", label: "US–China\nEntanglement", group: "rivals", x: 580, y: 420 },
  { id: "iran", label: "Iran\nHoldout", group: "rivals", x: 700, y: 480 },
  { id: "nk", label: "N. Korea\nHoldout", group: "rivals", x: 780, y: 380 },
  { id: "bypass", label: "Bypass\nNetworks", group: "rivals", x: 740, y: 550 },
  { id: "elites", label: "Elite\nCoalitions", group: "elites", x: 400, y: 160 },
  { id: "lobby", label: "Lobbying /\nProcurement", group: "elites", x: 280, y: 100 },
  { id: "revolving", label: "Revolving\nDoor", group: "elites", x: 520, y: 100 },
  { id: "war", label: "Conflict /\nWar", group: "war", x: 620, y: 340 },
  { id: "rnd", label: "R&D / Data\nFeedback", group: "war", x: 700, y: 260 },
  { id: "vendor", label: "Vendor\nEcosystem", group: "domestic", x: 300, y: 500 },
  { id: "surveillance", label: "Surveillance\nDrift", group: "domestic", x: 200, y: 560 },
  { id: "courts", label: "Courts /\nFederalism", group: "resistance", x: 440, y: 520 },
  { id: "encrypt", label: "Encryption /\nDecentralize", group: "resistance", x: 360, y: 600 },
  { id: "falsify", label: "Falsifiers /\nUnknowns", group: "falsifiers", x: 500, y: 600 },
  { id: "narrative", label: "NARRATIVE\nLayer", group: "steering", x: 80, y: 160 },
  { id: "reality", label: "REALITY\nLayer", group: "steering", x: 80, y: 320 },
  { id: "projection", label: "PROJECTION\nLayer", group: "steering", x: 80, y: 480 },
];

const LINKS = [
  { source: "fed", target: "usd", label: "controls" },
  { source: "treasury", target: "usd", label: "issues debt" },
  { source: "usd", target: "rails", label: "settlement" },
  { source: "usd", target: "debtceil", label: "constraint" },
  { source: "treasury", target: "debtceil", label: "ceiling" },
  { source: "tariffs", target: "treasury", label: "revenue" },
  { source: "rails", target: "sanctions", label: "choke point" },
  { source: "sanctions", target: "iran", label: "restricts" },
  { source: "sanctions", target: "nk", label: "restricts" },
  { source: "iran", target: "bypass", label: "builds" },
  { source: "nk", target: "bypass", label: "builds" },
  { source: "usd", target: "uschina", label: "entangles" },
  { source: "uschina", target: "war", label: "rivalry" },
  { source: "war", target: "rnd", label: "feedback" },
  { source: "rnd", target: "vendor", label: "procurement" },
  { source: "elites", target: "lobby", label: "mechanism" },
  { source: "elites", target: "revolving", label: "mechanism" },
  { source: "lobby", target: "treasury", label: "influence" },
  { source: "revolving", target: "fed", label: "staffing" },
  { source: "elites", target: "vendor", label: "contracts" },
  { source: "vendor", target: "surveillance", label: "data pipeline" },
  { source: "surveillance", target: "courts", label: "challenged by" },
  { source: "courts", target: "falsify", label: "rollback?" },
  { source: "encrypt", target: "surveillance", label: "resists" },
  { source: "falsify", target: "usd", label: "de-dollar?" },
  { source: "war", target: "sanctions", label: "amplifies" },
  { source: "tariffs", target: "uschina", label: "instrument" },
  { source: "narrative", target: "usd", label: "frames" },
  { source: "narrative", target: "tariffs", label: "misframes" },
  { source: "reality", target: "tariffs", label: "measures" },
  { source: "reality", target: "sanctions", label: "measures" },
  { source: "reality", target: "rails", label: "chokepoint" },
  { source: "projection", target: "elites", label: "steers" },
  { source: "projection", target: "war", label: "accelerates" },
  { source: "projection", target: "surveillance", label: "normalizes" },
  { source: "narrative", target: "projection", label: "fuels" },
  { source: "reality", target: "projection", label: "constrains" },
];

const GROUP_COLORS = {
  monetary: "#f59e0b",
  trade: "#60a5fa",
  rivals: "#f87171",
  elites: "#a78bfa",
  war: "#fb923c",
  domestic: "#34d399",
  resistance: "#22d3ee",
  falsifiers: "#94a3b8",
  steering: "#c084fc",
};

const GROUP_LABELS = {
  monetary: "Monetary Core",
  trade: "Trade Weapons",
  rivals: "Rivals & Holdouts",
  elites: "Elite Networks",
  war: "War / Conflict",
  domestic: "Domestic Drift",
  resistance: "Resistance",
  falsifiers: "Falsifiers",
  steering: "Steering Field",
};

function Tag({ color, children }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: "2px",
      fontSize: "10px",
      fontFamily: "monospace",
      letterSpacing: "0.1em",
      background: color + "22",
      color: color,
      border: `1px solid ${color}44`,
      marginRight: "6px",
      marginBottom: "4px",
    }}>{children}</span>
  );
}

function GapBox({ children }) {
  return (
    <div style={{
      margin: "16px 0",
      padding: "14px 18px",
      borderLeft: "3px solid #f59e0b",
      background: "#f59e0b08",
      borderRadius: "0 6px 6px 0",
    }}>
      <div style={{ color: "#f59e0b", fontSize: "10px", fontFamily: "monospace", letterSpacing: "0.15em", marginBottom: "6px" }}>
        ◈ GAP / FALSIFIABILITY
      </div>
      <div style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.7" }}>{children}</div>
    </div>
  );
}

function Section({ title, tag, tagColor, children }) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
        <div style={{
          width: "3px", height: "20px",
          background: tagColor || "#f59e0b",
          borderRadius: "2px",
        }} />
        <h3 style={{ margin: 0, fontSize: "13px", fontFamily: "monospace", letterSpacing: "0.12em", color: "#e2e8f0" }}>
          {title}
        </h3>
        {tag && <Tag color={tagColor || "#f59e0b"}>{tag}</Tag>}
      </div>
      <div style={{ paddingLeft: "15px" }}>{children}</div>
    </div>
  );
}

function P({ children }) {
  return <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.8", marginBottom: "10px" }}>{children}</p>;
}

function BulletList({ items }) {
  return (
    <ul style={{ margin: "8px 0", paddingLeft: "0", listStyle: "none" }}>
      {items.map((item, i) => (
        <li key={i} style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.7", marginBottom: "6px", paddingLeft: "16px", position: "relative" }}>
          <span style={{ position: "absolute", left: 0, color: "#f59e0b" }}>›</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function Metric({ label, value, status }) {
  const statusColor = status === "high" ? "#f87171" : status === "med" ? "#f59e0b" : "#34d399";
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "10px 14px", background: "#0f172a", borderRadius: "4px", marginBottom: "6px",
      border: "1px solid #1e293b",
    }}>
      <span style={{ color: "#64748b", fontSize: "12px", fontFamily: "monospace" }}>{label}</span>
      <span style={{ color: statusColor, fontSize: "12px", fontFamily: "monospace", fontWeight: "bold" }}>{value}</span>
    </div>
  );
}

// ─── PAGES ───────────────────────────────────────────────────────────────────

function PageOverview() {
  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#475569", letterSpacing: "0.2em", marginBottom: "8px" }}>
          CLASSIFIED — ANALYTICAL FRAMEWORK — REV 2.0
        </div>
        <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#f1f5f9", margin: "0 0 8px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
          Dollar-Centric Global Finance<br />& Security System
        </h1>
        <p style={{ color: "#64748b", fontSize: "13px", fontFamily: "monospace", margin: 0 }}>
          A falsifiable systems model — rivalries, bypasses, and competing blocs that still route through the core.
        </p>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "32px"
      }}>
        {[
          { label: "System Nodes", val: "8 clusters", color: "#f59e0b" },
          { label: "Key Mechanisms", val: "23 identified", color: "#60a5fa" },
          { label: "Active Falsifiers", val: "5 primary", color: "#f87171" },
          { label: "Model Confidence", val: "Medium-High", color: "#34d399" },
        ].map(c => (
          <div key={c.label} style={{
            padding: "16px", background: "#0f172a", borderRadius: "6px",
            border: `1px solid ${c.color}22`,
          }}>
            <div style={{ color: c.color, fontSize: "20px", fontWeight: "900", fontFamily: "monospace" }}>{c.val}</div>
            <div style={{ color: "#475569", fontSize: "11px", fontFamily: "monospace", marginTop: "4px", letterSpacing: "0.08em" }}>{c.label}</div>
          </div>
        ))}
      </div>

      <Section title="WHAT THIS MODEL CLAIMS" tagColor="#60a5fa" tag="CORE">
        <P>
          The United States operates the dominant global monetary and security system through four interlocking instruments: USD as the global invoicing and settlement currency, US Treasuries as the world's primary reserve asset, correspondent banking rails as a payment chokepoint, and US legal jurisdiction over any dollar-denominated transaction.
        </P>
        <P>
          This is not a closed system. Rivals operate within it (China), partially outside it (Russia), or under extreme constraint at the edges (Iran, North Korea). Every actor — even adversaries — must account for dollar gravity.
        </P>
      </Section>

      <Section title="MODEL ARCHITECTURE" tagColor="#a78bfa" tag="STRUCTURE">
        <BulletList items={[
          "Monetary Core — USD rails, Fed/Treasury mechanics, debt ceiling dynamics",
          "Trade Weapons — Tariffs (domestic burden), Sanctions (choke-point leverage)",
          "Rivals & Holdouts — Inside-system rivals vs constrained outsiders with bypass stacks",
          "Elite Coordination — Competing coalitions, not a monolithic board; mechanism-level analysis",
          "War/Conflict — Real stakes + data/R&D feedback loop + signaling vs disruption",
          "Domestic Drift — Fragmented US surveillance vs centralized Chinese model",
          "Resistance/Brakes — Courts, NGOs, encryption, decentralization, backfire dynamics",
          "Falsifiers — Metrics that would force a model rewrite",
        ]} />
      </Section>

      <GapBox>
        This model is only useful insofar as it generates testable predictions. Each section includes explicit falsifiability conditions. If you cannot attach a measurable mechanism to a claim, it's narrative glue — not structure.
      </GapBox>
    </div>
  );
}

function PageMonetary() {
  return (
    <div>
      <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#f59e0b", letterSpacing: "0.2em", marginBottom: "16px" }}>
        MODULE 01 — MONETARY CORE
      </div>
      <h2 style={{ fontSize: "22px", fontWeight: "900", color: "#f1f5f9", margin: "0 0 24px" }}>
        USD as Global Architecture
      </h2>

      <Section title="THE DOLLAR SYSTEM IS NOT JUST MONEY" tagColor="#f59e0b" tag="STRUCTURAL">
        <P>USD hegemony operates across four distinct but interdependent layers, each with its own leverage points and vulnerabilities:</P>
        <BulletList items={[
          "Global invoicing — most commodity and trade contracts denominated in USD regardless of US involvement",
          "Reserve assets — Treasuries held by central banks worldwide; demand subsidizes US borrowing costs",
          "Payment rails — SWIFT messaging + correspondent banking = US visibility and veto power over flows",
          "Legal jurisdiction — any dollar-denominated transaction triggers US legal reach, enabling secondary sanctions",
        ]} />
      </Section>

      <Section title="FEDERAL RESERVE" tagColor="#f59e0b" tag="INSTITUTION">
        <P>
          The Fed sets US monetary policy (interest rates, money supply) and operates as a global liquidity backstop via swap lines. During crises (2008, 2020), Fed swap lines became the de facto global central bank function — extending dollar liquidity to allied central banks, reinforcing system dependency.
        </P>
        <P>
          Fed policy transmits globally: rate hikes strengthen USD, tighten dollar-denominated debt for EM borrowers, and create capital flow pressure. This is structural power exercised without diplomatic intent.
        </P>
      </Section>

      <Section title="DEBT CEILING DYNAMICS" tagColor="#f87171" tag="CONTESTED">
        <P>The debt ceiling is simultaneously two things, and conflating them is an analytic error:</P>
        <BulletList items={[
          "Politically performative — self-imposed, repeatedly revisited, used as legislative leverage",
          "Operationally real — hitting it forces Treasury into 'extraordinary measures' (prioritizing payments, accounting maneuvers)",
          "Default risk window — if Congress fails to act, payment delays trigger cascading effects: credit rating pressure, Treasury bill yield spikes, dollar confidence erosion",
        ]} />
      </Section>

      <GapBox>
        The "performative" label only holds if the system keeps resolving the constraint before hard failure. If payments halt, it stops being theater. Track the actual extraordinary measures clock, not just the political rhetoric cycle.
      </GapBox>

      <div style={{ marginTop: "24px" }}>
        <div style={{ color: "#475569", fontSize: "11px", fontFamily: "monospace", marginBottom: "10px", letterSpacing: "0.1em" }}>SYSTEM HEALTH INDICATORS</div>
        <Metric label="USD GLOBAL INVOICING SHARE" value="~88% of FX transactions" status="high" />
        <Metric label="TREASURY FOREIGN HOLDINGS" value="~$7.6T (≈30% of public debt)" status="med" />
        <Metric label="SWIFT USD SETTLEMENT SHARE" value="~47% of SWIFT messages" status="high" />
        <Metric label="DE-DOLLARIZATION PRESSURE" value="Elevated but slow" status="med" />
      </div>
    </div>
  );
}

function PageTrade() {
  return (
    <div>
      <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#60a5fa", letterSpacing: "0.2em", marginBottom: "16px" }}>
        MODULE 02 — TRADE / FINANCE INSTRUMENTS
      </div>
      <h2 style={{ fontSize: "22px", fontWeight: "900", color: "#f1f5f9", margin: "0 0 24px" }}>
        Weapons That Look Like Policy
      </h2>

      <Section title="TARIFFS — COMMON MISCONCEPTIONS" tagColor="#60a5fa" tag="CORRECTIVE">
        <P>Tariffs are among the most misunderstood instruments in public discourse. The mechanism:</P>
        <BulletList items={[
          "Collected from US importers at the border — not from the foreign exporting country",
          "Revenue flows to the US Treasury — not a transfer to or from China or any trade partner",
          "Economic burden is primarily domestic — borne by importers, then passed to consumers",
          "Exporters absorb partial cost via price cuts to remain competitive — but empirical pass-through studies show this is limited",
          "No direct causal link to Treasury bond interest — China earns interest as a bondholder via normal debt markets, not as a tariff mechanism",
        ]} />
        <GapBox>
          If trade data shows exporters dropping prices enough to absorb most tariffs, the "Americans pay almost all" claim weakens. Recent shipment/price pass-through studies argue high US-side incidence. Track sector-by-sector: electronics vs agriculture vs industrial inputs behave differently.
        </GapBox>
      </Section>

      <Section title="SANCTIONS — MECHANISM MAP" tagColor="#60a5fa" tag="LEVERAGE">
        <P>Sanctions operate across distinct chokepoints with variable effectiveness by sector:</P>
        <BulletList items={[
          "Finance chokepoints — correspondent banking restrictions, SWIFT access denial, asset freezes",
          "Tech chokepoints — export controls on chips, tooling, IP; FDPR (Foreign Direct Product Rule) extends US reach",
          "Shipping/insurance — Lloyd's and western maritime insurance as enforcement lever",
          "Secondary sanctions — penalizing third-party entities for transacting with sanctioned states (extends reach beyond US jurisdiction)",
        ]} />
        <P>Effectiveness varies dramatically by sector and target sophistication. Financial sanctions hit fast; technology gaps take years to manifest; commodity trade finds alternatives quickly via intermediaries.</P>
      </Section>

      <Section title="PAYMENT RAILS AS CHOKEPOINT" tagColor="#60a5fa" tag="INFRASTRUCTURE">
        <BulletList items={[
          "SWIFT — messaging layer, not settlement; but denial cuts off interbank communication globally",
          "Correspondent banking — US banks as gateway; compliance risk causes 'de-risking' even without sanctions",
          "Eurodollar market — offshore USD creation outside Fed control; the shadow dollar system",
          "CIPS (Chinese) — alternative interbank messaging; growing but still limited reach vs SWIFT",
          "Crypto/barter — low-volume bypass for sanctioned states; costly and illiquid at scale",
        ]} />
      </Section>
    </div>
  );
}

function PageRivals() {
  return (
    <div>
      <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#f87171", letterSpacing: "0.2em", marginBottom: "16px" }}>
        MODULE 03 — RIVALS & HOLDOUTS
      </div>
      <h2 style={{ fontSize: "22px", fontWeight: "900", color: "#f1f5f9", margin: "0 0 24px" }}>
        Inside the System vs Constrained Outside
      </h2>

      <Section title="US–CHINA: RIVALS INSIDE AN ENTANGLED SYSTEM" tagColor="#f87171" tag="RIVALRY">
        <P>
          The US-China relationship defies clean adversary framing. They are simultaneously: strategic competitors (military, tech, influence), economic codependents (supply chains, Treasury holdings, consumer markets), and systemic rivals (dollar vs yuan, SWIFT vs CIPS, liberal order vs state capitalism).
        </P>
        <BulletList items={[
          "China holds ~$800B+ in US Treasuries — a hostage arrangement that constrains both sides",
          "Apple, Nike, and thousands of US firms deeply embedded in Chinese manufacturing",
          "China's CIPS and digital yuan efforts are long-run bets on dollar independence, not near-term alternatives",
          "Trade war tariffs (2018–present) are as much domestic political signaling as strategic decoupling",
        ]} />
        <GapBox>
          The key falsifier here: does decoupling actually happen at the supply chain level, or does it just reroute through intermediaries (Vietnam, Mexico)? Track actual origin-of-manufacture data, not just trade partner statistics.
        </GapBox>
      </Section>

      <Section title="IRAN — HIGH-CONSTRAINT HOLDOUT" tagColor="#f87171" tag="CONSTRAINED">
        <BulletList items={[
          "Decades of sanctions have forced development of alternative financial architecture",
          "Uses intermediaries (Iraq, UAE historically) for oil exports; accepts discounts (~20–40% below market)",
          "Relies on barter, cryptocurrency, and gold for some external transactions",
          "IRGC-linked networks conduct shadow banking across Turkey, Afghanistan, Pakistan",
          "Real cost: persistent currency collapse, tech gap, reduced capital access",
        ]} />
      </Section>

      <Section title="NORTH KOREA — NEAR-OUTSIDE HOLDOUT" tagColor="#f87171" tag="EXTREME">
        <BulletList items={[
          "Most sanctioned state on Earth; operates near-outside mainstream finance",
          "Maintains access via China as structural lifeline — Beijing tolerates leakage for buffer-state reasons",
          "DPRK hackers (Lazarus Group) have stolen est. $3B+ in crypto to fund weapons programs",
          "Arms exports (artillery shells to Russia, ballistic tech to Iran/others) generate hard currency",
          "Illicit finance dependence means it's never fully outside — it needs the system's edges to function",
        ]} />
      </Section>
    </div>
  );
}

function PageElites() {
  return (
    <div>
      <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#a78bfa", letterSpacing: "0.2em", marginBottom: "16px" }}>
        MODULE 04 — ELITE COORDINATION
      </div>
      <h2 style={{ fontSize: "22px", fontWeight: "900", color: "#f1f5f9", margin: "0 0 24px" }}>
        Coalitions, Not a Board
      </h2>

      <Section title="THE COORDINATION UPGRADE" tagColor="#a78bfa" tag="CRITICAL">
        <P>
          Elite coordination is real and measurable — but the "single board controls everything" model is analytically bankrupt. It produces unfalsifiable claims and blinds you to the actual dynamics: competing coalitions with overlapping interests, internal contradictions, and genuine power struggles.
        </P>
        <P>Replace mythic framing with mechanism-level analysis. If you can't attach a measurable mechanism, it's narrative glue.</P>
      </Section>

      <Section title="COMPETING COALITION BLOCS" tagColor="#a78bfa" tag="STRUCTURE">
        <BulletList items={[
          "Defense-industrial complex — defense contractors, think tanks (RAND, CSIS), retired military staffing pipelines",
          "Finance coalition — Wall St, Fed alumni network, Treasury staffing, IMF/World Bank influence",
          "Tech coalition — Silicon Valley, DARPA pipeline, standards bodies (IEEE, W3C), patent system capture",
          "Energy coalition — fossil fuel lobbying, regulatory capture (EPA, FERC), pipeline to state departments",
          "Political machines — donor networks, campaign finance, PAC structures, media incentive alignment",
        ]} />
      </Section>

      <Section title="MEASURABLE MECHANISMS" tagColor="#a78bfa" tag="FALSIFIABLE">
        <P>These are the levers you can actually track and test:</P>
        <BulletList items={[
          "Procurement awards — contract concentration, sole-source awards, revolving-door hire timing",
          "Regulatory text similarity — compare lobbying group drafts to final rule language",
          "Campaign finance flows — FEC filings, PAC structure, bundler networks, dark money routing",
          "Staffing networks — map career paths between agencies, regulated industries, and think tanks",
          "Market concentration metrics — post-merger HHI scores, regulatory approval patterns",
        ]} />
        <GapBox>
          The "Rothschild-style" shorthand is high-risk, low-signal, and often acts as thought-terminating cliché. It drags analysis into unfalsifiable conspiracy heuristics. Replace with: "interlocked finance-policy networks" + specify the mechanism.
        </GapBox>
      </Section>
    </div>
  );
}

function PageWar() {
  return (
    <div>
      <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#fb923c", letterSpacing: "0.2em", marginBottom: "16px" }}>
        MODULE 05 — WAR / CONFLICT
      </div>
      <h2 style={{ fontSize: "22px", fontWeight: "900", color: "#f1f5f9", margin: "0 0 24px" }}>
        Theater and Stakes
      </h2>

      <Section title="WAR AS DATA ENGINE" tagColor="#fb923c" tag="DOCTRINE">
        <P>Modern conflict is simultaneously a geopolitical contest and an accelerated R&D feedback loop:</P>
        <BulletList items={[
          "Battlefield = sensor network — real-time data on weapons effectiveness, doctrine gaps, logistics chains",
          "Procurement learns fast — systems that fail in combat get canceled; effective ones get scaled",
          "Doctrine updates in real-time — Ukraine proved drone/counter-drone doctrine in 18 months vs typical decade cycles",
          "Export marketing — combat-proven systems command price premiums; US defense exports partly funded by demonstration effect",
          "Intel collection — adversary tactics, electronic signatures, and order of battle revealed under combat conditions",
        ]} />
      </Section>

      <Section title="WAR AS REAL STAKES" tagColor="#fb923c" tag="GEOPOLITICS">
        <P>Security guarantees, borders, resources, and alliance credibility are not "just for show." The signaling and the substance are entangled:</P>
        <BulletList items={[
          "Alliance credibility — failure to defend a commitment (Ukraine, Taiwan) cascades to every other guarantee",
          "Resource access — physical control of energy, rare earths, water creates long-run structural leverage",
          "Border legitimacy — precedent effects of territorial conquest destabilize adjacent frozen conflicts",
          "Nuclear deterrence — underlies all conventional calculations; no major-power war without nuclear shadow",
        ]} />
      </Section>

      <Section title="SANCTIONS + SEIZURES AS WAR INSTRUMENT" tagColor="#fb923c" tag="FINANCIAL WAR">
        <BulletList items={[
          "Russian reserve freeze ($300B+) — demonstrated that reserve assets are hostage to political decisions",
          "SWIFT exclusion — degraded Russian banking but didn't collapse it; energy exports via China/India continued",
          "Chip export controls — 18-24 month lag before battlefield effect; Russia substituting lower-grade components",
          "Insurance denial — Lloyd's withdrawal from Russia shipping forced rerouting through shadow fleets",
        ]} />
        <GapBox>
          If sanctions don't change battlefield sustainment, tech acquisition, or state revenue trajectories over a 2–3 year window, they're mostly symbolic. Russia's 2022 sanction response is the best recent case study — energy revenue held up; finance was disrupted but adapted.
        </GapBox>
      </Section>
    </div>
  );
}

function PageDomestic() {
  return (
    <div>
      <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#34d399", letterSpacing: "0.2em", marginBottom: "16px" }}>
        MODULE 06 — DOMESTIC CONTROL DRIFT
      </div>
      <h2 style={{ fontSize: "22px", fontWeight: "900", color: "#f1f5f9", margin: "0 0 24px" }}>
        The Surveillance Architecture Gap
      </h2>

      <Section title="CHINA: CENTRALIZED MODEL" tagColor="#34d399" tag="INTEGRATED">
        <BulletList items={[
          "Integrated state capacity — party, military, corporate, and security functions interlock by design",
          "Social credit system — multivariable behavioral scoring across financial, social, and civic domains",
          "Facial recognition at scale — 600M+ cameras; real-time population tracking in urban centers",
          "Platform capture — WeChat, Alipay, Douyin operate under direct state data-sharing obligations",
          "XinJiang model — extreme surveillance architecture tested on Uyghur population, exported to allies",
        ]} />
      </Section>

      <Section title="US: FRAGMENTED VENDOR ECOSYSTEM" tagColor="#34d399" tag="DISTRIBUTED">
        <P>The US model is not centralized by design — but fragmentation doesn't mean absence. The architecture is a distributed surveillance ecosystem that produces similar outcomes through different means:</P>
        <BulletList items={[
          "Data brokers — commercial aggregation of location, financial, behavioral data sold to government agencies without warrant",
          "Fusion centers — DHS-linked state/local intel sharing hubs; 80+ nationwide; variable oversight",
          "Platform analytics — social graph, search, location data accessible via legal process (NSLs, subpoenas, emergency requests)",
          "Vendor ecosystems — Palantir, Axon, ShotSpotter, Clearview AI as nodes in a fragmented but integrated system",
          "FISA/702 — mass collection authorities that target foreign communications but inevitably collect domestic",
        ]} />
      </Section>

      <Section title="PALANTIR AS EXAMPLE NODE (NOT THE WHOLE STORY)" tagColor="#34d399" tag="CASE STUDY">
        <P>
          Palantir's government contracts (ICE, CBP, CIA, NSA, DHS, Army) make it a useful illustration of the vendor-as-infrastructure model. But it's one node among many — treating it as the control center reproduces the "single board" error from the elite coordination section.
        </P>
        <GapBox>
          Track the actual pipeline: what datasets are legally shared → what vendors integrate them → what operational outcomes follow (detentions, denials, predictive targeting). The pipeline matters more than any single vendor node.
        </GapBox>
      </Section>
    </div>
  );
}

function PageResistance() {
  return (
    <div>
      <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#22d3ee", letterSpacing: "0.2em", marginBottom: "16px" }}>
        MODULE 07 — RESISTANCE / BRAKES
      </div>
      <h2 style={{ fontSize: "22px", fontWeight: "900", color: "#f1f5f9", margin: "0 0 24px" }}>
        What Actually Slows the Machine
      </h2>

      <Section title="INSTITUTIONAL BRAKES" tagColor="#22d3ee" tag="STRUCTURAL">
        <BulletList items={[
          "Courts / judicial review — Fourth Amendment challenges, preliminary injunctions, class action standing",
          "Federalism — state AGs, state privacy laws (CCPA, SHIELD Act), sanctuary jurisdictions",
          "Congress / oversight — FISA Court, Senate Intelligence Committee, IG offices (when functional)",
          "NGOs / civil society — ACLU, EFF, Brennan Center litigation pipeline; FOIA warfare",
          "Journalism — investigative reporting as accountability mechanism (Snowden, ICIJ, ProPublica model)",
        ]} />
      </Section>

      <Section title="TECHNICAL BRAKES" tagColor="#22d3ee" tag="TECHNICAL">
        <BulletList items={[
          "End-to-end encryption — Signal, ProtonMail; makes content collection expensive even with access",
          "Decentralized protocols — Tor, I2P, mesh networks; raises collection cost",
          "Metadata minimization — ephemeral messaging, VPN routing obscures behavioral graph",
          "Open-source intelligence (OSINT) — democratizes surveillance capability; cuts both ways",
          "Competing elite interests — tech companies resist government access demands when it threatens user trust / valuation",
        ]} />
      </Section>

      <Section title="THE BACKFIRE DYNAMIC" tagColor="#22d3ee" tag="WARNING">
        <P>
          Resistance tools can be weaponized against resistance. This is the critical non-linear dynamic:
        </P>
        <BulletList items={[
          "Violent events justify expanded database authorities (PATRIOT Act post-9/11 pattern)",
          "Encrypted networks become justification for 'going dark' legislation targeting encryption",
          "'Legible' opposition (organized, named, public) is easiest to map, monitor, and preempt",
          "Decentralized, lawful, low-profile organizing is structurally harder to surveil and preempt",
          "Key distinction: the state benefits from opposition it can read; illegibility is the asymmetric advantage",
        ]} />
        <GapBox>
          If repression accelerates after violent events while lawful decentralization remains resilient, the backfire dynamic dominates. Track pre/post incident surveillance authority expansions.
        </GapBox>
      </Section>
    </div>
  );
}

function PageFalsifiers() {
  return (
    <div>
      <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#94a3b8", letterSpacing: "0.2em", marginBottom: "16px" }}>
        MODULE 08 — FALSIFIERS
      </div>
      <h2 style={{ fontSize: "22px", fontWeight: "900", color: "#f1f5f9", margin: "0 0 24px" }}>
        What Would Force a Rewrite
      </h2>

      <P style={{ color: "#64748b" }}>These are the five primary triggers that would require significant revision of the model. Monitoring these is not optional — they're the model's immune system.</P>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "24px" }}>
        {[
          {
            n: "F-1",
            title: "De-Dollarization Threshold",
            desc: "If USD share of global reserves falls below 50% (from ~58% now), or SWIFT USD message share drops below 30%, the monetary core model requires fundamental revision. Watch: BRICS+ payment architecture, petroyuan denomination of Gulf oil exports, central bank reserve diversification filings.",
            status: "MONITOR",
            color: "#f59e0b",
          },
          {
            n: "F-2",
            title: "Sanctions Efficacy Collapse",
            desc: "If Russia maintains 3+ years of stable tech acquisition, battlefield sustainment, and state revenue despite maximum western financial pressure, the 'financial warfare is decisive' claim fails. The Ukraine conflict is the best live test in decades.",
            status: "ACTIVE TEST",
            color: "#f87171",
          },
          {
            n: "F-3",
            title: "Domestic Surveillance Rollback",
            desc: "If Congress passes meaningful Section 702 reform, courts invalidate data broker-to-government pipelines, or state privacy laws create genuinely enforceable barriers — the 'ratchet only goes one direction' assumption fails. Watch: FISA reauthorization votes, FTC enforcement actions, state AG litigation outcomes.",
            status: "MONITOR",
            color: "#22d3ee",
          },
          {
            n: "F-4",
            title: "Elite Coalition Fracture",
            desc: "If a major policy rupture occurs between the defense-industrial and finance coalitions (e.g., defense spending cuts forced by debt crisis, or tech-defense split over AI ethics), the 'coordination holds' assumption weakens. Watch: budget reconciliation, defense contractor lobbying patterns, tech company government contract terminations.",
            status: "EMERGING",
            color: "#a78bfa",
          },
          {
            n: "F-5",
            title: "Debt Ceiling Hard Failure",
            desc: "If Treasury misses a payment — any payment — the 'performative' label is permanently retired. Even a short technical default reprices the risk-free rate globally and restructures the Treasury market. This would cascade into every assumption the monetary core section makes.",
            status: "LOW PROB / HIGH IMPACT",
            color: "#fb923c",
          },
        ].map(f => (
          <div key={f.n} style={{
            padding: "18px", background: "#0f172a", borderRadius: "6px",
            border: `1px solid ${f.color}33`,
            position: "relative",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <span style={{ color: f.color, fontFamily: "monospace", fontSize: "11px", fontWeight: "bold" }}>{f.n}</span>
                <span style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: "700" }}>{f.title}</span>
              </div>
              <span style={{
                fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.1em",
                color: f.color, background: f.color + "22", padding: "3px 8px", borderRadius: "2px",
              }}>{f.status}</span>
            </div>
            <p style={{ color: "#64748b", fontSize: "12px", lineHeight: "1.7", margin: 0 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PageSteering() {
  const cols = [
    {
      id: "narrative",
      label: "NARRATIVE",
      color: "#c084fc",
      subtitle: "The Constructed Story",
      icon: "◈",
      desc: "Narrative manufactures consent by framing structural mechanisms as neutral or inevitable. It shapes what questions get asked and which remain invisible.",
      items: [
        { head: "Tariffs as punishment", body: "Framed as foreign countries paying; reality routes burden to domestic importers and consumers (86–94% pass-through)." },
        { head: "Sanctions as moral theater", body: "Narrated as principled response; operationally a financial chokepoint calibrated by sector and enforcement capacity." },
        { head: "Debt ceiling as crisis", body: "Politically performed as existential; mechanically resolved 78+ times since 1960 via extraordinary measures." },
        { head: "Surveillance as security", body: "Vendor ecosystem normalized as technological necessity; fragmentation framed as decentralization rather than distributed control." },
        { head: "War as defense", body: "Procurement acceleration and R&D feedback loops narrated as reactive; structurally they are forward-operating incentive systems." },
      ],
      warning: "When narrative diverges too far from measurable reality, legitimacy fractures. This is when falsifiers become visible."
    },
    {
      id: "reality",
      label: "REALITY",
      color: "#f59e0b",
      subtitle: "The Measurable Bite",
      icon: "⚖",
      desc: "Reality is the structural layer — capital flows, sanctions incidence, payment chokepoints, procurement data. It constrains what narrative can claim and what projection can promise.",
      items: [
        { head: "USD dominance metrics", body: "~88% of FX transactions; ~58% of global reserves; SWIFT USD share ~47% of messages. Declining but no viable replacement at scale." },
        { head: "Tariff incidence data", body: "Pass-through studies show 86–94% domestic burden. Exporter price absorption limited to ~6–14%. Revenue to US Treasury, not foreign states." },
        { head: "Sanctions efficacy by sector", body: "Finance sanctions hit fast. Tech gaps manifest 18–24 months out. Energy/commodity trade reroutes rapidly via intermediaries." },
        { head: "Elite coordination metrics", body: "Campaign finance: $4B+ cycle (FEC filings). Revolving door: avg 2.7 years agency-to-industry. Procurement concentration: top 5 defense contractors ~35% of DoD spend." },
        { head: "Surveillance pipeline", body: "80+ DHS fusion centers. Palantir: $463M+ in federal contracts (USASpending.gov). Data broker market: ~$240B annually with minimal warrant requirements." },
      ],
      warning: "Reality is not self-interpreting. Every metric exists inside a narrative frame that shapes which numbers get measured and how they're reported."
    },
    {
      id: "projection",
      label: "PROJECTION",
      color: "#22d3ee",
      subtitle: "The Steered Future",
      icon: "⟡",
      desc: "Projection weaponizes narrative and reality together to accelerate desired outcomes — decoupling trajectories, procurement pipelines, surveillance normalization, and alliance credibility locks.",
      items: [
        { head: "Decoupling as inevitability", body: "Narrative of US-China separation projected as structural destiny; reality of deep supply chain entanglement slows actual decoupling while accelerating political incentive." },
        { head: "War as R&D accelerant", body: "Battlefield data loops projected into multi-decade procurement pipelines; conflict becomes a forward-operating budget justification mechanism." },
        { head: "Surveillance normalization", body: "Each security event projects expanded data authority as rational response; the ratchet advances; rollback becomes politically costly." },
        { head: "Dollar alternatives as threat", body: "BRICS+ payment architecture projected as existential; reality is a multi-decade transition with no current liquidity depth to displace USD rails." },
        { head: "Elite coalition realignment", body: "Defense-tech fractures projected as coalition rupture; more likely is iterative realignment around AI/autonomy as the new procurement frontier." },
      ],
      warning: "Projection untethered from resistance capacity produces acceleration into backlash. The system's blind spot is illegible, decentralized opposition that doesn't register in projection models."
    }
  ];

  return (
    <div>
      <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#c084fc", letterSpacing: "0.2em", marginBottom: "16px" }}>
        MODULE 10 — SYSTEM STEERING FIELD
      </div>
      <h2 style={{ fontSize: "22px", fontWeight: "900", color: "#f1f5f9", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
        Narrative · Reality · Projection
      </h2>
      <p style={{ color: "#64748b", fontSize: "13px", fontFamily: "monospace", margin: "0 0 28px" }}>
        The deepest power is not any single node — it's the field that bends all nodes toward specific futures.
      </p>

      {/* Triptych */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1px", background: "#0f2040", borderRadius: "8px", overflow: "hidden", marginBottom: "28px" }}>
        {cols.map((col) => (
          <div key={col.id} style={{ background: "#060d1a", padding: "20px" }}>
            {/* Column header */}
            <div style={{
              borderBottom: `2px solid ${col.color}`,
              paddingBottom: "14px", marginBottom: "16px"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <span style={{ color: col.color, fontSize: "16px" }}>{col.icon}</span>
                <span style={{ color: col.color, fontFamily: "monospace", fontSize: "12px", fontWeight: "bold", letterSpacing: "0.15em" }}>{col.label}</span>
              </div>
              <div style={{ color: "#475569", fontSize: "11px", fontFamily: "monospace" }}>{col.subtitle}</div>
            </div>

            {/* Description */}
            <p style={{ color: "#64748b", fontSize: "12px", lineHeight: "1.7", marginBottom: "16px" }}>{col.desc}</p>

            {/* Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {col.items.map((item, i) => (
                <div key={i} style={{
                  padding: "10px", background: "#0a1628",
                  borderRadius: "4px", borderLeft: `2px solid ${col.color}55`
                }}>
                  <div style={{ color: col.color, fontSize: "10px", fontFamily: "monospace", fontWeight: "bold", marginBottom: "4px", letterSpacing: "0.05em" }}>
                    {item.head}
                  </div>
                  <div style={{ color: "#475569", fontSize: "11px", lineHeight: "1.6" }}>{item.body}</div>
                </div>
              ))}
            </div>

            {/* Warning */}
            <div style={{
              marginTop: "14px", padding: "10px 12px",
              background: col.color + "08", borderRadius: "4px",
              borderTop: `1px solid ${col.color}22`,
            }}>
              <div style={{ color: col.color + "aa", fontSize: "10px", fontFamily: "monospace", lineHeight: "1.6" }}>
                ⚠ {col.warning}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Flow diagram */}
      <div style={{ padding: "20px", background: "#0a1628", borderRadius: "6px", border: "1px solid #0f2040", marginBottom: "20px" }}>
        <div style={{ color: "#475569", fontSize: "10px", fontFamily: "monospace", letterSpacing: "0.15em", marginBottom: "14px" }}>STEERING FLOW</div>
        <div style={{ display: "flex", alignItems: "center", gap: "0", flexWrap: "wrap" }}>
          {[
            { label: "Elite Coalitions", color: "#a78bfa" },
            { arrow: "→", note: "fund & staff" },
            { label: "Narrative Construction", color: "#c084fc" },
            { arrow: "→", note: "shapes" },
            { label: "Public Consent", color: "#64748b" },
            { arrow: "→", note: "enables" },
            { label: "Policy / Law", color: "#60a5fa" },
            { arrow: "→", note: "enforces" },
            { label: "Measurable Reality", color: "#f59e0b" },
            { arrow: "→", note: "feeds" },
            { label: "Future Projection", color: "#22d3ee" },
          ].map((item, i) =>
            item.arrow ? (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 6px" }}>
                <span style={{ color: "#1e3a5f", fontSize: "16px" }}>{item.arrow}</span>
                <span style={{ color: "#1e3a5f", fontSize: "9px", fontFamily: "monospace" }}>{item.note}</span>
              </div>
            ) : (
              <div key={i} style={{
                padding: "6px 10px", background: item.color + "15",
                border: `1px solid ${item.color}33`, borderRadius: "4px",
                color: item.color, fontSize: "10px", fontFamily: "monospace", fontWeight: "bold",
              }}>{item.label}</div>
            )
          )}
        </div>
      </div>

      {/* Interplay table */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ color: "#475569", fontSize: "10px", fontFamily: "monospace", letterSpacing: "0.15em", marginBottom: "12px" }}>LAYER INTERPLAY MATRIX</div>
        <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 1fr 1fr", gap: "1px", background: "#0f2040", borderRadius: "6px", overflow: "hidden", fontSize: "11px" }}>
          {[
            { cells: ["", "→ NARRATIVE", "→ REALITY", "→ PROJECTION"], header: true },
            { cells: ["NARRATIVE ↓", "Self-reinforcing loop via media/think tanks", "Distorts which metrics get measured", "Defines the 'obvious' future trajectory"] },
            { cells: ["REALITY ↓", "Constrains what narrative can claim long-term", "Measurable ground truth (capital, tech, law)", "Sets hard limits on projection speed"] },
            { cells: ["PROJECTION ↓", "Generates future narratives retroactively", "Creates demand for new metrics/evidence", "Compounds as self-fulfilling via investment"] },
          ].map((row, ri) => (
            row.cells.map((cell, ci) => (
              <div key={`${ri}-${ci}`} style={{
                padding: "10px 12px",
                background: row.header ? "#0a1628" : ci === 0 ? "#0a1628" : "#060d1a",
                color: row.header ? "#c084fc" : ci === 0 ? "#64748b" : "#475569",
                fontFamily: "monospace",
                fontWeight: row.header || ci === 0 ? "bold" : "normal",
                letterSpacing: row.header ? "0.08em" : "normal",
              }}>{cell}</div>
            ))
          ))}
        </div>
      </div>

      <div style={{
        padding: "14px 18px", borderLeft: "3px solid #f59e0b",
        background: "#f59e0b08", borderRadius: "0 6px 6px 0",
      }}>
        <div style={{ color: "#f59e0b", fontSize: "10px", fontFamily: "monospace", letterSpacing: "0.15em", marginBottom: "6px" }}>◈ KEY FALSIFIER</div>
        <div style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.7" }}>
          If Narrative-Reality divergence becomes publicly legible at scale (via investigative journalism, leaked data, or measurable prediction failures), projection loses its self-fulfilling character. The system's resilience depends on keeping this gap below the visibility threshold.
        </div>
      </div>
    </div>
  );
}

// ─── FORCE GRAPH ──────────────────────────────────────────────────────────────

function ForceGraph() {
  const svgRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth || 900;
    const height = 560;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Dark background
    svg.append("rect").attr("width", width).attr("height", height).attr("fill", "#050c1a");

    // Grid lines
    for (let x = 0; x < width; x += 40) {
      svg.append("line").attr("x1", x).attr("y1", 0).attr("x2", x).attr("y2", height)
        .attr("stroke", "#0f2040").attr("stroke-width", 0.5);
    }
    for (let y = 0; y < height; y += 40) {
      svg.append("line").attr("x1", 0).attr("y1", y).attr("x2", width).attr("y2", y)
        .attr("stroke", "#0f2040").attr("stroke-width", 0.5);
    }

    const nodes = NODES.map(n => ({ ...n }));
    const links = LINKS.map(l => ({ ...l }));

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(90).strength(0.4))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide(42));

    const defs = svg.append("defs");
    Object.entries(GROUP_COLORS).forEach(([group, color]) => {
      const grad = defs.append("radialGradient")
        .attr("id", `grad-${group}`);
      grad.append("stop").attr("offset", "0%").attr("stop-color", color).attr("stop-opacity", 0.3);
      grad.append("stop").attr("offset", "100%").attr("stop-color", color).attr("stop-opacity", 0.05);
    });

    defs.append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 28)
      .attr("refY", 0)
      .attr("markerWidth", 4)
      .attr("markerHeight", 4)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#1e3a5f");

    const linkG = svg.append("g");
    const link = linkG.selectAll("g").data(links).enter().append("g");

    const linkLine = link.append("line")
      .attr("stroke", "#1e3a5f")
      .attr("stroke-width", 1.2)
      .attr("marker-end", "url(#arrow)");

    const nodeG = svg.append("g");
    const node = nodeG.selectAll("g").data(nodes).enter().append("g")
      .attr("cursor", "pointer")
      .call(d3.drag()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x; d.fy = d.y;
        })
        .on("drag", (event, d) => { d.fx = event.x; d.fy = event.y; })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null; d.fy = null;
        })
      );

    // Glow circle
    node.append("circle")
      .attr("r", 28)
      .attr("fill", d => `url(#grad-${d.group})`)
      .attr("stroke", d => GROUP_COLORS[d.group])
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.6);

    // Inner circle
    node.append("circle")
      .attr("r", 18)
      .attr("fill", "#050c1a")
      .attr("stroke", d => GROUP_COLORS[d.group])
      .attr("stroke-width", 1)
      .attr("stroke-opacity", 0.4);

    // Label
    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", d => GROUP_COLORS[d.group])
      .attr("font-size", "7px")
      .attr("font-family", "monospace")
      .attr("font-weight", "bold")
      .attr("pointer-events", "none")
      .each(function (d) {
        const lines = d.label.split("\n");
        const el = d3.select(this);
        el.text("");
        lines.forEach((line, i) => {
          el.append("tspan")
            .attr("x", 0)
            .attr("dy", i === 0 ? `${-(lines.length - 1) * 5}px` : "10px")
            .text(line);
        });
      });

    node.on("mouseenter", (event, d) => setHoveredNode(d))
      .on("mouseleave", () => setHoveredNode(null));

    simulation.on("tick", () => {
      linkLine
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    return () => simulation.stop();
  }, []);

  return (
    <div>
      <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#60a5fa", letterSpacing: "0.2em", marginBottom: "16px" }}>
        SYSTEM MAP — INTERACTIVE FORCE GRAPH
      </div>
      <h2 style={{ fontSize: "20px", fontWeight: "900", color: "#f1f5f9", margin: "0 0 8px" }}>
        Node Interplay Visualization
      </h2>
      <p style={{ color: "#475569", fontSize: "11px", fontFamily: "monospace", margin: "0 0 16px" }}>
        Drag nodes to explore. Hover for details. Edges show causal/structural relationships.
      </p>

      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
        {Object.entries(GROUP_COLORS).map(([group, color]) => (
          <div key={group} style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: "4px 10px", background: color + "11",
            border: `1px solid ${color}33`, borderRadius: "3px",
            cursor: "pointer",
          }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color }} />
            <span style={{ color, fontSize: "10px", fontFamily: "monospace", letterSpacing: "0.08em" }}>
              {GROUP_LABELS[group]}
            </span>
          </div>
        ))}
      </div>

      <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden", border: "1px solid #0f2040" }}>
        <svg ref={svgRef} style={{ width: "100%", height: "560px", display: "block" }} />

        {hoveredNode && (
          <div style={{
            position: "absolute", bottom: "16px", left: "16px",
            background: "#0f172a", border: `1px solid ${GROUP_COLORS[hoveredNode.group]}44`,
            borderRadius: "6px", padding: "12px 16px", minWidth: "200px",
            pointerEvents: "none",
          }}>
            <div style={{ color: GROUP_COLORS[hoveredNode.group], fontSize: "10px", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: "4px" }}>
              {GROUP_LABELS[hoveredNode.group].toUpperCase()}
            </div>
            <div style={{ color: "#e2e8f0", fontSize: "13px", fontWeight: "700" }}>
              {hoveredNode.label.replace("\n", " ")}
            </div>
            <div style={{ color: "#475569", fontSize: "11px", marginTop: "4px", fontFamily: "monospace" }}>
              Connections: {LINKS.filter(l => l.source === hoveredNode.id || l.target === hoveredNode.id || l.source?.id === hoveredNode.id || l.target?.id === hoveredNode.id).length}
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: "24px", padding: "16px", background: "#0f172a", borderRadius: "6px", border: "1px solid #1e293b" }}>
        <div style={{ color: "#475569", fontSize: "11px", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: "10px" }}>
          HIGH-DEGREE NODES (MOST INTERCONNECTED)
        </div>
        {[
          { id: "usd", label: "USD Settlement Layer", conns: 6 },
          { id: "sanctions", label: "Sanctions", conns: 5 },
          { id: "elites", label: "Elite Coalitions", conns: 5 },
          { id: "war", label: "Conflict / War", conns: 4 },
          { id: "vendor", label: "Vendor Ecosystem", conns: 4 },
        ].map(n => {
          const group = NODES.find(nd => nd.id === n.id)?.group;
          return (
            <div key={n.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid #1e293b" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: GROUP_COLORS[group] }} />
                <span style={{ color: "#94a3b8", fontSize: "12px" }}>{n.label}</span>
              </div>
              <span style={{ color: GROUP_COLORS[group], fontSize: "12px", fontFamily: "monospace" }}>{n.conns} links</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [activePage, setActivePage] = useState("overview");

  const pageContent = {
    overview: <PageOverview />,
    monetary: <PageMonetary />,
    trade: <PageTrade />,
    rivals: <PageRivals />,
    elites: <PageElites />,
    war: <PageWar />,
    domestic: <PageDomestic />,
    resistance: <PageResistance />,
    falsifiers: <PageFalsifiers />,
    graph: <ForceGraph />,
    steering: <PageSteering />,
  };

  return (
    <div style={{
      background: "#060d1a",
      minHeight: "100vh",
      fontFamily: "'Georgia', serif",
      color: "#e2e8f0",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        borderBottom: "1px solid #0f2040",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#050c1a",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: "#f59e0b", boxShadow: "0 0 8px #f59e0b",
            animation: "pulse 2s infinite",
          }} />
          <span style={{ fontFamily: "monospace", fontSize: "11px", letterSpacing: "0.2em", color: "#475569" }}>
            GEO-SYS ANALYST // CLEARANCE: OPEN SOURCE
          </span>
        </div>
        <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#1e3a5f" }}>
          REV 2.1 — {new Date().toISOString().split("T")[0]}
        </span>
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <div style={{
          width: "200px", minWidth: "200px",
          background: "#050c1a",
          borderRight: "1px solid #0f2040",
          padding: "16px 0",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}>
          {PAGES.map(p => (
            <button
              key={p.id}
              onClick={() => setActivePage(p.id)}
              style={{
                background: activePage === p.id ? "#0f2040" : "transparent",
                border: "none",
                borderLeft: activePage === p.id ? "2px solid #f59e0b" : "2px solid transparent",
                padding: "10px 16px",
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: activePage === p.id ? "#f59e0b" : "#334155",
                fontFamily: "monospace",
                fontSize: "10px",
                letterSpacing: "0.08em",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: "12px", opacity: 0.8 }}>{p.icon}</span>
              {p.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "32px", overflowY: "auto", maxHeight: "calc(100vh - 53px)" }}>
          <div style={{ maxWidth: "800px" }}>
            {pageContent[activePage]}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050c1a; }
        ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 2px; }
      `}</style>
    </div>
  );
}
