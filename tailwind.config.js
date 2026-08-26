/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        studio: {
          950: '#070709', // Deepest Obsidian
          900: '#0C0C0F', // Near-Black
          850: '#121217', // Graphite Card / Panel
          800: '#191921', // Elevated Surface
          700: '#252530', // Border subtle
          600: '#3D3D4E', // Inactive / border accent
          500: '#656578', // Muted microcopy
          400: '#9494A6', // Secondary text
          300: '#C2C2CE', // Body light
          200: '#E4E3EA', // Soft ivory
          100: '#F5F4F0', // Warm white / Ivory
          50:  '#FAF9F6', // Pure ivory highlight
        },
        champagne: {
          900: '#2A2318',
          800: '#4A3E2C',
          700: '#756448',
          600: '#A48E68',
          500: '#C8B89A', // Primary Champagne Metallic
          400: '#D8CCB5',
          300: '#E6DED0',
          200: '#F2ECE2',
          100: '#F9F6F0',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cinzel"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
        widest: '0.2em',
        ultra: '0.3em',
      },
      lineHeight: {
        relaxed: '1.75',
        loose: '1.9',
      },
      animation: {
        'slow-pulse': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
