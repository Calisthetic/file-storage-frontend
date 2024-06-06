import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IconLight from "./icons/IconLight";
import IconDark from "./icons/IconDark";
import { AnimatePresence, motion } from "framer-motion";
import { apiUrl } from "../data/data";
import { CheckForError } from "../lib/check-errors";
 
const UserProfileDropdown: FunctionComponent = () => {
  // User image url
  let temp:string | null = localStorage.getItem("userImage")
  const userImage:string | undefined = temp === null ? "https://static-00.iconduck.com/assets.00/profile-user-icon-2048x2048-m41rxkoe.png" : temp

  const [currentTheme, setCurrentTheme] = useState(!('theme' in localStorage) ? "system" : localStorage.getItem('theme'))

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

  interface IUserInfo {
    username:string
    firstName:string
    secondName:string
    about:string
    primaryEmail:string
  }
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    username: 'none',
    firstName: 'User',
    secondName: '',
    about: 'Nothing',
    primaryEmail: 'gmail@gmail.com'
  });
  useEffect(() => {
    let token = localStorage.getItem("token")
    if (token) {
      fetch(apiUrl + "users/info", {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token === null ? "" : token,
        },
      })
      .then(resp => {
        CheckForError(resp.status)
        return resp.json()
      })
      .then(data => {
        setUserInfo(data)
      })
      .catch((error) => {
        
      });
    }
  }, [])

  let token = localStorage.getItem("token")
  return token ? (
    <div className="flex items-center">
      <button onClick={() => ChangeTheme(currentTheme === "dark" ? "light" : "dark")}>
        <AnimatePresence>
          {currentTheme === "dark" ? (
            <motion.div initial={{y:-10, opacity:0}} animate={{y:0, opacity:1}} 
            transition={{damping:24, stiffness:300}}>
              <IconDark classes="h-6 w-6 fill-white dark:fill-white fill-black"></IconDark>
            </motion.div>
          ) : (
            <motion.section initial={{y:-10, opacity:0}} animate={{y:0, opacity:1}} 
            transition={{damping:24, stiffness:300}}>
              <IconLight classes="h-6 w-6 fill-black dark:fill-white fill-black"></IconLight>
            </motion.section>
          )}
        </AnimatePresence>
      </button>
      <div className="flex ml-3">
        <button className="flex text-sm bg-backgroundThirdLight dark:bg-backgroundThirdDark 
        rounded-full peer focus:pointer-events-none">
          <img className="w-8 h-8 rounded-full pointer-events-none" alt="user" draggable="false"
          src={userImage} />
        </button>
        <div className="grid absolute grid-rows-[0fr] peer-focus:grid-rows-[1fr] focus-within:grid-rows-[1fr]
        -translate-x-[calc(100%-32px)] duration-500 w-max mt-10 transition-[grid-template-rows,margin]">
          <div className="z-50 text-base list-none bg-backgroundThirdLight 
          dark:bg-backgroundThirdDark dark:divide-borderDark text-textLight dark:text-textDark
          shadow-lightLight dark:shadow-lightDark rounded overflow-hidden">
            <div className="px-4 py-3">
              <p className="">
                {userInfo.firstName + " " + userInfo.secondName}
              </p>
              <p className="font-medium">
                {userInfo.primaryEmail}
              </p>
            </div>
            <div className="py-1">
              <Link to="/welcome" className="block px-4 py-2 hover:bg-backgroundHoverLight w-full text-left
                dark:hover:bg-backgroundHoverDark" role="menuitem">Home
              </Link>
              <Link to="/disk/folder/main" className="block px-4 py-2 hover:bg-backgroundHoverLight w-full text-left
                dark:hover:bg-backgroundHoverDark" role="menuitem">Disk
              </Link>
              <Link to="/user/profile" className="block px-4 py-2 hover:bg-backgroundHoverLight w-full text-left
                dark:hover:bg-backgroundHoverDark" role="menuitem">Profile
              </Link>
              <Link to="/user/statistic" className="block px-4 py-2 hover:bg-backgroundHoverLight w-full text-left
                dark:hover:bg-backgroundHoverDark" role="menuitem">Statistic
              </Link>
              <Link to="/docs" className="block px-4 py-2 hover:bg-backgroundHoverLight w-full text-left
                dark:hover:bg-backgroundHoverDark" role="menuitem">Documentation
              </Link>
              <Link to="/auth/signin" className="block px-4 py-2 hover:bg-backgroundHoverLight w-full text-left
                dark:hover:bg-backgroundHoverDark" role="menuitem">Sign out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
   ) : (
    <div className="flex items-center gap-x-2 sm:gap-x-4 text-textLight dark:text-textDark">
      <button onClick={() => ChangeTheme(currentTheme === "dark" ? "light" : "dark")}>
        <AnimatePresence>
          {currentTheme === "dark" ? (
            <motion.div initial={{y:-10, opacity:0}} animate={{y:0, opacity:1}} 
            transition={{damping:24, stiffness:300}}>
              <IconDark classes="h-6 w-6 dark:fill-white fill-black"></IconDark>
            </motion.div>
          ) : (
            <motion.section initial={{y:-10, opacity:0}} animate={{y:0, opacity:1}} 
            transition={{damping:24, stiffness:300}}>
              <IconLight classes="h-6 w-6 dark:fill-white fill-black"></IconLight>
            </motion.section>
          )}
        </AnimatePresence>
      </button>
      <Link to="/auth/signin" className="py-1 px-1 sm:px-2 rounded-lg capitalize 
      bg-backgroundThirdLight dark:bg-backgroundThirdDark border border-borderLight dark:border-borderDark
      hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark transition-colors">sign in</Link>
      <Link to="/auth/signup" className="py-1 px-1 sm:px-2 rounded-lg capitalize bg-buttonLight dark:bg-buttonDark
      hover:bg-buttonHoverLight hover:dark:bg-buttonHoverDark transition-colors">sign up</Link>
    </div>
   );
}
 
export default UserProfileDropdown;