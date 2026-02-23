import { motion } from "framer-motion";
import { Sun, Moon, LogOut } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass sticky top-0 z-40 px-8 py-4 flex items-center justify-between"
    >
      <h1 className="text-2xl font-bold text-primary tracking-wide">
        CarbonWise
      </h1>

      <div className="flex items-center gap-6">

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-xl hover:bg-white/10 transition"
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 hover:opacity-80 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </motion.div>
  );
}