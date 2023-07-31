import { Routes, Route, } from "react-router-dom";
import ErrorPage from './page-not-found';
import Layout from './layout';
import Disk from './routes/disk/disk';
import AuthPage from './routes/auth/auth';

function App() {
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
