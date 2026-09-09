import React from 'react';
import {
  Sparkles,
  Flame,
  Dumbbell,
  TrendingUp,
  Lightbulb,
  ArrowRight,
} from 'lucide-react';
import type { CoachInsight } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { Badge } from '../common/Badge';

interface AICoachCardProps {
  insight: CoachInsight;
  onAction?: (route?: string) => void;
}

export const AICoachCard: React.FC<AICoachCardProps> = ({ insight, onAction }) => {
  const iconConfigs = {
    calorie_surplus: {
      icon: Flame,
      variant: 'amber' as const,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
    },
    protein_pacing: {
      icon: Dumbbell,
      variant: 'emerald' as const,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
    },
    weight_trend: {
      icon: TrendingUp,
      variant: 'cyan' as const,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
    },
    meal_timing: {
      icon: Sparkles,
      variant: 'purple' as const,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
    density_tip: {
      icon: Lightbulb,
      variant: 'emerald' as const,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
    },
  };

  const config = iconConfigs[insight.type] || iconConfigs.density_tip;
  const Icon = config.icon;

  return (
    <GlassCard className="p-5 sm:p-6 space-y-4 relative group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl ${config.bgColor} flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${config.color}`} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white tracking-tight">{insight.title}</h4>
            {insight.metric && (
              <span className="text-xs font-mono font-bold text-emerald-400">
                {insight.metric}
              </span>
            )}
          </div>
        </div>

        <Badge variant={config.variant} size="xs">
          {insight.priority.toUpperCase()}
        </Badge>
      </div>

      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{insight.message}</p>

      {insight.actionLabel && (
        <div className="pt-1">
          <button
            type="button"
            onClick={() => onAction && onAction(insight.actionRoute)}
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>{insight.actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </GlassCard>
  );
};
