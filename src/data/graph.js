// System-map data: nodes, causal/structural links, group colours + labels.
// Single source of truth for the force graph and every stat derived from it.

export const GROUP_COLORS = {
  monetary: "#f59e0b",
  trade: "#60a5fa",
  rivals: "#f87171",
  elites: "#a78bfa",
  war: "#fb923c",
  domestic: "#34d399",
  resistance: "#22d3ee",
  falsifiers: "#9fb0c6",
  steering: "#c084fc",
};

export const GROUP_LABELS = {
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

export const NODES = [
  { id: "usd", label: "USD Settlement\nLayer", group: "monetary", about: "Dollar invoicing, settlement and reserve role. The core every other node routes through." },
  { id: "fed", label: "Federal\nReserve", group: "monetary", about: "Sets US policy rates and acts as global liquidity backstop via swap lines." },
  { id: "treasury", label: "US\nTreasury", group: "monetary", about: "Issues the world's benchmark safe asset; collects tariff revenue; runs sanctions enforcement (OFAC)." },
  { id: "debtceil", label: "Debt\nCeiling", group: "monetary", about: "Statutory borrowing cap. Politically recurring, operationally real when extraordinary measures run out." },
  { id: "tariffs", label: "Tariffs", group: "trade", about: "Border taxes paid by US importers. Legal basis changed in 2026 (IEEPA tariffs struck down)." },
  { id: "sanctions", label: "Sanctions", group: "trade", about: "Financial, technology, shipping and secondary-sanction chokepoints." },
  { id: "rails", label: "Payment\nRails", group: "trade", about: "SWIFT messaging, correspondent banking, CHIPS/Fedwire: where US visibility and veto sit." },
  { id: "uschina", label: "US–China\nEntanglement", group: "rivals", about: "Rivals inside the system: supply chains, Treasury holdings, tech competition." },
  { id: "iran", label: "Iran\nHoldout", group: "rivals", about: "High-constraint holdout; 2026 war and naval blockade are a live test of financial and physical pressure." },
  { id: "nk", label: "N. Korea\nHoldout", group: "rivals", about: "Near-outside holdout surviving on China ties, arms exports and crypto theft." },
  { id: "bypass", label: "Bypass\nNetworks", group: "rivals", about: "Shadow fleets, intermediaries, barter, crypto: the workaround stack." },
  { id: "elites", label: "Elite\nCoalitions", group: "elites", about: "Competing blocs (defense, finance, tech, energy, political machines), not a single board." },
  { id: "lobby", label: "Lobbying /\nProcurement", group: "elites", about: "Measurable via FEC filings, LDA disclosures and contract awards." },
  { id: "revolving", label: "Revolving\nDoor", group: "elites", about: "Staffing flows between agencies, industry and think tanks." },
  { id: "war", label: "Conflict /\nWar", group: "war", about: "Real stakes plus a battlefield data and procurement feedback loop." },
  { id: "rnd", label: "R&D / Data\nFeedback", group: "war", about: "Combat data feeding procurement and doctrine cycles." },
  { id: "vendor", label: "Vendor\nEcosystem", group: "domestic", about: "Commercial surveillance and analytics vendors as infrastructure." },
  { id: "surveillance", label: "Surveillance\nDrift", group: "domestic", about: "Fragmented-but-integrated US collection architecture." },
  { id: "courts", label: "Courts /\nFederalism", group: "resistance", about: "Judicial review, state law, congressional oversight." },
  { id: "encrypt", label: "Encryption /\nDecentralize", group: "resistance", about: "Technical brakes that raise collection cost." },
  { id: "falsify", label: "Falsifiers /\nUnknowns", group: "falsifiers", about: "Observable conditions that would force a model rewrite." },
  { id: "narrative", label: "NARRATIVE\nLayer", group: "steering", about: "The constructed story that frames mechanisms as neutral or inevitable." },
  { id: "reality", label: "REALITY\nLayer", group: "steering", about: "Measurable ground truth: flows, incidence, chokepoints." },
  { id: "projection", label: "PROJECTION\nLayer", group: "steering", about: "The steered future: narrative and reality weaponized into trajectories." },
];

export const LINKS = [
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

// ── Derived ─────────────────────────────────────────────────────────────────
export const NODE_BY_ID = Object.fromEntries(NODES.map((n) => [n.id, n]));

export const DEGREE = (() => {
  const d = Object.fromEntries(NODES.map((n) => [n.id, 0]));
  LINKS.forEach((l) => { d[l.source]++; d[l.target]++; });
  return d;
})();

export const TOP_DEGREE = NODES
  .map((n) => ({ ...n, degree: DEGREE[n.id] }))
  .sort((a, b) => b.degree - a.degree || a.label.localeCompare(b.label))
  .slice(0, 6);

export const flat = (s) => s.replace(/\n/g, " ");

export const GRAPH_STATS = {
  nodes: NODES.length,
  links: LINKS.length,
  groups: Object.keys(GROUP_COLORS).length,
};
