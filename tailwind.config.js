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
        backgroundDarkHover: "var(--backgroundDarkHover)", // Change White => Light
        backgroundLightHover: "var(--backgroundLightHover)",
        backgroundSecondaryDark: "var(--backgroundSecondaryDark)",
        backgroundSecondaryLight: "var(--backgroundSecondaryLight)",
        backgroundThirdDark: "var(--backgroundThirdDark)",
        backgroundThirdLight: "var(--backgroundThirdLight)",
        //backgroundAccentDark: "var(--backgroundAccentDark)",
        //backgroundAccentLight: "var(--backgroundAccentLight)",
        borderDark: "var(--borderDark)",
        borderLight: "var(--borderLight)",
        textDark: "var(--textDark)",
        textLight: "var(--textLight)",
        iconDark: "var(--iconDark)",
        iconLight: "var(--iconLight)",
      }
    },
  },
  plugins: [],
}

