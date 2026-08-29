/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          950: '#030814',
          900: '#061325',
          850: '#091d38',
          800: '#0c274c',
          700: '#113a6e',
          600: '#165399',
          500: '#1d70c8',
          400: '#388fe5',
          300: '#67aef3',
          200: '#a3cdfa',
          100: '#dbeafe',
        },
        marine: {
          cyan: '#06b6d4',
          teal: '#14b8a6',
          emerald: '#10b981',
          amber: '#f59e0b',
          coral: '#f43f5e',
          neon: '#22d3ee',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'wave-slow': 'wave 12s linear infinite',
        'radar': 'radar 4s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wave: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(6, 182, 212, 0.7)' },
        }
      }
    },
  },
  plugins: [],
}

