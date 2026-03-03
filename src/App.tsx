import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Activity, 
  Cpu, 
  Layers, 
  Monitor, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Github, 
  ChevronDown,
  Camera,
  BarChart3,
  PieChart,
  Settings,
  UserCheck,
  Moon,
  Sun
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  Cell
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Data ---
const MODEL_DATA = [
  { name: 'Model A (MobileNetV2)', accuracy: 88.5, precision: 87.2, recall: 86.5, f1: 86.8, inference: 12, size: 14, fps: 65 },
  { name: 'Model B (ResNet50)', accuracy: 94.2, precision: 93.8, recall: 94.5, f1: 94.1, inference: 45, size: 98, fps: 22 },
  { name: 'Hybrid Ensemble', accuracy: 96.8, precision: 96.2, recall: 97.1, f1: 96.6, inference: 28, size: 112, fps: 35 },
];

const PERFORMANCE_TREND = [
  { epoch: 1, modelA: 70, modelB: 75, hybrid: 78 },
  { epoch: 10, modelA: 82, modelB: 88, hybrid: 91 },
  { epoch: 20, modelA: 85, modelB: 92, hybrid: 94 },
  { epoch: 30, modelA: 87, modelB: 94, hybrid: 96 },
  { epoch: 40, modelA: 88, modelB: 94, hybrid: 97 },
];

const ROC_DATA = [
  { fpr: 0, tpr: 0 },
  { fpr: 0.1, tpr: 0.85 },
  { fpr: 0.2, tpr: 0.92 },
  { fpr: 0.3, tpr: 0.95 },
  { fpr: 0.5, tpr: 0.98 },
  { fpr: 1, tpr: 1 },
];

// --- Components ---

const Loader = () => (
  <motion.div 
    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f0f1a]"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
  >
    <div className="relative">
      <motion.div 
        className="w-24 h-24 rounded-full border-4 border-cyan-400/20 border-t-cyan-400 animate-spin"
      />
      <motion.div 
        className="absolute inset-0 flex items-center justify-center font-mono text-cyan-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        AI
      </motion.div>
    </div>
  </motion.div>
);

