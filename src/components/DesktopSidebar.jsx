import React from 'react';
import { LayoutDashboard, Sparkles, Camera, Calendar, Utensils, User, Crown, Clock, Download } from 'lucide-react';

export default function DesktopSidebar({
  activeTab,
  onTabChange,
  onOpenCamera,
  trialStatus,
  onOpenPaywall
}) {
  return (
    <aside className="hidden md:flex flex-col justify-between w-64 bg-slate-950 border-r border-slate-900 p-5 h-screen sticky top-0 shrink-0">
      
      {/* Top Section */}
      <div className="space-y-6">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <Sparkles className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-100 bg-clip-text text-transparent">
              sukhihu
            </h1>
            <p className="text-[10px] text-emerald-400/80 font-semibold tracking-wider uppercase">
              Cross-Platform Nutrition
            </p>
          </div>
        </div>

        {/* PRO / Trial Badge */}
        <div
          onClick={onOpenPaywall}
          className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/30 flex items-center justify-between cursor-pointer hover:border-amber-500/60 transition"
        >
          <div className="flex items-center gap-2">
            {trialStatus?.isSubscribed ? (
              <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
            ) : (
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
            )}
            <div>
              <div className="text-xs font-bold text-amber-300">
                {trialStatus?.isSubscribed ? 'PRO Membership' : '1-Day Free Trial'}
              </div>
              <div className="text-[10px] text-amber-400/80">
                {trialStatus?.isSubscribed ? 'Unlimited Access' : `${trialStatus?.formattedTimeLeft} remaining`}
              </div>
            </div>
          </div>
          <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-500 text-slate-950 uppercase">
            {trialStatus?.isSubscribed ? 'Active' : 'Upgrade'}
          </span>
        </div>

        {/* Quick Camera Scan Action Button */}
        <button
          type="button"
          onClick={onOpenCamera}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition active:scale-95"
        >
          <Camera className="w-4 h-4 stroke-[2.5]" />
          <span>Scan Food Photo</span>
        </button>

        {/* Navigation Items */}
        <nav className="space-y-1.5 pt-2">
          {[
            { id: 'dashboard', label: 'Nutrient Dashboard', icon: LayoutDashboard },
            { id: 'recommender', label: 'Food Recommender', icon: Sparkles },
            { id: 'planner', label: '14-Day Meal Plan', icon: Calendar },
            { id: 'history', label: 'Meal Logs Timeline', icon: Utensils },
            { id: 'profile', label: 'Profile & Settings', icon: User }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`w-full py-2.5 px-3.5 rounded-xl font-bold text-xs flex items-center gap-3 transition ${
                  isActive
                    ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

      </div>

      {/* Bottom Footer Info */}
      <div className="pt-4 border-t border-slate-900 text-center space-y-2">
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-semibold">
          <Download className="w-3.5 h-3.5 text-emerald-400" />
          <span>Installable PWA & Native App</span>
        </div>
        <p className="text-[10px] text-slate-500">
          Works on iOS, Android, Windows, Mac, Linux, iPad, and Web.
        </p>
      </div>

    </aside>
  );
}
