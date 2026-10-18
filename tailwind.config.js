/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dnd: {
          dark: '#0a0d14',
          panel: '#111827',
          surface: '#1e293b',
          border: '#334155',
          gold: '#f59e0b',
          cyan: '#06b6d4',
          ruby: '#ef4444',
          emerald: '#10b981',
          violet: '#8b5cf6'
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
