import React from 'react';
import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import Root from './routes/root';
import ErrorPage from './page-not-found';
import Layout from './layout';
import Disk from './routes/disk/disk';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout></Layout>}></Route>
      <Route path='s' element={<Root></Root>}></Route>
      <Route path='*' element={<ErrorPage></ErrorPage>}></Route>
      <Route path='disk/*' element={<Disk></Disk>}></Route>
    </Routes>
  );
}

export default App;
