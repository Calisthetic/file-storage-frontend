import { motion } from "framer-motion"
import {
  Routes,
  Route,
  Link,
} from "react-router-dom";
import SignIn from "./sign-in";
import SignUp from "./sign-up";
import Redirect from "../../components/redirect";

export default function AuthPage() {
  // Logos
  let mainLogo: string | undefined = undefined;

  try {
    mainLogo = require("./../../icons/logo.png") as string;
  } catch (error) {
    console.log(error)
  }

  return (
    <div className="bg-backgroundLight h-full dark:bg-backgroundDark">
      <nav className="fixed top-0 z-40 w-full bg-backgroundLight dark:bg-backgroundDark">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <Link to="/" className="flex ml-2 md:mr-24">
                <motion.img src={mainLogo} className="h-8 w-8 mr-3" alt="Logo"
                initial={{opacity: 0}} 
                animate={{opacity:1 }} 
                transition={{delay: 0.5}}/>
                <motion.span 
                initial={{opacity: 0, marginLeft: 20}} 
                animate={{opacity:1, marginLeft: 0}} 
                transition={{delay: 0.7}} 
                className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-textDark text-textLight">Storage</motion.span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className=" bg-backgroundSecondaryLight dark:bg-backgroundSecondaryDark p-4 h-full rounded-tl-2xl mt-14">
        <Routes>
          <Route path="/" element={<Redirect location="./signin"></Redirect>}></Route>
          <Route path="signin" element={<SignIn></SignIn>}></Route>
          <Route path="signup" element={<SignUp></SignUp>}></Route>
        </Routes>
      </div>
    </div>
  )
}