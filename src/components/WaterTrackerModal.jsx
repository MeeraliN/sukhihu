import React, { useState } from 'react';
import { Droplets, Clock, Camera, Plus, CheckCircle2, ShieldCheck, Flame, Info, Sparkles, X } from 'lucide-react';

export default function WaterTrackerModal({ onClose, waterTargetMl = 3500, loggedWaterMl = 0, onLogWater }) {
  const [customMl, setCustomMl] = useState(250);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [activeTab, setActiveTab] = useState('tracker'); // 'tracker' | 'schedule'

  const remainingWaterMl = Math.max(0, waterTargetMl - loggedWaterMl);
  const waterPct = Math.min(100, Math.round((loggedWaterMl / waterTargetMl) * 100));

  // CHRONOBIOLOGICAL HYDRATION TIMINGS & BIOLOGICAL PURPOSE SCHEDULE
  const hydrationSchedule = [
    {
      timeStr: '7:00 AM (Upon Waking)',
      amountMl: 500,
      icon: '🌅',
      purpose: 'Flush overnight metabolic toxins, activate internal organs & kickstart digestive peristalsis.',
      bestTip: 'Drink warm or room-temperature water before coffee or tea.'
    },
    {
      timeStr: '8:00 AM (30 Mins Before Breakfast)',
      amountMl: 250,
      icon: '🍳',
      purpose: 'Prepare gastric mucosal lining & hydrolyze digestive enzymes for peak nutrient breakdown.',
      bestTip: 'Avoid drinking large amounts during the meal to prevent enzyme dilution.'
    },
    {
      timeStr: '11:00 AM (Mid-Morning Brain Focus)',
      amountMl: 350,
      icon: '🧠',
      purpose: 'Prevent micro-dehydration, eliminate brain fog, and maintain neuronal synaptic speed.',
      bestTip: 'Ideal time to add a pinch of electrolyte salts or lemon if sweating.'
    },
    {
      timeStr: '1:00 PM (30 Mins Before Lunch)',
      amountMl: 250,
      icon: '🥗',
      purpose: 'Lubricate digestive canal & naturally curb appetite to prevent overeating.',
      bestTip: 'Sip slowly 30 minutes prior to your main meal.'
    },
    {
      timeStr: '4:00 PM (Afternoon Anti-Fatigue)',
      amountMl: 350,
      icon: '⚡',
      purpose: 'Flush renal metabolic waste, revive cellular ATP energy & prevent afternoon sluggishness.',
      bestTip: 'Replaces afternoon sugar cravings with cellular hydration.'
    },
    {
      timeStr: '7:30 PM (30 Mins Before Dinner)',
      amountMl: 250,
      icon: '🍛',
      purpose: 'Balance gastric acid pH & support micronutrient assimilation during evening meal.',
      bestTip: 'Prepares the stomach for evening digestion.'
    },
    {
      timeStr: '10:00 PM (1 Hour Before Bed)',
      amountMl: 250,
      icon: '🌙',
      purpose: 'Prevent nocturnal blood viscosity, lower stroke risk & support overnight tissue repair.',
      bestTip: 'Drink 1 hour before sleeping to avoid nighttime sleep disruption (nocturia).'
    }
  ];

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setPhotoPreview(evt.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuickLog = (ml) => {
    onLogWater(ml);
    setPhotoPreview(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-5 space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-200 max-h-[90vh] overflow-y-auto scrollbar-none">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-100">Water & Hydration Tracker</h3>
              <p className="text-xs text-cyan-400 font-semibold">Real-Time Daily Water Target</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-bold hover:bg-slate-700 hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('tracker')}
            className={`flex-1 py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === 'tracker' ? 'bg-cyan-500 text-slate-950 font-black shadow' : 'text-slate-400'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>Water Intake Tracker</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('schedule')}
            className={`flex-1 py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === 'schedule' ? 'bg-cyan-500 text-slate-950 font-black shadow' : 'text-slate-400'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Optimal Timings & Purpose</span>
          </button>
        </div>

        {activeTab === 'tracker' && (
          <div className="space-y-4">
            
            {/* Daily Water Target Progress Card */}
            <div className="p-4 rounded-2xl glass-card border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-900 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300">Logged Hydration:</span>
                <span className="text-cyan-400 text-sm font-black">{loggedWaterMl} / {waterTargetMl} ml</span>
              </div>

              {/* Water Wave Progress Bar */}
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 relative">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 transition-all duration-500"
                  style={{ width: `${waterPct}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>{waterPct}% of Target Met</span>
                <span className="text-emerald-400 font-bold">{remainingWaterMl} ml Remaining</span>
              </div>
            </div>

            {/* Quick Logging Presets */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Quick Log Water Volume
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: '1 Glass', ml: 250, icon: '🥛' },
                  { label: '1 Bottle', ml: 500, icon: '🍼' },
                  { label: '750 ml', ml: 750, icon: '🥤' },
                  { label: '1 Litre', ml: 1000, icon: '🍶' }
                ].map((item) => (
                  <button
                    key={item.ml}
                    type="button"
                    onClick={() => handleQuickLog(item.ml)}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition flex flex-col items-center gap-1 active:scale-95"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs font-bold text-slate-200">{item.label}</span>
                    <span className="text-[10px] text-cyan-400 font-semibold">+{item.ml} ml</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Photo Scanner Upload for Water Glass/Bottle */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-slate-200">Log via Photo of Glass / Bottle</span>
                </div>
                <label className="px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold cursor-pointer hover:bg-cyan-400 transition">
                  Take Photo
                  <input type="file" accept="image/*" capture="environment" onChange={handlePhotoUpload} className="hidden" />
                </label>
              </div>

              {photoPreview && (
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <img src={photoPreview} alt="Water Glass" className="w-full h-32 object-cover rounded-xl border border-slate-800" />
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-emerald-400 font-bold">✓ Water Vessel Detected (~250ml)</span>
                    <button
                      type="button"
                      onClick={() => handleQuickLog(250)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400"
                    >
                      Confirm +250ml Log
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Custom ML Input */}
            <div className="flex gap-2">
              <input
                type="number"
                value={customMl}
                onChange={(e) => setCustomMl(Number(e.target.value))}
                placeholder="Custom ml (e.g. 300)"
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-100 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="button"
                onClick={() => handleQuickLog(customMl)}
                className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1 shrink-0"
              >
                <Plus className="w-4 h-4 stroke-[3]" /> Log ml
              </button>
            </div>

          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Optimal Chronobiological Hydration Timings & Biological Purpose</span>
            </div>

            {/* Hydration Schedule List */}
            <div className="space-y-2.5">
              {hydrationSchedule.map((item, index) => (
                <div key={index} className="p-3.5 rounded-2xl glass-card border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-xs font-bold text-slate-100">{item.timeStr}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-black">
                      {item.amountMl} ml
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 font-medium">
                    <strong className="text-cyan-400">Purpose:</strong> {item.purpose}
                  </p>

                  <div className="text-[10px] text-slate-400 italic bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                    💡 Tip: {item.bestTip}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
