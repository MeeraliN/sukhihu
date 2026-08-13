import React, { useState } from 'react';
import { getRecommendedFoods, HEALTH_GOALS } from '../services/foodRecommender';
import { Sparkles, Plus, ShieldAlert, Target, HeartPulse, CheckCircle2 } from 'lucide-react';

export default function FoodRecommenderView({
  currentIntake,
  driTargets,
  profileDiet = 'veg',
  onAddFoodToLog
}) {
  const [activeGoalId, setActiveGoalId] = useState('hair_fall'); // Default health focus
  const [activeSubFilter, setActiveSubFilter] = useState(profileDiet);

  const result = getRecommendedFoods(currentIntake, driTargets, activeSubFilter, activeGoalId);
  const { deficits, recommendations, activeGoal } = result;

  // Determine eligible diet filter options strictly based on user's profile diet
  const isProfileVegan = profileDiet === 'vegan';
  const isProfileVeg = profileDiet === 'veg';
  const isProfileEggetarian = profileDiet === 'eggetarian';
  const isProfileNonVeg = profileDiet === 'non-veg';

  const filterOptions = [];
  filterOptions.push({ id: 'vegan', label: '🌱 Vegan' });

  if (isProfileVeg || isProfileEggetarian || isProfileNonVeg) {
    filterOptions.push({ id: 'veg', label: '🥦 Vegetarian' });
  }
  if (isProfileEggetarian || isProfileNonVeg) {
    filterOptions.push({ id: 'eggetarian', label: '🥚 Eggetarian' });
  }
  if (isProfileNonVeg) {
    filterOptions.push({ id: 'non-veg', label: '🍗 Non-Veg' });
  }

  return (
    <div className="space-y-4 pb-20">
      
      {/* Header Card */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
          <Sparkles className="w-4 h-4" />
          <span>SMART HEALTH GOAL & NUTRIENT OPTIMIZER</span>
        </div>
        <h2 className="text-xl font-extrabold text-slate-100">Personalized Food Recommendations</h2>
        <p className="text-xs text-slate-400 mt-1">
          Common, practical daily foods prioritized for your selected health focus & active DRI gaps.
        </p>

        {/* HEALTH FOCUS / GOAL TARGETER SELECTOR */}
        <div className="mt-4 pt-3 border-t border-slate-800">
          <label className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-2 flex items-center gap-1">
            <Target className="w-3.5 h-3.5" /> What issue do you want to solve today?
          </label>

          <div className="grid grid-cols-2 gap-2">
            {HEALTH_GOALS.map((goal) => (
              <button
                key={goal.id}
                type="button"
                onClick={() => setActiveGoalId(goal.id)}
                className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2 ${
                  activeGoalId === goal.id
                    ? 'bg-amber-500/15 border-amber-500/80 text-amber-200 shadow-md shadow-amber-500/10'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span className="text-xl">{goal.icon}</span>
                <div>
                  <div className="text-xs font-bold text-slate-200 leading-tight">{goal.name}</div>
                  <div className="text-[9px] text-slate-400 -mt-0.5">{goal.boostNutrients.length} target nutrients</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* STRICT DIETARY FILTER TOGGLE */}
        <div className="mt-3 pt-3 border-t border-slate-800">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
              Diet Filter ({profileDiet.toUpperCase()} Profile)
            </label>
            <span className="text-[10px] text-emerald-400 font-semibold">Strictly Enforced</span>
          </div>

          <div className="flex gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px] font-bold">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setActiveSubFilter(opt.id)}
                className={`flex-1 py-1.5 rounded-lg text-center transition ${
                  activeSubFilter === opt.id
                    ? 'bg-emerald-500 text-slate-950 font-black shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Health Goal Banner */}
      {activeGoal && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-3">
          <span className="text-2xl">{activeGoal.icon}</span>
          <div>
            <span className="font-extrabold text-amber-300">{activeGoal.name} Active</span>
            <p className="text-[11px] text-amber-200/80 mt-0.5">{activeGoal.desc}</p>
          </div>
        </div>
      )}

      {/* Priority Deficits */}
      {deficits && deficits.length > 0 && (
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Active Nutrient Deficits ({deficits.length})</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {deficits.slice(0, 5).map((def) => (
              <span
                key={def.key}
                className="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium"
              >
                {def.label} ({Math.round(def.percentageAchieved)}%)
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Practical Foods */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-300 px-1">
          Practical Daily Food Recommendations
        </h3>

        {recommendations.map((food) => (
          <div
            key={food.id}
            className="p-4 rounded-2xl glass-card border border-slate-800 flex items-center justify-between gap-3 hover:border-emerald-500/40 transition"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl p-2 rounded-2xl bg-slate-900 border border-slate-800">
                {food.icon}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-100 text-sm">{food.name}</h4>
                  {food.practicalDaily && (
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold">
                      Daily Staple
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400">{food.servingUnit} ({food.category})</p>

                {/* Key Benefit Badges */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {food.benefits.map((b, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[10px] font-semibold"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Add to Intake Button */}
            <button
              type="button"
              onClick={() => onAddFoodToLog(food, food.servingGram)}
              className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shrink-0 transition active:scale-95 shadow-md shadow-emerald-500/20"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Log</span>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
