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

/** Scroll progress bar under the header. */
function Progress() {
  const ref = useRef(null);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - innerHeight;
        if (ref.current) ref.current.style.transform = `scaleX(${h > 0 ? Math.min(1, scrollY / h) : 0})`;
      });
    };
    on();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);
  return <div className="progress" aria-hidden="true"><i ref={ref} /></div>;
}

/** "On this page" rail built from the rendered section headings. */
function Toc({ routeId }) {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(null);
  useEffect(() => {
    setItems([]); setActive(null);
    let io;
    const t = setTimeout(() => {
      const hs = [...document.querySelectorAll(".page .section-title")];
      hs.forEach((h, i) => { if (!h.id) h.id = `toc-${routeId}-${i}`; });
      setItems(hs.map((h) => ({ id: h.id, text: h.textContent })));
      if (!("IntersectionObserver" in window)) return;
      hs.forEach((h) => { const s = h.closest(".section"); if (s) s.dataset.tocId = h.id; });
      io =new IntersectionObserver((es) => {
        const vis = es.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.dataset.tocId);
      }, { rootMargin: "-70px 0px -60% 0px" });
      hs.forEach((h) => { const s = h.closest(".section"); if (s) io.observe(s); });
    }, 250);
    return () => { clearTimeout(t); io?.disconnect(); };
  }, [routeId]);
  if (items.length < 3) return null;
  return (
    <nav className="toc" aria-label="On this page">
      <div className="toc-label">On this page</div>
      <ol>
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#/${routeId}`} aria-current={active === it.id ? "true" : undefined}
              onClick={(e) => { e.preventDefault(); document.getElementById(it.id)?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }); }}>
              {it.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Fade-up for blocks below the fold. Skipped under reduced motion. */
function useReveal(routeId) {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let io;
    const t = setTimeout(() => {
      const els = [...document.querySelectorAll(".page .section, .page .card, .page .fals, .page .src, .page .tcol, .page .gap, .page .update, .page .fboard")]
        .filter((el) => el.getBoundingClientRect().top > innerHeight);
      io = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.remove("pre"); io.unobserve(e.target); }
      }), { rootMargin: "0px 0px -6% 0px" });
      els.forEach((el) => { el.classList.add("pre"); io.observe(el); });
    }, 120);
    return () => { clearTimeout(t); io?.disconnect(); document.querySelectorAll(".pre").forEach((el) => el.classList.remove("pre")); };
  }, [routeId]);
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

  useReveal(route.id);
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
      <Progress />

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
          <div className="page-wrap">
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
          {!WIDE.has(route.id) && <Toc routeId={route.id} />}
          </div>
        </main>
      </div>
    </>
  );
}
