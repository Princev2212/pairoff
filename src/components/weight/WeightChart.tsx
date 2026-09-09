import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid,
} from 'recharts';
import type { WeightEntry } from '../../types';
import { calculateWeightTrendPoints } from '../../services/adaptiveEngine';
import { GlassCard } from '../common/GlassCard';
import { Badge } from '../common/Badge';
import { Scale } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface WeightChartProps {
  entries: WeightEntry[];
  targetWeightKg: number;
}

export const WeightChart: React.FC<WeightChartProps> = ({ entries, targetWeightKg }) => {
  const { openLogWeight } = useApp();
  const [timeframe, setTimeframe] = useState<'7d' | '14d' | '30d' | 'all'>('14d');
  const [show7DayAvg, setShow7DayAvg] = useState<boolean>(true);

  // Compute 7-day rolling average data points
  const allTrendPoints = useMemo(() => {
    return calculateWeightTrendPoints(entries, targetWeightKg);
  }, [entries, targetWeightKg]);

  // Filter based on selected timeframe
  const filteredData = useMemo(() => {
    if (timeframe === 'all' || allTrendPoints.length <= 7) return allTrendPoints;
    const days = timeframe === '7d' ? 7 : timeframe === '14d' ? 14 : 30;
    return allTrendPoints.slice(-days);
  }, [allTrendPoints, timeframe]);

  // Calculate Y-axis domain
  const { yMin, yMax } = useMemo(() => {
    if (filteredData.length === 0) return { yMin: 50, yMax: 70 };
    const weights = filteredData.map((d) => d.weightKg);
    const minW = Math.min(...weights, targetWeightKg);
    const maxW = Math.max(...weights, targetWeightKg);
    return {
      yMin: Math.floor(minW - 1),
      yMax: Math.ceil(maxW + 1),
    };
  }, [filteredData, targetWeightKg]);

  // Custom Glassmorphic Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const distToGoal = (targetWeightKg - data.weightKg).toFixed(1);

      return (
        <div className="p-3 rounded-2xl bg-[#06090E]/95 backdrop-blur-2xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-xs space-y-1.5 font-sans min-w-[170px]">
          <div className="flex items-center justify-between border-b border-white/10 pb-1 text-slate-400">
            <span className="font-semibold">{data.formattedDate}</span>
            <span className="text-[10px] font-mono text-slate-500">{data.date}</span>
          </div>

          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Daily Weight:
              </span>
              <span className="font-bold text-white font-mono">{data.weightKg} kg</span>
            </div>

            {data.movingAverage7Day && (
              <div className="flex items-center justify-between">
                <span className="text-slate-300 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  7-Day Average:
                </span>
                <span className="font-bold text-emerald-400 font-mono">
                  {data.movingAverage7Day} kg
                </span>
              </div>
            )}

            <div className="flex items-center justify-between text-slate-400 pt-0.5">
              <span>Goal Target:</span>
              <span className="font-mono text-slate-200">{targetWeightKg} kg</span>
            </div>

            <div className="flex items-center justify-between text-slate-400 text-[10px]">
              <span>Remaining:</span>
              <span className="font-mono text-cyan-300 font-semibold">{distToGoal} kg to go</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <GlassCard className="p-5 sm:p-6 space-y-5">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Weight Progress & 7-Day Moving Trend
            </h3>
            <Badge variant="cyan" size="xs">
              Recharts
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Rolling 7-day average filters out day-to-day hydration & digestive noise
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          {/* 7-Day Average Toggle */}
          <button
            type="button"
            onClick={() => setShow7DayAvg((prev) => !prev)}
            className={`py-1 px-2.5 rounded-xl text-xs font-semibold border transition-all ${
              show7DayAvg
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                : 'bg-slate-800/40 text-slate-400 border-white/5'
            }`}
          >
            7D Avg Line
          </button>

          {/* Timeframe selector */}
          <div className="flex rounded-xl bg-slate-800/70 p-0.5 border border-white/5">
            {(['7d', '14d', '30d', 'all'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`py-1 px-2.5 rounded-lg text-xs font-semibold uppercase font-mono transition-all ${
                  timeframe === t
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_8px_#22D3EE]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Canvas or Empty State */}
      {filteredData.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center text-center space-y-3 py-10">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">No weight logs recorded yet</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              Log your morning fasted weight to start graphing daily progress and 7-day velocity.
            </p>
          </div>
          <button
            onClick={openLogWeight}
            className="py-2 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
          >
            + Log Today's Weight
          </button>
        </div>
      ) : (
        <div className="h-72 sm:h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData} margin={{ top: 10, right: 15, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="emeraldLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#34D399" />
                </linearGradient>
                <linearGradient id="cyanLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#38BDF8" />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />

              <XAxis
                dataKey="formattedDate"
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
              />

              <YAxis
                domain={[yMin, yMax]}
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                unit=" kg"
              />

              <Tooltip content={<CustomTooltip />} />

              {/* Goal Target Line */}
              <ReferenceLine
                y={targetWeightKg}
                stroke="#64748B"
                strokeDasharray="4 4"
                strokeOpacity={0.6}
                label={{
                  value: `Target ${targetWeightKg}kg`,
                  fill: '#94A3B8',
                  fontSize: 10,
                  position: 'insideTopRight',
                }}
              />

              {/* Daily Recorded Points */}
              <Line
                type="monotone"
                dataKey="weightKg"
                name="Daily Weight"
                stroke="url(#cyanLineGrad)"
                strokeWidth={2}
                dot={{ r: 3.5, fill: '#06B6D4', stroke: '#070A0F', strokeWidth: 1.5 }}
                activeDot={{ r: 6, fill: '#38BDF8', stroke: '#FFFFFF', strokeWidth: 2 }}
                animationDuration={900}
              />

              {/* 7-Day Moving Average Curve */}
              {show7DayAvg && (
                <Line
                  type="monotone"
                  dataKey="movingAverage7Day"
                  name="7-Day Average"
                  stroke="url(#emeraldLineGrad)"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 5, fill: '#10B981', stroke: '#FFFFFF' }}
                  animationDuration={1200}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Chart Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 pt-2 border-t border-white/5 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_#22D3EE]" />
          <span>Daily Weight Points</span>
        </div>
        {show7DayAvg && (
          <div className="flex items-center gap-2">
            <span className="w-4 h-1 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
            <span>7-Day Moving Trend</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="w-4 h-0.5 border-b border-dashed border-slate-400" />
          <span>Goal ({targetWeightKg} kg)</span>
        </div>
      </div>
    </GlassCard>
  );
};
