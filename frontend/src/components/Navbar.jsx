import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, BarChart3, Star, LayoutDashboard, LogIn, LogOut, Menu, X, TrendingUp, Award, ShieldAlert, Database } from 'lucide-react';

const navLinks = [
  { to: '/compare', label: 'Compare', icon: BarChart3 },
  { to: '/recommend', label: 'Recommend', icon: Star },
  { to: '/carbon-label', label: 'Labels', icon: Award },
  { to: '/greenwashing', label: 'Greenwash', icon: ShieldAlert },
  { to: '/data-hub', label: 'Data Hub', icon: Database },
  { to: '/analytics', label: 'Analytics', icon: TrendingUp },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg shadow-black/30' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
              <Leaf size={16} className="text-green-400" />
            </div>
            <span className="font-display font-bold text-lg text-white">Carbon<span className="text-green-400">-Wise</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to}
                className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap
                  ${location.pathname === to ? 'bg-green-500/15 text-green-400 border border-green-500/25' : 'text-stone-400 hover:text-white hover:bg-white/5'}`}>
                <Icon size={13} />{label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3 shrink-0">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-stone-400"><span className="text-green-400 font-medium">{user.name}</span></span>
                <button onClick={() => { logout(); navigate('/'); }} className="btn-ghost text-sm py-1.5 px-3 flex items-center gap-1.5">
                  <LogOut size={13} /> Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary text-sm py-2 px-4 flex items-center gap-1.5">
                <LogIn size={13} /> Sign In
              </Link>
            )}
          </div>

          <button className="md:hidden text-stone-400 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass border-t border-green-500/10 px-4 pb-4 pt-2">
          <div className="grid grid-cols-2 gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to} onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors
                  ${location.pathname === to ? 'bg-green-500/15 text-green-400' : 'text-stone-400 hover:text-white'}`}>
                <Icon size={13} />{label}
              </Link>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-white/5">
            {user ? (
              <button onClick={() => { logout(); navigate('/'); setMobileOpen(false); }}
                className="w-full text-left flex items-center gap-2 px-3 py-2.5 text-sm text-stone-400 hover:text-white">
                <LogOut size={13} /> Logout ({user.name})
              </button>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 text-sm text-green-400">
                <LogIn size={13} /> Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
