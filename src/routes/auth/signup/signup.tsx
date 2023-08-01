import { motion } from "framer-motion"
import { Link } from 'react-router-dom';

export default function SignUp() {
  // Logos
  let mainLogo: string | undefined = undefined;

  try {
    mainLogo = require("./../../../icons/logo.png") as string;
  } catch (error) {
    console.log(error)
  }
  
  return (
    <div className=" min-h-fulldvh sm:flex justify-center items-center">
      <form className='py-6 flex flex-col justify-center min-h-fulldvh sm:h-auto bg-backgroundLight dark:bg-backgroundDark 
      sm:rounded-xl w-fullcvw sm:w-auto px-10' action={void(0)}>
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
                <input type="text" name="first-name" id="first-name" autoComplete="given-name" required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 
                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-none 
                sm:text-sm sm:leading-6 transition-inputs"/>
              </motion.div>
            </div>

            <div className="sm:col-span-2 col-span-full">
              <motion.label initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.08, damping: 24, stiffness: 300}}
              title='required' className="block text-base font-medium leading-4 text-textLight dark:text-textDark">Last name
                <span title='required' className=" text-iconLight dark:text-iconDark">*</span>
              </motion.label>
              <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.1, damping: 24, stiffness: 300}}
              className="pt-2">
                <input type="text" name="last-name" id="last-name" autoComplete="family-name" required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 
                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-none 
                sm:text-sm sm:leading-6 transition-inputs"/>
              </motion.div>
            </div>

            <div className="col-span-full">
              <motion.label initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.12, damping: 24, stiffness: 300}}
              title='required' className="block text-base font-medium leading-4 text-textLight dark:text-textDark">Email address
                <span title='required' className=" text-iconLight dark:text-iconDark">*</span>
              </motion.label>
              <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.14, damping: 24, stiffness: 300}}
              className="pt-2">
                <input id="email" name="email" type="email" autoComplete="email" required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 
                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-none 
                sm:text-sm sm:leading-6 transition-inputs"/>
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
                <input id="password" name="password" type="password" autoComplete="password" required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 
                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-none 
                sm:text-sm sm:leading-6 transition-inputs"/>
              </motion.div>
              <motion.p initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.22, damping: 24, stiffness: 300}} 
              className="pt-1 text-sm leading-6 text-textLight dark:text-textDark">Repeat password</motion.p>
              <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.24, damping: 24, stiffness: 300}} 
              className="pt-2">
                <input id="password2" name="password" type="password" autoComplete="password" required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 
                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-none 
                sm:text-sm sm:leading-6 transition-inputs"/>
              </motion.div>
            </div>

            <div className="col-span-full pt-2">
              <motion.label initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.26, damping: 24, stiffness: 300}}
              className="block text-base font-medium leading-4 text-textLight dark:text-textDark">About</motion.label>
              <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.28, damping: 24, stiffness: 300}}
              className="pt-2">
                <textarea id="about" name="about" rows={3} className="block w-full rounded-md border-0 p-1.5 
                text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                focus:ring-none sm:text-sm sm:leading-6 transition-inputs"></textarea>
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
          <button type="submit" className="rounded-md dark:bg-buttonDark bg-buttonLight px-3 py-2 text-sm font-semibold 
          text-textLight dark:text-textDark shadow-sm hover:bg-buttonHoverLight dark:hover:to-buttonHoverDark transition-colors">Send</button>
        </motion.div>
      </form>
    </div>
  )
}