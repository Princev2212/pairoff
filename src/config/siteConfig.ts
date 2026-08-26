import type { SiteConfig } from '../types';

export const siteConfig: SiteConfig = {
  brandName: "YOUR STUDIO",
  tagline: "Digital experiences built with intent.",
  shortDescription: "YOUR STUDIO creates thoughtful websites and digital experiences for businesses that want to be taken seriously online.",
  email: "hello@example.com",
  phone: "+91 63631 94621",
  
  whatsappNumberRaw: "916363194621",
  whatsappUrl: "https://wa.me/916363194621",
  whatsappLabel: "Chat With Us",

  metaTitleDefault: "YOUR STUDIO | Digital Experiences",
  metaDescriptionDefault: "YOUR STUDIO creates thoughtful websites and digital experiences for businesses that want to be taken seriously online.",

  founders: [
    {
      name: "Manjunath",
      role: "Founder / Lead",
      phone: "+91 63631 94621",
      phoneRaw: "6363194621",
      telHref: "tel:+916363194621",
      isPrimary: true,
      initials: "M",
      bio: "Leads technical architecture, engineering execution, and high-performance digital systems."
    },
    {
      name: "Vishnuvardhan",
      role: "Co-Founder",
      phone: "+91 73386 32238",
      phoneRaw: "7338632238",
      telHref: "tel:+917338632238",
      isPrimary: false,
      initials: "V",
      bio: "Leads design direction, brand positioning, and editorial digital experiences."
    }
  ],

  techStack: [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Three.js / WebGL",
    "Responsive Design",
    "Modern Web Standards",
    "Vercel"
  ],

  socialLinks: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "X / Twitter", href: "https://twitter.com" }
  ]
};

export const navLinks = [
  { label: "Work", path: "/work" },
  { label: "Services", path: "/services" },
  { label: "Approach", path: "/approach" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];
