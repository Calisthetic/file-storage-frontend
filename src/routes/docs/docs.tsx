import { FunctionComponent, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const NavBar = lazy(() =>  import("../../components/nav-bar"));
const DocsCode = lazy(() =>  import("./code/docs-code"));
const LoadingComponent = lazy(() =>  import("../../components/loading-component"));
const PageNotFound = lazy(() =>  import("../../page-not-found"));
const DocsMain = lazy(() =>  import("./docs-main"));
const DocsHelp = lazy(() =>  import("./help/docs-help"));

const Docs: FunctionComponent = () => {
  return (
    <div className="!min-h-[100vh]">
      <Suspense fallback={<LoadingComponent></LoadingComponent>}>
        <NavBar></NavBar>
      </Suspense>

      <div className="pt-14 transition-transform text-textLight dark:text-textDark text-lg">
        <div className="bg-backgroundSecondLight overflow-x-hidden dark:bg-backgroundSecondDark min-h-fullWithHeader">
          <Suspense fallback={<LoadingComponent></LoadingComponent>}>
            <Routes>
              <Route path='/code' element={<DocsCode></DocsCode>}></Route>
              <Route path='/help' element={<DocsHelp></DocsHelp>}></Route>
              <Route path='/' element={<DocsMain></DocsMain>}></Route>
              <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
 
export default Docs;