import React, { useState } from 'react';
import { searchUSDADatabase } from '../services/usdaDatabase';
import { Search, Plus } from 'lucide-react';

export default function FoodSearchModal({ onClose, onLogFood, profileDiet = 'veg' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSelection, setFilterSelection] = useState('all');
  const [selectedFood, setSelectedFood] = useState(null);
  const [portionGram, setPortionGram] = useState(100);

  const results = searchUSDADatabase(searchQuery, profileDiet, filterSelection);

  // Build filter pills based on profile diet
  const isProfileVegan = profileDiet === 'vegan';
  const isProfileVeg = profileDiet === 'veg';
  const isProfileEggetarian = profileDiet === 'eggetarian';
  const isProfileNonVeg = profileDiet === 'non-veg';

  const filterOptions = [{ id: 'all', label: 'All Eligible Foods' }];
  filterOptions.push({ id: 'vegan', label: '🌱 Vegan' });

  if (isProfileVeg || isProfileEggetarian || isProfileNonVeg) {
    filterOptions.push({ id: 'veg', label: '🥦 Veg' });
  }

  const handleConfirmLog = () => {
    if (!selectedFood) return;
    onLogFood(selectedFood, portionGram);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md h-[85vh] rounded-3xl p-4 flex flex-col justify-between animate-in fade-in slide-in-from-bottom-6 duration-200">
        
        {/* Header & Search Bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-100 text-base">USDA Official Food Search</h3>
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 font-bold text-xs"
            >
              ✕
            </button>
          </div>

          {/* Input Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search practical daily foods (e.g. Spinach, Curd, Dal)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Diet Filter Pills (strictly obeying profile) */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px] font-bold">
            {filterOptions.map(d => (
              <button
                key={d.id}
                type="button"
                onClick={() => setFilterSelection(d.id)}
                className={`px-3 py-1.5 rounded-lg border whitespace-nowrap transition ${
                  filterSelection === d.id
                    ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-black'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto my-3 space-y-2 pr-1">
          {results.map((food) => (
            <div
              key={food.id}
              onClick={() => {
                setSelectedFood(food);
                setPortionGram(food.servingGram);
              }}
              className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                selectedFood?.id === food.id
                  ? 'bg-emerald-500/15 border-emerald-500 text-slate-100'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{food.icon}</span>
                <div>
                  <h4 className="font-bold text-slate-200 text-xs">{food.name}</h4>
                  <p className="text-[10px] text-slate-400">{food.category} • {food.diet.toUpperCase()}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-400">{food.nutrientsPer100g.calories} kcal</span>
                <p className="text-[10px] text-slate-500">per 100g</p>
              </div>
            </div>
          ))}
        </div>

        {/* Portion Selector & Confirm */}
        {selectedFood ? (
          <div className="pt-3 border-t border-slate-800 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold">Portion Size:</span>
              <span className="font-bold text-emerald-400">{portionGram} grams</span>
            </div>
            <input
              type="range"
              min="20"
              max="500"
              step="5"
              value={portionGram}
              onChange={(e) => setPortionGram(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <button
              type="button"
              onClick={handleConfirmLog}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add {selectedFood.name} ({portionGram}g)</span>
            </button>
          </div>
        ) : (
          <p className="text-center text-xs text-slate-500 py-2">Select a food above to configure portion size</p>
        )}

      </div>
    </div>
  );
}
