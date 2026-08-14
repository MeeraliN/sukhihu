import React from 'react';
import { Camera, User, Crown, Clock, Droplets, Sparkles } from 'lucide-react';

export default function Header({
  trialStatus,
  onOpenProfile,
  onOpenCamera,
  onOpenPaywall,
  onOpenWaterModal,
  loggedWaterMl = 0,
  waterTargetMl = 3500,
  profile
}) {
  // HOURLY TIME-AWARE WATER INTAKE PACE & COLOR TRACING FOR TOPMOST HEADER BUTTON
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  
  const wakeHour = Number(profile?.routine?.wakeTime?.split(':')[0] || 7);
  const bedHour = Number(profile?.routine?.bedTime?.split(':')[0] || 22);

  const activeHoursPassed = Math.max(0.1, Math.min(15, currentHour - wakeHour));
  const totalActiveHours = Math.max(8, bedHour - wakeHour);
  const dayPaceRatio = Math.max(0.1, Math.min(1.0, activeHoursPassed / totalActiveHours));

  const expectedWaterByNowMl = Math.round(waterTargetMl * dayPaceRatio);
  const isHydrationOnTrackByNow = loggedWaterMl >= (expectedWaterByNowMl * 0.8);

  // TOPMOST WATER BUTTON DYNAMIC COLOR THEME
  const topWaterBtnTheme = loggedWaterMl >= (waterTargetMl * 1.5)
    ? 'bg-rose-950/80 border-rose-500/60 text-rose-300'
    : isHydrationOnTrackByNow
    ? 'bg-cyan-950/80 border-cyan-500/60 text-cyan-300'
    : 'bg-amber-950/80 border-amber-500/60 text-amber-300';

  return (
    <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 px-4 py-3 flex items-center justify-between">
      
      {/* Brand Title */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <Sparkles className="w-4 h-4 text-slate-950 font-bold" />
        </div>
        <div>
          <h1 className="font-black text-lg tracking-tight bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-100 bg-clip-text text-transparent leading-none">
            sukhihu
          </h1>
          <span className="text-[9px] text-emerald-400/80 font-bold uppercase tracking-wider">
            Daily Nutrition DRI
          </span>
        </div>
      </div>

      {/* Top Action Items */}
      <div className="flex items-center gap-2">
        
        {/* DYNAMIC COLOR-TRACEABLE TOPMOST WATER BUTTON */}
        <button
          type="button"
          onClick={onOpenWaterModal}
          className={`px-2.5 py-1 rounded-xl border text-xs font-extrabold flex items-center gap-1.5 transition ${topWaterBtnTheme}`}
          title="Open Water Tracker & Timings"
        >
          <Droplets className="w-3.5 h-3.5" />
          <span>{loggedWaterMl}/{waterTargetMl}ml</span>
        </button>

        {/* PRO / Trial Badge */}
        <button
          type="button"
          onClick={onOpenPaywall}
          className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/40 text-amber-300 text-[11px] font-black flex items-center gap-1 hover:border-amber-400 transition"
        >
          {trialStatus?.isSubscribed ? (
            <>
              <Crown className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>PRO</span>
            </>
          ) : (
            <>
              <Clock className="w-3 h-3 text-amber-400" />
              <span>{trialStatus?.formattedTimeLeft}</span>
            </>
          )}
        </button>

        {/* AI Camera Icon */}
        <button
          type="button"
          onClick={onOpenCamera}
          className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center hover:border-emerald-500/50 hover:text-emerald-400 transition"
          title="Scan Food Photo"
        >
          <Camera className="w-4 h-4" />
        </button>

        {/* Profile Avatar */}
        <button
          type="button"
          onClick={onOpenProfile}
          className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md shadow-emerald-500/20 hover:opacity-90 transition"
          title="Edit Profile"
        >
          <User className="w-4 h-4 stroke-[2.5]" />
        </button>

      </div>

    </header>
  );
}
