import React from 'react';
import { manifestoData } from '../../data/process';
import { siteConfig } from '../../config/siteConfig';

export const ManifestoSection: React.FC = () => {
  return (
    <section className="relative py-24 md:py-36 border-y border-studio-800/80 bg-studio-950 overflow-hidden">
      {/* Subtle architectural grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141419_1px,transparent_1px),linear-gradient(to_bottom,#141419_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center">
        {/* Label */}
        <div className="inline-flex items-center gap-3 mb-8">
          <span className="w-8 h-[1px] bg-champagne-500/40" />
          <span className="text-xs font-mono uppercase tracking-ultra text-champagne-400">
            {siteConfig.brandName} Manifesto
          </span>
          <span className="w-8 h-[1px] bg-champagne-500/40" />
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-medium text-studio-50 tracking-tight leading-[1.12]">
          {manifestoData.headline}
        </h2>

        {/* Supporting copy */}
        <div className="mt-8 sm:mt-10 max-w-3xl mx-auto space-y-4">
          <p className="text-xl sm:text-2xl md:text-3xl font-serif text-champagne-300 font-light italic leading-relaxed">
            "{manifestoData.subheadline}"
          </p>
          <p className="text-lg sm:text-xl text-studio-300 font-light leading-relaxed">
            {manifestoData.punchline}
          </p>
        </div>

        <div className="mt-12 w-12 h-[1px] bg-champagne-500/40 mx-auto" />
      </div>
    </section>
  );
};
