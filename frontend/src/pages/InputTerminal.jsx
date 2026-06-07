import React from 'react';


export default function InputTerminal({ form, handleChange, predict, result, area, loading }) {
  return (
    <div className="min-h-[calc(100vh-120px)] w-full px-6 md:px-12 py-8 animate-in fade-in duration-700">
      
      {/* FULL WIDTH WRAPPER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 h-full max-w-[1920px] mx-auto">
        
        {/* LEFT PANEL: INPUT SYSTEM */}
        <div className="lg:col-span-8 bg-white p-12 md:p-20 rounded-[4.5rem] shadow-2xl border border-slate-50 relative overflow-hidden flex flex-col justify-between">
          
          <div className="relative z-10">
            {/* --- UPDATED HEADER SECTION --- */}
            <div className="mb-20 border-b-2 border-slate-50 pb-10">
              <div className="flex items-center gap-10">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl font-black shadow-lg border-4 border-white">
                  01
                </div>
                <div className="flex flex-col">
                  <h2 className="text-4xl font-black text-slate-950 tracking-tighter uppercase opacity-90 leading-none">
                    System <span className="text-blue-600">Parameters</span>
                  </h2>
                  <p className="text-slate-400 text-xs font-black uppercase tracking-[0.8em] mt-2 ml-1">
                    Environmental Matrix Input
                  </p>
                </div>
              </div>
            </div>

            {/* INPUT GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-16 relative z-10">
              {Object.keys(form).map((key) => (
                <div key={key} className="flex flex-col group">
                  <label className="text-base font-black text-slate-500 uppercase tracking-[0.4em] mb-4 ml-4 group-focus-within:text-blue-600 transition-colors">
                    {key}
                  </label>
                  <input
                    type="number"
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                    className="w-full p-8 rounded-[2.5rem] bg-slate-50 border-4 border-transparent text-5xl font-black text-slate-950 focus:bg-white focus:border-blue-500/20 outline-none transition-all shadow-inner"
                  />
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={predict} 
            className="mt-20 w-full bg-slate-950 hover:bg-blue-600 text-white font-black py-10 rounded-[3rem] text-3xl tracking-[0.3em] shadow-2xl transition-all active:scale-[0.97] uppercase"
          >
            {loading ? "INITIALIZING AI ENGINE..." : "Run System Prediction"}
          </button>
        </div>

        {/* RIGHT PANEL: LIVE OUTPUT */}
        <div className="lg:col-span-4 flex flex-col gap-10">
          <div className="flex-1 bg-white p-12 rounded-[4.5rem] shadow-2xl border border-white flex flex-col items-center justify-center text-center relative overflow-hidden">
            {result ? (
              <div className="animate-in zoom-in duration-1000 w-full px-6">
                <div className="w-80 h-80 rounded-full border-[16px] border-slate-50 bg-white shadow-2xl flex flex-col items-center justify-center mx-auto mb-12">
                  <h2 className="text-8xl font-black text-slate-900 tracking-tighter">{result.toFixed(1)}</h2>
                  <p className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] mt-2">kWh Output</p>
                </div>
                <div className={`p-12 rounded-[3.5rem] ${area?.bg} border border-white shadow-inner`}>
                  <h3 className={`text-4xl font-black ${area?.color} uppercase tracking-tight`}>{area?.type}</h3>
                  <p className="text-slate-700 text-xl mt-6 font-bold italic opacity-80 italic">"{area?.suggestion}"</p>
                </div>
              </div>
            ) : (
              <p className="text-lg font-black uppercase tracking-[0.5em] opacity-30 animate-pulse">Awaiting Stream</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}