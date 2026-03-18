import React from 'react';
import { 
  LayoutDashboard, 
  Music, 
  Mic2, 
  Share2, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  LogOut,
  Zap,
  Layers,
  Cpu
} from 'lucide-react';

const NAV_ITEMS = [
  { icon: <LayoutDashboard />, label: 'Dashboard', active: false },
  { icon: <Music />, label: 'Music Library', active: false },
  { icon: <Mic2 />, label: 'Voice Studio', active: false },
  { icon: <Share2 />, label: 'Promotions', active: true },
  { icon: <BarChart3 />, label: 'Analytics', active: false },
  { icon: <Layers />, label: 'Production', active: false },
  { icon: <Cpu />, label: 'AI Tools', active: false },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-72 h-screen bg-brand-dark border-r border-white/5 flex flex-col p-6 gap-8">
      <div className="flex items-center gap-3 px-2">
        <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
          <Zap className="w-6 h-6 text-brand-dark" />
        </div>
        <h1 className="text-xl font-display font-bold text-white tracking-tighter uppercase">
          Omni<span className="text-brand-primary">Sound</span>
        </h1>
      </div>

      <nav className="flex flex-col gap-2">
        {NAV_ITEMS.map((item, index) => (
          <button
            key={index}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              item.active 
                ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20' 
                : 'text-brand-muted hover:text-white hover:bg-white/5'
            }`}
          >
            {React.cloneElement(item.icon as React.ReactElement, { className: 'w-5 h-5' })}
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-2">
        <button className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold text-brand-muted hover:text-white hover:bg-white/5 transition-all">
          <Settings className="w-5 h-5" />
          Settings
        </button>
        <button className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold text-brand-muted hover:text-white hover:bg-white/5 transition-all">
          <HelpCircle className="w-5 h-5" />
          Support
        </button>
        <div className="mt-4 pt-4 border-t border-white/5">
          <button className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold text-red-500/70 hover:text-red-500 hover:bg-red-500/5 transition-all w-full">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};
