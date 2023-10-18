import { AnimatePresence, motion } from "framer-motion"
import { Link, useNavigate } from 'react-router-dom';
import { Suspense, lazy, useRef, useState } from 'react'
import { z } from "zod";
import IconLogo from "../../../components/icons/IconLogo";
const AlertButton = lazy(() => import("../../../components/alert-button"));

export default function NoPassword() {
  const navigate = useNavigate();
  
  // Usage cooldown
  const cooldown:number = 60000 // 1min
  const [lastUsage, setLastUsage]:any = useState(0)
  const [isEmailSent, setIsEmailSent]:any = useState(false)

  const emailInputRef:any = useRef()
  const verifyCodeInputRef:any = useRef()
  const [buttonText, setButtonText] = useState("Send verification email")
  const [alertText, setAlertText] = useState("Something went wrong")
  const [alertTitle, setAlertTitle] = useState("Error!")
  const [alertType, setAlertType] = useState("error")
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  function SettingAlert(type: string, title: string, text: string) {
    setAlertType(type)
    setAlertTitle(title)
    setAlertText(text)
  }

  async function SendEmail(e:any) {
    // Check email
    if (CheckData("email") === false) {
      return
    }

    // Cooldown check
    if (lastUsage + cooldown > Date.now()) {
      SettingAlert("warning", "Spam protection", "Email has already been sent.\nTry again in a minute")
      setTimeout(() => {
        setIsAlertOpen(true)
      }, 250);
    } else {
      // Send request
      setLastUsage(Date.now())
      setIsEmailSent(true)
      setButtonText("Send verification code")
      // Success alert
      SettingAlert("success", "Email", "Verification code was sent")
      setTimeout(() => {
        setIsAlertOpen(true)
      }, 250);
    }
  }

  async function SendCode() {
    // Check email and code
    if (CheckData() === false) {
      return
    }

    // Send code
  }

  const EmailSchema = z.object({
    Email: z.string().email(),
    "Verify code": z.number({invalid_type_error: "Please enter number"}).positive().int()
      .gte(1000, "Length must be equal to 4").lte(9999, "Length must be equal to 4").nullable()
  })

  function CheckData(type?: string):boolean {
    setIsAlertOpen(false)
    try {
      EmailSchema.parse({
        Email: emailInputRef.current.value,
        "Verify code": type !== "email" ? isEmailSent === true ? parseInt(verifyCodeInputRef.current.value) : null : null
      })
    } catch (e:any) {
      SettingAlert("error", JSON.parse(e)[0].path[0].toString(), JSON.parse(e)[0].message.toString())
      setTimeout(() => {
        setIsAlertOpen(true)
      }, 250);
      return false
    }
    return true
  }

  return (
    <div className="!min-h-[100dvh] flex justify-center items-center relative overflow-y-hidden">
      <div className="flex min-h-full w-80 sm:w-auto flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <motion.button initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} 
          transition={{damping: 24, stiffness: 300}} className="flex justify-center"
          onClick={() => navigate("/welcome")}>
            <IconLogo classes="h-12 w-12" fillClasses="fill-iconLight dark:fill-iconDark"></IconLogo>
          </motion.button>
          <motion.h2 initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.02, damping: 24, stiffness: 300}}
          className="mt-2 text-center text-xl sm:text-2xl font-bold leading-9 tracking-tight text-textLight dark:text-textDark">Account recovery</motion.h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-4">
            <div>
              <motion.label initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.04, damping: 24, stiffness: 300}}
              className="block text-sm font-medium leading-6 text-textLight dark:text-textDark">Email address</motion.label>
              <div className="mt-2">
                <motion.input initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.06, damping: 24, stiffness: 300}}
                id="email" name="email" type="email" autoComplete="email" ref={emailInputRef} aria-label="Email" required
                className="block w-full pl-2 py-1.5 border-1 border-borderLight dark:border-borderDark
                ring-1 ring-inset ring-borderLight dark:ring-borderDark
                focus:outline-offset-1 focus:ring-2 text-sm sm:text-base sm:leading-6 bg-white
                focus:ring-black focus:dark:ring-backgroundDark text-gray-900 shadow-sm
                focus:dark:outline-white focus:outline-0 focus:dark:outline-1 rounded-md transition-inputs" />
              </div>
            </div>
            
            <AnimatePresence>
              {isEmailSent ? (
                <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{damping: 24, stiffness: 300}}>
                  <label className="block text-sm font-medium leading-6 text-textLight dark:text-textDark">Please enter verify code</label>
                  <div className="mt-2">
                    <input id="verify-code" name="verify-code" type="number" ref={verifyCodeInputRef} aria-label="Verify code"
                    className="block w-full pl-2 py-1.5 border-1 border-borderLight dark:border-borderDark
                    ring-1 ring-inset ring-borderLight dark:ring-borderDark 
                    focus:outline-offset-1 focus:ring-2 text-sm sm:text-base sm:leading-6 bg-white
                    focus:ring-black focus:dark:ring-backgroundDark text-gray-900 shadow-sm
                    focus:dark:outline-white focus:outline-0 focus:dark:outline-1 rounded-md transition-inputs" />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div>
              <motion.button id="send-again" aria-label="Send again" initial={{opacity: 0, y: 20}} 
              animate={{opacity: 1, y: 0}} transition={{delay: 0.08, damping: 24, stiffness: 300}}
              onClick={isEmailSent ? SendCode : SendEmail} 
              className="flex w-full justify-center rounded-md bg-buttonLight dark:bg-buttonDark 
              hover:bg-buttonHoverLight dark:hover:bg-buttonHoverDark px-3 py-1.5 text-sm font-semibold leading-6 
              text-textLight shadow-sm dark:text-textDark transition-colors">{buttonText}</motion.button>
            </div>
            <AnimatePresence>
              {isEmailSent ? (
                <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{damping: 24, stiffness: 300}}>
                  <p className="text-textLight text-base dark:text-textDark text-center flex sm:gap-x-1 flex-col md:flex-row">
                    <span>Tha email was send,</span>
                    <span>please check your mailbox.</span>
                  </p>
                  <p className="text-textLight text-base dark:text-textDark text-center mt-1">
                    Did not get the email?
                    <button id="send-again" aria-label="Send again" onClick={SendEmail}
                    className="ml-2 text-buttonLight dark:text-buttonDark font-semibold
                    hover:text-buttonHoverLight hover:dark:text-buttonHoverDark">Send again</button>
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.1, damping: 24, stiffness: 300}}
          className="mt-10 text-center text-sm text-textLight dark:text-textDark justify-center flex gap-x-1 flex-col sm:flex-row">
            <span className='opacity-70'>Remembered the password?</span>
            <Link to="../signin" className="font-semibold text-buttonLight dark:text-buttonDark 
              hover:text-buttonHoverLight dark:hover:text-buttonHoverDark"> Back to sign in page</Link>
          </motion.div>
        </div>
      </div>

      <Suspense fallback={<div></div>}>
        <AlertButton open={isAlertOpen} text={alertText} title={alertTitle}
        type={alertType} close={() => setIsAlertOpen(false)}></AlertButton>
      </Suspense>
    </div>
  )
}