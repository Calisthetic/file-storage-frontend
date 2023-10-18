import { FunctionComponent, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingComponent from "../../components/loading-component";
import PageNotFound from "../../page-not-found";
import VerifyUser from "./user/verify-user";
import VerifyEmail from "./email/verify-email";
 
const Verify: FunctionComponent = () => {
  return (
    <Suspense fallback={<LoadingComponent></LoadingComponent>}>
      <Routes>
        <Route path='user/:id' element={<VerifyUser></VerifyUser>}></Route>
        <Route path='email/:id' element={<VerifyEmail></VerifyEmail>}></Route>
        <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </Suspense>
  );
}
 
export default Verify;