# Automating Deployment of Dollar-Gravity Interactive Visuals on GitHub.io
## Using Perplexity AI Model for Intelligent Canvas Generation

**Author**: Curtis Farrar / POWDER-RANGER  
**Framework**: Dollar-Gravity Framework v4.0  
**Live Demo**: https://powder-ranger.github.io/dollar-gravity-framework  
**Last Updated**: March 6, 2026

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Prerequisites](#prerequisites)
4. [Automation Workflow](#automation-workflow)
5. [GitHub Pages Deployment Strategy](#github-pages-deployment-strategy)
6. [Perplexity AI Integration](#perplexity-ai-integration)
7. [Self-Contained HTML Bundle Strategy](#self-contained-html-bundle-strategy)
8. [Updating the Live Galaxy](#updating-the-live-galaxy)
9. [Scenario Slider Integration](#scenario-slider-integration)
10. [Troubleshooting](#troubleshooting)
11. [Advanced: CI/CD Pipeline](#advanced-cicd-pipeline)

---

## Overview

This guide documents the complete automation workflow for deploying the **Dollar-Gravity Framework** interactive 3D galaxy visualization to GitHub Pages. The workflow leverages:

- **Perplexity AI**: For intelligent code generation, dataset compilation, and visual enhancement
- **GitHub MCP (Model Context Protocol)**: For direct repository manipulation via AI
- **ES Module CDN**: Self-contained deployment without npm/build tools
- **React Three Fiber**: WebGL 3D rendering in browser
- **GitHub Pages**: Free static hosting with custom domain support

### Why This Approach?

**Traditional workflow** (manual, slow):
```bash
# Edit source files locally
npm run build
git add dist/
git commit -m "Update"
git push
# Wait for Actions deployment
```

**Automated workflow** (AI-assisted, instant):
```
Perplexity conversation → GitHub MCP tools → Live site updated in ~30 seconds
```

**Key advantages**:
- No local environment setup required
- No npm dependencies or build steps
- Instant deployment from conversational instructions
- AI handles data compilation from spec documents
- Version control via GitHub commits
- Rollback capability via git history

---

## Architecture

### Repository Structure

```
dollar-gravity-framework/
├── main branch
│   ├── src/
│   │   └── DollarGravityGalaxyCanvas.jsx   # Development canvas
│   ├── docs/
│   │   ├── dollar-gravity-framework-v4.0-complete.md
│   │   └── DEPLOYMENT_AUTOMATION.md        # This file
│   ├── package.json
│   └── vite.config.js
│
└── gh-pages branch
    └── index.html                          # Production bundle (self-contained)
```

### Deployment Flow

```
┌─────────────────────────────────────────────────────────────┐
│  Perplexity AI Conversation                                 │
│  "Deploy updated galaxy with Tier 2 planets + ISR slider"   │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│  Perplexity reads v4.0 spec document                        │
│  - Extracts Tier 1 + Tier 2 planet data (145 countries)    │
│  - Compiles relationship arcs                               │
│  - Generates React Three Fiber component code               │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│  GitHub MCP Tool: push_files                                │
│  - Target: gh-pages branch                                  │
│  - File: index.html (self-contained ES modules)             │
│  - Commit message auto-generated                            │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│  GitHub Pages builds automatically                          │
│  - No Actions workflow needed (static HTML)                 │
│  - Live in ~10-30 seconds                                   │
│  - URL: https://powder-ranger.github.io/dollar-gravity-framework
└─────────────────────────────────────────────────────────────┘
```

---

## Prerequisites

### 1. GitHub Repository Setup

**Create repository** (if not exists):
```bash
gh repo create dollar-gravity-framework --public
cd dollar-gravity-framework
git init
```

**Create gh-pages branch**:
```bash
git checkout --orphan gh-pages
git rm -rf .
echo "<!DOCTYPE html><html><body>Initializing...</body></html>" > index.html
git add index.html
git commit -m "Initial gh-pages"
git push origin gh-pages
```

**Enable GitHub Pages**:
1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` / `/ (root)`
4. Save

### 2. Perplexity AI Setup

**Enable GitHub MCP integration**:
1. Perplexity Settings → Integrations
2. Connect GitHub account
3. Grant repository access to `dollar-gravity-framework`
4. Verify MCP tools are available:
   - `mcp_tool_github_mcp_direct_push_files`
   - `mcp_tool_github_mcp_direct_get_file_contents`
   - `mcp_tool_github_mcp_direct_list_branches`

**Upload spec document**:
1. Attach `dollar-gravity-framework-v4.0-complete.md` to conversation
2. Perplexity indexes the dataset tables for extraction

---

## Automation Workflow

### Step 1: Conversational Instruction

**Example prompt to Perplexity**:
```
Deploy updated Dollar-Gravity galaxy to GitHub Pages:
- Include full Tier 1 (ranks 1-30) + Tier 2 sample (ranks 31-50)
- Add zoom-to-inspect planet mode with intel panels
- Add scenario sliders for ISR intensity and dollar pull
- Match the cinematic visual style (luminous halos, orbital glow)
- Deploy to gh-pages branch as self-contained index.html
```

### Step 2: AI Data Compilation

Perplexity automatically:
1. **Searches the spec document** for Tier 1 and Tier 2 tables
2. **Extracts metrics** for each country:
   - Power Mass (M_v4)
   - Nuclear stockpiles
   - Threat posture
   - Dollar dependency
   - GFP rank
3. **Compiles relationship arcs** from Section 11 (Canonical Link Encoding)
4. **Generates planet positions** using orbital clustering logic
5. **Assigns visual properties**:
   - Planet size ∝ cube root of M
   - Colors from alignment bloc
   - Nuclear halos for 9 states + Iran latent glow
   - Dollar vulnerability rings

### Step 3: Code Generation

Perplexity generates a **single self-contained HTML file**:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Dollar-Gravity Framework v4.0</title>
  <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@18.2.0",
        "react-dom/client": "https://esm.sh/react-dom@18.2.0/client",
        "@react-three/fiber": "https://esm.sh/@react-three/fiber@8.15.12",
        "@react-three/drei": "https://esm.sh/@react-three/drei@9.92.7",
        "three": "https://esm.sh/three@0.160.0"
      }
    }
  </script>
  <style>/* Inline styles */</style>
</head>
<body>
  <div id="root"></div>
  <script type="module">
    // Complete React Three Fiber app inline
    import React from 'react';
    // ... (full component code)
  </script>
</body>
</html>
```

**Key features**:
- **No bundler needed**: ES modules loaded from esm.sh CDN
- **No npm install**: React/Three.js imported at runtime
- **Single file**: Entire app in one HTML file (~500-800 lines)
- **Instant deployment**: Push to gh-pages → live in seconds

### Step 4: GitHub MCP Deployment

Perplexity executes:
```javascript
mcp_tool_github_mcp_direct_push_files({
  owner: "POWDER-RANGER",
  repo: "dollar-gravity-framework",
  branch: "gh-pages",
  message: "Production Galaxy v4.0: Tier 1+2, zoom-inspect, scenario sliders",
  files: [{
    path: "index.html",
    content: "<!DOCTYPE html>..." // Generated HTML
  }]
})
```

**Result**:
- Commit SHA returned: `b6b1da86da3dac8e5f7ab4475e6b9dcbac637ef5`
- GitHub Pages auto-builds
- Live at: `https://powder-ranger.github.io/dollar-gravity-framework`

### Step 5: Verification

Perplexity provides:
- ✅ Live URL
- ✅ Commit link
- ✅ Feature summary
- ✅ Next expansion options

---

## GitHub Pages Deployment Strategy

### Why gh-pages Branch?

**Separation of concerns**:
- `main` branch: Development source, docs, npm project
- `gh-pages` branch: Production deployment (single HTML file)

**Benefits**:
- No risk of accidentally deploying dev files
- Clean production URL structure
- Easy rollback (just revert gh-pages commit)
- No build artifacts polluting main branch

### Alternative: GitHub Actions (Optional)

For automated builds from main:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**Trade-offs**:
- ✅ Automated on every push
- ✅ Runs tests/lint before deploy
- ❌ Slower (2-5 min build time)
- ❌ Requires npm setup
- ❌ Less flexible than AI-assisted instant deploy

**Recommended approach**: Use Perplexity MCP for rapid iteration, add Actions for production CI/CD later.

---

## Perplexity AI Integration

### Available GitHub MCP Tools

| Tool | Purpose | When to Use |
|------|---------|-------------|
| `get_file_contents` | Read file from repo | Check current canvas code before update |
| `push_files` | Write/update files | Deploy new canvas version |
| `list_branches` | List repo branches | Verify gh-pages exists |
| `get_latest_release` | Get release info | Check version tags |
| `create_pull_request` | Open PR | For review workflow (optional) |
| `list_commits` | View commit history | Track deployment timeline |

### Example: Iterative Update Workflow

**Conversation 1** (Initial deploy):
```
User: "Deploy Dollar-Gravity galaxy to GitHub Pages with Tier 1 planets"

Perplexity:
1. Reads v4.0 spec
2. Generates canvas with 30 Tier 1 planets
3. Pushes to gh-pages
4. Returns live URL
```

**Conversation 2** (Add features):
```
User: "Add Tier 2 planets and ISR intensity slider"

Perplexity:
1. Gets current index.html from gh-pages
2. Extracts Tier 2 data from spec
3. Adds 115 more planets
4. Implements slider component
5. Pushes updated index.html
6. Returns new commit SHA
```

**Conversation 3** (Visual polish):
```
User: "Make the nuclear halos pulse more dramatically and add Saturn-like rings"

Perplexity:
1. Gets current code
2. Enhances halo animation (sin wave amplitude)
3. Adds torus geometry for rings
4. Pushes update
5. Shows side-by-side before/after
```

### Context Management

**Perplexity maintains context across conversation**:
- Remembers dataset structure from uploaded spec
- Tracks previous canvas features
- Suggests logical next steps
- Avoids re-generating unchanged code

**Best practices**:
1. **Attach spec document at start** of each new conversation
2. **Reference previous commits** when iterating: "Update the canvas from commit b6b1da8"
3. **Request incremental changes**: "Add X without changing Y"
4. **Ask for validation**: "Check if the ISR slider is working correctly"

---

## Self-Contained HTML Bundle Strategy

### Why Single-File Deployment?

**Traditional React app structure**:
```
dist/
├── index.html
├── assets/
│   ├── index-abc123.js (2.5 MB)
│   ├── vendor-def456.js (800 KB)
│   └── index-xyz789.css (45 KB)
└── favicon.ico
```

**Problems**:
- Multiple file dependencies
- Cache invalidation issues
- CORS complications with external CDN
- Harder to inspect/debug production

**Single-file structure**:
```
index.html (80-150 KB with inline JS/CSS)
```

**Advantages**:
- ✅ **One atomic unit**: Works or doesn't, no partial loads
- ✅ **ES module imports**: React/Three.js from CDN (cached globally)
- ✅ **Inspect source**: View-source shows complete app
- ✅ **Fast updates**: One file push = instant deploy
- ✅ **Portable**: Copy HTML anywhere, works standalone

### ES Module Import Map

**Key technique** enabling single-file React apps:

```html
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react@18.2.0",
    "react-dom/client": "https://esm.sh/react-dom@18.2.0/client",
    "@react-three/fiber": "https://esm.sh/@react-three/fiber@8.15.12",
    "@react-three/drei": "https://esm.sh/@react-three/drei@9.92.7",
    "three": "https://esm.sh/three@0.160.0"
  }
}
</script>
```

**How it works**:
1. Browser reads import map
2. When script does `import React from 'react'`, browser fetches from esm.sh
3. esm.sh serves pre-built ES modules
4. Transitive dependencies auto-resolved
5. All modules cached by browser

**Fallback for older browsers**:
```html
<script>
  if (!HTMLScriptElement.supports('importmap')) {
    document.write('<script src="https://ga.jspm.io/npm:es-module-shims@1.7.0/dist/es-module-shims.js"><\/script>');
  }
</script>
```

### Inline Dataset Strategy

**Planet data compiled into JavaScript**:

```javascript
const countries = [
  { id: 'USA', name: 'United States', mass: 1.19, ... },
  { id: 'CHN', name: 'China', mass: 1.02, ... },
  // ... 145 planets
];
```

**Why inline vs. external JSON?**
- No additional HTTP request
- Data available immediately on page load
- Easier for Perplexity to update (one file)
- Version control in same commit as visual changes

**For future scale** (195 planets):
```javascript
// Lazy-load Tier 3 ghosts on demand
const tier3Promise = fetch('./tier3-ghosts.json').then(r => r.json());
```

---

## Updating the Live Galaxy

### Workflow Patterns

#### 1. Quick Visual Tweak

**Scenario**: Change planet colors, adjust halo intensity

**Perplexity prompt**:
```
"Update the live galaxy:
- Change Iran's planet color to deeper crimson (#9a0000)
- Increase nuclear halo pulse amplitude by 50%
- Deploy to gh-pages"
```

**AI executes**:
1. Fetches current `index.html`
2. Finds color/animation constants
3. Applies changes
4. Pushes update
5. **Live in 20 seconds**

#### 2. Data Refresh

**Scenario**: New GFP 2026 rankings released, update all planet masses

**Perplexity prompt**:
```
"Update all planet masses with latest GFP 2026 rankings:
[paste updated table from spec]
Recalculate M_v4 for each, deploy to gh-pages"
```

**AI executes**:
1. Parses new data table
2. Recalculates M_v4 formula for each country
3. Updates `countries` array
4. Regenerates visual sizes (cube root scaling)
5. Pushes update

#### 3. New Feature Addition

**Scenario**: Add timeline scrubber (2020-2027)

**Perplexity prompt**:
```
"Add timeline scrubber to the galaxy:
- Horizontal slider at bottom (2020-2027)
- On scrub, interpolate planet positions from historical data
- Show year label
- Deploy to gh-pages"
```

**AI executes**:
1. Fetches current canvas
2. Adds `<input type="range">` UI component
3. Implements `useEffect` for slider state
4. Creates interpolation logic
5. Pushes updated canvas

### Version Control Best Practices

**Commit message format**:
```
[Type]: Brief description

Detailed changes:
- Feature 1
- Feature 2
- Data update 3

Live: https://powder-ranger.github.io/dollar-gravity-framework
```

**Examples**:
- `feat: Add Tier 2 regional powers (115 planets)`
- `fix: Correct Iran nuclear halo visibility`
- `data: Update Q1 2026 GFP rankings`
- `style: Enhance cinematic lighting and halo effects`
- `perf: Optimize relationship arc rendering for 195 planets`

**Rollback procedure**:
```bash
# If deployed update breaks site
git checkout gh-pages
git log --oneline  # Find last working commit
git reset --hard abc1234  # SHA of working version
git push --force origin gh-pages
# Site reverts in ~30 seconds
```

---

## Scenario Slider Integration

### Implemented Sliders

#### 1. ISR Stream Intensity (0-100%)

**Visual effects**:
- **100%**: Russia→Iran purple tracer at full pulse speed
- **100%**: Iran planet size boosted +15% (effective mass)
- **100%**: Iran latent nuclear glow at full opacity
- **0%**: ISR tracer fades out
- **0%**: Iran returns to base size (M = 0.22)
- **0%**: Latent glow disappears

**Implementation**:
```javascript
const [isrIntensity, setIsrIntensity] = useState(1.0);

// In Planet component
const effectiveSize = data.id === 'IRN' 
  ? data.size * (0.85 + 0.15 * isrIntensity)
  : data.size;

// In GravityLine component
pulse={rel.type === 'isr' ? isrIntensity > 0.5 : true}
```

**User control**:
```html
<input type="range" id="isr-slider" min="0" max="100" value="100" />
```

#### 2. Dollar Singularity Pull (0-100%)

**Visual effects**:
- **100%**: Dollar vulnerability rings at full opacity
- **100%**: Central golden singularity pulsing bright
- **0%**: All dollar rings fade to invisible
- **0%**: Singularity dims (simulates de-dollarization)
- **50%**: Partial de-dollarization (BRICS scenario)

**Implementation**:
```javascript
const [dollarPull, setDollarPull] = useState(1.0);

// Dollar ring opacity
opacity={data.usdDep * dollarPull}

// Singularity brightness
opacity={0.4 * dollarPull}
```

### Future Slider Ideas

| Slider | Range | Visual Effect | Strategic Meaning |
|--------|-------|---------------|-------------------|
| **Hormuz Closure** | 0-100% | Dims Gulf state planets, brightens conflict arcs | Strait of Hormuz blockade impact |
| **Ukraine Ceasefire** | Off/On | Repositions Ukraine/Russia planets closer, dims conflict arc | Post-war realignment |
| **Taiwan Invasion** | 0-100% | Brightens China-Taiwan conflict arc, dims US-Taiwan alliance | Escalation scenario |
| **Iran Breakout** | Off/On | Expands latent glow to full crimson halo | Nuclear threshold crossed |
| **Saudi Yuan Pricing** | 0-100% | Shifts Saudi orbit from US-centric toward China sphere | Petrodollar collapse |
| **SWIFT Exclusion** | Target country | Dims dollar ring, repositions planet outward | Sanctions impact |

**Implementation pattern**:
```javascript
const scenarios = {
  hormuzClosure: { active: false, intensity: 0 },
  iranBreakout: { active: false },
  saudiYuan: { active: false, intensity: 0 },
};

// Apply in useFrame or component state
if (scenarios.iranBreakout.active) {
  iranData.haloColor = '#cc0000';
  iranData.nuclear = 50; // Estimated initial arsenal
}
```

---

## Troubleshooting

### Common Issues

#### 1. GitHub Pages Not Updating

**Symptoms**: Pushed to gh-pages, but live site shows old version

**Causes & fixes**:
- **Browser cache**: Hard refresh (Ctrl+Shift+R)
- **GitHub Pages cache**: Wait 2-5 minutes, Pages CDN propagation
- **Wrong branch**: Check Settings → Pages → Source is `gh-pages`
- **Build failure**: Check repo Settings → Pages → should show green checkmark

**Verification**:
```bash
# Check gh-pages HEAD matches expected commit
git ls-remote origin gh-pages
# Compare to latest push SHA
```

#### 2. ES Module Import Errors

**Symptoms**: Console errors like `Uncaught SyntaxError: Cannot use import statement outside a module`

**Cause**: Missing `type="module"` on script tag

**Fix**:
```html
<!-- Wrong -->
<script>
  import React from 'react';
</script>

<!-- Correct -->
<script type="module">
  import React from 'react';
</script>
```

#### 3. Three.js Canvas Not Rendering

**Symptoms**: Black screen, no WebGL errors in console

**Common causes**:
1. **Camera too close/far**: Adjust `camera={{ position: [0, 0, 65] }}`
2. **Lights missing**: Add `<ambientLight />` and `<pointLight />`
3. **OrbitControls not imported**: Check `@react-three/drei` import
4. **Canvas size zero**: Ensure parent div has `height: 100vh`

**Debug checklist**:
```javascript
// Add to Canvas
<Canvas
  camera={{ position: [0, 0, 65], fov: 65 }}
  onCreated={({ gl }) => console.log('WebGL context:', gl)}
>
  <color attach="background" args={['#020617']} />
  <ambientLight intensity={0.6} />
  {/* Your scene */}
</Canvas>
```

#### 4. Planet Data Not Loading

**Symptoms**: Empty galaxy, no planets visible

**Cause**: Syntax error in `countries` array

**Fix**: Validate JSON structure
```javascript
// Check in browser console
console.log('Planet count:', countries.length);
console.log('First planet:', countries[0]);
```

#### 5. Slider Not Affecting Visuals

**Symptoms**: Moving slider, but ISR tracer/dollar rings unchanged

**Cause**: State not connected to visual components

**Fix**:
```javascript
// Ensure state flows through props
<GalaxyScene isrIntensity={isrIntensity} dollarPull={dollarPull} />

// Ensure components consume props
const Planet = ({ data, isrIntensity, dollarPull }) => {
  // Use isrIntensity/dollarPull in calculations
}
```

---

## Advanced: CI/CD Pipeline

### Full Automation with GitHub Actions

For production deployments with testing/validation:

#### `.github/workflows/deploy-galaxy.yml`

```yaml
name: Deploy Dollar-Gravity Galaxy

on:
  push:
    branches: [main]
    paths:
      - 'src/**'
      - 'docs/dollar-gravity-framework-v4.0-complete.md'
  workflow_dispatch:
    inputs:
      tier_level:
        description: 'Tier level to deploy (1, 2, or 3)'
        required: true
        default: '2'
        type: choice
        options:
          - '1'
          - '2'
          - '3'

jobs:
  validate-data:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Validate spec document
        run: |
          # Check spec tables are well-formed
          python scripts/validate_spec.py docs/dollar-gravity-framework-v4.0-complete.md
      
      - name: Extract planet data
        run: |
          # Parse markdown tables into JSON
          python scripts/extract_planet_data.py \
            --spec docs/dollar-gravity-framework-v4.0-complete.md \
            --tier ${{ github.event.inputs.tier_level || '2' }} \
            --output planet-data.json
      
      - name: Upload planet data
        uses: actions/upload-artifact@v3
        with:
          name: planet-data
          path: planet-data.json

  build-galaxy:
    needs: validate-data
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Download planet data
        uses: actions/download-artifact@v3
        with:
          name: planet-data
      
      - name: Generate self-contained HTML
        run: |
          # Template + data injection
          python scripts/generate_galaxy_html.py \
            --template src/galaxy-template.html \
            --data planet-data.json \
            --output index.html
      
      - name: Validate HTML
        run: |
          # Check for syntax errors, missing imports
          npx htmlhint index.html
      
      - name: Upload artifact
        uses: actions/upload-artifact@v3
        with:
          name: galaxy-bundle
          path: index.html

  deploy:
    needs: build-galaxy
    runs-on: ubuntu-latest
    steps:
      - name: Download galaxy bundle
        uses: actions/download-artifact@v3
        with:
          name: galaxy-bundle
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
          publish_branch: gh-pages
          commit_message: 'Deploy: ${{ github.event.head_commit.message }}'
      
      - name: Comment on commit
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.repos.createCommitComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              commit_sha: context.sha,
              body: `🚀 Galaxy deployed: https://powder-ranger.github.io/dollar-gravity-framework`
            });
```

### Python Helper Scripts

#### `scripts/extract_planet_data.py`

```python
import re
import json
import argparse

def extract_tier_table(markdown_content, tier):
    """Extract planet data from markdown table"""
    # Find Tier N section
    pattern = rf"## {tier}\.\d+\..*?\n\n(\|.*?\n)+"
    matches = re.findall(pattern, markdown_content, re.DOTALL)
    
    planets = []
    for match in matches:
        # Parse table rows
        rows = [r for r in match.split('\n') if r.startswith('|')][2:]  # Skip header/separator
        for row in rows:
            cols = [c.strip() for c in row.split('|')[1:-1]]
            if len(cols) < 8:
                continue
            
            planets.append({
                'rank': int(cols[0]),
                'id': cols[1][:3].upper(),
                'name': cols[1],
                'active_personnel': int(cols[2].replace(',', '')),
                'gdp_usd_trillion': float(cols[3]),
                'population_millions': int(cols[4]),
                'tech_multiplier': float(cols[5]),
                'mass_base': float(cols[6]),
                'mass_v4': float(cols[7]),
                # ... extract remaining columns
            })
    
    return planets

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--spec', required=True)
    parser.add_argument('--tier', type=int, default=2)
    parser.add_argument('--output', default='planet-data.json')
    args = parser.parse_args()
    
    with open(args.spec) as f:
        markdown = f.read()
    
    planets = []
    for tier in range(1, args.tier + 1):
        planets.extend(extract_tier_table(markdown, tier))
    
    with open(args.output, 'w') as f:
        json.dump(planets, f, indent=2)
    
    print(f"Extracted {len(planets)} planets")

if __name__ == '__main__':
    main()
```

#### `scripts/generate_galaxy_html.py`

```python
import json
import argparse
from jinja2 import Template

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--template', required=True)
    parser.add_argument('--data', required=True)
    parser.add_argument('--output', default='index.html')
    args = parser.parse_args()
    
    with open(args.template) as f:
        template = Template(f.read())
    
    with open(args.data) as f:
        planets = json.load(f)
    
    # Calculate positions (simple spiral layout)
    for i, planet in enumerate(planets):
        angle = i * 0.3
        radius = 10 + (i % 30) * 2
        planet['position'] = [
            radius * math.cos(angle),
            (i % 5 - 2) * 5,
            radius * math.sin(angle)
        ]
    
    # Render template
    html = template.render(planets=planets)
    
    with open(args.output, 'w') as f:
        f.write(html)
    
    print(f"Generated {args.output}")

if __name__ == '__main__':
    main()
```

### Hybrid Approach: Best of Both

**Recommended workflow**:

1. **Use Perplexity for rapid iteration**:
   - Visual tweaks
   - Quick data updates
   - Experimental features
   - A/B testing designs

2. **Use GitHub Actions for production releases**:
   - Scheduled data refreshes (weekly GFP updates)
   - Multi-tier deployments (staging → production)
   - Automated testing
   - Version tagging

**Example**:
```bash
# Rapid iteration (Perplexity)
"Add glowing rings to nuclear planets" → deployed in 30 sec

# Production release (Actions)
git tag v4.1.0
git push --tags
# → Actions runs full test suite → deploys → creates GitHub Release
```

---

## Conclusion

The **Perplexity AI + GitHub MCP + ES Modules** workflow enables:

✅ **Zero-config deployment**: No local setup, npm, or build tools  
✅ **Conversational automation**: Natural language → live site in seconds  
✅ **Intelligent data compilation**: AI extracts/transforms spec tables  
✅ **Atomic updates**: Single HTML file = no dependency hell  
✅ **Instant rollback**: Git history = time machine  
✅ **Shareable artifacts**: Copy `index.html` anywhere, works standalone  

**Live demo**: https://powder-ranger.github.io/dollar-gravity-framework

**Next steps**:
1. Expand to full 195 planets (Tier 3 ghosts)
2. Add timeline scrubber (2020-2027)
3. Implement additional scenario sliders
4. Custom domain setup (`dollargravity.io`)
5. Analytics integration (track planet click patterns)

---

**Maintained by**: Curtis Farrar / POWDER-RANGER  
**License**: MIT  
**Contributions**: Issues and PRs welcome  
**Contact**: https://github.com/POWDER-RANGER
