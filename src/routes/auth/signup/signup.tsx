import { motion } from "framer-motion"
import { useRef, useState } from "react";
import { Link } from 'react-router-dom';
import AlertButton from "../../../components/alert-button";
import { z } from "zod";

export default function SignUp() {
  const firstNameRef:any = useRef()
  const lastNameRef:any = useRef()
  const emailRef:any = useRef()
  const passwordRef:any = useRef()
  const repeatPasswordRef:any = useRef()
  const aboutRef:any = useRef()

  // Logos
  let mainLogo: string | undefined = undefined;

  try {
    mainLogo = require("./../../../icons/logo.png") as string;
  } catch (error) {
    console.log(error)
  }

  const [alertText, setAlertText] = useState("Something went wrong")
  const [alertTitle, setAlertTitle] = useState("Error!")
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  function SendRequest() {
    // Show error
    setIsAlertOpen(false)
    if (CheckData() === false) {
      setTimeout(() => {
        setIsAlertOpen(true)
      }, 250);
      return
    }
    
    // Api request
  }

  const SignUpSchema = z.object({
    "First name": z.string().min(3).max(20),
    "Last name": z.string().min(3).max(20),
    Email: z.string().email(),
    Password: z.string().min(7).max(32),
    "Repeated password": z.string().min(7).max(32),
    About: z.string().max(256).nullable(),
  }).refine((data) => data.Password === data["Repeated password"], {
    message: "Passwords do not match",
    path: ["Repeat password"]
  })

  function CheckData():boolean {
    try {
      SignUpSchema.parse({
        "First name": firstNameRef.current.value,
        "Last name": lastNameRef.current.value,
        Email: emailRef.current.value,
        Password: passwordRef.current.value,
        "Repeated password": repeatPasswordRef.current.value,
        About: aboutRef.current.value.length === 0 ? null : aboutRef.current.value,
      })
    } catch (e:any) {
      setAlertText(JSON.parse(e)[0].message.toString())
      setAlertTitle(JSON.parse(e)[0].path[0].toString())
      return false
    }

    // if (passwordRef.current.value !== repeatPasswordRef.current.value) {
    //   setAlertText("Password mismatch")
    //   setAlertTitle("Repeated password")
    //   return false
    // }


    return true
  }
  
  return (
    <div className="min-h-fulldvh sm:flex justify-center items-center relative overflow-y-hidden">
      <div className='py-6 flex flex-col justify-center min-h-fulldvh sm:h-auto bg-backgroundLight dark:bg-backgroundDark 
      sm:rounded-xl w-[100cvw] sm:w-auto px-10'>
        <div className="w-full flex justify-center">
          <motion.img initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.00, damping: 24, stiffness: 300}} src={mainLogo}
          className="w-12 pb-2 text-center font-semibold leading-6 text-textLight dark:text-textDark"></motion.img>
        </div>

        <motion.p initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.02, damping: 24, stiffness: 300}} 
        className="text-xl sm:text-2xl w-full pb-4 text-center font-semibold leading-6 text-textLight dark:text-textDark">Sign Up</motion.p>

        <div className="border-y border-borderLight dark:border-borderDark py-6">
          <div className=" grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-4">
            <div className="sm:col-span-2 col-span-full">
              <motion.label initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.04, damping: 24, stiffness: 300}}
              title='required' className="block text-base font-medium leading-4 text-textLight dark:text-textDark">First name 
                <span title='required' className=" text-iconLight dark:text-iconDark">*</span>
              </motion.label>
              <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.06, damping: 24, stiffness: 300}}
              className="pt-2">
                <input type="text" name="first-name" id="first-name" autoComplete="given-name" required ref={firstNameRef}
                className="block w-full pl-2 py-1.5 border-1 border-borderLight dark:border-borderDark
                ring-1 ring-inset ring-borderLight dark:ring-borderDark placeholder:text-gray-400 
                focus:outline-offset-1 focus:ring-2 text-sm sm:text-base sm:leading-6 bg-white
                focus:ring-black focus:dark:ring-backgroundDark text-gray-900 shadow-sm
                focus:dark:outline-white focus:outline-0 focus:dark:outline-1 rounded-md transition-inputs"/>
              </motion.div>
            </div>

            <div className="sm:col-span-2 col-span-full">
              <motion.label initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.08, damping: 24, stiffness: 300}}
              title='required' className="block text-base font-medium leading-4 text-textLight dark:text-textDark">Last name
                <span title='required' className=" text-iconLight dark:text-iconDark">*</span>
              </motion.label>
              <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.1, damping: 24, stiffness: 300}}
              className="pt-2">
                <input type="text" name="last-name" id="last-name" autoComplete="family-name" required ref={lastNameRef}
                className="block w-full pl-2 py-1.5 border-1 border-borderLight dark:border-borderDark
                ring-1 ring-inset ring-borderLight dark:ring-borderDark placeholder:text-gray-400 
                focus:outline-offset-1 focus:ring-2 text-sm sm:text-base sm:leading-6 bg-white
                focus:ring-black focus:dark:ring-backgroundDark text-gray-900 shadow-sm
                focus:dark:outline-white focus:outline-0 focus:dark:outline-1 rounded-md transition-inputs"/>
              </motion.div>
            </div>

            <div className="col-span-full">
              <motion.label initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.12, damping: 24, stiffness: 300}}
              title='required' className="block text-base font-medium leading-4 text-textLight dark:text-textDark">Email address
                <span title='required' className=" text-iconLight dark:text-iconDark">*</span>
              </motion.label>
              <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.14, damping: 24, stiffness: 300}}
              className="pt-2">
                <input id="email" name="email" type="email" autoComplete="email" required ref={emailRef}
                className="block w-full pl-2 py-1.5 border-1 border-borderLight dark:border-borderDark
                ring-1 ring-inset ring-borderLight dark:ring-borderDark placeholder:text-gray-400 
                focus:outline-offset-1 focus:ring-2 text-sm sm:text-base sm:leading-6 bg-white
                focus:ring-black focus:dark:ring-backgroundDark text-gray-900 shadow-sm
                focus:dark:outline-white focus:outline-0 focus:dark:outline-1 rounded-md transition-inputs"/>
              </motion.div>
              <motion.p initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.16, damping: 24, stiffness: 300}}
              className="pt-1 text-sm leading-6 text-textLight dark:text-textDark">Use a permanent address where you can receive mail.</motion.p>
            </div>

            <div className="col-span-full pt-2">
              <motion.label initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.18, damping: 24, stiffness: 300}} 
              title='required' className="block text-base font-medium leading-4 text-textLight dark:text-textDark">Password
                <span title='required' className=" text-iconLight dark:text-iconDark">*</span>
              </motion.label>
              <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2, damping: 24, stiffness: 300}} 
              className="pt-2">
                <input id="password" name="password" type="password" autoComplete="password" required ref={passwordRef}
                className="block w-full pl-2 py-1.5 border-1 border-borderLight dark:border-borderDark
                ring-1 ring-inset ring-borderLight dark:ring-borderDark placeholder:text-gray-400 
                focus:outline-offset-1 focus:ring-2 text-sm sm:text-base sm:leading-6 bg-white
                focus:ring-black focus:dark:ring-backgroundDark text-gray-900 shadow-sm
                focus:dark:outline-white focus:outline-0 focus:dark:outline-1 rounded-md transition-inputs"/>
              </motion.div>
              <motion.p initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.22, damping: 24, stiffness: 300}} 
              className="pt-1 text-sm leading-6 text-textLight dark:text-textDark">Repeat password</motion.p>
              <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.24, damping: 24, stiffness: 300}} 
              className="pt-2">
                <input id="password2" name="password" type="password" autoComplete="password" required ref={repeatPasswordRef}
                className="block w-full pl-2 py-1.5 border-1 border-borderLight dark:border-borderDark
                ring-1 ring-inset ring-borderLight dark:ring-borderDark placeholder:text-gray-400 
                focus:outline-offset-1 focus:ring-2 text-sm sm:text-base sm:leading-6 bg-white
                focus:ring-black focus:dark:ring-backgroundDark text-gray-900 shadow-sm
                focus:dark:outline-white focus:outline-0 focus:dark:outline-1 rounded-md transition-inputs"/>
              </motion.div>
            </div>

            <div className="col-span-full pt-2">
              <motion.label initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.26, damping: 24, stiffness: 300}}
              className="block text-base font-medium leading-4 text-textLight dark:text-textDark">About</motion.label>
              <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.28, damping: 24, stiffness: 300}}
              className="pt-2">
                <textarea id="about" name="about" rows={3} ref={aboutRef}
                className="block w-full pl-2 py-1.5 border-1 border-borderLight dark:border-borderDark
                ring-1 ring-inset ring-borderLight dark:ring-borderDark placeholder:text-gray-400 
                focus:outline-offset-1 focus:ring-2 text-sm sm:text-base sm:leading-6 bg-white
                focus:ring-black focus:dark:ring-backgroundDark text-gray-900 shadow-sm
                focus:dark:outline-white focus:outline-0 focus:dark:outline-1 rounded-md transition-inputs"></textarea>
              </motion.div>
              <motion.p initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.3, damping: 24, stiffness: 300}}
              className="pt-3 text-sm leading-6 text-textLight dark:text-textDark">Write a few sentences about yourself.</motion.p>
            </div>
          </div>
        </div>

        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.32, damping: 24, stiffness: 300}}
        className="pt-4 flex items-center text-base justify-between gap-x-6">
          <Link to="../signin" className="text-sm font-semibold leading-6 text-textLight dark:text-textDark
          hover:text-buttonHoverLight dark:hover:text-buttonHoverDark transition-colors">Already have an account?</Link>
          <button type="submit" onClick={SendRequest} className="rounded-md dark:bg-buttonDark bg-buttonLight px-3 py-2 text-sm font-semibold 
          text-textLight dark:text-textDark shadow-sm hover:bg-buttonHoverLight dark:hover:to-buttonHoverDark transition-colors">Send</button>
        </motion.div>
      </div>
      <AlertButton open={isAlertOpen} text={alertText} title={alertTitle}
      type="error" close={() => setIsAlertOpen(false)}></AlertButton>
    </div>
  )
}