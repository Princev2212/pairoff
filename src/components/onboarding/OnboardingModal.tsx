import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Target,
  User,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { UserProfile, Sex, ActivityLevel, WeightGoalType } from '../../types';
import { calculateNutritionTargets, ACTIVITY_MULTIPLIERS } from '../../services/nutritionCalculator';
import { formatSignedKg, formatCalories, formatGrams } from '../../utils/formatters';

export const OnboardingModal: React.FC = () => {
  const { setProfile, loadDemoData } = useApp();

  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState('Alex');
  const [age, setAge] = useState<number>(24);
  const [sex, setSex] = useState<Sex>('male');
  const [heightCm, setHeightCm] = useState<number>(175);
  const [currentWeightKg, setCurrentWeightKg] = useState<number>(58.7);
  const [targetWeightKg, setTargetWeightKg] = useState<number>(65.0);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [workoutDaysPerWeek, setWorkoutDaysPerWeek] = useState<number>(4);
  const [goalType, setGoalType] = useState<WeightGoalType>('lean_bulk');
  const [proteinGramsPerKg, setProteinGramsPerKg] = useState<number>(1.6);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Real-time calculation preview
  const livePreview = useMemo(() => {
    if (currentWeightKg <= 0 || heightCm <= 0 || age <= 0) return null;
    return calculateNutritionTargets({
      currentWeightKg,
      heightCm,
      age,
      sex,
      activityLevel,
      proteinGramsPerKg,
    });
  }, [currentWeightKg, heightCm, age, sex, activityLevel, proteinGramsPerKg]);

  const weightDifference = Number((targetWeightKg - currentWeightKg).toFixed(1));

  const validateStep1 = () => {
    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return false;
    }
    if (age < 14 || age > 95) {
      setErrorMsg('Please enter a valid age between 14 and 95.');
      return false;
    }
    setErrorMsg(null);
    return true;
  };

  const validateStep2 = () => {
    if (heightCm < 110 || heightCm > 240) {
      setErrorMsg('Please enter a valid height in cm (110 - 240 cm).');
      return false;
    }
    if (currentWeightKg < 35 || currentWeightKg > 220) {
      setErrorMsg('Please enter a valid current weight in kg (35 - 220 kg).');
      return false;
    }
    if (targetWeightKg <= currentWeightKg) {
      setErrorMsg('Target weight should be higher than your current weight for a weight-gain program.');
      return false;
    }
    setErrorMsg(null);
    return true;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setErrorMsg(null);
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setErrorMsg(null);
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleCompleteSetup = () => {
    if (!validateStep2()) return;

    const newProfile: UserProfile = {
      name: name.trim() || 'Athlete',
      age: Number(age),
      sex,
      heightCm: Number(heightCm),
      currentWeightKg: Number(currentWeightKg),
      targetWeightKg: Number(targetWeightKg),
      activityLevel,
      workoutDaysPerWeek: Number(workoutDaysPerWeek),
      goalType,
      proteinGramsPerKg: Number(proteinGramsPerKg),
      customCalorieAdjustment: 0,
      isOnboarded: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProfile(newProfile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#04070B]/90 backdrop-blur-2xl">
      {/* Aurora Glow background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px]" />
      </div>

      <div className="relative w-full max-w-2xl bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] z-10 my-8">
        {/* Top edge glow */}
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/60 to-cyan-400/60" />

        {/* Header with Step Indicator */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-[1px]">
              <div className="w-full h-full bg-[#070A0F] rounded-xl flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-white">MYGAIN Setup</h2>
              <p className="text-xs text-slate-400">Step {step} of 4</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step
                    ? 'w-7 bg-emerald-400 shadow-[0_0_8px_#34D399]'
                    : s < step
                    ? 'w-4 bg-emerald-700/60'
                    : 'w-4 bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Error Banner */}
        {errorMsg && (
          <div className="mb-6 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2 animate-fade-in">
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Welcome to MYGAIN</h3>
              <p className="text-sm text-slate-400 mt-1">
                Let's calibrate your metabolic engine for controlled, clean weight gain.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Your First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-800/70 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500/60 focus:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Age (Years)
                  </label>
                  <input
                    type="number"
                    min={14}
                    max={95}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-800/70 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-emerald-500/60"
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
                      className={`py-2.5 px-3 rounded-2xl text-xs font-semibold border transition-all ${
                        sex === 'male'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                          : 'bg-slate-800/50 text-slate-400 border-white/5 hover:border-white/15'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setSex('female')}
                      className={`py-2.5 px-3 rounded-2xl text-xs font-semibold border transition-all ${
                        sex === 'female'
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                          : 'bg-slate-800/50 text-slate-400 border-white/5 hover:border-white/15'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={loadDemoData}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-medium text-slate-400 hover:text-slate-200 border border-white/5 transition-colors text-center"
                >
                  ⚡ Skip & Explore with Preloaded 14-Day Demo Data
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Measurements & Goals */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Height & Weight Target</h3>
              <p className="text-sm text-slate-400 mt-1">
                Mifflin-St Jeor calculation requires precise anthropometric numbers.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Height (cm)
                  </label>
                  <span className="text-xs text-slate-400 font-mono">
                    {heightCm} cm ({Math.floor(heightCm / 30.48)}' {Math.round((heightCm % 30.48) / 2.54)}")
                  </span>
                </div>
                <input
                  type="number"
                  min={110}
                  max={240}
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-800/70 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-emerald-500/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Current Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min={35}
                    max={200}
                    value={currentWeightKg}
                    onChange={(e) => setCurrentWeightKg(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-800/70 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-emerald-500/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Target Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min={36}
                    max={210}
                    value={targetWeightKg}
                    onChange={(e) => setTargetWeightKg(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-800/70 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-emerald-500/60"
                  />
                </div>
              </div>

              {/* Weight delta pill */}
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                <span className="text-xs text-slate-300">Target Weight Delta</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">
                  {formatSignedKg(weightDifference)} ({((weightDifference / currentWeightKg) * 100).toFixed(1)}% total gain)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Activity & Training */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Activity & Training</h3>
              <p className="text-sm text-slate-400 mt-1">
                Your activity multiplier calculates your baseline energy expenditure (TDEE).
              </p>
            </div>

            <div className="space-y-3">
              {(Object.keys(ACTIVITY_MULTIPLIERS) as ActivityLevel[]).map((level) => {
                const conf = ACTIVITY_MULTIPLIERS[level];
                const isSelected = activityLevel === level;

                return (
                  <div
                    key={level}
                    onClick={() => setActivityLevel(level)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                        : 'bg-slate-800/40 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{conf.label}</span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                          {conf.multiplier}x
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{conf.description}</p>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                  </div>
                );
              })}

              {/* Goal Type selector */}
              <div className="pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Weight Gain Style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGoalType('lean_bulk')}
                    className={`p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                      goalType === 'lean_bulk'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-800/40 text-slate-400 border-white/5'
                    }`}
                  >
                    Lean Muscle Surplus (+250 kcal)
                  </button>
                  <button
                    type="button"
                    onClick={() => setGoalType('general_gain')}
                    className={`p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                      goalType === 'general_gain'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        : 'bg-slate-800/40 text-slate-400 border-white/5'
                    }`}
                  >
                    General Mass Gain (+350 kcal)
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Workout Days Per Week
                </label>
                <div className="flex items-center gap-2">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setWorkoutDaysPerWeek(num)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                        workoutDaysPerWeek === num
                          ? 'bg-emerald-500 text-slate-950 shadow-[0_0_10px_#34D399]'
                          : 'bg-slate-800/60 text-slate-400 border border-white/5 hover:bg-slate-700/60'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Live Target Preview & Confirmation */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Your Nutrition Strategy</h3>
              <p className="text-sm text-slate-400 mt-1">
                Personalized targets calibrated for lean hypertrophy with minimal fat accumulation.
              </p>
            </div>

            {livePreview && (
              <div className="space-y-4">
                {/* Live Metabolic Summary Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-emerald-500/30 shadow-[0_0_25px_rgba(16,185,129,0.15)] space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <span className="text-xs text-slate-400">Target Daily Calories</span>
                      <div className="text-3xl font-extrabold text-white font-mono flex items-baseline gap-1.5">
                        <span>{formatCalories(livePreview.targetCalories)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                        +{livePreview.surplusCalories} kcal Surplus
                      </span>
                      <p className="text-[11px] text-slate-400 mt-1">TDEE: {livePreview.tdee} kcal</p>
                    </div>
                  </div>

                  {/* 3 Macro Pillars */}
                  <div className="grid grid-cols-3 gap-2.5 text-center">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-[11px] text-emerald-400 font-bold uppercase">Protein</span>
                      <p className="text-base font-bold text-white font-mono mt-0.5">
                        {formatGrams(livePreview.proteinGrams)}
                      </p>
                      <span className="text-[10px] text-slate-400">{proteinGramsPerKg}g/kg</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                      <span className="text-[11px] text-cyan-400 font-bold uppercase">Carbs</span>
                      <p className="text-base font-bold text-white font-mono mt-0.5">
                        {formatGrams(livePreview.carbGrams)}
                      </p>
                      <span className="text-[10px] text-slate-400">{livePreview.carbCalories} kcal</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                      <span className="text-[11px] text-indigo-400 font-bold uppercase">Fat</span>
                      <p className="text-base font-bold text-white font-mono mt-0.5">
                        {formatGrams(livePreview.fatGrams)}
                      </p>
                      <span className="text-[10px] text-slate-400">28% energy</span>
                    </div>
                  </div>

                  {/* Controlled Target Rate */}
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between text-xs">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-emerald-400" />
                      Target Weekly Gain Range
                    </span>
                    <span className="font-bold text-emerald-400 font-mono">
                      +{livePreview.targetWeeklyGainKgMin} – {livePreview.targetWeeklyGainKgMax} kg/wk
                    </span>
                  </div>
                </div>

                {/* Protein Preference Slider */}
                <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-medium">Protein Target Ratio</span>
                    <span className="font-bold text-emerald-400 font-mono">{proteinGramsPerKg} g/kg bodyweight</span>
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
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>1.4g (Standard)</span>
                    <span>1.6g (Lean Bulk)</span>
                    <span>2.0g+ (High Protein)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-white/10">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 py-3 px-5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold text-sm border border-white/5 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-sm shadow-[0_4px_20px_rgba(16,185,129,0.35)] transition-all ml-auto"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCompleteSetup}
              className="flex items-center gap-2 py-3 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold text-sm shadow-[0_6px_25px_rgba(16,185,129,0.45)] transition-all ml-auto"
            >
              <span>Launch MYGAIN Dashboard</span>
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
