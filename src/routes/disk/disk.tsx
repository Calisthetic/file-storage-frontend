import { Routes, Route, Link, } from "react-router-dom";
import DiskRecent from './recent/disk-recent';
import DiskShared from "./shared/disk-shared";
import DiskUpgrade from "./upgrade/disk-upgrade";
import DiskFolder from "./folder/disk-folder";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import DiskFavorites from "./favorites/disk-favorites";
import DiskRecycleBin from "./recycle-bin/disk-recycle-bin";
import DiskFiles from "./files/disk-files";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EditUIModal from "../../components/edit-ui-modal";
import DiskSideBar from "./disk-sidebar";
import { Dropdown, Ripple, initTE, } from "tw-elements";
import Redirect from "../../components/redirect";
// @ts-ignore
import Hammer from 'hammerjs';

initTE({ Dropdown, Ripple });

export default function Disk() {
  const [isUserDropMenuOpen, setIsUserDropMenuOpen] = useState(false)
  const sideBarRef:any = useRef()
  const [isSideBarOpen, setIsSideBarOpen] = useState(window.innerWidth > 640 ? true : false)

  
  const [open, setOpen] = useState(false);
  const modalCustomizeOpen = () => setOpen(true);
  const modalCustomizeClose = () => setOpen(false);

  /* eslint-disable global-require */

  // Logos
  let mainLogo: string | undefined = undefined;

  try {
    mainLogo = require("./../../icons/logo.png") as string;
  } catch (error) {
    console.log(error)
  }

  /* eslint-enable global-require */
  

  // Funcs
  function CloseDropDowns(e:any) {
    if (e.target.dataset.drop !== "userMenu" && e.target.dataset.drop !== "child") {
      setIsUserDropMenuOpen(false)
    }
  }

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

  const modalWindowStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "auto",
    bgcolor: 'none',
    boxShadow: 24,
    //overflow: "hidden",
    borderRadius: "16px"
  };

  // Swipe sidebar
  const rootElem = document.getElementById("root")
  useEffect(() => {
    if (rootElem) {
      var manager = new Hammer.Manager(rootElem);
      var Swipe = new Hammer.Swipe();
      manager.add(Swipe);
      // Left && right events
      manager.on('swipeleft swiperight', function(e:any) {
        if (window.innerWidth < 640) {
          setIsSideBarOpen(e.type === "swiperight" ? true : false)
        }
      });
    }

    return () => {
      manager.off('swipeleft swiperight', function(e:any) {
        console.log(e)
        if (window.innerWidth < 640) {
          setIsSideBarOpen(e.type === "swiperight" ? true : false)
        }
      })
    }
  }, [rootElem, isSideBarOpen])
  

  return (
    <div className="bg-backgroundLight h-full dark:bg-backgroundDark"
    onClick={CloseDropDowns}>
      <nav className="fixed top-0 z-40 w-full bg-backgroundLight dark:bg-backgroundDark">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <label className="min-h-8 h-8 w-8 m-0 p-0 border-none sm:hidden
              bg-backgroundLight dark:bg-backgroundDark hover:bg-backgroundLight hover:dark:bg-backgroundDark">
                <AnimatePresence>
                  {isSideBarOpen ? (
                    <motion.div initial={{rotate: -180, opacity: 0}} animate={{rotate: 0, opacity: 1}}
                    transition={{damping: 24, stiffness: 200, duration: 0.2}} exit={{rotate: 90, opacity: 0}}>
                      <svg onClick={() => {setIsSideBarOpen(!isSideBarOpen)}}
                      className="h-8 w-8 fill-iconLight dark:fill-iconDark" 
                      xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                        <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 
                        112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/>
                      </svg>
                    </motion.div>
                  ) : (
                    <motion.svg initial={{rotate: 180, opacity: 0}} animate={{rotate: 0, opacity: 1}}
                    transition={{damping: 24, stiffness: 200, duration: 0.2}} exit={{rotate: -90, opacity: 0}}
                    onClick={() => {setIsSideBarOpen(!isSideBarOpen)}}
                    className="h-8 w-8 fill-iconLight dark:fill-iconDark" 
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
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <button onClick={() => {setIsUserDropMenuOpen(!isUserDropMenuOpen)}} 
                data-drop="userMenu" className="flex text-sm bg-gray-800 rounded-full">
                  <img className="w-8 h-8 rounded-full pointer-events-none" alt="user" draggable="false"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" />
                </button>
                <AnimatePresence>
                  {isUserDropMenuOpen && (
                    <motion.div initial={{opacity: 0, y: 44, scaleY: 0.2, x: "calc(-100% + 32px)"}} 
                    animate={{opacity: 1, y: "calc(50% + 18px)", scaleY: 1}}
                    exit={{opacity: 0, y: 44, scaleY: 0.2}}
                    transition={{stiffness: 200, damping: 24, duration: 0.16}}
                    className="absolute z-50 my-4 text-base list-none bg-backgroundThirdLight 
                    dark:bg-backgroundThirdDark dark:divide-borderDark text-textLight dark:text-textDark
                    shadow-sm shadow-shadowDark dark:shadow-shadowLight rounded mb-2">
                      <div className="px-4 py-3">
                        <p className="">
                          Neil Sims
                        </p>
                        <p className="font-medium">
                          neil.sims@flowbite.com
                        </p>
                      </div>
                      <ul className="py-1">
                        <li>
                          <a href="#" className="block px-4 py-2 hover:bg-backgroundHoverLight 
                          dark:hover:bg-backgroundHoverDark" role="menuitem">Statistic</a>
                        </li>
                        <li>
                          <a href="#" className="block px-4 py-2 hover:bg-backgroundHoverLight 
                          dark:hover:bg-backgroundHoverDark" role="menuitem">Statistic</a>
                        </li>
                        <li>
                          <a className="block px-4 py-2 hover:bg-backgroundHoverLight 
                          dark:hover:bg-backgroundHoverDark cursor-pointer" role="menuitem" onClick={modalCustomizeOpen}>Customize</a>
                        </li>
                        <li>
                          <a href="#" className="block px-4 py-2 hover:bg-backgroundHoverLight 
                          dark:hover:bg-backgroundHoverDark" role="menuitem">Settings</a>
                        </li>
                        <li>
                          <a href="documentation" className="block px-4 py-2 hover:bg-backgroundHoverLight 
                          dark:hover:bg-backgroundHoverDark" role="menuitem">Documentation</a>
                        </li>
                        <li>
                          <a href="#" className="block px-4 py-2 hover:bg-backgroundHoverLight 
                          dark:hover:bg-backgroundHoverDark" role="menuitem">Sign out</a>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isSideBarOpen && (
          <motion.aside initial={{x: -256}} animate={{x: 0}}
          transition={{duration: 0.1, damping:24, stiffness: 200}} exit={{x: -256}}
          ref={sideBarRef} id="logo-sidebar" 
          className="fixed top-0 left-0 z-30 w-64 h-screen pt-20 transition-transform border-borderLight dark:border-borderDark 
          bg-backgroundLight dark:bg-backgroundDark" aria-label="Sidebar">
            <DiskSideBar></DiskSideBar>
          </motion.aside>
        )}
      </AnimatePresence>
      
      <Modal
        open={open}
        onClose={modalCustomizeClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalWindowStyle}>
          <EditUIModal></EditUIModal>
        </Box>
      </Modal>

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