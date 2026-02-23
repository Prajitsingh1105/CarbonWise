import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#16a34a", "#0ea5e9", "#f97316"];

const Analytics = () => {
  const [summary, setSummary] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const summaryRes = await axios.get(
        "http://localhost:5000/api/analytics"
      );
      const vehiclesRes = await axios.get(
        "http://localhost:5000/api/analytics/vehicles"
      );

      setSummary(summaryRes.data);
      setVehicles(vehiclesRes.data);
    } catch (err) {
      console.error("Analytics fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center text-xl">Loading Analytics...</div>
    );

  

  const pieData = [
    { name: "EV", value: summary.distribution.EV },
    { name: "Hybrid", value: summary.distribution.Hybrid },
    { name: "ICE", value: summary.distribution.ICE },
  ];

  const barData = [
    {
      name: "Manufacturing",
      value: Number(summary.averages.manufacturing),
    },
    {
      name: "Tailpipe",
      value: Number(summary.averages.tailpipe),
    },
  ];

  const lineData = vehicles.slice(0, 15).map((v, index) => ({
    index: index + 1,
    greenwashScore: v.greenwashScore,
  }));

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Emission Analytics</h1>

      
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Total Vehicles"
          value={summary.totalVehicles}
        />
        <StatCard
          title="Avg Manufacturing (tCO₂)"
          value={summary.averages.manufacturing}
        />
        <StatCard
          title="Avg Tailpipe (g/km)"
          value={summary.averages.tailpipe}
        />
        <StatCard
          title="High Greenwash Risk"
          value={summary.highRiskVehicles}
        />
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Pie Chart */}
        <GlassCard title="Vehicle Type Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                label
                animationDuration={1200}
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Bar Chart */}
        <GlassCard title="Average Emissions">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#16a34a"
                animationDuration={1200}
              />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      
      <GlassCard title="Greenwash Risk Trend (Sample)">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="index" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="greenwashScore"
              stroke="#ef4444"
              strokeWidth={3}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </GlassCard>

     
      <GlassCard title="Vehicle Dataset Overview">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-400">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Type</th>
                <th className="p-3">Manufacturing</th>
                <th className="p-3">Tailpipe</th>
                <th className="p-3">Greenwash</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.slice(0, 20).map((v) => (
                <tr
                  key={v._id}
                  className="border-b border-gray-300 hover:bg-white/10 transition"
                >
                  <td className="p-3">{v.name}</td>
                  <td className="p-3">{v.vehicleType}</td>
                  <td className="p-3">
                    {v.manufacturingEmission} t
                  </td>
                  <td className="p-3">
                    {v.emissionPerKm} g/km
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        v.greenwashScore > 70
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                    >
                      {v.greenwashScore}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};



const StatCard = ({ title, value }) => (
  <motion.div
    className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <div className="text-3xl font-bold text-green-400">
      <CountUp end={Number(value)} duration={1.5} />
    </div>
  </motion.div>
);

const GlassCard = ({ title, children }) => (
  <motion.div
    className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl mb-10"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-xl font-bold mb-6">{title}</h2>
    {children}
  </motion.div>
);

export default Analytics;