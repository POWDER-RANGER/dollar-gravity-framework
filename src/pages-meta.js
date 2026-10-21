// Page registry (data only, no components, so pages can import it freely).
export const GROUPS = ["Framework", "Analysis", "Test", "Synthesis", "Evidence"];

export const PAGES = [
  { id: "overview", num: "00", label: "Overview", icon: "◈", group: "Framework", color: "#f59e0b", desc: "What the model claims, how it is built, how to read it." },
  { id: "monetary", num: "01", label: "Monetary Core", icon: "₿", group: "Analysis", color: "#f59e0b", desc: "USD rails, reserves, Fed and Treasury mechanics, debt-limit dynamics." },
  { id: "trade", num: "02", label: "Trade Weapons", icon: "⚖", group: "Analysis", color: "#60a5fa", desc: "Tariff incidence, sanctions chokepoints, payment rails." },
  { id: "rivals", num: "03", label: "Rivals & Holdouts", icon: "⊕", group: "Analysis", color: "#f87171", desc: "US–China entanglement; Iran and North Korea at the edges." },
  { id: "elites", num: "04", label: "Elite Networks", icon: "◉", group: "Analysis", color: "#a78bfa", desc: "Competing coalitions and the mechanisms you can actually measure." },
  { id: "war", num: "05", label: "War / Conflict", icon: "⚔", group: "Analysis", color: "#fb923c", desc: "War as real stakes, as a data engine, and as financial warfare." },
  { id: "domestic", num: "06", label: "Domestic Drift", icon: "◎", group: "Analysis", color: "#34d399", desc: "Centralized vs fragmented surveillance architectures." },
  { id: "resistance", num: "07", label: "Resistance", icon: "⊗", group: "Analysis", color: "#22d3ee", desc: "Institutional and technical brakes, and the backfire dynamic." },
  { id: "falsifiers", num: "08", label: "Falsifiers", icon: "?", group: "Test", color: "#9fb0c6", desc: "Five triggers that would force a rewrite, with current readings." },
  { id: "graph", num: "09", label: "System Map", icon: "⬡", group: "Synthesis", color: "#60a5fa", desc: "Interactive causal graph of 24 nodes and 37 links." },
  { id: "steering", num: "10", label: "System Steering", icon: "⟡", group: "Synthesis", color: "#c084fc", desc: "Narrative · Reality · Projection: the field that bends the nodes." },
  { id: "sources", num: "11", label: "Sources & Method", icon: "≡", group: "Evidence", color: "#22d3ee", desc: "Every figure with its as-of date and link; claims still unverified." },
  { id: "galaxy-data", num: "12", label: "Galaxy Data & Method", icon: "✦", group: "Evidence", color: "#22d3ee", desc: "What the 3D Galaxy shows, what is sourced, what is judgment, and how to edit it." },
];

export const PAGE_BY_ID = Object.fromEntries(PAGES.map((p) => [p.id, p]));
export const DEFAULT_PAGE = "overview";
export const href = (id, anchor) => `#/${id}${anchor ? `/${anchor}` : ""}`;
