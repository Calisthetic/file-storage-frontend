import {
  Routes,
  Route,
  Link,
} from "react-router-dom";
import DiskRecent from './disk-recent';
import DiskShared from "./disk-shared";
import DiskUpgrade from "./disk-upgrade";
import DiskFolder from "./disk-folder";
import { useRef, useState } from "react";
import { motion } from "framer-motion"

export default function Disk() {
  const adRef : any = useRef()
  const sideBarRef : any = useRef()
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  // Logos
  let recentLogo: string | undefined = undefined;
  let groupLogo: string | undefined = undefined;
  let storageLogo: string | undefined = undefined;
  let fileLogo: string | undefined = undefined;
  let photoLibraryLogo: string | undefined = undefined;

  try {
    recentLogo = require("./../../icons/recent-24-icon.svg").default;
    groupLogo = require("./../../icons/group-24-icon.svg").default;
    storageLogo = require("./../../icons/storage-24-icon.svg").default;
    fileLogo = require("./../../icons/file-24-icon.svg").default;
    photoLibraryLogo = require("./../../icons/photo-library-24-icon.svg").default;
  } catch (error) {
    console.log(error)
  }

  // Funcs
  function CloseAd() {
    adRef.current.style.display = "none"
  }
  function CloseOpenSideBar() {
    setIsSideBarOpen(!isSideBarOpen)
    if (isSideBarOpen) {
      
    } else {

    }
  }

  return (
    <div>
      <nav className="fixed top-0 z-40 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
              <a href="https://flowbite.com" className="flex ml-2 md:mr-24">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="FlowBite Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Flowbite</span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div>
                  <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                    <span className="sr-only">Open user menu</span>
                    <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
                  </button>
                </div>
                <div className=" z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                  <div className="px-4 py-3" role="none">
                    <p className="text-sm text-gray-900 dark:text-white" role="none">
                      Neil Sims
                    </p>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                      neil.sims@flowbite.com
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside ref={sideBarRef} id="logo-sidebar" 
      // style={{transform: "translate(-100%, 0)"}} 
      className="fixed top-0 left-0 z-30 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 -translate-x-full dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <motion.ul animate={{}} transition={{type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 8,
              staggerChildren: 5}} className="space-y-2 font-medium">
            <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.2, stiffness: 300, damping: 24}}>
              <Link to="folder/main" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="w-6" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 128h128V96H0Zm23-22a6 6 0 1 1-6 6 6 6 0 0 1 6-6ZM0 80h128V48H0Zm23-22a6 6 0 1 1-6 6 6 6 0 0 1 6-6ZM0 32h128V0H0Zm23-22a6 6 0 1 1-6 6 6 6 0 0 1 6-6Z" 
                  className="dark:fill-white fill-black"></path></svg>
                <span className="ml-3">My storage</span>
              </Link>
            </motion.li>
            <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.25, stiffness: 300, damping: 24}}>
              <Link to="folder/main" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <svg className="w-6" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M31.881 12.557a2.303 2.303 0 0 0-1.844-1.511l-8.326-1.238-3.619-7.514A2.318 
                2.318 0 0 0 16 1c-.896 0-1.711.505-2.092 1.294l-3.619 7.514-8.327 1.238A2.3 2.3 0 0 0 .12 12.557a2.207 2.207 0 0 0 .537 2.285l6.102 6.092-1.415 8.451a2.224 2.224 
                0 0 0 .948 2.203 2.351 2.351 0 0 0 2.449.131L16 27.811l7.26 3.908a2.367 2.367 0 0 0 2.449-.131 2.225 2.225 0 0 0 
                .947-2.203l-1.416-8.451 6.104-6.092c.603-.603.81-1.485.537-2.285zm-8.293 6.806a2.216 2.216 0 0 0-.627 1.934l1.416 8.451-7.26-3.906a2.361 2.361 0 0 0-2.235 
                0l-7.26 3.906 1.416-8.451a2.212 2.212 0 0 0-.626-1.934L2.31 13.271l8.326-1.24a2.306 2.306 0 0 0 1.743-1.268L16 3.251l3.62 7.513a2.31 2.31 0 0 0 1.742 1.268l8.328 
                1.24-6.102 6.091z" className="dark:fill-white fill-black"></path>
              </svg>
              <span className="ml-3">Favorites</span>
              </Link>
            </motion.li>
            {/* <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <span className="flex-1 ml-3 whitespace-nowrap">Kanban</span>
                  <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
                </a>
            </li>
            <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                </a>
            </li> */}
            <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.3, stiffness: 300, damping: 24}}>
              <Link to="recent" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="w-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.25 2a9.81 9.81 0 0 0-7.48 3.46L3.41 4.25a1 1 0 0 0-1.07-.16 1 1 0 0 0-.59.91v4a1 1 0 0 0 1 1h4.5a1 
                  1 0 0 0 .93-.64 1 1 0 0 0-.27-1.11L6.26 6.78a7.86 7.86 0 0 1 6-2.78 8 8 0 1 1-7.54 10.67 1 1 0 0 0-1.89.66A10 10 0 1 0 12.25 2Z" className="dark:fill-white fill-black"></path>
                  <path d="M16 16a1 1 0 0 1-.6-.2l-4-3a1 1 0 0 1-.4-.8V8a1 1 0 0 1 2 0v3.5l3.6 2.7a1 1 0 0 1 .2 1.4 1 1 0 0 1-.8.4Z" className="dark:fill-white fill-black"></path>
                </svg>
                <span className="ml-3">Recent</span>
              </Link>
            </motion.li>
            <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.35, stiffness: 300, damping: 24}}>
              <Link to="shared" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="w-6" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 512 512">
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
                  14.47 7.59 25.68 18.18 31.56 29.81 5.83 11.51 7.51 25.57 5.31 44.27z" className="dark:fill-white fill-black"></path></svg>
                <span className="ml-3">Shared with me</span>
              </Link>
            </motion.li>
            {/* className="dark:fill-white fill-black" */}
            <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.4, stiffness: 300, damping: 24}}>
              <Link to="files" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="w-6" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h256v256H0z"></path>
                  <path d="M168 224H56a8 8 0 0 1-8-8V72a8 8 0 0 1 8-8h80l40 40v112a8 8 0 0 1-8 8Z" fill="none" className="dark:stroke-white stroke-black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
                  <path d="M80 64V40a8 8 0 0 1 8-8h80l40 40v112a8 8 0 0 1-8 8h-24M88 152h48M88 184h48" 
                  fill="none" className="dark:stroke-white stroke-black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
                </svg>
                <span className="ml-3">Files</span>
              </Link>
            </motion.li>
            <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.45, stiffness: 300, damping: 24}}>
              <Link to="photos" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="w-6 dark:fill-white fill-black" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
                  <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 
                  2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z"></path>
                </svg>
                <span className="ml-3">Photos</span>
              </Link>
            </motion.li>
            <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.5, stiffness: 300, damping: 24}}>
              <Link to="trash" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0,0,256,256">
                  <g className="dark:fill-white fill-black" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" 
                    fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none">
                  <g transform="scale(10.66667,10.66667)">
                    <path d="M10,2l-1,1h-4c-0.6,0 -1,0.4 -1,1c0,0.6 0.4,1 1,1h2h10h2c0.6,0 1,-0.4 1,-1c0,-0.6 -0.4,-1 -1,-1h-4l-1,-1zM5,7v13c0,1.1 0.9,2 2,2h10c1.1,0 2,-0.9 2,-2v-13zM9,9c0.6,0 1,0.4 1,1v9c0,0.6 -0.4,1 
                    -1,1c-0.6,0 -1,-0.4 -1,-1v-9c0,-0.6 0.4,-1 1,-1zM15,9c0.6,0 1,0.4 1,1v9c0,0.6 -0.4,1 -1,1c-0.6,0 -1,-0.4 -1,-1v-9c0,-0.6 0.4,-1 1,-1z"></path>
                  </g></g>
                </svg>
                <span className="ml-3">Trash</span>
              </Link>
            </motion.li>
          </motion.ul>
          {/*  */}
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.55, stiffness: 300, damping: 24}}>
              <Link to="../" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="w-6" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M6 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h8a1 1 0 1 1 0 2H6a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h8a1 1 0 1 1 0 
                  2H6Zm9.293 3.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L17.586 13H9a1 1 0 1 1 0-2h8.586l-2.293-2.293a1 1 0 0 1 0-1.414Z" 
                  className="dark:fill-white fill-black" fillRule="evenodd"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
              </Link>
            </motion.li>
            <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.6, stiffness: 300, damping: 24}}>
              <a href="https://github.com/Calisthetic/file-storage-frontend" className="flex items-center p-2 text-gray-900 transition 
              duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                <svg className="w-6" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g className="dark:fill-white fill-black">
                  <path d="M24 .125C10.814.125.125 10.814.125 24S10.814 47.875 24 47.875 47.875 37.186 47.875 24 37.186.125 24 .125zm0 
                  43.771C13.012 43.896 4.104 34.988 4.104 24S13.012 4.104 24 4.104 43.896 13.012 43.896 24 34.988 43.896 24 43.896z"></path>
                  <path d="M25.22 16.234c.572 0 1.097-.202 1.57-.606.469-.404.757-.894.86-1.466.098-.576-.024-1.062-.38-1.466-.354-.408-.818-.61-1.392-.61-.576 
                  0-1.1.202-1.569.61-.474.403-.762.89-.86 1.466-.071.573.066 1.062.403 1.466.338.404.796.606 1.368.606zM29.622 
                  30.4c-.053.075-.104.14-.156.216-.312.396-1.475 1.795-2.984 2.632a.06.06 0 0 0-.024.014c-.132.07-.267.123-.401.185a3.537 3.537 0 0 
                  1-.891.188c-.339-.044-.523-.281-.523-.73 0-.371.109-1.104.329-2.205l.253-1.111 1.035-4.968c.168-.846.258-1.316.278-1.409l.226-1.162c.133-.719.201-1.194.201-1.426 
                  0-.444-.11-.781-.287-1.055a.613.613 0 0 0-.066-.122c-.026-.032-.054-.06-.082-.089-.031-.034-.046-.063-.088-.098-.441-.36-.853-.464-1.137-.487l.005-.008s-1.867-.141-4.633 
                  1.682c-.04.026-.064.045-.101.07-.749.474-1.348.949-1.763 1.332a5.178 5.178 0 0 0-.745.762l-.008.011.001-.001c-.236.311-.36.593-.36.843 0 .197.16.394.476.591 
                  0 0 1.188-1.534 3.185-2.532.15-.065.534-.224.872-.312.157-.036.455-.064.645.093.136.142.226.339.226.646 0 .279-.042.618-.127 1.023l-.202.957-.251 1.196-.986 
                  4.728c-.504 2.442-.757 3.903-.757 4.379 0 1.123.615 1.685 1.843 1.685.557 0 1.129-.101 1.716-.281.004 0 .006.002.01.004l.116-.043c.097-.031.195-.068.292-.105 
                  2.771-1.031 4.595-3.108 5.146-3.804a3.546 3.546 0 0 0 .181-.239h-.002c.14-.206.217-.377.217-.505-.002-.179-.233-.358-.679-.545z"></path></g>
                </svg>
              <span className="ml-3">Documentation</span>
              </a>
            </motion.li>
            <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.65, stiffness: 300, damping: 24}}>
                <a href="#" className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                <svg className="w-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24"><g><path d="M12 3c-5 0-9 4-9 9 0 1.8.6 3.6 1.6 5.1l-1.4 2.4c-.2.3-.2.7 0 1s.4.5.8.5h8c5 0 9-4 9-9s-4-9-9-9zm0 
                  16H5.8l.9-1.5c.2-.4.2-.8-.1-1.1C5.6 15.2 5 13.6 5 12c0-3.9 3.1-7 7-7s7 3.1 7 7-3.1 7-7 7z" className="dark:fill-white fill-black"></path>
                  <path d="M12.1 7.3H12c-1 0-1.9.5-2.4 1.3-.4.5-.3 1.1.2 1.4.5.3 1.1.2 1.4-.3.2-.3.5-.4.8-.4h.1c.5 0 .9.4.9.9 0 .4-.3.8-.6.9l-.7.2c-.4.1-.7.5-.7.9v.8c0 
                  .6.4 1 1 1 .5 0 1-.4 1-.9 1.2-.4 2-1.5 2-2.8 0-1.6-1.3-3-2.9-3z" className="dark:fill-white fill-black"></path><circle cx="12" cy="16" r="1" className="dark:fill-white fill-black"></circle></g>
                </svg>
                <span className="ml-3">Help</span>
                </a>
            </motion.li>
          </ul>
          {/* Dropdown banner */}
          <motion.div initial={{x: -300, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{delay: 0.65, stiffness: 300, damping: 24}}
            ref={adRef} id="dropdown-cta" className="p-4 mt-6 transition rounded-lg bg-blue-50 dark:bg-blue-900" role="alert">
            <div className="flex items-center mb-3">
              <span className="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">Beta</span>
              <button onClick={CloseAd} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center w-6 h-6 text-blue-900 rounded-lg focus:ring-2 
                focus:ring-blue-400 p-1 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800" data-dismiss-target="#dropdown-cta" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
              </button>
            </div>
            <p className="mb-3 text-sm text-blue-800 dark:text-blue-400">
                Preview the new Flowbite dashboard navigation! You can turn the new navigation off for a limited time in your profile.
            </p>
            {/* <a className="text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300" href="#">Turn new navigation off</a> */}
          </motion.div>
        </div>
      </aside>

      <div className="p-4 mt-14 sm:ml-64">
        <Routes>
          <Route path='/' element={<div>usual disk</div>}></Route>
          <Route path='*' element={<DiskRecent></DiskRecent>}></Route>
          <Route path='recent' element={<DiskRecent></DiskRecent>}></Route>
          <Route path='shared' element={<DiskShared></DiskShared>}></Route>
          <Route path='upgrade' element={<DiskUpgrade></DiskUpgrade>}></Route>
          <Route path='folder/:id' element={<DiskFolder></DiskFolder>}></Route>
          <Route path='folder' element={<DiskFolder></DiskFolder>}></Route>
        </Routes>
      </div>
    </div>
  )
}