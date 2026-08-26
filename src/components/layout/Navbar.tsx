import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig, navLinks } from '../../config/siteConfig';
import { Button } from '../ui/Button';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Derive monogram from brandName e.g. "PAIR OFF" -> "PO"
  const monogram = siteConfig.brandName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .substring(0, 2);

  return (
    <header
      className={clsx(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out',
        isScrolled
          ? 'bg-studio-950/85 backdrop-blur-md border-b border-studio-800/80 py-4 shadow-lg shadow-black/30'
          : 'bg-transparent py-6 border-b border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        <Link
          to="/"
          className="group flex items-center gap-3 focus-visible:outline-none"
          aria-label={`${siteConfig.brandName} Home`}
        >
          <div className="w-7 h-7 rounded-sm border border-champagne-500/40 bg-studio-900 flex items-center justify-center text-champagne-300 font-display font-bold text-xs tracking-wider group-hover:border-champagne-500 transition-colors">
            {monogram}
          </div>
          <span className="font-display font-semibold text-lg sm:text-xl tracking-wider text-studio-50 uppercase group-hover:text-champagne-200 transition-colors">
            {siteConfig.brandName}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-sans" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  'relative py-1 tracking-wider text-xs uppercase font-medium transition-colors duration-300',
                  isActive
                    ? 'text-champagne-300 font-semibold'
                    : 'text-studio-400 hover:text-studio-100'
                )}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 inset-x-0 h-[2px] bg-champagne-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button to="/contact" variant="primary" size="sm" icon>
            Start a Project
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-studio-200 hover:text-champagne-300 focus-visible:outline-none"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div
        className={clsx(
          'fixed inset-0 top-[65px] bg-studio-950/95 backdrop-blur-xl z-40 md:hidden flex flex-col justify-between p-8 transition-all duration-300 ease-in-out border-t border-studio-800',
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        )}
      >
        <nav className="flex flex-col gap-6 pt-4" aria-label="Mobile Navigation">
          {navLinks.map((link, idx) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  'text-2xl font-display font-medium tracking-tight flex items-center justify-between pb-3 border-b border-studio-850',
                  isActive ? 'text-champagne-300' : 'text-studio-200 hover:text-studio-50'
                )}
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-studio-600">0{idx + 1}</span>
              </Link>
            );
          })}
        </nav>

        <div className="pt-8 border-t border-studio-800 space-y-4">
          <Button to="/contact" variant="primary" size="lg" className="w-full" icon>
            Start a Project
          </Button>

          <div className="pt-2 text-xs font-mono text-studio-500 text-center">
            {siteConfig.tagline}
          </div>
        </div>
      </div>
    </header>
  );
};
