<!-- ══════════════════════════════════════════ DOLLAR GRAVITY HEADER -->
<div align="center">

[![Header](https://capsule-render.vercel.app/api?type=waving&color=0:0D1117,35:4A3600,70:FFD600,100:FFEA00&height=300&section=header&text=DOLLAR+GRAVITY&fontSize=80&fontColor=FFEA00&animation=fadeIn&fontAlignY=42&desc=A+Falsifiable+Systems+Model+of+USD+Power&descColor=FFF59D&descSize=18&descAlignY=64)](https://github.com/POWDER-RANGER/dollar-gravity-framework)

<br>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=18&duration=2600&pause=700&color=FFEA00&center=true&vCenter=true&width=900&lines=12+Analytical+Modules+%E2%80%94+One+System;Narrative+%C2%B7+Reality+%C2%B7+Projection;Every+Claim+Ships+With+Its+Falsifier;Rivals+Still+Route+Through+the+Core)](https://github.com/POWDER-RANGER/dollar-gravity-framework)

<br>

![](https://img.shields.io/badge/REV-2.2-FFEA00?style=for-the-badge&labelColor=0D1117)
![](https://img.shields.io/badge/REACT-D3-00C853?style=for-the-badge&labelColor=0D1117)
![](https://img.shields.io/badge/MODULES-12-FFD600?style=for-the-badge&labelColor=0D1117)
![](https://img.shields.io/badge/FALSIFIERS-5_MONITORED-F87171?style=for-the-badge&labelColor=0D1117)

</div>

---

## 🌍 Live

**🌐 [Open the framework →](https://powder-ranger.github.io/dollar-gravity-framework/)**

**🌌 [3D Galaxy v4.0 →](https://powder-ranger.github.io/dollar-gravity-framework/galaxy/)**: 50 sovereign bodies on a warped gravity fabric. Search, detail panel, legend, sortable data table, and illustrative scenarios (Baseline, Iran breakout, Dollar fracture). Scores are hand-assigned and the page says so; it is a schematic, not data.

A falsifiable systems model of the dollar-centric global finance and security system — how USD settlement, Treasuries, correspondent rails, and US legal jurisdiction interlock, and how rivals, holdouts, elites, conflict, and domestic drift all still route through that core. Every structural claim is paired with the observable condition that would break it.

---

## 🧭 Modules

| # | Module | What it covers |
|---|--------|----------------|
| 00 | **Overview** | Core claims, model architecture, what changed in the current revision |
| 01 | **Monetary Core** | USD rails, reserves, Fed / Treasury mechanics, debt-limit dynamics |
| 02 | **Trade Weapons** | Tariff incidence (domestic burden) vs sanctions chokepoint leverage |
| 03 | **Rivals & Holdouts** | US–China entanglement; Iran and North Korea at the edge |
| 04 | **Elite Networks** | Competing coalitions, mechanism-level, with the public datasets to measure them |
| 05 | **War / Conflict** | War as real stakes, as a data engine, and as financial warfare |
| 06 | **Domestic Drift** | Centralized vs fragmented surveillance architectures |
| 07 | **Resistance** | Courts, NGOs, encryption, decentralization, backfire dynamics |
| 08 | **Falsifiers** | F-1 … F-5: the triggers that would force a rewrite, each with a current reading |
| 09 | **System Map** | Interactive D3 causal graph: 24 nodes, 37 links, filters, detail panel |
| 10 | **System Steering** | Narrative · Reality · Projection triptych and layer matrix |
| 11 | **Sources & Method** | Every figure with as-of date, link and caveat; claims still unverified |

### Evidence standard

Real-world figures live in one file, `src/data/metrics.js`, with value, as-of date, source, URL and a primary/secondary flag. Pages cite entries by id, and the Sources page renders the file. Claims carried over from earlier revisions that have not been re-checked are shown with an *unverified* badge rather than silently kept or deleted. See [`docs/METHODOLOGY.md`](docs/METHODOLOGY.md).

---

## 🚀 Quick Start

```bash
git clone https://github.com/POWDER-RANGER/dollar-gravity-framework.git
cd dollar-gravity-framework
npm ci
npm run dev      # dev server (entry: src/index.html)
npm run build    # writes index.html, galaxy/index.html, assets/ to repo root
npm run check    # verifies committed assets match the HTML pages
```

GitHub Pages serves the `main` branch root. Commit the rebuilt `index.html`, `galaxy/` and `assets/` together with any change to `src/`. Details: [`docs/DEPLOY.md`](docs/DEPLOY.md) · history: [`docs/CHANGELOG.md`](docs/CHANGELOG.md).

---

## 🏗️ Architecture

```
╔══════════════════════════════════════════════════════════════════════╗
║                 DOLLAR GRAVITY — ANALYTICAL FRAMEWORK                ║
║                                                                      ║
║   MONETARY CORE ── USD settlement · Treasuries · payment rails       ║
║        │                                                             ║
║        ▼                                                             ║
║   LEVERAGE ───── tariffs · sanctions · jurisdiction                  ║
║        │                                                             ║
║        ▼                                                             ║
║   ACTORS ─────── rivals · holdouts · elite coalitions · conflict     ║
║        │                                                             ║
║        ▼                                                             ║
║   DRIFT / BRAKES  domestic surveillance · courts · encryption        ║
║        │                                                             ║
║        ▼                                                             ║
║   STEERING FIELD  narrative ⇄ reality ⇄ projection                   ║
║        │                                                             ║
║        ▼                                                             ║
║   FALSIFIERS ─── F-1 de-dollarization … F-5 debt-ceiling failure     ║
╚══════════════════════════════════════════════════════════════════════╝
```

Stack: React 18 · D3 7 (lazy-loaded) · React Three Fiber / Three.js (galaxy) · Vite. Static site, hash-routed, no backend, no tracking.

```
src/data/metrics.js   sourced figures + unverified claims   (edit here to update numbers)
src/data/graph.js     system-map nodes and links
src/galaxy/data.js    galaxy bodies, relationships, scenarios
src/pages/            one component per module
docs/                 methodology, changelog, deploy
```

---

## 📈 Activity

<div align="center">

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/POWDER-RANGER/dollar-gravity-framework?style=for-the-badge&labelColor=0D1117&color=FFEA00)
![GitHub last commit](https://img.shields.io/github/last-commit/POWDER-RANGER/dollar-gravity-framework?style=for-the-badge&labelColor=0D1117&color=FFEA00)
![GitHub repo size](https://img.shields.io/github/repo-size/POWDER-RANGER/dollar-gravity-framework?style=for-the-badge&labelColor=0D1117&color=FFEA00)

</div>

---

## 🔗 POWDER-RANGER Ecosystem

### 🌐 Live .io Pages
| Project | Link | Description |
|---------|------|-------------|
| **Main Portfolio** | [powder-ranger.github.io](https://powder-ranger.github.io) | Master portfolio with all 46 repos |
| **Dollar Gravity** | [powder-ranger.github.io/dollar-gravity-framework](https://powder-ranger.github.io/dollar-gravity-framework) | Falsifiable USD power-system framework |
| **CIVWATCH** | [powder-ranger.github.io/CIVWATCH](https://powder-ranger.github.io/CIVWATCH) | Civic transparency platform |
| **OBLISK** | [powder-ranger.github.io/OBLISK](https://powder-ranger.github.io/OBLISK) | Multi-agent AI orchestration |
| **AI Nexus** | [powder-ranger.github.io/ai-nexus](https://powder-ranger.github.io/ai-nexus) | Browser-based AI platform |

### 🔧 Core Repositories
| Repository | Language | Purpose |
|-----------|----------|---------|
| **[Dollar Gravity](https://github.com/POWDER-RANGER/dollar-gravity-framework)** | JavaScript | USD-centric finance-security dashboard (this repo) |
| **[CIVWATCH](https://github.com/POWDER-RANGER/CIVWATCH)** | TypeScript | Civic transparency platform |
| **[OBLISK](https://github.com/POWDER-RANGER/OBLISK)** | Python | Multi-agent AI with encrypted vaults |
| **[RED-AGENT-GOV](https://github.com/POWDER-RANGER/RED-AGENT-GOV)** | Python | Governance-enforced agent engine |
| **[CharlesAI](https://github.com/POWDER-RANGER/CharlesAI)** | PowerShell | COMET Agent with memory & orchestration |
| **[NSO Kryptonite](https://github.com/POWDER-RANGER/nso-kryptonite-platform)** | TypeScript | Adversarial defense command center |
| **[AI Nexus](https://github.com/POWDER-RANGER/ai-nexus)** | JavaScript | Browser-based complete AI platform |
| **[Guiding Light AI](https://github.com/POWDER-RANGER/guiding-light-ai)** | Rust | Values-to-policies CLI tool |
| **[Dojin D](https://github.com/POWDER-RANGER/dojin-d)** | TypeScript | ECS combat simulation engine |
| **[Contextual Memory UI](https://github.com/POWDER-RANGER/contextual-memory-ui)** | JavaScript | AI memory infrastructure platform |
| **[OBELISK-Desktop-AI](https://github.com/POWDER-RANGER/OBELISK-Desktop-AI)** | PowerShell | Desktop AI orchestrator |
| **[POWDER-RANGER Bot](https://github.com/POWDER-RANGER/powder-ranger-bot)** | Python | Autonomous GTA V + MGS5 agent |
| **[CIVWATCH Cell Titan](https://github.com/POWDER-RANGER/civwatch-cell-titan)** | Shell | RF observability platform |
| **[CIVWATCH v3](https://github.com/POWDER-RANGER/civwatch-v3)** | HTML | Unified RF observability |

---

## 🤝 Connect

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Curtis_Farrar-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/curtis-farrar-20aa3525b)
[![GitHub](https://img.shields.io/badge/GitHub-POWDER--RANGER-181717?style=flat&logo=github)](https://github.com/POWDER-RANGER)
[![Portfolio](https://img.shields.io/badge/Portfolio-powder--ranger.github.io-FFEA00?style=flat&logo=githubpages)](https://powder-ranger.github.io)
[![ORCID](https://img.shields.io/badge/ORCID-0009--0008--9273--2458-A6CE39?style=flat&logo=orcid)](https://orcid.org/0009-0008-9273-2458)

---

**Contributions welcome** — especially new falsifiers and sourced metrics.

<div align="center">

[![Footer](https://capsule-render.vercel.app/api?type=waving&color=0:FFEA00,35:FFD600,70:4A3600,100:0D1117&height=150&section=footer)](https://github.com/POWDER-RANGER/dollar-gravity-framework)

</div>
