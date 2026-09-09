import React from 'react';
import {
  Scale,
  Plus,
  Trash2,
  ArrowUpRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WeightChart } from '../components/weight/WeightChart';
import { AdaptiveCard } from '../components/weight/AdaptiveCard';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { formatKg, formatSignedKg, formatDatePretty } from '../utils/formatters';

export const ProgressPage: React.FC = () => {
  const {
    profile,
    weightEntries,
    weightTrend,
    openLogWeight,
    deleteWeight,
  } = useApp();

  const currentWeight = profile?.currentWeightKg || 58.7;
  const targetWeight = profile?.targetWeightKg || 65.0;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Weight Progress & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            7-day rolling moving average eliminates hydration and digestive noise
          </p>
        </div>

        <button
          onClick={openLogWeight}
          className="flex items-center gap-2 py-2.5 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_4px_20px_rgba(6,182,212,0.35)] transition-all self-start sm:self-center"
        >
          <Scale className="w-4 h-4" />
          <span>Log Weigh-in</span>
        </button>
      </div>

      {/* Top 6 Key Metric Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* 1. Current Weight */}
        <GlassCard className="p-4 space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Current Weight
          </span>
          <div className="text-xl font-black text-white font-mono">
            {formatKg(currentWeight)}
          </div>
          <span className="text-[10px] text-slate-500">Latest log</span>
        </GlassCard>

        {/* 2. Target Weight */}
        <GlassCard className="p-4 space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Target Goal
          </span>
          <div className="text-xl font-black text-emerald-400 font-mono">
            {formatKg(targetWeight)}
          </div>
          <span className="text-[10px] text-emerald-500/80">Hypertrophy target</span>
        </GlassCard>

        {/* 3. Total Gained */}
        <GlassCard className="p-4 space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Total Gained
          </span>
          <div className="text-xl font-black text-cyan-400 font-mono">
            {formatSignedKg(weightTrend.totalGainedKg)}
          </div>
          <span className="text-[10px] text-slate-500">Since baseline</span>
        </GlassCard>

        {/* 4. Remaining */}
        <GlassCard className="p-4 space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Remaining
          </span>
          <div className="text-xl font-black text-white font-mono">
            {formatKg(weightTrend.remainingKg)}
          </div>
          <span className="text-[10px] text-slate-500">Distance to goal</span>
        </GlassCard>

        {/* 5. Weekly Change */}
        <GlassCard className="p-4 space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Weekly Velocity
          </span>
          <div className="text-xl font-black text-emerald-400 font-mono flex items-center gap-1">
            {weightTrend.weeklyChangeKg !== null ? formatSignedKg(weightTrend.weeklyChangeKg) : '—'}
            {weightTrend.weeklyChangeKg && weightTrend.weeklyChangeKg > 0 ? (
              <ArrowUpRight className="w-3.5 h-3.5" />
            ) : null}
          </div>
          <span className="text-[10px] text-slate-500">7D rolling rate</span>
        </GlassCard>

        {/* 6. Progress Pct */}
        <GlassCard className="p-4 space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Progress
          </span>
          <div className="text-xl font-black text-white font-mono">
            {weightTrend.progressPercentage}%
          </div>
          <span className="text-[10px] text-emerald-400">Completed</span>
        </GlassCard>
      </div>

      {/* Interactive Recharts Graph */}
      <WeightChart entries={weightEntries} targetWeightKg={targetWeight} />

      {/* Adaptive Calorie Engine Card */}
      <AdaptiveCard evaluation={weightTrend} />

      {/* Weigh-in History Log Table */}
      <GlassCard className="p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Weigh-in History
            </h3>
            <Badge variant="outline" size="xs">
              {weightEntries.length} entries
            </Badge>
          </div>

          <button
            onClick={openLogWeight}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Entry</span>
          </button>
        </div>

        {weightEntries.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-xs">
            No weigh-in logs recorded yet. Start logging your morning weight above.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Weight</th>
                  <th className="pb-3 font-semibold">Time / Condition</th>
                  <th className="pb-3 font-semibold">Notes</th>
                  <th className="pb-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {weightEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 font-mono text-slate-200">
                      {formatDatePretty(entry.date)}
                      <span className="block text-[10px] text-slate-500">{entry.date}</span>
                    </td>
                    <td className="py-3 font-bold font-mono text-white text-sm">
                      {entry.weightKg} kg
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1.5">
                        {entry.isFasted && (
                          <Badge variant="emerald" size="xs">
                            Fasted
                          </Badge>
                        )}
                        {entry.timeOfDay && (
                          <span className="text-[10px] capitalize text-slate-400">
                            {entry.timeOfDay}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 text-slate-400 text-xs max-w-xs truncate">
                      {entry.notes || '—'}
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => deleteWeight(entry.id)}
                        aria-label="Delete weigh-in entry"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>
    </div>
  );
};
