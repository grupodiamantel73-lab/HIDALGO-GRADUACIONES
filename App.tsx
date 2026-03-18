import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Promotions } from './components/Promotions';

const App: React.FC = () => {
  return (
    <div className="flex h-screen bg-brand-dark text-brand-light overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-display font-bold text-white tracking-tight">
                Welcome back, <span className="text-brand-primary">Nailea</span>
              </h1>
              <p className="text-brand-muted">Your intelligent music ecosystem is ready.</p>
            </div>

            <Promotions />
            
            {/* Other sections could go here */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-brand-surface/50 border border-white/5 rounded-3xl p-6 flex flex-col gap-4">
                <h3 className="font-bold text-white">Recent Activity</h3>
                <div className="flex flex-col gap-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                      <div className="w-2 h-2 rounded-full bg-brand-primary" />
                      <p className="text-xs text-brand-muted">New track "Midnight Echoes" uploaded to library.</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-brand-surface/50 border border-white/5 rounded-3xl p-6 flex flex-col gap-4">
                <h3 className="font-bold text-white">AI Insights</h3>
                <div className="p-4 bg-brand-primary/5 border border-brand-primary/20 rounded-2xl">
                  <p className="text-sm text-brand-light italic">
                    "Your latest release is trending in the Lo-fi community. Consider a TikTok campaign to boost engagement."
                  </p>
                </div>
              </div>

              <div className="bg-brand-surface/50 border border-white/5 rounded-3xl p-6 flex flex-col gap-4">
                <h3 className="font-bold text-white">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <p className="text-[10px] text-brand-muted uppercase font-bold">Total Streams</p>
                    <p className="text-lg font-display font-bold text-white">1.2M</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <p className="text-[10px] text-brand-muted uppercase font-bold">Followers</p>
                    <p className="text-lg font-display font-bold text-white">45K</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
