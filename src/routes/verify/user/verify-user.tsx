import { FunctionComponent, memo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/loading";
import { apiUrl } from "../../../data/data";
import { CheckForError } from "../../../lib/check-errors";
 
const VerifyUser: FunctionComponent = memo(() => {
  const navigate = useNavigate()
  const params = useParams()
  const [statusCode, setStatusCode] = useState<number>()

  fetch(apiUrl + "auth/verify/" + params.id, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((res) => {
    setStatusCode(res.status)
    CheckForError(res.status)
    return res.json();
  })
  .then(data => {localStorage.setItem("token", data.token); navigate("/disk/folder/main")})
  .catch(() => {
    if (statusCode === undefined)
      setStatusCode(500)
  })

  return statusCode === undefined ? (
    <div className="flex items-center justify-center h-[100dvh] w-[100dvw]">
      <Loading></Loading>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-[100dvh] w-[100dvw]">
      <img className="max-w-xs max-h-xs min-w-xs min-h-xs rounded-lg"
      src={"https://http.cat/" + statusCode} alt="meme"></img>
      <div className="flex mt-4 gap-x-2">
        <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm 
        transition-colors border border-borderLight dark:border-borderDark rounded-lg 
        gap-x-2 sm:w-auto bg-backgroundThirdLight dark:bg-backgroundThirdDark
        hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark font-medium"
        onClick={() => navigate("/auth/signup")}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
          <span>Back to sign up</span>
        </button>
        <button className="w-1/2 px-5 py-2 text-sm tracking-wide transition-colors rounded-lg shrink-0 sm:w-auto
        bg-buttonLight dark:bg-buttonDark hover:bg-buttonHoverLight hover:dark:bg-buttonHoverDark font-medium text-textDark"
        onClick={() => navigate("/welcome")}>
          Take me home
        </button>
      </div>
    </div>
  );
})
 
export default VerifyUser;