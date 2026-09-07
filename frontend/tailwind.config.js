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
        forest: {
          DEFAULT: '#19382B',
          dark: '#11271E',
          deep: '#152E23',
          light: '#234E3B',
          hover: '#2D5E48',
        },
        sage: {
          DEFAULT: '#789177',
          light: '#9BB19A',
          bg: '#EAF0E9',
        },
        ivory: {
          DEFAULT: '#F7F6F1',
          bg: '#F5F4EE',
          card: '#FFFFFF',
          dark: '#EBE9DE',
        },
        cream: {
          DEFAULT: '#EFEEE7',
          light: '#FAF9F5',
        },
        charcoal: {
          DEFAULT: '#18211E',
          soft: '#2C3531',
          muted: '#6E756F',
        },
        himBlue: '#4C89C7',
        himAmber: '#D8A32A',
        himOrange: '#E36B25',
        himRed: '#D94A3A',
      },
      fontFamily: {
        serif: ['"DM Serif Display"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        script: ['"Caveat"', 'cursive'],
      },
      borderRadius: {
        '2xl': '18px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(24, 33, 30, 0.05)',
        'floating': '0 12px 32px -4px rgba(24, 33, 30, 0.12)',
        'hero-card': '0 10px 25px -3px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}

