# Changelog

## Rev 2.3.1: 2026-10-20 (visual)

- Overview hero: animated SVG gravity well, gradient title, calls to action.
- Sourced dollar-share gauges (BIS FX, IMF COFER, SWIFT) on Overview and Monetary Core, read from `metrics.js`.
- Falsifier board on Overview (status of F-1 … F-5, linked).
- "On this page" rail on wide screens, built from section headings, with active-section tracking.
- Scroll progress bar; fade-up reveal for below-the-fold blocks (off under reduced motion and in print).
- Ambient background, refined cards, stats, callouts and pager.
- Galaxy: fabric now fades radially into space (no hard square edge); additive glow on wells.

## Rev 2.3: 2026-10-20

Resolved the ten claims flagged unverified in rev 2.2.

- **Replaced with sourced figures:** tariff pass-through (Kiel: ≈96% US buyers, not 86–94%), 2024 election spending (≥$15.9B), China cameras (≈700M, secondary), Iranian crude pricing (≈$10/bbl discount pre-war, premium in Apr 2026).
- **Corrected:** DoD top-five concentration is ≈30% (CRS, FY2024), not ≈35%.
- **Confirmed:** 78 debt-limit acts (Treasury; a floor); 80 fusion centers (DHS 2019).
- **Removed / reclassified:** 2.7-year revolving door (no source); chip-lag and Ukraine-doctrine figures now stated as model judgment.
- `UNVERIFIED` is empty; `RESOLVED` records each outcome on the Sources page.
- SCOTUS entry now read from the opinion itself (6–3; major-questions section joined by three). IEEPA refunds added (≈$122B certified, CBP, 17 Sep).
- Added Iran status (20 Oct), FISA 702 status (17 Sep), Russia→Iran ISR reporting.
- Galaxy: warhead counts updated to FAS 2026; ISR edge relabelled "reported".
- New module 12, **Galaxy Data & Method**, generated from `src/galaxy/data.js`.

## Rev 2.2: 2026-10-20

Full audit of the site and galaxy.

**Content and sourcing**
- New central data layer `src/data/metrics.js`: 13 sourced figures (BIS, IMF COFER, SWIFT, Treasury TIC, SCOTUS IEEPA ruling, FISA 702, Iran war, blockade, Russian assets, DPRK crypto theft, Palantir, debt limit) with as-of dates and links. Pages reference entries by id.
- New **Sources & Method** page (`#/sources`): every figure with date, link and caveat, plus a table of 10 carried-over claims flagged *unverified*.
- Inline `Cite` links and `Unv` badges throughout the modules.
- Stale content updated: SCOTUS struck down IEEPA tariffs (Feb 2026); China's Treasury holdings (−22% since Dec 2024); 2026 Iran war and blockade; Russian assets / EU loan; FISA 702 lapse; DPRK crypto theft.
- Falsifiers page: each of F-1 … F-5 now has a test and a *current reading*; none triggered.
- Removed the Sankey diagram, which was built on made-up sample data.
- Overview stats are derived from data modules (graph size, source and unverified counts).

**System Map**
- Rewritten D3 graph: group-anchored layout, pre-settled, auto-fit, zoom (Ctrl/⌘+wheel and buttons), drag, keyboard selection, neighbour highlighting, working group filters, detail panel with "acts on / acted on by".
- Degree table is computed from the edge list (the previous hard-coded table was wrong).

**Navigation and design**
- Hash routing with deep links (`#/sources/<id>`), per-page document titles, focus and scroll management.
- Grouped sidebar, mobile drawer, previous/next pager, error boundary, print styles, noscript fallback.
- Accessibility: skip link, `aria-current`, `aria-pressed` filters, contrast-safe tokens, `prefers-reduced-motion`.
- Mobile layouts for the triptych, matrix and falsifier cards.
- SEO and sharing: description, canonical, Open Graph / Twitter tags, favicon, `og.png`.
- D3 lazy-loaded; main bundle ~65 kB.

**Galaxy v4.0**
- Fixed the fabric (geometry was in the wrong plane, so the warp collapsed to a line).
- Controls moved from DOM listeners to React state; removed `alert()`.
- Scenario presets (Baseline, Iran breakout, Dollar fracture) now change masses and are labelled illustrative.
- Added: search and camera focus, detail panel with relationships and bases, legend with edge toggles, sortable data table with CSV export, About panel stating what is and is not sourced, shareable URL state (`#c=IRN&s=iran-breakout`), loading state, WebGL fallback, portrait camera, reduced-motion support.
- Dashed edges now actually dash; labels are curated to avoid overlap; depth-coloured fabric.
- **Correction:** earlier copy said the galaxy held 145 bodies. The dataset has **50**.

**Repository**
- Removed dead code (`docs/` stubs, `ForceGraph`, `MoneyPowerSankey`, `system-data.js`, stray v4.0 markdown dump).
- Added `docs/METHODOLOGY.md`, `docs/DEPLOY.md`, `scripts/check-build.mjs`, `.nojekyll`.

## Rev 2.1 / v4.0: restoration

- Restored the original 11-module analytical framework as the live site (commit `58a434d`).
- Shipped the v4.0 3D galaxy at `/galaxy/` (commit `a7e17d7`).
