import { Suspense, lazy } from "react";
import { Routes, Route, } from "react-router-dom";
import Redirect from "../../components/redirect";
const SignIn = lazy(() => import("./signin/signin"));
const SignUp = lazy(() => import("./signup/signup"));
const NoPassword = lazy(() => import("./nopassword/nopassword"));

export default function AuthMain() {

  return (
    <div className="bg-backgroundLight min-h-fulldvh dark:bg-backgroundDark">
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path="*" element={<Redirect location="/auth/signin"></Redirect>}></Route>
          <Route path="/" element={<Redirect location="/auth/signin"></Redirect>}></Route>
          <Route path="signin" element={<SignIn></SignIn>}></Route>
          <Route path="signup" element={<SignUp></SignUp>}></Route>
          <Route path="nopassword" element={<NoPassword></NoPassword>}></Route>
        </Routes>
      </Suspense>
    </div>
  )
}