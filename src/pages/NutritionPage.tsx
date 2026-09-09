import React from 'react';
import {
  Plus,
  ScanLine,
  Dumbbell,
  Wheat,
  Droplet,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DatePickerNav } from '../components/nutrition/DatePickerNav';
import { MealSection } from '../components/nutrition/MealSection';
import { GlassCard } from '../components/common/GlassCard';
import { ProgressBar } from '../components/common/ProgressBar';
import { formatCalories } from '../utils/formatters';

export const NutritionPage: React.FC = () => {
  const { targets, dailyNutrition, openAddFood, openScanner } = useApp();

  const targetCalories = targets?.targetCalories || 2700;
  const targetProtein = targets?.proteinGrams || 96;
  const targetCarbs = targets?.carbGrams || 410;
  const targetFat = targets?.fatGrams || 75;

  const calConsumed = dailyNutrition.totalCalories;
  const calRemaining = Math.max(0, targetCalories - calConsumed);

  const proteinConsumed = dailyNutrition.totalProtein;
  const proteinRemaining = Math.max(0, targetProtein - proteinConsumed);

  const carbsConsumed = dailyNutrition.totalCarbs;
  const carbsRemaining = Math.max(0, targetCarbs - carbsConsumed);

  const fatConsumed = dailyNutrition.totalFat;
  const fatRemaining = Math.max(0, targetFat - fatConsumed);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Top Bar: Title & Global Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Daily Nutrition Planner
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Macro tracking calibrated for +{targets?.surplusCalories || 250} kcal lean muscle surplus
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-center">
          <button
            onClick={() => openScanner('lunch')}
            className="flex items-center gap-2 py-2 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-slate-200 border border-white/10 transition-all"
          >
            <ScanLine className="w-4 h-4 text-emerald-400" />
            <span>AI Food Scan</span>
          </button>

          <button
            onClick={() => openAddFood('lunch')}
            className="flex items-center gap-2 py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Food</span>
          </button>
        </div>
      </div>

      {/* Date Navigator */}
      <DatePickerNav />

      {/* Daily Macro Targets Top Card */}
      <GlassCard className="p-5 sm:p-7 space-y-6" glowColor="emerald">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Daily Caloric Balance
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                {calConsumed.toLocaleString()}
              </span>
              <span className="text-base sm:text-lg text-slate-400 font-mono">
                / {targetCalories.toLocaleString()} kcal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                Remaining Caloric Surplus
              </span>
              <span className="text-lg font-black text-white font-mono">
                {formatCalories(calRemaining)}
              </span>
            </div>
          </div>
        </div>

        {/* 3 Macro Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Protein */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Dumbbell className="w-3.5 h-3.5" />
                Protein
              </span>
              <span className="text-xs font-mono font-bold text-white">
                {Math.round(proteinConsumed)} / {targetProtein} g
              </span>
            </div>
            <ProgressBar current={proteinConsumed} target={targetProtein} colorScheme="emerald" showPercentage />
            <span className="text-[11px] text-slate-400 block font-mono">
              {proteinRemaining > 0 ? `${Math.round(proteinRemaining)} g remaining` : 'Target reached!'}
            </span>
          </div>

          {/* Carbs */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Wheat className="w-3.5 h-3.5" />
                Carbohydrates
              </span>
              <span className="text-xs font-mono font-bold text-white">
                {Math.round(carbsConsumed)} / {targetCarbs} g
              </span>
            </div>
            <ProgressBar current={carbsConsumed} target={targetCarbs} colorScheme="cyan" showPercentage />
            <span className="text-[11px] text-slate-400 block font-mono">
              {carbsRemaining > 0 ? `${Math.round(carbsRemaining)} g remaining` : 'Target reached!'}
            </span>
          </div>

          {/* Fat */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <Droplet className="w-3.5 h-3.5" />
                Dietary Fat
              </span>
              <span className="text-xs font-mono font-bold text-white">
                {Math.round(fatConsumed)} / {targetFat} g
              </span>
            </div>
            <ProgressBar current={fatConsumed} target={targetFat} colorScheme="blue" showPercentage />
            <span className="text-[11px] text-slate-400 block font-mono">
              {fatRemaining > 0 ? `${Math.round(fatRemaining)} g remaining` : 'Target reached!'}
            </span>
          </div>
        </div>
      </GlassCard>

      {/* 4 MEAL SECTIONS */}
      <div className="space-y-4">
        <MealSection type="breakfast" entries={dailyNutrition.meals.breakfast || []} />
        <MealSection type="lunch" entries={dailyNutrition.meals.lunch || []} />
        <MealSection type="snacks" entries={dailyNutrition.meals.snacks || []} />
        <MealSection type="dinner" entries={dailyNutrition.meals.dinner || []} />
      </div>
    </div>
  );
};
