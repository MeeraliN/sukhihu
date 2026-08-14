import React, { useState } from 'react';
import { calculateDRI } from '../services/driCalculator';
import { Sparkles, ArrowRight, User, Heart, Scale, Flame, ShieldAlert, Clock, Droplets } from 'lucide-react';

export default function OnboardingWizard({ onComplete }) {
  const [step, setStep] = useState(1);

  // Step 1: Personal Info
  const [age, setAge] = useState(28);
  const [sex, setSex] = useState('male');
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(70);
  const [lifeStage, setLifeStage] = useState('standard');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [dietaryPreference, setDietaryPreference] = useState('veg');

  // Step 2: Weight Goal & Health Focus Target
  const [weightGoal, setWeightGoal] = useState('maintain'); // 'loss' | 'maintain' | 'gain'
  const [healthIssue, setHealthIssue] = useState('acne_skin'); // 'acne_skin' | 'hair_fall' | 'weight_loss' | 'energy_fatigue'

  // Step 3: Daily Routine Schedule Timings & Hydration Conditions
  const [wakeTime, setWakeTime] = useState('07:00');
  const [breakfastTime, setBreakfastTime] = useState('08:30');
  const [lunchTime, setLunchTime] = useState('13:30');
  const [dinnerTime, setDinnerTime] = useState('20:30');
  const [bedTime, setBedTime] = useState('22:30');
  const [climate, setClimate] = useState('standard'); // 'standard' | 'hot'
  const [medicalTreatment, setMedicalTreatment] = useState('none'); // 'none' | 'renal_flush' | 'high_protein' | 'sweat_heavy'

  const handleFinish = () => {
    const profile = {
      age: Number(age),
      sex,
      heightCm: Number(heightCm),
      weightKg: Number(weightKg),
      lifeStage,
      activityLevel,
      dietaryPreference,
      weightGoal,
      healthIssue,
      climate,
      medicalTreatment,
      routine: {
        wakeTime,
        breakfastTime,
        lunchTime,
        dinnerTime,
        bedTime
      }
    };

    const dri = calculateDRI(profile);
    onComplete(profile, dri);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center p-4 max-w-md mx-auto">
      
      {/* Top Branding */}
      <div className="text-center mb-6 space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
          <Sparkles className="w-6 h-6 text-slate-950 stroke-[2.5]" />
        </div>
        <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-100 bg-clip-text text-transparent">
          Welcome to sukhihu
        </h1>
        <p className="text-xs text-slate-400 font-medium">
          Personalized USDA Daily DRI Nutrition & Hydration Setup
        </p>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mb-6">
        <span className={`w-8 h-1.5 rounded-full transition-all ${step >= 1 ? 'bg-emerald-400' : 'bg-slate-800'}`} />
        <span className={`w-8 h-1.5 rounded-full transition-all ${step >= 2 ? 'bg-emerald-400' : 'bg-slate-800'}`} />
        <span className={`w-8 h-1.5 rounded-full transition-all ${step >= 3 ? 'bg-emerald-400' : 'bg-slate-800'}`} />
      </div>

      {/* STEP 1: PERSONAL BIOMETRICS */}
      {step === 1 && (
        <div className="glass-card p-5 rounded-3xl border border-slate-800 space-y-4 animate-in fade-in duration-300">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-2">
            Step 1 of 3: Biometrics & Activity
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 font-semibold block mb-1">Biological Sex</label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-100"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-semibold block mb-1">Age (Years)</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 font-semibold block mb-1">Height (cm)</label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-100"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-semibold block mb-1">Weight (kg)</label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-semibold block mb-1">Dietary Preference</label>
            <select
              value={dietaryPreference}
              onChange={(e) => setDietaryPreference(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-emerald-400"
            >
              <option value="veg">🥦 Strict Vegetarian (No Meat/Egg)</option>
              <option value="vegan">🌱 Pure Vegan (Plant-Based Only)</option>
              <option value="eggetarian">🥚 Eggetarian (Includes Eggs)</option>
              <option value="non-veg">🍗 Non-Vegetarian</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-semibold block mb-1">Daily Physical Activity</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-100"
            >
              <option value="sedentary">Desk Job / Sedentary (1.2x)</option>
              <option value="light">Light Workout 1-3 days/wk (1.375x)</option>
              <option value="moderate">Moderate Exercise 3-5 days/wk (1.55x)</option>
              <option value="active">Heavy Training 6-7 days/wk (1.725x)</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 transition"
          >
            <span>Next: Goals & Issues</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: WEIGHT GOALS & HEALTH FOCUS */}
      {step === 2 && (
        <div className="glass-card p-5 rounded-3xl border border-slate-800 space-y-4 animate-in fade-in duration-300">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-2">
            Step 2 of 3: Weight Strategy & Target Issue
          </h2>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300">Weight Strategy Mode</label>
            <div className="grid grid-cols-3 gap-2 text-xs font-bold">
              {[
                { id: 'loss', label: '📉 Weight Loss' },
                { id: 'maintain', label: '⚖️ Maintain' },
                { id: 'gain', label: '📈 Weight Gain' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setWeightGoal(item.id)}
                  className={`p-2.5 rounded-xl border transition text-center ${
                    weightGoal === item.id
                      ? 'bg-emerald-500 text-slate-950 font-black border-emerald-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300">Health Focus / Target Issue</label>
            <select
              value={healthIssue}
              onChange={(e) => setHealthIssue(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-amber-400"
            >
              <option value="acne_skin">✨ Clear Skin & Anti-Acne (Vit C 500mg + 3.5L Water)</option>
              <option value="hair_fall">💇 Hair Growth & Anti-Hair Fall (Biotin 100mcg + Zinc/Copper)</option>
              <option value="weight_loss">📉 Weight Loss & Fat Burn (High Fiber + Fluid)</option>
              <option value="energy_fatigue">⚡ Energy Boost & Anti-Fatigue (B12 & Magnesium)</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-1/3 py-3 bg-slate-900 border border-slate-800 text-slate-300 font-bold rounded-xl text-xs"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="w-2/3 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 transition"
            >
              <span>Next: Routine & Hydration</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: DAILY ROUTINE TIMINGS & HYDRATION CONDITIONS */}
      {step === 3 && (
        <div className="glass-card p-5 rounded-3xl border border-slate-800 space-y-4 animate-in fade-in duration-300">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-2">
            Step 3 of 3: Personalized Routine & Hydration
          </h2>

          <div className="space-y-2">
            <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Your Daily Schedule Timings
            </label>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <div>
                <label className="text-[10px] text-slate-400">🌅 Wake Up Time</label>
                <input
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-100"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400">🍳 Breakfast Time</label>
                <input
                  type="time"
                  value={breakfastTime}
                  onChange={(e) => setBreakfastTime(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-100"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400">🥗 Lunch Time</label>
                <input
                  type="time"
                  value={lunchTime}
                  onChange={(e) => setLunchTime(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-100"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400">🍛 Dinner Time</label>
                <input
                  type="time"
                  value={dinnerTime}
                  onChange={(e) => setDinnerTime(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-400">🌙 Bed Time</label>
              <input
                type="time"
                value={bedTime}
                onChange={(e) => setBedTime(e.target.value)}
                className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-slate-400 font-semibold block mb-1">Environment / Climate</label>
              <select
                value={climate}
                onChange={(e) => setClimate(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-100"
              >
                <option value="standard">Standard / AC Environment</option>
                <option value="hot">Hot & Humid (+500ml Water)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-semibold block mb-1">Treatment / Condition</label>
              <select
                value={medicalTreatment}
                onChange={(e) => setMedicalTreatment(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-100"
              >
                <option value="none">Standard Treatment</option>
                <option value="renal_flush">Renal Flush (+1200ml)</option>
                <option value="high_protein">High Protein (+800ml)</option>
                <option value="sweat_heavy">Heavy Sweat (+1000ml)</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-1/3 py-3 bg-slate-900 border border-slate-800 text-slate-300 font-bold rounded-xl text-xs"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleFinish}
              className="w-2/3 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/20"
            >
              <span>Complete Setup & Start</span>
              <Sparkles className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
