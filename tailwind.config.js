/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          green: '#1E3A1F',
          sage:  '#6B8F71',
          leaf:  '#7A9D54',
        },
        accent: {
          terracotta: '#C4714A',
          bone:       '#FAF7F2',
          sand:       '#E8DFD0',
        },
        dark: {
          base:    '#141410',
          surface: '#1C1C18',
          card:    '#242420',
          forest:  '#2A4A2B',
          muted:   '#3A3A34',
        },
      },
      fontFamily: {
        sans:    ['var(--font-inter)',    'system-ui', 'sans-serif'],
        display: ['var(--font-sora)',     'system-ui', 'sans-serif'],
        serif:   ['var(--font-cormorant)','Georgia',   'serif'],
      },
    },
  },
  plugins: [],
}