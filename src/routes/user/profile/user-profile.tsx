import { motion } from "framer-motion";
import { FunctionComponent, Suspense, lazy, useRef, useState } from "react";
import { z } from "zod";
const AlertButton = lazy(() => import("../../../components/alert-button"));

interface UserProfileProps {
  
}

const UserProfile: FunctionComponent<UserProfileProps> = () => {
  const userNameInputRef:any = useRef()
  const aboutInputRef:any = useRef()
  const [selectedEmail, setSelectedEmail] = useState<number>(0)


  const [alertText, setAlertText] = useState("Something went wrong")
  const [alertTitle, setAlertTitle] = useState("Error!")
  const [alertType, setAlertType] = useState("error")
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const UpdateProfileSchema = z.object({
    "Username": z.string().min(3).max(20),
    "About": z.string().nullable(),
    "Main email": z.number().nonnegative()
  })

  function CheckData():boolean {
    setIsAlertOpen(false)
    try {
      UpdateProfileSchema.parse({
        "Username": userNameInputRef.current.value,
        "About": aboutInputRef.current.value,
        "Main email": selectedEmail
      })
    } catch (e:any) {
      setAlertText(JSON.parse(e)[0].message.toString())
      setAlertTitle(JSON.parse(e)[0].path[0].toString())
      setAlertType("error")
      setTimeout(() => {
        setIsAlertOpen(true)
      }, 250);
      return false
    }
    return true
  }

  function UpdateProfile() {
    if (CheckData() === false) {
      return
    }

    // change later
  }





  return ( 
    <div className="min-h-fullWithHeader flex flex-col items-center">
      <div className="text-textLight dark:text-textDark font-normal
      w-[calc(100dvw-24px)] sm:w-[calc(100dvw-256px-24px)] xl:w-[800px]">
        <motion.div initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{delay: 0, damping: 24, stiffness: 300}} 
        className="border-b border-borderLight dark:border-borderDark py-4">
          <p className="text-xl font-semibold">Profile</p>
          <p className="opacity-80 dark:opacity-70 text-sm">This is how others will see you on the site</p>
        </motion.div>
        <div className="flex flex-col gap-y-6 child:flex child:flex-col child:gap-y-1">
          <motion.div  initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1}}
          transition={{delay: 0.05, damping: 24, stiffness: 300}} className="mt-4">
            <label className="font-medium">Username</label>
            <input type="text" aria-label="UserName" placeholder="change later" ref={userNameInputRef}
            className="block w-full pl-2 py-1 border-1 border-borderLight dark:border-borderDark
            ring-1 ring-inset ring-borderLight dark:ring-borderDark 
            focus:outline-offset-1 focus:ring-2 text-sm sm:text-base sm:leading-6
            focus:ring-black focus:dark:ring-backgroundDark rounded-md transition-inputs
            focus:dark:outline-white focus:outline-0 focus:dark:outline-1
            bg-backgroundSecondLight dark:bg-backgroundSecondDark"></input>
            <p className="opacity-80 dark:opacity-70 text-sm">This is your public display name. It can be your real name or a pseudonym.</p>
          </motion.div>
          <motion.div initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1}}
          transition={{delay: 0.1, damping: 24, stiffness: 300}}>
            <label className="font-medium">Email</label>
            <select onInput={() => setSelectedEmail(1)}
            className="bg-backgroundSecondLight dark:bg-backgroundSecondDark
            block w-full px-2 py-1 border-1 border-borderLight dark:border-borderDark
            ring-1 ring-inset ring-borderLight dark:ring-borderDark 
            focus:outline-offset-1 focus:ring-2 text-sm sm:text-base sm:leading-6
            focus:ring-black focus:dark:ring-backgroundDark rounded-md transition-inputs
            focus:dark:outline-white focus:outline-0 focus:dark:outline-1"></select>
            <p className="opacity-80 dark:opacity-70 text-sm">You can manage verified email addresses in your account settings.</p>
          </motion.div>
          <motion.div initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1}}
          transition={{delay: 0.15, damping: 24, stiffness: 300}}>
            <label className="font-medium">About</label>
            <textarea id="about" name="about" rows={3} aria-label="about" placeholder="change later" ref={aboutInputRef}
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
          id="updateProfile" aria-label="Update profile" onClick={UpdateProfile}
          className="bg-buttonLight dark:bg-buttonDark py-2 px-4 mb-4 rounded-lg w-fit font-semibold">Update profile</motion.button>
        </div>
      </div>

      <Suspense fallback={<div></div>}>
        <AlertButton open={isAlertOpen} text={alertText} title={alertTitle}
        type={alertType} close={() => setIsAlertOpen(false)}></AlertButton>
      </Suspense>
    </div>
   );
}
 
export default UserProfile;