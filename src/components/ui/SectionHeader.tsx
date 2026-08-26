import React from 'react';
import { clsx } from 'clsx';

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  className?: string;
  titleAs?: 'h1' | 'h2' | 'h3';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  subtitle,
  alignment = 'left',
  className = '',
  titleAs: TitleTag = 'h2',
}) => {
  return (
    <div
      className={clsx(
        'mb-12 md:mb-16',
        alignment === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-4xl',
        className
      )}
    >
      {label && (
        <div className="flex items-center gap-3 mb-4">
          {alignment === 'center' && (
            <span className="w-6 h-[1px] bg-champagne-500/40" />
          )}
          <span className="text-xs font-mono tracking-ultra uppercase text-champagne-400">
            {label}
          </span>
          <span className="w-8 h-[1px] bg-champagne-500/40" />
        </div>
      )}

      <TitleTag className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight text-studio-50 leading-[1.15]">
        {title}
      </TitleTag>

      {subtitle && (
        <p className="mt-5 text-base sm:text-lg text-studio-400 font-light leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
