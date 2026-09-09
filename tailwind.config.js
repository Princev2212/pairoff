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
        aurora: {
          950: '#04070B',
          900: '#070A0F',
          850: '#0C1118',
          800: '#111827',
          750: '#152033',
          700: '#1E293B',
          600: '#334155',
          500: '#64748B',
          400: '#94A3B8',
          300: '#CBD5E1',
          200: '#E2E8F0',
          100: '#F1F5F9',
          50:  '#F8FAFC',
        },
        gain: {
          emerald: '#10B981',
          emeraldLight: '#34D399',
          cyan: '#06B6D4',
          cyanLight: '#22D3EE',
          indigo: '#6366F1',
          violet: '#8B5CF6',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'glass-glow': '0 0 35px -5px rgba(16, 185, 129, 0.15)',
        'glass-cyan': '0 0 35px -5px rgba(6, 182, 212, 0.15)',
        'inner-light': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)',
      },
      animation: {
        'aurora-slow': 'auroraMove 18s ease infinite alternate',
        'aurora-reverse': 'auroraMoveReverse 22s ease infinite alternate',
        'scan-laser': 'laserSweep 2.4s ease-in-out infinite alternate',
        'pulse-subtle': 'pulseSubtle 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'floatSmooth 6s ease-in-out infinite',
      },
      keyframes: {
        auroraMove: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(40px, 60px) scale(1.1)' },
          '100%': { transform: 'translate(-30px, 20px) scale(0.95)' },
        },
        auroraMoveReverse: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(-50px, -30px) scale(1.15)' },
          '100%': { transform: 'translate(30px, 40px) scale(0.9)' },
        },
        laserSweep: {
          '0%': { top: '5%', opacity: '0.8' },
          '50%': { opacity: '1' },
          '100%': { top: '95%', opacity: '0.8' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        floatSmooth: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      },
    },
  },
  plugins: [],
}
