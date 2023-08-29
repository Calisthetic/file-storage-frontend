import { Routes, Route, Link, } from "react-router-dom";
import DiskRecent from './recent/disk-recent';
import DiskShared from "./shared/disk-shared";
import DiskUpgrade from "./upgrade/disk-upgrade";
import DiskFolder from "./folder/disk-folder";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import DiskFavorites from "./favorites/disk-favorites";
import DiskRecycleBin from "./recycle-bin/disk-recycle-bin";
import DiskFiles from "./files/disk-files";
import DiskSideBar from "./disk-sidebar";
import Redirect from "../../components/redirect";
// @ts-ignore
import Hammer from 'hammerjs';
import { cn } from "../../lib/utils";
import UserProfileDropdown from "../../components/user-profile-dropdown";

export default function Disk() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(window.innerWidth > 640 ? true : false)

  /* eslint-disable global-require */

  // Logos
  let mainLogo: string | undefined = undefined;

  try {
    mainLogo = require("./../../icons/logo.png") as string;
  } catch (error) {
    console.log(error)
  }

  /* eslint-enable global-require */
  

  // Sidebar
  function ChangeSideBar() {
    if (window.innerWidth > 640) {
      setIsSideBarOpen(true)
    } else {
      setIsSideBarOpen(false)
    }
  } 
  useEffect(() => {
    window.addEventListener('resize', ChangeSideBar);

    return () => {
      window.removeEventListener("resize", ChangeSideBar)
    }
  }, [])


  // Swipe sidebar
  const sidebar = document.getElementById("main-sidebar")
  useEffect(() => {
    if (sidebar) {
      var manager = new Hammer.Manager(sidebar);
      var Swipe = new Hammer.Swipe();
      manager.add(Swipe);
      manager.on('swipeleft', function(e:any) {
        if (window.innerWidth < 640) {
          setIsSideBarOpen(false)
        }
      });

      return () => {
        manager.off('swipeleft', function(e:any) {
          if (window.innerWidth < 640) {
            setIsSideBarOpen(false)
          }
        })
      }
    }
  }, [isSideBarOpen, sidebar])
  

  return (
    <div className="bg-backgroundLight h-full dark:bg-backgroundDark">
      <nav className="fixed top-0 z-40 w-full bg-backgroundLight dark:bg-backgroundDark">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <label className="min-h-8 h-8 w-8 m-0 p-0 border-none sm:hidden
              bg-backgroundLight dark:bg-backgroundDark hover:bg-backgroundLight hover:dark:bg-backgroundDark">
                <AnimatePresence>
                  {isSideBarOpen ? (
                    <motion.div initial={{rotate: 360, opacity: 0}} animate={{rotate: 0, opacity: 1}}
                    transition={{damping: 24, stiffness: 200, duration: 0.2}} exit={{rotate: -360, opacity: 0}}>
                      <svg onClick={() => {setIsSideBarOpen(!isSideBarOpen)}}
                      className="h-8 w-8 fill-iconLight dark:fill-iconDark pointer-events-auto cursor-pointer" 
                      xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                        <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 
                        112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/>
                      </svg>
                    </motion.div>
                  ) : (
                    <motion.svg initial={{opacity: 0}} animate={{opacity: 1}}
                    transition={{damping: 24, stiffness: 200, duration: 0.2}} exit={{rotate: -90, opacity: 0}}
                    onClick={() => {setIsSideBarOpen(!isSideBarOpen)}}
                    className="h-8 w-8 fill-iconLight dark:fill-iconDark pointer-events-auto cursor-pointer" 
                    xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                      <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/>
                    </motion.svg>
                  )}
                </AnimatePresence>
              </label>
              <Link to="../disk" className="flex ml-2 md:mr-24">
                <motion.img src={mainLogo} className="h-8 w-8 mr-3" alt="Logo"
                initial={{opacity: 0}} 
                animate={{opacity:1 }} 
                transition={{delay: 0.1}}/>
                <motion.span 
                initial={{opacity: 0, marginLeft: 20}} 
                animate={{opacity:1, marginLeft: 0}} 
                transition={{delay: 0.24}} 
                className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-textDark text-textLight">Storage</motion.span>
              </Link>
            </div>
            {/* User profile */}
            <UserProfileDropdown></UserProfileDropdown>
          </div>
        </div>
      </nav>

      <aside id="main-sidebar" 
      className={cn("fixed top-0 left-0 z-30 w-56 sm:w-64 h-screen pt-16 transition-transform border-borderLight dark:border-borderDark bg-backgroundLight dark:bg-backgroundDark", {
        "-translate-x-64": !isSideBarOpen
      })} aria-label="Sidebar">
        <DiskSideBar></DiskSideBar>
      </aside>

      <div className="pt-14 transition-transform sm:ml-64">
        <div className="bg-backgroundSecondLight overflow-x-hidden dark:bg-backgroundSecondDark min-h-fullWithHeader sm:rounded-tl-2xl ">
          <Routes>
            <Route path='*' element={<Redirect location="/disk/folder/main"></Redirect>}></Route>
            <Route path='recent' element={<DiskRecent></DiskRecent>}></Route>
            <Route path='shared' element={<DiskShared></DiskShared>}></Route>
            <Route path='upgrade' element={<DiskUpgrade></DiskUpgrade>}></Route>
            <Route path='favorites' element={<DiskFavorites></DiskFavorites>}></Route>
            <Route path='files' element={<DiskFiles></DiskFiles>}></Route>
            <Route path='trash' element={<DiskRecycleBin></DiskRecycleBin>}></Route>
            <Route path='folder/:id' element={<DiskFolder></DiskFolder>}></Route>
            <Route path='folder' element={<Redirect location="/disk/folder/main"></Redirect>}></Route>
            <Route path='folder/' element={<Redirect location="/disk/folder/main"></Redirect>}></Route>
          </Routes>
        </div>
      </div>
    </div>
  )
}