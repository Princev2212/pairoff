import React from 'react';
import { processSteps } from '../data/process';
import { SEOHead } from '../components/ui/SEOHead';
import { Button } from '../components/ui/Button';
import { ManifestoSection } from '../components/common/ManifestoSection';
import { Check } from 'lucide-react';

export const ApproachPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Approach"
        description="Our strategic 5-phase methodology: Understand, Shape, Build, Refine, and Launch."
      />

      <div className="py-16 sm:py-24 max-w-7xl mx-auto px-6 sm:px-8">
        {/* Page Hero */}
        <div className="max-w-4xl mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-champagne-500/40" />
            <span className="text-xs font-mono uppercase tracking-ultra text-champagne-400">
              Strategic Approach
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-studio-50 tracking-tight leading-[1.1]">
            WE DON'T START WITH TEMPLATES.<br />
            <span className="text-champagne-300">WE START WITH THE PROBLEM.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-studio-300 font-light leading-relaxed max-w-2xl">
            Every business has a unique communication challenge. We dissect your objectives, shape a bespoke information architecture, and execute with disciplined craftsmanship.
          </p>
        </div>

        {/* 5-Step Process */}
        <div className="space-y-8">
          {processSteps.map((step) => (
            <div
              key={step.number}
              className="p-8 sm:p-12 rounded-md border border-studio-800 bg-card-gradient transition-colors duration-300 hover:border-champagne-500/30"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-sm tracking-widest text-champagne-400 font-semibold">
                      PHASE {step.number}
                    </span>
                    <span className="w-6 h-[1px] bg-studio-700" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-medium text-studio-50">
                    {step.title}
                  </h2>
                  <p className="mt-3 text-base text-champagne-300/90 font-serif italic">
                    "{step.summary}"
                  </p>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <p className="text-sm sm:text-base text-studio-300 font-light leading-relaxed">
                    {step.description}
                  </p>

                  <div className="p-4 sm:p-5 rounded bg-studio-950/80 border border-studio-850">
                    <div className="text-xs font-mono uppercase tracking-widest text-studio-400 mb-3">
                      Phase Outcomes:
                    </div>
                    <div className="space-y-2">
                      {step.outcomes.map((outcome) => (
                        <div key={outcome} className="flex items-center gap-2.5 text-xs sm:text-sm text-studio-300">
                          <Check className="w-3.5 h-3.5 text-champagne-400 shrink-0" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ManifestoSection />

      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8 text-center">
        <h2 className="text-2xl sm:text-4xl font-display font-medium text-studio-50 mb-4">
          Ready to apply this methodology to your brand?
        </h2>
        <p className="text-studio-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
          Let's analyze your current digital presence and craft an intentional website that elevates your business.
        </p>
        <Button to="/contact" variant="primary" size="lg" icon>
          Schedule a Consultation
        </Button>
      </section>
    </>
  );
};
