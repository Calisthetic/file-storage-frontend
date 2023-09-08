import { AnimatePresence, motion } from "framer-motion";
import { FunctionComponent, useState } from "react";
import { IconClose } from "../../components/icons";
import { Link } from "react-router-dom";

interface UserSidebarProps {
  
}
 
const UserSidebar: FunctionComponent<UserSidebarProps> = () => {
  const [isAdOpen, setIsAdOpen] = useState(true)
  
  return (
    <div className="h-full px-3 pb-4 bg-backgroundLight dark:bg-backgroundDark
    dark:text-textDark text-textLight font-medium text-sm sm:text-base
    overflow-y-auto">
      <ul>
        <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{delay: 0, stiffness: 300, damping: 24}}>
          <Link to="profile" draggable="false" className="flex items-center p-1.5 sm:p-2
          rounded-lg hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark transition-all">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" 
            enableBackground="new 0 0 1024 1024" className="w-5 h-5 sm:w-6 sm:h-6">
              <path d="M299.6 289.8c0-117.1 95.3-212.4 212.4-212.4 117.1 0 212.4 95.3 
              212.4 212.4 0 117.1-95.3 212.4-212.4 212.4-117.1 0-212.4-95.3-212.4-212.4zM881.2 
              755.6v159.2c0 17.6-14.3 31.9-31.9 31.9H174.7c-17.6 0-31.9-14.3-31.9-31.9V755.6c0-59.3 
              23.1-115.1 65-157.1 42-42 97.7-65.1 157.1-65.2h4l3.5 2c42.3 24.1 90.6 36.9 139.6 
              36.9s97.3-12.8 139.6-36.9l3.5-2h4c59.3 0 115.1 23.2 157.1 65.2 41.9 42 65 97.8 65 157.1z" 
              className="fill-iconLight dark:fill-iconDark"></path>
            </svg>
            <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
          </Link>
        </motion.li>
        <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{delay: 0.02, stiffness: 300, damping: 24}}>
          <Link to="statistic" draggable="false" className="flex items-center p-1.5 sm:p-2
          rounded-lg hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark transition-all">
            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 sm:w-6 sm:h-6">
              <g fill="none" fillRule="evenodd">
                <path d="M8.999 38H39v-2.001H8.999V38ZM15 19.999A2.001 2.001 0 0 0 12.999 
                22v12H19V22a2.001 2.001 0 0 0-2.001-2.001H15ZM31 14a2 2 0 0 0-2.001 
                1.999V34H35V15.999A2 2 0 0 0 32.999 14H31Zm-8-6.001A2.001 2.001 0 0 0 
                20.999 10v24H27V10a2.001 2.001 0 0 0-2.001-2.001H23Z" 
                className="fill-iconLight dark:fill-iconDark"></path></g>
            </svg>
            <span className="flex-1 ml-3 whitespace-nowrap">Statistic</span>
          </Link>
        </motion.li>
        <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{delay: 0.04, stiffness: 300, damping: 24}}>
          <Link to="appearance" draggable="false" className="flex items-center p-1.5 sm:p-2
          rounded-lg hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark transition-all">
            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 sm:w-6 sm:h-6">
              <path d="M24 6C14.06 6 6 14.06 6 24s8.06 18 18 18c1.66 0 3-1.34 3-3 
              0-.78-.29-1.48-.78-2.01-.47-.53-.75-1.22-.75-1.99 0-1.66 1.34-3 3-3H32c5.52 
              0 10-4.48 10-10 0-8.84-8.06-16-18-16zM13 24c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 
              1.34 3 3-1.34 3-3 3zm6-8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 
              3zm10 0c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm6 8c-1.66 
              0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"
              className="fill-iconLight dark:fill-iconDark"></path><path d="M0 0h48v48H0z" fill="none"></path>
            </svg>
            <span className="flex-1 ml-3 whitespace-nowrap">Appearance</span>
          </Link>
        </motion.li>
        <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{delay: 0.06, stiffness: 300, damping: 24}}>
          <Link to="tariff" draggable="false" className="flex items-center p-1.5 sm:p-2.5
          rounded-lg hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark transition-all">
            {/* <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" 
            enableBackground="new 0 0 512 512" className="w-5 h-5 sm:w-6 sm:h-6">
              <path d="M302.7 64 143 288h95.8l-29.5 160L369 224h-95.8l29.5-160z"
              className="fill-iconLight dark:fill-iconDark"></path>
            </svg> */}
            <svg viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
              <path d="M373.1 280.1 118 503.2c-6.9 6.1-14.5 8.8-22 8.8a31.873 31.873 
              0 0 1-18.81-6.109c-12.09-8.781-16.5-24.76-10.59-38.5L143.5 288H32.01a32.01 
              32.01 0 0 1-29.97-20.75c-4.687-12.47-1.125-26.55 
              8.906-35.33l255.1-223.1c11.25-9.89 27.81-10.58 39.87-1.799 12.09 8.781 16.5 
              24.76 10.59 38.5l-76.88 179.4 111.5-.008a32.01 32.01 0 0 1 29.97 20.75C386.6 
              257.2 383.1 271.3 373.1 280.1z" className="fill-iconLight dark:fill-iconDark"></path></svg>
            <span className="flex-1 ml-3 whitespace-nowrap">Tariff</span>
          </Link>
        </motion.li>
        <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{delay: 0.08, stiffness: 300, damping: 24}}>
          <Link to="account" draggable="false" className="flex items-center p-1.5 sm:p-2
          rounded-lg hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark transition-all">
            <svg fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 sm:w-6 sm:h-6">
              <path d="M9 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-4.991 9A2.001 2.001 0 0 0 2 
              13c0 1.691.833 2.966 2.135 3.797C5.417 17.614 7.145 18 9 18c.41 0 .816-.019 
              1.21-.057A5.477 5.477 0 0 1 9 14.5c0-1.33.472-2.55 1.257-3.5H4.01Zm6.626 
              2.92a2 2 0 0 0 1.43-2.478l-.155-.557c.254-.195.529-.362.821-.497l.338.358a2 
              2 0 0 0 2.91.001l.324-.344c.298.14.578.315.835.518l-.126.423a2 2 0 0 0 1.456 
              2.519l.349.082a4.7 4.7 0 0 1 .01 1.017l-.46.117a2 2 0 0 0-1.431 
              2.479l.156.556c-.254.195-.53.363-.822.498l-.338-.358a2 2 0 0 
              0-2.909-.002l-.325.344a4.32 4.32 0 0 1-.835-.518l.127-.422a2 2 0 0 
              0-1.456-2.52l-.35-.082a4.713 4.713 0 0 1-.01-1.016l.461-.118Zm4.865.58a1 
              1 0 1 0-2 0 1 1 0 0 0 2 0Z" className="fill-iconLight dark:fill-iconDark"></path>
            </svg>
            <span className="flex-1 ml-3 whitespace-nowrap">Account</span>
          </Link>
        </motion.li>
      </ul>

      <ul className="border-t border-borderLight dark:border-borderDark mt-3 pt-3 sm:mt-3 sm:pt-3">
        <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{delay: 0.1, stiffness: 300, damping: 24}}>
          <Link to="/disk/folder/main" draggable="false" className="flex items-center p-1.5 sm:p-2 transition-all
          rounded-lg hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark group">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 128h128V96H0Zm23-22a6 6 0 1 1-6 6 6 6 0 0 1 6-6ZM0 80h128V48H0Zm23-22a6 
              6 0 1 1-6 6 6 6 0 0 1 6-6ZM0 32h128V0H0Zm23-22a6 6 0 1 1-6 6 6 6 0 0 1 6-6Z" 
              className="fill-iconLight dark:fill-iconDark"></path></svg>
            <span className="ml-3">My storage</span>
          </Link>
        </motion.li>
        <motion.li initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{delay: 0.12, stiffness: 300, damping: 24}}>
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
        transition={{delay: 0.14, stiffness: 300, damping: 24}}>
          <Link to="help" draggable="false" className="flex items-center p-1.5 sm:p-2 transition-all
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
        {isAdOpen === true ? (
          <motion.div initial={{x: -300, opacity: 0}} animate={{x: 0, opacity: 1}} 
          transition={{delay: 0.12, stiffness: 300, damping: 24}} exit={{x: -1000, opacity: 0}}
          className="p-2 sm:p-4 mt-4 sm:mt-6 transition rounded-lg bg-backgroundThirdLight dark:bg-backgroundThirdDark 
          text-textLight dark:text-textDark text-sm">
            <div className="flex items-center mb-3 justify-between">
              <span className=" bg-backgroundAccentLight text-textLight font-semibold mr-2 px-2.5 py-0.5 rounded 
              dark:bg-backgroundAccentDark dark:text-textDark">Beta</span>
              <button onClick={() => {setIsAdOpen(false)}} type="button" id="cloase-ad" aria-label="Close ad"
              className="ml-auto sm:-mx-1.5 -my-1.5 bg-backgroundThirdLight 
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
        ) : null}
      </AnimatePresence>
    </div>
  );
}
 
export default UserSidebar;