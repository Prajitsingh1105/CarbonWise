import React from 'react';
import { ShieldCheck, AlertTriangle, AlertCircle } from 'lucide-react';
import CarbonScoreBadge from './CarbonScoreBadge';

const typeColors = { EV: 'badge-EV', Hybrid: 'badge-Hybrid', ICE: 'badge-ICE', PHEV: 'badge-PHEV' };
const riskIcon = { Low: ShieldCheck, Medium: AlertTriangle, High: AlertCircle };
const riskColors = { Low: 'text-green-400', Medium: 'text-amber-400', High: 'text-red-400' };

export default function VehicleCard({ vehicle, selected, onSelect, onCompare, showCompare }) {
  const RiskIcon = riskIcon[vehicle.greenwashingRisk];

  return (
    <div
      className={`relative rounded-2xl p-5 cursor-pointer transition-all duration-200 group
        ${selected
          ? 'glass-green glow-green border-green-500/40'
          : 'glass hover:border-green-500/30 hover:bg-green-950/20'
        }`}
      onClick={() => onSelect && onSelect(vehicle)}
    >
      {selected && (
        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${typeColors[vehicle.type]}`}>
              {vehicle.type}
            </span>
            <span className="text-xs text-stone-500">{vehicle.year}</span>
          </div>
          <h3 className="font-display font-bold text-white text-base leading-tight">{vehicle.name}</h3>
          <p className="text-xs text-stone-400 mt-0.5">{vehicle.segment}</p>
        </div>
        <div className="ml-3 shrink-0">
          <CarbonScoreBadge score={vehicle.carbonLabelScore} size="sm" />
        </div>
      </div>

      {/* Emissions preview */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-white/5 rounded-lg p-2">
          <p className="text-xs text-stone-500">Manufacturing</p>
          <p className="text-sm font-mono font-medium text-stone-200">
            {((vehicle.emissions.manufacturing + vehicle.emissions.batteryProduction) / 1000).toFixed(1)}t CO₂
          </p>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <p className="text-xs text-stone-500">Annual Use</p>
          <p className="text-sm font-mono font-medium text-stone-200">
            {(vehicle.emissions.annualUsage / 1000).toFixed(1)}t CO₂/yr
          </p>
        </div>
      </div>

      {/* Greenwashing risk */}
      <div className={`flex items-center gap-1.5 text-xs ${riskColors[vehicle.greenwashingRisk]}`}>
        <RiskIcon size={12} />
        <span>Greenwashing Risk: <strong>{vehicle.greenwashingRisk}</strong></span>
        {vehicle.standard && <span className="ml-auto text-stone-500 font-mono">{vehicle.standard}</span>}
      </div>

      {vehicle.greenwashingFlags?.length > 0 && (
        <div className="mt-2 space-y-1">
          {vehicle.greenwashingFlags.map((flag, i) => (
            <div key={i} className="text-xs text-amber-400/80 bg-amber-500/5 rounded px-2 py-1 border border-amber-500/10">
              ⚠ {flag}
            </div>
          ))}
        </div>
      )}

      {showCompare && (
        <button
          onClick={(e) => { e.stopPropagation(); onCompare(vehicle); }}
          className="mt-3 w-full btn-ghost text-xs py-1.5"
        >
          Quick Compare
        </button>
      )}
    </div>
  );
}
