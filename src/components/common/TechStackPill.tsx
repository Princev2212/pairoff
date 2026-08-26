import React from 'react';
import { siteConfig } from '../../config/siteConfig';
import { Layers } from 'lucide-react';

export const TechStackSection: React.FC = () => {
  return (
    <div className="py-12 border-t border-studio-800">
      <div className="flex items-center gap-3 mb-6">
        <Layers className="w-4 h-4 text-champagne-400" />
        <span className="text-xs font-mono uppercase tracking-widest text-studio-400">
          Built With Industry Standards
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        {siteConfig.techStack.map((tech) => (
          <div
            key={tech}
            className="px-4 py-2 rounded-sm bg-studio-900 border border-studio-750 text-studio-200 text-xs sm:text-sm font-mono flex items-center gap-2 hover:border-champagne-500/40 hover:text-champagne-300 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-champagne-400/60" />
            <span>{tech}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-studio-500 font-mono">
        Zero unnecessary bloat. Only legitimate, production-verified web technologies.
      </p>
    </div>
  );
};
