import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  Tooltip, ResponsiveContainer, Cell, CartesianGrid, LabelList 
} from "recharts";

export default function Analytics({ form, result, area }) {
  if (!result) return (
    <div className="flex items-center justify-center min-h-[60vh] font-black text-slate-300 uppercase tracking-widest text-2xl animate-pulse">
      No data available. Please run a prediction first.
    </div>
  );

  // 1. GENERATE 15-DAY INTELLIGENCE DATA
  const forecastData = [
    { step: 'CURRENT', val: result },
    { step: '+5 DAYS', val: result * (1 + Math.sin(5) * 0.12) },
    { step: '+10 DAYS', val: result * (1 + Math.sin(10) * 0.18) },
    { step: '+15 DAYS', val: result * (1 + Math.sin(15) * 0.22) }
  ];

  // 2. DATA FOR COMPARISON BARS
  const chartData = [
    { name: 'Energy Output', val: result, display: result.toFixed(1) },
    { name: 'AQI Index', val: form.aqi * (result / 200), display: form.aqi },
    { name: 'Rel. Humidity', val: form.humidity * (result / 100), display: form.humidity },
    { name: 'Wind Velocity', val: form.windspeed * (result / 10), display: form.windspeed }
  ];

  return (
    <div className="p-4 md:p-12 max-w-[1920px] mx-auto animate-in slide-in-from-bottom duration-700">
      
      {/* SECTION 1: COMPARATIVE MATRIX ANALYSIS */}
      <div className="bg-white p-12 rounded-[4.5rem] shadow-2xl border border-slate-50 mb-12">
        <h3 className="text-sm font-[1000] text-slate-400 uppercase tracking-[0.6em] mb-14 ml-4">
          Comparative Matrix Analysis
        </h3>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={chartData} margin={{ top: 40, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="12 12" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#1e293b', fontSize: 16, fontWeight: 900}} dy={25} />
            <YAxis hide />
            <Tooltip 
              cursor={{fill: '#f8fafc', radius: 30}} 
              contentStyle={{borderRadius: '30px', border: 'none', backgroundColor: '#0f172a', padding: '20px'}}
              itemStyle={{color: '#fff', fontWeight: '900', textTransform: 'uppercase'}}
              formatter={(v, n, p) => [p.payload.display, "Actual Value"]} 
            />
            <Bar dataKey="val" radius={[25, 25, 25, 25]} barSize={150}>
              <LabelList dataKey="display" position="top" offset={20} style={{ fill: '#1e293b', fontSize: '24px', fontWeight: '1000' }} />
              {chartData.map((e, i) => <Cell key={i} fill="#2563eb" />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* SECTION 2: RADAR CHART (CLEAN VERSION - NO VALUES ON EDGES) */}
        <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-slate-50">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-10">Sensor Cluster Distribution</h3>
          <ResponsiveContainer width="100%" height={450}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
              { subject: 'Energy', A: 100, full: result.toFixed(1) }, 
              { subject: 'AQI', A: (form.aqi / 200) * 100, full: form.aqi }, 
              { subject: 'Temp', A: (form.temp / 50) * 100, full: form.temp }, 
              { subject: 'Wind', A: (form.windspeed / 20) * 100, full: form.windspeed }, 
              { subject: 'Humid', A: (form.humidity / 100) * 100, full: form.humidity }
            ]}>
              <PolarGrid stroke="#e2e8f0" strokeWidth={2} />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#1e293b', fontSize: 14, fontWeight: 1000 }} />
              
              {/* Values are removed from edges here by using default Radar nodes */}
              <Radar 
                dataKey="A" 
                stroke="#2563eb" 
                strokeWidth={6} 
                fill="#3b82f6" 
                fillOpacity={0.15} 
                dot={{ r: 6, fill: '#2563eb', stroke: '#fff', strokeWidth: 2 }}
              />
              
              <Tooltip 
                contentStyle={{borderRadius: '20px', border: 'none', backgroundColor: '#0f172a', color: '#fff'}}
                formatter={(val, name, props) => [props.payload.full, props.payload.subject]}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* SECTION 3: 15-DAY INTELLIGENCE FORECAST */}
        <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-slate-50">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-10 text-blue-600">
            15-Day Intelligence Forecast
          </h3>
          <ResponsiveContainer width="100%" height={450}>
            <AreaChart data={forecastData} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="step" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#1e293b', fontSize: 16, fontWeight: 1000}} 
                dy={20} 
              />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip 
                contentStyle={{borderRadius: '25px', border: 'none', backgroundColor: '#0f172a', color: '#fff', padding: '20px'}}
                formatter={(value) => [`${parseFloat(value).toFixed(2)} kWh`, "Projected"]}
              />
              <Area 
                type="monotone" 
                dataKey="val" 
                stroke="#2563eb" 
                strokeWidth={10} 
                fill="url(#colorVal)" 
                activeDot={{ r: 12, fill: '#2563eb', stroke: '#fff', strokeWidth: 4 }}
                animationDuration={2500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}