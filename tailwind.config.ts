import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#eef2f7',
          100: '#d5e0ee',
          200: '#a8bed8',
          300: '#7a9bbf',
          400: '#5079a6',
          500: '#2d5788',
          600: '#1e3d78',
          700: '#1a3566',
          800: '#162d54',
          900: '#0d1f3c',
          950: '#060e1e',
        },
        gold: {
          50:  '#fdf8e8',
          100: '#f9ecb8',
          200: '#f5d87a',
          300: '#f0ca4a',
          400: '#f0c040',
          500: '#d4af37',
          600: '#c9a227',
          700: '#b8922a',
          800: '#9a7a22',
          900: '#7a6018',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:  ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold':    '0 0 32px 4px rgba(212, 175, 55, 0.18)',
        'gold-sm': '0 0 16px 2px rgba(212, 175, 55, 0.14)',
        'gold-xs': '0 0 8px 1px rgba(212, 175, 55, 0.10)',
      },
      animation: {
        'expand-width': 'expandWidth 1.2s cubic-bezier(0.22,1,0.36,1) 0.6s forwards',
        'fade-up':      'fadeUp 0.7s ease-out forwards',
        'fade-in':      'fadeIn 1s ease-out forwards',
      },
      keyframes: {
        expandWidth: {
          '0%':   { width: '0%', opacity: '0' },
          '100%': { width: '100%', opacity: '1' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
