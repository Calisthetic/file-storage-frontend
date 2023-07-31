import { motion } from "framer-motion"
import {
  Routes,
  Route,
  Link,
} from "react-router-dom";
import SignIn from "./signin/signin";
import SignUp from "./signup/signup";
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
    <div className="bg-backgroundLight min-h-fulldvh flex justify-center items-center dark:bg-backgroundDark">
      <div className=" bg-backgroundSecondaryLight dark:bg-backgroundSecondaryDark h-full rounded-tl-2xl">
        <Routes>
          <Route path="/" element={<Redirect location="./auth/signin"></Redirect>}></Route>
          <Route path="signin" element={<SignIn></SignIn>}></Route>
          <Route path="signup" element={<SignUp></SignUp>}></Route>
        </Routes>
      </div>
    </div>
  )
}