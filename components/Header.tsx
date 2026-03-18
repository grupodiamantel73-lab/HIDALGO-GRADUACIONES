import React from 'react';
import { Search, Bell, User } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-brand-dark/50 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-4 bg-brand-surface rounded-2xl px-4 py-2 border border-white/5 w-96">
        <Search className="w-4 h-4 text-brand-muted" />
        <input 
          type="text" 
          placeholder="Search projects, tracks, or analytics..." 
          className="bg-transparent border-none text-sm text-white focus:outline-none w-full"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 hover:bg-white/5 rounded-xl transition-all">
          <Bell className="w-5 h-5 text-brand-muted" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-brand-secondary rounded-full border-2 border-brand-dark" />
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-white">Nailea Omni</p>
            <p className="text-[10px] text-brand-muted uppercase tracking-widest font-bold">Pro Producer</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary p-0.5">
            <div className="w-full h-full rounded-[10px] bg-brand-dark flex items-center justify-center overflow-hidden">
              <User className="w-6 h-6 text-brand-primary" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
