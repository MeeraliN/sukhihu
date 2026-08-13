import React, { useState } from 'react';
import { Activity, Heart, User, ChevronRight, CheckCircle2, Leaf, Flame, Sparkles } from 'lucide-react';
import { calculateDRI } from '../services/driCalculator';

export default function OnboardingWizard({ onComplete }) {
  const [step, setStep] = useState(1);
  const [unitSystem, setUnitSystem] = useState('metric'); // 'metric' (cm/kg) or 'imperial' (ft-in/lbs)

  // Profile Form State
  const [heightCm, setHeightCm] = useState(172);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(8);

  const [weightKg, setWeightKg] = useState(68);
  const [weightLbs, setWeightLbs] = useState(150);

  const [age, setAge] = useState(26);
  const [sex, setSex] = useState('male');
  const [lifeStage, setLifeStage] = useState('standard');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [dietaryPreference, setDietaryPreference] = useState('veg'); // 'veg' | 'vegan' | 'non-veg' | 'eggetarian'

  const handleFinish = () => {
    // Calculate final metrics in metric
    const finalHeight = unitSystem === 'metric' ? Number(heightCm) : Math.round((Number(heightFt) * 30.48) + (Number(heightIn) * 2.54));
    const finalWeight = unitSystem === 'metric' ? Number(weightKg) : Math.round(Number(weightLbs) * 0.453592);

    const profileData = {
      heightCm: finalHeight,
      weightKg: finalWeight,
      age: Number(age),
      sex,
      lifeStage,
      activityLevel,
      dietaryPreference
    };

    const computedDRI = calculateDRI(profileData);
    onComplete(profileData, computedDRI);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-5 max-w-md mx-auto overflow-y-auto">
      {/* Top Header & Progress Dots */}
      <div>
        <div className="flex items-center justify-between pt-3 pb-6">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Sparkles className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-wide bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-100 bg-clip-text text-transparent">
                sukhihu
              </h1>
              <p className="text-[10px] text-emerald-400/80 font-medium -mt-1">Be Happy & Healthy</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            Step {step} of 3
          </span>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden mb-6">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* STEP 1: Body Metrics */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div>
              <h2 className="text-xl font-bold text-slate-100">Let's setup your profile</h2>
              <p className="text-xs text-slate-400 mt-1">
                We calculate official USDA daily recommendations tailored to your body.
              </p>
            </div>

            {/* Metric / Imperial Selector */}
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setUnitSystem('metric')}
                className={`flex-1 py-2 rounded-lg transition ${unitSystem === 'metric' ? 'bg-emerald-500 text-slate-950 font-bold shadow' : 'text-slate-400'}`}
              >
                Metric (cm / kg)
              </button>
              <button
                type="button"
                onClick={() => setUnitSystem('imperial')}
                className={`flex-1 py-2 rounded-lg transition ${unitSystem === 'imperial' ? 'bg-emerald-500 text-slate-950 font-bold shadow' : 'text-slate-400'}`}
              >
                Imperial (ft / lbs)
              </button>
            </div>

            {/* Sex Selection */}
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-2 block">Biological Sex</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSex('male')}
                  className={`p-3 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition ${
                    sex === 'male' ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <User className="w-4 h-4" /> Male
                </button>
                <button
                  type="button"
                  onClick={() => setSex('female')}
                  className={`p-3 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition ${
                    sex === 'female' ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <User className="w-4 h-4" /> Female
                </button>
              </div>
            </div>

            {/* Height Input */}
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Height</label>
              {unitSystem === 'metric' ? (
                <div className="relative">
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 font-semibold focus:outline-none focus:border-emerald-500"
                  />
                  <span className="absolute right-4 top-3.5 text-xs text-slate-500 font-medium">cm</span>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 font-semibold focus:outline-none focus:border-emerald-500"
                    />
                    <span className="absolute right-4 top-3.5 text-xs text-slate-500 font-medium">ft</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 font-semibold focus:outline-none focus:border-emerald-500"
                    />
                    <span className="absolute right-4 top-3.5 text-xs text-slate-500 font-medium">in</span>
                  </div>
                </div>
              )}
            </div>

            {/* Weight Input */}
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Weight</label>
              <div className="relative">
                {unitSystem === 'metric' ? (
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 font-semibold focus:outline-none focus:border-emerald-500"
                  />
                ) : (
                  <input
                    type="number"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 font-semibold focus:outline-none focus:border-emerald-500"
                  />
                )}
                <span className="absolute right-4 top-3.5 text-xs text-slate-500 font-medium">
                  {unitSystem === 'metric' ? 'kg' : 'lbs'}
                </span>
              </div>
            </div>

            {/* Age Input */}
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Age (years)</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 font-semibold focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        )}

        {/* STEP 2: Activity & Life Stage */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div>
              <h2 className="text-xl font-bold text-slate-100">Activity & Energy</h2>
              <p className="text-xs text-slate-400 mt-1">
                Help us fine-tune your caloric BMR and mineral loss rates.
              </p>
            </div>

            {/* Activity Level Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-2 block">Daily Activity Level</label>
              <div className="space-y-2.5">
                {[
                  { id: 'sedentary', title: 'Sedentary', desc: 'Little to no exercise, desk job' },
                  { id: 'light', title: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
                  { id: 'moderate', title: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
                  { id: 'active', title: 'Very Active', desc: 'Hard exercise 6-7 days/week' }
                ].map((act) => (
                  <div
                    key={act.id}
                    onClick={() => setActivityLevel(act.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      activityLevel === act.id
                        ? 'bg-emerald-500/15 border-emerald-500 text-slate-100'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-200">{act.title}</div>
                      <div className="text-xs text-slate-400">{act.desc}</div>
                    </div>
                    {activityLevel === act.id && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Life Stage if Female */}
            {sex === 'female' && (
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-2 block">Special Life Stage</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'standard', label: 'Standard' },
                    { id: 'pregnant', label: 'Pregnant' },
                    { id: 'lactating', label: 'Lactating' }
                  ].map((stg) => (
                    <button
                      key={stg.id}
                      type="button"
                      onClick={() => setLifeStage(stg.id)}
                      className={`py-2.5 px-2 rounded-xl border text-xs font-semibold text-center transition ${
                        lifeStage === stg.id
                          ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {stg.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Strict Dietary Choice */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div>
              <h2 className="text-xl font-bold text-slate-100">Dietary Preferences</h2>
              <p className="text-xs text-slate-400 mt-1">
                Food recommendations will be strictly filtered to match your chosen diet.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { id: 'veg', title: 'Vegetarian (Veg)', icon: '🥦', desc: 'Plant foods + dairy products (Paneer, Milk, Curd)' },
                { id: 'vegan', title: 'Vegan (Strict Plant-Based)', icon: '🌱', desc: '100% Plant-based, zero animal products or dairy' },
                { id: 'eggetarian', title: 'Eggetarian', icon: '🥚', desc: 'Vegetarian diet + Eggs included' },
                { id: 'non-veg', title: 'Non-Vegetarian (Non-Veg)', icon: '🍗', desc: 'Includes Poultry, Seafood, Meat, Eggs, and Dairy' }
              ].map((diet) => (
                <div
                  key={diet.id}
                  onClick={() => setDietaryPreference(diet.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                    dietaryPreference === diet.id
                      ? 'bg-emerald-500/15 border-emerald-500 text-slate-100 shadow-md shadow-emerald-500/10'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="text-2xl">{diet.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-slate-200">{diet.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{diet.desc}</div>
                  </div>
                  {dietaryPreference === diet.id && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>You can edit all these personal details anytime in your Profile screen.</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Button */}
      <div className="pt-4 pb-2">
        {step < 3 ? (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition active:scale-[0.98]"
          >
            <span>Continue</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFinish}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition active:scale-[0.98]"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Generate My Daily DRI Targets</span>
          </button>
        )}
      </div>
    </div>
  );
}