const Navbar = ({ isDark, toggleTheme }: { isDark: boolean, toggleTheme: () => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-black/20 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-400/20">
            <Activity className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">
            AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Productivity</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {['About', 'Comparison', 'Architecture', 'Demo', 'Results'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="hover:text-cyan-400 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-400" />}
          </button>
          <button className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-white text-sm font-bold hover:scale-105 transition-transform shadow-lg shadow-cyan-400/20">
            Get Started
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random()
            }}
            animate={{ 
              y: [null, "-20px", "20px", null],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: 3 + Math.random() * 5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6">
            Final Year Project 2026
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Employee Productivity <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Monitoring System</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-3xl mx-auto">
            Comparative Analysis of Deep Learning Models for Face Presence Detection 
            using a Hybrid Ensemble Approach.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#comparison"
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all"
            >
              Explore Models
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button className="px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 font-bold text-lg hover:bg-white/10 transition-all">
              View Documentation
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="mt-20 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-slate-500" />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
    </section>
  );
};

const About = () => {
  const features = [
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Real-time Monitoring",
      desc: "Continuous face presence detection to track active working hours and engagement levels."
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Model Comparison",
      desc: "In-depth analysis of MobileNetV2 (Speed) vs ResNet50 (Accuracy) architectures."
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Hybrid Ensemble",
      desc: "A custom weighted fusion model that combines the strengths of both architectures."
    }
  ];

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">About the Project</h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl hover:scale-105 transition-transform duration-300 relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 flex items-center justify-center mb-6 text-cyan-400">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ModelComparison = () => {
  const [view, setView] = useState<'metrics' | 'graphs'>('metrics');

  return (
    <section id="comparison" className="py-24 px-6 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Model Comparison</h2>
            <p className="text-slate-400">Benchmarking performance across key deep learning metrics.</p>
          </div>
          
          <div className="flex p-1 rounded-xl bg-black/50 border border-white/10">
            <button 
              onClick={() => setView('metrics')}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                view === 'metrics' ? "bg-cyan-400 text-black" : "text-slate-400 hover:text-white"
              )}
            >
              Raw Metrics
            </button>
            <button 
              onClick={() => setView('graphs')}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                view === 'graphs' ? "bg-cyan-400 text-black" : "text-slate-400 hover:text-white"
              )}
            >
              Graph View
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === 'metrics' ? (
            <motion.div 
              key="metrics"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="overflow-x-auto"
            >
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-6 px-4 font-mono text-xs uppercase text-slate-500">Model Name</th>
                    <th className="py-6 px-4 font-mono text-xs uppercase text-slate-500">Accuracy</th>
                    <th className="py-6 px-4 font-mono text-xs uppercase text-slate-500">Precision</th>
                    <th className="py-6 px-4 font-mono text-xs uppercase text-slate-500">Recall</th>
                    <th className="py-6 px-4 font-mono text-xs uppercase text-slate-500">F1 Score</th>
                    <th className="py-6 px-4 font-mono text-xs uppercase text-slate-500">Inference (ms)</th>
                    <th className="py-6 px-4 font-mono text-xs uppercase text-slate-500">FPS</th>
                  </tr>
                </thead>
                <tbody>
                  {MODEL_DATA.map((model, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                      <td className="py-6 px-4 font-bold text-lg group-hover:text-cyan-400 transition-colors">
                        {model.name}
                      </td>
                      <td className="py-6 px-4">
                        <span className="px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400 text-sm font-bold">
                          {model.accuracy}%
                        </span>
                      </td>
                      <td className="py-6 px-4 text-slate-300">{model.precision}%</td>
                      <td className="py-6 px-4 text-slate-300">{model.recall}%</td>
                      <td className="py-6 px-4 text-slate-300">{model.f1}%</td>
                      <td className="py-6 px-4 text-purple-500 font-mono">{model.inference}ms</td>
                      <td className="py-6 px-4 text-emerald-400 font-mono">{model.fps}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          ) : (
            <motion.div 
              key="graphs"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl h-[400px]">
                <h3 className="text-xl font-bold mb-6">Accuracy Comparison (%)</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MODEL_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                      cursor={{ fill: '#ffffff05' }}
                    />
                    <Bar dataKey="accuracy" radius={[8, 8, 0, 0]}>
                      {MODEL_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 2 ? '#22d3ee' : '#a855f7'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl h-[400px]">
                <h3 className="text-xl font-bold mb-6">Inference Time (ms) - Lower is Better</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MODEL_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                      cursor={{ fill: '#ffffff05' }}
                    />
                    <Bar dataKey="inference" radius={[8, 8, 0, 0]}>
                      {MODEL_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 2 ? '#a855f7' : '#22d3ee'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Architecture = () => {
  const nodes = [
    { id: 'input', label: 'Camera Input', icon: <Camera />, color: 'cyan-400' },
    { id: 'modelA', label: 'Model A (MobileNet)', icon: <Zap />, color: 'purple-500' },
    { id: 'modelB', label: 'Model B (ResNet)', icon: <ShieldCheck />, color: 'purple-500' },
    { id: 'hybrid', label: 'Hybrid Ensemble', icon: <Layers />, color: 'cyan-400' },
    { id: 'output', label: 'Final Decision', icon: <UserCheck />, color: 'emerald-400' },
  ];

  return (
    <section id="architecture" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">System Architecture</h2>
          <p className="text-slate-400">Visualizing the data flow through our deep learning pipeline.</p>
        </div>

        <div className="relative flex flex-col items-center gap-12">
          {nodes.map((node, i) => (
            <React.Fragment key={node.id}>
              <motion.div
                className={cn(
                  "relative z-10 bg-white/5 backdrop-blur-lg border p-6 rounded-2xl flex items-center gap-4 min-w-[280px]",
                  node.color === 'cyan-400' ? "border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]" : 
                  node.color === 'purple-500' ? "border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]" : 
                  "border-emerald-400/30 shadow-[0_0_15px_rgba(52,211,153,0.2)]"
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center", 
                  node.color === 'cyan-400' ? "bg-cyan-400/10 text-cyan-400" : 
                  node.color === 'purple-500' ? "bg-purple-500/10 text-purple-500" : 
                  "bg-emerald-400/10 text-emerald-400"
                )}>
                  {node.icon}
                </div>
                <span className="font-bold text-lg">{node.label}</span>
                
                {/* Animated Glow */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl blur-xl -z-10 opacity-20", 
                  node.color === 'cyan-400' ? "bg-cyan-400" : 
                  node.color === 'purple-500' ? "bg-purple-500" : 
                  "bg-emerald-400"
                )} />
              </motion.div>
              
              {i < nodes.length - 1 && (
                <motion.div 
                  className="w-1 h-12 bg-gradient-to-b from-cyan-400 to-purple-500"
                  initial={{ height: 0 }}
                  whileInView={{ height: 48 }}
                  viewport={{ once: true }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

const HybridHighlight = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#0f0f1a] to-[#111827] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-500 text-xs font-bold uppercase mb-6">
            <Zap className="w-4 h-4" />
            The Innovation
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Hybrid</span> <br />
            Ensemble Advantage
          </h2>
          
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Weighted Ensemble Approach</h4>
                <p className="text-slate-400">Combining predictions based on confidence scores to minimize false negatives.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                <PieChart className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Feature Fusion Concept</h4>
                <p className="text-slate-400">Merging high-level semantic features from ResNet with low-level spatial features from MobileNet.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-400/10 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Optimized Trade-off</h4>
                <p className="text-slate-400">Achieving 96%+ accuracy while maintaining real-time processing speeds (35+ FPS).</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-[40px] relative z-10">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <BarChart3 className="text-cyan-400" />
              Performance Improvement
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={PERFORMANCE_TREND}>
                  <defs>
                    <linearGradient id="colorHybrid" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="epoch" stroke="#94a3b8" fontSize={10} />
                  <YAxis stroke="#94a3b8" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }}
                  />
                  <Area type="monotone" dataKey="hybrid" stroke="#22d3ee" fillOpacity={1} fill="url(#colorHybrid)" strokeWidth={3} />
                  <Area type="monotone" dataKey="modelB" stroke="#a855f7" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 flex justify-center gap-6 text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400" />
                <span>Hybrid Model</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span>Standard Model B</span>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
};

const DemoMock = () => {
  const [selectedModel, setSelectedModel] = useState('Hybrid');
  const [isDetected, setIsDetected] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsDetected(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="demo" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Live Demo Dashboard</h2>
          <p className="text-slate-400">A conceptual interface of the real-time monitoring system.</p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-4 md:p-8 rounded-[32px] max-w-5xl mx-auto shadow-2xl shadow-black/50">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Camera Frame */}
            <div className="flex-grow aspect-video bg-black/40 rounded-2xl relative overflow-hidden border border-white/5">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                  <p className="text-slate-600 font-mono text-sm uppercase tracking-widest">Camera Feed Placeholder</p>
                </div>
              </div>
              
              {/* Overlay UI */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <div className={cn(
                  "px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors",
                  isDetected ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                )}>
                  <div className={cn("w-2 h-2 rounded-full animate-pulse", isDetected ? "bg-emerald-400" : "bg-red-400")} />
                  {isDetected ? "FACE DETECTED" : "NO FACE DETECTED"}
                </div>
                <div className="px-4 py-1.5 rounded-lg bg-black/40 backdrop-blur-md text-white text-xs font-mono">
                  FPS: {selectedModel === 'Hybrid' ? '35.2' : selectedModel === 'Model A' ? '65.1' : '22.4'}
                </div>
              </div>

              {/* Face Box Mock */}
              <AnimatePresence>
                {isDetected && (
                  <motion.div 
                    className="absolute top-1/4 left-1/3 w-1/3 h-1/2 border-2 border-cyan-400 rounded-2xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <div className="absolute -top-8 left-0 bg-cyan-400 text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      Employee #1042 - {selectedModel}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute bottom-6 right-6 text-[10px] font-mono text-slate-500">
                SYSTEM_TIME: {new Date().toLocaleTimeString()}
              </div>
            </div>

            {/* Controls */}
            <div className="w-full md:w-72 flex flex-col gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-500 uppercase">Active Model</label>
                <div className="grid grid-cols-1 gap-2">
                  {['Model A', 'Model B', 'Hybrid'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedModel(m)}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl text-sm font-bold text-left transition-all border",
                        selectedModel === m 
                          ? "bg-cyan-400/10 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]" 
                          : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Confidence</span>
                  <span className="text-xs font-bold text-cyan-400">98.2%</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-cyan-400"
                    initial={{ width: 0 }}
                    animate={{ width: '98.2%' }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Latency</span>
                  <span className="text-xs font-bold text-purple-500">28ms</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: '30%' }}
                  />
                </div>
              </div>

              <button className="w-full py-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all font-bold flex items-center justify-center gap-2">
                <Settings className="w-4 h-4" />
                System Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Results = () => {
  return (
    <section id="results" className="py-24 px-6 bg-black/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Results & Conclusion</h2>
          <p className="text-slate-400">Final performance analysis and project summary.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6">ROC Curve Analysis</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ROC_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                  <XAxis dataKey="fpr" label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5, fontSize: 10 }} stroke="#94a3b8" fontSize={10} />
                  <YAxis label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft', fontSize: 10 }} stroke="#94a3b8" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                  <Line type="monotone" dataKey="tpr" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4, fill: '#22d3ee' }} />
                  {/* Baseline */}
                  <Line type="monotone" dataKey="fpr" stroke="#ffffff20" strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-6 text-sm text-slate-500 italic">The Hybrid Model shows an Area Under Curve (AUC) of 0.982, indicating superior classification capability.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6">Confusion Matrix (Hybrid)</h3>
            <div className="grid grid-cols-2 gap-4 h-[300px]">
              <div className="flex flex-col items-center justify-center bg-cyan-400/20 rounded-2xl border border-cyan-400/30">
                <span className="text-3xl font-black text-cyan-400">972</span>
                <span className="text-[10px] font-mono uppercase text-slate-400 mt-2">True Positive</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-white/5 rounded-2xl border border-white/10">
                <span className="text-3xl font-black text-slate-400">28</span>
                <span className="text-[10px] font-mono uppercase text-slate-400 mt-2">False Negative</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-white/5 rounded-2xl border border-white/10">
                <span className="text-3xl font-black text-slate-400">14</span>
                <span className="text-[10px] font-mono uppercase text-slate-400 mt-2">False Positive</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-purple-500/20 rounded-2xl border border-purple-500/30">
                <span className="text-3xl font-black text-purple-500">986</span>
                <span className="text-[10px] font-mono uppercase text-slate-400 mt-2">True Negative</span>
              </div>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <span className="text-sm font-bold">Overall Accuracy:</span>
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">96.8%</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-cyan-400/20 p-12 rounded-[40px] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400" />
          <h3 className="text-3xl font-bold mb-6">Conclusion</h3>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            The <span className="text-cyan-400 font-bold">Hybrid Deep Learning Model</span> successfully achieves the optimal trade-off 
            between computational efficiency and detection accuracy. By leveraging the fast feature extraction of MobileNetV2 
            and the robust classification of ResNet50, the system provides a production-ready solution for 
            <span className="text-purple-500 font-bold"> real-time employee productivity monitoring</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Activity className="text-cyan-400 w-6 h-6" />
            <span className="font-bold text-lg">AI Productivity Monitor</span>
          </div>
          <p className="text-slate-500 text-sm">Final Year Project © 2026</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-xs font-mono text-slate-500">
          <span className="px-3 py-1 rounded-full bg-white/5">React</span>
          <span className="px-3 py-1 rounded-full bg-white/5">Tailwind CSS</span>
          <span className="px-3 py-1 rounded-full bg-white/5">Framer Motion</span>
          <span className="px-3 py-1 rounded-full bg-white/5">Recharts</span>
          <span className="px-3 py-1 rounded-full bg-white/5">TensorFlow</span>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-3 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-colors">
            <Github className="w-5 h-5" />
          </button>
          <button className="px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:scale-105 transition-transform">
            Contact Researcher
          </button>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("min-h-screen font-sans selection:bg-cyan-400 selection:text-black", isDark ? "bg-[#0f0f1a] text-slate-200" : "bg-slate-50 text-slate-900")}>
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>

      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-400 z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      
      <main className="relative">
        {/* Animated Background Gradient */}
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:40px_40px] opacity-20" />
        <div className="fixed inset-0 -z-20 bg-gradient-to-br from-[#0f0f1a] via-[#111827] to-[#0f0f1a] animate-gradient bg-[length:400%_400%]" />

        <Hero />
        <About />
        <ModelComparison />
        <Architecture />
        <HybridHighlight />
        <DemoMock />
        <Results />
      </main>

      <Footer />
    </div>
  );
}
