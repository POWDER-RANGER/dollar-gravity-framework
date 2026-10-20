// Every number the site states about the real world lives here, with its
// as-of date and source. Pages reference entries by id; the Sources page
// renders this file. Update here, not in page prose.

export const REV = "2.2";
export const REVIEWED = "2026-10-20";

/** @type {Record<string, {label:string,value:string,detail:string,asOf:string,source:string,url:string,kind:"primary"|"secondary",note?:string}>} */
export const SOURCES = {
  "bis-fx": {
    label: "USD share of global FX turnover",
    value: "89%",
    detail: "of FX trades have the dollar on one side (currency shares sum to 200%). Daily turnover $9.6T.",
    asOf: "Apr 2025 survey · published 30 Sep 2025",
    source: "BIS Triennial Central Bank Survey 2025",
    url: "https://www.bis.org/press/p250930.htm",
    kind: "primary",
  },
  cofer: {
    label: "USD share of global FX reserves",
    value: "56.70%",
    detail: "Q2 2026, down from 57.18% in Q1. Euro 20.60%, renminbi 2.11%. Total reserves $13.22T.",
    asOf: "2026 Q2 · published 30 Sep 2026",
    source: "IMF COFER (IMF Data brief)",
    url: "https://data.imf.org/en/news/imf%20data%20brief%20september%2030",
    kind: "primary",
  },
  swift: {
    label: "USD share of SWIFT payments by value",
    value: "49.25%",
    detail: "Feb 2026. EUR 22.82%, GBP 7.16%, JPY 3.46%, CNY 2.74%.",
    asOf: "Feb 2026",
    source: "SWIFT Global Currency Tracker (Mar 2026 edition)",
    url: "https://www.swift.com/sites/default/files/files/global-currency-tracker_march-2026_final_v3.pdf",
    kind: "primary",
    note: "Extracted from the PDF with scrambled chart labels; currencies matched to values by rank order. Confirm against the PDF.",
  },
  tic: {
    label: "Foreign holdings of US Treasury securities",
    value: "$9.33T",
    detail: "Aug 2026: $9,331.7B total. Japan $1,068.3B · UK $1,009.5B · China $590.7B.",
    asOf: "Aug 2026",
    source: "US Treasury TIC: major foreign holders",
    url: "https://ticdata.treasury.gov/resource-center/data-chart-center/tic/Documents/slt_table5.html",
    kind: "primary",
  },
  "tic-china": {
    label: "China's reported Treasury holdings",
    value: "$590.7B",
    detail: "Aug 2026, down from $759.0B in Dec 2024 (−22%). Custodial holdings in third countries are not captured.",
    asOf: "Aug 2026 vs Dec 2024",
    source: "US Treasury TIC (current and historical tables)",
    url: "https://ticdata.treasury.gov/resource-center/data-chart-center/tic/Documents/mfhhis01.csv",
    kind: "primary",
  },
  "debt-limit": {
    label: "Debt limit and projected timing",
    value: "$41.104T",
    detail: "Limit after the 2025 increase. Debt subject to limit ≈ $39.7T on 10 Aug 2026 (<$1.4T headroom). Limit projected to be reached ~May 2027 (range Feb–Jul 2027); X-date projected Feb 2028.",
    asOf: "Projection published 20 Aug 2026",
    source: "National Taxpayers Union, “Projecting the Debt Limit”",
    url: "https://www.ntu.org/publications/detail/projecting-the-debt-limit",
    kind: "secondary",
    note: "Advocacy-group projection; compare with Treasury and CBO releases.",
  },
  "scotus-ieepa": {
    label: "IEEPA tariffs struck down",
    value: "6–3",
    detail: "Learning Resources v. Trump, 20 Feb 2026: IEEPA does not authorize tariffs. Section 232 and 301 authorities remain; Section 122 (up to 15%, 150 days) discussed as a replacement. No clear refund process established.",
    asOf: "20 Feb 2026",
    source: "Clark Hill client summary of the decision",
    url: "https://www.clarkhill.com/news-events/news/supreme-court-overturns-trumps-ieepa-tariffs",
    kind: "secondary",
    note: "Law-firm summary. Read the opinion at supremecourt.gov for holding details.",
  },
  "fisa-702": {
    label: "FISA Section 702 lapse",
    value: "12 Jun 2026",
    detail: "House failed a short-term extension 198–218 on 11 Jun; the authority reached its sunset at midnight 12 Jun, the first lapse since 2008. Collection continues under FISC certifications approved in Mar 2026 (reported to run to ~Mar 2027). No reauthorization found in sources checked through 28 Jul 2026.",
    asOf: "Jun–Jul 2026",
    source: "Recording Law summary; EFF analysis",
    url: "https://www.recordinglaw.com/news/fisa-section-702-surveillance-lapse/",
    kind: "secondary",
    note: "Status after July not verified. Check Congress.gov before relying on it.",
  },
  "iran-war": {
    label: "2026 Iran war timeline",
    value: "28 Feb 2026",
    detail: "War began with US/Israeli strikes; Iran closed the Strait of Hormuz. Ceasefire 8 Apr (Pakistan-mediated). Islamabad Memorandum signed 17 Jun. Ceasefire collapsed 8 Jul; low-intensity fighting continued.",
    asOf: "Through 8 Jul 2026 (page marked as needing update)",
    source: "Wikipedia: 2026 Iran war ceasefire",
    url: "https://en.wikipedia.org/wiki/2026_Iran_war_ceasefire",
    kind: "secondary",
    note: "Secondary, fast-moving source. Verify against current reporting.",
  },
  "iran-blockade": {
    label: "US naval blockade of Iran",
    value: "Ongoing",
    detail: "Began 13 Apr 2026; lifted 18 Jun after the memorandum; reinstated 14 Jul. Iran's central bank governor said on 19 Aug that oil exports had effectively ceased; WSJ reported on 7 Sep that new exports from the Gulf had halted.",
    asOf: "Through 9 Sep 2026",
    source: "Wikipedia: 2026 US naval blockade of Iran",
    url: "https://en.wikipedia.org/wiki/2026_United_States_naval_blockade_of_Iran",
    kind: "secondary",
    note: "Secondary, fast-moving source. Verify against current reporting.",
  },
  "russia-assets": {
    label: "Immobilized Russian central-bank assets",
    value: "≈ €210B",
    detail: "Held in Europe, ~€185B at Euroclear. Dec 2025: EU agreed a €90B Ukraine loan and froze the assets indefinitely via an emergency treaty provision; loan finalized Apr 2026. Debate on using the assets reopened Oct 2026; Belgium and the ECB warn of legal and euro-confidence risk.",
    asOf: "1 Oct 2026",
    source: "Forbes (M. Temnycky), citing Reuters",
    url: "https://www.forbes.com/sites/marktemnycky/2026/10/01/eu-states-revive-push-to-use-frozen-russian-assets-for-ukraine/",
    kind: "secondary",
  },
  "dprk-crypto": {
    label: "North Korea crypto theft",
    value: "≈ $2B",
    detail: "Stolen in 2025 (~59% of >$3.4B stolen globally), including the $1.4B Bybit hack in Feb 2025. All-time total reported at roughly $7B.",
    asOf: "Chainalysis 2026 Crypto Crime Report · 18 Dec 2025 coverage",
    source: "Fortune, citing Chainalysis",
    url: "https://fortune.com/2025/12/18/north-korea-stole-a-record-amount-of-crypto/",
    kind: "secondary",
    note: "The all-time figure appears only in the page metadata.",
  },
  "palantir-army": {
    label: "Palantir US Army enterprise agreement",
    value: "≤ $10B",
    detail: "Ten-year enterprise agreement consolidating several Army contracts, announced Aug 2025.",
    asOf: "Aug 2025",
    source: "The Defense Post",
    url: "https://thedefensepost.com/2025/08/02/palantir-us-army-contract/",
    kind: "secondary",
  },
};

