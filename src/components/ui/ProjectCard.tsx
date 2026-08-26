import React from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../../types';
import { Button } from './Button';
import { InteractiveMockup } from './InteractiveMockup';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article className="group relative border-t border-studio-800/80 pt-10 md:pt-14 pb-16 transition-colors duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Editorial Text & Meta Info (5 cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full order-2 lg:order-1">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-sm tracking-widest text-champagne-400 font-semibold">
                {project.number}
              </span>
              <span className="w-4 h-[1px] bg-studio-700" />
              <span className="text-xs font-mono uppercase tracking-widest text-studio-400">
                {project.category}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium text-studio-50 tracking-tight leading-tight group-hover:text-champagne-300 transition-colors">
              <Link to={project.route}>{project.name}</Link>
            </h3>

            <p className="mt-4 text-base text-studio-300 font-light leading-relaxed">
              {project.tagline}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-[11px] font-mono tracking-wider text-studio-400 bg-studio-900 border border-studio-800 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-studio-850 flex flex-wrap items-center gap-4">
            <Button to={project.route} variant="primary" size="md" icon>
              View Project
            </Button>

            {project.liveUrl && (
              <Button
                href={project.liveUrl}
                variant="secondary"
                size="md"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Live Website</span>
                <ExternalLink className="w-3.5 h-3.5 ml-2 text-studio-400 group-hover:text-champagne-300" />
              </Button>
            )}
          </div>
        </div>

        {/* Large Website Preview Showcase (7 cols on desktop) */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <Link to={project.route} className="block cursor-pointer focus-visible:outline-none">
            <InteractiveMockup
              projectId={project.id}
              projectName={project.name}
              category={project.category}
              liveUrl={project.liveUrl}
            />
          </Link>
        </div>
      </div>
    </article>
  );
};
