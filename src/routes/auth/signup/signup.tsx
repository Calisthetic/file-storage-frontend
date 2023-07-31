import { motion } from "framer-motion"
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className=" min-h-fulldvh sm:flex justify-center items-center">
    <div className='py-6 flex flex-col justify-center min-h-fulldvh sm:h-auto bg-backgroundLight dark:bg-backgroundDark 
    sm:rounded-xl w-fullcvw sm:w-auto px-10'>
      <motion.p initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0, damping: 24, stiffness: 300}} 
      className="text-xl sm:text-2xl w-full pb-6 text-center font-semibold leading-6 text-textLight dark:text-textDark">Sign Up</motion.p>

      <div className="border-y border-borderLight dark:border-borderDark py-6">
        <div className=" grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-4">
          <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.02, damping: 24, stiffness: 300}}
           className="sm:col-span-2 col-span-full">
            <label title='required' className="block text-base font-medium leading-4 text-textLight dark:text-textDark">First name 
              <span title='required' className=" text-iconLight dark:text-iconDark">*</span>
            </label>
            <div className="pt-2">
              <input type="text" name="first-name" id="first-name" autoComplete="given-name" 
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 
              ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-none 
              sm:text-sm sm:leading-6 transition-inputs"/>
            </div>
          </motion.div>

          <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.04, damping: 24, stiffness: 300}}
          className="sm:col-span-2 col-span-full">
            <label title='required' className="block text-base font-medium leading-4 text-textLight dark:text-textDark">Last name
              <span title='required' className=" text-iconLight dark:text-iconDark">*</span>
            </label>
            <div className="pt-2">
              <input type="text" name="last-name" id="last-name" autoComplete="family-name" 
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 
              ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-none 
              sm:text-sm sm:leading-6 transition-inputs"/>
            </div>
          </motion.div>

          <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.06, damping: 24, stiffness: 300}}
          className="col-span-full">
            <label title='required' className="block text-base font-medium leading-4 text-textLight dark:text-textDark">Email address
              <span title='required' className=" text-iconLight dark:text-iconDark">*</span>
            </label>
            <div className="pt-2">
              <input id="email" name="email" type="email" autoComplete="email" 
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 
              ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-none 
              sm:text-sm sm:leading-6 transition-inputs"/>
            </div>
            <p className="pt-1 text-sm leading-6 text-textLight dark:text-textDark">Use a permanent address where you can receive mail.</p>
          </motion.div>

          <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.08, damping: 24, stiffness: 300}}
           className="col-span-full pt-2">
            <label title='required' className="block text-base font-medium leading-4 text-textLight dark:text-textDark">Password
              <span title='required' className=" text-iconLight dark:text-iconDark">*</span>
            </label>
            <div className="pt-2">
              <input id="password" name="password" type="password" autoComplete="password" 
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 
              ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-none 
              sm:text-sm sm:leading-6 transition-inputs"/>
            </div>
          </motion.div>

          <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.1, damping: 24, stiffness: 300}}
           className="col-span-full">
            <p className="text-sm leading-4 text-textLight dark:text-textDark">Repeat password</p>
            <div className="pt-2">
              <input id="password" name="password" type="password" autoComplete="password" 
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 
              ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-none 
              sm:text-sm sm:leading-6 transition-inputs"/>
            </div>
          </motion.div>

          <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.12, damping: 24, stiffness: 300}}
           className="col-span-full pt-2">
            <label className="block text-base font-medium leading-4 text-textLight dark:text-textDark">About</label>
            <div className="pt-2">
              <textarea id="about" name="about" rows={3} className="block w-full rounded-md border-0 p-1.5 
              text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
              focus:ring-none sm:text-sm sm:leading-6 transition-inputs"></textarea>
            </div>
            <p className="pt-3 text-sm leading-6 text-textLight dark:text-textDark">Write a few sentences about yourself.</p>
          </motion.div>
        </div>
      </div>

      <div className="pt-4 flex items-center text-base justify-between gap-x-6">
        <Link to="../signin" className="text-sm font-semibold leading-6 text-textLight dark:text-textDark
        hover:text-buttonHoverLight dark:hover:text-buttonHoverDark transition-colors">Already have an account?</Link>
        <button type="submit" className="rounded-md dark:bg-buttonDark bg-buttonLight px-3 py-2 text-sm font-semibold 
        text-textLight dark:text-textDark shadow-sm hover:bg-buttonHoverLight dark:hover:to-buttonHoverDark transition-colors">Send</button>
      </div>
    </div>
    </div>
  )
}