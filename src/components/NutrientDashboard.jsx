import React, { useState } from 'react';
import { getNutrientStatus, formatNutrientVal } from '../services/driCalculator';
import { Sparkles, Info, ShieldAlert, CheckCircle2, Flame, ShieldCheck, AlertTriangle, Droplets, Plus } from 'lucide-react';

export default function NutrientDashboard({ currentIntake, driTargets, profile, onSearchFood, onOpenWaterModal }) {
  const [activeTab, setActiveTab] = useState('vitamins'); // 'vitamins' | 'minerals' | 'macros'
  const [selectedNutrient, setSelectedNutrient] = useState(null);

  if (!driTargets) return null;

  const targetCalories = driTargets.calories?.target || 2000;
  const loggedCalories = formatNutrientVal(currentIntake.calories || 0);
  const remainingCalories = formatNutrientVal(Math.max(0, targetCalories - loggedCalories));
  const caloriePct = Math.min(100, Math.round((loggedCalories / targetCalories) * 100));

  // HOURLY TIME-AWARE WATER INTAKE PACE & COLOR TRACING
  const waterTargetMl = driTargets.water?.target || 3500;
  const loggedWaterMl = currentIntake.water || 0;

  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  
  const wakeHour = Number(profile.routine?.wakeTime?.split(':')[0] || 7);
  const bedHour = Number(profile.routine?.bedTime?.split(':')[0] || 22);

  const activeHoursPassed = Math.max(0.1, Math.min(15, currentHour - wakeHour));
  const totalActiveHours = Math.max(8, bedHour - wakeHour);
  const dayPaceRatio = Math.max(0.1, Math.min(1.0, activeHoursPassed / totalActiveHours));

  const expectedWaterByNowMl = Math.round(waterTargetMl * dayPaceRatio);
  const isHydrationOnTrackByNow = loggedWaterMl >= (expectedWaterByNowMl * 0.8);

  // WATER CARD DYNAMIC COLOR THEME
  const outerWaterCardTheme = loggedWaterMl >= (waterTargetMl * 1.5)
    ? {
        bg: 'from-rose-950/40 via-slate-900 to-slate-900 border-rose-500/50',
        text: 'text-rose-400',
        iconBg: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
        badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        btnBg: 'bg-rose-500 hover:bg-rose-400 text-slate-950',
        bar: 'from-rose-500 to-red-600',
        badgeText: '🔴 Exceeded Daily Limit'
      }
    : isHydrationOnTrackByNow
    ? {
        bg: 'from-cyan-950/40 via-slate-900 to-slate-900 border-cyan-500/50',
        text: 'text-cyan-300',
        iconBg: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
        badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
        btnBg: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950',
        bar: 'from-cyan-500 to-emerald-400',
        badgeText: `🟢 Hydration Pace: On Track for ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      }
    : {
        bg: 'from-amber-950/40 via-slate-900 to-slate-900 border-amber-500/50',
        text: 'text-amber-300',
        iconBg: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
        badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        btnBg: 'bg-amber-500 hover:bg-amber-400 text-slate-950',
        bar: 'from-amber-500 to-yellow-400',
        badgeText: `🟡 Hydration Pace: Catching Up (${expectedWaterByNowMl}ml expected by now)`
      };

  // Filter keys by category
  const nutrientKeys = Object.keys(driTargets).filter(key => {
    const cat = driTargets[key].cat;
    if (activeTab === 'vitamins') return cat === 'vitamin';
    if (activeTab === 'minerals') return cat === 'mineral';
    if (activeTab === 'macros') return cat === 'macro';
    return true;
  });

  const mitigationNote = driTargets.issueMitigationNote;

  return (
    <div className="space-y-4 pb-20">

      {/* 1. TOPMOST: FULLY CLICKABLE DYNAMIC COLOR-TRACEABLE WATER INTAKE CARD */}
      <div
        onClick={onOpenWaterModal}
        className={`glass-card p-4 rounded-2xl border bg-gradient-to-br ${outerWaterCardTheme.bg} space-y-3 cursor-pointer hover:border-cyan-400/80 transition-all duration-300 active:scale-[0.99]`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-xl border flex items-center justify-center ${outerWaterCardTheme.iconBg}`}>
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-100 text-sm">Hydration & Water Intake</h3>
              <p className={`text-[10px] font-semibold ${outerWaterCardTheme.text}`}>{loggedWaterMl} / {waterTargetMl} ml Logged</p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenWaterModal();
            }}
            className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1 transition shadow-md ${outerWaterCardTheme.btnBg}`}
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" /> Log Water
          </button>
        </div>

        {/* Dynamic Color Pace Badge */}
        <div className={`p-2.5 rounded-xl border text-xs font-extrabold flex items-center justify-between ${outerWaterCardTheme.badgeBg}`}>
          <span>{outerWaterCardTheme.badgeText}</span>
          <span className="text-[10px] opacity-80">Tap to Open Tracker</span>
        </div>

        {/* Color Traceable Water Progress Bar */}
        <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
          <div
            className={`h-full bg-gradient-to-r ${outerWaterCardTheme.bar} transition-all duration-500`}
            style={{ width: `${Math.min(100, Math.round((loggedWaterMl / waterTargetMl) * 100))}%` }}
          />
        </div>
      </div>

      {/* 2. SECOND: AUTOMATIC CALORIE CALCULATOR CARD */}
      <div className="glass-card p-4 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-slate-900 via-amber-950/20 to-slate-900 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-100 text-sm">Automatic Calorie Calculator</h3>
              <p className="text-[10px] text-amber-400 font-semibold">Real-Time Daily Energy Budget</p>
            </div>
          </div>
          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
            loggedCalories > targetCalories
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
          }`}>
            {loggedCalories > targetCalories ? '🔴 Over Budget' : '🟢 Within Caloric Budget'}
          </span>
        </div>

        {/* Calorie Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-semibold">Logged: <strong className="text-amber-400">{loggedCalories} kcal</strong></span>
            <span className="text-slate-300 font-semibold">Budget: <strong className="text-slate-100">{targetCalories} kcal</strong></span>
          </div>

          <div className="w-full bg-slate-950/80 h-3 rounded-full overflow-hidden border border-slate-800">
            <div
              className={`h-full transition-all duration-300 ${
                loggedCalories > targetCalories
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                  : 'bg-gradient-to-r from-amber-500 to-emerald-400'
              }`}
              style={{ width: `${caloriePct}%` }}
            />
          </div>
        </div>

        {/* Remaining Caloric Room */}
        <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Remaining Caloric Room Today:</span>
          <span className="font-extrabold text-emerald-400">{remainingCalories} kcal</span>
        </div>
      </div>

      {/* 3. THIRD: ISSUE TARGET ADJUSTMENT & SIDE EFFECT MITIGATION BANNER */}
      {mitigationNote && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-950/70 via-slate-900 to-slate-900 border border-teal-500/40 space-y-2">
          <div className="flex items-center gap-2 text-teal-300 text-xs font-extrabold">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Health Focus & Side-Effect Mitigation Solution</span>
          </div>
          <p className="text-xs text-slate-300 font-semibold">
            {mitigationNote.issueName}: <span className="text-amber-400">{mitigationNote.adjustedNutrient}</span>
          </p>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 space-y-1">
            <div className="text-rose-400 font-bold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Risk / Side Effect: {mitigationNote.sideEffect}
            </div>
            <div className="text-teal-300 font-medium">
              {mitigationNote.mitigationSolution}
            </div>
          </div>
        </div>
      )}

      {/* 4. FOURTH: CATEGORY NAVIGATION TABS */}
      <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('vitamins')}
          className={`flex-1 py-2 rounded-lg transition ${
            activeTab === 'vitamins' ? 'bg-emerald-500 text-slate-950 font-bold shadow' : 'text-slate-400'
          }`}
        >
          Vitamins ({Object.keys(driTargets).filter(k => driTargets[k].cat === 'vitamin').length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('minerals')}
          className={`flex-1 py-2 rounded-lg transition ${
            activeTab === 'minerals' ? 'bg-emerald-500 text-slate-950 font-bold shadow' : 'text-slate-400'
          }`}
        >
          Minerals ({Object.keys(driTargets).filter(k => driTargets[k].cat === 'mineral').length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('macros')}
          className={`flex-1 py-2 rounded-lg transition ${
            activeTab === 'macros' ? 'bg-emerald-500 text-slate-950 font-bold shadow' : 'text-slate-400'
          }`}
        >
          Macronutrients
        </button>
      </div>

      {/* 5. FIFTH: VITAMINS, MINERALS & MACRONUTRIENT CARDS GRID */}
      <div className="space-y-2.5">
        {nutrientKeys.map(key => {
          const targetObj = driTargets[key];
          const loggedValue = formatNutrientVal(currentIntake[key] || 0);
          const status = getNutrientStatus(loggedValue, targetObj);
          const pct = Math.min(100, Math.round((loggedValue / targetObj.target) * 100));

          return (
            <div
              key={key}
              onClick={() => setSelectedNutrient({ key, targetObj, loggedValue, status, pct })}
              className={`p-3.5 rounded-xl border transition cursor-pointer glass-card-hover ${status.bg}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <div className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                    <span>{targetObj.label}</span>
                    <Info className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <div className="text-xs text-slate-400">
                    <span className="font-semibold text-slate-200">{loggedValue}</span> / {formatNutrientVal(targetObj.target)} {targetObj.unit}
                  </div>
                </div>

                {/* Explicit Color Badge */}
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                  status.color === 'green' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' :
                  status.color === 'red' ? 'bg-rose-500/20 border-rose-500/50 text-rose-300' :
                  'bg-amber-500/20 border-amber-500/50 text-amber-300'
                }`}>
                  {status.badge}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-950/60 h-2 rounded-full overflow-hidden border border-slate-800/50">
                <div
                  className={`h-full transition-all duration-300 ${
                    status.color === 'green' ? 'bg-gradient-to-r from-emerald-500 to-teal-400' :
                    status.color === 'red' ? 'bg-gradient-to-r from-rose-500 to-red-600' :
                    'bg-gradient-to-r from-amber-500 to-yellow-400'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Nutrient Details Modal */}
      {selectedNutrient && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-5 space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-lg text-slate-100">{selectedNutrient.targetObj.label}</h3>
                <p className="text-xs text-slate-400">USDA Official Reference Standard</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedNutrient(null)}
                className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Logged Today</div>
                  <div className="text-lg font-bold text-emerald-400">
                    {formatNutrientVal(selectedNutrient.loggedValue)} {selectedNutrient.targetObj.unit}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Daily Target (RDA)</div>
                  <div className="text-lg font-bold text-slate-200">
                    {formatNutrientVal(selectedNutrient.targetObj.target)} {selectedNutrient.targetObj.unit}
                  </div>
                </div>
              </div>

              {selectedNutrient.targetObj.upperLimit && (
                <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                  <span>Tolerable Upper Limit (UL): {formatNutrientVal(selectedNutrient.targetObj.upperLimit)} {selectedNutrient.targetObj.unit}</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedNutrient(null);
                    onSearchFood(selectedNutrient.key);
                  }}
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition"
                >
                  Find Foods High in {selectedNutrient.targetObj.label}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
