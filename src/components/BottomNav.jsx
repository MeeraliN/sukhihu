import React from 'react';
import { LayoutDashboard, Sparkles, Camera, Calendar, User } from 'lucide-react';

export default function BottomNav({ activeTab, onTabChange, onOpenCamera }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800/80 px-2 py-2">
      <div className="max-w-md mx-auto flex items-center justify-around">
        
        {/* Dashboard */}
        <button
          type="button"
          onClick={() => onTabChange('dashboard')}
          className={`flex flex-col items-center gap-1 p-1.5 transition ${
            activeTab === 'dashboard' ? 'text-emerald-400 font-bold' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px]">Dashboard</span>
        </button>

        {/* Recommender */}
        <button
          type="button"
          onClick={() => onTabChange('recommender')}
          className={`flex flex-col items-center gap-1 p-1.5 transition ${
            activeTab === 'recommender' ? 'text-emerald-400 font-bold' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px]">Recommend</span>
        </button>

        {/* Floating Center AI Camera Button */}
        <button
          type="button"
          onClick={onOpenCamera}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/40 transform -translate-y-3 border-2 border-slate-950 transition active:scale-95"
          title="Scan Food Picture"
        >
          <Camera className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* 14-Day Meal Planner */}
        <button
          type="button"
          onClick={() => onTabChange('planner')}
          className={`flex flex-col items-center gap-1 p-1.5 transition ${
            activeTab === 'planner' ? 'text-emerald-400 font-bold' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px]">14-Day Plan</span>
        </button>

        {/* Profile */}
        <button
          type="button"
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center gap-1 p-1.5 transition ${
            activeTab === 'profile' ? 'text-emerald-400 font-bold' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">Profile</span>
        </button>

      </div>
    </nav>
  );
}