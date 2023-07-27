import { Component} from 'react';
import {
  useParams
} from "react-router-dom";

export default function DiskFolder() {
  const params: any = useParams();
  return (
    <div>folder {params.id}</div>
  )
}