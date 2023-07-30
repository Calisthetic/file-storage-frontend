/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundDark: "var(--backgroundDark)",
        backgroundLight: "var(--backgroundLight)",
        backgroundHoverDark: "var(--backgroundHoverDark)", // Change White => Light
        backgroundHoverLight: "var(--backgroundHoverLight)",
        backgroundSecondaryDark: "var(--backgroundSecondaryDark)",
        backgroundSecondaryLight: "var(--backgroundSecondaryLight)",
        backgroundThirdDark: "var(--backgroundThirdDark)",
        backgroundThirdLight: "var(--backgroundThirdLight)",
        backgroundAccentDark: "var(--backgroundAccentDark)",
        backgroundAccentLight: "var(--backgroundAccentLight)",
        borderDark: "var(--borderDark)",
        borderLight: "var(--borderLight)",
        textDark: "var(--textDark)",
        textLight: "var(--textLight)",
        buttonDark: "var(--buttonDark)",
        buttonLight: "var(--buttonLight)",
        buttonHoverDark: "var(--buttonHoverDark)",
        buttonHoverLight: "var(--buttonHoverLight)",
        iconDark: "var(--iconDark)",
        iconLight: "var(--iconLight)",
      },
      transitionProperty: {
        userDropDownMenu: "margin, transform"
      },
      spacing: {
        withHeader: "72px 16px 16px 16px"
      }
    },
  },
  plugins: [],
}

