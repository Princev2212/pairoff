import type { ProcessItem } from '../types';

export const processSteps: ProcessItem[] = [
  {
    number: '01',
    title: 'UNDERSTAND',
    summary: 'Understand the business, audience and objectives.',
    description: 'Before drawing a single wireframe, we dissect the core problems: Who are your most important visitors? What doubts prevent them from contacting you? What distinct value sets you apart from competitors?',
    outcomes: [
      'Core business & audience alignment',
      'Strategic content goals & messaging priorities',
      'Technical requirements & feature scope definition'
    ]
  },
  {
    number: '02',
    title: 'SHAPE',
    summary: 'Define the structure, hierarchy and visual direction.',
    description: 'We establish the information architecture, typographic scales, tonal aesthetic, and narrative flow. Every page section is given a clear purpose before visual assets are rendered.',
    outcomes: [
      'Editorial wireframes and journey blueprints',
      'Bespoke visual moodboard & typographic system',
      'Negative space, grid, and contrast specifications'
    ]
  },
  {
    number: '03',
    title: 'BUILD',
    summary: 'Turn the approved direction into a responsive digital experience.',
    description: 'We code the frontend with clean React, TypeScript, and modern styling architectures. Every component is engineered for lightning performance, accessibility compliance, and pixel-precise fidelity.',
    outcomes: [
      'Modular, type-safe component system',
      'Full responsive implementation across all breakpoints',
      'Integrated forms, validated inputs, and interactive states'
    ]
  },
  {
    number: '04',
    title: 'REFINE',
    summary: 'Test, polish and improve the details.',
    description: 'We audit typography on real devices, dial in micro-interactions, tune WebGL frame rates, and test keyboard accessibility. We remove superfluous noise until only clarity remains.',
    outcomes: [
      'Cross-browser and multi-device QA',
      'Micro-animation & transition calibration',
      'Zero-overflow layout and accessibility verification'
    ]
  },
  {
    number: '05',
    title: 'LAUNCH',
    summary: 'Deploy a fast, reliable and maintainable website.',
    description: 'We deploy to high-performance edge infrastructure, verify production domain routing, check OpenGraph metadata and SEO configurations, and hand over a robust, centralized codebase.',
    outcomes: [
      'Global edge deployment & SSL provisioning',
      'Verified metadata, favicon, and SEO configuration',
      'Clean handoff with centralized brand settings'
    ]
  }
];

export const studioBeliefs = [
  {
    number: '01',
    title: 'Good design should have a purpose.',
    text: 'Visuals exist to communicate value and clarify decisions, not to mask a lack of substance.'
  },
  {
    number: '02',
    title: 'Technology should disappear into the experience.',
    text: 'When code is performant and transitions are natural, visitors focus entirely on your message.'
  },
  {
    number: '03',
    title: 'Every section should earn its place.',
    text: 'We ruthlessly eliminate filler sections, generic stock clichés, and fake numbers that erode client trust.'
  },
  {
    number: '04',
    title: 'A website should communicate before it decorates.',
    text: 'If the value proposition is muddled, aesthetic embellishments will only distract.'
  },
  {
    number: '05',
    title: 'Simplicity is difficult — and worth doing well.',
    text: 'Restraint requires confidence. Creating effortless, quiet luxury demands rigorous precision.'
  }
];

export const manifestoData = {
  headline: "YOUR WEBSITE ISN'T A BROCHURE.",
  subheadline: "It is often the first conversation someone has with your business.",
  punchline: "So we make sure it says the right thing.",
  supportingCopy: "In an internet overcrowded with loud gradients and generic templates, quiet confidence and thoughtful craftsmanship stand out immediately."
};
