import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  Plus,
  Trash2,
  Edit2,
  Utensils,
  Layers,
  Info,
} from 'lucide-react';
import type { FoodAnalysisResult, DetectedFoodItem, MealType } from '../../types';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { formatCalories, formatGrams } from '../../utils/formatters';

interface FoodAnalysisViewProps {
  result: FoodAnalysisResult;
  onDone: () => void;
}

export const FoodAnalysisView: React.FC<FoodAnalysisViewProps> = ({ result, onDone }) => {
  const { addMultipleFoodEntries, activeMealSlot } = useApp();

  const [items, setItems] = useState<DetectedFoodItem[]>(result.items);
  const [selectedMealType, setSelectedMealType] = useState<MealType>(
    result.mealTypeSuggestion || activeMealSlot || 'lunch'
  );
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);

  // Recalculate totals dynamically based on user edits
  const totalCalories = items.reduce((acc, curr) => acc + (curr.calories || 0), 0);
  const totalProtein = Number(items.reduce((acc, curr) => acc + (curr.protein || 0), 0).toFixed(1));
  const totalCarbs = Number(items.reduce((acc, curr) => acc + (curr.carbs || 0), 0).toFixed(1));
  const totalFat = Number(items.reduce((acc, curr) => acc + (curr.fat || 0), 0).toFixed(1));

  // Handle gram quantity change (scales macros proportionally)
  const handleQuantityChange = (id: string, newGrams: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const validGrams = Math.max(1, newGrams);
          const ratio = validGrams / (item.quantityGrams || 100);
          return {
            ...item,
            quantityGrams: validGrams,
            calories: Math.round(item.calories * ratio),
            protein: Number((item.protein * ratio).toFixed(1)),
            carbs: Number((item.carbs * ratio).toFixed(1)),
            fat: Number((item.fat * ratio).toFixed(1)),
          };
        }
        return item;
      })
    );
  };

  const handleManualValueChange = (
    id: string,
    field: 'name' | 'calories' | 'protein' | 'carbs' | 'fat',
    value: string | number
  ) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleAddNewDetectedItem = () => {
    const newItem: DetectedFoodItem = {
      id: `det_new_${Date.now()}`,
      name: 'Custom Food Item',
      quantityGrams: 100,
      calories: 150,
      protein: 8,
      carbs: 20,
      fat: 4,
      confidence: 1.0,
      category: 'other',
    };
    setItems((prev) => [...prev, newItem]);
    setEditingItemId(newItem.id);
  };

  const handleConfirmAndAddMeal = () => {
    const entriesToAdd = items.map((item) => ({
      foodName: item.name,
      quantityGrams: item.quantityGrams,
      servingLabel: `${item.quantityGrams}g`,
      calories: Math.round(item.calories),
      protein: Number(item.protein.toFixed(1)),
      carbs: Number(item.carbs.toFixed(1)),
      fat: Number(item.fat.toFixed(1)),
      isEstimated: true,
      confidenceScore: item.confidence,
      imageUrl: result.imageUrl,
    }));

    addMultipleFoodEntries(selectedMealType, entriesToAdd);
    setIsAdded(true);
    setTimeout(() => {
      onDone();
    }, 900);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Image preview and Bounding Boxes */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950 aspect-video max-h-56 sm:max-h-64 w-full">
        <img
          src={result.imageUrl}
          alt="Scanned Food Plate"
          className="w-full h-full object-cover opacity-80"
        />

        {/* Neural Bounding Boxes */}
        {items.map((item) => {
          if (!item.bbox) return null;
          return (
            <div
              key={item.id}
              style={{
                left: `${item.bbox.x}%`,
                top: `${item.bbox.y}%`,
                width: `${item.bbox.width}%`,
                height: `${item.bbox.height}%`,
              }}
              className="absolute border-2 border-emerald-400/80 bg-emerald-500/10 rounded-lg pointer-events-none transition-all duration-300 flex items-start p-1"
            >
              <span className="bg-[#070A0F]/90 text-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm border border-emerald-500/40">
                {item.name} ({Math.round(item.confidence * 100)}%)
              </span>
            </div>
          );
        })}

        {/* Confidence Overlay Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <Badge
            variant="emerald"
            size="sm"
            icon={<Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
          >
            Vision AI: {Math.round(result.overallConfidence * 100)}% Confidence
          </Badge>
        </div>
      </div>

      {/* Prominent Estimation Disclaimer */}
      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-amber-300">
            Estimated Nutrition Values (AI Approximation)
          </p>
          <p className="text-[11px] text-amber-200/80 leading-relaxed">
            Portion volumes and cooking oils are estimated visually. Please verify and adjust gram
            weights below before logging into your daily intake.
          </p>
        </div>
      </div>

      {/* Meal Slot Picker */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/50 border border-white/5">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
          Add Meal To:
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

      {/* Detected Food Items List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            Detected Food Items ({items.length})
          </h4>
          <button
            type="button"
            onClick={handleAddNewDetectedItem}
            className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Item</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {items.map((item) => {
            const isEditing = editingItemId === item.id;

            return (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/5 hover:border-white/15 transition-all duration-200 space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleManualValueChange(item.id, 'name', e.target.value)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 border border-white/10 text-white text-sm font-semibold flex-1"
                    />
                  ) : (
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{item.name}</span>
                        <Badge variant="outline" size="xs">
                          Estimated
                        </Badge>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">
                        {item.quantityGrams}g portion
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setEditingItemId(isEditing ? null : item.id)}
                      aria-label="Edit item"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-white/5 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item.id)}
                      aria-label="Delete item"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Macro breakdown & quantity stepper */}
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-[10px] text-slate-400 uppercase block">Calories</span>
                    {isEditing ? (
                      <input
                        type="number"
                        value={item.calories}
                        onChange={(e) =>
                          handleManualValueChange(item.id, 'calories', Number(e.target.value))
                        }
                        className="w-full bg-slate-800 text-center text-white font-mono font-bold rounded py-0.5 text-xs"
                      />
                    ) : (
                      <span className="font-bold text-white font-mono">{item.calories} kcal</span>
                    )}
                  </div>

                  <div className="p-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                    <span className="text-[10px] text-emerald-400 uppercase block">Protein</span>
                    {isEditing ? (
                      <input
                        type="number"
                        step="0.1"
                        value={item.protein}
                        onChange={(e) =>
                          handleManualValueChange(item.id, 'protein', Number(e.target.value))
                        }
                        className="w-full bg-slate-800 text-center text-emerald-400 font-mono font-bold rounded py-0.5 text-xs"
                      />
                    ) : (
                      <span className="font-bold text-emerald-400 font-mono">{item.protein}g</span>
                    )}
                  </div>

                  <div className="p-2 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
                    <span className="text-[10px] text-cyan-400 uppercase block">Carbs</span>
                    {isEditing ? (
                      <input
                        type="number"
                        step="0.1"
                        value={item.carbs}
                        onChange={(e) =>
                          handleManualValueChange(item.id, 'carbs', Number(e.target.value))
                        }
                        className="w-full bg-slate-800 text-center text-cyan-400 font-mono font-bold rounded py-0.5 text-xs"
                      />
                    ) : (
                      <span className="font-bold text-cyan-400 font-mono">{item.carbs}g</span>
                    )}
                  </div>

                  <div className="p-2 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                    <span className="text-[10px] text-indigo-400 uppercase block">Fat</span>
                    {isEditing ? (
                      <input
                        type="number"
                        step="0.1"
                        value={item.fat}
                        onChange={(e) =>
                          handleManualValueChange(item.id, 'fat', Number(e.target.value))
                        }
                        className="w-full bg-slate-800 text-center text-indigo-400 font-mono font-bold rounded py-0.5 text-xs"
                      />
                    ) : (
                      <span className="font-bold text-indigo-400 font-mono">{item.fat}g</span>
                    )}
                  </div>
                </div>

                {/* Gram adjuster slider */}
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-[11px] text-slate-400 shrink-0">Scale Portion:</span>
                  <input
                    type="range"
                    min="25"
                    max="500"
                    step="5"
                    value={item.quantityGrams}
                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                    className="w-full accent-emerald-400 h-1 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-slate-200 font-mono shrink-0 w-12 text-right">
                    {item.quantityGrams}g
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TOTAL MEAL SUMMARY CARD */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)] space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Meal Nutrition
            </span>
            <h3 className="text-2xl font-black text-white font-mono mt-0.5">
              {formatCalories(totalCalories)}
            </h3>
          </div>
          <Badge variant="emerald" size="md">
            {selectedMealType.toUpperCase()}
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-[10px] text-emerald-400 font-bold uppercase">Protein</span>
            <p className="text-lg font-bold text-white font-mono mt-0.5">{formatGrams(totalProtein)}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <span className="text-[10px] text-cyan-400 font-bold uppercase">Carbs</span>
            <p className="text-lg font-bold text-white font-mono mt-0.5">{formatGrams(totalCarbs)}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
            <span className="text-[10px] text-indigo-400 font-bold uppercase">Fat</span>
            <p className="text-lg font-bold text-white font-mono mt-0.5">{formatGrams(totalFat)}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={handleConfirmAndAddMeal}
          disabled={items.length === 0 || isAdded}
          className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_6px_25px_rgba(16,185,129,0.35)] ${
            isAdded
              ? 'bg-emerald-500 text-slate-950'
              : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-5 h-5" />
              <span>Meal Added to Daily Log!</span>
            </>
          ) : (
            <>
              <Utensils className="w-4 h-4" />
              <span>Add Meal to Daily Nutrition</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
