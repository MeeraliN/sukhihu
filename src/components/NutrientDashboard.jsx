import React, { useState } from 'react';
import { getNutrientStatus } from '../services/driCalculator';
import { Sparkles, Info, ShieldAlert, CheckCircle2, Flame, Droplets, Leaf } from 'lucide-react';

export default function NutrientDashboard({ currentIntake, driTargets, profile, onSearchFood }) {
  const [activeTab, setActiveTab] = useState('vitamins'); // 'vitamins' | 'minerals' | 'macros'
  const [selectedNutrient, setSelectedNutrient] = useState(null);

  if (!driTargets) return null;

  // Filter keys by category
  const nutrientKeys = Object.keys(driTargets).filter(key => {
    const cat = driTargets[key].cat;
    if (activeTab === 'vitamins') return cat === 'vitamin';
    if (activeTab === 'minerals') return cat === 'mineral';
    if (activeTab === 'macros') return cat === 'macro';
    return true;
  });

  // Calculate Overall Completion Score across all nutrients
  let totalScoreRatioSum = 0;
  const allKeys = Object.keys(driTargets);
  allKeys.forEach(k => {
    const t = driTargets[k].target;
    const c = currentIntake[k] || 0;
    const r = Math.min(100, (c / t) * 100);
    totalScoreRatioSum += r;
  });
  const overallScore = Math.round(totalScoreRatioSum / allKeys.length);

  return (
    <div className="space-y-4 pb-20">
      
      {/* Overview Daily Score Card */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/30 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DAILY DRI NUTRIENT COVERAGE</span>
            </div>
            <h2 className="text-2xl font-black text-slate-100">{overallScore}% Achieved</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Personalized for {profile.heightCm}cm, {profile.weightKg}kg • {profile.dietaryPreference.toUpperCase()}
            </p>
          </div>

          {/* Progress Circular Dial */}
          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-400 transition-all duration-500"
                strokeDasharray={`${overallScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-black text-slate-100">{overallScore}%</span>
          </div>
        </div>

        {/* Quick status counters */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-center">
          <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800/60">
            <div className="text-[10px] text-slate-400 uppercase font-bold">Vitamins</div>
            <div className="text-sm font-bold text-slate-200 mt-0.5">
              {Object.keys(driTargets).filter(k => driTargets[k].cat === 'vitamin').length} tracked
            </div>
          </div>
          <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800/60">
            <div className="text-[10px] text-slate-400 uppercase font-bold">Minerals</div>
            <div className="text-sm font-bold text-slate-200 mt-0.5">
              {Object.keys(driTargets).filter(k => driTargets[k].cat === 'mineral').length} tracked
            </div>
          </div>
          <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800/60">
            <div className="text-[10px] text-slate-400 uppercase font-bold">Accuracy</div>
            <div className="text-sm font-bold text-emerald-400 mt-0.5">100% USDA</div>
          </div>
        </div>
      </div>

      {/* Category Navigation Tabs */}
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

      {/* Nutrient Cards Grid */}
      <div className="space-y-2.5">
        {nutrientKeys.map(key => {
          const targetObj = driTargets[key];
          const loggedValue = currentIntake[key] || 0;
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
                    <span className="font-semibold text-slate-200">{loggedValue}</span> / {targetObj.target} {targetObj.unit}
                  </div>
                </div>

                {/* Explicit Color Badge */}
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                  status.color === 'green' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' :
                  status.color === 'red' ? 'bg-red-500/20 border-red-500/50 text-red-300' :
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
                    status.color === 'red' ? 'bg-gradient-to-r from-red-500 to-rose-400' :
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
                    {selectedNutrient.loggedValue} {selectedNutrient.targetObj.unit}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Daily Target (RDA)</div>
                  <div className="text-lg font-bold text-slate-200">
                    {selectedNutrient.targetObj.target} {selectedNutrient.targetObj.unit}
                  </div>
                </div>
              </div>

              {selectedNutrient.targetObj.upperLimit && (
                <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                  <span>Tolerable Upper Limit (UL): {selectedNutrient.targetObj.upperLimit} {selectedNutrient.targetObj.unit}</span>
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
