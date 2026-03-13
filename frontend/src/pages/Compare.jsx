import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer, Cell } from 'recharts';
import { Search, SlidersHorizontal, X, BarChart3, AlertTriangle, ShieldCheck } from 'lucide-react';
import api from '../utils/api';
import VehicleCard from '../components/VehicleCard';
import CarbonScoreBadge from '../components/CarbonScoreBadge';

const COLORS = ['#4ade80', '#fbbf24', '#f87171', '#93c5fd', '#c084fc'];
const TYPE_FILTERS = ['All', 'EV', 'Hybrid', 'ICE', 'PHEV'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl p-3 text-xs border border-green-500/20">
      <p className="text-white font-semibold mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>{p.name}: {(p.value/1000).toFixed(1)}t CO₂</p>
      ))}
    </div>
  );
};

export default function Compare() {
  const [vehicles, setVehicles] = useState([]);
  const [selected, setSelected] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [years, setYears] = useState(10);
  const [dailyMileage, setDailyMileage] = useState(40);
  const [activeTab, setActiveTab] = useState('breakdown');

  useEffect(() => {
    api.get('/vehicles').then(r => setVehicles(r.data.vehicles)).catch(console.error);
  }, []);

  const filtered = vehicles.filter(v => {
    const matchType = typeFilter === 'All' || v.type === typeFilter;
    const matchSearch = !search || v.name.toLowerCase().includes(search.toLowerCase()) || v.brand.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const toggleSelect = (v) => {
    if (selected.find(s => s._id === v._id)) {
      setSelected(selected.filter(s => s._id !== v._id));
    } else if (selected.length < 4) {
      setSelected([...selected, v]);
    }
  };

  const handleCompare = async () => {
    if (selected.length < 2) return;
    setLoading(true);
    try {
      const { data } = await api.post('/compare', {
        vehicleIds: selected.map(v => v._id),
        years, dailyMileage
      });
      setResults(data);
      setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const breakdownData = results?.results.map(r => ({
    name: r.vehicle.name.replace(/^(Toyota|Tesla|Ford|BMW|Hyundai|Honda|Kia|Volkswagen|Ram|Jeep)\s/, ''),
    Manufacturing: r.lifecycle.manufacturing,
    Battery: r.lifecycle.battery,
    Usage: r.lifecycle.usage,
    Disposal: r.lifecycle.disposal,
  }));

  const yearlyData = results ? (() => {
    const maxYears = Math.max(...results.results.map(r => r.yearlyData.length));
    return Array.from({ length: maxYears }, (_, i) => {
      const obj = { year: `Y${i+1}` };
      results.results.forEach(r => {
        const shortName = r.vehicle.name.split(' ').slice(-1)[0];
        obj[shortName] = r.yearlyData[i]?.cumulative || 0;
      });
      return obj;
    });
  })() : [];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10 pt-8">
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white mb-3">
            Lifecycle <span className="text-green-400">Carbon Comparison</span>
          </h1>
          <p className="text-stone-400 text-lg">Select 2–4 vehicles for a true apples-to-apples comparison</p>
        </div>

        {/* Filters + Settings */}
        <div className="glass rounded-2xl p-4 mb-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input className="input-dark w-full pl-9 text-sm" placeholder="Search vehicles..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-1">
            {TYPE_FILTERS.map(t => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${typeFilter === t ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'text-stone-400 hover:text-white hover:bg-white/5'}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 ml-auto flex-wrap">
            <label className="flex items-center gap-2 text-sm text-stone-400">
              <SlidersHorizontal size={13} />
              <span>Years:</span>
              <input type="range" min="3" max="20" value={years} onChange={e => setYears(+e.target.value)} className="w-20 accent-green-500" />
              <span className="font-mono text-green-400 w-4">{years}</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-stone-400">
              <span>Daily km:</span>
              <input type="number" min="5" max="300" value={dailyMileage} onChange={e => setDailyMileage(+e.target.value)} className="input-dark w-16 text-sm py-1.5 px-2" />
            </label>
          </div>
        </div>

        {/* Selected bar */}
        {selected.length > 0 && (
          <div className="glass-green rounded-xl p-3 mb-6 flex items-center gap-3 flex-wrap">
            <span className="text-xs text-green-400 font-semibold">Selected ({selected.length}/4):</span>
            {selected.map(v => (
              <div key={v._id} className="flex items-center gap-1.5 bg-green-500/10 rounded-lg px-2 py-1 text-xs text-white">
                <span className={`badge-${v.type} px-1.5 py-0 rounded text-xs`}>{v.type}</span>
                {v.name}
                <button onClick={() => toggleSelect(v)} className="text-stone-400 hover:text-white ml-1"><X size={11} /></button>
              </div>
            ))}
            <button onClick={handleCompare} disabled={selected.length < 2 || loading}
              className="ml-auto btn-primary text-sm py-2 px-5 disabled:opacity-50 flex items-center gap-2">
              {loading ? (
                <><div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />Calculating...</>
              ) : (
                <><BarChart3 size={14} />Compare Now</>
              )}
            </button>
          </div>
        )}

        {/* Vehicle grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12 stagger">
          {filtered.map(v => (
            <VehicleCard key={v._id} vehicle={v} selected={!!selected.find(s => s._id === v._id)} onSelect={toggleSelect} />
          ))}
        </div>

        {/* Results */}
        {results && (
          <div id="results" className="space-y-8 animate-fade-up">
            <h2 className="font-display font-bold text-3xl text-white text-center">
              Comparison Results
              <span className="text-sm font-body font-normal text-stone-400 ml-3">{years} years · {dailyMileage} km/day</span>
            </h2>

            {/* Winner card */}
            <div className="glass-green glow-green rounded-2xl p-6 border border-green-500/30">
              <div className="flex items-start gap-4 flex-wrap">
                <div className="flex-1">
                  <p className="text-green-400 text-sm font-semibold mb-1">🏆 Lowest Lifecycle Carbon</p>
                  <h3 className="font-display font-bold text-2xl text-white">{results.results[0].vehicle.name}</h3>
                  <p className="text-stone-300 text-sm mt-1">
                    Saves <span className="text-green-400 font-bold">{(results.results[0].savingsVsWorst/1000).toFixed(1)}t CO₂</span> vs highest-emission choice over {years} years
                  </p>
                </div>
                <CarbonScoreBadge score={results.results[0].vehicle.carbonLabelScore} size="lg" />
              </div>
            </div>

            {/* Ranked list */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {results.results.map((r, i) => (
                <div key={r.vehicle._id} className={`glass rounded-xl p-4 ${i === 0 ? 'border-green-500/30' : 'border-white/5'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg">{['🥇','🥈','🥉','4️⃣'][i]}</span>
                    <span className={`badge-${r.vehicle.type} text-xs px-2 py-0.5 rounded-full`}>{r.vehicle.type}</span>
                  </div>
                  <h4 className="font-display font-bold text-white text-sm mb-3">{r.vehicle.name}</h4>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between"><span className="text-stone-500">Manufacturing</span><span className="font-mono text-stone-200">{((r.lifecycle.manufacturing + r.lifecycle.battery)/1000).toFixed(1)}t</span></div>
                    <div className="flex justify-between"><span className="text-stone-500">Usage ({years}yr)</span><span className="font-mono text-stone-200">{(r.lifecycle.usage/1000).toFixed(1)}t</span></div>
                    <div className="flex justify-between"><span className="text-stone-500">Disposal</span><span className="font-mono text-stone-200">{(r.lifecycle.disposal/1000).toFixed(1)}t</span></div>
                    <div className="flex justify-between border-t border-white/10 pt-1.5 mt-1.5">
                      <span className="text-white font-semibold">Total</span>
                      <span className={`font-mono font-bold ${i===0?'text-green-400':i===results.results.length-1?'text-red-400':'text-amber-400'}`}>{(r.lifecycle.total/1000).toFixed(1)}t</span>
                    </div>
                  </div>
                  {r.vehicle.greenwashingRisk === 'High' && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-red-400">
                      <AlertTriangle size={11} />⚠ Greenwashing flagged
                    </div>
                  )}
                  {r.vehicle.greenwashingRisk === 'Low' && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-green-400">
                      <ShieldCheck size={11} />Verified clean
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="glass rounded-2xl p-6">
              <div className="flex gap-3 mb-6">
                {['breakdown', 'timeline'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm capitalize transition-all ${activeTab===tab?'bg-green-500/20 text-green-400 border border-green-500/30':'text-stone-400 hover:text-white'}`}>
                    {tab === 'breakdown' ? '📊 Breakdown' : '📈 Timeline'}
                  </button>
                ))}
              </div>

              {activeTab === 'breakdown' && breakdownData && (
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={breakdownData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" tick={{ fill: '#a8a29e', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#a8a29e', fontSize: 11 }} tickFormatter={v => `${(v/1000).toFixed(0)}t`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ color: '#a8a29e', fontSize: 12 }} />
                    <Bar dataKey="Manufacturing" stackId="a" fill="#4ade80" />
                    <Bar dataKey="Battery" stackId="a" fill="#86efac" />
                    <Bar dataKey="Usage" stackId="a" fill="#fbbf24" />
                    <Bar dataKey="Disposal" stackId="a" fill="#f87171" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}

              {activeTab === 'timeline' && yearlyData.length > 0 && (
                <ResponsiveContainer width="100%" height={320}>
                  <LineChart data={yearlyData.filter((_, i) => i % 2 === 0 || i < 5)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="year" tick={{ fill: '#a8a29e', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#a8a29e', fontSize: 11 }} tickFormatter={v => `${(v/1000).toFixed(0)}t`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ color: '#a8a29e', fontSize: 12 }} />
                    {results.results.map((r, i) => (
                      <Line key={r.vehicle._id}
                        type="monotone"
                        dataKey={r.vehicle.name.split(' ').slice(-1)[0]}
                        stroke={COLORS[i]}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
