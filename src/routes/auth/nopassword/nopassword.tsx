import { motion } from "framer-motion"
import { Link } from 'react-router-dom';

export default function NoPassword() {
  // Logos
  let mainLogo: string | undefined = undefined;

  try {
    mainLogo = require("./../../../icons/logo.png") as string;
  } catch (error) {
    console.log(error)
  }

  function SendEmail() {
    console.log("send")
  }

  return (
    <div className=" min-h-fulldvh flex justify-center items-center">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <motion.img initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.0}}
          className="mx-auto h-12 w-auto" src={mainLogo} alt="Logo" />
          <motion.h2 initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.02, damping: 24, stiffness: 300}}
          className="mt-2 text-center text-xl sm:text-2xl font-bold leading-9 tracking-tight text-textLight dark:text-textDark">Sign in to your account</motion.h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" action="javascript:void(0);" onSubmit={SendEmail}>
            <div>
              <motion.label initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.04, damping: 24, stiffness: 300}}
              className="block text-sm font-medium leading-6 text-textLight dark:text-textDark">Email address</motion.label>
              <div className="mt-2">
                <motion.input initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.06, damping: 24, stiffness: 300}}
                id="email" name="email" type="email" autoComplete="email" required 
                className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                ring-1 ring-inset ring-borderLight dark:ring-borderDark placeholder:text-gray-400 
                focus:outline-offset-0 text-sm sm:text-base sm:leading-6" />
              </div>
            </div>

            <div>
              <motion.button initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.08, damping: 24, stiffness: 300}}
              type="submit" className="flex w-full justify-center rounded-md bg-buttonLight dark:bg-buttonDark 
              hover:bg-buttonHoverLight dark:hover:bg-buttonHoverDark px-3 py-1.5 text-sm font-semibold leading-6 
              text-textLight shadow-sm dark:text-textDark">Send verification email</motion.button>
            </div>
          </form>

          <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.1, damping: 24, stiffness: 300}}
            className="mt-10 text-center text-sm text-textLight dark:text-textDark flex gap-x-1 flex-col sm:flex-row">
            <span className='opacity-70'>Remembered the password?</span>
            <Link to="../signin" className="font-semibold text-buttonLight dark:text-buttonDark 
              hover:text-buttonHoverLight dark:hover:text-buttonHoverDark"> Back to sign in page</Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}