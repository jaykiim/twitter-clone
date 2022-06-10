module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          light: "#d9d9d9",
          dark: "#6e767d",
        },
        "tweet-blue": {
          light: "#1d9bf0",
          dark: "#1a8cd8",
        },
      },
    },
  },
  plugins: [],
};
