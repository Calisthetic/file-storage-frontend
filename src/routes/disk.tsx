import { Component} from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import DiskRecent from './disk-recent';

export default function Disk() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<div>usual disk</div>}></Route>
        <Route path='recent' element={<DiskRecent></DiskRecent>}></Route>
      </Routes>
    </div>
  )
}