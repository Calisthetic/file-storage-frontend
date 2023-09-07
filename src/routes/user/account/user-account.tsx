import { motion } from "framer-motion";
import { FunctionComponent } from "react";
import CustomDatePicker from "./custom-date-picker";

interface UserAccountProps {
  
}
 
const UserAccount: FunctionComponent<UserAccountProps> = () => {
  return (
    <div className="min-h-fullWithHeader flex flex-col items-center">
      <div className="text-textLight dark:text-textDark font-normal
      w-[calc(100dvw-24px)] sm:w-[calc(100dvw-256px-24px)] xl:w-[800px]">
        <motion.div initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{delay: 0, damping: 24, stiffness: 300}} 
        className="border-b border-borderLight dark:border-borderDark py-4">
          <p className="text-xl font-semibold">Account</p>
          <p className="opacity-80 dark:opacity-70 text-sm">Update your your personal data and account settings</p>
        </motion.div>
        <div className="flex flex-col gap-y-6 child:flex child:flex-col child:gap-y-1">
          <motion.div  initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1}}
          transition={{delay: 0.05, damping: 24, stiffness: 300}} className="mt-4">
            <label className="font-medium">First name</label>
            <input type="text" aria-label="First Name" placeholder="change later" 
            className="block w-full pl-2 py-1 border-1 border-borderLight dark:border-borderDark
            ring-1 ring-inset ring-borderLight dark:ring-borderDark 
            focus:outline-offset-1 focus:ring-2 text-sm sm:text-base sm:leading-6
            focus:ring-black focus:dark:ring-backgroundDark rounded-md transition-inputs
            focus:dark:outline-white focus:outline-0 focus:dark:outline-1
            bg-backgroundSecondLight dark:bg-backgroundSecondDark"></input>
            <p className="opacity-80 dark:opacity-70 text-sm">Your name is wholly yours.</p>
          </motion.div>
          <motion.div initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1}}
          transition={{delay: 0.1, damping: 24, stiffness: 300}}>
            <label className="font-medium">Date of birth</label>
            <CustomDatePicker></CustomDatePicker>
            <p className="opacity-80 dark:opacity-70 text-sm">Your date of birth is used to calculate your age.</p>
          </motion.div>
          <motion.div initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1}}
          transition={{delay: 0.15, damping: 24, stiffness: 300}}>
            <label className="font-medium">About</label>
            <textarea id="about" name="about" rows={3} aria-label="about" placeholder="change later"
            className="block w-full pl-2 py-1 border-1 border-borderLight dark:border-borderDark
            ring-1 ring-inset ring-borderLight dark:ring-borderDark 
            focus:outline-offset-1 focus:ring-2 text-sm sm:text-base sm:leading-6
            focus:ring-black focus:dark:ring-backgroundDark
            focus:dark:outline-white focus:outline-0 focus:dark:outline-1 rounded-md transition-inputs
            bg-backgroundSecondLight dark:bg-backgroundSecondDark"></textarea>
            <p className="opacity-80 dark:opacity-70 text-sm">Write a few sentences about yourself.</p>
          </motion.div>
          <motion.button  initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1}}
          transition={{delay: 0.2, damping: 24, stiffness: 300}} 
          id="updateProfile" aria-label="Update profile" onClick={() => console.log("change later")}
          className="bg-buttonLight dark:bg-buttonDark py-2 px-4 rounded-lg w-fit font-semibold">Update profile</motion.button>
        </div>
      </div>
    </div>
  );
}
 
export default UserAccount;