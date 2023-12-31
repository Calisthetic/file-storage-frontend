import { FunctionComponent, useState, useEffect, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion"
import Redirect from "../../components/redirect";
import { cn } from "../../lib/color-utils";
import UserSidebar from "./user-sidebar";
import LoadingComponent from "../../components/loading-component";

const NavBar = lazy(() => import("../../components/nav-bar"));
const DiskUpgrade = lazy(() => import("../disk/upgrade/disk-upgrade"));
const UserAccount = lazy(() => import("./account/user-account"));
const UserAppearance = lazy(() => import("./appearance/user-appearance"));
const UserProfile = lazy(() => import("./profile/user-profile"));
const UserStatistic = lazy(() => import("./statistic/user-statistic"));
const UserTariff = lazy(() => import("./tariff/user-tariff"));

interface UserMainProps {
  
}
 
const UserMain: FunctionComponent<UserMainProps> = () => {
  // Sidebar
  const [isSideBarOpen, setIsSideBarOpen] = useState(window.innerWidth > 640)
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



  return ( 
    <div className="bg-backgroundLight h-full dark:bg-backgroundDark">
      <Suspense>
      <NavBar>
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
      </NavBar>
      </Suspense>
      <aside id="main-sidebar" 
      className={cn("fixed top-0 left-0 z-30 w-56 sm:w-64 h-screen pt-16 transition-transform border-borderLight dark:border-borderDark bg-backgroundLight dark:bg-backgroundDark", {
        "-translate-x-64": !isSideBarOpen
      })} aria-label="Sidebar">
        <UserSidebar></UserSidebar>
      </aside>

      <div className="pt-14 sm:ml-64 transition-transform">
        <div className="bg-backgroundSecondLight overflow-x-hidden dark:bg-backgroundSecondDark min-h-fullWithHeader sm:rounded-tl-2xl">
          <Suspense fallback={<LoadingComponent></LoadingComponent>}>
            <Routes>
              <Route path="account" element={<UserAccount></UserAccount>}></Route>
              <Route path="upgrade" element={<DiskUpgrade></DiskUpgrade>}></Route>
              <Route path="tariff" element={<UserTariff></UserTariff>}></Route>
              <Route path="appearance" element={<UserAppearance></UserAppearance>}></Route>
              <Route path="profile" element={<UserProfile></UserProfile>}></Route>
              <Route path="statistic" element={<UserStatistic></UserStatistic>}></Route>
              <Route path="*" element={<Redirect location="/user/profile"></Redirect>}></Route>
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
   );
}
 
export default UserMain;