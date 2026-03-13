import React, { useEffect, useState } from 'react';
import { Download, Leaf, Award, Info } from 'lucide-react';
import api from '../utils/api';

const FALLBACK = [
  { _id:'7', name:'Hyundai Ioniq 6', brand:'Hyundai', type:'EV', carbonLabelScore:91, standard:'WLTP', emissions:{manufacturing:8200,batteryProduction:5400,annualUsage:1650,disposal:380}, greenwashingRisk:'Low' },
  { _id:'1', name:'Tesla Model 3', brand:'Tesla', type:'EV', carbonLabelScore:88, standard:'EPA', emissions:{manufacturing:8800,batteryProduction:5900,annualUsage:1800,disposal:400}, greenwashingRisk:'Low' },
  { _id:'9', name:'Kia EV6', brand:'Kia', type:'EV', carbonLabelScore:85, standard:'WLTP', emissions:{manufacturing:9100,batteryProduction:6200,annualUsage:1750,disposal:400}, greenwashingRisk:'Low' },
  { _id:'11', name:'Volkswagen ID.4', brand:'Volkswagen', type:'EV', carbonLabelScore:83, standard:'WLTP', emissions:{manufacturing:9600,batteryProduction:6500,annualUsage:1820,disposal:420}, greenwashingRisk:'Low' },
  { _id:'5', name:'BMW i4', brand:'BMW', type:'EV', carbonLabelScore:79, standard:'WLTP', emissions:{manufacturing:11200,batteryProduction:7100,annualUsage:1900,disposal:450}, greenwashingRisk:'Low' },
  { _id:'10', name:'Honda Accord Hybrid', brand:'Honda', type:'Hybrid', carbonLabelScore:74, standard:'EPA', emissions:{manufacturing:7300,batteryProduction:900,annualUsage:2400,disposal:490}, greenwashingRisk:'Low' },
  { _id:'3', name:'Toyota Prius', brand:'Toyota', type:'Hybrid', carbonLabelScore:71, standard:'EPA', emissions:{manufacturing:7100,batteryProduction:1200,annualUsage:2600,disposal:520}, greenwashingRisk:'Low' },
  { _id:'8', name:'Ford F-150 Lightning', brand:'Ford', type:'EV', carbonLabelScore:63, standard:'EPA', emissions:{manufacturing:14500,batteryProduction:9800,annualUsage:2800,disposal:780}, greenwashingRisk:'Medium' },
  { _id:'2', name:'Toyota Camry', brand:'Toyota', type:'ICE', carbonLabelScore:52, standard:'EPA', emissions:{manufacturing:6200,batteryProduction:0,annualUsage:4100,disposal:500}, greenwashingRisk:'Low' },
  { _id:'12', name:'Ram 1500 EcoDiesel', brand:'Ram', type:'ICE', carbonLabelScore:35, standard:'EPA', emissions:{manufacturing:9200,batteryProduction:0,annualUsage:5900,disposal:680}, greenwashingRisk:'High' },
  { _id:'4', name:'Ford F-150', brand:'Ford', type:'ICE', carbonLabelScore:28, standard:'EPA', emissions:{manufacturing:9800,batteryProduction:0,annualUsage:6800,disposal:720}, greenwashingRisk:'Medium' },
  { _id:'6', name:'Jeep Wrangler', brand:'Jeep', type:'ICE', carbonLabelScore:22, standard:'EPA', emissions:{manufacturing:8500,batteryProduction:0,annualUsage:7200,disposal:600}, greenwashingRisk:'High' },
];

const GRADE_CONFIG = {
  A: { min:80, color:'#4ade80', bg:'rgba(74,222,128,0.12)', border:'rgba(74,222,128,0.35)', label:'Exceptional', desc:'Lowest lifecycle emissions. Best-in-class green choice.' },
  B: { min:65, color:'#86efac', bg:'rgba(134,239,172,0.10)', border:'rgba(134,239,172,0.3)', label:'Good', desc:'Well below average emissions. Strong green credentials.' },
  C: { min:50, color:'#fbbf24', bg:'rgba(251,191,36,0.10)', border:'rgba(251,191,36,0.3)', label:'Average', desc:'Moderate lifecycle emissions. Room for improvement.' },
  D: { min:30, color:'#fb923c', bg:'rgba(251,146,60,0.10)', border:'rgba(251,146,60,0.3)', label:'Below Average', desc:'Higher than average emissions. Consider alternatives.' },
  F: { min:0,  color:'#f87171', bg:'rgba(248,113,113,0.10)', border:'rgba(248,113,113,0.3)', label:'Poor', desc:'High lifecycle carbon. Significant environmental impact.' },
};

