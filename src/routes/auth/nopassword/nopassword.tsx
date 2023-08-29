import { motion } from "framer-motion"
import { Link } from 'react-router-dom';
import { useState } from 'react'

export default function NoPassword() {
  // Logos
  let mainLogo: string | undefined = undefined;
  const [checkEmailText, setCheckEmailText]:any = useState("")
  let cooldown:number = 60000 // 1min
  const [lastUsage, setLastUsage]:any = useState(0)

  try {
    mainLogo = require("./../../../icons/logo.png") as string;
  } catch (error) {
    console.log(error)
  }

  async function SendEmail(e:any) {
    e.preventDefault()
    if (lastUsage + cooldown > Date.now()) {
      setCheckEmailText("Email has already been sent. Try again in a minute")
    } else {
      // Send request
      setCheckEmailText("Tha email was send. Please check your mailbox")
      setLastUsage(Date.now())
    }
  }

  return (
    <div className=" min-h-fulldvh flex justify-center items-center">
      <div className="flex min-h-full w-80 sm:w-auto flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <motion.img initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.0, damping: 24, stiffness: 300}}
          className="mx-auto h-12 w-auto" src={mainLogo} alt="Logo" />
          <motion.h2 initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.02, damping: 24, stiffness: 300}}
          className="mt-2 text-center text-xl sm:text-2xl font-bold leading-9 tracking-tight text-textLight dark:text-textDark">Account recovery</motion.h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={SendEmail}>
            <div>
              <motion.label initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.04, damping: 24, stiffness: 300}}
              className="block text-sm font-medium leading-6 text-textLight dark:text-textDark">Email address</motion.label>
              <div className="mt-2">
                <motion.input initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.06, damping: 24, stiffness: 300}}
                id="email" name="email" type="email" autoComplete="email" required
                className="block w-full pl-2 py-1.5 border-1 border-borderLight dark:border-borderDark
                ring-1 ring-inset ring-borderLight dark:ring-borderDark placeholder:text-gray-400 
                focus:outline-offset-1 focus:ring-2 text-sm sm:text-base sm:leading-6 bg-white
                focus:ring-black focus:dark:ring-backgroundDark text-gray-900 shadow-sm
                focus:dark:outline-white focus:outline-0 focus:dark:outline-1 rounded-md transition-inputs" />
              </div>
            </div>

            <div>
              <motion.button initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.08, damping: 24, stiffness: 300}}
              type="submit" className="flex w-full justify-center rounded-md bg-buttonLight dark:bg-buttonDark 
              hover:bg-buttonHoverLight dark:hover:bg-buttonHoverDark px-3 py-1.5 text-sm font-semibold leading-6 
              text-textLight shadow-sm dark:text-textDark transition-colors">Send verification email</motion.button>
            </div>
            <p className="text-textLight text-base font-medium dark:text-textDark">{checkEmailText}</p>
          </form>

          <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.1, damping: 24, stiffness: 300}}
            className="mt-10 text-center text-sm text-textLight dark:text-textDark justify-center flex gap-x-1 flex-col sm:flex-row">
            <span className='opacity-70'>Remembered the password?</span>
            <Link to="../signin" className="font-semibold text-buttonLight dark:text-buttonDark 
              hover:text-buttonHoverLight dark:hover:text-buttonHoverDark"> Back to sign in page</Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}