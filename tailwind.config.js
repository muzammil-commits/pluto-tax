/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pluto: {
          navy: {
            DEFAULT: '#082B63',
            deep: '#05204A',
            darker: '#03142F',
            surface: '#0A2E66',
            light: '#0D3E8D',
            border: '#153E7E',
            hover: '#0B357A',
          },
          gold: {
            DEFAULT: '#FFBF00',
            bright: '#FFC928',
            amber: '#E6A800',
            dark: '#CC9600',
            light: '#FFF4D6',
            glow: 'rgba(255, 191, 0, 0.25)',
          },
          blue: {
            light: '#EAF3FF',
            soft: '#F0F6FF',
            accent: '#2563EB',
          },
          grey: {
            light: '#F5F7FA',
            muted: '#64748B',
            border: '#E2E8F0',
          }
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
        heading: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
