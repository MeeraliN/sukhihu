import React, { useState } from 'react';
import { calculateDRI } from '../services/driCalculator';
import { User, Scale, Flame, ShieldCheck, Crown, Clock, RefreshCw, X, Heart, Droplets } from 'lucide-react';

export default function ProfileModal({ onClose, profile, onUpdateProfile, trialStatus, onOpenPaywall }) {
  const [heightCm, setHeightCm] = useState(profile.heightCm || 175);
  const [weightKg, setWeightKg] = useState(profile.weightKg || 70);
  const [age, setAge] = useState(profile.age || 28);
  const [sex, setSex] = useState(profile.sex || 'male');
  const [activityLevel, setActivityLevel] = useState(profile.activityLevel || 'moderate');
  const [dietaryPreference, setDietaryPreference] = useState(profile.dietaryPreference || 'veg');
  const [weightGoal, setWeightGoal] = useState(profile.weightGoal || 'maintain');
  const [healthIssue, setHealthIssue] = useState(profile.healthIssue || 'acne_skin');
  const [climate, setClimate] = useState(profile.climate || 'standard');
  const [medicalTreatment, setMedicalTreatment] = useState(profile.medicalTreatment || 'none');

  const [wakeTime, setWakeTime] = useState(profile.routine?.wakeTime || '07:00');
  const [breakfastTime, setBreakfastTime] = useState(profile.routine?.breakfastTime || '08:30');
  const [lunchTime, setLunchTime] = useState(profile.routine?.lunchTime || '13:30');
  const [dinnerTime, setDinnerTime] = useState(profile.routine?.dinnerTime || '20:30');
  const [bedTime, setBedTime] = useState(profile.routine?.bedTime || '22:30');

  const handleSave = () => {
    const updatedProfile = {
      ...profile,
      heightCm: Number(heightCm),
      weightKg: Number(weightKg),
      age: Number(age),
      sex,
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

    const newDRI = calculateDRI(updatedProfile);
    onUpdateProfile(updatedProfile, newDRI);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-5 space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-200 max-h-[90vh] overflow-y-auto scrollbar-none">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-400" />
            <h3 className="font-extrabold text-lg text-slate-100">Profile & Routine Settings</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-bold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Subscription Status Card */}
        <div
          onClick={onOpenPaywall}
          className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/30 flex items-center justify-between cursor-pointer hover:border-amber-500/60 transition"
        >
          <div className="flex items-center gap-3">
            {trialStatus?.isSubscribed ? (
              <Crown className="w-5 h-5 text-amber-400 fill-amber-400" />
            ) : (
              <Clock className="w-5 h-5 text-amber-400 animate-pulse" />
            )}
            <div>
              <div className="text-xs font-bold text-amber-300">
                {trialStatus?.isSubscribed ? 'PRO Membership Active' : '1-Day Free Trial'}
              </div>
              <div className="text-[10px] text-amber-400/80">
                {trialStatus?.isSubscribed ? 'Unlimited Lifetime Access' : `${trialStatus?.formattedTimeLeft} trial remaining`}
              </div>
            </div>
          </div>
          <span className="text-[10px] font-black px-2.5 py-1 rounded bg-amber-500 text-slate-950 uppercase">
            {trialStatus?.isSubscribed ? 'Active' : 'Upgrade'}
          </span>
        </div>

        {/* Form Fields */}
        <div className="space-y-3">
          
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
            <label className="text-xs text-slate-400 font-semibold block mb-1">Weight Strategy Mode</label>
            <select
              value={weightGoal}
              onChange={(e) => setWeightGoal(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-amber-400"
            >
              <option value="loss">📉 Weight Loss (Caloric Deficit ~20%)</option>
              <option value="maintain">⚖️ Weight Maintenance</option>
              <option value="gain">📈 Weight Gain / Muscle Building (~18% Surplus)</option>
            </select>
          </div>

          {/* ROUTINE TIMINGS */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Daily Routine Schedule Timings
            </label>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <div>
                <label className="text-[10px] text-slate-400">🌅 Wake Up Time</label>
                <input
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-100"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400">🍳 Breakfast Time</label>
                <input
                  type="time"
                  value={breakfastTime}
                  onChange={(e) => setBreakfastTime(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-100"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400">🥗 Lunch Time</label>
                <input
                  type="time"
                  value={lunchTime}
                  onChange={(e) => setLunchTime(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-100"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400">🍛 Dinner Time</label>
                <input
                  type="time"
                  value={dinnerTime}
                  onChange={(e) => setDinnerTime(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-400">🌙 Bed Time</label>
              <input
                type="time"
                value={bedTime}
                onChange={(e) => setBedTime(e.target.value)}
                className="w-full p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-100"
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

        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="w-1/3 py-3 bg-slate-900 border border-slate-800 text-slate-300 font-bold rounded-xl text-xs"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="w-2/3 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-md shadow-emerald-500/20"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Recalculate & Save</span>
          </button>
        </div>

      </div>
    </div>
  );
}
