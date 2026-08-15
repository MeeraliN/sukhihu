import React from 'react';
import { LayoutDashboard, Sparkles, CalendarDays, History, User, Camera, Crown, Download } from 'lucide-react';
import { triggerInstantAppInstall } from '../services/appInstaller';

export default function DesktopSidebar({ activeTab, onTabChange, onOpenCamera, trialStatus, onOpenPaywall }) {
  const navItems = [
    { id: 'dashboard', label: 'Nutrient Dashboard', icon: LayoutDashboard },
    { id: 'recommender', label: 'Food Recommender', icon: Sparkles },
    { id: 'planner', label: '14-Day AI Meal Plan', icon: CalendarDays },
    { id: 'history', label: 'Daily Meal Log', icon: History },
    { id: 'profile', label: 'My Profile & Routine', icon: User }
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-950 border-r border-slate-900 min-h-screen p-5 shrink-0 sticky top-0 h-screen justify-between">
      
      {/* Top Logo & App Title */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <Sparkles className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          <div>
            <h1 className="font-black text-xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-100 bg-clip-text text-transparent leading-none">
              sukhihu
            </h1>
            <span className="text-[10px] text-emerald-400/80 font-bold uppercase tracking-wider">
              Dietary Intakes (DRI)
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-extrabold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950 stroke-[2.5]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Action Cards: AI Camera Scan, Pro Upgrade & Instant App Install */}
      <div className="space-y-3 pt-4 border-t border-slate-900">
        
        {/* Instant App Download Button */}
        <button
          type="button"
          onClick={triggerInstantAppInstall}
          className="w-full p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-slate-200 text-xs font-black flex items-center justify-between transition group active:scale-95"
        >
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>Install / Download App</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold">✓ Direct</span>
        </button>

        {/* Scan Food Photo Button */}
        <button
          type="button"
          onClick={onOpenCamera}
          className="w-full p-3 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-900/90 border border-slate-800 hover:border-emerald-500/50 text-slate-200 text-xs font-black flex items-center gap-2.5 transition group"
        >
          <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition">
            <Camera className="w-3.5 h-3.5" />
          </div>
          <span>Scan Food Photo</span>
        </button>

        {/* Subscription Status Card */}
        <div
          onClick={onOpenPaywall}
          className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 cursor-pointer hover:border-amber-500/60 transition space-y-1"
        >
          <div className="flex items-center justify-between text-xs font-black text-amber-300">
            <span className="flex items-center gap-1">
              <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              {trialStatus?.isSubscribed ? 'PRO Active' : 'Free Trial'}
            </span>
            <span className="text-[10px] text-amber-400 font-bold">{trialStatus?.formattedTimeLeft}</span>
          </div>
          <p className="text-[10px] text-slate-400">
            {trialStatus?.isSubscribed ? 'Full Access Unlocked' : 'Tap to Upgrade ($20 / ₹20)'}
          </p>
        </div>

      </div>

    </aside>
  );
}
