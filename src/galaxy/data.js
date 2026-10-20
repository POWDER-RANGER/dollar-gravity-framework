// Galaxy dataset. ILLUSTRATIVE, hand-scored, not measurements.
//
//   mass    composite "power mass" (economy, military, reserve-currency role), US = 1.19
//   threat  analyst score 0-1 for how adversarial the state's posture is toward the dollar order
//   usdDep  analyst score 0-1 for integration with dollar rails and reserves
//   nuclear approximate warhead inventory (verify against SIPRI / FAS before citing)
//   rank    Global Firepower-style ordinal used in the original dataset
//   position schematic 3D placement for readability; distances carry no meaning
//
// 50 sovereign bodies (Tier 1-2). Edit here, rebuild with `npm run build`.

export const countries = [
  { id: 'USA', name: 'United States', mass: 1.19, color: '#00aaff', position: [0, 0, 0], threat: 0.85, usdDep: 0.95, size: 2.2, nuclear: 3708, haloColor: '#ffffff', rank: 1 },
  { id: 'CHN', name: 'China', mass: 1.02, color: '#ffcc00', position: [-25, -10, 18], threat: 0.65, usdDep: 0.25, size: 2.0, nuclear: 600, haloColor: '#ffcc00', rank: 3 },
  { id: 'RUS', name: 'Russia', mass: 0.87, color: '#6B1A3A', position: [20, 6, -12], threat: 0.75, usdDep: 0.15, size: 1.8, nuclear: 4309, haloColor: '#4B0082', rank: 2 },
  { id: 'IND', name: 'India', mass: 0.63, color: '#ff8800', position: [12, 24, 6], threat: 0.45, usdDep: 0.40, size: 1.6, nuclear: 180, haloColor: '#ff8800', rank: 4 },
  { id: 'IRN', name: 'Iran', mass: 0.37, color: '#cc2200', position: [10, -14, 4], threat: 0.95, usdDep: 0.05, size: 1.3, nuclear: 0, haloColor: null, latentGlow: true, rank: 16 },
  { id: 'ISR', name: 'Israel', mass: 0.22, color: '#88aaff', position: [6, -6, -9], threat: 0.80, usdDep: 0.85, size: 1.0, nuclear: 90, haloColor: '#ffffff', rank: 15 },
  { id: 'SAU', name: 'Saudi Arabia', mass: 0.12, color: '#00cc88', position: [14, -17, 3], threat: 0.55, usdDep: 0.75, size: 0.85, nuclear: 0, haloColor: null, rank: 25 },
  { id: 'FRA', name: 'France', mass: 0.30, color: '#4488ff', position: [-12, 12, -6], threat: 0.40, usdDep: 0.80, size: 1.1, nuclear: 290, haloColor: '#4488ff', rank: 6 },
  { id: 'GBR', name: 'United Kingdom', mass: 0.27, color: '#4488ff', position: [-14, 14, -4], threat: 0.40, usdDep: 0.82, size: 1.05, nuclear: 225, haloColor: '#4488ff', rank: 8 },
  { id: 'PAK', name: 'Pakistan', mass: 0.21, color: '#2E8B57', position: [21, 18, 1], threat: 0.45, usdDep: 0.35, size: 0.95, nuclear: 170, haloColor: '#2E8B57', rank: 14 },
  { id: 'PRK', name: 'North Korea', mass: 0.19, color: '#cc0000', position: [30, -24, 12], threat: 0.90, usdDep: 0.01, size: 0.9, nuclear: 50, haloColor: '#cc0000', rank: 31 },
  { id: 'KOR', name: 'South Korea', mass: 0.28, color: '#5599ff', position: [-20, 10, 8], threat: 0.50, usdDep: 0.70, size: 1.05, nuclear: 0, haloColor: null, rank: 5 },
  { id: 'JPN', name: 'Japan', mass: 0.24, color: '#ff6666', position: [-18, 8, 12], threat: 0.35, usdDep: 0.85, size: 1.0, nuclear: 0, haloColor: null, rank: 7 },
  { id: 'TUR', name: 'Türkiye', mass: 0.21, color: '#cc5500', position: [8, 18, -5], threat: 0.55, usdDep: 0.60, size: 0.95, nuclear: 0, haloColor: null, rank: 9 },
  { id: 'ITA', name: 'Italy', mass: 0.19, color: '#5588ff', position: [-10, 14, -8], threat: 0.35, usdDep: 0.78, size: 0.9, nuclear: 0, haloColor: null, rank: 10 },
  { id: 'BRA', name: 'Brazil', mass: 0.18, color: '#00aa44', position: [-18, -20, -10], threat: 0.30, usdDep: 0.55, size: 0.88, nuclear: 0, haloColor: null, rank: 11 },
  { id: 'DEU', name: 'Germany', mass: 0.22, color: '#5588ff', position: [-11, 16, -7], threat: 0.30, usdDep: 0.88, size: 0.98, nuclear: 0, haloColor: null, rank: 12 },
  { id: 'IDN', name: 'Indonesia', mass: 0.17, color: '#cc8800', position: [16, -8, 20], threat: 0.25, usdDep: 0.45, size: 0.85, nuclear: 0, haloColor: null, rank: 13 },
  { id: 'AUS', name: 'Australia', mass: 0.15, color: '#4488ff', position: [-16, -18, 15], threat: 0.30, usdDep: 0.75, size: 0.8, nuclear: 0, haloColor: null, rank: 17 },
  { id: 'ESP', name: 'Spain', mass: 0.14, color: '#5588ff', position: [-13, 11, -9], threat: 0.30, usdDep: 0.80, size: 0.78, nuclear: 0, haloColor: null, rank: 18 },
  { id: 'EGY', name: 'Egypt', mass: 0.13, color: '#cc9944', position: [10, -10, -6], threat: 0.40, usdDep: 0.50, size: 0.75, nuclear: 0, haloColor: null, rank: 19 },
  { id: 'UKR', name: 'Ukraine', mass: 0.12, color: '#ffcc00', position: [18, 20, -8], threat: 0.70, usdDep: 0.40, size: 0.73, nuclear: 0, haloColor: null, rank: 20 },
  { id: 'POL', name: 'Poland', mass: 0.12, color: '#5588ff', position: [-8, 18, -6], threat: 0.45, usdDep: 0.78, size: 0.73, nuclear: 0, haloColor: null, rank: 21 },
  { id: 'TWN', name: 'Taiwan', mass: 0.13, color: '#cc4444', position: [-22, 6, 14], threat: 0.60, usdDep: 0.70, size: 0.75, nuclear: 0, haloColor: null, rank: 22 },
  { id: 'VNM', name: 'Vietnam', mass: 0.13, color: '#cc6644', position: [14, -6, 18], threat: 0.40, usdDep: 0.45, size: 0.75, nuclear: 0, haloColor: null, rank: 23 },
  { id: 'THA', name: 'Thailand', mass: 0.11, color: '#cc8866', position: [12, -4, 16], threat: 0.25, usdDep: 0.55, size: 0.7, nuclear: 0, haloColor: null, rank: 24 },
  { id: 'SWE', name: 'Sweden', mass: 0.09, color: '#5588ff', position: [-9, 20, -4], threat: 0.30, usdDep: 0.80, size: 0.65, nuclear: 0, haloColor: null, rank: 26 },
  { id: 'DZA', name: 'Algeria', mass: 0.09, color: '#cc9966', position: [6, -12, -10], threat: 0.35, usdDep: 0.45, size: 0.65, nuclear: 0, haloColor: null, rank: 27 },
  { id: 'CAN', name: 'Canada', mass: 0.12, color: '#4488ff', position: [-6, 16, 10], threat: 0.30, usdDep: 0.90, size: 0.73, nuclear: 0, haloColor: null, rank: 28 },
  { id: 'SGP', name: 'Singapore', mass: 0.09, color: '#cc5588', position: [10, -2, 18], threat: 0.25, usdDep: 0.90, size: 0.65, nuclear: 0, haloColor: null, rank: 29 },
  { id: 'GRC', name: 'Greece', mass: 0.08, color: '#5588ff', position: [-8, 12, -10], threat: 0.35, usdDep: 0.78, size: 0.62, nuclear: 0, haloColor: null, rank: 30 },
  { id: 'ARG', name: 'Argentina', mass: 0.07, color: '#88aacc', position: [-22, -24, -8], threat: 0.15, usdDep: 0.55, size: 0.6, nuclear: 0, haloColor: null, rank: 32 },
  { id: 'NGA', name: 'Nigeria', mass: 0.07, color: '#cc8844', position: [4, -16, -14], threat: 0.30, usdDep: 0.50, size: 0.6, nuclear: 0, haloColor: null, rank: 33 },
  { id: 'NLD', name: 'Netherlands', mass: 0.07, color: '#5588ff', position: [-10, 18, -5], threat: 0.25, usdDep: 0.88, size: 0.6, nuclear: 0, haloColor: null, rank: 34 },
  { id: 'MMR', name: 'Myanmar', mass: 0.05, color: '#ccaa55', position: [18, -2, 16], threat: 0.50, usdDep: 0.30, size: 0.55, nuclear: 0, haloColor: null, rank: 35 },
  { id: 'MEX', name: 'Mexico', mass: 0.08, color: '#cc6655', position: [-14, -16, 8], threat: 0.35, usdDep: 0.80, size: 0.62, nuclear: 0, haloColor: null, rank: 36 },
  { id: 'BGD', name: 'Bangladesh', mass: 0.06, color: '#88aa88', position: [16, 2, 14], threat: 0.20, usdDep: 0.45, size: 0.57, nuclear: 0, haloColor: null, rank: 37 },
  { id: 'PRT', name: 'Portugal', mass: 0.04, color: '#5588ff', position: [-14, 10, -11], threat: 0.20, usdDep: 0.82, size: 0.52, nuclear: 0, haloColor: null, rank: 38 },
  { id: 'NOR', name: 'Norway', mass: 0.04, color: '#5588ff', position: [-10, 22, -2], threat: 0.20, usdDep: 0.85, size: 0.52, nuclear: 0, haloColor: null, rank: 39 },
  { id: 'ZAF', name: 'South Africa', mass: 0.05, color: '#aa8866', position: [2, -22, -18], threat: 0.20, usdDep: 0.50, size: 0.55, nuclear: 0, haloColor: null, rank: 40 },
  { id: 'PHL', name: 'Philippines', mass: 0.05, color: '#cc7766', position: [14, 0, 20], threat: 0.35, usdDep: 0.65, size: 0.55, nuclear: 0, haloColor: null, rank: 41 },
  { id: 'MYS', name: 'Malaysia', mass: 0.05, color: '#cc9955', position: [12, 0, 18], threat: 0.20, usdDep: 0.55, size: 0.55, nuclear: 0, haloColor: null, rank: 42 },
  { id: 'COL', name: 'Colombia', mass: 0.05, color: '#ccaa44', position: [-18, -18, -6], threat: 0.30, usdDep: 0.70, size: 0.55, nuclear: 0, haloColor: null, rank: 43 },
  { id: 'IRQ', name: 'Iraq', mass: 0.04, color: '#cc6633', position: [12, -12, 0], threat: 0.55, usdDep: 0.50, size: 0.52, nuclear: 0, haloColor: null, rank: 44 },
  { id: 'DNK', name: 'Denmark', mass: 0.04, color: '#5588ff', position: [-11, 20, -3], threat: 0.20, usdDep: 0.85, size: 0.52, nuclear: 0, haloColor: null, rank: 45 },
  { id: 'CHE', name: 'Switzerland', mass: 0.06, color: '#aa6666', position: [-9, 14, -8], threat: 0.10, usdDep: 0.85, size: 0.57, nuclear: 0, haloColor: null, rank: 46 },
  { id: 'ETH', name: 'Ethiopia', mass: 0.05, color: '#cc9977', position: [6, -18, -12], threat: 0.40, usdDep: 0.40, size: 0.55, nuclear: 0, haloColor: null, rank: 47 },
  { id: 'FIN', name: 'Finland', mass: 0.04, color: '#5588ff', position: [-8, 22, -4], threat: 0.25, usdDep: 0.85, size: 0.52, nuclear: 0, haloColor: null, rank: 48 },
  { id: 'CHL', name: 'Chile', mass: 0.04, color: '#8899bb', position: [-24, -26, -6], threat: 0.15, usdDep: 0.70, size: 0.52, nuclear: 0, haloColor: null, rank: 49 },
  { id: 'PER', name: 'Peru', mass: 0.04, color: '#cc8855', position: [-20, -22, -8], threat: 0.20, usdDep: 0.65, size: 0.52, nuclear: 0, haloColor: null, rank: 50 },
];

