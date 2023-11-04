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
    <nav className="fixed top-0 z-40 h-14 px-1 sm:px-2 w-full bg-backgroundLight dark:bg-backgroundDark
    shadow-lightLight dark:shadow-none">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center justify-start">
          {children}
          <Link to={homeLocation ?? "/welcome"} className="flex ml-1 sm:ml-2 md:mr-24">
            <motion.div initial={{opacity: 0}} animate={{opacity:1 }}>
              <IconLogo classes="h-8 w-8 mr-1 sm:mr-3" fillClasses="fill-iconLight dark:fill-iconDark"></IconLogo>
            </motion.div>
            <motion.span initial={{opacity:0}} animate={{opacity:1}}
            className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-textDark text-textLight">Storage</motion.span>
          </Link>
        </div>
        {/* User profile */}
        <UserProfileDropdown></UserProfileDropdown>
      </div>
    </nav>
  );
}
 
export default NavBar;