import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig, navLinks } from '../../config/siteConfig';
import { Phone, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-studio-800/80 bg-studio-950 text-studio-300 pt-16 sm:pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-studio-850">
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="inline-block group focus-visible:outline-none">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm border border-champagne-500/40 bg-studio-900 flex items-center justify-center text-champagne-300 font-display font-bold text-xs">
                  YS
                </div>
                <span className="font-display font-semibold text-xl tracking-wider text-studio-50 uppercase group-hover:text-champagne-200 transition-colors">
                  {siteConfig.brandName}
                </span>
              </div>
            </Link>

            <p className="text-base text-studio-400 font-light max-w-sm leading-relaxed">
              {siteConfig.tagline}
            </p>

            <div className="text-xs font-mono text-champagne-400/80 uppercase tracking-widest">
              Independent Creative Technology Studio
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-studio-500">
              Navigation
            </div>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-studio-300 hover:text-champagne-300 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-studio-600 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Founders Contact Col (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-studio-500">
              Founders Direct
            </div>

            <div className="space-y-4">
              {siteConfig.founders.map((founder) => (
                <div key={founder.name} className="p-3.5 rounded bg-studio-900/60 border border-studio-800/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-studio-100 font-display">
                        {founder.name}
                      </div>
                      <div className="text-[11px] font-mono text-champagne-400 uppercase tracking-wider">
                        {founder.role}
                      </div>
                    </div>

                    <a
                      href={founder.telHref}
                      className="p-2 rounded bg-studio-850 hover:bg-champagne-500/20 text-studio-300 hover:text-champagne-300 transition-colors inline-flex items-center gap-1.5 text-xs font-mono"
                      title={`Call ${founder.name}`}
                    >
                      <Phone className="w-3 h-3 text-champagne-400" />
                      <span>{founder.phone}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Social */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-studio-500">
          <div>
            &copy; {currentYear} {siteConfig.brandName}. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            {siteConfig.socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-champagne-300 transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
