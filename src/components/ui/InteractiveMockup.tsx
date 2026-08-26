import React from 'react';
import { ExternalLink, Compass, Music } from 'lucide-react';

interface InteractiveMockupProps {
  projectId: string;
  projectName?: string;
  category?: string;
  liveUrl?: string;
}

export const InteractiveMockup: React.FC<InteractiveMockupProps> = ({
  projectId,
  liveUrl,
}) => {
  const isXyzSchool = projectId === 'xyz-school';

  return (
    <div className="group relative w-full rounded-md border border-studio-700/80 bg-studio-900 overflow-hidden shadow-2xl transition-all duration-500 hover:border-champagne-500/40 hover:shadow-champagne-500/5">
      {/* Top Browser Bar Chrome */}
      <div className="flex items-center justify-between px-4 py-3 bg-studio-950/90 border-b border-studio-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-studio-700 group-hover:bg-red-500/70 transition-colors" />
          <span className="w-2.5 h-2.5 rounded-full bg-studio-700 group-hover:bg-yellow-500/70 transition-colors" />
          <span className="w-2.5 h-2.5 rounded-full bg-studio-700 group-hover:bg-green-500/70 transition-colors" />
        </div>

        <div className="flex items-center gap-2 px-4 py-1 rounded bg-studio-900 border border-studio-800 text-studio-400 font-mono text-[11px] max-w-[280px] sm:max-w-md truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-champagne-500/80 animate-pulse" />
          <span>{liveUrl || (isXyzSchool ? 'https://xyz-school-website.vercel.app' : 'https://swaram-music-academy.demo')}</span>
        </div>

        {liveUrl ? (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-studio-500 hover:text-champagne-300 transition-colors"
            title="Open Live Website"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <span className="text-[10px] uppercase font-mono tracking-wider text-champagne-400/60 bg-champagne-500/5 px-2 py-0.5 rounded border border-champagne-500/20">
            Demo Model
          </span>
        )}
      </div>

      {/* Internal Simulated High-End Website Preview UI */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-studio-950 overflow-hidden flex flex-col justify-between p-6 sm:p-10 select-none">
        {isXyzSchool ? (
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between border-b border-studio-800/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-champagne-500/10 border border-champagne-500/30 flex items-center justify-center text-champagne-300 font-display font-bold text-xs">
                  XYZ
                </div>
                <div>
                  <div className="text-xs font-display font-semibold tracking-wider text-studio-100 uppercase">
                    XYZ International School
                  </div>
                  <div className="text-[10px] text-studio-500 font-mono">
                    CBSE & Cambridge Curriculum
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-5 text-[11px] text-studio-400 font-medium">
                <span className="text-champagne-300 font-semibold">Home</span>
                <span>Academics</span>
                <span>Admissions</span>
                <span>Campus Life</span>
                <span className="px-3 py-1 bg-champagne-500/20 text-champagne-200 rounded text-[10px] font-mono uppercase tracking-wider">
                  Enquire Now
                </span>
              </div>
            </div>

            <div className="my-auto py-6 max-w-xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-studio-850 border border-studio-700 text-champagne-400 text-[11px] font-mono mb-3">
                <Compass className="w-3 h-3 text-champagne-400" />
                <span>Admissions Open for Academic Year 2026–27</span>
              </div>
              <h4 className="text-xl sm:text-3xl font-display font-medium text-studio-50 leading-tight">
                Fostering Intellectual Curiosity & Lifelong Leadership.
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-studio-400 font-light line-clamp-2 max-w-md">
                A holistic environment built for academic rigour, scientific inquiry, sports excellence, and creative arts.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <div className="px-4 py-2 bg-champagne-500 text-studio-950 font-sans font-semibold text-xs rounded">
                  Explore Curriculum
                </div>
                <div className="px-4 py-2 border border-studio-700 text-studio-200 text-xs rounded bg-studio-900/60">
                  Virtual Campus Tour
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-studio-800/80">
              <div className="p-2 sm:p-3 rounded bg-studio-900/80 border border-studio-800">
                <div className="text-[10px] text-champagne-400 font-mono uppercase">Primary School</div>
                <div className="text-xs text-studio-200 font-medium mt-0.5">Foundational Inquiry</div>
              </div>
              <div className="p-2 sm:p-3 rounded bg-studio-900/80 border border-studio-800">
                <div className="text-[10px] text-champagne-400 font-mono uppercase">Middle School</div>
                <div className="text-xs text-studio-200 font-medium mt-0.5">Core Sciences & Arts</div>
              </div>
              <div className="p-2 sm:p-3 rounded bg-studio-900/80 border border-studio-800">
                <div className="text-[10px] text-champagne-400 font-mono uppercase">Senior Secondary</div>
                <div className="text-xs text-studio-200 font-medium mt-0.5">University Preparedness</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between border-b border-studio-800/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-champagne-500/10 border border-champagne-500/30 flex items-center justify-center text-champagne-300 font-serif font-bold text-xs">
                  S
                </div>
                <div>
                  <div className="text-xs font-serif font-semibold tracking-widest text-studio-100 uppercase">
                    SWARAM MUSIC ACADEMY
                  </div>
                  <div className="text-[10px] text-champagne-500/80 font-mono">
                    Indian Classical & Contemporary Studies
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-5 text-[11px] text-studio-400 font-medium">
                <span className="text-champagne-300 font-semibold">Overview</span>
                <span>Disciplines</span>
                <span>Gurus & Faculty</span>
                <span>Recitals</span>
                <span className="px-3 py-1 bg-champagne-500/20 text-champagne-200 rounded text-[10px] font-mono uppercase tracking-wider">
                  Book Free Trial
                </span>
              </div>
            </div>

            <div className="my-auto py-6 max-w-xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-studio-850 border border-champagne-500/20 text-champagne-300 text-[11px] font-mono mb-3">
                <Music className="w-3 h-3 text-champagne-400" />
                <span>Vocal & Instrumental Disciplines</span>
              </div>
              <h4 className="text-xl sm:text-3xl font-serif font-normal text-studio-50 leading-tight">
                Where Tradition Meets Musical Mastery.
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-studio-400 font-light line-clamp-2 max-w-md">
                Immersive one-on-one mentorship in Carnatic, Hindustani, Western Classical, Violin, Veena, and Piano.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <div className="px-4 py-2 bg-champagne-500 text-studio-950 font-sans font-semibold text-xs rounded">
                  Explore Courses
                </div>
                <div className="px-4 py-2 border border-studio-700 text-studio-200 text-xs rounded bg-studio-900/60">
                  Hear Student Recitals
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-3 pt-4 border-t border-studio-800/80">
              <div className="p-2 rounded bg-studio-900/80 border border-studio-800 text-center">
                <div className="text-[10px] text-champagne-400 font-mono uppercase">Vocal</div>
                <div className="text-[11px] text-studio-300 mt-0.5">Carnatic / Western</div>
              </div>
              <div className="p-2 rounded bg-studio-900/80 border border-studio-800 text-center">
                <div className="text-[10px] text-champagne-400 font-mono uppercase">Strings</div>
                <div className="text-[11px] text-studio-300 mt-0.5">Violin / Guitar</div>
              </div>
              <div className="p-2 rounded bg-studio-900/80 border border-studio-800 text-center">
                <div className="text-[10px] text-champagne-400 font-mono uppercase">Percussion</div>
                <div className="text-[11px] text-studio-300 mt-0.5">Mridangam / Drums</div>
              </div>
              <div className="p-2 rounded bg-studio-900/80 border border-studio-800 text-center">
                <div className="text-[10px] text-champagne-400 font-mono uppercase">Keys</div>
                <div className="text-[11px] text-studio-300 mt-0.5">Piano / Synth</div>
              </div>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-tr from-studio-950 via-studio-900 to-studio-850 opacity-90 pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-champagne-500/5 blur-3xl pointer-events-none" />
      </div>
    </div>
  );
};
