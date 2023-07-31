import { Component} from 'react';
import {
  useParams
} from "react-router-dom";

export default function DiskFolder() {
  const params: any = useParams();
  if (params.id === undefined) {
    window.location.replace("./folder/main")
  }
  
  return (
    <div>folder {params.id}</div>
  )
}