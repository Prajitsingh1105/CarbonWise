import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,        
  percentage    
}) {
  const [display, setDisplay] = useState(0);


  useEffect(() => {
    if (!value) return;

    const numericValue = parseFloat(
      value.toString().replace(/[^0-9.]/g, "")
    );

    if (isNaN(numericValue)) return;

    let start = 0;
    const increment = numericValue / 30;

    const interval = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setDisplay(numericValue);
        clearInterval(interval);
      } else {
        setDisplay(start);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.3 }}
      className="glass p-6 rounded-2xl shadow-xl relative overflow-hidden"
    >
      {/* Gradient Glow Background */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full"></div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium opacity-70">
          {title}
        </h3>

        {Icon && (
          <div className="p-3 bg-primary/10 rounded-xl">
            <Icon size={20} className="text-primary" />
          </div>
        )}
      </div>

      <div className="text-3xl font-bold text-primary">
        {typeof value === "string" && value.includes("kg")
          ? `${Math.floor(display).toLocaleString()} kg`
          : Math.floor(display).toLocaleString()}
      </div>

      {/* Trend Section */}
      {trend && percentage && (
        <div
          className={`flex items-center gap-2 mt-3 text-sm ${
            trend === "up"
              ? "text-emerald-500"
              : "text-red-500"
          }`}
        >
          {trend === "up" ? (
            <TrendingUp size={16} />
          ) : (
            <TrendingDown size={16} />
          )}

          <span>{percentage}%</span>
          <span className="opacity-60">vs last month</span>
        </div>
      )}
    </motion.div>
  );
}