module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT:
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md:
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg:
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl:
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 10px 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
      right: '3px 2px 8px -2px #888',
      panel: '5px 5px 5px 0px rgba(0,0,0,0.5)'
    },
    extend: {
      spacing: {
        100: '25rem',
        120: '30rem',
        140: '35rem',
        160: '40rem',
        200: '50rem',
        240: '60rem',
        'full-minus-panel': 'calc(100% - 42rem)',
        'full-minus-nav': 'calc(100% - 3rem)',
        'full-minus-sidebar': 'calc(100% - 25rem)'
      },
      colors: {
        beige: {
          lightest: '#FCF7EE',
          lighter: '#F9EFDC',
          light: '#F3E3C5',
          DEFAULT: '#EED6AA',
          dark: '#E3BE78',
          darkest: '#D9A545'
        },
        orange: {
          DEFAULT: '#AF4319'
        }
      },
      keyframes: {
        wiggle: {
          '0%, 100%': {
            transform: 'rotate(-1deg)',
          },
          '50%': {
            transform: 'rotate(1deg)',
          },
        },
      },
      animation: {
        wiggle: 'wiggle 0.3s ease-in-out',
      }
    },
  },
  plugins: [],
}
