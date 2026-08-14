import React, { useState } from 'react';
import { generate14DayMealPlan } from '../services/mealPlanner';
import { Calendar, CheckCircle2, Sparkles, Utensils, RefreshCw, Plus, ShieldCheck, Flame } from 'lucide-react';

export default function MealPlannerView({ profile, driTargets, onAddFoodToLog }) {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [mealPlan, setMealPlan] = useState(() => generate14DayMealPlan(profile, driTargets));

  const currentDay = mealPlan[activeDayIndex] || mealPlan[0];

  const handleRegenerate = () => {
    const freshPlan = generate14DayMealPlan(profile, driTargets);
    setMealPlan(freshPlan);
  };

  const handleLogWholeDay = () => {
    currentDay.meals.forEach((m) => {
      onAddFoodToLog(m.food, m.portionGram);
      if (m.secondaryFood) {
        onAddFoodToLog(m.secondaryFood, 150);
      }
    });
  };

  return (
    <div className="space-y-4 pb-20">
      
      {/* Top Banner Card */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 bg-gradient-to-br from-teal-950/40 via-slate-900 to-slate-900">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold">
            <Calendar className="w-4 h-4" />
            <span>14-DAY (2-WEEK) AUTOMATED MEAL PLANNER</span>
          </div>
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            100% DRI Full Spectrum
          </span>
        </div>

        <h2 className="text-xl font-extrabold text-slate-100">Zero-Repeat 14-Day Nutrition Plan</h2>
        <p className="text-xs text-slate-400 mt-1">
          Calculated for {profile.dietaryPreference.toUpperCase()} diet • {profile.weightGoal.toUpperCase()} mode.
          Guarantees 100% vitamin & mineral fulfillment without monotonous food repetition.
        </p>

        {/* Regenerate Action */}
        <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-semibold">
            Day {activeDayIndex + 1} of 14 Plan
          </span>
          <button
            type="button"
            onClick={handleRegenerate}
            className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-teal-400 hover:border-teal-500/50 flex items-center gap-1.5 transition active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Regenerate 14-Day Plan</span>
          </button>
        </div>
      </div>

      {/* 14-Day Horizontal Day Picker */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-bold">
        {mealPlan.map((day, idx) => (
          <button
            key={day.dayNumber}
            type="button"
            onClick={() => setActiveDayIndex(idx)}
            className={`px-3.5 py-2.5 rounded-xl border whitespace-nowrap transition flex flex-col items-center shrink-0 ${
              activeDayIndex === idx
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black border-emerald-400 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-[10px] uppercase font-bold tracking-wider">Day</span>
            <span className="text-sm font-black">{day.dayNumber}</span>
          </button>
        ))}
      </div>

      {/* Selected Day Menu Card */}
      <div className="space-y-3">
        
        {/* Day Summary */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-100 text-sm flex items-center gap-2">
              <span>{currentDay.dayTitle}</span>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Nutrients Covered
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{currentDay.focusTag}</p>
          </div>

          {/* Log Whole Day Button */}
          <button
            type="button"
            onClick={handleLogWholeDay}
            className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shrink-0 transition active:scale-95 shadow-md shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Log All Meals</span>
          </button>
        </div>

        {/* Meal Slots List */}
        <div className="space-y-2.5">
          {currentDay.meals.map((m, i) => (
            <div key={i} className="p-4 rounded-2xl glass-card border border-slate-800 space-y-2">
              
              <div className="flex items-center justify-between text-xs font-bold border-b border-slate-800/80 pb-2">
                <span className="text-emerald-400 uppercase tracking-wider">{m.slot}</span>
                <span className="text-slate-300 font-extrabold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" /> ~{m.calories} kcal
                </span>
              </div>

              {/* Main Item */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 rounded-xl bg-slate-950 border border-slate-800">
                    {m.food.icon}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-100 text-sm">{m.food.name}</h4>
                    <p className="text-xs text-slate-400">{m.portionGram}g serving • {m.food.category}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onAddFoodToLog(m.food, m.portionGram)}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-500/50 text-xs font-bold text-emerald-400 flex items-center gap-1 transition"
                >
                  <Plus className="w-3.5 h-3.5" /> Log
                </button>
              </div>

              {/* Secondary Side dish if available */}
              {m.secondaryFood && (
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{m.secondaryFood.icon}</span>
                    <span className="text-slate-300 font-semibold">+ {m.secondaryFood.name} (150g)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onAddFoodToLog(m.secondaryFood, 150)}
                    className="text-[10px] text-emerald-400 font-bold hover:underline"
                  >
                    + Log Side
                  </button>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
