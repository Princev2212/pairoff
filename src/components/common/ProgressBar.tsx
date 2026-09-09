import React from 'react';

interface ProgressBarProps {
  current: number;
  target: number;
  colorScheme?: 'emerald' | 'cyan' | 'blue' | 'purple' | 'amber';
  height?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  target,
  colorScheme = 'emerald',
  height = 'md',
  showPercentage = false,
  className = '',
}) => {
  const safeTarget = Math.max(1, target || 1);
  const rawPercentage = (current / safeTarget) * 100;
  const percentage = Math.min(100, Math.max(0, rawPercentage));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  const gradients = {
    emerald: 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.4)]',
    cyan: 'bg-gradient-to-r from-cyan-500 to-sky-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]',
    blue: 'bg-gradient-to-r from-indigo-500 to-blue-400 shadow-[0_0_12px_rgba(99,102,241,0.4)]',
    purple: 'bg-gradient-to-r from-purple-500 to-violet-400 shadow-[0_0_12px_rgba(168,85,247,0.4)]',
    amber: 'bg-gradient-to-r from-amber-500 to-yellow-400 shadow-[0_0_12px_rgba(245,158,11,0.4)]',
  };

  return (
    <div className={`w-full flex items-center gap-3 ${className}`}>
      <div className={`w-full bg-slate-800/80 rounded-full overflow-hidden p-[1px] border border-white/5 ${heightClasses[height]}`}>
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${gradients[colorScheme]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <span className="text-xs font-mono font-medium text-slate-300 min-w-[38px] text-right">
          {Math.round(rawPercentage)}%
        </span>
      )}
    </div>
  );
};
