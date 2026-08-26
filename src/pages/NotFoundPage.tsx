import React from 'react';
import { SEOHead } from '../components/ui/SEOHead';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEOHead title="Page Not Found" />

      <div className="min-h-[70vh] flex items-center justify-center py-20 px-6 text-center">
        <div className="max-w-md">
          <div className="text-xs font-mono text-champagne-400 tracking-ultra uppercase mb-4">
            404 / Non-Existent Path
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-medium text-studio-50 tracking-tight mb-4">
            PAGE NOT FOUND
          </h1>
          <p className="text-studio-400 text-sm sm:text-base font-light leading-relaxed mb-8">
            The page you are looking for does not exist or has been moved. Return to our homepage or explore our selected work.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button to="/" variant="primary" size="md">
              Return Home
            </Button>
            <Button to="/work" variant="secondary" size="md">
              View Work
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