// Relationship types. `unverified` types are carried over from the original
// v4.0 build and have no source on the Sources page yet.
export const REL_TYPES = {
  alliance:    { label: 'Alliance / security partnership', color: '#38bdf8', dashed: false },
  conflict:    { label: 'Open conflict / rivalry',         color: '#fb7185', dashed: false },
  dollar_rail: { label: 'Dollar rail (USD pricing / settlement)', color: '#fbbf24', dashed: false },
  dollar_alt:  { label: 'Dollar alternative (non-USD settlement)', color: '#facc15', dashed: true },
  isr:         { label: 'ISR support (unverified)',         color: '#c084fc', dashed: true },
};

// Edges. `basis` is the one-line justification shown in the detail panel;
// `source` is a page id on the main site's Sources page, when one exists.
export const relationships = [
  { from: 'RUS', to: 'IRN', type: 'isr',         pulse: true,  basis: 'Russian intelligence / surveillance / reconnaissance support to Iran. Carried over from v4.0; not independently verified.', unverified: true },
  { from: 'USA', to: 'ISR', type: 'alliance',    pulse: false, basis: 'Major US strategic partner. No mutual-defence treaty.' },
  { from: 'USA', to: 'IRN', type: 'conflict',    pulse: true,  basis: '2026 Iran war and US naval blockade (see Sources).', source: 'iran-war' },
  { from: 'CHN', to: 'RUS', type: 'dollar_alt',  pulse: false, basis: 'Bilateral trade increasingly settled in renminbi and rubles. Share not quantified here.' },
  { from: 'USA', to: 'SAU', type: 'dollar_rail', pulse: false, basis: 'Oil priced in dollars; Treasury recycling.' },
  { from: 'USA', to: 'JPN', type: 'alliance',    pulse: false, basis: 'US-Japan Mutual Cooperation and Security Treaty.' },
  { from: 'USA', to: 'KOR', type: 'alliance',    pulse: false, basis: 'US-ROK Mutual Defense Treaty.' },
  { from: 'IND', to: 'PAK', type: 'conflict',    pulse: false, basis: 'Nuclear-armed rivals with a history of armed clashes.' },
];

