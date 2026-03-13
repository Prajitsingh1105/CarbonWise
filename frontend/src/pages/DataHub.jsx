import React, { useState } from 'react';
import { Database, CheckCircle, ArrowRight, Globe, FileText, Zap } from 'lucide-react';

const STANDARDS = [
  {
    name: 'EPA',
    full: 'Environmental Protection Agency',
    region: '🇺🇸 United States',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.10)',
    border: 'rgba(96,165,250,0.30)',
    testCycle: 'FTP-75 + HWFET',
    tempCondition: '20–30°C',
    realWorldAccuracy: '85%',
    covers: ['Passenger cars', 'Light trucks', 'SUVs', 'Vans'],
    strengths: ['Mandatory for US market', 'Includes real-world correction', 'Publicly accessible database'],
    limitations: ['Excludes manufacturing emissions', 'Focuses on tailpipe only'],
  },
  {
    name: 'WLTP',
    full: 'Worldwide Harmonised Light Vehicle Test',
    region: '🇪🇺 Europe + Global',
    color: '#4ade80',
    bg: 'rgba(74,222,128,0.10)',
    border: 'rgba(74,222,128,0.30)',
    testCycle: 'WLTC Class 3',
    tempCondition: '14–23°C',
    realWorldAccuracy: '90%',
    covers: ['All light vehicles', 'EVs', 'PHEVs', 'Hybrids'],
    strengths: ['More realistic than NEDC', 'Higher speed phases', 'Mandatory in EU since 2017'],
    limitations: ['Still lab-based', 'Varies by vehicle options', 'Excludes cold weather EV range'],
  },
  {
    name: 'EEA',
    full: 'European Environment Agency',
    region: '🇪🇺 European Union',
    color: '#c084fc',
    bg: 'rgba(192,132,252,0.10)',
    border: 'rgba(192,132,252,0.30)',
    testCycle: 'Fleet average reporting',
    tempCondition: 'Real-world fleet data',
    realWorldAccuracy: '95%',
    covers: ['Fleet-level reporting', 'CO₂ monitoring', 'New car registrations'],
    strengths: ['Real fleet data', 'Covers full EU market', 'Tracks year-on-year progress'],
    limitations: ['Fleet averages, not per vehicle', 'Reporting lags 1–2 years'],
  },
];

const NORMALIZATION_STEPS = [
  { icon: Database, title: 'Collect Raw Data', desc: 'Pull vehicle specs and emissions from EPA, WLTP, EEA databases and OEM technical sheets.' },
  { icon: Globe, title: 'Unit Standardization', desc: 'Convert all values to kg CO₂-equivalent per year, normalized to 14,600 km (40 km/day baseline).' },
  { icon: FileText, title: 'LCA Framework', desc: 'Apply ISO 14040/14044 lifecycle boundaries: cradle-to-grave including battery production.' },
  { icon: Zap, title: 'Unified Score', desc: 'Generate a 0–100 Carbon Score and A–F grade for every vehicle across all standards.' },
];

const VEHICLE_COMPARISON = [
  { name:'Tesla Model 3', epa: 0, wltp: 0, eea: '—', lcaTotal: 15900, type:'EV' },
  { name:'Toyota Prius', epa: 93, wltp: 101, eea: '~99', lcaTotal: 11420, type:'Hybrid' },
  { name:'Toyota Camry', epa: 158, wltp: 174, eea: '~165', lcaTotal: 47000, type:'ICE' },
  { name:'Ford F-150', epa: 294, wltp: 320, eea: '—', lcaTotal: 75820, type:'ICE' },
];

