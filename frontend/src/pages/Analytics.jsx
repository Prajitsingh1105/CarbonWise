import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Cell, PieChart, Pie, Legend } from 'recharts';
import { TrendingDown, ShieldCheck, AlertTriangle, AlertCircle } from 'lucide-react';
import api from '../utils/api';

const PIE_COLORS = { Low: '#4ade80', Medium: '#fbbf24', High: '#f87171' };
const TYPE_COLORS = { EV: '#4ade80', Hybrid: '#fbbf24', ICE: '#f87171', PHEV: '#93c5fd' };

const CustomTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl p-3 text-xs border border-green-500/20 max-w-[180px]">
      <p className="text-white font-semibold mb-1 truncate">{label}</p>
      {payload.map((p,i) => <p key={i} style={{color:p.color}}>{p.name}: {typeof p.value === 'number' && p.value > 100 ? `${(p.value/1000).toFixed(1)}t` : p.value}</p>)}
    </div>
  );
};

export default function Analytics() {
  const [summary, setSummary] = useState(null);
  const [breakdown, setBreakdown] = useState([]);

  useEffect(() => {
    api.get('/analytics/summary').then(r => setSummary(r.data)).catch(console.error);
    api.get('/analytics/emissions-breakdown').then(r => setBreakdown(r.data)).catch(console.error);
  }, []);

  const greenwashPie = summary ? [
    { name: 'Low Risk', value: summary.greenwashStats.low, color: '#4ade80' },
    { name: 'Medium Risk', value: summary.greenwashStats.medium, color: '#fbbf24' },
    { name: 'High Risk', value: summary.greenwashStats.high, color: '#f87171' },
  ] : [];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10 pt-8">
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white mb-3">
            Emissions <span className="text-green-400">Analytics</span>
          </h1>
          <p className="text-stone-400 text-lg">Fleet-wide insights across all vehicle types and standards</p>
        </div>

        {summary && (
          <>
            {/* KPI Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 stagger">
              {summary.typeStats.map(t => (
                <div key={t.type} className="glass rounded-xl p-4 hover:border-green-500/20 transition-colors">
                  <span className={`badge-${t.type} text-xs px-2 py-0.5 rounded-full`}>{t.type}</span>
                  <div className="mt-3 mb-1 font-display font-bold text-2xl" style={{color: TYPE_COLORS[t.type]}}>{t.avgScore}</div>
                  <div className="text-xs text-stone-400">Avg Carbon Score</div>
                  <div className="text-xs text-stone-500 mt-1">{t.count} vehicle{t.count>1?'s':''} · {(t.avg10yr/1000).toFixed(0)}t avg 10yr</div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* By type average */}
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display font-bold text-white text-lg mb-4">Avg 10-Year Lifecycle by Type</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={summary.typeStats} margin={{left:-10}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="type" tick={{fill:'#a8a29e',fontSize:11}} />
                    <YAxis tick={{fill:'#a8a29e',fontSize:11}} tickFormatter={v=>`${(v/1000).toFixed(0)}t`} />
                    <Tooltip content={<CustomTip />} />
                    <Bar dataKey="avg10yr" name="10yr CO₂" radius={[6,6,0,0]}>
                      {summary.typeStats.map(t => <Cell key={t.type} fill={TYPE_COLORS[t.type]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Greenwashing pie */}
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display font-bold text-white text-lg mb-4">Greenwashing Risk Distribution</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={greenwashPie} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                      {greenwashPie.map((e,i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip content={<CustomTip />} />
                    <Legend wrapperStyle={{fontSize:12,color:'#a8a29e'}} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex gap-4 justify-center mt-2">
                  {[
                    { risk: 'Low', count: summary.greenwashStats.low, icon: ShieldCheck, color: 'text-green-400' },
                    { risk: 'Medium', count: summary.greenwashStats.medium, icon: AlertTriangle, color: 'text-amber-400' },
                    { risk: 'High', count: summary.greenwashStats.high, icon: AlertCircle, color: 'text-red-400' },
                  ].map(({risk,count,icon:Icon,color}) => (
                    <div key={risk} className={`flex items-center gap-1.5 text-sm ${color}`}>
                      <Icon size={13} /> {count} {risk}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top green */}
            <div className="glass rounded-2xl p-6 mb-8">
              <h3 className="font-display font-bold text-white text-lg mb-4 flex items-center gap-2">
                <TrendingDown size={18} className="text-green-400" /> Top 3 Greenest Vehicles
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {summary.topGreen.map((v,i) => (
                  <div key={v.name} className="bg-green-500/5 border border-green-500/15 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{['🥇','🥈','🥉'][i]}</span>
                      <span className={`badge-${v.type} text-xs px-2 py-0.5 rounded-full`}>{v.type}</span>
                    </div>
                    <div className="font-display font-bold text-white">{v.name}</div>
                    <div className="text-green-400 font-mono font-bold text-lg mt-1">{v.score}/100</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Full breakdown chart */}
        {breakdown.length > 0 && (
          <div className="glass rounded-2xl p-6">
            <h3 className="font-display font-bold text-white text-lg mb-4">All Vehicles — 10-Year Lifecycle Breakdown</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={breakdown.map(v=>({
                ...v,
                name: v.name.replace(/^(Toyota|Tesla|Ford|BMW|Hyundai|Honda|Kia|VW|Volkswagen|Ram|Jeep)\s/,'')
              }))} margin={{left:-5, bottom:60}}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{fill:'#a8a29e',fontSize:10}} angle={-40} textAnchor="end" interval={0} />
                <YAxis tick={{fill:'#a8a29e',fontSize:11}} tickFormatter={v=>`${(v/1000).toFixed(0)}t`} />
                <Tooltip content={<CustomTip />} />
                <Legend wrapperStyle={{color:'#a8a29e',fontSize:11}} />
                <Bar dataKey="manufacturing" name="Manufacturing" stackId="a" fill="#4ade80" />
                <Bar dataKey="battery" name="Battery" stackId="a" fill="#86efac" />
                <Bar dataKey="usage10yr" name="Usage 10yr" stackId="a" fill="#fbbf24" />
                <Bar dataKey="disposal" name="Disposal" stackId="a" fill="#f87171" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
