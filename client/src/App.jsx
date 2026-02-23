import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Compare from "./pages/Compare";
import Greenwash from "./pages/Greenwash";
import Analytics from "./pages/Analytics";
import ProtectedRoute from "./components/layouts/ProtectedRoute";
import Sidebar from "./components/layouts/Sidebar";
import Navbar from "./components/layouts/Navbar";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1 bg-lightBg dark:bg-darkBg transition-all">
                <Navbar />
                <div className="p-8">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/compare" element={<Compare />} />
                    <Route path="/greenwash" element={<Greenwash />} />
                    <Route path="/analytics" element={<Analytics />} />
                  </Routes>
                </div>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}