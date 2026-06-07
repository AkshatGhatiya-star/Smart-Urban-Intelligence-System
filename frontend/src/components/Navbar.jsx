
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ setAuthenticated }) {
  const loc = useLocation();
  
  const active = (p) => loc.pathname === p 
    ? "text-blue-600 border-b-[6px] border-blue-600" 
    : "text-slate-300 opacity-50";

  return (
    <nav className="bg-white px-12 py-10 sticky top-0 z-50 shadow-sm border-b border-slate-100">
      <div className="max-w-[1920px] mx-auto flex justify-between items-center">
        
        {/* BRAND SECTION - SCALED UP */}
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-slate-950 rounded-[1.5rem] flex items-center justify-center text-white font-black text-4xl shadow-xl">
            S
          </div>
          <span className="font-[1000] tracking-[-0.05em] text-slate-950 text-5xl uppercase leading-none">
          CityFlow - Smart Urban <span className="text-blue-600">Intelligence system</span>
          </span>
        </div>

        {/* NAV LINKS - SCALED UP */}
        <div className="flex items-center gap-20">
          <Link 
            to="/" 
            className={`pb-3 text-xl font-black uppercase tracking-[0.3em] transition-all hover:text-blue-500 ${active('/')}`}
          >
            Input Terminal
          </Link>
          
          <Link 
            to="/analytics" 
            className={`pb-3 text-xl font-black uppercase tracking-[0.3em] transition-all hover:text-blue-500 ${active('/analytics')}`}
          >
            Visual Analytics
          </Link>

          <button 
            onClick={() => setAuthenticated(false)}
            className="ml-8 px-10 py-5 border-4 border-slate-50 rounded-2xl text-sm font-black uppercase tracking-[0.2em] text-red-500 hover:bg-red-50 hover:border-red-100 transition-all active:scale-95"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}