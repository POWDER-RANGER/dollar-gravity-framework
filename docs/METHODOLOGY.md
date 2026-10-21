# Methodology

How Dollar Gravity decides what it may claim, how figures are kept honest, and what the 3D galaxy is and is not.

## 1. What the model is

A falsifiable systems model of dollar-centric finance and security. It makes structural claims (USD settlement, Treasuries, correspondent rails and US legal jurisdiction interlock; rivals and holdouts still route through that core) and pairs each with the observable condition that would break it. It is an analytical framework, not a forecast and not investment, legal or policy advice.

## 2. Claim discipline

Every real-world statement on the site falls into one of three classes.

| Class | Where it lives | Rule |
|---|---|---|
| **Sourced figure** | `src/data/metrics.js` → `SOURCES` | Carries value, detail, as-of date, source name, URL, and `kind` (`primary` or `secondary`). Rendered on the Sources page and cited inline with `<Cite id>`. Pages never hard-code these numbers. |
| **Unverified claim** | `src/data/metrics.js` → `UNVERIFIED` | Carried over from earlier revisions, not independently checked in the current review. Stays in the text with an inline `<Unv id>` badge until sourced or removed. |
| **Analytical judgment** | Page prose | Mechanism-level reasoning. Stated as the model's claim and tied to a falsifier where possible. |

Source `kind`:

- **primary**: the data publisher (BIS, IMF COFER, SWIFT, US Treasury TIC).
- **secondary**: reporting or summaries of a primary event (law-firm summary of a ruling, press coverage, Wikipedia for fast-moving events). Each secondary entry has a `note` saying what to verify against.

Derived numbers (graph node/link counts, number of sources, number of unverified claims) are computed from the data modules so they cannot drift from the content.

## 3. Updating a figure

1. Find the entry in `SOURCES` (or add one).
2. Replace `value`, `detail`, `asOf`, `source`, `url`. Keep `kind` honest.
3. Bump `REVIEWED` (and `REV` for a content release) in the same file.
4. Add a line to `docs/CHANGELOG.md`.
5. `npm run build`, then commit source and the rebuilt output together.

To clear an unverified claim: add a `SOURCES` entry, replace the `<Unv id>` badge in the page with `<Cite id>`, and delete the `UNVERIFIED` row.

## 4. Falsifiers

Five falsifiers (F-1 … F-5) each state a metric, a threshold or direction, and a **current reading**. A falsifier is *triggered* only when the observable condition is met; until then the status describes monitoring posture (monitor, watch, emerging, low probability, high impact), not a probability. As of rev 2.2 none is triggered.

## 5. System Map (graph)

24 nodes in 9 groups and 37 directed links, defined in `src/data/graph.js`. Edges are the model's causal or structural claims, not measured quantities. Degree and "most connected" lists are computed from the edge list. The layout is a force simulation anchored by group; position carries no meaning beyond clustering.

## 6. 3D Galaxy (v4.0)

A schematic of 50 sovereign bodies (`src/galaxy/data.js`). **It is illustrative and must not be cited as data.**

| Field | Meaning | Provenance |
|---|---|---|
| `mass` | Composite "power mass" (economy, military, reserve-currency role). US = 1.19 by construction | Hand-assigned in the original v4.0 build |
| `threat` | 0–1 adversarial posture toward the dollar order | Hand-assigned judgment |
| `usdDep` | 0–1 integration with dollar rails and reserves | Hand-assigned judgment |
| `nuclear` | Military-stockpile warheads, nine states | Federation of American Scientists 2026 (sourced) |
| `rank` | Ordinal in the original dataset (Global Firepower style) | Carried over; not re-verified |
| `position` | 3D placement | Chosen for legibility; distance and height carry no meaning |

Relationships (`relationships`) carry a one-line `basis`. The Russia→Iran ISR edge rests on anonymous-source press reports and is labelled "reported". The same provenance is published in module 12 (Galaxy Data & Method), generated from `data.js`. Scenario presets (`SCENARIOS`) apply **arbitrary visual weights** to show direction of change; they are not forecasts.

The gravity fabric is `y = −Σ mᵢ·14·warp / (1 + dᵢ²/25)` summed over bodies, with `dᵢ` the horizontal distance to body *i*. It is a visual device, not a physical model.

## 7. Known limitations

- Several 2026 events (Iran war timeline, blockade, 20 Oct status) rest on secondary, fast-moving sources and need re-checking against current reporting.
- The SWIFT currency shares were read from a PDF with scrambled chart labels; currencies were matched to values by rank order. Confirm against the PDF.
- FISA Section 702 status was checked only to 17 Sep 2026 (Brennan Center tracker).
- The debt-limit timing is an advocacy-group projection; compare with Treasury and CBO releases.
- All ten rev 2.2 legacy claims were resolved in rev 2.3 (see the Sources page); the unverified list is currently empty.
- SWIFT shares still depend on scrambled chart labels (see the entry's caveat).
- Galaxy scores are judgments, not measurements.