// Scenario presets. Everything here is ILLUSTRATIVE: the multipliers are
// arbitrary visual weights chosen to show direction, not forecasts.
export const SCENARIOS = {
  baseline: {
    label: 'Baseline',
    note: 'Original v4.0 settings. Masses exactly as scored in the dataset.',
    controls: { warp: 0.6, isr: 1, dollar: 1 },
    massMult: {},
    nuclear: [],
  },
  'iran-breakout': {
    label: 'Iran breakout',
    note: 'Illustrative: Iran acquires a nuclear capability as Russian ISR support falls to 30%. Iran mass ×1.6 (arbitrary weight); nuclear halo added.',
    controls: { warp: 0.6, isr: 0.3, dollar: 1 },
    massMult: { IRN: 1.6 },
    nuclear: ['IRN'],
  },
  'dollar-fracture': {
    label: 'Dollar fracture',
    note: 'Illustrative: dollar pull falls to 40%; US mass ×0.9, China ×1.15, India ×1.1 (arbitrary weights).',
    controls: { warp: 0.6, isr: 1, dollar: 0.4 },
    massMult: { USA: 0.9, CHN: 1.15, IND: 1.1 },
    nuclear: [],
  },
};

export const SCENARIO_IDS = Object.keys(SCENARIOS);
export const COUNTRY_BY_ID = Object.fromEntries(countries.map((c) => [c.id, c]));