/**
 * Claims carried over from earlier revisions that were NOT independently
 * verified in this review. They stay in the text, flagged, until sourced.
 */
export const UNVERIFIED = [
  { id: "u-passthrough", claim: "Tariff pass-through to US buyers of 86–94%; exporter absorption ~6–14%", where: "Trade Weapons, Steering" },
  { id: "u-debt-acts", claim: "Congress has acted 78+ times on the debt limit since 1960", where: "Steering" },
  { id: "u-fec", claim: "Campaign finance of $4B+ per cycle", where: "Steering" },
  { id: "u-revolving", claim: "Average 2.7 years from agency to industry", where: "Steering" },
  { id: "u-dod", claim: "Top five defense contractors ≈ 35% of DoD spend", where: "Steering" },
  { id: "u-fusion", claim: "80+ DHS-linked fusion centers", where: "Domestic Drift, Steering" },
  { id: "u-cameras", claim: "600M+ surveillance cameras in China", where: "Domestic Drift" },
  { id: "u-iran-discount", claim: "Iranian oil sold at ~20–40% below market", where: "Rivals & Holdouts" },
  { id: "u-chip-lag", claim: "18–24 month lag before chip controls affect the battlefield", where: "War, Steering" },
  { id: "u-ukraine-doctrine", claim: "Drone / counter-drone doctrine matured in ~18 months", where: "War" },
];
