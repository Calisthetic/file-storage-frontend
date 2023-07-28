/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundDark: "var(--backgroundDark)",
        backgroundWhite: "var(--backgroundWhite)",
        backgroundDarkHover: "var(--backgroundDarkHover)", // Change White => Light
        backgroundWhiteHover: "var(--backgroundWhiteHover)",
        backgroundSecondaryDark: "var(--backgroundSecondaryDark)",
        backgroundSecondaryWhite: "var(--backgroundSecondaryWhite)",
        backgroundThirdDark: "var(--backgroundThirdDark)",
        backgroundThirdWhite: "var(--backgroundThirdWhite)",
        backgroundAccentDark: "var(--backgroundAccentDark)",
        backgroundAccentWhite: "var(--backgroundAccentWhite)",
        textDark: "var(--textDark)",
        textWhite: "var(--textWhite)",
        iconDark: "var(--iconDark)",
        iconWhite: "var(--iconWhite)",
      }
    },
  },
  plugins: [],
}

