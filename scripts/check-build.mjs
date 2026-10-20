// Verifies committed build output: every asset referenced by the HTML pages
// exists, and no file in assets/ is orphaned (unreferenced by HTML, JS or CSS).
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const pages = ["index.html", "galaxy/index.html"];
const assets = readdirSync(join(root, "assets"));
let bad = 0;

for (const page of pages) {
  const html = readFileSync(join(root, page), "utf8");
  for (const m of html.matchAll(/(?:src|href)="((?:\.\.?\/)+assets\/[^"]+)"/g)) {
    const rel = m[1].replace(/^(\.\.?\/)+/, "");
    if (!existsSync(join(root, rel))) { console.error(`MISSING  ${page} → ${rel}`); bad++; }
  }
}

const corpus = [...pages.map((p) => readFileSync(join(root, p), "utf8")),
  ...assets.filter((f) => /\.(js|css)$/.test(f)).map((f) => readFileSync(join(root, "assets", f), "utf8"))].join("\n");
for (const f of assets) {
  if (!corpus.includes(f)) { console.error(`ORPHAN   assets/${f}`); bad++; }
}

for (const f of ["favicon.svg", "og.png", ".nojekyll"]) {
  if (!existsSync(join(root, f))) { console.error(`MISSING  ${f}`); bad++; }
}

if (bad) { console.error(`\n${bad} problem(s).`); process.exit(1); }
console.log(`OK: ${assets.length} assets, ${pages.length} pages.`);
