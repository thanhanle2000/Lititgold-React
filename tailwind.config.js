module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  },
  theme: {
    extend: {
      aspectRatio: {
        cinema: "21/9",
        card: "4/3",
      },
      colors: {
        primary: "var(--zmp-primary-color)",
        secondary: "var(--zmp-secondary-color)",
        background: "var(--zmp-page-bg-color)",
      },
    },
  },
};
