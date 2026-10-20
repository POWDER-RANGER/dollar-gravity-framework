import { SOURCES, UNVERIFIED } from "../data/metrics.js";
import { href } from "../pages-meta.js";

export function PageHeader({ eyebrow, title, lede, color }) {
  return (
    <header style={{ "--c": color }}>
      <div className="eyebrow" style={color ? { color } : undefined}>{eyebrow}</div>
      <h1 className="h2" tabIndex={-1} data-page-title>{title}</h1>
      {lede && <p className="lede">{lede}</p>}
    </header>
  );
}

export function Tag({ color, children }) {
  return <span className="tag" style={{ "--c": color }}>{children}</span>;
}

export function Section({ title, tag, color = "#f59e0b", children }) {
  return (
    <section className="section" style={{ "--c": color }}>
      <div className="section-head">
        <span className="section-bar" aria-hidden="true" />
        <h2 className="section-title">{title}</h2>
        {tag && <Tag color={color}>{tag}</Tag>}
      </div>
      <div className="section-body">{children}</div>
    </section>
  );
}

export const P = ({ children }) => <p className="p">{children}</p>;

export function Bullets({ items }) {
  return (
    <ul className="bullets">
      {items.map((it, i) => <li key={i}>{it}</li>)}
    </ul>
  );
}

export function Gap({ children, label = "◈ Gap / falsifiability" }) {
  return (
    <div className="gap" role="note">
      <span className="gap-label">{label}</span>
      <div className="gap-body">{children}</div>
    </div>
  );
}

export function Update({ title = "2026 update", children }) {
  return (
    <div className="update" role="note">
      <span className="update-label">▲ {title}</span>
      <div className="update-body">{children}</div>
    </div>
  );
}

/** Superscript link to a source entry. */
export function Cite({ id }) {
  const s = SOURCES[id];
  return (
    <a className="cite" href={href("sources", id)} title={s ? `${s.source} · ${s.asOf}` : "source"}>
      [src]
    </a>
  );
}

/** Marks a claim carried over from earlier revisions and not independently verified. */
export function Unv({ id }) {
  const u = UNVERIFIED.find((x) => x.id === id);
  return (
    <a
      className="unv"
      href={href("sources", "unverified")}
      title={u ? `Not independently verified: ${u.claim}` : "Not independently verified"}
    >
      unverified
    </a>
  );
}

/** Sourced metric row. Pulls value, as-of date and link from data/metrics.js. */
export function Metric({ id, label, value, color = "#f59e0b" }) {
  const s = SOURCES[id];
  return (
    <div className="metric" style={{ "--c": color }}>
      <span className="metric-label">{label ?? s.label}</span>
      <span className="metric-value">{value ?? s.value}</span>
      <span className="metric-meta">
        {s.asOf} · <a href={s.url} target="_blank" rel="noopener noreferrer">{s.source}</a> · <a href={href("sources", id)}>details</a>
      </span>
    </div>
  );
}

export function Metrics({ title = "Indicators (sourced)", children }) {
  return (
    <div className="metrics">
      <div className="metrics-title">{title}</div>
      {children}
    </div>
  );
}
