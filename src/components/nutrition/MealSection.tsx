import React from 'react';
import {
  Plus,
  ScanLine,
  Trash2,
  Coffee,
  Sun,
  Cookie,
  Moon,
  Sparkles,
} from 'lucide-react';
import type { MealType, FoodEntry } from '../../types';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../common/GlassCard';
import { Badge } from '../common/Badge';
import { formatCalories } from '../../utils/formatters';

interface MealSectionProps {
  type: MealType;
  entries: FoodEntry[];
}

export const MealSection: React.FC<MealSectionProps> = ({ type, entries }) => {
  const { deleteFoodEntry, openAddFood, openScanner } = useApp();

  const configs: Record<
    MealType,
    { title: string; subtitle: string; icon: React.ElementType; color: string }
  > = {
    breakfast: {
      title: 'Breakfast',
      subtitle: 'Morning fuel & amino intake',
      icon: Coffee,
      color: 'text-amber-400',
    },
    lunch: {
      title: 'Lunch',
      subtitle: 'Midday anabolic surplus',
      icon: Sun,
      color: 'text-emerald-400',
    },
    snacks: {
      title: 'Snacks & Shakes',
      subtitle: 'Calorie-dense boosters',
      icon: Cookie,
      color: 'text-cyan-400',
    },
    dinner: {
      title: 'Dinner',
      subtitle: 'Overnight recovery & protein',
      icon: Moon,
      color: 'text-indigo-400',
    },
  };

  const currentConfig = configs[type];
  const Icon = currentConfig.icon;

  const totalCalories = entries.reduce((acc, curr) => acc + curr.calories, 0);
  const totalProtein = Number(entries.reduce((acc, curr) => acc + curr.protein, 0).toFixed(1));
  const totalCarbs = Number(entries.reduce((acc, curr) => acc + curr.carbs, 0).toFixed(1));
  const totalFat = Number(entries.reduce((acc, curr) => acc + curr.fat, 0).toFixed(1));

  return (
    <GlassCard className="p-5 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
            <Icon className={`w-5 h-5 ${currentConfig.color}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {currentConfig.title}
              </h3>
              {entries.length > 0 && (
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                  {formatCalories(totalCalories)}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">{currentConfig.subtitle}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            type="button"
            onClick={() => openScanner(type)}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-white/[0.05] hover:bg-emerald-500/15 text-slate-300 hover:text-emerald-300 border border-white/10 hover:border-emerald-500/30 text-xs font-semibold transition-all"
          >
            <ScanLine className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden xs:inline">Scan</span>
          </button>

          <button
            type="button"
            onClick={() => openAddFood(type)}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Food</span>
          </button>
        </div>
      </div>

      {/* Entries List or Empty State */}
      {entries.length === 0 ? (
        <div className="py-6 text-center space-y-3">
          <p className="text-xs text-slate-500">No foods logged for {currentConfig.title} yet.</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => openScanner(type)}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Scan photo</span>
            </button>
            <span className="text-slate-600">•</span>
            <button
              onClick={() => openAddFood(type)}
              className="text-xs text-slate-300 hover:text-white font-semibold flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Search database</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="p-3 rounded-2xl bg-slate-900/40 hover:bg-slate-900/80 border border-white/5 hover:border-white/10 transition-all flex items-center justify-between gap-3 group"
            >
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white truncate">
                    {entry.foodName}
                  </span>
                  {entry.isEstimated && (
                    <Badge variant="outline" size="xs">
                      AI Estimated
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <span>{entry.servingLabel || `${entry.quantityGrams}g`}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-bold">{entry.calories} kcal</span>
                  <span>•</span>
                  <span>{entry.protein}g P</span>
                  <span>•</span>
                  <span>{entry.carbs}g C</span>
                  <span>•</span>
                  <span>{entry.fat}g F</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => deleteFoodEntry(type, entry.id)}
                aria-label={`Delete ${entry.foodName}`}
                className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors opacity-80 group-hover:opacity-100 shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Subtotal Macro Breakdown Bar */}
          <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-white/5 font-mono px-1">
            <span>Meal Macros:</span>
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 font-bold">{totalProtein}g Protein</span>
              <span className="text-cyan-400 font-bold">{totalCarbs}g Carbs</span>
              <span className="text-indigo-400 font-bold">{totalFat}g Fat</span>
            </div>
          </div>
        </div>
      )}
    </GlassCard>
  );
};
