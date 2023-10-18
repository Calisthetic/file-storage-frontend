import { motion } from "framer-motion"
import React, { Suspense, useState, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { z } from "zod";
import IconLogo from "../../../components/icons/IconLogo";
import { apiUrl } from "../../../data/data";
import { CheckForError } from "../../../lib/check-errors";

const AlertButton = React.lazy(() => import("../../../components/alert-button"));

export default function SignUp() {
  const navigate = useNavigate()

  const firstNameRef:any = useRef()
  const lastNameRef:any = useRef()
  const emailRef:any = useRef()
  const passwordRef:any = useRef()
  const repeatPasswordRef:any = useRef()
  const aboutRef:any = useRef()


  const [alertText, setAlertText] = useState("Something went wrong")
  const [alertTitle, setAlertTitle] = useState("Error!")
  const [alertType, setAlertType] = useState("error")
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  async function SendRequest() {
    // Check data
    if (CheckData() === false) {
      return
    }
    
    // Api request
    await fetch(apiUrl + "auth/signup", {
      method: 'POST', 
      body: JSON.stringify({
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        about: aboutRef.current.value.length === 0 ? null : aboutRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      CheckForError(res.status)
      return res.json();
    })
    .then(() => {ShowError("A letter with a verification code has been sent to your email", "Сheck your email", "success")})
    .catch(error => {
      ShowError("Failed to sign up", error.message)
    })
  }

  const SignUpSchema = z.object({
    "First name": z.string().min(3).max(20),
    "Last name": z.string().min(3).max(20),
    Email: z.string().email(),
    Password: z.string().min(8).max(32),
    "Repeated password": z.string().min(8).max(32),
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
      ShowError(JSON.parse(e)[0].message.toString(), JSON.parse(e)[0].path[0].toString())
      return false
    }

    return true
  }

  function ShowError(text:string, title:string, type:string = "error") {
    setAlertType(type)
    setIsAlertOpen(false)
    setAlertText(text)
    setAlertTitle(title)
    setTimeout(() => {
      setIsAlertOpen(true)
    }, 250);
  }
  
  return (
    <div className="!min-h-[100dvh] sm:flex justify-center items-center relative overflow-y-hidden">
      <div className='py-6 flex flex-col justify-center !min-h-[100dvh] sm:h-auto bg-backgroundLight dark:bg-backgroundDark 
      sm:rounded-xl w-[100cvw] sm:w-auto px-10'>
        <div className="w-full flex justify-center pb-2">
          <motion.button initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} 
          transition={{damping: 24, stiffness: 300}} className="flex justify-center"
          onClick={() => navigate("/welcome")}>
            <IconLogo classes="h-12 w-12" fillClasses="fill-iconLight dark:fill-iconDark"></IconLogo>
          </motion.button>
        </div>

        <motion.p initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.02, damping: 24, stiffness: 300}} 
        className="text-xl sm:text-2xl w-full pb-4 text-center font-semibold leading-6 text-textLight dark:text-textDark">Sign Up</motion.p>

        <div className="border-y border-borderLight dark:border-borderDark py-6">
          <div className=" grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-4">
            <div className="sm:col-span-2 col-span-full">
              <motion.label initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.04, damping: 24, stiffness: 300}}
              title='required' className="block text-base font-medium leading-4 text-textLight dark:text-textDark">First name 
                <span className=" text-iconLight dark:text-iconDark">*</span>
              </motion.label>
              <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.06, damping: 24, stiffness: 300}}
              className="pt-2">
                <input type="text" name="first-name" id="first-name" aria-label="first-name" autoComplete="given-name" required ref={firstNameRef}
                className="block w-full pl-2 py-1.5 border-1 border-borderLight dark:border-borderDark
                ring-1 ring-inset ring-borderLight dark:ring-borderDark 
                focus:outline-offset-1 focus:ring-2 text-sm sm:text-base sm:leading-6 bg-white
                focus:ring-black focus:dark:ring-backgroundDark text-gray-900 shadow-sm
                focus:dark:outline-white focus:outline-0 focus:dark:outline-1 rounded-md transition-inputs"/>
              </motion.div>
            </div>

            <div className="sm:col-span-2 col-span-full">
              <motion.label initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.08, damping: 24, stiffness: 300}}
              title='required' className="block text-base font-medium leading-4 text-textLight dark:text-textDark">Last name
                <span className=" text-iconLight dark:text-iconDark">*</span>
              </motion.label>
              <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.1, damping: 24, stiffness: 300}}
              className="pt-2">
                <input type="text" name="last-name" id="last-name" aria-label="last-name" autoComplete="family-name" required ref={lastNameRef}
                className="block w-full pl-2 py-1.5 border-1 border-borderLight dark:border-borderDark
                ring-1 ring-inset ring-borderLight dark:ring-borderDark 
                focus:outline-offset-1 focus:ring-2 text-sm sm:text-base sm:leading-6 bg-white
                focus:ring-black focus:dark:ring-backgroundDark text-gray-900 shadow-sm
                focus:dark:outline-white focus:outline-0 focus:dark:outline-1 rounded-md transition-inputs"/>
              </motion.div>
            </div>

            <div className="col-span-full">
              <motion.label initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.12, damping: 24, stiffness: 300}}
              title='required' className="block text-base font-medium leading-4 text-textLight dark:text-textDark">Email address
                <span className=" text-iconLight dark:text-iconDark">*</span>
              </motion.label>
              <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.14, damping: 24, stiffness: 300}}
              className="pt-2">
                <input id="email" name="email" type="email" aria-label="email" autoComplete="email" required ref={emailRef}
                className="block w-full pl-2 py-1.5 border-1 border-borderLight dark:border-borderDark
                ring-1 ring-inset ring-borderLight dark:ring-borderDark 
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
                <span className=" text-iconLight dark:text-iconDark">*</span>
              </motion.label>
              <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2, damping: 24, stiffness: 300}} 
              className="pt-2">
                <input id="password" name="password" type="password" aria-label="password" autoComplete="password" required ref={passwordRef}
                className="block w-full pl-2 py-1.5 border-1 border-borderLight dark:border-borderDark
                ring-1 ring-inset ring-borderLight dark:ring-borderDark 
                focus:outline-offset-1 focus:ring-2 text-sm sm:text-base sm:leading-6 bg-white
                focus:ring-black focus:dark:ring-backgroundDark text-gray-900 shadow-sm
                focus:dark:outline-white focus:outline-0 focus:dark:outline-1 rounded-md transition-inputs"/>
              </motion.div>
              <motion.p initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.22, damping: 24, stiffness: 300}} 
              className="pt-1 text-sm leading-6 text-textLight dark:text-textDark">Repeat password</motion.p>
              <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.24, damping: 24, stiffness: 300}} 
              className="pt-2">
                <input id="password2" name="password2" type="password2" aria-label="password2" autoComplete="password" required ref={repeatPasswordRef}
                className="block w-full pl-2 py-1.5 border-1 border-borderLight dark:border-borderDark
                ring-1 ring-inset ring-borderLight dark:ring-borderDark 
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
                <textarea id="about" name="about" rows={3} ref={aboutRef} aria-label="about"
                className="block w-full pl-2 py-1.5 border-1 border-borderLight dark:border-borderDark
                ring-1 ring-inset ring-borderLight dark:ring-borderDark 
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
          <button onClick={SendRequest} className="rounded-md dark:bg-buttonDark bg-buttonLight px-3 py-2 text-sm font-semibold 
          text-textLight dark:text-textDark shadow-sm hover:bg-buttonHoverLight dark:hover:to-buttonHoverDark transition-colors">Send</button>
        </motion.div>
      </div>

      <Suspense fallback={<div></div>}>
        <AlertButton open={isAlertOpen} text={alertText} title={alertTitle}
        type={alertType} close={() => setIsAlertOpen(false)}></AlertButton>
      </Suspense>
    </div>
  )
}