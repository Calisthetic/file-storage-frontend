import { motion } from "framer-motion";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import IconLogo from "./icons/IconLogo";
import UserProfileDropdown from "./user-profile-dropdown";

interface NavBarProps {
  children?:JSX.Element | JSX.Element[]
  homeLocation?:string
}
 
const NavBar: FunctionComponent<NavBarProps> = ({children, homeLocation}:NavBarProps) => {
  return (
    <nav className="fixed top-0 z-40 w-full bg-backgroundLight dark:bg-backgroundDark">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            {children}
            <Link to={homeLocation ?? "/welcome"} className="flex ml-2 md:mr-24">
              <motion.div initial={{opacity: 0}} animate={{opacity:1 }} transition={{delay: 0.1}}>
                <IconLogo classes="h-8 w-8 mr-3" fillClasses="fill-iconLight dark:fill-iconDark"></IconLogo>
              </motion.div>
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
  );
}
 
export default NavBar;