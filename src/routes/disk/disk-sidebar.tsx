import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react";
import {Link,} from "react-router-dom";
import IconClose from "../../components/icons/IconClose";
import IconBin from "../../components/icons/IconBin";
import { apiUrl } from "../../data/data";
import { CheckForError } from "../../lib/check-errors";
import { CutSize } from "../../lib/utils";

export default function DiskSideBar() {
  const [isAdOpen, setIsAdOpen] = useState(true)

  const [currentUsage, setCurrentUsage] = useState<any>()
  // Download file
  useEffect(() => {
    let token = localStorage.getItem("token")
    fetch(apiUrl + "users/usage", {
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
      setCurrentUsage(data)
    })
    .catch((error) => {
      console.log(error.message)
    });
  }, [])
  return (
    <div className="h-full px-3 pb-4 bg-backgroundLight dark:bg-backgroundDark
    dark:text-textDark text-textLight font-medium text-sm sm:text-base
    overflow-y-auto">
      <ul className="space-y-1">
        <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{delay: 0, stiffness: 300, damping: 24}}>
          <Link to="folder/main" draggable="false" className="flex items-center p-1.5 sm:p-2 transition-all
          rounded-lg hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark group">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 128h128V96H0Zm23-22a6 6 0 1 1-6 6 6 6 0 0 1 6-6ZM0 80h128V48H0Zm23-22a6 
              6 0 1 1-6 6 6 6 0 0 1 6-6ZM0 32h128V0H0Zm23-22a6 6 0 1 1-6 6 6 6 0 0 1 6-6Z" 
              className="fill-iconLight dark:fill-iconDark"></path></svg>
            <span className="ml-3">My storage</span>
          </Link>
        </motion.li>
        <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{delay: 0.02, stiffness: 300, damping: 24}}>
          <Link to="favorites" draggable="false" className="flex items-center p-1.5 sm:p-2 transition-all
          rounded-lg hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark group">
          <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.881 12.557a2.303 2.303 0 0 0-1.844-1.511l-8.326-1.238-3.619-7.514A2.318 
            2.318 0 0 0 16 1c-.896 0-1.711.505-2.092 1.294l-3.619 7.514-8.327 1.238A2.3 2.3 0 0 0 
            .12 12.557a2.207 2.207 0 0 0 .537 2.285l6.102 6.092-1.415 8.451a2.224 2.224 
            0 0 0 .948 2.203 2.351 2.351 0 0 0 2.449.131L16 27.811l7.26 3.908a2.367 2.367 0 0 0 
            2.449-.131 2.225 2.225 0 0 0 .947-2.203l-1.416-8.451 6.104-6.092c.603-.603.81-1.485.537-2.285zm-8.293 
            6.806a2.216 2.216 0 0 0-.627 1.934l1.416 8.451-7.26-3.906a2.361 2.361 0 0 0-2.235 
            0l-7.26 3.906 1.416-8.451a2.212 2.212 0 0 0-.626-1.934L2.31 13.271l8.326-1.24a2.306 2.306 0 0 0 
            1.743-1.268L16 3.251l3.62 7.513a2.31 2.31 0 0 0 1.742 1.268l8.328 
            1.24-6.102 6.091z" className="fill-iconLight dark:fill-iconDark"></path>
          </svg>
          <span className="ml-3">Favorites</span>
          </Link>
        </motion.li>
        {/* <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{delay: 0.1, stiffness: 300, damping: 24}}>
            <a href="#" className="flex items-center p-1.5 sm:p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <span className="flex-1 ml-3 whitespace-nowrap">Kanban</span>
              <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
            </a>
        </motion.li> */}
        <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{delay: 0.04, stiffness: 300, damping: 24}}>
          <Link to="recent" draggable="false" className="flex items-center p-1.5 sm:p-2 transition-all
          rounded-lg hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark group">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.25 2a9.81 9.81 0 0 0-7.48 3.46L3.41 4.25a1 1 0 0 0-1.07-.16 1 
              1 0 0 0-.59.91v4a1 1 0 0 0 1 1h4.5a1 1 0 0 0 .93-.64 1 1 0 0 0-.27-1.11L6.26 
              6.78a7.86 7.86 0 0 1 6-2.78 8 8 0 1 1-7.54 10.67 1 1 0 0 0-1.89.66A10 
              10 0 1 0 12.25 2Z" className="fill-iconLight dark:fill-iconDark"></path>
              <path d="M16 16a1 1 0 0 1-.6-.2l-4-3a1 1 0 0 1-.4-.8V8a1 1 0 0 1 2 0v3.5l3.6 
              2.7a1 1 0 0 1 .2 1.4 1 1 0 0 1-.8.4Z" className="fill-iconLight dark:fill-iconDark"></path>
            </svg>
            <span className="ml-3">Recent</span>
          </Link>
        </motion.li>
        <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{delay: 0.06, stiffness: 300, damping: 24}}>
          <Link to="bin" draggable="false" className="flex items-center p-1.5 sm:p-2 transition-all
          rounded-lg hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark group">
            <IconBin classes="w-5 h-5 sm:w-6 sm:h-6" fillClasses="fill-iconLight dark:fill-iconDark"></IconBin>
            <span className="ml-3">Recycle bin</span>
          </Link>
        </motion.li>
        {/* <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{delay: 0.08, stiffness: 300, damping: 24}}>
          <Link to="shared" draggable="false" className="flex items-center p-1.5 sm:p-2 transition-all
          rounded-lg hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark group">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 512 512">
              <path d="M162.04 246.91c48.27 0 84.34-51.05 84.34-96.69 0-22.73-9.02-43.66-25.39-58.96-15.67-14.64-36.6-22.7-58.95-22.7-22.34 
              0-43.28 8.06-58.95 22.7-16.37 15.29-25.39 36.23-25.39 58.96 0 45.64 36.07 96.69 84.34 96.69zm-37.1-132.27c9.72-9.08 22.9-14.08 
              37.1-14.08s27.38 5 37.1 14.08c9.82 9.18 15.23 21.81 15.23 35.58 0 14.93-6.09 31.53-16.28 44.41-5.99 7.57-18.65 20.28-36.05 
              20.28s-30.06-12.71-36.05-20.28c-10.2-12.88-16.28-29.49-16.28-44.41-.01-13.77 5.4-26.4 15.23-35.58zM349.96 68.56c-22.34 0-43.28 
              8.06-58.95 22.7-16.37 15.29-25.39 36.23-25.39 58.96 0 45.64 36.07 96.69 84.33 96.69s84.34-51.05 
              84.34-96.69c0-22.73-9.02-43.66-25.39-58.96-15.66-14.64-36.59-22.7-58.94-22.7zm36.06 126.07c-5.99 7.57-18.65 20.28-36.05 
              20.28s-30.06-12.71-36.05-20.28c-10.2-12.88-16.28-29.49-16.28-44.41 0-13.76 5.41-26.4 15.23-35.58 9.72-9.08 22.9-14.08 
              37.1-14.08s27.38 5 37.1 14.08c9.82 9.18 15.23 21.81 15.23 35.58 0 14.92-6.09 31.53-16.28 44.41zM430.65 
              255.79c-4.43-2.33-9.1-4.46-13.88-6.33a16.01 16.01 0 0 0-14.1 1.2c-16.33 9.86-34.55 15.07-52.7 15.07-18.16 
              0-36.38-5.21-52.71-15.07a15.999 15.999 0 0 0-14.11-1.2c-4.82 1.89-9.49 4.02-13.86 6.32-4.66 2.45-9.1 5.15-13.28 
              8.08-4.18-2.92-8.62-5.62-13.27-8.07-4.39-2.31-9.06-4.44-13.88-6.33a15.999 15.999 0 0 0-14.11 1.2c-16.33 9.86-34.55 15.07-52.71 
              15.07-18.15 0-36.37-5.21-52.7-15.07a16.01 16.01 0 0 0-14.1-1.2c-4.78 1.87-9.45 4-13.88 6.33-20.32 10.67-36.39 26.19-45.24 
              43.71-8.66 17.13-11.45 37.55-8.53 62.44 3.13 26.73 7.28 49.51 12.68 69.65 1.88 6.99 8.21 11.86 15.45 11.86H456.3c7.24 0 
              13.58-4.87 15.46-11.86 5.4-20.18 9.54-42.97 12.65-69.64 2.93-24.88.14-45.31-8.52-62.44-8.86-17.54-24.93-33.07-45.24-43.72zM59.37 
              358.21c-2.19-18.71-.51-32.78 5.31-44.28 5.87-11.62 17.08-22.21 31.56-29.81a93.39 93.39 0 0 1 3.88-1.93c19.41 10.19 40.65 15.55 
              61.92 15.55 21.28 0 42.52-5.35 61.93-15.55 1.32.62 2.61 1.27 3.87 1.93 6.54 3.43 12.43 7.48 17.51 12.03.77.68 1.51 1.38 2.23 
              2.07 5.05 4.9 9.02 10.17 11.82 15.71 1.09 2.16 2.04 4.4 2.84 6.75 3.47 10.18 4.25 22.32 2.47 37.52-.17 1.47-.35 2.91-.52 
              4.35-.04.35-.09.7-.13 1.05-.14 1.08-.27 2.15-.41 3.22-.05.42-.11.84-.16 1.26-.14 1.06-.28 2.11-.43 3.16-.05.34-.09.68-.14 
              1.02-.19 1.38-.39 2.75-.59 4.11l-.03.2c-.19 1.26-.37 2.51-.57 3.75l-.18 1.17c-.15.94-.29 1.86-.44 2.79-.07.42-.14.84-.2 
              1.25-.16.97-.32 1.93-.48 2.88-.05.32-.11.64-.16.96-.22 1.26-.44 2.52-.66 3.76-.03.19-.07.38-.1.57-.19 1.04-.38 2.07-.58 
              3.1-.07.39-.15.78-.22 1.17-.16.84-.32 1.67-.49 2.5l-.24 1.2c-.18.91-.37 1.81-.56 2.71-.06.28-.11.55-.17.83-.25 1.16-.49 
              2.31-.75 3.45l-.18.8c-.15.66-.3 1.31-.45 1.96H68.23c-3.6-15.68-6.52-33.22-8.86-53.21zm393.26-.01v.02c-2.33 19.96-5.24 
              37.5-8.84 53.22H288.62c.06-.26.11-.54.16-.8.28-1.35.56-2.72.83-4.1.11-.53.21-1.07.31-1.6.26-1.35.52-2.72.78-4.1.07-.39.15-.78.22-1.17.32-1.75.63-3.51.94-5.3.07-.43.14-.86.22-1.29.24-1.41.47-2.84.7-4.28.09-.55.18-1.09.26-1.64.25-1.61.5-3.23.75-4.86l.12-.78c.28-1.89.55-3.81.82-5.75l.21-1.54c.2-1.5.4-3.02.6-4.55l.21-1.66c.25-2 
              .5-4.02.74-6.08 2.92-24.89.13-45.32-8.53-62.44-.6-1.18-1.23-2.36-1.89-3.52-.22-.38-.45-.76-.68-1.14-.46-.77-.91-1.55-1.4-2.31-.29-.45-.59-.9-.88-1.34-.45-.68-.9-1.36-1.37-2.04-.33-.47-.67-.94-1.02-1.41-.29-.4-.57-.81-.87-1.21a98.607 
              98.607 0 0 1 8.18-4.34c19.41 10.19 40.65 15.55 61.93 15.55 21.27 0 42.52-5.35 61.92-15.55 1.32.62 2.61 1.27 3.88 1.93 
              14.47 7.59 25.68 18.18 31.56 29.81 5.83 11.51 7.51 25.57 5.31 44.27z" className="fill-iconLight dark:fill-iconDark"></path></svg>
            <span className="ml-3">Shared with me</span>
          </Link>
        </motion.li> */}
        <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{delay: 0.1, stiffness: 300, damping: 24}}>
          <Link to="files" draggable="false" className="flex items-center p-1.5 sm:p-2 transition-all
          rounded-lg hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark group">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" d="M0 0h256v256H0z"></path>
              <path d="M168 224H56a8 8 0 0 1-8-8V72a8 8 0 0 1 8-8h80l40 
              40v112a8 8 0 0 1-8 8Z" fill="none" className="stroke-iconLight dark:stroke-iconDark" 
              strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
              <path d="M80 64V40a8 8 0 0 1 8-8h80l40 40v112a8 8 0 0 1-8 8h-24M88 152h48M88 184h48" 
              fill="none" className="stroke-iconLight dark:stroke-iconDark" 
              strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
            </svg>
            <span className="ml-3">Files</span>
          </Link>
        </motion.li>
      </ul>

      {/* Storage usage */}
      <div className="mt-1 sm:mt-3 border-y pt-2 pb-4 border-borderLight dark:border-borderDark">
        <motion.span className="flex-1 ml-1"
          initial={{y: 20, opacity: 0}} 
          animate={{y: 0, opacity: 1}} 
          transition={{delay: 0.2, stiffness: 300, damping: 24}}>
          Used {currentUsage ? CutSize(currentUsage.size * 10) : 0} of {10}GB
        </motion.span>
        <div className="w-full bg-backgroundThirdLight mt-1 rounded-full h-2.5 dark:bg-backgroundThirdDark overflow-hidden">
          <motion.div initial={{width: 0}} animate={{width: currentUsage ? Math.round((currentUsage.size / (10*Math.pow(1024, 3))) * 10000) / 100 + "%" : "0%"}} transition={{delay: 0.24}}
          className=" bg-iconLight dark:bg-iconDark h-2.5 rounded-full"></motion.div>
        </div>
      </div>

      <ul className="pt-1 sm:pt-3 space-y-1">
        <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{delay: 0.12, stiffness: 300, damping: 24}}>
          <Link to="/user/profile" draggable="false" className="flex items-center p-1.5 sm:p-2
          rounded-lg hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark transition-all">
            <svg fill="none" strokeWidth="1.5" className="w-5 h-5 sm:w-6 sm:h-6" 
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Z" 
              className="stroke-iconLight dark:stroke-iconDark" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" 
              className="stroke-iconLight dark:stroke-iconDark" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
          </Link>
        </motion.li>
        <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{delay: 0.14, stiffness: 300, damping: 24}}>
          <Link to="upgrade" draggable="false" className="flex items-center p-1.5 sm:p-2 transition-all
          rounded-lg hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-iconLight dark:fill-iconDark" 
            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 20">
              <path d="M7.958 19.393a7.7 7.7 0 0 1-6.715-3.439c-2.868-4.832 
              0-9.376.944-10.654l.091-.122a3.286 3.286 0 0 0 .765-3.288A1 
              1 0 0 1 4.6.8c.133.1.313.212.525.347A10.451 10.451 0 0 1 
              10.6 9.3c.5-1.06.772-2.213.8-3.385a1 1 0 0 1 1.592-.758c1.636 
              1.205 4.638 6.081 2.019 10.441a8.177 8.177 0 0 1-7.053 3.795Z"/>
            </svg>
            <span className="flex-1 ml-3 whitespace-nowrap">Upgrade</span>
          </Link>
        </motion.li>
        <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{delay: 0.16, stiffness: 300, damping: 24}}>
          <Link to="/docs/help" draggable="false" className="flex items-center p-1.5 sm:p-2 transition-all
          rounded-lg hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark group">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24"><g>
              <path d="M12 3c-5 0-9 4-9 9 0 1.8.6 3.6 1.6 5.1l-1.4 2.4c-.2.3-.2.7 0 1s.4.5.8.5h8c5 
              0 9-4 9-9s-4-9-9-9zm0 16H5.8l.9-1.5c.2-.4.2-.8-.1-1.1C5.6 15.2 5 13.6 5 12c0-3.9 
              3.1-7 7-7s7 3.1 7 7-3.1 7-7 7z" className="fill-iconLight dark:fill-iconDark"></path>
              <path d="M12.1 7.3H12c-1 0-1.9.5-2.4 1.3-.4.5-.3 1.1.2 1.4.5.3 1.1.2 1.4-.3.2-.3.5-.4.8-.4h.1c.5 
              0 .9.4.9.9 0 .4-.3.8-.6.9l-.7.2c-.4.1-.7.5-.7.9v.8c0 
              .6.4 1 1 1 .5 0 1-.4 1-.9 1.2-.4 2-1.5 2-2.8 0-1.6-1.3-3-2.9-3z" 
              className="fill-iconLight dark:fill-iconDark"></path><circle cx="12" cy="16" r="1" 
              className="fill-iconLight dark:fill-iconDark"></circle></g>
            </svg>
            <span className="flex-1 ml-3 whitespace-nowrap">Help</span>
          </Link>
        </motion.li>
      </ul>

      {/* Banner */}
      <AnimatePresence>
        {isAdOpen === true && (
          <motion.div initial={{x: -300, opacity: 0}} animate={{x: 0, opacity: 1}} 
          transition={{delay: 0.12, stiffness: 300, damping: 24}} exit={{x: -1000, opacity: 0}}
          className="p-2 sm:p-4 mt-4 sm:mt-6 transition rounded-lg bg-backgroundSecondLight dark:bg-backgroundThirdDark 
          text-textLight dark:text-textDark text-sm shadow-lightLight">
            <div className="flex items-center mb-3 justify-between">
              <span className=" bg-backgroundAccentLight text-textDark font-semibold mr-2 px-2.5 py-0.5 rounded 
              dark:bg-backgroundAccentDark">Beta</span>
              <button onClick={() => {setIsAdOpen(false)}} type="button" id="cloase-ad" aria-label="Close ad"
              className="ml-auto sm:-mx-1.5 -my-1.5
              justify-center items-center w-6 h-6 text-textLight rounded-lg transition-all p-1 inline-flex
              hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark dark:bg-backgroundThirdDark dark:text-textDark">
                <IconClose classes="w-2.5 h-2.5" strokeClasses="stroke-textLight dark:stroke-textDark"></IconClose>
              </button>
            </div>
            <p className="mb-2 sm:mb-3">
              Prewiew new feature with <u>favorites</u> files! 
              Now you can get fast access to your files without special links and folders search.
            </p>
            <Link to="favorites" draggable="false" onClick={() => {setIsAdOpen(false)}} 
            className="text-buttonLight underline font-medium transition-all
            hover:text-buttonHoverLight dark:text-buttonDark dark:hover:text-buttonHoverDark">
              Try new feature now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}