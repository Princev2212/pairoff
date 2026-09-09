import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowColor?: 'emerald' | 'cyan' | 'violet' | 'none';
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  glowColor = 'none',
  onClick,
}) => {
  const glowStyles = {
    emerald: 'border-emerald-500/20 shadow-[0_0_25px_-5px_rgba(16,185,129,0.12)]',
    cyan: 'border-cyan-500/20 shadow-[0_0_25px_-5px_rgba(6,182,212,0.12)]',
    violet: 'border-purple-500/20 shadow-[0_0_25px_-5px_rgba(139,92,246,0.12)]',
    none: 'border-white/[0.08]',
  };

  const hoverClass = hoverEffect
    ? glowColor === 'cyan'
      ? 'glass-card-cyan-hover cursor-pointer'
      : 'glass-card-hover cursor-pointer'
    : '';

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl md:rounded-3xl bg-slate-900/60 backdrop-blur-xl border transition-all duration-300 ${glowStyles[glowColor]} ${hoverClass} ${className}`}
    >
      {/* Subtle top inner highlight line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};
