# Deploy

GitHub Pages serves the **`main` branch, repository root**. Build output is committed.

## Layout

```
index.html          built main page
galaxy/index.html   built galaxy page
assets/             hashed JS/CSS chunks
favicon.svg, og.png static files (favicon is copied from src/public/)
src/                sources (Vite root)
scripts/            build check, OG template
```

## Release

```bash
npm ci
npm run build        # clears assets/, writes index.html, galaxy/index.html, assets/
npm run check        # every asset referenced exists; no orphaned assets
git add -A
git commit -m "…"
git push origin main
```

`npm run build` deletes `assets/` first so stale hashed files never accumulate. Always commit source and rebuilt output together.

**Never edit the built files by hand** (`index.html`, `galaxy/index.html`, `assets/`). The next build overwrites them. Page metadata lives in `src/index.html` and `src/galaxy/index.html`.

CI (`.github/workflows/build-check.yml`) runs `npm ci`, `npm run build` and `npm run check` on every push and pull request.

## Local preview

```bash
python3 -m http.server 8766    # serves the repo root exactly as Pages does
# open http://localhost:8766/ and http://localhost:8766/galaxy/
```

`npm run dev` runs the Vite dev server against `src/` with hot reload.

## Pages settings

Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`. `.nojekyll` at the root disables Jekyll processing.

## Regenerating `og.png`

`scripts/og.html` is a 1200×630 template. Render it with any headless browser at that viewport and save over `og.png`. The image avoids dated figures so it does not go stale, and makes no claim stronger than the Sources page.

## Updating data

See `docs/METHODOLOGY.md` §3. Figures live in `src/data/metrics.js`; graph in `src/data/graph.js`; galaxy in `src/galaxy/data.js`.
