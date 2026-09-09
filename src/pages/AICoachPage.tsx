import React from 'react';
import {
  Bot,
  Sparkles,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AICoachCard } from '../components/coach/AICoachCard';
import { AskCoachChat } from '../components/coach/AskCoachChat';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';

interface AICoachPageProps {
  onNavigateTab: (tab: string) => void;
}

export const AICoachPage: React.FC<AICoachPageProps> = ({ onNavigateTab }) => {
  const { coachInsights, targets } = useApp();

  const handleAction = (route?: string) => {
    if (route) {
      const tab = route.replace('/', '');
      onNavigateTab(tab);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-[1px]">
              <div className="w-full h-full bg-[#070A0F] rounded-xl flex items-center justify-center">
                <Bot className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              MYGAIN AI Coach
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time surplus evaluation, protein synthesis pacing, and adaptive velocity insights
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="emerald" size="sm" icon={<Sparkles className="w-3.5 h-3.5 text-emerald-400" />}>
            Active Coaching Engine
          </Badge>
        </div>
      </div>

      {/* Grid: Coaching Insights Cards (Left 3 cols) + Interactive AI Chat (Right 2 cols on desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Dynamic Insight Cards */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Real-Time Nutrition Analysis
            </h2>
            <span className="text-xs text-slate-400">
              {coachInsights.length} active insights
            </span>
          </div>

          <div className="space-y-3.5">
            {coachInsights.map((insight) => (
              <AICoachCard key={insight.id} insight={insight} onAction={handleAction} />
            ))}
          </div>

          {/* Practical Hypertrophy Guidelines Card */}
          <GlassCard className="p-5 space-y-3 border-white/5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Core Clean Bulking Directives</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Controlled Surplus:</strong> A +250 kcal surplus targets muscle protein synthesis without overwhelming adipose storage.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Protein Distribution:</strong> Distribute {targets?.proteinGrams || 96}g across 3–4 meals (approx 25–35g per feeding) to maximize leucine trigger thresholds.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Digestive Comfort:</strong> Utilize smart liquid calories (shakes with milk, oats, and nut butters) to avoid heavy fullness.
                </span>
              </li>
            </ul>
          </GlassCard>
        </div>

        {/* Right: Interactive AI Coach Chat Assistant */}
        <div className="lg:col-span-2">
          <div className="sticky top-20">
            <AskCoachChat />
          </div>
        </div>
      </div>
    </div>
  );
};
