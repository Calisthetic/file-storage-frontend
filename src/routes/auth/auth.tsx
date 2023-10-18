import { Suspense, lazy } from "react";
import { Routes, Route, } from "react-router-dom";
import Redirect from "../../components/redirect";
import LoadingComponent from "../../components/loading-component";

const SignIn = lazy(() => import("./signin/signin"));
const SignUp = lazy(() => import("./signup/signup"));
const NoPassword = lazy(() => import("./nopassword/nopassword"));

export default function AuthMain() {

  return (
    <div className="bg-backgroundLight !min-h-[100dvh] dark:bg-backgroundDark">
      <Suspense fallback={<LoadingComponent></LoadingComponent>}>
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