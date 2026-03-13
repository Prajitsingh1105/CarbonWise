import React, { useEffect, useState } from 'react';
import { ShieldCheck, AlertTriangle, AlertCircle, Info, TrendingDown, Search } from 'lucide-react';
import api from '../utils/api';

const FALLBACK = [
  { _id:'6', name:'Jeep Wrangler', brand:'Jeep', type:'ICE', greenwashingRisk:'High',
    greenwashingFlags:['EcoGreen badge misleading','Actual usage 34% above stated emissions'],
    carbonLabelScore:22, emissions:{manufacturing:8500,batteryProduction:0,annualUsage:7200,disposal:600}, standard:'EPA' },
  { _id:'12', name:'Ram 1500 EcoDiesel', brand:'Ram', type:'ICE', greenwashingRisk:'High',
    greenwashingFlags:['"Eco" naming misleading','Diesel emissions exceed marketing claims by 28%'],
    carbonLabelScore:35, emissions:{manufacturing:9200,batteryProduction:0,annualUsage:5900,disposal:680}, standard:'EPA' },
  { _id:'4', name:'Ford F-150', brand:'Ford', type:'ICE', greenwashingRisk:'Medium',
    greenwashingFlags:['High usage emissions vs advertised efficiency'],
    carbonLabelScore:28, emissions:{manufacturing:9800,batteryProduction:0,annualUsage:6800,disposal:720}, standard:'EPA' },
  { _id:'8', name:'Ford F-150 Lightning', brand:'Ford', type:'EV', greenwashingRisk:'Medium',
    greenwashingFlags:['High battery production emissions not disclosed in ads'],
    carbonLabelScore:63, emissions:{manufacturing:14500,batteryProduction:9800,annualUsage:2800,disposal:780}, standard:'EPA' },
  { _id:'1', name:'Tesla Model 3', brand:'Tesla', type:'EV', greenwashingRisk:'Low',
    greenwashingFlags:[], carbonLabelScore:88,
    emissions:{manufacturing:8800,batteryProduction:5900,annualUsage:1800,disposal:400}, standard:'EPA' },
  { _id:'7', name:'Hyundai Ioniq 6', brand:'Hyundai', type:'EV', greenwashingRisk:'Low',
    greenwashingFlags:[], carbonLabelScore:91,
    emissions:{manufacturing:8200,batteryProduction:5400,annualUsage:1650,disposal:380}, standard:'WLTP' },
  { _id:'3', name:'Toyota Prius', brand:'Toyota', type:'Hybrid', greenwashingRisk:'Low',
    greenwashingFlags:[], carbonLabelScore:71,
    emissions:{manufacturing:7100,batteryProduction:1200,annualUsage:2600,disposal:520}, standard:'EPA' },
  { _id:'9', name:'Kia EV6', brand:'Kia', type:'EV', greenwashingRisk:'Low',
    greenwashingFlags:[], carbonLabelScore:85,
    emissions:{manufacturing:9100,batteryProduction:6200,annualUsage:1750,disposal:400}, standard:'WLTP' },
];

