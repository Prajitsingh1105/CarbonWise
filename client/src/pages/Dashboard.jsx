import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Leaf, Zap, Globe, Car, TrendingUp, Users, Award } from "lucide-react";
import StatCard from "../components/ui/StatCard";
import Card from "../components/ui/Card";
import api from "../services/api";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";

const COLORS = ["#16a34a", "#ef4444", "#f97316", "#0ea5e9"];

export default function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comparisonStats, setComparisonStats] = useState({
    totalComparisons: 0,
    avgSavings: 0,
    co2Saved: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        
        const analyticsRes = await api.get("/analytics");
        setAnalytics(analyticsRes.data);

      } catch (err) {
        console.error("Dashboard data fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-xl">Loading Dashboard...</p>
        </div>
      </div>
    );
  }


  const stats = [
    {
      title: "Total Vehicles",
      value: analytics?.totalVehicles || 0,
      icon: Car,
      trend: "up",
      percentage: 25
    },
    {
      title: "Avg Manufacturing",
      value: `${(analytics?.averages?.manufacturing || 0).toLocaleString()} kg`,
      icon: TrendingUp,
      trend: "down",
      percentage: 15
    },
    {
      title: "High Risk Vehicles",
      value: analytics?.highRiskVehicles || 0,
      icon: Award,
      trend: "up",
      percentage: 8
    },
    {
      title: "EV Share",
      value: `${((analytics?.distribution?.EV / analytics?.totalVehicles) * 100 || 0).toFixed(1)}%`,
      icon: Zap,
      trend: "up",
      percentage: 22
    }
  ];

  const pieData = [
    { name: "EV", value: analytics?.distribution?.EV || 0 },
    { name: "Hybrid", value: analytics?.distribution?.Hybrid || 0 },
    { name: "ICE", value: analytics?.distribution?.ICE || 0 }
  ];

  const avgEmissionsData = [
    { name: "Manufacturing", value: Number(analytics?.averages?.manufacturing || 0) },
    { name: "Tailpipe", value: Number(analytics?.averages?.tailpipe || 0) }
  ];

  return (
    <div className="space-y-10 p-8 max-w-7xl mx-auto">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-10 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-8"
      >
        <div className="space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-500/10 rounded-2xl">
            <Leaf className="w-5 h-5 text-green-400" />
            <span className="font-semibold text-green-600">Live Data</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            CarbonWise Dashboard
          </h1>

          <p className="text-xl opacity-80 leading-relaxed max-w-2xl">
            Real-time lifecycle emission analytics across {analytics?.totalVehicles || 0}+ vehicles. 
            Track greenwashing risks, compare powertrains, and make data-driven sustainability decisions.
          </p>

          <div className="flex flex-wrap gap-6 text-sm opacity-80">
            <span className="flex items-center gap-2">
              <Globe size={18} className="text-blue-500" />
              {analytics?.totalVehicles || 0} Vehicles Analyzed
            </span>
            <span className="flex items-center gap-2">
              <Zap size={18} className="text-yellow-500" />
              {analytics?.distribution?.EV || 0} EVs in Dataset
            </span>
            <span className="flex items-center gap-2">
              <Award size={18} className="text-red-500" />
              {analytics?.highRiskVehicles || 0} High Risk Vehicles
            </span>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="hidden lg:block"
        >
          <img
            src="https://electricvehicles.in/wp-content/uploads/2023/06/electric_car.webp"
            alt="Carbon analytics dashboard"
            className="w[410px] h-80 rounded-3xl shadow-2xl object-cover border-4 border-white/20"
          />
        </motion.div>
      </motion.div>

      {/* LIVE STATISTICS */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-3xl font-bold mb-8">📊 Live Statistics</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* KEY INSIGHTS CHARTS */}
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
        <h2 className="text-3xl font-bold">🔍 Key Insights</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Vehicle Type Distribution */}
          <Card className="p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <Globe className="w-6 h-6" />
              Fleet Composition
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  data={pieData}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Average Emissions Breakdown */}
          <Card className="p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6" />
              Emission Averages
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={avgEmissionsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value.toLocaleString()} kg`, "Emissions"]} />
                <Bar dataKey="value" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </motion.section>

      {/* EDUCATIONAL SECTION */}
      <section className="grid lg:grid-cols-2 gap-8">
        <Card className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <Leaf className="w-12 h-12 text-green-500" />
            <div>
              <h2 className="text-2xl font-bold">Why Lifecycle Matters</h2>
              <p className="text-green-600 font-semibold">
                {analytics?.totalVehicles || 0} vehicles analyzed
              </p>
            </div>
          </div>
          
          <div className="space-y-4 text-lg">
            <p className="opacity-90">
              Lifecycle analysis reveals the <strong>true environmental impact</strong> beyond just tailpipe emissions.
            </p>
            <ul className="space-y-3 text-base">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                EVs: {analytics?.distribution?.EV || 0} vehicles, avg {Number(analytics?.averages?.manufacturing || 0).toLocaleString()}kg manufacturing
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                ICE: {analytics?.distribution?.ICE || 0} vehicles detected with high greenwashing risk
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                {analytics?.highRiskVehicles || 0} vehicles flagged for misleading sustainability claims
              </li>
            </ul>
          </div>
        </Card>

        <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="flex items-center gap-4 mb-6">
            <Zap className="w-12 h-12 text-blue-500" />
            <div>
              <h2 className="text-2xl font-bold">India Context</h2>
              <p className="text-blue-600 font-semibold">Localized Insights</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 text-center">
            <div className="space-y-2 p-4 bg-white/50 rounded-2xl">
              <div className="text-3xl font-bold text-blue-600">15,000 km</div>
              <div className="text-sm opacity-80">Avg Annual Mileage</div>
            </div>
            <div className="space-y-2 p-4 bg-white/50 rounded-2xl">
              <div className="text-3xl font-bold text-green-600">4.2 Years</div>
              <div className="text-sm opacity-80">Typical EV Break-even</div>
            </div>
            <div className="space-y-2 p-4 bg-white/50 rounded-2xl">
              <div className="text-3xl font-bold text-orange-600">0.12 kg/km</div>
              <div className="text-sm opacity-80">India Grid Emission Factor</div>
            </div>
            <div className="space-y-2 p-4 bg-white/50 rounded-2xl">
              <div className="text-3xl font-bold text-purple-600">
                {((analytics?.distribution?.EV / analytics?.totalVehicles) * 100 || 0).toFixed(1)}%
              </div>
              <div className="text-sm opacity-80">EV Penetration</div>
            </div>
          </div>
        </Card>
      </section>

      {/* IMPACT SECTION */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-12 rounded-3xl text-center space-y-8 bg-gradient-to-r from-green-500/5 to-blue-500/5 border border-green-200/50"
      >
        <Car className="w-20 h-20 mx-auto text-green-500 drop-shadow-lg" />
        
        <div>
          <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Make Impactful Decisions
          </h2>
          <p className="text-xl mt-4 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Your analysis of {analytics?.totalVehicles || 0} vehicles contributes to smarter climate decisions.
            Switching to optimal vehicles could save{" "}
            <span className="font-bold text-green-600">
              {(analytics?.highRiskVehicles * 5000 || 0).toLocaleString()} tons CO₂ annually
            </span>{" "}
            across India.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
          >
            Start Comparison →
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-green-500 text-green-600 font-bold rounded-2xl hover:bg-green-500 hover:text-white transition-all"
          >
            View Analytics
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
}
