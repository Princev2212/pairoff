export interface Founder {
  name: string;
  role: string;
  phone: string;
  phoneRaw: string;
  telHref: string;
  isPrimary: boolean;
  bio?: string;
  initials: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  shortDescription: string;
  email: string;
  phone: string;
  whatsappNumberRaw: string;
  whatsappUrl: string;
  whatsappLabel: string;
  metaTitleDefault: string;
  metaDescriptionDefault: string;
  founders: Founder[];
  techStack: string[];
  socialLinks: SocialLink[];
}

export interface Project {
  id: string;
  number: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  liveUrl: string;
  route: string;
  isFeatured: boolean;
  challenge: string;
  approach: string;
  approachPoints: string[];
  result: string;
  technologies: string[];
  metricsContext: string;
  architectureHighlights: {
    title: string;
    description: string;
  }[];
  mockup: {
    heroImage: string;
    accentColor: string;
    mockupType: 'browser' | 'split';
  };
}

export interface ServiceItem {
  number: string;
  title: string;
  tagline: string;
  description: string;
  details: string[];
}

export interface ProcessItem {
  number: string;
  title: string;
  summary: string;
  description: string;
  outcomes: string[];
}

export interface ContactFormData {
  name: string;
  business: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
}
