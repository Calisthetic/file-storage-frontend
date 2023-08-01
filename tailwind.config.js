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
        backgroundHoverDark: "var(--backgroundHoverDark)",
        backgroundHoverLight: "var(--backgroundHoverLight)",
        backgroundSecondDark: "var(--backgroundSecondDark)",
        backgroundSecondLight: "var(--backgroundSecondLight)",
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
        shadowDark: "var(--shadowDark)",
        shadowLight: "var(--shadowLight)",
        successDark: "var(--successDark)",
        successLight: "var(--successLight)",
        warningDark: "var(--warningDark)",
        warningLight: "var(--warningLight)",
        errorDark: "var(--errorDark)",
        errorLight: "var(--errorLight)",
      },
      transitionProperty: {
        userDropDownMenu: "margin, transform",
        inputs: "border, outline, background-color",
        alerts: "margin, opacity, transform. background, background-color"
      },
      spacing: {
        withHeader: "72px 16px 16px 16px"
      },
      minHeight: {
        fullWithHeader: "calc(100dvh - 56px)",
        fulldvh: "100dvh",
      },
      height: {
        fulldvh: "100dvh",
      },
      width: {
        fullcvw: "100cvw",
      },
      boxShadow: {
        pricingCardShadow: "0px 0px 7px 0px"
      }
    },
  },
  plugins: [require("daisyui")],
}

