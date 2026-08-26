import React from 'react';
import { services } from '../data/services';
import { siteConfig } from '../config/siteConfig';
import { SEOHead } from '../components/ui/SEOHead';
import { Button } from '../components/ui/Button';
import { Check, Sparkles, Shield, Compass, Code, Layout, HelpCircle } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const serviceIcons = [Layout, Code, Sparkles, Compass, Shield, HelpCircle];

  return (
    <>
      <SEOHead
        title="Services"
        description={`Explore the 6 core digital engineering and design services provided by ${siteConfig.brandName}.`}
      />

      <div className="py-16 sm:py-24 max-w-7xl mx-auto px-6 sm:px-8">
        {/* Page Hero */}
        <div className="max-w-4xl mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-champagne-500/40" />
            <span className="text-xs font-mono uppercase tracking-ultra text-champagne-400">
              Services & Capabilities
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-studio-50 tracking-tight leading-[1.1]">
            WHAT WE DO
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-studio-300 font-light leading-relaxed max-w-2xl">
            We design the digital layer between a business and the people it wants to reach.
          </p>
        </div>

        {/* The 6 Core Disciplines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, idx) => {
            const Icon = serviceIcons[idx % serviceIcons.length];
            return (
              <div
                key={service.number}
                className="p-8 sm:p-10 rounded-md border border-studio-800 bg-card-gradient flex flex-col justify-between transition-all duration-300 hover:border-champagne-500/40 group"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-studio-850">
                    <span className="font-mono text-sm tracking-widest text-champagne-400 font-semibold">
                      {service.number}
                    </span>
                    <div className="w-9 h-9 rounded bg-studio-900 border border-studio-750 flex items-center justify-center text-champagne-300 group-hover:border-champagne-500/50 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-display font-medium text-studio-100 mb-3 group-hover:text-champagne-200 transition-colors">
                    {service.title}
                  </h2>

                  <p className="text-sm sm:text-base font-serif italic text-champagne-300/90 mb-4">
                    {service.tagline}
                  </p>

                  <p className="text-sm text-studio-400 font-light leading-relaxed mb-8">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-studio-850">
                  <div className="text-xs font-mono uppercase tracking-widest text-studio-500 mb-3">
                    Deliverables & Scope:
                  </div>
                  <ul className="space-y-2.5">
                    {service.details.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs font-sans text-studio-300">
                        <Check className="w-3.5 h-3.5 text-champagne-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Studio Commitment */}
        <div className="mt-24 p-10 sm:p-14 rounded-md border border-studio-800 bg-studio-900/90">
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-champagne-400 mb-3">
              Studio Commitment
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-medium text-studio-50 mb-4">
              Direct Founder Involvement On Every Project.
            </h3>
            <p className="text-sm sm:text-base text-studio-300 font-light leading-relaxed">
              When you collaborate with {siteConfig.brandName}, you do not deal with account managers or junior delegates. Both co-founders lead the strategy, design, and code from the initial discovery call to final deployment.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/contact" variant="primary" size="lg" icon>
              Start a Project
            </Button>
            <Button to="/approach" variant="secondary" size="lg">
              View Our Approach
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
