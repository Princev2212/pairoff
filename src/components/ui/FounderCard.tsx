import React from 'react';
import type { Founder } from '../../types';
import { Phone, ArrowUpRight } from 'lucide-react';

interface FounderCardProps {
  founder: Founder;
}

export const FounderCard: React.FC<FounderCardProps> = ({ founder }) => {
  return (
    <div className="relative p-8 sm:p-10 rounded-md border border-studio-750 bg-card-gradient transition-all duration-300 hover:border-champagne-500/40 group">
      {/* Header with Monogram and Lead indicator */}
      <div className="flex items-center justify-between mb-6">
        <div className="w-12 h-12 rounded-sm border border-champagne-500/30 bg-studio-900 flex items-center justify-center text-champagne-300 font-display font-semibold text-lg group-hover:border-champagne-500/60 group-hover:bg-champagne-500/10 transition-colors">
          {founder.initials}
        </div>

        {founder.isPrimary && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest text-champagne-300 bg-champagne-500/10 border border-champagne-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 animate-pulse" />
            Lead Contact
          </span>
        )}
      </div>

      {/* Name and Role */}
      <h3 className="text-2xl sm:text-3xl font-display font-medium text-studio-50 tracking-tight">
        {founder.name}
      </h3>
      <div className="text-xs font-mono uppercase tracking-widest text-champagne-400 mt-1">
        {founder.role}
      </div>

      {/* Disciplined Studio Bio */}
      {founder.bio && (
        <p className="mt-4 text-sm text-studio-400 font-light leading-relaxed">
          {founder.bio}
        </p>
      )}

      {/* Clickable Direct Phone Line */}
      <div className="mt-8 pt-6 border-t border-studio-800 flex items-center justify-between">
        <a
          href={founder.telHref}
          className="inline-flex items-center gap-2.5 text-sm font-mono text-studio-300 hover:text-champagne-300 transition-colors group/tel focus-visible:outline-none"
          title={`Call ${founder.name}`}
        >
          <Phone className="w-3.5 h-3.5 text-champagne-400/80 group-hover/tel:text-champagne-300" />
          <span>{founder.phone}</span>
          <ArrowUpRight className="w-3 h-3 text-studio-500 group-hover/tel:translate-x-0.5 group-hover/tel:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
};
