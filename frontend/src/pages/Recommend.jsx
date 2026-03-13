import React, { useState } from 'react';
import { MapPin, Clock, Car, ArrowRight, Leaf, ShieldCheck, AlertTriangle } from 'lucide-react';
import api from '../utils/api';
import CarbonScoreBadge from '../components/CarbonScoreBadge';

const PATTERNS = ['City', 'Highway', 'Mixed'];

export default function Recommend() {
  const [form, setForm] = useState({ dailyMileage: 40, yearsOfUse: 8, drivingPattern: 'Mixed' });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await api.post('/recommend', form);
      setResults(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = (s) => s >= 75 ? 'text-green-400' : s >= 50 ? 'text-amber-400' : 'text-red-400';

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4">

        <div className="text-center mb-10 pt-8">
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white mb-3">
            Smart <span className="text-green-400">Recommendation</span>
          </h1>
          <p className="text-stone-400 text-lg">Tell us how you drive. We'll find your greenest match.</p>
        </div>

        {/* Form */}
        <div className="glass rounded-2xl p-8 mb-8 stagger">
          <div className="grid sm:grid-cols-3 gap-6">
            {/* Daily mileage */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                <MapPin size={14} className="text-green-400" /> Daily Distance (km)
              </label>
              <div className="space-y-3">
                <input type="range" min="5" max="300" step="5" value={form.dailyMileage}
                  onChange={e => setForm({ ...form, dailyMileage: +e.target.value })}
                  className="w-full accent-green-500" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500">5 km</span>
                  <span className="font-mono font-bold text-2xl text-green-400">{form.dailyMileage}</span>
                  <span className="text-xs text-stone-500">300 km</span>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-1">
                {[20,40,80,120,200].map(v => (
                  <button key={v} onClick={() => setForm({...form, dailyMileage: v})}
                    className={`text-xs py-1 rounded transition-all ${form.dailyMileage===v?'bg-green-500/20 text-green-400':'text-stone-500 hover:text-white'}`}>
                    {v}km
                  </button>
                ))}
              </div>
            </div>

            {/* Years of use */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                <Clock size={14} className="text-green-400" /> Years of Ownership
              </label>
              <div className="space-y-3">
                <input type="range" min="1" max="20" value={form.yearsOfUse}
                  onChange={e => setForm({ ...form, yearsOfUse: +e.target.value })}
                  className="w-full accent-green-500" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500">1 yr</span>
                  <span className="font-mono font-bold text-2xl text-green-400">{form.yearsOfUse}</span>
                  <span className="text-xs text-stone-500">20 yr</span>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-4 gap-1">
                {[3, 5, 8, 12].map(v => (
                  <button key={v} onClick={() => setForm({...form, yearsOfUse: v})}
                    className={`text-xs py-1 rounded transition-all ${form.yearsOfUse===v?'bg-green-500/20 text-green-400':'text-stone-500 hover:text-white'}`}>
                    {v}yr
                  </button>
                ))}
              </div>
            </div>

            {/* Pattern */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                <Car size={14} className="text-green-400" /> Driving Pattern
              </label>
              <div className="space-y-2">
                {PATTERNS.map(p => (
                  <button key={p} onClick={() => setForm({...form, drivingPattern: p})}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${
                      form.drivingPattern === p
                        ? 'glass-green text-green-400 border border-green-500/40'
                        : 'bg-white/5 text-stone-300 hover:bg-white/10'
                    }`}>
                    <span className="font-semibold">{p}</span>
                    <span className="text-xs text-stone-400 ml-2">
                      {p==='City'?'Stop-start, <50km/h':p==='Highway'?'Long distances, 80+ km/h':'Daily mix of both'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button onClick={handleSubmit} disabled={loading} className="btn-primary text-base px-8 py-3 flex items-center gap-2 mx-auto">
              {loading
                ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Analyzing...</>
                : <><Leaf size={16} />Find My Green Match<ArrowRight size={16} /></>
              }
            </button>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-4 stagger">
            <h2 className="font-display font-bold text-2xl text-white text-center mb-6">
              Your Top Matches
              <span className="text-sm font-body font-normal text-stone-400 ml-3">
                {results.inputs.dailyMileage}km/day · {results.inputs.yearsOfUse} years · {results.inputs.drivingPattern}
              </span>
            </h2>

            {results.recommendations.map((r, i) => (
              <div key={r.vehicle._id}
                className={`glass rounded-2xl p-5 transition-all hover:border-green-500/30
                  ${i === 0 ? 'glass-green glow-green border-green-500/30' : ''}`}>
                <div className="flex items-start gap-4 flex-wrap">
                  <div className="text-3xl">{['🥇','🥈','🥉','4️⃣','5️⃣'][i]}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-display font-bold text-white text-lg">{r.vehicle.name}</h3>
                      <span className={`badge-${r.vehicle.type} text-xs px-2 py-0.5 rounded-full`}>{r.vehicle.type}</span>
                      {r.vehicle.greenwashingRisk === 'Low'
                        ? <span className="text-green-400 flex items-center gap-1 text-xs"><ShieldCheck size={11} />Verified</span>
                        : <span className="text-amber-400 flex items-center gap-1 text-xs"><AlertTriangle size={11} />Check claims</span>
                      }
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm mb-3">
                      <span className="text-stone-400">
                        Total carbon: <span className="font-mono font-bold text-stone-200">{(r.totalCarbon/1000).toFixed(1)}t CO₂</span>
                      </span>
                      <span className="text-stone-400">
                        Per day: <span className="font-mono font-bold text-stone-200">{r.co2PerDay} kg CO₂</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {r.reasons.map((reason, ri) => (
                        <span key={ri} className="text-xs bg-green-500/8 border border-green-500/15 text-green-300/80 px-2 py-1 rounded-lg">
                          ✓ {reason}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="shrink-0">
                    <CarbonScoreBadge score={r.vehicle.carbonLabelScore} size="md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
