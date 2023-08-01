import { Routes, Route, } from "react-router-dom";
import ErrorPage from './page-not-found';
import Layout from './layout';
import Disk from './routes/disk/disk';
import AuthPage from './routes/auth/auth';

function App() {
  interface StyleObject {
    name: string;
    value: string;
  }

  // Colors from localstorage
  let isCustonizable:boolean = true
  if (isCustonizable) {
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
    <Routes>
      <Route path='/' element={<Layout></Layout>}></Route>
      <Route path='auth/*' element={<AuthPage></AuthPage>}></Route>
      <Route path='*' element={<ErrorPage></ErrorPage>}></Route>
      <Route path='disk/*' element={<Disk></Disk>}></Route>
    </Routes>
  );
}

export default App;
