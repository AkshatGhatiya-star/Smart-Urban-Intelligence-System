
import bgImage from "../assets/city-bg.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login({ setAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "akshatghatiya05@gmail.com" && password === "12345") {
      setAuthenticated(true);
      navigate("/");
    } else {
      alert("Invalid Access Credentials");
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 flex flex-col items-center px-4 w-full">
        
        <h1 className="text-6xl md:text-8xl font-black mb-12 text-center tracking-tight 
               bg-gradient-to-b from-white via-blue-100 to-cyan-400 
               bg-clip-text text-transparent 
               drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] uppercase">
          Smart Urban <br/><span className="text-blue-500">Intelligence System</span>
        </h1>

        <div className="bg-black/30 backdrop-blur-sm border border-white/20 p-14 rounded-[3.5rem] shadow-2xl w-full max-w-lg transition-all">
          {/* INCREASED HEADER FONT */}
          <h2 className="text-xl font-black mb-10 text-center text-blue-400 uppercase tracking-[0.6em]">
            System Access
          </h2>
          
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              {/* INCREASED LABEL FONT (text-sm) */}
              <label className="text-sm font-black text-white uppercase ml-3 tracking-[0.3em] opacity-80">
                Operator Email
              </label>
              <input
                type="email"
                
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                /* INCREASED INPUT TEXT FONT (text-2xl) */
                className="w-full p-6 bg-black/60 text-white border border-white/10 rounded-3xl focus:border-blue-500 outline-none transition-all font-black text-2xl tracking-tight"
              />
            </div>

            <div className="space-y-3">
              {/* INCREASED LABEL FONT */}
              <label className="text-sm font-black text-white uppercase ml-3 tracking-[0.3em] opacity-80">
                Secure Passkey
              </label>
              <input
                type="password"
                
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                /* INCREASED INPUT TEXT FONT */
                className="w-full p-6 bg-black/60 text-white border border-white/10 rounded-3xl focus:border-blue-500 outline-none transition-all font-black text-2xl tracking-[0.5em]"
              />
            </div>

            <button
              type="submit"
              /* INCREASED BUTTON TEXT FONT (text-2xl) */
              className="w-full bg-blue-600 hover:bg-blue-500 text-white p-7 rounded-3xl font-black text-2xl uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/20 active:scale-95 transition-all mt-6"
            >
              Initialize Session
            </button>
          </form>
          
          <p className="text-xs text-slate-300 mt-10 text-center font-black uppercase tracking-[0.4em] opacity-60">
            
          </p>
        </div>
      </div>
    </div>
  );
}