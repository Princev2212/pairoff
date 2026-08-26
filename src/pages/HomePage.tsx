import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { projects } from '../data/projects';
import { services } from '../data/services';
import { processSteps } from '../data/process';
import { SEOHead } from '../components/ui/SEOHead';
import { Minimal3DHero } from '../components/canvas/Minimal3DHero';
import { Button } from '../components/ui/Button';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ProjectCard } from '../components/ui/ProjectCard';
import { FounderCard } from '../components/ui/FounderCard';
import { ManifestoSection } from '../components/common/ManifestoSection';
import { TechStackSection } from '../components/common/TechStackPill';

export const HomePage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Digital Experiences"
        description={siteConfig.shortDescription}
      />

      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-8 pb-20 overflow-hidden border-b border-studio-800/80">
        <div className="absolute inset-0 bg-subtle-radial pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-8">
            <div className="flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-studio-900 border border-champagne-500/30 text-champagne-400 text-xs font-mono tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 animate-pulse" />
                <span>Independent Digital Studio</span>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-studio-500 tracking-wider">
                <span>WEB DESIGN</span>
                <span>/</span>
                <span>DEVELOPMENT</span>
                <span>/</span>
                <span>DIGITAL EXPERIENCE</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-studio-50 tracking-tight leading-[1.08]">
              WE BUILD DIGITAL EXPERIENCES WITH WEIGHT.
            </h1>

            <p className="text-lg sm:text-xl text-studio-300 font-light max-w-2xl leading-relaxed">
              We design and develop digital experiences that make businesses look as serious online as they are offline.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button to="/work" variant="primary" size="lg" icon>
                View Selected Work
              </Button>
              <Button to="/contact" variant="secondary" size="lg" icon>
                Start a Project
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex items-center justify-center">
            <Minimal3DHero />
          </div>
        </div>
      </section>

      {/* SELECTED WORK SECTION */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-studio-800 pb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-xs font-mono tracking-ultra uppercase text-champagne-400">
                01 / Portfolio Proof
              </span>
              <span className="w-6 h-[1px] bg-champagne-500/40" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-studio-50 tracking-tight">
              SELECTED WORK
            </h2>
            <p className="mt-3 text-base text-studio-400 font-light max-w-xl">
              A selection of digital experiences built to solve real communication and business needs.
            </p>
          </div>

          <Button to="/work" variant="secondary" size="md" icon>
            All Case Studies
          </Button>
        </div>

        <div className="space-y-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* SIGNATURE MANIFESTO */}
      <ManifestoSection />

      {/* SERVICES OVERVIEW */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-6 sm:px-8">
        <SectionHeader
          label="02 / CAPABILITIES"
          title="WHAT WE DO"
          subtitle="We design the digital layer between a business and the people it wants to reach."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <div
              key={service.number}
              className="p-8 rounded-sm border border-studio-800 bg-card-gradient transition-all duration-300 hover:border-champagne-500/40 hover:-translate-y-1 group"
            >
              <div className="font-mono text-xs text-champagne-400 font-semibold mb-4">
                {service.number}
              </div>
              <h3 className="text-xl font-display font-medium text-studio-100 mb-3 group-hover:text-champagne-200 transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-studio-300 font-light leading-relaxed mb-6">
                {service.tagline}
              </p>
              <ul className="space-y-2 pt-4 border-t border-studio-850 text-xs font-mono text-studio-400">
                {service.details.slice(0, 3).map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-champagne-500/60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button to="/services" variant="secondary" size="md" icon>
            Explore Detailed Services
          </Button>
        </div>
      </section>

      {/* APPROACH METHODOLOGY */}
      <section className="py-24 md:py-32 bg-studio-900/60 border-t border-studio-800/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-xs font-mono tracking-ultra uppercase text-champagne-400">
                03 / METHODOLOGY
              </span>
              <span className="w-6 h-[1px] bg-champagne-500/40" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-studio-50 tracking-tight leading-tight">
              WE DON'T START WITH TEMPLATES.<br />
              <span className="text-champagne-300">WE START WITH THE PROBLEM.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="p-6 rounded bg-studio-950 border border-studio-800 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="text-xs font-mono text-champagne-400 font-semibold mb-3">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-display font-medium text-studio-100 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-studio-400 font-light leading-relaxed">
                    {step.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEET THE FOUNDERS */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-6 sm:px-8 border-t border-studio-800/80">
        <SectionHeader
          label="04 / LEADERSHIP"
          title="MEET THE FOUNDERS"
          subtitle="A two-person creative technology studio dedicated to direct founder involvement on every project."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {siteConfig.founders.map((founder) => (
            <FounderCard key={founder.name} founder={founder} />
          ))}
        </div>

        <div className="mt-16">
          <TechStackSection />
        </div>
      </section>

      {/* BOTTOM CTA SECTION */}
      <section className="py-24 md:py-32 bg-studio-900 border-t border-studio-800 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-medium text-studio-50 tracking-tight">
            LET'S BUILD SOMETHING THAT MATTERS.
          </h2>
          <p className="mt-6 text-base sm:text-xl text-studio-300 font-light max-w-2xl mx-auto leading-relaxed">
            Tell us what you're building, what isn't working, or where you want to go next.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button to="/contact" variant="primary" size="lg" icon>
              Start a Project
            </Button>
            <Button
              href={siteConfig.whatsappUrl}
              variant="champagne"
              size="lg"
              target="_blank"
            >
              Quick WhatsApp Chat
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};
