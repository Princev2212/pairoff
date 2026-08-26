import React from 'react';
import { projects } from '../data/projects';
import { SEOHead } from '../components/ui/SEOHead';
import { ProjectCard } from '../components/ui/ProjectCard';
import { Button } from '../components/ui/Button';
import { TechStackSection } from '../components/common/TechStackPill';

export const WorkPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Selected Work"
        description="Explore selected digital experiences and web platforms designed and engineered by YOUR STUDIO."
      />

      <div className="py-16 sm:py-24 max-w-7xl mx-auto px-6 sm:px-8">
        {/* Page Hero */}
        <div className="max-w-4xl mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-champagne-500/40" />
            <span className="text-xs font-mono uppercase tracking-ultra text-champagne-400">
              Selected Work
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-studio-50 tracking-tight leading-[1.1]">
            WEBSITES BUILT WITH INTENTION & PROOF.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-studio-300 font-light leading-relaxed max-w-2xl">
            We don't showcase endless concept mockups that never lived. We build substantive, fully responsive digital platforms designed to solve real business communication challenges.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Technology Baseline */}
        <div className="mt-20">
          <TechStackSection />
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 p-10 sm:p-14 rounded-md border border-studio-800 bg-card-gradient text-center">
          <h2 className="text-2xl sm:text-4xl font-display font-medium text-studio-50">
            Have a project in mind?
          </h2>
          <p className="mt-3 text-studio-400 text-sm sm:text-base max-w-md mx-auto">
            Let's discuss how we can build a digital experience tailored to your organization.
          </p>
          <div className="mt-8 flex justify-center">
            <Button to="/contact" variant="primary" size="lg" icon>
              Start a Project
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