export default function DataHub() {
  const [activeStandard, setActiveStandard] = useState('EPA');
  const active = STANDARDS.find(s => s.name === activeStandard);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <Database size={14} /> Standardized Carbon Data Hub
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white mb-4">
            One Source of <span className="text-blue-400">Truth</span>
          </h1>
          <p className="text-stone-400 text-lg max-w-2xl mx-auto">
            EPA, WLTP, and EEA data normalized into a single comparable format.
            Eliminating scattered, inconsistent datasets across multiple sources.
          </p>
        </div>

        {/* Standards tabs */}
        <div className="flex gap-3 mb-6 justify-center flex-wrap">
          {STANDARDS.map(s => (
            <button key={s.name} onClick={() => setActiveStandard(s.name)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-105
                ${activeStandard === s.name ? 'scale-105' : 'opacity-60 hover:opacity-100 bg-white/5'}`}
              style={activeStandard === s.name ? {
                background: s.bg, border: `1px solid ${s.border}`, color: s.color
              } : { border: '1px solid rgba(255,255,255,0.08)', color: '#a8a29e' }}>
              {s.name}
            </button>
          ))}
        </div>

        {/* Active standard detail */}
        {active && (
          <div className="glass rounded-2xl p-6 mb-10 transition-all" style={{ border: `1px solid ${active.border}` }}>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black font-display"
                    style={{ background: active.bg, color: active.color, border: `1px solid ${active.border}` }}>
                    {active.name}
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-white text-xl">{active.full}</h2>
                    <p className="text-stone-400 text-sm">{active.region}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label:'Test Cycle', value: active.testCycle },
                    { label:'Temperature', value: active.tempCondition },
                    { label:'Real-World Accuracy', value: active.realWorldAccuracy },
                    { label:'Coverage', value: `${active.covers.length} categories` },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/5 rounded-lg p-3">
                      <div className="text-xs text-stone-500 mb-0.5">{label}</div>
                      <div className="text-sm font-semibold text-white">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-1.5">
                    <CheckCircle size={13} style={{ color: active.color }} /> Covers
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {active.covers.map(c => (
                      <span key={c} className="text-xs px-2 py-1 rounded-lg text-stone-300"
                        style={{ background: active.bg, border: `1px solid ${active.border}` }}>{c}</span>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Strengths</h3>
                  {active.strengths.map(s => (
                    <div key={s} className="flex items-start gap-2 text-xs text-stone-300 mb-1">
                      <span className="text-green-400 mt-0.5">+</span>{s}
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-amber-400 mb-2">⚠ Limitations</h3>
                  {active.limitations.map(l => (
                    <div key={l} className="flex items-start gap-2 text-xs text-stone-400 mb-1">
                      <span className="text-amber-400 mt-0.5">−</span>{l}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cross-standard vehicle table */}
        <div className="glass rounded-2xl p-6 mb-10">
          <h2 className="font-display font-bold text-white text-xl mb-2">
            Cross-Standard Comparison
          </h2>
          <p className="text-stone-400 text-sm mb-5">Tailpipe g CO₂/km across standards — same car, different numbers</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-4 text-stone-400 font-medium">Vehicle</th>
                  <th className="text-center py-3 px-4 text-blue-400 font-medium">EPA (g/km)</th>
                  <th className="text-center py-3 px-4 text-green-400 font-medium">WLTP (g/km)</th>
                  <th className="text-center py-3 px-4 text-purple-400 font-medium">EEA (g/km)</th>
                  <th className="text-right py-3 pl-4 text-stone-400 font-medium">LCA 10yr Total</th>
                </tr>
              </thead>
              <tbody>
                {VEHICLE_COMPARISON.map((v, i) => (
                  <tr key={v.name} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/2' : ''}`}>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <span className={`badge-${v.type} text-xs px-1.5 py-0.5 rounded`}>{v.type}</span>
                        <span className="text-white font-medium">{v.name}</span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4 font-mono text-blue-300">
                      {v.epa === 0 ? <span className="text-green-400">0 ⚡</span> : v.epa}
                    </td>
                    <td className="text-center py-3 px-4 font-mono text-green-300">
                      {v.wltp === 0 ? <span className="text-green-400">0 ⚡</span> : v.wltp}
                    </td>
                    <td className="text-center py-3 px-4 font-mono text-purple-300">{v.eea}</td>
                    <td className="text-right py-3 pl-4 font-mono font-bold text-white">{(v.lcaTotal/1000).toFixed(1)}t CO₂</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-stone-500 mt-3">* EVs show 0 tailpipe but full lifecycle including manufacturing and electricity source emissions are captured in LCA Total.</p>
        </div>

        {/* Normalization process */}
        <div className="glass rounded-2xl p-8">
          <h2 className="font-display font-bold text-white text-xl mb-6 flex items-center gap-2">
            <ArrowRight size={18} className="text-green-400" />
            How We Normalize Data
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {NORMALIZATION_STEPS.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <Icon size={14} className="text-green-400" />
                  </div>
                  <div className="font-mono text-xs text-stone-500">Step {i+1}</div>
                </div>
                <h3 className="font-display font-bold text-white mb-2 text-sm">{title}</h3>
                <p className="text-stone-400 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
