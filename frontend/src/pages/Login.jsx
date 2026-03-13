import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      if (mode === 'login') await login(form.email, form.password);
      else await register(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => setForm({ ...form, email: 'demo@carbonwise.com', password: 'demo123' });

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 px-4">
      <div className="absolute inset-0" style={{background:'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(22,101,52,0.12) 0%, transparent 70%)'}} />

      <div className="relative w-full max-w-md glass rounded-3xl p-8 glow-green">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
            <Leaf size={22} className="text-green-400 animate-float" />
          </div>
          <h1 className="font-display font-bold text-3xl text-white mb-1">
            Carbon<span className="text-green-400">-Wise</span>
          </h1>
          <p className="text-stone-400 text-sm">Lifecycle Carbon Intelligence</p>
        </div>

        {/* Mode toggle */}
        <div className="flex rounded-xl bg-white/5 p-1 mb-6">
          {['login','register'].map(m => (
            <button key={m} onClick={() => setMode(m)} className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all ${mode===m?'bg-green-500/20 text-green-400':'text-stone-400'}`}>
              {m === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-xs text-stone-400 mb-1.5 block">Full Name</label>
              <input className="input-dark w-full" placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            </div>
          )}
          <div>
            <label className="text-xs text-stone-400 mb-1.5 block">Email</label>
            <input className="input-dark w-full" type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
          </div>
          <div>
            <label className="text-xs text-stone-400 mb-1.5 block">Password</label>
            <div className="relative">
              <input className="input-dark w-full pr-10" type={showPass?'text':'password'} placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white">
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && <div className="text-red-400 text-sm bg-red-500/10 rounded-lg px-3 py-2 border border-red-500/20">{error}</div>}

          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base flex items-center justify-center gap-2">
            {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Loading...</> : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-white/10">
          <button onClick={fillDemo} className="w-full btn-ghost text-sm py-2.5 text-center">
            🎯 Use Demo Account
          </button>
          <p className="text-center text-xs text-stone-500 mt-2 font-mono">demo@carbonwise.com / demo123</p>
        </div>

        <p className="text-center text-xs text-stone-500 mt-4">
          <Link to="/" className="text-green-400/70 hover:text-green-400">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}