function getGrade(score) {
  if (score >= 80) return 'A';
  if (score >= 65) return 'B';
  if (score >= 50) return 'C';
  if (score >= 30) return 'D';
  return 'F';
}

function CarbonLabelCard({ vehicle }) {
  const grade = getGrade(vehicle.carbonLabelScore);
  const cfg = GRADE_CONFIG[grade];
  const total10yr = vehicle.emissions.manufacturing + vehicle.emissions.batteryProduction + vehicle.emissions.annualUsage * 10 + vehicle.emissions.disposal;
  const treesEquiv = Math.round(total10yr / 21); // avg tree absorbs ~21kg CO2/yr

  const handleDownload = () => {
    const content = `
CARBON-WISE — OFFICIAL CARBON LABEL
=====================================
Vehicle: ${vehicle.name}
Type: ${vehicle.type}
Standard: ${vehicle.standard}
Carbon Grade: ${grade} (${cfg.label})
Carbon Score: ${vehicle.carbonLabelScore}/100

LIFECYCLE EMISSIONS (10 Years)
--------------------------------
Manufacturing:  ${((vehicle.emissions.manufacturing + vehicle.emissions.batteryProduction)/1000).toFixed(1)}t CO₂
Usage (10yr):   ${(vehicle.emissions.annualUsage * 10 / 1000).toFixed(1)}t CO₂
Disposal:       ${(vehicle.emissions.disposal/1000).toFixed(1)}t CO₂
TOTAL:          ${(total10yr/1000).toFixed(1)}t CO₂

Annual Usage:   ${(vehicle.emissions.annualUsage/1000).toFixed(1)}t CO₂/year
Tree Equivalent: ${treesEquiv} trees needed to offset 10yr emissions

Greenwashing Risk: ${vehicle.greenwashingRisk}
Data Source: ${vehicle.standard}

Generated by Carbon-Wise | Team Code Quients
    `.trim();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `carbon-label-${vehicle.name.replace(/\s+/g,'-').toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-200 group"
      style={{ border: `1px solid ${cfg.border}` }}>

      {/* Grade header */}
      <div className="p-4 flex items-center justify-between" style={{ background: cfg.bg }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`badge-${vehicle.type} text-xs px-2 py-0.5 rounded-full`}>{vehicle.type}</span>
            <span className="text-xs text-stone-400 font-mono">{vehicle.standard}</span>
          </div>
          <h3 className="font-display font-bold text-white">{vehicle.name}</h3>
        </div>
        {/* Big grade circle */}
        <div className="w-16 h-16 rounded-full flex flex-col items-center justify-center shrink-0"
          style={{ background: cfg.bg, border: `2px solid ${cfg.color}`, boxShadow: `0 0 20px ${cfg.color}30` }}>
          <span className="font-display font-black text-2xl leading-none" style={{ color: cfg.color }}>{grade}</span>
          <span className="text-xs" style={{ color: cfg.color }}>Grade</span>
        </div>
      </div>

      {/* Score bar */}
      <div className="px-4 py-3 border-b border-white/5">
        <div className="flex justify-between text-xs text-stone-400 mb-1.5">
          <span>Carbon Score</span>
          <span className="font-mono font-bold" style={{ color: cfg.color }}>{vehicle.carbonLabelScore}/100</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${vehicle.carbonLabelScore}%`, background: cfg.color, boxShadow: `0 0 8px ${cfg.color}60` }} />
        </div>
        <p className="text-xs text-stone-500 mt-1.5 italic">{cfg.desc}</p>
      </div>

      {/* Emissions breakdown */}
      <div className="px-4 py-3 space-y-1.5">
        {[
          { label: 'Manufacturing + Battery', value: (vehicle.emissions.manufacturing + vehicle.emissions.batteryProduction)/1000 },
          { label: 'Annual Usage', value: vehicle.emissions.annualUsage/1000 },
          { label: '10-Year Total', value: total10yr/1000, bold: true },
        ].map(({ label, value, bold }) => (
          <div key={label} className={`flex justify-between text-xs ${bold ? 'border-t border-white/10 pt-1.5 mt-1' : ''}`}>
            <span className={bold ? 'text-white font-semibold' : 'text-stone-400'}>{label}</span>
            <span className={`font-mono ${bold ? 'font-bold text-sm' : ''}`} style={{ color: bold ? cfg.color : '#d6d3d1' }}>
              {value.toFixed(1)}t CO₂{label.includes('Annual') ? '/yr' : ''}
            </span>
          </div>
        ))}
      </div>

      {/* Tree equivalent */}
      <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-stone-400">
          <Leaf size={12} className="text-green-400" />
          <span>Needs <span className="text-white font-semibold">{treesEquiv} trees</span> to offset 10yr emissions</span>
        </div>
        <button onClick={handleDownload}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 transition-colors">
          <Download size={11} /> Label
        </button>
      </div>
    </div>
  );
}

