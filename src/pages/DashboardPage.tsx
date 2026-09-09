import React from 'react';
import {
  Sparkles,
  Flame,
  Dumbbell,
  Wheat,
  Droplet,
  ScanLine,
  Plus,
  Scale,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GlassCard } from '../components/common/GlassCard';
import { ProgressBar } from '../components/common/ProgressBar';
import { Badge } from '../components/common/Badge';
import { formatCalories, formatGrams, formatKg, formatSignedKg, getGreetingTime } from '../utils/formatters';

interface DashboardPageProps {
  onNavigateTab: (tab: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigateTab }) => {
  const {
    profile,
    targets,
    dailyNutrition,
    weightTrend,
    coachInsights,
    openScanner,
    openAddFood,
    openLogWeight,
  } = useApp();

  const userName = profile?.name || 'Athlete';
  const targetCalories = targets?.targetCalories || 2700;
  const targetProtein = targets?.proteinGrams || 96;
  const targetCarbs = targets?.carbGrams || 410;
  const targetFat = targets?.fatGrams || 75;

  const currentWeight = profile?.currentWeightKg || 58.7;
  const targetWeight = profile?.targetWeightKg || 65.0;
  const totalTargetGain = Math.max(0.1, targetWeight - currentWeight);
  const totalGained = weightTrend.totalGainedKg || 0;
  const progressPct = weightTrend.progressPercentage || 0;

  const calRemaining = Math.max(0, targetCalories - dailyNutrition.totalCalories);
  const calConsumed = dailyNutrition.totalCalories;
  const proteinRemaining = Math.max(0, targetProtein - dailyNutrition.totalProtein);
  const carbsRemaining = Math.max(0, targetCarbs - dailyNutrition.totalCarbs);
  const fatRemaining = Math.max(0, targetFat - dailyNutrition.totalFat);

  const topInsight = coachInsights[0];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* 1. TOP SECTION: Personalized Greeting & Weight Goal Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white font-sans">
              {getGreetingTime()}, <span className="bg-gradient-to-r from-white via-slate-100 to-emerald-300 bg-clip-text text-transparent">{userName}</span> 👋
            </h1>
          </div>
          <p className="text-sm sm:text-base text-slate-400 mt-1">
            Let's make today's nutrition count. Controlled lean mass surplus: <span className="font-semibold text-emerald-400">+{targets?.surplusCalories || 250} kcal/day</span>.
          </p>
        </div>

        {/* Quick Weigh-In CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={openLogWeight}
            className="flex items-center gap-2 py-2.5 px-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-cyan-500/40 text-xs sm:text-sm font-semibold text-slate-200 shadow-sm transition-all"
          >
            <Scale className="w-4 h-4 text-cyan-400" />
            <span>Log Today's Weight</span>
          </button>

          <button
            onClick={() => openScanner()}
            className="flex items-center gap-2 py-2.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_4px_20px_rgba(16,185,129,0.35)] transition-all"
          >
            <ScanLine className="w-4 h-4 text-slate-950" />
            <span>Scan Food</span>
          </button>
        </div>
      </div>

      {/* 2. PROGRESS BANNER: Current Weight -> Target Weight */}
      <GlassCard className="p-5 sm:p-7 relative overflow-hidden" glowColor="emerald">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-widest text-slate-400">
                Weight Goal Progression
              </span>
              <Badge variant="emerald" size="xs">
                Clean Hypertrophy
              </Badge>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                {formatKg(currentWeight)}
              </span>
              <span className="text-xl text-slate-500 font-mono">→</span>
              <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">
                {formatKg(targetWeight)}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400">
              {weightTrend.remainingKg > 0 ? (
                <>
                  <span className="font-semibold text-slate-200 font-mono">{weightTrend.remainingKg} kg</span> remaining to target. Safe gain rate: <span className="font-mono text-emerald-400">+{targets?.targetWeeklyGainKgMin || 0.15}–{targets?.targetWeeklyGainKgMax || 0.3} kg/wk</span>.
                </>
              ) : (
                <span className="text-emerald-400 font-semibold">Target weight reached! Time to recalibrate or maintain.</span>
              )}
            </p>
          </div>

          {/* Progress Percentage Visual */}
          <div className="md:w-72 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Goal Journey</span>
              <span className="font-bold text-emerald-400 font-mono text-sm">{progressPct}%</span>
            </div>
            <ProgressBar current={totalGained} target={totalTargetGain} colorScheme="emerald" height="lg" />
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Start: {formatKg(weightTrend.startingWeightKg)}</span>
              <span>Gained: {formatSignedKg(totalGained)}</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* 3. NUTRITION CARDS: 4 Premium Glass Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Today's Nutrition Targets</span>
            <span className="text-xs font-normal text-slate-400">({formatCalories(calRemaining)} remaining)</span>
          </h2>

          <button
            onClick={() => onNavigateTab('nutrition')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
          >
            <span>View Full Breakdown</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Calories */}
          <GlassCard className="p-5 space-y-4" hoverEffect glowColor="emerald">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center">
                <Flame className="w-5 h-5 text-amber-400" />
              </div>
              <Badge variant="amber" size="xs">
                +{targets?.surplusCalories || 250} kcal
              </Badge>
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Daily Calories
              </span>
              <div className="text-2xl font-black text-white font-mono mt-0.5">
                {calConsumed.toLocaleString()} <span className="text-sm font-normal text-slate-400">/ {targetCalories.toLocaleString()} kcal</span>
              </div>
            </div>

            <ProgressBar current={calConsumed} target={targetCalories} colorScheme="amber" showPercentage />

            <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-1 border-t border-white/5">
              <span>Remaining:</span>
              <span className="font-bold text-amber-300">{formatCalories(calRemaining)}</span>
            </div>
          </GlassCard>

          {/* Card 2: Protein */}
          <GlassCard className="p-5 space-y-4" hoverEffect glowColor="emerald">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-emerald-400" />
              </div>
              <Badge variant="emerald" size="xs">
                {profile?.proteinGramsPerKg || 1.6} g/kg
              </Badge>
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Protein
              </span>
              <div className="text-2xl font-black text-white font-mono mt-0.5">
                {Math.round(dailyNutrition.totalProtein)} <span className="text-sm font-normal text-slate-400">/ {targetProtein} g</span>
              </div>
            </div>

            <ProgressBar current={dailyNutrition.totalProtein} target={targetProtein} colorScheme="emerald" showPercentage />

            <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-1 border-t border-white/5">
              <span>Remaining:</span>
              <span className="font-bold text-emerald-300">{formatGrams(proteinRemaining)}</span>
            </div>
          </GlassCard>

          {/* Card 3: Carbohydrates */}
          <GlassCard className="p-5 space-y-4" hoverEffect glowColor="cyan">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center">
                <Wheat className="w-5 h-5 text-cyan-400" />
              </div>
              <Badge variant="cyan" size="xs">
                Energy Base
              </Badge>
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Carbohydrates
              </span>
              <div className="text-2xl font-black text-white font-mono mt-0.5">
                {Math.round(dailyNutrition.totalCarbs)} <span className="text-sm font-normal text-slate-400">/ {targetCarbs} g</span>
              </div>
            </div>

            <ProgressBar current={dailyNutrition.totalCarbs} target={targetCarbs} colorScheme="cyan" showPercentage />

            <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-1 border-t border-white/5">
              <span>Remaining:</span>
              <span className="font-bold text-cyan-300">{formatGrams(carbsRemaining)}</span>
            </div>
          </GlassCard>

          {/* Card 4: Fat */}
          <GlassCard className="p-5 space-y-4" hoverEffect glowColor="none">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center">
                <Droplet className="w-5 h-5 text-indigo-400" />
              </div>
              <Badge variant="purple" size="xs">
                28% Calories
              </Badge>
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Dietary Fats
              </span>
              <div className="text-2xl font-black text-white font-mono mt-0.5">
                {Math.round(dailyNutrition.totalFat)} <span className="text-sm font-normal text-slate-400">/ {targetFat} g</span>
              </div>
            </div>

            <ProgressBar current={dailyNutrition.totalFat} target={targetFat} colorScheme="blue" showPercentage />

            <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-1 border-t border-white/5">
              <span>Remaining:</span>
              <span className="font-bold text-indigo-300">{formatGrams(fatRemaining)}</span>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* 4. HERO FEATURE: FOOD SCANNER CARD */}
      <GlassCard className="p-6 sm:p-8 relative overflow-hidden border-emerald-500/25" glowColor="emerald">
        {/* Subtle decorative glow */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ScanLine className="w-4 h-4" />
              </div>
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
                AI Vision Recognition
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              What's on your plate?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Upload a food photo and estimate its nutrition. Our multi-stage neural vision engine decomposes your meal into individual ingredients, estimates volumetric portions, and calculates complete macros.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Automatic ingredient bounding
              </span>
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Volumetric portion estimation
              </span>
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Fully editable before logging
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <button
              onClick={() => openScanner()}
              className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-sm shadow-[0_4px_25px_rgba(16,185,129,0.4)] hover:shadow-[0_6px_30px_rgba(16,185,129,0.55)] transition-all flex items-center justify-center gap-2.5"
            >
              <ScanLine className="w-4 h-4" />
              <span>Launch Food Scanner</span>
            </button>

            <button
              onClick={() => openAddFood()}
              className="py-3 px-5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 font-semibold text-xs border border-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Search Food Database</span>
            </button>
          </div>
        </div>
      </GlassCard>

      {/* 5. QUICK TODAY'S MEALS & COACH INSIGHT SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Logged Meals Summary (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Today's Meals
            </h3>
            <button
              onClick={() => onNavigateTab('nutrition')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <span>Manage Meals</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[
              { type: 'breakfast', label: 'Breakfast', entries: dailyNutrition.meals.breakfast || [] },
              { type: 'lunch', label: 'Lunch', entries: dailyNutrition.meals.lunch || [] },
              { type: 'snacks', label: 'Snacks', entries: dailyNutrition.meals.snacks || [] },
              { type: 'dinner', label: 'Dinner', entries: dailyNutrition.meals.dinner || [] },
            ].map((slot) => {
              const count = slot.entries.length;
              const slotCalories = slot.entries.reduce((acc, curr) => acc + curr.calories, 0);

              return (
                <div
                  key={slot.type}
                  onClick={() => onNavigateTab('nutrition')}
                  className="p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/5 hover:border-white/15 cursor-pointer transition-all duration-200 space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {slot.label}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {count > 0 ? formatCalories(slotCalories) : '0 kcal'}
                    </span>
                  </div>

                  {count === 0 ? (
                    <p className="text-xs text-slate-500 italic">No food logged yet</p>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-xs text-slate-300 truncate">
                        {slot.entries.map((e) => e.foodName).join(', ')}
                      </p>
                      <span className="text-[10px] text-slate-500 font-mono block">
                        {count} item{count > 1 ? 's' : ''} logged
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Coach Top Insight (1 Column) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>AI Coach Highlight</span>
            </h3>
            <button
              onClick={() => onNavigateTab('coach')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              Ask Coach
            </button>
          </div>

          {topInsight ? (
            <GlassCard className="p-5 space-y-3.5 border-emerald-500/20" glowColor="emerald">
              <div className="flex items-center justify-between">
                <Badge variant="emerald" size="xs">
                  {topInsight.title}
                </Badge>
                {topInsight.metric && (
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {topInsight.metric}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{topInsight.message}</p>

              <button
                onClick={() => onNavigateTab('coach')}
                className="w-full py-2 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-colors border border-white/5"
              >
                <span>Open AI Coach Workspace</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </GlassCard>
          ) : (
            <GlassCard className="p-5 text-center text-xs text-slate-400 space-y-2">
              <p>Log your meals and weight to unlock real-time intelligent surplus coaching.</p>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
};
