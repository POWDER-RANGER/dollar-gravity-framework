// Updated App.jsx with Flows page integration
import { useState } from "react";
import DollarGravityGalaxyCanvas from "./DollarGravityGalaxyCanvas";
import ForceGraph from "./pages/ForceGraph";
import PageOverview from "./pages/PageOverview";
import PageMonetary from "./pages/PageMonetary";
// ... other page imports (assume they exist or add placeholders)
import PageFlows from "./pages/PageFlows";

const PAGES = [
  { id: "overview", label: "OVERVIEW", icon: "◈" },
  { id: "monetary", label: "MONETARY CORE", icon: "₿" },
  { id: "flows", label: "MONEY & POWER FLOWS", icon: "↬" },
  // ... other pages
  { id: "graph", label: "SYSTEM MAP", icon: "⬡" },
  { id: "galaxy", label: "3D GALAXY", icon: "🌌" },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState("overview");

  const renderPage = () => {
    switch (currentPage) {
      case "overview": return <PageOverview />;
      case "monetary": return <PageMonetary />;
      case "flows": return <PageFlows />;
      case "graph": return <ForceGraph />;
      case "galaxy": return <DollarGravityGalaxyCanvas />;
      default: return <PageOverview />;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#020617', color: '#e2e8f0', fontFamily: 'system-ui, monospace' }}>
      {/* Sidebar Nav */}
      <div style={{ width: '220px', background: '#0f172a', borderRight: '1px solid #1e293b', padding: '20px', overflowY: 'auto' }}>
        <h1 style={{ fontSize: '18px', marginBottom: '24px' }}>💵 DOLLAR GRAVITY</h1>
        {PAGES.map(page => (
          <div key={page.id} onClick={() => setCurrentPage(page.id)} style={{
            padding: '10px 16px',
            marginBottom: '4px',
            borderRadius: '4px',
            cursor: 'pointer',
            background: currentPage === page.id ? '#1e293b' : 'transparent',
            color: currentPage === page.id ? '#60a5fa' : '#94a3b8'
          }}>
            {page.icon} {page.label}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        {renderPage()}
      </div>
    </div>
  );
}