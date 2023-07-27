import React from 'react';
import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import Root from './routes/root';
import ErrorPage from './error-page';
import Layout from './layout';
import Disk from './routes/disk';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout></Layout>}>
        </Route>
          <Route path='s' element={<Root></Root>}></Route>
          <Route path='*' element={<ErrorPage></ErrorPage>}></Route>
          <Route path='disk/*' element={<Disk></Disk>}>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
