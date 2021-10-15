module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minHeight: {
        '20': '5rem',
      },
      minWidth: {
        '20': '5rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}