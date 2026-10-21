import { Component, Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GROUPS, PAGES, PAGE_BY_ID, DEFAULT_PAGE, href } from "./pages-meta.js";
import { REV, REVIEWED } from "./data/metrics.js";
import PageOverview from "./pages/PageOverview.jsx";
import PageMonetary from "./pages/PageMonetary.jsx";
import PageTrade from "./pages/PageTrade.jsx";
import PageRivals from "./pages/PageRivals.jsx";
import PageElites from "./pages/PageElites.jsx";
import PageWar from "./pages/PageWar.jsx";
import PageDomestic from "./pages/PageDomestic.jsx";
import PageResistance from "./pages/PageResistance.jsx";
import PageFalsifiers from "./pages/PageFalsifiers.jsx";
import PageSteering from "./pages/PageSteering.jsx";
import PageSources from "./pages/PageSources.jsx";
import PageGalaxyData from "./pages/PageGalaxyData.jsx";

const PageGraph = lazy(() => import("./pages/PageGraph.jsx")); // pulls in d3 only when needed

const COMPONENTS = {
  overview: PageOverview, monetary: PageMonetary, trade: PageTrade, rivals: PageRivals,
  elites: PageElites, war: PageWar, domestic: PageDomestic, resistance: PageResistance,
  falsifiers: PageFalsifiers, graph: PageGraph, steering: PageSteering, sources: PageSources, "galaxy-data": PageGalaxyData,
};
const WIDE = new Set(["graph", "steering"]);

/** "#/monetary/anchor" → { id, anchor } (unknown ids fall back to overview). */
function parseHash() {
  const [id, anchor] = window.location.hash.replace(/^#\/?/, "").split("/");
  return { id: PAGE_BY_ID[id] ? id : DEFAULT_PAGE, anchor: anchor || null };
}

class Boundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  componentDidUpdate(prev) { if (prev.k !== this.props.k && this.state.error) this.setState({ error: null }); }
  render() {
    return this.state.error
      ? <div className="err" role="alert">This module failed to load. Reload the page, or open another module.<br />{String(this.state.error.message || this.state.error)}</div>
      : this.props.children;
  }
}

export default function App() {
  const [route, setRoute] = useState(parseHash);
  const [menu, setMenu] = useState(false);
  const mainRef = useRef(null);
  const first = useRef(true);

  useEffect(() => {
    const on = () => { setRoute(parseHash()); setMenu(false); };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  const page = PAGE_BY_ID[route.id];
  const idx = PAGES.findIndex((p) => p.id === route.id);
  const prev = PAGES[idx - 1], next = PAGES[idx + 1];
  const Page = COMPONENTS[route.id];

  // Title, scroll + focus management on navigation; anchor scrolling for Sources.
  useEffect(() => {
    document.title = route.id === DEFAULT_PAGE
      ? "Dollar Gravity — a falsifiable model of USD power"
      : `${page.label} · Dollar Gravity`;
    const t = setTimeout(() => {
      if (route.anchor) {
        const el = document.getElementById(route.anchor);
        if (el) {
          el.scrollIntoView({ block: "start" });
          el.classList.add("hit");
          setTimeout(() => el.classList.remove("hit"), 2200);
          return;
        }
      }
      window.scrollTo(0, 0);
      if (!first.current) document.querySelector("[data-page-title]")?.focus({ preventScroll: true });
      first.current = false;
    }, 60);
    return () => clearTimeout(t);
  }, [route.id, route.anchor, page.label]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  const grouped = useMemo(() => GROUPS.map((g) => [g, PAGES.filter((p) => p.group === g)]), []);
  const close = useCallback(() => setMenu(false), []);

  return (
    <>
      <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); mainRef.current?.focus(); }}>Skip to content</a>

      <header className="header">
        <div className="brand">
          <button type="button" className="btn-link menu-btn" aria-expanded={menu} aria-controls="sidebar" onClick={() => setMenu((m) => !m)}>
            ☰ MODULES
          </button>
          <span className="pulse" aria-hidden="true" />
          <span className="brand-text"><b>DOLLAR GRAVITY</b><span className="long"> // OPEN-SOURCE ANALYSIS</span></span>
        </div>
        <div className="header-right">
          <span className="rev" title="Last full review of figures and sources">REV {REV} · REVIEWED {REVIEWED}</span>
          <a className="btn-link galaxy" href="./galaxy/">3D GALAXY<span> v4.0</span> →</a>
        </div>
      </header>

      <div className="body">
        <nav id="sidebar" className={`sidebar${menu ? " open" : ""}`} aria-label="Modules">
          {grouped.map(([g, items]) => (
            <div className="nav-group" key={g}>
              <div className="nav-label">{g}</div>
              {items.map((p) => (
                <a key={p.id} className="nav-item" href={href(p.id)} onClick={close}
                  aria-current={p.id === route.id ? "page" : undefined}>
                  <span className="nav-icon" aria-hidden="true">{p.icon}</span>
                  {p.label}
                  <span className="nav-num" aria-hidden="true">{p.num}</span>
                </a>
              ))}
            </div>
          ))}
          <div className="nav-group">
            <div className="nav-label">Explore</div>
            <a className="nav-item" href="./galaxy/"><span className="nav-icon" aria-hidden="true">✦</span>3D Galaxy v4.0</a>
            <a className="nav-item" href="https://github.com/POWDER-RANGER/dollar-gravity-framework" target="_blank" rel="noopener noreferrer"><span className="nav-icon" aria-hidden="true">⌥</span>Source code</a>
          </div>
        </nav>
        <div className={`overlay${menu ? " open" : ""}`} onClick={close} aria-hidden="true" />

        <main className="main" id="main" tabIndex={-1} ref={mainRef}>
          <div className={`page${WIDE.has(route.id) ? " wide" : ""}`}>
            <Boundary k={route.id}>
              <Suspense fallback={<div className="page-loading">Loading module…</div>}>
                <Page />
              </Suspense>
            </Boundary>

            <nav className="pager" aria-label="Next and previous module">
              {prev && (
                <a className="prev" href={href(prev.id)} rel="prev">
                  <div className="dir">← Previous · {prev.num}</div>
                  <div className="ttl">{prev.label}</div>
                </a>
              )}
              {next && (
                <a className="next" href={href(next.id)} rel="next">
                  <div className="dir">Next · {next.num} →</div>
                  <div className="ttl">{next.label}</div>
                </a>
              )}
            </nav>
          </div>
        </main>
      </div>
    </>
  );
}
