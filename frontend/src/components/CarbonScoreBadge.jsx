import React from 'react';

export default function CarbonScoreBadge({ score, size = 'md' }) {
  const color = score >= 75 ? '#4ade80' : score >= 50 ? '#fbbf24' : '#f87171';
  const label = score >= 75 ? 'A' : score >= 60 ? 'B' : score >= 45 ? 'C' : score >= 30 ? 'D' : 'F';
  
  const sizes = {
    sm: { outer: 48, strokeW: 4, fontSize: 14, labelSize: 10 },
    md: { outer: 72, strokeW: 5, fontSize: 20, labelSize: 13 },
    lg: { outer: 96, strokeW: 6, fontSize: 26, labelSize: 16 }
  };
  const s = sizes[size];
  const r = (s.outer - s.strokeW * 2) / 2;
  const circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={s.outer} height={s.outer} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={s.outer/2} cy={s.outer/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={s.strokeW} />
        <circle cx={s.outer/2} cy={s.outer/2} r={r} fill="none" stroke={color}
          strokeWidth={s.strokeW} strokeDasharray={`${fill} ${circ}`}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color}80)`, transition: 'stroke-dasharray 1s ease' }}
        />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
          style={{ transform: 'rotate(90deg)', transformOrigin: '50% 50%', fill: color, fontSize: s.fontSize, fontWeight: 700, fontFamily: 'DM Sans' }}>
          {score}
        </text>
      </svg>
      <span style={{ color, fontSize: s.labelSize, fontWeight: 600, letterSpacing: 1 }}>
        Grade {label}
      </span>
    </div>
  );
}
