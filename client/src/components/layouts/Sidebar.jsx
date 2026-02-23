import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BarChart3,
  Brain,
  LineChart,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Compare", icon: BarChart3, path: "/compare" },
    { name: "Greenwashing AI", icon: Brain, path: "/greenwash" },
    { name: "Analytics", icon: LineChart, path: "/analytics" }
  ];

  return (
    <motion.div
      animate={{ width: collapsed ? 90 : 260 }}
      transition={{ duration: 0.3 }}
      className="glass min-h-screen p-6 flex flex-col"
    >
      {/* Collapse Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-xl hover:bg-white/10 transition"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* Nav Links */}
      <div className="flex flex-col gap-4">
        {navItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 p-3 rounded-2xl transition-all
                ${isActive
                  ? "bg-primary text-white shadow-xl"
                  : "hover:bg-white/10"
                }`
              }
            >
              <Icon size={20} />

              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-medium"
                >
                  {item.name}
                </motion.span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Branding */}
      <div className="mt-auto pt-10 text-sm opacity-60 text-center">
        {!collapsed && "Climate Intelligence SaaS"}
      </div>
    </motion.div>
  );
}