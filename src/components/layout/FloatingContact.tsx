import React, { useState } from 'react';
import { siteConfig } from '../../config/siteConfig';
import { MessageSquare, Phone, X } from 'lucide-react';

export const FloatingContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const primaryFounder = siteConfig.founders.find((f) => f.isPrimary) || siteConfig.founders[0];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Menu Popover */}
      {isOpen && (
        <div className="mb-3 p-4 rounded-md border border-studio-750 bg-studio-900/95 backdrop-blur-md shadow-2xl w-64 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-studio-800">
            <span className="text-[11px] font-mono uppercase tracking-widest text-champagne-400">
              Direct Contact
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-studio-500 hover:text-studio-200 transition-colors p-1"
              aria-label="Close Contact Quick Menu"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-3 py-2 rounded bg-champagne-500/10 border border-champagne-500/20 text-champagne-300 hover:bg-champagne-500 hover:text-studio-950 transition-colors text-xs font-medium w-full"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>

            <a
              href={primaryFounder.telHref}
              className="flex items-center gap-2.5 px-3 py-2 rounded bg-studio-850 hover:bg-studio-800 border border-studio-750 text-studio-200 hover:text-champagne-300 transition-colors text-xs font-mono w-full"
            >
              <Phone className="w-3.5 h-3.5 text-champagne-400" />
              <span>{primaryFounder.name} ({primaryFounder.phone})</span>
            </a>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-studio-900/90 hover:bg-studio-850 border border-champagne-500/30 hover:border-champagne-500 text-studio-200 shadow-xl backdrop-blur-md transition-all duration-300 active:scale-95 focus-visible:outline-none"
        aria-label="Open Studio Quick Contact"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-champagne-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-champagne-500" />
        </span>

        <span className="text-xs font-sans font-medium tracking-wide text-champagne-300 group-hover:text-champagne-200">
          {siteConfig.whatsappLabel}
        </span>

        <MessageSquare className="w-3.5 h-3.5 text-champagne-400 group-hover:text-champagne-200 transition-colors" />
      </button>
    </div>
  );
};
