module.exports = {
  purge: {
    enabled: true,
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
  },
  theme: {
    extend: {
      minHeight: {
        20: "5rem",
      },
      minWidth: {
        20: "5rem",
      },
    },
  },
  plugins: [],
};
