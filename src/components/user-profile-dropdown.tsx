import { FunctionComponent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { modalWindowStyle } from "../data/modal-styles";
import EditUIModal from "./edit-ui-modal";

interface UserProfileDropdownProps {
  
}
 
const UserProfileDropdown: FunctionComponent<UserProfileDropdownProps> = () => {
  const [isUserDropMenuOpen, setIsUserDropMenuOpen] = useState(false)
  
  // Modal customize
  const [modalOpen, setModalOpen] = useState(false);
  const modalCustomizeOpen = () => setModalOpen(true);
  const modalCustomizeClose = () => setModalOpen(false);


  // Close modal event
  const root = document.getElementById("root")
  useEffect(() => {
    if (root) {
      root.addEventListener("click", (e:any) => {
        SetDropdown(e)
      })

      return () => {
        root.removeEventListener("click", (e:any) => {
          SetDropdown(e)
        })
      }
    }
  }, [root])
  function SetDropdown(e:any) {
    if (e.target.dataset.drop !== "userMenu") {
      setIsUserDropMenuOpen(false)
    }
  }


  // User image url
  let temp:string | null = localStorage.getItem("userImage")
  const userImage:string | undefined = temp === null ? undefined : temp


  return (
    <div className="flex items-center">
      <div className="flex items-center ml-3">
        <button onClick={() => {setIsUserDropMenuOpen(!isUserDropMenuOpen)}} 
        data-drop="userMenu" className="flex text-sm bg-gray-800 rounded-full">
          <img className="w-8 h-8 rounded-full pointer-events-none" alt="user" draggable="false"
          src={userImage} />
        </button>
        <AnimatePresence>
          {isUserDropMenuOpen && (
            <motion.div initial={{opacity: 0, y: 44, scaleY: 0.2, x: "calc(-100% + 32px)"}} 
            animate={{opacity: 1, y: "calc(50% + 18px)", scaleY: 1}}
            exit={{opacity: 0, y: 44, scaleY: 0.2}}
            transition={{stiffness: 200, damping: 24, duration: 0.16}}
            className="absolute z-50 my-4 text-base list-none bg-backgroundThirdLight 
            dark:bg-backgroundThirdDark dark:divide-borderDark text-textLight dark:text-textDark
            shadow-lightLight dark:shadow-lightDark rounded mb-2">
              <div className="px-4 py-3">
                <p className="">
                  Neil Sims
                </p>
                <p className="font-medium">
                  neil.sims@flowbite.com
                </p>
              </div>
              <div className="py-1">
                <Link to="/disk/folder/main" className="block px-4 py-2 hover:bg-backgroundHoverLight w-full text-left
                  dark:hover:bg-backgroundHoverDark" role="menuitem">Disk
                </Link>
                <Link to="/user/profile" className="block px-4 py-2 hover:bg-backgroundHoverLight w-full text-left
                  dark:hover:bg-backgroundHoverDark" role="menuitem">Profile
                </Link>
                <Link to="/user/statistic" className="block px-4 py-2 hover:bg-backgroundHoverLight w-full text-left
                  dark:hover:bg-backgroundHoverDark" role="menuitem">Statistic
                </Link>
                <button className="block px-4 py-2 hover:bg-backgroundHoverLight w-full text-left
                  dark:hover:bg-backgroundHoverDark" role="menuitem" onClick={modalCustomizeOpen}>Customize
                </button>
                <button className="block px-4 py-2 hover:bg-backgroundHoverLight w-full text-left
                  dark:hover:bg-backgroundHoverDark" role="menuitem">Settings
                </button>
                <button className="block px-4 py-2 hover:bg-backgroundHoverLight w-full text-left
                  dark:hover:bg-backgroundHoverDark" role="menuitem">Documentation
                </button>
                <Link to="/auth" className="block px-4 py-2 hover:bg-backgroundHoverLight w-full text-left
                  dark:hover:bg-backgroundHoverDark" role="menuitem">Sign out
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      
      {/* Customize modal */}
      <Modal open={modalOpen} onClose={modalCustomizeClose}
      aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={modalWindowStyle}>
          <EditUIModal></EditUIModal>
        </Box>
      </Modal>
    </div>
   );
}
 
export default UserProfileDropdown;