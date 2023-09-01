/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
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
      gridTemplateColumns: {
        alerts: "minmax(24px, 32px) minmax(0, 1fr)"
      },
      transitionProperty: {
        inputs: "border, outline, background-color",
        dropFiles: "opacity 1s ease-in-out !important",
      },
      spacing: {
        withHeader: "72px 16px 16px 16px",
        alertTop: "calc(100dvh)",
        alertLeft: "calc(100vw - 320px)",
      },
      minHeight: {
        fullWithHeader: "calc(100dvh - 56px)",
        fulldvh: "100dvh",
        xs: "320px",
      },
      minWidth: {
        xs: "320px",
        fulldvw: "100dvw !important",
      },
      maxHeight: {
        xs: "320px",
        fulldvh: "100dvh !important",
      },
      maxWidth: {
        fulldvw: "100dvw !important"
      },
      height: {
        fulldvh: "100dvh !important",
        full100: "100% !important",
        fullWithHeader: "calc(100dvh - 56px) !important",
      },
      width: {
        fulldvw: "100dvw !important",
        full100: "100% !important",
      },
      boxShadow: {
        defaultDark: "0px 0px 4px 0px var(--shadowDark)",
        defaultLight: "0px 0px 4px 0px var(--shadowLight)",
        lightDark: "0px 0px 3px -1px var(--shadowDark)",
        lightLight: "0px 0px 3px -1px var(--shadowLight)"
      },
      padding: {
        dfUploadFiles: "0% 20% !important",
        smUploadFiles: "0% 33% !important",
        mdUploadFiles: "0% 36% !important",
        lgUploadFiles: "0% 39% !important",
        xlUploadFiles: "0% 41% !important",
        xl2UploadFiles: "0% 43% !important"
      },
      borderWidth: {
        imp0: "0px !important",
      },
      top: {
        help: "10px"
      }
    },
  },
  plugins: [
    require("daisyui"),
    // function ({addVariant}) {
    //   addVariant('child', '&>*');
    //   addVariant('child-hover', '&>*:hover');
    // }
  ],
}

