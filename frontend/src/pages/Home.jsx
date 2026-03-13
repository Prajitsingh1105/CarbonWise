import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, BarChart2, Zap, TrendingDown, Globe } from 'lucide-react';
import api from '../utils/api';

const STATS = [
  { value: '12+', label: 'Vehicles Analyzed', icon: Zap },
  { value: '3', label: 'Emission Standards', icon: Globe },
  { value: '100%', label: 'Verified Data', icon: ShieldCheck },
  { value: 'LCA', label: 'Full Lifecycle', icon: TrendingDown },
];

const FEATURES = [
  {
    icon: BarChart2,
    title: 'Apples-to-Apples Comparison',
    desc: 'Normalize EPA, EEA, and WLTP data into a single lifecycle score covering manufacturing, usage, and disposal.'
  },
  {
    icon: ShieldCheck,
    title: 'Greenwashing Detection',
    desc: 'Our ML-powered engine flags misleading eco-claims using verified lifecycle emission sources.'
  },
  {
    icon: Zap,
    title: 'Smart Recommendations',
    desc: 'Enter your daily mileage and driving pattern — get the vehicle that\'s truly greenest for your life.'
  },
  {
    icon: TrendingDown,
    title: 'Lifecycle Carbon Intelligence',
    desc: 'See manufacturing, battery production, usage, and end-of-life emissions in one unified carbon score.'
  },
];

export default function Home() {
  const [topVehicles, setTopVehicles] = useState([]);

  useEffect(() => {
    api.get('/vehicles?sort=score_desc').then(r => setTopVehicles(r.data.vehicles.slice(0, 3))).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(22,101,52,0.3) 0%, transparent 70%)',
        }} />
        {/* Grid */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(34,197,94,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center stagger pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-green text-green-400 text-sm font-medium mb-8">
            <Leaf size={14} className="animate-float" />
            Lifecycle Carbon Intelligence Platform
          </div>

          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white leading-none mb-6">
            Know Your Car's
            <br />
            <span className="text-green-400 glow-text">True Carbon Cost</span>
          </h1>

          <p className="text-lg sm:text-xl text-stone-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Carbon data is scattered across EPA, WLTP, and EEA standards. We unify it into one honest 
            lifecycle score — from factory to scrapyard — with zero greenwashing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/compare" className="btn-primary text-base flex items-center justify-center gap-2 group">
              Compare Vehicles
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/recommend" className="btn-ghost text-base flex items-center justify-center gap-2">
              Get My Recommendation
            </Link>
          </div>

          {/* Demo credentials */}
          <p className="mt-8 text-xs text-stone-500">
            Demo login: <span className="font-mono text-green-500/70">demo@carbonwise.com</span> / <span className="font-mono text-green-500/70">demo123</span>
          </p>
        </div>

        {/* Floating cards preview */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 opacity-60 pointer-events-none">
          {['EV', 'Hybrid', 'ICE'].map((type, i) => (
            <div key={type} className="glass rounded-xl px-4 py-2 flex items-center gap-2 text-xs"
              style={{ animationDelay: `${i * 0.3}s`, animation: 'float 3s ease-in-out infinite' }}>
              <span className={`badge-${type} px-2 py-0.5 rounded-full text-xs`}>{type}</span>
              <span className="text-stone-300">Carbon Score</span>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-green-500/10 bg-black/20">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 stagger">
          {STATS.map(({ value, label, icon: Icon }) => (
            <div key={label} className="text-center">
              <div className="w-10 h-10 rounded-xl glass-green flex items-center justify-center mx-auto mb-3">
                <Icon size={18} className="text-green-400" />
              </div>
              <div className="font-display font-bold text-3xl text-white">{value}</div>
              <div className="text-sm text-stone-400 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl text-white mb-4">
            Built for Transparency
          </h2>
          <p className="text-stone-400 text-lg max-w-xl mx-auto">
            Every comparison backed by real lifecycle data. No marketing. No shortcuts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 stagger">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass rounded-2xl p-6 hover:border-green-500/30 transition-colors group">
              <div className="w-11 h-11 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                <Icon size={20} className="text-green-400" />
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-2">{title}</h3>
              <p className="text-stone-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Green Vehicles */}
      {topVehicles.length > 0 && (
        <section className="py-16 border-t border-green-500/10 bg-green-950/5">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-display font-bold text-2xl text-white mb-8 text-center">
              🏆 Greenest Vehicles Right Now
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {topVehicles.map((v, i) => (
                <div key={v._id} className="glass rounded-xl p-4 border-green-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
                    <span className={`badge-${v.type} text-xs px-2 py-0.5 rounded-full`}>{v.type}</span>
                  </div>
                  <h3 className="font-display font-bold text-white">{v.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-stone-400">Carbon Score</span>
                    <span className="font-mono font-bold text-green-400">{v.carbonLabelScore}/100</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/compare" className="btn-primary inline-flex items-center gap-2">
                Start Comparing <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Leaf size={16} className="text-green-400" />
          <span className="font-display font-bold text-white">Carbon<span className="text-green-400">-Wise</span></span>
        </div>
        <p className="text-stone-500 text-sm">Team Code Quients · Built for a greener tomorrow</p>
        <p className="text-stone-600 text-xs mt-2">Data sourced from EPA, EEA, and OEM lifecycle reports</p>
      </footer>
    </div>
  );
}
