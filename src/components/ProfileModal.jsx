import React, { useState } from 'react';
import { User, Activity, CheckCircle2, Globe, Crown, TrendingDown, Scale, TrendingUp } from 'lucide-react';
import { CURRENCIES, getActiveCurrency, setActiveCurrency } from '../services/subscriptionService';
import { calculateDRI } from '../services/driCalculator';

export default function ProfileModal({ onClose, profile, onUpdateProfile, trialStatus, onOpenPaywall }) {
  const [heightCm, setHeightCm] = useState(profile.heightCm);
  const [weightKg, setWeightKg] = useState(profile.weightKg);
  const [age, setAge] = useState(profile.age);
  const [sex, setSex] = useState(profile.sex);
  const [activityLevel, setActivityLevel] = useState(profile.activityLevel);
  const [dietaryPreference, setDietaryPreference] = useState(profile.dietaryPreference);
  const [weightGoal, setWeightGoal] = useState(profile.weightGoal || 'maintain');
  const [selectedCurrency, setSelectedCurrency] = useState(getActiveCurrency());

  const handleSave = () => {
    const updatedProfile = {
      heightCm: Number(heightCm),
      weightKg: Number(weightKg),
      age: Number(age),
      sex,
      activityLevel,
      dietaryPreference,
      weightGoal,
      lifeStage: profile.lifeStage || 'standard'
    };

    const newDRI = calculateDRI(updatedProfile);
    onUpdateProfile(updatedProfile, newDRI);
    onClose();
  };

  const handleCurrencyChange = (code) => {
    setActiveCurrency(code);
    const curr = CURRENCIES.find(c => c.code === code);
    if (curr) setSelectedCurrency(curr);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md h-[90vh] rounded-3xl p-5 flex flex-col justify-between overflow-y-auto animate-in fade-in slide-in-from-bottom-6 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-slate-100 text-base">Edit Personal Profile</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 font-bold text-xs"
          >
            ✕
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 my-3 text-xs">
          
          {/* Weight Goal Selector */}
          <div>
            <label className="font-semibold text-amber-400 mb-1 block">Weight Goal Strategy</label>
            <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {[
                { id: 'loss', label: '📉 Loss' },
                { id: 'maintain', label: '⚖️ Maintain' },
                { id: 'gain', label: '📈 Gain' }
              ].map(g => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setWeightGoal(g.id)}
                  className={`py-2 rounded-lg font-bold text-center transition ${
                    weightGoal === g.id
                      ? 'bg-amber-500 text-slate-950 font-black shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sex Selection */}
          <div>
            <label className="font-semibold text-slate-300 mb-1 block">Biological Sex</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSex('male')}
                className={`py-2 rounded-xl border font-bold transition ${
                  sex === 'male' ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => setSex('female')}
                className={`py-2 rounded-xl border font-bold transition ${
                  sex === 'female' ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                Female
              </button>
            </div>
          </div>

          {/* Height & Weight */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-300 mb-1 block">Height (cm)</label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-300 mb-1 block">Weight (kg)</label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="font-semibold text-slate-300 mb-1 block">Age (years)</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 font-bold focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Strict Dietary Filter */}
          <div>
            <label className="font-semibold text-slate-300 mb-1 block">Dietary Preference Filter</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'veg', label: '🥦 Vegetarian' },
                { id: 'vegan', label: '🌱 Vegan' },
                { id: 'eggetarian', label: '🥚 Eggetarian' },
                { id: 'non-veg', label: '🍗 Non-Vegetarian' }
              ].map(d => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDietaryPreference(d.id)}
                  className={`py-2 px-2 rounded-xl border font-bold text-left transition ${
                    dietaryPreference === d.id
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Currency Settings */}
          <div className="pt-2 border-t border-slate-800">
            <label className="font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-400" /> Preferred App Currency
            </label>
            <select
              value={selectedCurrency.code}
              onChange={(e) => handleCurrencyChange(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-amber-400 font-bold focus:outline-none"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.symbol}20 {c.code} ({c.name})
                </option>
              ))}
            </select>
          </div>

          {/* Subscription Banner */}
          <div
            onClick={onOpenPaywall}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/30 flex items-center justify-between cursor-pointer"
          >
            <div>
              <div className="font-bold text-amber-400 flex items-center gap-1">
                <Crown className="w-4 h-4 fill-amber-400" />
                <span>{trialStatus?.isSubscribed ? 'PRO Membership Active' : 'Trial Access Active'}</span>
              </div>
              <p className="text-[10px] text-amber-300/70 mt-0.5">
                {trialStatus?.isSubscribed ? 'Unlimited 24/7 scanning' : `Trial ends in ${trialStatus?.formattedTimeLeft}`}
              </p>
            </div>
            <button className="px-3 py-1 bg-amber-500 text-slate-950 text-[10px] font-bold rounded-lg">
              Manage
            </button>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-800 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 bg-slate-950 border border-slate-800 text-slate-400 font-semibold rounded-xl text-xs"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Save & Recalculate DRI</span>
          </button>
        </div>

      </div>
    </div>
  );
}
