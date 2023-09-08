import { FunctionComponent, useState } from "react";
import { cn } from "../../../lib/color-utils";

interface UserAppearanceProps {}

const UserAppearance: FunctionComponent<UserAppearanceProps> = () => {
  const [currentTheme, setCurrentTheme] = useState(!('theme' in localStorage) ? "system" : localStorage.getItem('theme'))

  // Theming
  function ChangeTheme(theme:string) {
    setCurrentTheme(theme)

    if (localStorage.theme !== 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
      document.documentElement.classList.add('dark')
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <div className="pl-4 pt-4 text-textLight dark:text-textDark">
      <div className="grid max-w-[200px] lg:max-w-2xl lg:grid-cols-3 gap-8 pt-2">
        <button className="text-sm font-medium leading-none group"
        onClick={() => ChangeTheme("light")}>
          <div className={cn("items-center rounded-md p-1 transition-all " +
          " border-2 outline outline-2 -outline-offset-2 group-hover:outline-offset-2", {
            "border-backgroundThirdDark dark:border-backgroundThirdLight outline-backgroundThirdDark dark:outline-backgroundThirdLight" : currentTheme === "light",
            "border-[#808489] outline-[#808489]": currentTheme !== "light",
          })}>
            <div className="space-y-2 rounded-md bg-[#ecedef] p-2">
              <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]"></div>
                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div>
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-[#ecedef]"></div>
                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div>
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-[#ecedef]"></div>
                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div>
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
          " border-2 outline outline-2 -outline-offset-2 group-hover:outline-offset-2", {
            "border-backgroundThirdDark dark:border-backgroundThirdLight outline-backgroundThirdDark dark:outline-backgroundThirdLight" : currentTheme === "dark",
            "border-[#808489] outline-[#808489]": currentTheme !== "dark",
          })}>
            <div className="space-y-2 rounded-sm bg-slate-950 p-2">
              <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                <div className="h-2 w-[80px] rounded-lg bg-slate-400"></div>
                <div className="h-2 w-[100px] rounded-lg bg-slate-400"></div>
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-slate-400"></div>
                <div className="h-2 w-[100px] rounded-lg bg-slate-400"></div>
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-slate-400"></div>
                <div className="h-2 w-[100px] rounded-lg bg-slate-400"></div>
              </div>
            </div>
          </div>
          <span className="block w-full p-2 text-center font-medium text-base">
            Dark
          </span>
        </button>
        <button className="text-sm font-medium leading-none group"
        onClick={() => ChangeTheme("system")}>
          <div  className={cn("grid grid-cols-2 rounded-md p-1 transition-all " +
          " border-2 outline outline-2 -outline-offset-2 group-hover:outline-offset-2", {
            "border-backgroundThirdDark dark:border-backgroundThirdLight outline-backgroundThirdDark dark:outline-backgroundThirdLight" : currentTheme === "system",
            "border-[#808489] outline-[#808489]": currentTheme !== "system",
          })}>
            <div className="space-y-2 rounded-sm bg-slate-950 p-2">
              <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                <div className="h-2 w-[80px] rounded-lg bg-slate-400"></div>
                <div className="h-2 w-[100px] rounded-lg bg-slate-400"></div>
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-slate-400"></div>
                <div className="h-2 w-[100px] rounded-lg bg-slate-400"></div>
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-slate-400"></div>
                <div className="h-2 w-[100px] rounded-lg bg-slate-400"></div>
              </div>
            </div>
          </div>
          <span className="block w-full p-2 text-center font-medium text-base">
            System
          </span>
        </button>
      </div>
    </div>
  );
};

export default UserAppearance;
