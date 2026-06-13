import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';

export default function MoneyPowerSankey() {
  const svgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 900, height: 600 });

  // Sample data for Dollar Gravity flows: money, influence, military aid, etc.
  const graphData = {
    nodes: [
      { name: 'USD Core' },
      { name: 'US Treasury' },
      { name: 'Global Banks' },
      { name: 'Allies (NATO+)' },
      { name: 'China' },
      { name: 'Rivals/Holdouts' },
      { name: 'Petrodollars' },
      { name: 'Sanctions Bypass' },
      { name: 'Military-Industrial' },
      { name: 'Elite Networks' }
    ],
    links: [
      { source: 0, target: 1, value: 4500 },
      { source: 1, target: 2, value: 3200 },
      { source: 0, target: 3, value: 1800 },
      { source: 2, target: 3, value: 1200 },
      { source: 0, target: 4, value: 2800 },
      { source: 4, target: 5, value: 900 },
      { source: 3, target: 6, value: 650 },
      { source: 0, target: 7, value: 400 },
      { source: 1, target: 8, value: 1100 },
      { source: 8, target: 9, value: 750 },
      { source: 9, target: 0, value: 600 }, // feedback loops
    ]
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;

    const sankeyGenerator = sankey()
      .nodeWidth(24)
      .nodePadding(40)
      .extent([[50, 50], [width - 50, height - 50]]);

    const { nodes, links } = sankeyGenerator(graphData);

    // Links
    const link = svg.append('g')
      .selectAll('path')
      .data(links)
      .enter().append('path')
      .attr('d', sankeyLinkHorizontal())
      .attr('stroke', d => d3.interpolateCool(d.value / 5000))
      .attr('stroke-width', d => Math.max(1, d.width))
      .attr('fill', 'none')
      .attr('opacity', 0.7);

    // Nodes
    const node = svg.append('g')
      .selectAll('rect')
      .data(nodes)
      .enter().append('rect')
      .attr('x', d => d.x0)
      .attr('y', d => d.y0)
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', '#60a5fa')
      .attr('stroke', '#1e293b');

    // Node labels
    svg.append('g')
      .selectAll('text')
      .data(nodes)
      .enter().append('text')
      .attr('x', d => d.x0 < width / 2 ? d.x1 + 8 : d.x0 - 8)
      .attr('y', d => (d.y1 + d.y0) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', d => d.x0 < width / 2 ? 'start' : 'end')
      .attr('fill', '#e2e8f0')
      .attr('font-size', '12px')
      .attr('font-family', 'monospace')
      .text(d => d.name);

    // Values on links (optional)
    svg.append('g')
      .selectAll('text')
      .data(links)
      .enter().append('text')
      .attr('x', d => (d.source.x1 + d.target.x0) / 2)
      .attr('y', d => (d.y0 + d.y1) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .attr('fill', '#94a3b8')
      .attr('font-size', '10px')
      .text(d => d.value > 500 ? `$${Math.round(d.value/100)}B` : '');
  }, [dimensions]);

  return (
    <div style={{ padding: '20px', background: '#0f172a', borderRadius: '8px', border: '1px solid #334155' }}>
      <h3 style={{ color: '#60a5fa', marginBottom: '16px', fontFamily: 'monospace' }}>MONEY & POWER FLOWS — DOLLAR GRAVITY</h3>
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height} style={{ background: '#020617' }}></svg>
      <p style={{ color: '#64748b', fontSize: '12px', marginTop: '12px' }}>
        Flows represent approximate annual USD-denominated influence, trade settlement, military aid, reserve holdings, and feedback loops. Interactive filters coming soon.
      </p>
    </div>
  );
}
