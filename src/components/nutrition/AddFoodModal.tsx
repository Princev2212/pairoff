import React, { useState, useMemo } from 'react';
import {
  Search,
  Utensils,
  ScanLine,
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { STARTER_FOOD_DATABASE } from '../../data/foodDatabase';
import type { FoodItem, MealType } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatCalories } from '../../utils/formatters';

interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddFoodModal: React.FC<AddFoodModalProps> = ({ isOpen, onClose }) => {
  const { addFoodEntry, activeMealSlot, openScanner } = useApp();

  const [tab, setTab] = useState<'search' | 'custom'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMealType, setSelectedMealType] = useState<MealType>(activeMealSlot || 'lunch');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantityGrams, setQuantityGrams] = useState<number>(100);

  // Custom food state
  const [customName, setCustomName] = useState('');
  const [customGrams, setCustomGrams] = useState<number>(100);
  const [customCalories, setCustomCalories] = useState<number>(200);
  const [customProtein, setCustomProtein] = useState<number>(15);
  const [customCarbs, setCustomCarbs] = useState<number>(25);
  const [customFat, setCustomFat] = useState<number>(5);

  const categories = [
    { id: 'all', label: 'All Foods' },
    { id: 'grains', label: 'Grains & Rice' },
    { id: 'protein', label: 'Protein & Dal' },
    { id: 'dairy', label: 'Dairy & Paneer' },
    { id: 'nuts_fats', label: 'Nuts, Fats & Ghee' },
    { id: 'meals', label: 'Traditional Meals' },
    { id: 'shakes', label: 'Mass Shakes' },
  ];

  const filteredFoods = useMemo(() => {
    return STARTER_FOOD_DATABASE.filter((food) => {
      const matchesSearch =
        food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (food.notes && food.notes.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory =
        selectedCategory === 'all' || food.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleSelectFood = (food: FoodItem) => {
    setSelectedFood(food);
    setQuantityGrams(food.servingSizeGrams || 100);
  };

  // Scaled macros based on selected quantity
  const scaledMacros = useMemo(() => {
    if (!selectedFood) return null;
    const baseGrams = selectedFood.servingSizeGrams || 100;
    const ratio = quantityGrams / baseGrams;
    return {
      calories: Math.round(selectedFood.calories * ratio),
      protein: Number((selectedFood.protein * ratio).toFixed(1)),
      carbs: Number((selectedFood.carbs * ratio).toFixed(1)),
      fat: Number((selectedFood.fat * ratio).toFixed(1)),
    };
  }, [selectedFood, quantityGrams]);

  const handleConfirmAdd = () => {
    if (tab === 'search' && selectedFood && scaledMacros) {
      addFoodEntry(selectedMealType, {
        foodName: selectedFood.name,
        quantityGrams,
        servingLabel: `${quantityGrams}g portion`,
        calories: scaledMacros.calories,
        protein: scaledMacros.protein,
        carbs: scaledMacros.carbs,
        fat: scaledMacros.fat,
        isEstimated: false,
      });
      onClose();
      setSelectedFood(null);
    } else if (tab === 'custom' && customName.trim()) {
      addFoodEntry(selectedMealType, {
        foodName: customName.trim(),
        quantityGrams: customGrams,
        servingLabel: `${customGrams}g`,
        calories: Number(customCalories),
        protein: Number(customProtein),
        carbs: Number(customCarbs),
        fat: Number(customFat),
        isEstimated: false,
      });
      onClose();
      setCustomName('');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="2xl"
      title={
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-[1px]">
            <div className="w-full h-full bg-[#070A0F] rounded-xl flex items-center justify-center">
              <Utensils className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Log Food Entry</h3>
            <p className="text-xs text-slate-400">Search database or create custom item</p>
          </div>
        </div>
      }
    >
      <div className="space-y-5">
        {/* Meal Slot Selector */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/50 border border-white/5">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Target Meal:
          </span>
          <div className="flex items-center gap-1.5">
            {(['breakfast', 'lunch', 'snacks', 'dinner'] as MealType[]).map((meal) => (
              <button
                key={meal}
                type="button"
                onClick={() => setSelectedMealType(meal)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                  selectedMealType === meal
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_10px_#34D399]'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                {meal}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs: Search vs Custom */}
        <div className="flex rounded-2xl bg-slate-800/60 p-1 border border-white/5">
          <button
            type="button"
            onClick={() => setTab('search')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
              tab === 'search'
                ? 'bg-emerald-500 text-slate-950 shadow-[0_0_10px_#34D399]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Food Database (Indian & Global)
          </button>
          <button
            type="button"
            onClick={() => setTab('custom')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
              tab === 'custom'
                ? 'bg-emerald-500 text-slate-950 shadow-[0_0_10px_#34D399]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Custom Food Entry
          </button>
        </div>

        {/* TAB 1: Search Database */}
        {tab === 'search' && (
          <div className="space-y-4 animate-fade-in">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rice, paneer, dal, biryani, eggs, oats..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-800/70 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500/60"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-medium shrink-0 transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800/40 text-slate-400 hover:text-slate-200 border border-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Food Results List */}
            <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
              {filteredFoods.map((food) => {
                const isSelected = selectedFood?.id === food.id;

                return (
                  <div
                    key={food.id}
                    onClick={() => handleSelectFood(food)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                        : 'bg-slate-900/60 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{food.name}</span>
                        {food.isIndian && (
                          <span className="text-[10px] text-amber-300 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                            Indian
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 font-mono">
                        {food.servingUnit} • {food.calories} kcal • {food.protein}g P
                      </span>
                    </div>

                    {isSelected ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-bold text-xs">
                        ✓
                      </div>
                    ) : (
                      <span className="text-xs text-emerald-400 font-semibold">+ Select</span>
                    )}
                  </div>
                );
              })}

              {filteredFoods.length === 0 && (
                <div className="p-6 text-center text-slate-400 text-xs">
                  No matching foods found. Switch to "Custom Food Entry" or try another keyword.
                </div>
              )}
            </div>

            {/* Selected Food Quantity Adjuster & Macro Card */}
            {selectedFood && scaledMacros && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-850 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)] space-y-3 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{selectedFood.name}</h4>
                  <span className="text-base font-extrabold text-white font-mono">
                    {formatCalories(scaledMacros.calories)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-300 shrink-0">Serving Grams:</span>
                  <input
                    type="range"
                    min="10"
                    max="600"
                    step="5"
                    value={quantityGrams}
                    onChange={(e) => setQuantityGrams(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                  <span className="text-sm font-bold text-emerald-400 font-mono shrink-0 w-16 text-right">
                    {quantityGrams} g
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-[10px] text-emerald-400 uppercase">Protein</span>
                    <p className="font-bold text-white font-mono">{scaledMacros.protein}g</p>
                  </div>
                  <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                    <span className="text-[10px] text-cyan-400 uppercase">Carbs</span>
                    <p className="font-bold text-white font-mono">{scaledMacros.carbs}g</p>
                  </div>
                  <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                    <span className="text-[10px] text-indigo-400 uppercase">Fat</span>
                    <p className="font-bold text-white font-mono">{scaledMacros.fat}g</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Custom Food */}
        {tab === 'custom' && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Food Name
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Protein Smoothie, Paneer Wrap"
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-800/70 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500/60"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Portion Grams
                </label>
                <input
                  type="number"
                  value={customGrams}
                  onChange={(e) => setCustomGrams(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-800/70 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-emerald-500/60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Calories (kcal)
                </label>
                <input
                  type="number"
                  value={customCalories}
                  onChange={(e) => setCustomCalories(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-800/70 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-emerald-500/60"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1.5">
                  Protein (g)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={customProtein}
                  onChange={(e) => setCustomProtein(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-800/70 border border-emerald-500/30 text-white font-mono text-sm focus:outline-none focus:border-emerald-500/60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1.5">
                  Carbs (g)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={customCarbs}
                  onChange={(e) => setCustomCarbs(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-800/70 border border-cyan-500/30 text-white font-mono text-sm focus:outline-none focus:border-cyan-500/60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1.5">
                  Fat (g)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={customFat}
                  onChange={(e) => setCustomFat(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-800/70 border border-indigo-500/30 text-white font-mono text-sm focus:outline-none focus:border-indigo-500/60"
                />
              </div>
            </div>
          </div>
        )}

        {/* AI Scanner Shortcut CTA */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              openScanner(selectedMealType);
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-cyan-500/15 border border-emerald-500/30 text-emerald-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <ScanLine className="w-4 h-4 text-emerald-400" />
            <span>Or Scan Meal Plate with Vision AI</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl text-slate-400 hover:text-slate-200 text-xs font-semibold transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirmAdd}
            disabled={
              (tab === 'search' && !selectedFood) ||
              (tab === 'custom' && !customName.trim())
            }
            className="py-2.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs shadow-[0_4px_20px_rgba(16,185,129,0.35)] disabled:opacity-50 disabled:pointer-events-none transition-all"
          >
            Add to {selectedMealType.toUpperCase()}
          </button>
        </div>
      </div>
    </Modal>
  );
};