export default function CarbonLabel() {
  const [vehicles, setVehicles] = useState(FALLBACK);
  const [sortBy, setSortBy] = useState('score_desc');
  const [filterGrade, setFilterGrade] = useState('All');

  useEffect(() => {
    api.get('/vehicles').then(r => { if (r.data?.vehicles?.length) setVehicles(r.data.vehicles); }).catch(() => {});
  }, []);

  const sorted = [...vehicles]
    .filter(v => filterGrade === 'All' || getGrade(v.carbonLabelScore) === filterGrade)
    .sort((a, b) => sortBy === 'score_desc' ? b.carbonLabelScore - a.carbonLabelScore : a.carbonLabelScore - b.carbonLabelScore);

  const gradeCounts = Object.keys(GRADE_CONFIG).reduce((acc, g) => {
    acc[g] = vehicles.filter(v => getGrade(v.carbonLabelScore) === g).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
            <Award size={14} /> Carbon Label Rating System
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white mb-4">
            Official <span className="text-green-400">Carbon Labels</span>
          </h1>
          <p className="text-stone-400 text-lg max-w-2xl mx-auto">
            Every vehicle rated A–F based on true lifecycle emissions. Download any label for your research or comparison.
          </p>
        </div>

        {/* Grade legend */}
        <div className="flex gap-2 flex-wrap justify-center mb-8">
          {Object.entries(GRADE_CONFIG).map(([grade, cfg]) => (
            <button key={grade} onClick={() => setFilterGrade(filterGrade === grade ? 'All' : grade)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105
                ${filterGrade === grade ? 'scale-105' : 'opacity-70 hover:opacity-100'}`}
              style={{
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                color: cfg.color
              }}>
              <span className="font-display font-black text-lg w-5 text-center">{grade}</span>
              <span>{cfg.label}</span>
              <span className="ml-1 bg-white/10 rounded-full w-5 h-5 flex items-center justify-center text-xs text-white">
                {gradeCounts[grade] || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <p className="text-stone-400 text-sm">{sorted.length} vehicles</p>
          <div className="flex gap-2">
            {[['score_desc','Best First'],['score_asc','Worst First']].map(([val,label]) => (
              <button key={val} onClick={() => setSortBy(val)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all ${sortBy===val?'bg-green-500/20 text-green-400 border border-green-500/30':'text-stone-400 hover:text-white bg-white/5'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
          {sorted.map(v => <CarbonLabelCard key={v._id} vehicle={v} />)}
        </div>

        {/* Info box */}
        <div className="glass rounded-2xl p-6 mt-10 flex gap-4">
          <Info size={20} className="text-green-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-display font-bold text-white mb-2">How Carbon Labels Are Calculated</h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              Each label is based on a unified lifecycle score combining manufacturing emissions (including battery production for EVs),
              usage emissions normalized to 14,600 km/year (40 km/day), and end-of-life disposal.
              Data is sourced from EPA, WLTP, and EEA standards, then normalized into a comparable 0–100 score.
              Grades: <span className="text-green-400 font-semibold">A (80–100)</span> · <span className="text-green-300 font-semibold">B (65–79)</span> · <span className="text-amber-400 font-semibold">C (50–64)</span> · <span className="text-orange-400 font-semibold">D (30–49)</span> · <span className="text-red-400 font-semibold">F (0–29)</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
