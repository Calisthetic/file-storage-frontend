import { motion } from "framer-motion";
import { FunctionComponent, Suspense, lazy, useRef, useState } from "react";
import { z } from "zod";
const AlertButton = lazy(() => import("../../../components/alert-button"));
const CustomDatePicker = lazy(() => import("./custom-date-picker"));

interface UserAccountProps {
  
}
 
const UserAccount: FunctionComponent<UserAccountProps> = () => {
  const [birthdayDate, setBirthdayDate] = useState<string>("")
  function SelectBirthdayDate(data:any) {
    setBirthdayDate(new Date(Date.parse(data)).toISOString().slice(0,10))
  }

  const firstNameInputRef:any = useRef()
  const lastNameInputRef:any = useRef()
  
  const [alertText, setAlertText] = useState("Something went wrong")
  const [alertTitle, setAlertTitle] = useState("Error!")
  const [alertType, setAlertType] = useState("error")
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const UpdateAccountSchema = z.object({
    "First name": z.string().min(3).max(20),
    "Last name": z.string().min(3).max(20),
    "Birthday date": z.date()
      .min(new Date(((new Date()).getFullYear() - 100).toString() + "-01-01"), {message: "Too old"})
      .max(new Date(((new Date()).getFullYear() - 14).toString() + "-01-01"), {message: "Too young"}),
  })

  function CheckData():boolean {
    setIsAlertOpen(false)
    try {
      UpdateAccountSchema.parse({
        "First name": firstNameInputRef.current.value,
        "Last name": lastNameInputRef.current.value,
        "Birthday date": new Date(birthdayDate)
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

  function UpdateAccount() {
    if (CheckData() === false) {
      return
    }

    // change later
  }

  return (
    <div className="min-h-fullWithHeader flex flex-col items-center overflow-y-hidden relative">
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
            <input type="text" aria-label="First Name" placeholder="change later" ref={firstNameInputRef}
            className="block w-full pl-2 py-1 border-1 border-borderLight dark:border-borderDark
            ring-1 ring-inset ring-borderLight dark:ring-borderDark 
            focus:outline-offset-1 focus:ring-2 text-sm sm:text-base sm:leading-6
            focus:ring-black focus:dark:ring-backgroundDark rounded-md transition-inputs
            focus:dark:outline-white focus:outline-0 focus:dark:outline-1
            bg-backgroundSecondLight dark:bg-backgroundSecondDark"></input>
            <p className="opacity-80 dark:opacity-70 text-sm">Your name is wholly yours.</p>
          </motion.div>
          <motion.div  initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1}}
          transition={{delay: 0.1, damping: 24, stiffness: 300}}>
            <label className="font-medium">Last name</label>
            <input type="text" aria-label="Last Name" placeholder="change later" ref={lastNameInputRef}
            className="block w-full pl-2 py-1 border-1 border-borderLight dark:border-borderDark
            ring-1 ring-inset ring-borderLight dark:ring-borderDark 
            focus:outline-offset-1 focus:ring-2 text-sm sm:text-base sm:leading-6
            focus:ring-black focus:dark:ring-backgroundDark rounded-md transition-inputs
            focus:dark:outline-white focus:outline-0 focus:dark:outline-1
            bg-backgroundSecondLight dark:bg-backgroundSecondDark"></input>
            <p className="opacity-80 dark:opacity-70 text-sm">Last name too.</p>
          </motion.div>
          <motion.div initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1}}
          transition={{delay: 0.15, damping: 24, stiffness: 300}}>
            <label className="font-medium">Date of birth</label>
            <Suspense fallback={<div></div>}>
              <CustomDatePicker onSelect={SelectBirthdayDate}></CustomDatePicker>
            </Suspense>
            <p className="opacity-80 dark:opacity-70 text-sm">Your date of birth is used to calculate your age.</p>
          </motion.div>
          <motion.div  initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1}}
          transition={{delay: 0.2, damping: 24, stiffness: 300}}>
            <label className="font-medium">Add email adress</label>
            
            <p className="opacity-80 dark:opacity-70 text-sm">We recommend using at least 2 mailboxes.</p>
          </motion.div>
          <motion.button initial={{y: 50, opacity: 0}} animate={{y: 0, opacity: 1}}
          transition={{delay: 0.25, damping: 24, stiffness: 300}} 
          id="updateProfile" aria-label="Update profile" onClick={UpdateAccount}
          className="bg-buttonLight dark:bg-buttonDark py-2 px-4 mb-4 rounded-lg w-fit font-semibold">Update account</motion.button>
        </div>
      </div>

      <Suspense fallback={<div></div>}>
        <AlertButton open={isAlertOpen} text={alertText} title={alertTitle}
        type={alertType} close={() => setIsAlertOpen(false)}></AlertButton>
      </Suspense>
    </div>
  );
}
 
export default UserAccount;