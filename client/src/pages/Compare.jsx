import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "../components/ui/Card";
import api from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from "recharts";

const COMPARISON_COLORS = ["#16a34a", "#ef4444", "#f97316", "#0ea5e9"];

export default function Compare() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleA, setSelectedVehicleA] = useState(null);
  const [selectedVehicleB, setSelectedVehicleB] = useState(null);
  const [annualMileageA, setAnnualMileageA] = useState(15000);
  const [yearsA, setYearsA] = useState(10);
  const [annualMileageB, setAnnualMileageB] = useState(15000);
  const [yearsB, setYearsB] = useState(10);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await api.get("/analytics/vehicles");
        setVehicles(res.data);
      } catch (err) {
        console.error("Failed to fetch vehicles:", err);
      }
    };
    fetchVehicles();
  }, []);

  const handleCompare = async () => {
    if (!selectedVehicleA || !selectedVehicleB) {
      alert("Please select both vehicles");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/compare", {
        vehicleA: {
          name: selectedVehicleA.name,
          manufacturingEmission: selectedVehicleA.manufacturingEmission,
          emissionPerKm: selectedVehicleA.emissionPerKm,
          disposalEmission: selectedVehicleA.disposalEmission
        },
        vehicleB: {
          name: selectedVehicleB.name,
          manufacturingEmission: selectedVehicleB.manufacturingEmission,
          emissionPerKm: selectedVehicleB.emissionPerKm,
          disposalEmission: selectedVehicleB.disposalEmission
        },
        annualMileage: annualMileageA,
        years: Math.max(yearsA, yearsB)
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Comparison failed");
    } finally {
      setLoading(false);
    }
  };

  // Enhanced comparison metrics
  const enhancedMetrics = result ? {
    totalSavings: Math.abs(result.vehicleA.totalEmission - result.vehicleB.totalEmission),
    manufacturingDiff: Math.abs(
      selectedVehicleA.manufacturingEmission - selectedVehicleB.manufacturingEmission
    ),
    operationalDiff: Math.abs(
      annualMileageA * yearsA * selectedVehicleA.emissionPerKm - 
      annualMileageB * yearsB * selectedVehicleB.emissionPerKm
    ),
    disposalDiff: Math.abs(selectedVehicleA.disposalEmission - selectedVehicleB.disposalEmission),
    perKmAdvantage: ((selectedVehicleA.emissionPerKm < selectedVehicleB.emissionPerKm ? 
      selectedVehicleB.emissionPerKm - selectedVehicleA.emissionPerKm : 
      selectedVehicleA.emissionPerKm - selectedVehicleB.emissionPerKm) * 100).toFixed(2),
    manufacturingShareA: ((selectedVehicleA.manufacturingEmission / result.vehicleA.totalEmission) * 100).toFixed(1),
    manufacturingShareB: ((selectedVehicleB.manufacturingEmission / result.vehicleB.totalEmission) * 100).toFixed(1)
  } : null;

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
        🚗 Advanced Lifecycle Emission Comparison
      </h1>

      {/* VEHICLE SELECTION */}
      <Card>
        <h2 className="text-xl font-semibold mb-6">Select Vehicles to Compare</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Vehicle A */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg bg-green-100 p-3 rounded-xl">Vehicle A</h3>
            <select
              className="input w-full"
              onChange={(e) => {
                const vehicle = vehicles.find(v => v.name === e.target.value);
                setSelectedVehicleA(vehicle);
              }}
              value={selectedVehicleA?.name || ""}
            >
              <option value="">Select Vehicle A</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle._id} value={vehicle.name}>
                  {vehicle.name} ({vehicle.vehicleType}) - {vehicle.manufacturingEmission}tCO₂
                </option>
              ))}
            </select>
            <div className="space-y-3 p-4 bg-gray-50 rounded-xl">
              <input
                type="number"
                className="input"
                value={annualMileageA}
                onChange={(e) => setAnnualMileageA(Number(e.target.value))}
                placeholder="Annual Mileage (km)"
              />
              <input
                type="number"
                className="input"
                value={yearsA}
                onChange={(e) => setYearsA(Number(e.target.value))}
                placeholder="Years of Ownership"
              />
            </div>
          </div>

          {/* Vehicle B */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg bg-red-100 p-3 rounded-xl">Vehicle B</h3>
            <select
              className="input w-full"
              onChange={(e) => {
                const vehicle = vehicles.find(v => v.name === e.target.value);
                setSelectedVehicleB(vehicle);
              }}
              value={selectedVehicleB?.name || ""}
            >
              <option value="">Select Vehicle B</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle._id} value={vehicle.name}>
                  {vehicle.name} ({vehicle.vehicleType}) - {vehicle.manufacturingEmission}tCO₂
                </option>
              ))}
            </select>
            <div className="space-y-3 p-4 bg-gray-50 rounded-xl">
              <input
                type="number"
                className="input"
                value={annualMileageB}
                onChange={(e) => setAnnualMileageB(Number(e.target.value))}
                placeholder="Annual Mileage (km)"
              />
              <input
                type="number"
                className="input"
                value={yearsB}
                onChange={(e) => setYearsB(Number(e.target.value))}
                placeholder="Years of Ownership"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleCompare}
          disabled={!selectedVehicleA || !selectedVehicleB || loading}
          className="mt-8 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl disabled:opacity-50 transition-all"
        >
          {loading ? " Calculating..." : " Compare Vehicles"}
        </button>
      </Card>

      {/* ENHANCED RESULTS */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* TOTAL EMISSION CARDS */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <h2 className="text-2xl font-bold text-green-800">{result.vehicleA.name}</h2>
              </div>
              <p className="text-5xl font-black text-green-600 mb-2">
                {Math.round(result.vehicleA.totalEmission).toLocaleString()} kg CO₂
              </p>
              <p className="text-sm text-green-700">Total Lifecycle Emissions</p>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <h2 className="text-2xl font-bold text-red-800">{result.vehicleB.name}</h2>
              </div>
              <p className="text-5xl font-black text-red-600 mb-2">
                {Math.round(result.vehicleB.totalEmission).toLocaleString()} kg CO₂
              </p>
              <p className="text-sm text-red-700">Total Lifecycle Emissions</p>
            </Card>
          </div>

          {/* COMPREHENSIVE METRICS DASHBOARD */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <h3 className="font-semibold mb-3">🏆 Winner</h3>
              <div className="text-2xl font-bold text-green-600">
                {result.betterOption}
              </div>
              <p className="text-sm mt-1">Lower total emissions</p>
            </Card>
            <Card>
              <h3 className="font-semibold mb-3">💰 Savings</h3>
              <div className="text-2xl font-bold text-blue-600">
                {result.savingsPercentage}%
              </div>
              <p className="text-sm mt-1">Emission reduction</p>
            </Card>
            <Card>
              <h3 className="font-semibold mb-3">⚡ Break-even</h3>
              <div className="text-2xl font-bold text-purple-600">
                Year {result.breakEvenYear || "Never"}
              </div>
              <p className="text-sm mt-1">When A becomes better</p>
            </Card>
            <Card>
              <h3 className="font-semibold mb-3">📏 Per km Advantage</h3>
              <div className="text-xl font-bold text-indigo-600">
                {enhancedMetrics.perKmAdvantage} g/km
              </div>
              <p className="text-sm mt-1">Operational efficiency</p>
            </Card>
            <Card>
              <h3 className="font-semibold mb-3">🏭 Manufacturing Diff</h3>
              <div className="text-xl font-bold text-orange-600">
                {enhancedMetrics.manufacturingDiff.toLocaleString()} kg
              </div>
            </Card>
            <Card>
              <h3 className="font-semibold mb-3">🚗 Total Savings</h3>
              <div className="text-xl font-bold text-emerald-600">
                {enhancedMetrics.totalSavings.toLocaleString()} kg CO₂
              </div>
            </Card>
          </div>

          {/* EMISSION BREAKDOWN PIE CHARTS */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <h3 className="text-lg font-semibold mb-4">{result.vehicleA.name} Breakdown</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Manufacturing", value: selectedVehicleA.manufacturingEmission },
                      { name: "Operation", value: annualMileageA * yearsA * selectedVehicleA.emissionPerKm },
                      { name: "Disposal", value: selectedVehicleA.disposalEmission }
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                  >
                    {[
                      { name: "Manufacturing", fill: "#16a34a" },
                      { name: "Operation", fill: "#ef4444" },
                      { name: "Disposal", fill: "#f97316" }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-center mt-2 text-sm bg-blue-50 p-2 rounded">
                Manufacturing: {enhancedMetrics.manufacturingShareA}% of total
              </p>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">{result.vehicleB.name} Breakdown</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Manufacturing", value: selectedVehicleB.manufacturingEmission },
                      { name: "Operation", value: annualMileageB * yearsB * selectedVehicleB.emissionPerKm },
                      { name: "Disposal", value: selectedVehicleB.disposalEmission }
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                  >
                    {[
                      { name: "Manufacturing", fill: "#16a34a" },
                      { name: "Operation", fill: "#ef4444" },
                      { name: "Disposal", fill: "#f97316" }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-center mt-2 text-sm bg-blue-50 p-2 rounded">
                Manufacturing: {enhancedMetrics.manufacturingShareB}% of total
              </p>
            </Card>
          </div>

          {/* CHARTS */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <h2 className="text-lg font-semibold mb-4">Total Emission Comparison</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { name: result.vehicleA.name, value: result.vehicleA.totalEmission },
                  { name: result.vehicleB.name, value: result.vehicleB.totalEmission }
                ]}>
                  <XAxis dataKey="name" angle={-45} height={80} />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value.toLocaleString()} kg CO₂`, "Total"]} />
                  <Bar dataKey="value" fill="#16a34a" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <h2 className="text-lg font-semibold mb-4">Yearly Emissions Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={result.yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="vehicleA" stroke="#16a34a" strokeWidth={4} dot={false} />
                  <Line type="monotone" dataKey="vehicleB" stroke="#ef4444" strokeWidth={4} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </motion.div>
      )}
    </div>
  );
}
