import { Component} from 'react';

export default function Redirect(props: any) {
  window.location.replace(props.location)

  return (
    <div></div>
  )
}