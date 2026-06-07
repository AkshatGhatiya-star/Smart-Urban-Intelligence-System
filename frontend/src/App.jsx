import { Routes, Route, Navigate, useNavigate } from "react-router-dom"; 
import { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import InputTerminal from "./pages/InputTerminal";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    hour: 12, day: 1, month: 1, weekday: 1,
    aqi: 100, temp: 25, humidity: 50, windspeed: 3,
  });

  const [result, setResult] = useState(null);
  const [area, setArea] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };

  // --- UPDATED 5-TIER CLASSIFICATION LOGIC ---
  const classify = (consumption, aqi) => {
    // Score represents Energy Efficiency vs Pollution
    const score = consumption / (aqi + 1);

    if (score > 350) return { 
      type: "💎 Elite Smart Zone", 
      suggestion: "Optimized high-tech hub. Focus on renewable energy expansion and AI-driven infrastructure.", 
      color: "text-purple-600", bg: "bg-purple-50", bar: "#9333ea" 
    };
    
    if (score > 200) return { 
      type: "🌟 Premium Area", 
      suggestion: "High investment potential. Ideal for commercial skyscrapers and luxury residential projects.", 
      color: "text-blue-600", bg: "bg-blue-50", bar: "#2563eb" 
    };
    
    if (score > 100) return { 
      type: "🏗️ Developing Area", 
      suggestion: "Rapid growth detected. Prioritize public transport connectivity and basic utility scaling.", 
      color: "text-emerald-600", bg: "bg-emerald-50", bar: "#10b981" 
    };
    
    if (score > 50) return { 
      type: "🏭 Industrial Sector", 
      suggestion: "High activity with moderate pollution. Implement stricter emission filters and green buffer zones.", 
      color: "text-amber-600", bg: "bg-amber-50", bar: "#d97706" 
    };

    return { 
      type: "⚠️ Underdeveloped Zone", 
      suggestion: "Stagnant energy profile. Immediate government intervention and infrastructure stimulus required.", 
      color: "text-orange-600", bg: "bg-orange-50", bar: "#f97316" 
    };
  };

  const predict = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/predict", form);
      const prediction = res.data.prediction;
      setResult(prediction);
      setArea(classify(prediction, form.aqi));
      
      // Navigate to analytics so user can see the 15-day forecast
      setTimeout(() => {
        navigate("/analytics");
      }, 1200); 

    } catch (err) {
      alert("Error: Ensure FastAPI is running on port 8000.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      {authenticated && <Navbar setAuthenticated={setAuthenticated} />} 
      
      <Routes>
        <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />

        <Route path="/" element={
          authenticated ? (
            <InputTerminal 
              form={form} 
              handleChange={handleChange} 
              predict={predict} 
              result={result} 
              area={area} 
              loading={loading} 
            />
          ) : (
            <Navigate to="/login" />
          )
        } />

        <Route path="/analytics" element={
          authenticated ? (
            <Analytics form={form} result={result} area={area} />
          ) : (
            <Navigate to="/login" />
          )
        } />

        <Route path="*" element={<Navigate to={authenticated ? "/" : "/login"} />} />
      </Routes>
    </div>
  );
}