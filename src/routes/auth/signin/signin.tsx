import { motion } from "framer-motion"
import { Suspense, useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { z } from "zod";
import AlertButton from "../../../components/alert-button";
import IconLogo from "../../../components/icons/IconLogo";
import { apiUrl } from "../../../data/data";
import { CheckForError } from "../../../lib/check-errors";

export default function SignIn() {
  const navigate = useNavigate()
  // Inputs
  const emailRef:any = useRef()
  const passwordRef:any = useRef()

  const [alertText, setAlertText] = useState("Something went wrong")
  const [alertTitle, setAlertTitle] = useState("Error!")
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [isSentRequest, setIsSentRequest] = useState(false)
  const SignInSchema = z.object({
    // change later
    Email: z.string().max(32),//email(),
    Password: z.string().min(4).max(32),
  })

  async function SendData() {
    // Show error
    if (CheckData() === false) {
      return
    }
    setIsSentRequest(true)
    
    // Api request
    await fetch(apiUrl + "auth/signin", {
      method: 'POST', 
      body: JSON.stringify({
        login: emailRef.current.value, 
        password: passwordRef.current.value
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      CheckForError(res.status)
      return res.json();
    })
    .then(data => {localStorage.setItem("token", data.token); navigate("/disk/folder/main")})
    .catch(error => {
      ShowError("Failed to sign in", error.message)
    })
    setIsSentRequest(false)
  }
  
  function CheckData():boolean {
    try {
      SignInSchema.parse({
        Email: emailRef.current.value,
        Password: passwordRef.current.value,
      })
    } catch (e:any) {
      ShowError(JSON.parse(e)[0].message.toString(), JSON.parse(e)[0].path[0].toString())
      return false
    }
    return true
  }

  function ShowError(text:string, title:string) {
    setIsAlertOpen(false)
    setAlertText(text)
    setAlertTitle(title)
    setTimeout(() => {
      setIsAlertOpen(true)
    }, 250);
  }

  return (
    <div className="!min-h-[100vh] flex justify-center items-center relative overflow-y-hidden">
      <div className="flex w-80 sm:w-auto min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <motion.button initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} 
          transition={{damping: 24, stiffness: 300}} className="flex justify-center items-center"
          id="logoButton" aria-label="Logo" onClick={() => navigate("/welcome")}>
            <IconLogo classes="h-12 w-12" fillClasses="fill-iconLight dark:fill-iconDark"></IconLogo>
          </motion.button>
          <motion.h2 initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.02, damping: 24, stiffness: 300}}
          className="mt-2 text-center text-xl font-bold leading-9 tracking-tight text-textLight dark:text-textDark">Sign in to your account</motion.h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <motion.label initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.04, damping: 24, stiffness: 300}}
              className="block text-sm font-medium leading-6 text-textLight dark:text-textDark">Email address</motion.label>
              <div className="mt-2">
                <motion.input initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.06, damping: 24, stiffness: 300}}
                id="email" name="email" type="email" autoComplete="email" required aria-label="Email" ref={emailRef}
                className="block w-full pl-2 py-1.5 border-1 border-borderLight dark:border-borderDark
                ring-1 ring-inset ring-borderLight dark:ring-borderDark 
                focus:outline-offset-1 focus:ring-2 text-sm sm:text-base sm:leading-6 bg-white
                focus:ring-black focus:dark:ring-backgroundDark text-gray-900 shadow-sm
                focus:dark:outline-white focus:outline-0 focus:dark:outline-1 rounded-md transition-inputs" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <motion.label initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.08, damping: 24, stiffness: 300}} 
                className="block text-sm font-medium leading-6 text-textLight dark:text-textDark">Password</motion.label>
                <motion.p initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.1, damping: 24, stiffness: 300}}
                className="text-sm font-semibold text-buttonLight dark:text-buttonDark 
                hover:text-buttonHoverLight dark:hover:text-buttonHoverDark">
                  <Link to="../nopassword">Forgot password?</Link>
                </motion.p>
              </div>
              <div className="mt-2">
                <motion.input initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.12, damping: 24, stiffness: 300}}
                id="password" name="password" type="password" autoComplete="current-password" required aria-label="Password" ref={passwordRef} 
                className="block w-full pl-2 py-1.5 border-1 border-borderLight dark:border-borderDark
                ring-1 ring-inset ring-borderLight dark:ring-borderDark 
                focus:outline-offset-1 focus:ring-2 text-sm sm:text-base sm:leading-6 bg-white
                focus:ring-black focus:dark:ring-backgroundDark text-gray-900 shadow-sm
                focus:dark:outline-white focus:outline-0 focus:dark:outline-1 rounded-md transition-inputs" />
              </div>
            </div>
            <div>
              <motion.button initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.14, damping: 24, stiffness: 300}}
              id="signInButton" aria-label="Sign In" onClick={SendData} 
              className="flex w-full justify-center rounded-md bg-buttonLight dark:bg-buttonDark 
              hover:bg-buttonHoverLight dark:hover:bg-buttonHoverDark px-3 py-1.5 text-sm font-semibold leading-6 
              text-textLight shadow-sm dark:text-textDark">{isSentRequest ? "Wait..." : "Sign in"}</motion.button>
            </div>
          </div>

          <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.16, damping: 24, stiffness: 300}}
            className="mt-10 text-center text-sm text-textLight dark:text-textDark ">
            <span className='opacity-70'>Not a member?</span>
            <Link to="/auth/signup" className="font-semibold leading-6 text-buttonLight dark:text-buttonDark 
              hover:text-buttonHoverLight dark:hover:text-buttonHoverDark"> Join now!</Link>
          </motion.div>
        </div>
      </div>

      <Suspense fallback={<div></div>}>
        <AlertButton open={isAlertOpen} text={alertText} title={alertTitle}
        type="error" close={() => setIsAlertOpen(false)}></AlertButton>
      </Suspense>
    </div>
  )
}