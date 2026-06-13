import React from 'react';
import MoneyPowerSankey from '../components/MoneyPowerSankey';

export default function PageFlows() {
  return (
    <div>
      <div style={{ fontSize: '10px', fontFamily: 'monospace', color: '#f59e0b', letterSpacing: '0.2em', marginBottom: '16px' }}>
        MODULE — FLOWS OF MONEY & POWER
      </div>
      <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#f1f5f9', margin: '0 0 24px' }}>
        Dollar Gravity: Flows Visualization
      </h2>
      <MoneyPowerSankey />
      <div style={{ marginTop: '32px' }}>
        <h4 style={{ color: '#94a3b8' }}>Key Insights</h4>
        <ul style={{ color: '#64748b', lineHeight: '1.7' }}>
          <li>USD Core → Global Banks: Primary settlement rails</li>
          <li>Allies receive amplified flows via security guarantees</li>
          <li>Rivals maintain partial entanglement with bypass mechanisms</li>
          <li>Feedback loops from elites and MIC sustain the system</li>
        </ul>
      </div>
    </div>
  );
}
