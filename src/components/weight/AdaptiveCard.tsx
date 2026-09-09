import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  Activity,
  Check,
} from 'lucide-react';
import type { WeightTrendEvaluation } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { Badge } from '../common/Badge';
import { useApp } from '../../context/AppContext';
import { formatKg, formatSignedKg } from '../../utils/formatters';

interface AdaptiveCardProps {
  evaluation: WeightTrendEvaluation;
}

export const AdaptiveCard: React.FC<AdaptiveCardProps> = ({ evaluation }) => {
  const { applySuggestedCalorieAdjustment, targets } = useApp();
  const [isApplied, setIsApplied] = useState(false);

  const statusConfigs = {
    on_track: {
      icon: CheckCircle2,
      variant: 'emerald' as const,
      badgeText: 'Optimal Velocity',
      borderColor: 'border-emerald-500/30',
      bgColor: 'bg-emerald-500/10',
    },
    below_target: {
      icon: AlertTriangle,
      variant: 'amber' as const,
      badgeText: 'Below Target Rate',
      borderColor: 'border-amber-500/30',
      bgColor: 'bg-amber-500/10',
    },
    above_target: {
      icon: TrendingUp,
      variant: 'purple' as const,
      badgeText: 'Fast Gain Rate',
      borderColor: 'border-purple-500/30',
      bgColor: 'bg-purple-500/10',
    },
    insufficient_data: {
      icon: Activity,
      variant: 'slate' as const,
      badgeText: 'Calibrating Baseline',
      borderColor: 'border-white/10',
      bgColor: 'bg-slate-800/40',
    },
  };

  const currentStatus = statusConfigs[evaluation.status];
  const Icon = currentStatus.icon;

  const handleApplyAdjustment = () => {
    if (evaluation.suggestedCalorieAdjustment !== 0) {
      applySuggestedCalorieAdjustment(evaluation.suggestedCalorieAdjustment);
      setIsApplied(true);
      setTimeout(() => setIsApplied(false), 3000);
    }
  };

  return (
    <GlassCard className={`p-5 sm:p-6 space-y-5 border ${currentStatus.borderColor}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl ${currentStatus.bgColor} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Adaptive Calorie Intelligence
              </h3>
              <Badge variant={currentStatus.variant} size="xs">
                {currentStatus.badgeText}
              </Badge>
            </div>
            <p className="text-xs text-slate-400">7-day rolling moving average feedback</p>
          </div>
        </div>

        <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 bg-white/[0.04] px-2 py-1 rounded-md">
          v1.0 Engine
        </span>
      </div>

      {/* Metric Callouts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5 space-y-0.5">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Current 7D Avg
          </span>
          <p className="text-lg font-bold text-white font-mono">
            {evaluation.current7DayAverageKg !== null
              ? formatKg(evaluation.current7DayAverageKg)
              : formatKg(evaluation.currentWeightKg)}
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5 space-y-0.5">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Prev 7D Avg
          </span>
          <p className="text-lg font-bold text-slate-300 font-mono">
            {evaluation.previous7DayAverageKg !== null
              ? formatKg(evaluation.previous7DayAverageKg)
              : '—'}
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5 space-y-0.5">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Weekly Change
          </span>
          <p
            className={`text-lg font-bold font-mono flex items-center gap-1 ${
              evaluation.weeklyChangeKg && evaluation.weeklyChangeKg > 0
                ? 'text-emerald-400'
                : 'text-slate-300'
            }`}
          >
            {evaluation.weeklyChangeKg !== null ? formatSignedKg(evaluation.weeklyChangeKg) : '—'}
            {evaluation.weeklyChangeKg && evaluation.weeklyChangeKg > 0 ? (
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            ) : null}
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5 space-y-0.5">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Target Velocity
          </span>
          <p className="text-lg font-bold text-cyan-400 font-mono">
            +{((targets?.targetWeeklyGainKgMin || 0.15)).toFixed(2)}–{((targets?.targetWeeklyGainKgMax || 0.3)).toFixed(2)} kg/w
          </p>
        </div>
      </div>

      {/* Recommendation Banner */}
      <div className="p-4 rounded-2xl bg-slate-800/40 border border-white/5 space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <h4 className="text-sm font-bold text-white">{evaluation.statusHeadline}</h4>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">{evaluation.recommendation}</p>
      </div>

      {/* Suggested Calorie Adjustment Action */}
      {evaluation.suggestedCalorieAdjustment !== 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/25">
          <div>
            <span className="text-xs font-semibold text-emerald-300">
              Recommended Target Adjustment:
            </span>
            <p className="text-sm font-bold text-white font-mono">
              {evaluation.suggestedCalorieAdjustment > 0
                ? `+${evaluation.suggestedCalorieAdjustment} kcal/day (New Target: ${(targets?.targetCalories || 2650) + evaluation.suggestedCalorieAdjustment} kcal)`
                : `${evaluation.suggestedCalorieAdjustment} kcal/day (New Target: ${(targets?.targetCalories || 2650) + evaluation.suggestedCalorieAdjustment} kcal)`}
            </p>
          </div>

          <button
            type="button"
            onClick={handleApplyAdjustment}
            disabled={isApplied}
            className={`py-2 px-5 rounded-xl font-bold text-xs shadow-md transition-all shrink-0 ${
              isApplied
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
            }`}
          >
            {isApplied ? (
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Applied!
              </span>
            ) : (
              <span>Apply Recommended Target</span>
            )}
          </button>
        </div>
      )}
    </GlassCard>
  );
};
