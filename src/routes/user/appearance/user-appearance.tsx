import { FunctionComponent, useState, useEffect, useCallback } from "react";
import { GetCSSValue, cn } from "../../../lib/color-utils";
import { motion } from "framer-motion";
import { CSSVariables } from "../../../data/style/css-variables";
import ColorPicker from "../../../components/color-picker";
import "../../../styles/focus-elems.css";

interface UserAppearanceProps {}

const UserAppearance: FunctionComponent<UserAppearanceProps> = () => {
  const [currentTheme, setCurrentTheme] = useState(!('theme' in localStorage) ? "system" : localStorage.getItem('theme'))

  // Theming
  const ChangeTheme = useCallback((theme:string) => {
    if (theme === currentTheme) return
    setCurrentTheme(theme)

    if (theme === "system") {
      localStorage.removeItem("theme")
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } else if (theme === "light") {
      document.documentElement.classList.remove('dark')
      localStorage.setItem("theme", "light")
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem("theme", "dark")
    }
  }, [currentTheme])

  useEffect(() => {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", PrefersThemeChangedHandler)

    function PrefersThemeChangedHandler() {
      if (!('theme' in localStorage)) {
        ChangeTheme("system")
      }
    }

    return () => window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", PrefersThemeChangedHandler)
  }, [ChangeTheme])

  //
  function SetColor(data:any) {
    console.log(data)
  }

  return (
    <div className="text-textLight dark:text-textDark min-h-fullWithHeader flex flex-col items-center">
      <div className="text-textLight dark:text-textDark font-normal
      w-[calc(100dvw-24px)] sm:w-[calc(100dvw-256px-24px)] lg:w-[740px]">
        <motion.div initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{delay: 0, damping: 24, stiffness: 300}} 
        className="border-b border-borderLight dark:border-borderDark py-4">
          <p className="text-xl font-semibold">Appearance</p>
          <p className="opacity-80 dark:opacity-70 text-sm">Customize the appearance of the app. Automatically switch between day and night themes.</p>
        </motion.div>
        <motion.div initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{delay: 0.05, damping: 24, stiffness: 300}} 
        className="pt-4">
          <label className="font-medium">Theme</label>
          <p className="opacity-80 dark:opacity-70 text-sm">Select the theme for the dashboard.</p>
          <div className="child:w-[200px] lg:max-w-2xl flex flex-wrap gap-8 pt-2 justify-center mt-2">
            <button className="text-sm font-medium leading-none group"
            onClick={() => ChangeTheme("light")}>
              <div className={cn("items-center rounded-md p-1 transition-all " +
              " border-2 outline outline-2 -outline-offset-2 group-hover:outline-offset-2", {
                "border-backgroundThirdDark dark:border-backgroundThirdLight outline-backgroundThirdDark dark:outline-backgroundThirdLight" : currentTheme === "light",
                "border-[#808489] outline-[#808489]": currentTheme !== "light",
              })}>
                <div className="space-y-2 rounded-md bg-backgroundLight p-2">
                  <div className="space-y-2 rounded-md bg-backgroundSecondLight p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-backgroundThirdLight"></div>
                    <div className="h-2 w-[100px] rounded-lg bg-backgroundThirdLight"></div>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-backgroundSecondLight p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-backgroundThirdLight"></div>
                    <div className="h-2 w-[100px] rounded-lg bg-backgroundThirdLight"></div>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-backgroundSecondLight p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-backgroundThirdLight"></div>
                    <div className="h-2 w-[100px] rounded-lg bg-backgroundThirdLight"></div>
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-medium text-base">
                Light
              </span>
            </button>
            <button className="text-sm font-medium leading-none group"
            onClick={() => ChangeTheme("dark")}>
              <div  className={cn("items-center rounded-md p-1 transition-all " +
              "border-2 outline outline-2 -outline-offset-2 group-hover:outline-offset-2", {
                "border-backgroundThirdDark dark:border-backgroundThirdLight outline-backgroundThirdDark dark:outline-backgroundThirdLight" : currentTheme === "dark",
                "border-[#808489] outline-[#808489]": currentTheme !== "dark",
              })}>
                <div className="space-y-2 rounded-md bg-backgroundDark p-2">
                  <div className="space-y-2 rounded-md bg-backgroundSecondDark p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-backgroundThirdDark"></div>
                    <div className="h-2 w-[100px] rounded-lg bg-backgroundThirdDark"></div>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-backgroundSecondDark p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-backgroundThirdDark"></div>
                    <div className="h-2 w-[100px] rounded-lg bg-backgroundThirdDark"></div>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-backgroundSecondDark p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-backgroundThirdDark"></div>
                    <div className="h-2 w-[100px] rounded-lg bg-backgroundThirdDark"></div>
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-medium text-base">
                Dark
              </span>
            </button>
            <button className="text-sm font-medium leading-none group"
            onClick={() => ChangeTheme("system")}>
              <div  className={cn("flex flex-row rounded-md p-1 transition-all overflow-hidden " +
              "border-2 outline outline-2 -outline-offset-2 group-hover:outline-offset-2", {
                "border-backgroundThirdDark dark:border-backgroundThirdLight outline-backgroundThirdDark dark:outline-backgroundThirdLight" : currentTheme === "system",
                "border-[#808489] outline-[#808489]": currentTheme !== "system",
              })}>
                {/* Dark theme blocks */}
                <div className="space-y-2 rounded-md bg-backgroundDark p-2 w-[160px]">
                  <div className="space-y-2 rounded-md bg-backgroundSecondDark p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-backgroundThirdDark"></div>
                    <div className="h-2 w-[100px] rounded-lg bg-backgroundThirdDark"></div>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-backgroundSecondDark p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-backgroundThirdDark"></div>
                    <div className="h-2 w-[100px] rounded-lg bg-backgroundThirdDark"></div>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-backgroundSecondDark p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-backgroundThirdDark"></div>
                    <div className="h-2 w-[100px] rounded-lg bg-backgroundThirdDark"></div>
                  </div>
                </div>
                {/* Light triangle and decorations parent */}
                <div className="border-[68px] border-l-[transparent] border-t-[transparent] absolute translate-x-6 bg-transparent border-backgroundLight"></div>
                <div className="w-[28px] bg-backgroundLight rounded-r-md">
                  <div className="absolute -translate-x-[48px] translate-y-2 bg-transparent border-[20px]
                  border-t-transparent border-l-transparent border-backgroundSecondLight"></div>
                  <div className="absolute -translate-x-[88px] translate-y-[56px] bg-transparent border-[16px]
                  border-t-transparent border-l-transparent border-backgroundSecondLight"></div>
                  <div className="absolute -translate-x-[128px] translate-y-[96px] bg-transparent border-[16px]
                  border-t-transparent border-l-transparent border-backgroundSecondLight"></div>
                  <div className="absolute -translate-x-[8px] translate-y-[8px] bg-backgroundSecondLight
                  rounded-r-md border-backgroundSecondLight h-10 w-[28px]"></div>
                  <div className="absolute -translate-x-[56px] translate-y-[56px] bg-backgroundSecondLight
                  rounded-r-md border-backgroundSecondLight h-8 w-[76px]"></div>
                  <div className="absolute -translate-x-[96px] translate-y-[96px] bg-backgroundSecondLight
                  rounded-r-md border-backgroundSecondLight h-8 w-[116px]"></div>
                  <div className="absolute -translate-x-[76px] translate-y-[68px] bg-transparent border-[4px]
                  border-t-transparent border-l-transparent border-backgroundThirdLight"></div>
                  <div className="absolute -translate-x-[116px] translate-y-[108px] bg-transparent border-[4px]
                  border-t-transparent border-l-transparent border-backgroundThirdLight"></div>
                  <div className="absolute -translate-x-[68px] translate-y-[68px] bg-backgroundThirdLight
                  rounded-r-md border-backgroundThirdLight h-2 w-[48px]"></div>
                  <div className="absolute -translate-x-[108px] translate-y-[108px] bg-backgroundThirdLight
                  rounded-r-md border-backgroundThirdLight h-2 w-[88px]"></div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-medium text-base">
                System
              </span>
            </button>
          </div>
        </motion.div>
        <motion.div initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{delay: 0.05, damping: 24, stiffness: 300}} 
        className="pt-4">
          <label className="font-medium">Custom theme</label>
          <p className="opacity-80 dark:opacity-70 text-sm">Customize your color scheme that you want to see on the site.</p>
          <div className="mt-2">
            {CSSVariables.map((item, index) => (
              <div key={index} className="flex gap-x-1.5">
                <div className="flex items-center flex-row">
                  <button className="w-4 h-4 border border-borderLight dark:border-borderDark rounded focus-first-right" 
                  style={{backgroundColor: GetCSSValue(item)}}></button>
                  <div className="bg-backgroundLight dark:bg-backgroundThirdDark
                  focus-second-right rounded-lg text-base z-10 px-2 pb-2 pt-1 w-max">
                    <ColorPicker type="default" currentColor={GetCSSValue(item)} dataId={item.toString()} onSelect={SetColor}></ColorPicker>
                  </div>
                </div>
                <div className="flex flex-row">
                  <p className="first-letter:uppercase">{item}:</p>
                  <span className="ml-1 opacity-70">{GetCSSValue(item)}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserAppearance;
