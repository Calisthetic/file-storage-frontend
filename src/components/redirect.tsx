import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()
  useEffect(() => {
    navigate(location)
  }, [navigate, location])

  return (
    <div></div>
  )
}