import { Routes, Route, } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "./components/loading";
const Layout = lazy(() => import('./layout'));
const Redirect = lazy(() => import("./components/redirect"));
const DiskMain = lazy(() => import('./routes/disk/disk'));
const AuthMain = lazy(() => import('./routes/auth/auth'));
const UserMain = lazy(() => import("./routes/user/user"));

function App() {
  interface StyleObject {
    name: string;
    value: string;
  }

  // Colors from localstorage
  let isCustomizable:boolean = true
  if (isCustomizable) {
    let colorsValue:string | null = localStorage.getItem("colors")
    if (colorsValue !== null) {
      let colors:StyleObject[] = JSON.parse(colorsValue)
      colors.forEach(x => {
        document.documentElement.style
          .setProperty('--' + x.name, x.value);
      });
    }

    let fontLink = document.getElementById("GoogleFontsLink") as HTMLLinkElement
    let fontValue = localStorage.getItem("font")
    if (fontLink && fontValue) {
      fontLink.href = "https://fonts.googleapis.com/css?family=" + fontValue
    }
  }

  // Set theme
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  return (
    <div id="custom-root" style={{fontFamily: localStorage.getItem("font")?.toString()}}>
      <Suspense fallback={<Loading></Loading>}>
        <Routes>
          <Route path='/' element={<Layout></Layout>}></Route>
          <Route path='auth/*' element={<AuthMain></AuthMain>}></Route>
          <Route path='*' element={<Redirect location="/"></Redirect>}></Route>
          <Route path='disk/*' element={<DiskMain></DiskMain>}></Route>
          <Route path='user/*' element={<UserMain></UserMain>}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
