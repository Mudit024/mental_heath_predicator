import React from 'react';

export default function Gauge({ score = 0, state = 'idle' }) {
  const ARC_LENGTH = 314; // Approximate circumference for r=100 semi-circle
  const clampedScore = Math.max(0, Math.min(10, score));
  const offset = ARC_LENGTH * (1 - clampedScore / 10);

  // Generate tick marks for 0 to 10
  const ticks = [];
  const cx = 120, cy = 140, rOuter = 100, rInner = 88;
  for (let i = 0; i <= 10; i += 2) {
    const angle = Math.PI - (i / 10) * Math.PI;
    const x1 = cx + rOuter * Math.cos(angle);
    const y1 = cy - rOuter * Math.sin(angle);
    const x2 = cx + rInner * Math.cos(angle);
    const y2 = cy - rInner * Math.sin(angle);
    ticks.push(<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.25)" strokeWidth="2" />);
  }

  return (
    <svg className="gauge-svg" viewBox="0 0 240 160" aria-label="Mental Health Score Gauge">
      <defs>
        <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      
      {/* Track */}
      <path className="gauge-track" d="M 20 140 A 100 100 0 0 1 220 140" />
      
      {/* Ticks */}
      <g>{ticks}</g>
      
      {/* Animated Fill */}
      {state === 'result' && (
        <path
          className="gauge-fill"
          d="M 20 140 A 100 100 0 0 1 220 140"
          style={{ strokeDashoffset: offset }}
        />
      )}
      
      <circle className="gauge-needle-hub" cx="120" cy="140" r="6" />
    </svg>
  );
}
