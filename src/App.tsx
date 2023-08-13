import { Routes, Route, } from "react-router-dom";
import Layout from './layout';
import Disk from './routes/disk/disk';
import AuthPage from './routes/auth/auth';
import Redirect from "./components/redirect";

function App() {
  interface StyleObject {
    name: string;
    value: string;
  }

  // Colors from localstorage
  let isCustomizable:boolean = true
  if (isCustomizable) {
    let colors_value:string | null = localStorage.getItem("colors")
    if (colors_value !== null) {
      let colors:StyleObject[] = JSON.parse(colors_value)
      colors.forEach(x => {
        document.documentElement.style
          .setProperty('--' + x.name, x.value);
      });
    }
  }

  return (
    <div id="custom-root">
      <Routes>
        <Route path='/' element={<Layout></Layout>}></Route>
        <Route path='auth/*' element={<AuthPage></AuthPage>}></Route>
        <Route path='*' element={<Redirect location="/"></Redirect>}></Route>
        <Route path='disk/*' element={<Disk></Disk>}></Route>
      </Routes>
    </div>
  );
}

export default App;
