import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { studioBeliefs } from '../data/process';
import { SEOHead } from '../components/ui/SEOHead';
import { SectionHeader } from '../components/ui/SectionHeader';
import { FounderCard } from '../components/ui/FounderCard';
import { TechStackSection } from '../components/common/TechStackPill';
import { Button } from '../components/ui/Button';

export const AboutPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="About"
        description={`Learn about ${siteConfig.brandName} — an independent digital studio founded by Manjunath and Vishnuvardhan.`}
      />

      <div className="py-16 sm:py-24 max-w-7xl mx-auto px-6 sm:px-8">
        {/* Page Hero */}
        <div className="max-w-4xl mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-champagne-500/40" />
            <span className="text-xs font-mono uppercase tracking-ultra text-champagne-400">
              About the Studio
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-studio-50 tracking-tight leading-[1.1]">
            WE BUILD WEBSITES FOR BUSINESSES THAT WANT TO BE TAKEN SERIOUSLY ONLINE.
          </h1>

          <div className="mt-8 space-y-6 text-base sm:text-lg text-studio-300 font-light leading-relaxed max-w-3xl">
            <p>
              We are a small, design-focused digital studio founded by Manjunath and Vishnuvardhan. We believe that your website is often the first conversation a client has with your brand—and it should reflect the true substance, quality, and authority of what you do.
            </p>
            <p className="text-studio-400">
              We choose not to operate as an oversized agency bloated with layers of account managers, nor do we churn out generic template copies. We dedicate focused engineering and bespoke design attention to a selective number of clients.
            </p>
          </div>
        </div>

        {/* WHAT WE BELIEVE */}
        <section className="py-16 border-t border-studio-800">
          <SectionHeader
            label="PHILOSOPHY"
            title="WHAT WE BELIEVE"
            subtitle="The foundational principles that guide every decision we make."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {studioBeliefs.map((belief) => (
              <div
                key={belief.number}
                className="p-8 rounded border border-studio-800 bg-card-gradient flex flex-col justify-between hover:border-champagne-500/30 transition-colors"
              >
                <div>
                  <div className="text-xs font-mono text-champagne-400 font-semibold mb-4">
                    {belief.number}
                  </div>
                  <h3 className="text-lg sm:text-xl font-display font-medium text-studio-100 mb-3">
                    {belief.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-studio-400 font-light leading-relaxed pt-4 border-t border-studio-850">
                  {belief.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* MEET THE FOUNDERS */}
        <section className="py-16 border-t border-studio-800">
          <SectionHeader
            label="LEADERSHIP"
            title="MEET THE FOUNDERS"
            subtitle="Direct partnership and craftsmanship from both co-founders."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {siteConfig.founders.map((founder) => (
              <FounderCard key={founder.name} founder={founder} />
            ))}
          </div>
        </section>

        {/* TECHNOLOGIES */}
        <section className="pt-12">
          <TechStackSection />
        </section>

        {/* CTA */}
        <div className="mt-20 p-10 sm:p-14 rounded-md border border-studio-800 bg-card-gradient text-center">
          <h2 className="text-2xl sm:text-4xl font-display font-medium text-studio-50">
            Let's create an intentional digital presence together.
          </h2>
          <p className="mt-3 text-studio-400 text-sm sm:text-base max-w-md mx-auto">
            Reach out directly to Manjunath or Vishnuvardhan to discuss your website.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button to="/contact" variant="primary" size="lg" icon>
              Start a Project
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
