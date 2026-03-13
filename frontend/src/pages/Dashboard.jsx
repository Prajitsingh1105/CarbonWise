import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BarChart3, Star, TrendingUp, ArrowRight, Leaf, ShieldCheck } from 'lucide-react';
import api from '../utils/api';

const FALLBACK_VEHICLES = [
  { _id:'7', name:'Hyundai Ioniq 6', type:'EV', standard:'WLTP', carbonLabelScore:91, emissions:{annualUsage:1650} },
  { _id:'1', name:'Tesla Model 3', type:'EV', standard:'EPA', carbonLabelScore:88, emissions:{annualUsage:1800} },
  { _id:'9', name:'Kia EV6', type:'EV', standard:'WLTP', carbonLabelScore:85, emissions:{annualUsage:1750} },
  { _id:'11', name:'Volkswagen ID.4', type:'EV', standard:'WLTP', carbonLabelScore:83, emissions:{annualUsage:1820} },
  { _id:'5', name:'BMW i4', type:'EV', standard:'WLTP', carbonLabelScore:79, emissions:{annualUsage:1900} },
  { _id:'10', name:'Honda Accord Hybrid', type:'Hybrid', standard:'EPA', carbonLabelScore:74, emissions:{annualUsage:2400} },
];

const FALLBACK_STATS = [
  { label:'Best EV Score', value:'91/100', icon: Leaf, color:'text-green-400' },
  { label:'Hybrid Avg Score', value:'73/100', icon: Star, color:'text-amber-400' },
  { label:'Greenwash Flagged', value:'3', icon: TrendingUp, color:'text-red-400' },
  { label:'Verified Clean', value:'9', icon: ShieldCheck, color:'text-green-400' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState(FALLBACK_VEHICLES);
  const [quickStats, setQuickStats] = useState(FALLBACK_STATS);

  useEffect(() => {
    api.get('/vehicles?sort=score_desc')
      .then(r => { if (r.data?.vehicles?.length) setVehicles(r.data.vehicles.slice(0, 6)); })
      .catch(() => {});

    api.get('/analytics/summary')
      .then(r => {
        const s = r.data;
        if (!s) return;
        setQuickStats([
          { label:'Best EV Score', value:`${s.typeStats.find(t=>t.type==='EV')?.avgScore||91}/100`, icon:Leaf, color:'text-green-400' },
          { label:'Hybrid Avg Score', value:`${s.typeStats.find(t=>t.type==='Hybrid')?.avgScore||73}/100`, icon:Star, color:'text-amber-400' },
          { label:'Greenwash Flagged', value:`${(s.greenwashStats?.high||0)+(s.greenwashStats?.medium||0)}`, icon:TrendingUp, color:'text-red-400' },
          { label:'Verified Clean', value:`${s.greenwashStats?.low||9}`, icon:ShieldCheck, color:'text-green-400' },
        ]);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="pt-8 mb-10">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-display font-black text-4xl text-white mb-2">
                {user ? `Welcome back, ${user.name.split(' ')[0]} 👋` : 'Dashboard'}
              </h1>
              <p className="text-stone-400">Your lifecycle carbon intelligence hub</p>
            </div>
            {!user && (
              <Link to="/login" className="btn-primary flex items-center gap-2">
                Sign In for Full Access
              </Link>
            )}
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickStats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="glass rounded-xl p-5">
              <Icon size={18} className={`${color} mb-3`} />
              <div className={`font-display font-bold text-2xl ${color}`}>{value}</div>
              <div className="text-xs text-stone-400 mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Quick action cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {[
            { to:'/compare', icon:BarChart3, title:'Compare Vehicles', desc:'Select 2–4 vehicles for side-by-side lifecycle analysis', color:'text-green-400', bg:'bg-green-500/10' },
            { to:'/recommend', icon:Star, title:'Get Recommendation', desc:'Enter your driving habits for a personalized green suggestion', color:'text-amber-400', bg:'bg-amber-500/10' },
            { to:'/analytics', icon:TrendingUp, title:'View Analytics', desc:'Fleet-wide insights, greenwashing stats, and type comparisons', color:'text-blue-400', bg:'bg-blue-500/10' },
          ].map(({ to, icon: Icon, title, desc, color, bg }) => (
            <Link key={to} to={to} className="glass rounded-2xl p-6 hover:border-green-500/25 transition-all group block">
              <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon size={20} className={color} />
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-2">{title}</h3>
              <p className="text-stone-400 text-sm leading-relaxed">{desc}</p>
              <div className={`flex items-center gap-1 text-sm mt-4 ${color} group-hover:gap-2 transition-all`}>
                Go <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>

        {/* Top vehicles */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-xl text-white">🏆 Highest Rated Vehicles</h2>
            <Link to="/compare" className="text-sm text-green-400 hover:text-green-300 flex items-center gap-1">
              Compare them <ArrowRight size={13} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehicles.map((v) => (
              <div key={v._id} className="glass rounded-xl p-4 hover:border-green-500/25 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className={`badge-${v.type} text-xs px-2 py-0.5 rounded-full`}>{v.type}</span>
                  <span className="text-stone-500 text-xs font-mono">{v.standard}</span>
                </div>
                <h4 className="font-display font-bold text-white mb-3">{v.name}</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-stone-500 mb-0.5">Carbon Score</div>
                    <div className="font-mono font-bold text-lg" style={{
                      color: v.carbonLabelScore >= 75 ? '#4ade80' : v.carbonLabelScore >= 50 ? '#fbbf24' : '#f87171'
                    }}>
                      {v.carbonLabelScore}/100
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-stone-500 mb-0.5">Annual CO₂</div>
                    <div className="font-mono text-sm text-stone-200">
                      {(v.emissions.annualUsage / 1000).toFixed(1)}t
                    </div>
                  </div>
                </div>
                {/* Score bar */}
                <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${v.carbonLabelScore}%`,
                      background: v.carbonLabelScore >= 75 ? '#4ade80' : v.carbonLabelScore >= 50 ? '#fbbf24' : '#f87171'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