const RISK_CONFIG = {
  High:   { icon: AlertCircle,  color: 'text-red-400',   bg: 'bg-red-500/10',   border: 'border-red-500/30',   label: 'High Risk' },
  Medium: { icon: AlertTriangle,color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', label: 'Medium Risk' },
  Low:    { icon: ShieldCheck,  color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30', label: 'Verified Clean' },
};

const HOW_IT_WORKS = [
  { step:'01', title:'Data Collection', desc:'We gather emissions data from EPA, EEA, WLTP, and OEM technical reports for every vehicle.' },
  { step:'02', title:'Normalization', desc:'All data is converted to a common LCA format — manufacturing, usage, and disposal combined.' },
  { step:'03', title:'Cross-Verification', desc:'Stated marketing claims are compared against verified lifecycle numbers using statistical thresholds.' },
  { step:'04', title:'Flag Generation', desc:'Vehicles exceeding a 15% discrepancy between claimed and verified emissions are automatically flagged.' },
];

export default function Greenwashing() {
  const [vehicles, setVehicles] = useState(FALLBACK);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/vehicles').then(r => { if (r.data?.vehicles?.length) setVehicles(r.data.vehicles); }).catch(() => {});
  }, []);

  const filtered = vehicles.filter(v => {
    const matchRisk = filter === 'All' || v.greenwashingRisk === filter;
    const matchSearch = !search || v.name.toLowerCase().includes(search.toLowerCase());
    return matchRisk && matchSearch;
  });

  const counts = {
    High: vehicles.filter(v => v.greenwashingRisk === 'High').length,
    Medium: vehicles.filter(v => v.greenwashingRisk === 'Medium').length,
    Low: vehicles.filter(v => v.greenwashingRisk === 'Low').length,
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-6">
            <AlertCircle size={14} /> Greenwashing Detection Engine
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white mb-4">
            Cut Through the <span className="text-red-400">Greenwash</span>
          </h1>
          <p className="text-stone-400 text-lg max-w-2xl mx-auto">
            Our engine cross-references marketing claims against verified lifecycle emission data.
            No more "Eco" badges hiding real carbon costs.
          </p>
        </div>

        {/* Risk summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {Object.entries(counts).map(([risk, count]) => {
            const cfg = RISK_CONFIG[risk];
            const Icon = cfg.icon;
            return (
              <button key={risk} onClick={() => setFilter(filter === risk ? 'All' : risk)}
                className={`glass rounded-2xl p-5 text-center transition-all hover:scale-105 ${filter === risk ? `${cfg.bg} ${cfg.border}` : ''}`}>
                <Icon size={28} className={`${cfg.color} mx-auto mb-2`} />
                <div className={`font-display font-black text-3xl ${cfg.color}`}>{count}</div>
                <div className="text-stone-400 text-sm mt-1">{cfg.label}</div>
              </button>
            );
          })}
        </div>

        {/* Search + filter */}
        <div className="glass rounded-xl p-3 mb-6 flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[180px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input className="input-dark w-full pl-9 text-sm" placeholder="Search vehicles..."
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-1">
            {['All','High','Medium','Low'].map(r => (
              <button key={r} onClick={() => setFilter(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${filter === r
                    ? r === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : r === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : r === 'Low' ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-white/10 text-white'
                    : 'text-stone-400 hover:text-white hover:bg-white/5'
                  }`}>
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle list */}
        <div className="space-y-4 mb-16">
          {filtered.map(v => {
            const cfg = RISK_CONFIG[v.greenwashingRisk];
            const Icon = cfg.icon;
            const total10yr = v.emissions.manufacturing + v.emissions.batteryProduction + v.emissions.annualUsage * 10 + v.emissions.disposal;
            return (
              <div key={v._id} className={`glass rounded-2xl p-5 border transition-all hover:scale-[1.01] ${cfg.border}`}>
                <div className="flex items-start gap-4 flex-wrap">
                  {/* Risk badge */}
                  <div className={`w-12 h-12 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0`}>
                    <Icon size={22} className={cfg.color} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-display font-bold text-white text-lg">{v.name}</h3>
                      <span className={`badge-${v.type} text-xs px-2 py-0.5 rounded-full`}>{v.type}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${cfg.bg} ${cfg.color}`}>
                        {cfg.label}
                      </span>
                    </div>

                    {/* Flags */}
                    {v.greenwashingFlags?.length > 0 ? (
                      <div className="space-y-1.5 mt-2">
                        {v.greenwashingFlags.map((flag, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <AlertTriangle size={13} className="text-amber-400 mt-0.5 shrink-0" />
                            <span className="text-amber-200/80">{flag}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-green-400 mt-1">
                        <ShieldCheck size={13} />
                        <span>No misleading claims detected — data verified against EPA/WLTP sources</span>
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex gap-4 text-right shrink-0">
                    <div>
                      <div className="text-xs text-stone-500 mb-0.5">Carbon Score</div>
                      <div className="font-mono font-bold text-lg" style={{
                        color: v.carbonLabelScore >= 75 ? '#4ade80' : v.carbonLabelScore >= 50 ? '#fbbf24' : '#f87171'
                      }}>{v.carbonLabelScore}/100</div>
                    </div>
                    <div>
                      <div className="text-xs text-stone-500 mb-0.5">10yr Total</div>
                      <div className="font-mono font-bold text-lg text-stone-200">{(total10yr/1000).toFixed(0)}t</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* How it works */}
        <div className="glass rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-8">
            <Info size={18} className="text-green-400" />
            <h2 className="font-display font-bold text-xl text-white">How Our Detection Works</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <div className="font-mono text-5xl font-black text-green-500/10 mb-3">{step}</div>
                <h3 className="font-display font-bold text-white mb-2">{title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
