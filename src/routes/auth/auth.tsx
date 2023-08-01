import { Routes, Route, } from "react-router-dom";
import SignIn from "./signin/signin";
import SignUp from "./signup/signup";
import Redirect from "../../components/redirect";
import NoPassword from "./nopassword/nopassword";

export default function AuthPage() {
  let mainLogo: string | undefined = undefined;

  try {
    mainLogo = require("./../../icons/logo.png") as string;
  } catch (error) {
    console.log(error)
  }

  return (
    <div className="bg-backgroundLight min-h-fulldvh dark:bg-backgroundDark">
      <Routes>
        <Route path="*" element={<Redirect location="/auth/signin"></Redirect>}></Route>
        <Route path="/" element={<Redirect location="/auth/signin"></Redirect>}></Route>
        <Route path="signin" element={<SignIn></SignIn>}></Route>
        <Route path="signup" element={<SignUp></SignUp>}></Route>
        <Route path="nopassword" element={<NoPassword></NoPassword>}></Route>
      </Routes>
    </div>
  )
}