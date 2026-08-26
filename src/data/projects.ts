import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'xyz-school',
    number: '01',
    name: 'XYZ School',
    category: 'Education / Digital Experience',
    tagline: 'A premium school website designed around trust, discovery and admission enquiries.',
    description: 'A structured digital presence crafted to establish institutional trust, guide parents through academic programs, and facilitate seamless admission enquiries.',
    liveUrl: 'https://xyz-school-website.vercel.app/',
    route: '/work/xyz-school',
    isFeatured: true,
    challenge: 'Create a professional online presence that helps parents discover the school, understand its offerings and make an admission enquiry.',
    approach: 'We architected a parent-first digital experience emphasizing academic integrity, campus culture, and clear contact touchpoints.',
    approachPoints: [
      'Trust-focused information architecture tailored to prospective parents',
      'Clear, friction-free navigation across grade levels and curriculum tiers',
      'Responsive layout system engineered for seamless mobile and desktop browsing',
      'Admission-focused calls-to-action placed at strategic high-intent moments',
      'Structured content modules highlighting faculty credentials and campus facilities',
      'Mobile-first optimization delivering instant page loads and accessible typography'
    ],
    result: 'An end-to-end responsive school website demo designed to present information clearly and create a strong first impression.',
    metricsContext: 'Built as a production-grade demonstration of institutional web architecture and user flow design.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Responsive UI', 'Modern Web Standards'],
    architectureHighlights: [
      {
        title: 'Parent Discovery Flow',
        description: 'Structured step-by-step roadmap guiding families from curriculum discovery to virtual enquiries without cognitive overload.'
      },
      {
        title: 'Responsive Grid Architecture',
        description: 'Mobile-first layout guaranteeing pristine legibility of schedules, admissions criteria, and faculty showcases across all screens.'
      },
      {
        title: 'Editorial Clarity & Hierarchy',
        description: 'Deliberate typographic rhythm and whitespace that elevates the school from a traditional institution to a distinguished academy.'
      }
    ],
    mockup: {
      heroImage: '/images/xyz-school-preview.svg',
      accentColor: '#C8B89A',
      mockupType: 'browser'
    }
  },
  {
    id: 'swaram-music-academy',
    number: '02',
    name: 'Swaram Music Academy',
    category: 'Music / Digital Experience',
    tagline: 'A modern digital presence designed around music, discovery, learning and enquiry.',
    description: 'An atmospheric, typography-led digital experience built for a music academy, connecting aspiring musicians to tailored courses, masterclasses, and trial bookings.',
    liveUrl: '',
    route: '/work/swaram-music-academy',
    isFeatured: true,
    challenge: "Create a modern digital presence that communicates the academy's atmosphere and makes it easier for prospective students and parents to explore and enquire.",
    approach: 'We developed an expressive yet restrained aesthetic that reflects musical craftsmanship while maintaining crisp course discovery.',
    approachPoints: [
      'Premium music-focused visual direction with deep ambient tones and warm accents',
      'Intuitive course discovery categorized by instrument families, vocal disciplines, and experience levels',
      'Friction-free trial class conversion flow with transparent onboarding steps',
      'Performance and student recital storytelling integrated seamlessly into the core journey',
      'Fast, fluid responsive UX engineered for effortless mobile exploration'
    ],
    result: 'A complete responsive music academy website demo focused on discovery, trust and enquiry.',
    metricsContext: 'Designed as a demonstration of immersive editorial branding and specialized course discovery.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Responsive UI', 'Audio UI Aesthetics'],
    architectureHighlights: [
      {
        title: 'Curriculum & Instrument Browser',
        description: 'Modular filterable course showcase allowing prospective students to explore classical and contemporary instruments effortlessly.'
      },
      {
        title: 'Atmospheric Visual Rhythm',
        description: 'Dark obsidian backdrops paired with subtle champagne metallic accents, evoking the feeling of a refined concert hall.'
      },
      {
        title: 'Trial Consultation Onboarding',
        description: 'Direct contact touchpoints designed to remove scheduling anxiety and encourage trial bookings.'
      }
    ],
    mockup: {
      heroImage: '/images/swaram-preview.svg',
      accentColor: '#D8CCB5',
      mockupType: 'browser'
    }
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((p) => p.id === id);
};
