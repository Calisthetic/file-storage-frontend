/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  darkMode: 'class',
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
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
      },
      gridTemplateColumns: {
        alerts: "minmax(24px, 32px) minmax(0, 1fr)"
      },
      transitionProperty: {
        dropAnswer: "max-height 0.3s ease-out",
        inputs: "border, outline, background-color",
        dropFiles: "opacity 1s ease-in-out !important",
      },
      spacing: {
        withHeader: "72px 16px 16px 16px",
        alertLeft: "calc(100vw - 320px)",
      },
      minHeight: {
        fullWithHeader: "calc(100vh - 56px)",
        xs: "320px",
      },
      minWidth: {
        xs: "320px",
      },
      maxHeight: {
        xs: "320px",
      },
      height: {
        fullWithHeader: "calc(100vh - 56px) !important",
      },
      boxShadow: {
        defaultDark: "0px 0px 4px -1px var(--shadowDark)",
        defaultLight: "0px 0px 4px -1px var(--shadowLight)",
        lightDark: "0px 0px 3px -1px var(--shadowDark)",
        lightLight: "0px 0px 3px -1px var(--shadowLight)",
        tileLight: "0px 2px 10px -4px var(--shadowLight)",
      },
      padding: {
        dfUploadFiles: "0% 20% !important",
        smUploadFiles: "0% 33% !important",
        mdUploadFiles: "0% 36% !important",
        lgUploadFiles: "0% 39% !important",
        xlUploadFiles: "0% 41% !important",
        xl2UploadFiles: "0% 43% !important"
      },

      screens: {
        'px1050': '1050px',
        xs: "320px",
      },
    },
  },
  plugins: [
    require("daisyui"),
    function ({addVariant}) {
      addVariant('child', '&>*');
      addVariant('child-hover', '&>*:hover');
    }
  ],
}

