/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: '#f7f3ec',
          light: '#faf7f2',
          dark: '#efe8dc',
        },
        card: {
          DEFAULT: '#fffdf9',
          alt: '#f2eae0',
          warm: '#fdf6ee',
        },
        espresso: {
          DEFAULT: '#2e2722',
          light: '#544a42',
          muted: '#8c8077',
        },
        mocha: {
          DEFAULT: '#6b5e52',
          light: '#e8d5c0',
          soft: '#f5ece2',
        },
        matcha: {
          DEFAULT: '#8a9a7b',
          dark: '#556347',
          light: '#d2dcc8',
          soft: '#eef2ea',
        },
        terracotta: {
          DEFAULT: '#b86f52',
          dark: '#9a5a40',
          soft: '#f4ded4',
          muted: '#d4a894',
        },
        amber: {
          warm: '#d49b5c',
          light: '#f0dbc0',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
      },
      borderRadius: {
        'cozy': '1.25rem',
        'cozy-lg': '1.75rem',
        'cozy-xl': '2rem',
      },
      boxShadow: {
        'cozy': '0 4px 20px rgba(46, 39, 34, 0.06)',
        'cozy-hover': '0 12px 32px rgba(46, 39, 34, 0.12)',
        'cozy-lg': '0 16px 48px rgba(46, 39, 34, 0.10)',
        'polaroid': '0 8px 25px rgba(46, 39, 34, 0.12), 0 2px 4px rgba(46, 39, 34, 0.05)',
        'inner-warm': 'inset 0 2px 12px rgba(184, 111, 82, 0.06)',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'spin-slower': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'steam': 'steam 3s ease-in-out infinite',
        'eq-bar-1': 'eqBar 0.6s ease-in-out infinite',
        'eq-bar-2': 'eqBar 0.8s ease-in-out 0.1s infinite',
        'eq-bar-3': 'eqBar 0.5s ease-in-out 0.2s infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'wiggle': 'wiggle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        steam: {
          '0%': { opacity: '0', transform: 'translateY(0) scale(1)' },
          '50%': { opacity: '0.3', transform: 'translateY(-8px) scale(1.1)' },
          '100%': { opacity: '0', transform: 'translateY(-18px) scale(1.3)' },
        },
        eqBar: {
          '0%, 100%': { height: '4px' },
          '50%': { height: '14px' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
