import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { SEOHead } from '../components/ui/SEOHead';
import { ContactForm } from '../components/ui/ContactForm';
import { Phone, MessageSquare, ArrowUpRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const ContactPage: React.FC = () => {
  const primaryFounder = siteConfig.founders.find((f) => f.isPrimary) || siteConfig.founders[0];
  const coFounder = siteConfig.founders.find((f) => !f.isPrimary) || siteConfig.founders[1];

  return (
    <>
      <SEOHead
        title="Contact & Start a Project"
        description={`Contact ${siteConfig.brandName} to discuss your website design and engineering project.`}
      />

      <div className="py-16 sm:py-24 max-w-7xl mx-auto px-6 sm:px-8">
        {/* Page Hero */}
        <div className="max-w-4xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-champagne-500/40" />
            <span className="text-xs font-mono uppercase tracking-ultra text-champagne-400">
              Start a Project
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-studio-50 tracking-tight leading-[1.1]">
            LET'S BUILD SOMETHING THAT MATTERS.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-studio-300 font-light leading-relaxed max-w-2xl">
            Tell us what you're building, what isn't working, or where you want to go next.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-md border border-studio-800 bg-studio-900/90 space-y-6">
              <div className="text-xs font-mono uppercase tracking-widest text-champagne-400 pb-3 border-b border-studio-850">
                Direct Communication
              </div>

              {/* Primary Contact */}
              <div className="p-4 rounded bg-studio-950/80 border border-studio-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-champagne-400 uppercase">
                    Primary Contact
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 animate-pulse" />
                </div>
                <div className="text-lg font-display font-medium text-studio-100">
                  {primaryFounder.name}
                </div>
                <div className="text-xs text-studio-500 font-mono">
                  {primaryFounder.role}
                </div>
                <div className="pt-2">
                  <a
                    href={primaryFounder.telHref}
                    className="inline-flex items-center gap-2 text-sm font-mono text-studio-300 hover:text-champagne-300 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-champagne-400" />
                    <span>{primaryFounder.phone}</span>
                    <ArrowUpRight className="w-3 h-3 text-studio-500" />
                  </a>
                </div>
              </div>

              {/* Co-Founder */}
              <div className="p-4 rounded bg-studio-950/80 border border-studio-800 space-y-2">
                <div className="text-xs font-mono text-champagne-400 uppercase">
                  Co-Founder
                </div>
                <div className="text-lg font-display font-medium text-studio-100">
                  {coFounder.name}
                </div>
                <div className="text-xs text-studio-500 font-mono">
                  {coFounder.role}
                </div>
                <div className="pt-2">
                  <a
                    href={coFounder.telHref}
                    className="inline-flex items-center gap-2 text-sm font-mono text-studio-300 hover:text-champagne-300 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-champagne-400" />
                    <span>{coFounder.phone}</span>
                    <ArrowUpRight className="w-3 h-3 text-studio-500" />
                  </a>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="pt-2">
                <Button
                  href={siteConfig.whatsappUrl}
                  variant="champagne"
                  size="md"
                  className="w-full"
                  target="_blank"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  <span>Chat on WhatsApp</span>
                </Button>
              </div>
            </div>

            <div className="p-6 rounded border border-studio-800/80 bg-studio-950/60 text-xs font-mono text-studio-400 space-y-2">
              <div className="text-studio-300 font-semibold uppercase">
                Privacy & Direct Access
              </div>
              <p className="leading-relaxed">
                Your enquiry details are transmitted securely and directly reviewed by the founders. We never sell, share, or store contact data in insecure storage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
