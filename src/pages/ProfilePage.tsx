import React, { useState } from 'react';
import {
  User,
  Scale,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  Check,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GlassCard } from '../components/common/GlassCard';
import { ACTIVITY_MULTIPLIERS } from '../services/nutritionCalculator';
import type { ActivityLevel, Sex } from '../types';
import { exportAllDataJSON, importAllDataJSON } from '../utils/storage';

export const ProfilePage: React.FC = () => {
  const {
    profile,
    targets,
    updateProfile,
    loadDemoData,
    resetAllData,
  } = useApp();

  const [name, setName] = useState(profile?.name || 'Alex');
  const [age, setAge] = useState<number>(profile?.age || 24);
  const [sex, setSex] = useState<Sex>(profile?.sex || 'male');
  const [heightCm, setHeightCm] = useState<number>(profile?.heightCm || 175);
  const [currentWeightKg, setCurrentWeightKg] = useState<number>(profile?.currentWeightKg || 58.7);
  const [targetWeightKg, setTargetWeightKg] = useState<number>(profile?.targetWeightKg || 65.0);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(
    profile?.activityLevel || 'moderate'
  );
  const [workoutDays, setWorkoutDays] = useState<number>(profile?.workoutDaysPerWeek || 4);
  const [proteinGramsPerKg, setProteinGramsPerKg] = useState<number>(
    profile?.proteinGramsPerKg || 1.6
  );
  const [customCalorieAdjustment, setCustomCalorieAdjustment] = useState<number>(
    profile?.customCalorieAdjustment || 0
  );

  const [isSaved, setIsSaved] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: name.trim(),
      age: Number(age),
      sex,
      heightCm: Number(heightCm),
      currentWeightKg: Number(currentWeightKg),
      targetWeightKg: Number(targetWeightKg),
      activityLevel,
      workoutDaysPerWeek: Number(workoutDays),
      proteinGramsPerKg: Number(proteinGramsPerKg),
      customCalorieAdjustment: Number(customCalorieAdjustment),
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleExport = () => {
    const jsonStr = exportAllDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mygain_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content && importAllDataJSON(content)) {
          window.location.reload();
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          Profile & Metabolic Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Fine-tune anthropometric metrics, Mifflin-St Jeor surplus, and macro ratios
        </p>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* Personal & Body Metrics */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <User className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Personal Information
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/70 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500/60"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/70 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-emerald-500/60"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Biological Sex
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSex('male')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    sex === 'male'
                      ? 'bg-emerald-500 text-slate-950 shadow-[0_0_10px_#34D399]'
                      : 'bg-slate-800/50 text-slate-400 border border-white/5'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setSex('female')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    sex === 'female'
                      ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_#22D3EE]'
                      : 'bg-slate-800/50 text-slate-400 border border-white/5'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Height (cm)
              </label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/70 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-emerald-500/60"
              />
            </div>
          </div>
        </GlassCard>

        {/* Goal Targets */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <Scale className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Weight Gain Goal
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Current Body Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={currentWeightKg}
                onChange={(e) => setCurrentWeightKg(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/70 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-emerald-500/60"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Target Body Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={targetWeightKg}
                onChange={(e) => setTargetWeightKg(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/70 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-emerald-500/60"
              />
            </div>
          </div>

          {/* Activity Multiplier Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Activity Level
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(Object.keys(ACTIVITY_MULTIPLIERS) as ActivityLevel[]).map((level) => {
                const conf = ACTIVITY_MULTIPLIERS[level];
                const isSelected = activityLevel === level;
                return (
                  <div
                    key={level}
                    onClick={() => setActivityLevel(level)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-white'
                        : 'bg-slate-800/40 border-white/5 text-slate-400 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{conf.label}</span>
                      <span className="text-[10px] font-mono text-emerald-400">
                        {conf.multiplier}x
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{conf.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Workout Days */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Workout Days Per Week
            </label>
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setWorkoutDays(days)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                    workoutDays === days
                      ? 'bg-emerald-500 text-slate-950 shadow-[0_0_10px_#34D399]'
                      : 'bg-slate-800/60 text-slate-400 border border-white/5 hover:bg-slate-700/60'
                  }`}
                >
                  {days}
                </button>
              ))}
            </div>
          </div>

          {/* Protein Ratio Slider */}
          <div className="p-4 rounded-xl bg-slate-800/40 border border-white/5 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium">Protein Target Ratio</span>
              <span className="font-bold text-emerald-400 font-mono">
                {proteinGramsPerKg} g/kg ({Math.round(currentWeightKg * proteinGramsPerKg)} g/day)
              </span>
            </div>
            <input
              type="range"
              min="1.4"
              max="2.2"
              step="0.1"
              value={proteinGramsPerKg}
              onChange={(e) => setProteinGramsPerKg(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          {/* Custom Calorie Adjustment Override */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Manual Calorie Adjustment (Optional Offset)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                step="50"
                value={customCalorieAdjustment}
                onChange={(e) => setCustomCalorieAdjustment(Number(e.target.value))}
                className="w-32 px-3.5 py-2.5 rounded-xl bg-slate-800/70 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-emerald-500/60"
              />
              <span className="text-xs text-slate-400">
                kcal/day (e.g. +150 for higher surplus or -100 to slow down)
              </span>
            </div>
          </div>
        </GlassCard>

        {/* Calculated Engine Summary */}
        {targets && (
          <GlassCard className="p-5 bg-gradient-to-br from-slate-900 to-slate-850 border border-emerald-500/20">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-2.5 rounded-xl bg-white/[0.03]">
                <span className="text-[10px] uppercase text-slate-400 block">BMR</span>
                <span className="font-bold text-white font-mono text-base">{targets.bmr} kcal</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03]">
                <span className="text-[10px] uppercase text-slate-400 block">TDEE</span>
                <span className="font-bold text-white font-mono text-base">{targets.tdee} kcal</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-[10px] uppercase text-emerald-400 font-bold block">
                  Target Calories
                </span>
                <span className="font-extrabold text-emerald-300 font-mono text-base">
                  {targets.targetCalories} kcal
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <span className="text-[10px] uppercase text-cyan-400 font-bold block">
                  Weekly Rate
                </span>
                <span className="font-bold text-cyan-300 font-mono text-xs">
                  +{targets.targetWeeklyGainKgMin}–{targets.targetWeeklyGainKgMax} kg/w
                </span>
              </div>
            </div>
          </GlassCard>
        )}

        {/* Save Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="py-3 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-[0_4px_20px_rgba(16,185,129,0.35)] transition-all flex items-center gap-2"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Settings Saved!</span>
              </>
            ) : (
              <span>Save & Recalculate Targets</span>
            )}
          </button>
        </div>
      </form>

      {/* Data Management & Persistence */}
      <GlassCard className="p-6 space-y-4 border-white/5">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Data Management & Local Storage
        </h3>
        <p className="text-xs text-slate-400">
          All data persists locally in your browser. You can export a JSON backup or seed 14-day demo data anytime.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          {/* Load Demo Data */}
          <button
            type="button"
            onClick={loadDemoData}
            className="py-2 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Load 14-Day Sample Demo Data</span>
          </button>

          {/* Export JSON */}
          <button
            type="button"
            onClick={handleExport}
            className="py-2 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 border border-white/10 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON Backup</span>
          </button>

          {/* Import JSON */}
          <label className="py-2 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 border border-white/10 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>Import JSON</span>
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>

          {/* Reset Data */}
          {showResetConfirm ? (
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30">
              <span className="text-[11px] text-rose-300 font-semibold px-2">Confirm reset?</span>
              <button
                type="button"
                onClick={resetAllData}
                className="py-1 px-2.5 rounded-lg bg-rose-500 text-white font-bold text-xs"
              >
                Yes, Clear All
              </button>
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="py-1 px-2 rounded-lg bg-slate-800 text-slate-300 text-xs"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="py-2 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-semibold flex items-center gap-2 transition-colors ml-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>
          )}
        </div>
      </GlassCard>
    </div>
  );
};
