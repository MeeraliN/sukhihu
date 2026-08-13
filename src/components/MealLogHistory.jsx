import React from 'react';
import { Trash2, Utensils, Clock, Flame } from 'lucide-react';

export default function MealLogHistory({ logs, onDeleteLog }) {
  if (!logs || logs.length === 0) {
    return (
      <div className="glass-card p-8 rounded-3xl border border-slate-800 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
          <Utensils className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-slate-200 text-sm">No meals logged today yet</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Use the camera scanner or search official foods to start tracking your 40+ nutrients.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 pb-20">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <Utensils className="w-4 h-4 text-emerald-400" /> Today's Meal Timeline ({logs.length})
        </h3>
      </div>

      <div className="space-y-2.5">
        {logs.map((log) => (
          <div
            key={log.id}
            className="p-3.5 rounded-2xl glass-card border border-slate-800 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl p-2 rounded-xl bg-slate-950 border border-slate-800">
                {log.food.icon || '🍲'}
              </span>
              <div>
                <h4 className="font-bold text-slate-100 text-xs">{log.food.name}</h4>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                  <span className="flex items-center gap-0.5 text-emerald-400 font-semibold">
                    <Flame className="w-3 h-3" /> {log.computedCalories} kcal
                  </span>
                  <span>•</span>
                  <span>{log.portionGram}g portion</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5">
                    <Clock className="w-3 h-3 text-slate-500" /> {log.timeStr}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onDeleteLog(log.id)}
              className="w-7 h-7 rounded-xl bg-slate-950 border border-slate-800/80 text-slate-500 hover:text-red-400 hover:border-red-500/40 flex items-center justify-center transition"
              title="Delete log"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
