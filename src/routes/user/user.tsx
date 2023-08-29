import { FunctionComponent } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { motion } from "framer-motion"
import UserProfileDropdown from "../../components/user-profile-dropdown";
import Redirect from "../../components/redirect";
import UserProfile from "./profile/user-profile";
import UserStatistic from "./statistic/user-statistic";

interface UserMainProps {
  
}
 
const UserMain: FunctionComponent<UserMainProps> = () => {


  /* eslint-disable global-require */

  // Logos
  let mainLogo: string | undefined = undefined;

  try {
    mainLogo = require("./../../icons/logo.png") as string;
  } catch (error) {
    console.log(error)
  }

  /* eslint-enable global-require */



  return ( 
    <div className="bg-backgroundLight h-full dark:bg-backgroundDark">
      <nav className="fixed top-0 z-40 w-full bg-backgroundLight dark:bg-backgroundDark">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <Link to="../disk" className="flex ml-2 md:mr-24">
                <motion.img src={mainLogo} className="h-8 w-8 mr-3" alt="Logo"
                initial={{opacity: 0}} animate={{opacity:1 }} transition={{delay: 0.1}}/>
                <motion.span initial={{opacity: 0, marginLeft: 20}} 
                animate={{opacity:1, marginLeft: 0}} transition={{delay: 0.24}} 
                className="self-center text-xl font-semibold sm:text-2xl 
                whitespace-nowrap dark:text-textDark text-textLight">Storage</motion.span>
              </Link>
            </div>
            <UserProfileDropdown></UserProfileDropdown>
          </div>
        </div>
      </nav>

      <div className="pt-14 transition-transform">
        <div className="bg-backgroundSecondLight overflow-x-hidden dark:bg-backgroundSecondDark min-h-fullWithHeader">
          <Routes>
            <Route path="profile" element={<UserProfile></UserProfile>}></Route>
            <Route path="statistic" element={<UserStatistic></UserStatistic>}></Route>
            <Route path="*" element={<Redirect location="/user/profile"></Redirect>}></Route>
          </Routes>
        </div>
      </div>
    </div>
   );
}
 
export default UserMain;