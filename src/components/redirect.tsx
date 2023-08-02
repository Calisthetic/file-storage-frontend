import { Component} from 'react';

// export default function Redirect(props: any) {
//   window.location.replace(props.location)

//   return (
//     <div></div>
//   )
// }

type Props = {
  location:string
}

export default function Redirect({location}: Props) {
  window.location.replace(location)

  return (
    <div></div>
  )
}