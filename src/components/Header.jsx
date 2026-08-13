import React from 'react';
import { Camera, User, Sparkles, Clock, Crown } from 'lucide-react';

export default function Header({ trialStatus, onOpenProfile, onOpenCamera, onOpenPaywall }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between">
        
        {/* App Title & Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/20">
            <Sparkles className="w-4 h-4 text-slate-950 font-bold" />
          </div>
          <div>
            <h1 className="font-black text-lg tracking-tight bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-100 bg-clip-text text-transparent">
              sukhihu
            </h1>
            <p className="text-[9px] text-emerald-400/70 font-semibold -mt-1 tracking-wider uppercase">
              DRI Nutrition Tracker
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          
          {/* Trial / Subscription Badge */}
          {trialStatus?.isSubscribed ? (
            <div
              onClick={onOpenPaywall}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-[11px] font-bold cursor-pointer"
            >
              <Crown className="w-3 h-3 fill-emerald-400" />
              <span>PRO</span>
            </div>
          ) : (
            <div
              onClick={onOpenPaywall}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[11px] font-medium cursor-pointer animate-pulse"
            >
              <Clock className="w-3 h-3" />
              <span>Trial: {trialStatus?.formattedTimeLeft || '24h'}</span>
            </div>
          )}

          {/* Quick Camera Trigger */}
          <button
            type="button"
            onClick={onOpenCamera}
            className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-200 hover:text-emerald-400 hover:border-emerald-500/40 transition active:scale-95"
            title="Scan Food Photo"
          >
            <Camera className="w-4 h-4" />
          </button>

          {/* Profile Shortcut */}
          <button
            type="button"
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-200 hover:text-emerald-400 hover:border-emerald-500/40 transition active:scale-95"
            title="Profile & Settings"
          >
            <User className="w-4 h-4" />
          </button>

        </div>
      </div>
    </header>
  );
}
