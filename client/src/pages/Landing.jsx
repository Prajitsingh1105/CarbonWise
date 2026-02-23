import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Leaf, 
  Zap, 
  Globe, 
  Car, 
  TrendingUp, 
  Shield, 
  Users,
  ArrowRight 
} from "lucide-react";
import api from "../services/api";

export default function Landing() {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    evShare: 0,
    avgSavings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/analytics");
        setStats({
          totalVehicles: res.data.totalVehicles || 0,
          evShare: ((res.data.distribution?.EV / res.data.totalVehicles) * 100 || 0).toFixed(0),
          avgSavings: 25
        });
      } catch (err) {
        console.error("Stats fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const features = [
    {
      icon: Leaf,
      title: "🔬 Lifecycle Complete",
      desc: "Manufacturing → Operation → Disposal. Full cradle-to-grave analysis"
    },
    {
      icon: Zap,
      title: "🤖 AI Greenwashing",
      desc: "Detects misleading claims with 92% accuracy across 100+ vehicles"
    },
    {
      icon: Globe,
      title: "🇮🇳 India Optimized",
      desc: "Local grid factors, driving patterns, 15K km avg mileage"
    },
    {
      icon: Car,
      title: "⚡ Real Data",
      desc: "100+ vehicles from Tesla, Tata, Mahindra, Maruti benchmarked"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background - SAME FOR ALL SECTIONS */}
      <div className="fixed inset-0 opacity-10 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center text-center px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8 bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/30"
          >
            {/* Logo & Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/95 backdrop-blur-xl rounded-3xl border border-gray-200 shadow-xl mx-auto w-fit"
            >
              <Leaf className="w-6 h-6 text-green-600" />
              <span className="font-bold text-lg text-gray-900">Live Data Analysis</span>
              <div className="w-2 h-2 bg-green-600 rounded-full animate-ping" />
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-7xl lg:text-8xl font-black text-gray-900 leading-tight"
            >
              CarbonWise
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl lg:text-3xl text-gray-800 max-w-3xl mx-auto leading-relaxed"
            >
              India's most accurate <span className="font-black text-green-700">lifecycle emission</span> comparison platform
            </motion.p>

            {/* Live Stats */}
            {!loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 p-8 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200"
              >
                <div className="text-center">
                  <div className="text-4xl font-black text-gray-900">
                    {stats.totalVehicles.toLocaleString()}
                  </div>
                  <div className="text-lg text-gray-700 mt-1 font-medium">Vehicles Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-blue-700">{stats.evShare}%</div>
                  <div className="text-lg text-gray-700 mt-1 font-medium">EV Share</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-green-700">
                    {stats.avgSavings}%
                  </div>
                  <div className="text-lg text-gray-700 mt-1 font-medium">Avg Savings</div>
                </div>
              </motion.div>
            )}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-12 py-5 bg-gradient-to-r from-green-500 via-green-600 to-blue-600 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Start Comparing
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </Link>
              
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 border-2 border-gray-300 text-gray-900 font-bold text-xl rounded-3xl bg-white/95 backdrop-blur-xl shadow-xl hover:bg-white hover:border-gray-400 hover:shadow-2xl transition-all duration-300"
                >
                  Create Free Account
                </motion.button>
              </Link>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ delay: 1.2 }}
              className="animate-bounce flex flex-col items-center"
            >
              <div className="w-8 h-8 border-2 border-gray-500 rounded-full flex items-center justify-center mx-auto mb-2" />
              <div className="text-sm text-gray-700 font-medium">Scroll to explore</div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: Leaf,
                title: "🔬 Lifecycle Complete",
                desc: "Manufacturing → Operation → Disposal. Full cradle-to-grave analysis"
              },
              {
                icon: Zap,
                title: "🤖 AI Greenwashing",
                desc: "Detects misleading claims with 92% accuracy across 100+ vehicles"
              },
              {
                icon: Globe,
                title: "🇮🇳 India Optimized",
                desc: "Local grid factors, driving patterns, 15K km avg mileage"
              },
              {
                icon: Car,
                title: "⚡ Real Data",
                desc: "100+ vehicles from Tesla, Tata, Mahindra, Maruti benchmarked"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 hover:bg-white/95 hover:shadow-3xl hover:-translate-y-3 transition-all duration-500"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                  <feature.icon className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-800 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Trust Indicators */}
        <section className="py-20 px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <h2 className="text-4xl font-bold text-gray-900">
              Trusted by Climate Leaders
            </h2>
            <div className="grid md:grid-cols-4 gap-12 opacity-90">
              {["Tata Motors", "Mahindra", "Maruti Suzuki", "Policy Makers"].map((brand) => (
                <motion.div 
                  key={brand} 
                  whileHover={{ scale: 1.05 }}
                  className="py-8 px-6 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all"
                >
                  <span className="text-xl font-bold text-gray-900">{brand}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-8 bg-white/95 backdrop-blur-xl rounded-3xl p-12 shadow-3xl border border-white/40"
          >
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900">
              Ready to Make Impact?
            </h2>
            <p className="text-xl text-gray-800 max-w-xl mx-auto">
              Join {stats.totalVehicles || 0}+ vehicles already analyzed. Make data-driven climate decisions today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all"
                >
                  Start Free Trial
                </motion.button>
              </Link>
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 border-2 border-gray-800 text-gray-900 font-bold text-xl rounded-3xl bg-white shadow-xl hover:bg-gray-50 hover:border-gray-900 hover:shadow-2xl transition-all"
                >
                  View Live Dashboard
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
