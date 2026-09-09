import React from 'react';

interface MacroRingProps {
  current: number;
  target: number;
  label: string;
  unit?: string;
  size?: number;
  strokeWidth?: number;
  colorScheme?: 'emerald' | 'cyan' | 'blue' | 'purple' | 'amber';
  sublabel?: string;
  showRemaining?: boolean;
}

export const MacroRing: React.FC<MacroRingProps> = ({
  current,
  target,
  label,
  unit = 'g',
  size = 110,
  strokeWidth = 9,
  colorScheme = 'emerald',
  sublabel,
  showRemaining = false,
}) => {
  const safeTarget = Math.max(1, target || 1);
  const percentage = Math.min(150, Math.round((current / safeTarget) * 100));
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedPercentage / 100) * circumference;

  const colorConfigs = {
    emerald: {
      gradientId: 'grad-emerald',
      from: '#34D399',
      to: '#059669',
      glow: 'rgba(16, 185, 129, 0.25)',
      text: 'text-emerald-400',
    },
    cyan: {
      gradientId: 'grad-cyan',
      from: '#38BDF8',
      to: '#0891B2',
      glow: 'rgba(6, 182, 212, 0.25)',
      text: 'text-cyan-400',
    },
    blue: {
      gradientId: 'grad-blue',
      from: '#818CF8',
      to: '#4F46E5',
      glow: 'rgba(99, 102, 241, 0.25)',
      text: 'text-indigo-400',
    },
    purple: {
      gradientId: 'grad-purple',
      from: '#C084FC',
      to: '#9333EA',
      glow: 'rgba(168, 85, 247, 0.25)',
      text: 'text-purple-400',
    },
    amber: {
      gradientId: 'grad-amber',
      from: '#FBBF24',
      to: '#D97706',
      glow: 'rgba(245, 158, 11, 0.25)',
      text: 'text-amber-400',
    },
  };

  const activeColor = colorConfigs[colorScheme];
  const remaining = Math.max(0, safeTarget - current);

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <defs>
            <linearGradient id={activeColor.gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={activeColor.from} />
              <stop offset="100%" stopColor={activeColor.to} />
            </linearGradient>
            <filter id={`glow-${activeColor.gradientId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={activeColor.glow} />
            </filter>
          </defs>

          {/* Background Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.07)"
            strokeWidth={strokeWidth}
          />

          {/* Progress Stroke */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke={`url(#${activeColor.gradientId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            filter={`url(#glow-${activeColor.gradientId})`}
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-1">
          <span className="text-base md:text-lg font-bold tracking-tight text-white leading-tight font-sans">
            {showRemaining ? Math.round(remaining) : Math.round(current)}
          </span>
          <span className="text-[10px] text-slate-400 font-medium -mt-0.5">
            {showRemaining ? 'left' : `/${safeTarget}${unit}`}
          </span>
        </div>
      </div>

      <div className="mt-2 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
          {label}
        </span>
        {sublabel && (
          <span className="text-[11px] text-slate-400 block mt-0.5 font-mono">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
};
