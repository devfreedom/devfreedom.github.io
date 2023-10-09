const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: {
    content: ['./src/**/*.njk', './src/**/*.svg'],
    layers: ['components', 'utilities'],
    options: {
      safelist: ['header-shadow', '-translate-y-full', 'hidden']
    }
  },
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c'
        },
        green: colors.green,
        red: colors.red,
        blue: colors.blue,
        slate: colors.slate,
        orange: colors.orange,
        teal: colors.teal,
        amber: colors.amber,
        emerald: colors.emerald,
        lime: colors.lime,
        yellow: colors.yellow,
        cyan: colors.cyan,
        purple: colors.purple,
        indigo: colors.indigo,
        skyblue: colors.skyblue,
      },
      height: {
        112: '28rem',
        128: '32rem'
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'h1': {
              fontWeight: '700'
            },
            'blockquote': {
              fontWeight: 'normal',
              color: theme('colors.gray.700')
            },  
            'blockquote p:first-of-type::before': {
              content: ''
            },
            'blockquote p:last-of-type::after': {
              content: ''
            }
          }
        }
      }),
      boxShadow: {
        'float': '0 0px 25px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
};
