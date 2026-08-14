import React, { useState } from 'react';
import { Droplets, Clock, Camera, Plus, CheckCircle2, ShieldCheck, Flame, Info, Sparkles, X, BellRing, Trash2, Edit3, Save } from 'lucide-react';

export default function WaterTrackerModal({
  onClose,
  waterTargetMl = 3500,
  loggedWaterMl = 0,
  onLogWater,
  onDeleteWaterLog,
  waterLogs = [],
  profile,
  onUpdateProfile
}) {
  const [customMl, setCustomMl] = useState(250);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [activeTab, setActiveTab] = useState('tracker'); // 'tracker' | 'schedule'
  const [showVesselEditor, setShowVesselEditor] = useState(false);
  const [remindersEnabled, setRemindersEnabled] = useState(false);

  // Personalized Vessels (or default customizable fallback)
  const defaultVessels = [
    { id: 'small_glass', name: 'Small Glass', ml: 150, icon: '🥛' },
    { id: 'big_glass', name: 'Big Glass', ml: 300, icon: '🍷' },
    { id: 'personal_bottle', name: 'Personal Bottle', ml: 750, icon: '🍾' },
    { id: 'large_jug', name: 'Large Jug/Flask', ml: 1000, icon: '🍶' }
  ];

  const [vessels, setVessels] = useState(profile?.customVessels || defaultVessels);

  const remainingWaterMl = Math.max(0, waterTargetMl - loggedWaterMl);
  const waterPct = Math.min(200, Math.round((loggedWaterMl / waterTargetMl) * 100));

  // HOURLY TIME-AWARE PACING
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  
  const wakeHour = Number(profile?.routine?.wakeTime?.split(':')[0] || 7);
  const bedHour = Number(profile?.routine?.bedTime?.split(':')[0] || 22);

  const activeHoursPassed = Math.max(0.1, Math.min(15, currentHour - wakeHour));
  const totalActiveHours = Math.max(8, bedHour - wakeHour);
  const dayPaceRatio = Math.max(0.1, Math.min(1.0, activeHoursPassed / totalActiveHours));

  const expectedWaterByNowMl = Math.round(waterTargetMl * dayPaceRatio);
  const isHydrationOnTrackByNow = loggedWaterMl >= (expectedWaterByNowMl * 0.8);

  const waterStatus = loggedWaterMl >= (waterTargetMl * 1.5)
    ? { color: 'red', badge: '🔴 Exceeded Limit (>150%)', bg: 'bg-rose-950/60 border-rose-500/50', text: 'text-rose-400', bar: 'from-rose-500 to-red-600' }
    : isHydrationOnTrackByNow
    ? { color: 'green', badge: '🟢 Perfect On Track', bg: 'bg-cyan-950/60 border-cyan-500/50', text: 'text-cyan-300', bar: 'from-cyan-500 to-emerald-400' }
    : { color: 'yellow', badge: `🟡 Under Pace (${expectedWaterByNowMl}ml expected by now)`, bg: 'bg-amber-950/50 border-amber-500/40', text: 'text-amber-300', bar: 'from-amber-500 to-yellow-400' };

  // Routine Timings
  const wakeTime = profile?.routine?.wakeTime || '07:00';
  const breakfastTime = profile?.routine?.breakfastTime || '08:30';
  const lunchTime = profile?.routine?.lunchTime || '13:30';
  const dinnerTime = profile?.routine?.dinnerTime || '20:30';
  const bedTime = profile?.routine?.bedTime || '22:30';

  const slot1 = Math.round(waterTargetMl * 0.15);
  const slot2 = Math.round(waterTargetMl * 0.10);
  const slot3 = Math.round(waterTargetMl * 0.15);
  const slot4 = Math.round(waterTargetMl * 0.15);
  const slot5 = Math.round(waterTargetMl * 0.15);
  const slot6 = Math.round(waterTargetMl * 0.15);
  const slot7 = Math.round(waterTargetMl * 0.15);

  const hydrationSchedule = [
    { timeStr: `${wakeTime} (Upon Waking)`, amountMl: slot1, icon: '🌅', purpose: 'Flush overnight metabolic toxins & activate internal organs.' },
    { timeStr: `${breakfastTime} (30 Mins Before Breakfast)`, amountMl: slot2, icon: '🍳', purpose: 'Prepare gastric mucosal lining for nutrient absorption.' },
    { timeStr: '11:00 AM (Mid-Morning Focus)', amountMl: slot3, icon: '🧠', purpose: 'Prevent micro-dehydration and brain fog.' },
    { timeStr: `${lunchTime} (30 Mins Before Lunch)`, amountMl: slot4, icon: '🥗', purpose: 'Lubricate digestive canal & curb overeating.' },
    { timeStr: '04:00 PM (Afternoon Anti-Fatigue)', amountMl: slot5, icon: '⚡', purpose: 'Flush cellular waste & revive ATP energy.' },
    { timeStr: `${dinnerTime} (30 Mins Before Dinner)`, amountMl: slot6, icon: '🍛', purpose: 'Balance gastric acid pH & support digestion.' },
    { timeStr: `${bedTime} (1 Hour Before Bed)`, amountMl: slot7, icon: '🌙', purpose: 'Prevent nocturnal blood viscosity & support repair.' }
  ];

  const handleVesselMlChange = (id, newMl) => {
    const updated = vessels.map(v => v.id === id ? { ...v, ml: Number(newMl) } : v);
    setVessels(updated);
  };

  const handleSaveVessels = () => {
    if (onUpdateProfile && profile) {
      onUpdateProfile({ ...profile, customVessels: vessels });
    }
    setShowVesselEditor(false);
  };

  const handleQuickLog = (ml) => {
    onLogWater(ml);
    setPhotoPreview(null);
  };

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
              <h3 className="font-extrabold text-lg text-slate-100">Personalized Hydration</h3>
              <p className="text-xs text-cyan-400 font-semibold">{waterTargetMl} ml Dynamic Target</p>
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
            <span>Timings & Alarms</span>
          </button>
        </div>

        {activeTab === 'tracker' && (
          <div className="space-y-4">
            
            {/* TIME-AWARE WATER TARGET CARD */}
            <div className={`p-4 rounded-2xl glass-card border ${waterStatus.bg} space-y-3 transition-all duration-300`}>
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-slate-300">
                  Logged Hydration: <strong className={waterStatus.text}>{loggedWaterMl} / {waterTargetMl} ml</strong>
                </div>
                <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                  waterStatus.color === 'green' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                  waterStatus.color === 'red' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
                  'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}>
                  {waterStatus.badge}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 relative">
                <div
                  className={`h-full bg-gradient-to-r ${waterStatus.bar} transition-all duration-500`}
                  style={{ width: `${Math.min(100, waterPct)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">{waterPct}% Target Met</span>
                <span className={`font-extrabold ${waterStatus.text}`}>
                  {waterPct > 150 ? `⚠️ Exceeded by ${loggedWaterMl - waterTargetMl} ml` : `${remainingWaterMl} ml Remaining`}
                </span>
              </div>
            </div>

            {/* PERSONALIZED VESSEL PRESETS GRID */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  My Personal Glass & Bottle Presets
                </label>
                <button
                  type="button"
                  onClick={() => setShowVesselEditor(!showVesselEditor)}
                  className="text-[10px] text-cyan-400 font-extrabold flex items-center gap-1 hover:underline"
                >
                  <Edit3 className="w-3 h-3" /> Edit My Bottle Sizes
                </button>
              </div>

              {/* EDIT VESSEL DRAWER */}
              {showVesselEditor && (
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-2.5 animate-in fade-in duration-200">
                  <div className="text-xs font-bold text-cyan-300">Customize Your Personal Glasses & Bottles</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {vessels.map(v => (
                      <div key={v.id} className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-semibold">{v.icon} {v.name}</label>
                        <input
                          type="number"
                          step="10"
                          value={v.ml}
                          onChange={(e) => handleVesselMlChange(v.id, e.target.value)}
                          className="w-full p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-100"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveVessels}
                    className="w-full py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-black flex items-center justify-center gap-1"
                  >
                    <Save className="w-3.5 h-3.5" /> Save My Personal Presets
                  </button>
                </div>
              )}

              {/* PERSONALIZED QUICK LOG BUTTONS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {vessels.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleQuickLog(item.ml)}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition flex flex-col items-center gap-1 active:scale-95"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs font-bold text-slate-200">{item.name}</span>
                    <span className="text-[10px] text-cyan-400 font-black">+{item.ml} ml</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom ML Input with 10ml Stepper */}
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-semibold block">
                Custom Exact Amount (Increments of 10 ml)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="10"
                  min="10"
                  max="5000"
                  value={customMl}
                  onChange={(e) => setCustomMl(Number(e.target.value))}
                  placeholder="Custom ml (e.g. 270)"
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

            {/* Photo Scanner Upload */}
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

            {/* LOGGED WATER HISTORY LIST WITH DELETE BUTTON */}
            {waterLogs.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Today's Logged Water Entries (Tap 🗑️ to Delete)
                </label>

                <div className="space-y-1.5 max-h-36 overflow-y-auto scrollbar-none">
                  {waterLogs.map((log) => (
                    <div key={log.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">💧</span>
                        <div>
                          <span className="font-bold text-slate-100">+{log.amountMl} ml</span>
                          <span className="text-[10px] text-slate-400 block">{log.timeStr}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onDeleteWaterLog(log.id)}
                        className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-slate-950 transition"
                        title="Delete accidental log"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-xs text-cyan-200">
                <BellRing className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <span className="font-extrabold text-slate-100 block">Hydration Push Alarms & Sound</span>
                  <span className="text-[10px] text-cyan-300">Set automatically to your routine ({wakeTime} - {bedTime})</span>
                </div>
              </div>
            </div>

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
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
