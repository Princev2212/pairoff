import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getProjectById, projects } from '../data/projects';
import { SEOHead } from '../components/ui/SEOHead';
import { Button } from '../components/ui/Button';
import { InteractiveMockup } from '../components/ui/InteractiveMockup';
import { ArrowLeft, ArrowRight, ExternalLink, Layers } from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? getProjectById(projectId) : undefined;

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  // Next project navigation
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <SEOHead
        title={`${project.name} Case Study`}
        description={project.description}
      />

      <article className="py-12 sm:py-20 max-w-7xl mx-auto px-6 sm:px-8">
        {/* Back Link */}
        <div className="mb-10">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-studio-400 hover:text-champagne-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Selected Work</span>
          </Link>
        </div>

        {/* Project Header */}
        <div className="max-w-4xl pb-12 border-b border-studio-800">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono uppercase text-champagne-400 tracking-ultra">
              Case Study {project.number}
            </span>
            <span className="w-6 h-[1px] bg-champagne-500/40" />
            <span className="text-xs font-mono uppercase text-studio-400 tracking-wider">
              {project.category}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-studio-50 tracking-tight leading-[1.1]">
            {project.name}
          </h1>

          <p className="mt-6 text-xl sm:text-2xl text-champagne-300 font-serif italic font-light leading-relaxed">
            "{project.tagline}"
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {project.liveUrl ? (
              <Button
                href={project.liveUrl}
                variant="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Visit Live Website</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-3 rounded bg-studio-900 border border-studio-750 text-studio-300 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-champagne-400" />
                <span>Interactive Website Demonstration Model</span>
              </div>
            )}

            <Button to="/contact" variant="secondary" size="lg" icon>
              Inquire About Similar Project
            </Button>
          </div>
        </div>

        {/* Large Website Preview Showcase */}
        <div className="my-16">
          <InteractiveMockup
            projectId={project.id}
            projectName={project.name}
            category={project.category}
            liveUrl={project.liveUrl}
          />
        </div>

        {/* Detailed Case Study Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 border-t border-studio-800">
          <div className="lg:col-span-8 space-y-16">
            {/* 1. THE CHALLENGE */}
            <section>
              <div className="text-xs font-mono uppercase tracking-widest text-champagne-400 mb-3">
                01 / Problem Scope
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-studio-50 mb-5">
                THE CHALLENGE
              </h2>
              <p className="text-base sm:text-lg text-studio-300 font-light leading-relaxed">
                {project.challenge}
              </p>
            </section>

            {/* 2. THE APPROACH */}
            <section className="pt-10 border-t border-studio-850">
              <div className="text-xs font-mono uppercase tracking-widest text-champagne-400 mb-3">
                02 / Solution Architecture
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-studio-50 mb-5">
                THE APPROACH
              </h2>
              <p className="text-base sm:text-lg text-studio-300 font-light leading-relaxed mb-6">
                {project.approach}
              </p>

              <div className="space-y-3">
                {project.approachPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded bg-studio-900/60 border border-studio-800">
                    <span className="font-mono text-xs text-champagne-400 mt-0.5">
                      0{idx + 1}
                    </span>
                    <span className="text-sm text-studio-200 font-light">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. THE RESULT */}
            <section className="pt-10 border-t border-studio-850">
              <div className="text-xs font-mono uppercase tracking-widest text-champagne-400 mb-3">
                03 / Deliverable Output
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-studio-50 mb-5">
                THE RESULT
              </h2>
              <p className="text-base sm:text-lg text-studio-300 font-light leading-relaxed">
                {project.result}
              </p>

              <div className="mt-8 p-6 rounded bg-studio-900 border border-champagne-500/20 text-xs font-mono text-studio-400">
                <span className="text-champagne-400 font-semibold uppercase block mb-1">
                  Scope Note:
                </span>
                {project.metricsContext}
              </div>
            </section>
          </div>

          {/* Sidebar Metadata & Specs */}
          <div className="lg:col-span-4 space-y-10">
            <div className="p-6 rounded bg-studio-900/80 border border-studio-800 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-champagne-400">
                <Layers className="w-4 h-4" />
                <span>Technologies</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono text-studio-300 bg-studio-950 border border-studio-750 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-studio-400">
                Architecture Focus
              </div>
              {project.architectureHighlights.map((highlight, idx) => (
                <div key={idx} className="p-4 rounded border border-studio-800 bg-studio-950">
                  <div className="text-sm font-display font-medium text-studio-100 mb-1">
                    {highlight.title}
                  </div>
                  <div className="text-xs text-studio-400 font-light leading-relaxed">
                    {highlight.description}
                  </div>
                </div>
              ))}
            </div>

            {project.liveUrl && (
              <div className="pt-2">
                <Button
                  href={project.liveUrl}
                  variant="primary"
                  size="md"
                  className="w-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Open Live Website</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Next Project Footer Bar */}
        <div className="mt-24 pt-12 border-t border-studio-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            to="/work"
            className="text-xs font-mono uppercase tracking-widest text-studio-400 hover:text-champagne-300 transition-colors"
          >
            ← All Case Studies
          </Link>

          <Link
            to={nextProject.route}
            className="inline-flex items-center gap-3 text-sm font-display font-medium text-studio-100 hover:text-champagne-300 transition-colors group"
          >
            <span>Next Project: {nextProject.name}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-champagne-400" />
          </Link>
        </div>
      </article>
    </>
  );
};
