import {
  Routes,
  Route,
  Link,
} from "react-router-dom";
import DiskRecent from './recent/disk-recent';
import DiskShared from "./shared/disk-shared";
import DiskUpgrade from "./upgrade/disk-upgrade";
import DiskFolder from "./folder/disk-folder";
import { useRef, useState } from "react";
import { motion } from "framer-motion"
import DiskFavorites from "./favorites/disk-favorites";
import DiskTrash from "./trash/disk-trash";
import DiskFiles from "./files/disk-files";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EditUIModal from "../../components/edit-ui-modal";
import DiskSideBar from "./disk-sidebar";

export default function Disk() {
  const userDropMenuRef:any = useRef()
  const [isUserDropMenuOpen, setIsUserDropMenuOpen] = useState(true)
  const sideBarRef:any = useRef()
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  
  const [open, setOpen] = useState(false);
  const modalCustomizeOpen = () => setOpen(true);
  const modalCustomizeClose = () => setOpen(false);

  // Logos
  let mainLogo: string | undefined = undefined;

  try {
    mainLogo = require("./../../icons/logo.png") as string;
  } catch (error) {
    console.log(error)
  }

  // Funcs
  function CloseOpenSideBar() {
    setIsSideBarOpen(!isSideBarOpen)
    if (sideBarRef.current) {
      sideBarRef.current.style.transform = isSideBarOpen ? "translate(-100%, 0%)" : "none"
    }
  }
  function CloseOpenUserDropMenu() {
    setIsUserDropMenuOpen(!isUserDropMenuOpen)
    if (userDropMenuRef.current) {
      userDropMenuRef.current.style.transform = isUserDropMenuOpen 
        ? "scale(1, 1) translate(-168px, 160px)" 
        : "scale(0, 0) translate(-168px, 160px)"
      userDropMenuRef.current.style.margin = isUserDropMenuOpen ? "0px 0px 0px 0px" : "0px 0px 0px -95px"
    }
  }

  function ChangeSideBar() {
    if (window.innerWidth > 640 && isSideBarOpen === false) {
      CloseOpenSideBar();
    } else if (window.innerWidth <= 640 && isSideBarOpen === true) {
      CloseOpenSideBar()
    }
  }
  window.addEventListener('resize', ChangeSideBar);

  const modalWindowStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "auto",
    bgcolor: 'none',
    boxShadow: 24,
    overflow: "hidden",
    borderRadius: "16px"
  };

  return (
    <div className="bg-backgroundLight h-full dark:bg-backgroundDark">
      <nav className="fixed top-0 z-40 w-full bg-backgroundLight dark:bg-backgroundDark">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button onClick={CloseOpenSideBar} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" 
                aria-controls="logo-sidebar" type="button" 
                className="inline-flex items-center p-1 text-sm text-textLight rounded-lg sm:hidden hover:bg-backgroundHoverLight focus:outline-none 
                focus:ring-2 focus:ring-gray-200 dark:text-textDark dark:hover:bg-backgroundHoverDark dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6 fill-textLight dark:fill-textDark" aria-hidden="true" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 
                  10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
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
                <div>
                  <button onClick={CloseOpenUserDropMenu} className="flex text-sm bg-gray-800 rounded-full focus:ring-4 
                  focus:ring-gray-300 dark:focus:ring-gray-600" 
                  type="button" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                    <span className="sr-only">Open user menu</span>
                    <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
                  </button>
                </div>
                <div ref={userDropMenuRef} className="overflow-hidden transition-userDropDownMenu absolute scale-0 
                z-50 my-4 text-base list-none bg-backgroundThirdLight divide-y divide-borderLight rounded 
                dark:bg-backgroundThirdDark dark:divide-borderDark text-textLight dark:text-textDark
                shadow shadow-shadowDark dark:shadow-shadowLight" id="dropdown-user">
                  <div className="px-4 py-3" role="none">
                    <p className="" role="none">
                      Neil Sims
                    </p>
                    <p className="font-medium" role="none">
                      neil.sims@flowbite.com
                    </p>
                  </div>
                  <ul className="py-1" role="none">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside ref={sideBarRef} id="logo-sidebar" 
      className="fixed top-0 left-0 z-30 w-64 h-screen pt-20 transition-transform border-borderLight dark:border-borderDark sm:translate-x-0 
      -translate-x-full bg-backgroundLight dark:bg-backgroundDark" aria-label="Sidebar">
        <DiskSideBar></DiskSideBar>
      </aside>
      
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

      <div className="pt-14  sm:ml-64">
        <div className="bg-backgroundSecondLight overflow-hidden dark:bg-backgroundSecondDark min-h-fullWithHeader sm:rounded-tl-2xl ">
          <Routes>
            <Route path='/' element={<div>usual disk</div>}></Route>
            <Route path='*' element={<DiskRecent></DiskRecent>}></Route>
            <Route path='recent' element={<DiskRecent></DiskRecent>}></Route>
            <Route path='shared' element={<DiskShared></DiskShared>}></Route>
            <Route path='upgrade' element={<DiskUpgrade></DiskUpgrade>}></Route>
            <Route path='favorites' element={<DiskFavorites></DiskFavorites>}></Route>
            <Route path='files' element={<DiskFiles></DiskFiles>}></Route>
            <Route path='trash' element={<DiskTrash></DiskTrash>}></Route>
            <Route path='folder/:id' element={<DiskFolder></DiskFolder>}></Route>
            <Route path='folder' element={<DiskFolder></DiskFolder>}></Route>
          </Routes>
        </div>
      </div>
    </div>
  )
}