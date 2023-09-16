import { useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { selfUrl } from "../../../data/data"
import IconLink from "../../../components/icons/IconLink"
import IconAlerts from "../../../components/icons/IconAlerts"

type Props = {
  children:string | JSX.Element | JSX.Element[]
  folderId:number
  folderName:string
  folderCurrentAccess:string | null
  folderToken:string
}
export default function FolderAccessModal({children, folderId, folderName, folderCurrentAccess, folderToken}: Props) {
  const [currentPage, setCurrentPage] = useState("default")

  // Default access
  const [isFolderPublic, setIsFolderPublic] = useState(folderCurrentAccess !== undefined)
  const [currentAccessType, setCurrentAccessType] = useState(folderCurrentAccess)

  const [isRolesMenuOpen, setIsRolesMenuOpen] = useState(false)

  // Notifications
  const [isCopied, setIsCopied] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isWarning, setIsWarning] = useState(false)
  const [warningText, setWarningText] = useState<string>("Something went wrong")

  function OpenAlert(type:string) {
    setIsCopied(false)
    setIsError(false)
    setIsWarning(false)

    setTimeout(() => {
      if (type === "copied") {
        setIsCopied(true)
      } else if (type === "error") {
        setIsError(true)
      } else if (type === "warning") {
        setIsWarning(true)
      }
    }, 100);
  }


  function CopyText(token:string | undefined | null) {
    if (token) {
      navigator.clipboard.writeText(selfUrl + "disk/folder/" + token);
      OpenAlert("copied")
    }
  }

  function CopyButtonClick() {
    if (currentPage === "default") {
      CopyText(folderToken)
    } else {
      if (generatedToken !== null) {
        GenerateToken()
      }
    }
  }


  // Generate new url
  const [generatedToken, setGeneratedToken] = useState<string | undefined | null>()

  const newUrlPasswordRef:any = useRef()
  const inputTimeMonthsRef:any = useRef()
  const inputTimeDaysRef:any = useRef()
  const inputTimeHoursRef:any = useRef()

  // Increment/decrement click functions
  const SubtractMonths = () => {
    inputTimeMonthsRef.current.value = parseInt(inputTimeMonthsRef.current.value) <= 0 
      ? 12 : parseInt(inputTimeMonthsRef.current.value) - 1
  }
  const AddMonths = () => {
    inputTimeMonthsRef.current.value = parseInt(inputTimeMonthsRef.current.value) >= 12 
      ? 0 : parseInt(inputTimeMonthsRef.current.value) + 1
  }

  const SubtractDays = () => {
    let currentValue = parseInt(inputTimeDaysRef.current.value)
    if (currentValue === 0 && inputTimeMonthsRef.current.value > 0) {
      SubtractMonths()
    }
    inputTimeDaysRef.current.value = currentValue <= 0 ? 30 : currentValue - 1
  }
  const AddDays = () => {
    let currentValue = parseInt(inputTimeDaysRef.current.value)
    if (currentValue === 30) {
      AddMonths()
    }
    inputTimeDaysRef.current.value = currentValue >= 30 ? 0 : currentValue + 1
  }

  const SubtractHours = () => {
    let currentValue = parseInt(inputTimeHoursRef.current.value)
    if (currentValue === 0 && inputTimeDaysRef.current.value > 0) {
      SubtractDays()
    }
    inputTimeHoursRef.current.value = currentValue <= 0 ? 24 : currentValue - 1
  }
  const AddHours = () => {
    let currentValue = parseInt(inputTimeHoursRef.current.value)
    if (currentValue === 24) {
      AddDays()
    }
    inputTimeHoursRef.current.value = currentValue >= 24 ? 0 : currentValue + 1
  }

  function ClearExpirationTime() {
    inputTimeMonthsRef.current.value = 0
    inputTimeDaysRef.current.value = 0
    inputTimeHoursRef.current.value = 0
  }

  // Generate request
  function GenerateToken() {
    // Data check
    if (inputTimeMonthsRef.current.value < 0 
    || inputTimeDaysRef.current.value < 0
    || inputTimeHoursRef.current.value < 0) {
      setWarningText("Number cannot be negative")
      OpenAlert("warning")
      return
    } else if (inputTimeMonthsRef.current.value > 12) {
      setWarningText("The number of months is too long")
      OpenAlert("warning")
      return
    } else if (inputTimeDaysRef.current.value > 31) {
      setWarningText("The number of days is too long")
      OpenAlert("warning")
      return
    } else if (inputTimeHoursRef.current.value > 24) {
      setWarningText("The number of hours is too long")
      OpenAlert("warning")
      return
    }

    setGeneratedToken(null)
    let newToken = "dksdskdlsk"
    // Request
    setTimeout(() => {
      setGeneratedToken(newToken)
      //CopyText(newToken)
      setIsError(true)
    }, 1000);
  }

  return (
    <div className="text-textLight dark:text-textDark rounded-2xl max-h-fulldvh overflow-x-hidden
    bg-backgroundLight dark:bg-backgroundDark p-4 min-w-xs max-w-3xl xl:w-[728px] overflow-y-auto"
    onClick={(e:any) => {if (e.target.dataset.name === undefined) {setIsRolesMenuOpen(false)}}}>
      <div className="font-medium text-center text-xl md:col-span-2">{"Share - " + folderName}</div>
      {/* Warning */}
      <div className="flex flex-col md:flex-row w-full gap-x-2">
        <div className="bg-backgroundSecondLight dark:bg-backgroundSecondDark rounded-md
        grid grid-cols-alerts mt-2 p-2 items-center gap-x-2 w-full">
          <svg fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7">
            <path d="M17 9a8 8 0 1 0-6.278 7.814 5.932 5.932 0 0 1-.388-.94 7 7 0 1 1 
            5.64-7.474l.032.03c.2.209.399.387.597.537.131.1.263.186.394.263.002-.077.003-.153.003-.23Z" 
            className="fill-warning"></path>
            <path d="M9.049 5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5ZM9 7.5a.5.5 0 0 1 
            .492.41L9.5 8v4.502a.5.5 0 0 1-.992.09l-.008-.09V8a.5.5 0 0 1 .5-.5ZM17 
            10.347a4.632 4.632 0 0 1-1-.583 6.055 6.055 0 0 1-.716-.642.389.389 0 0 
            0-.566 0c-.995 1.036-2.095 1.545-3.318 1.545-.22 
            0-.4.186-.4.416v2.501l.004.266c.027.797.174 1.514.44 2.15A4.813 4.813 0 0 0 13 
            18c.524.4 1.15.727 1.874.979.083.028.171.028.254 0 2.56-.89 3.873-2.713 
            3.873-5.395v-2.5l-.008-.085a.405.405 0 0 0-.392-.332 4.057 4.057 0 0 1-1.6-.32Z" 
            className="fill-warning"></path>
          </svg>
          <div>
            {currentPage === "default" ? (
              "Everyone who has the link will be able to view and download all the content inside the current folder"
            ) : (
              "Access to the content inside of the current folder will depend on your settings"
            )}
          </div>
        </div>
        {/* Back button */}
        {currentPage !== "default" ? (
          <button className="mt-2 rounded-md p-1.5 transition-colors gap-x-2 w-full md:max-w-[80px]
          bg-backgroundLight dark:bg-backgroundDark flex flex-row items-center justify-center
          hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark
          border border-borderLight dark:border-borderDark font-medium"
          onClick={() => {setCurrentPage("default")}}>
            <span>Back</span>
          </button>
        ) : null}
      </div>
      {currentPage === "default" ? (
        <>
          <AnimatePresence>
            {isFolderPublic ? (
              <div className="bg-backgroundSecondLight dark:bg-backgroundSecondDark rounded-md p-1.5
              flex flex-row mt-2 items-center relative">
                {/* Open icon */}
                <button onClick={() => {setCurrentAccessType(null); setIsFolderPublic(false); }}
                className="bg-backgroundThirdLight dark:bg-backgroundThirdDark 
                rounded-md transition-colors
                hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark mr-1.5">
                  <motion.div initial={{opacity: 0.4}} animate={{opacity: 1}}>
                    <svg viewBox="0 0 1262 1710.258" xmlns="http://www.w3.org/2000/svg" 
                    enableBackground="new 0 0 1262 1710.258" className="w-8 h-8 p-1.5">
                      <path d="M1196.495 713.258H1090V459.592C1090 206.307 
                      884.397.242 631.198.242c-253.198 0-458.994 206.2-458.994 459.649 
                      0 36.494 29.678 66.071 66.168 66.071 36.491 0 66.119-29.577 
                      66.119-66.071 0-180.588 146.418-327.508 326.753-327.508C811.58 
                      132.384 958 279.168 958 459.592v253.666H66.686C30.195 713.258 0 
                      742.241 0 778.731v766.42c0 91.079 74.712 165.106 165.792 
                      165.106h931.597c91.08 0 164.611-74.027 
                      164.611-165.106v-766.42c0-36.49-29.015-65.473-65.505-65.473zM1130 
                      1545.151c0 18.218-14.395 33.106-32.611 33.106H165.792c-18.216 
                      0-33.792-14.889-33.792-33.106V845.258h998v699.893z" 
                      className="fill-success"></path>
                      <path d="M631 1409.707c36.491 0 
                      66-29.58 66-66.071v-237.854c0-36.49-29.51-66.07-66-66.07-36.49 
                      0-66 29.58-66 66.07v237.854c0 36.491 29.509 66.071 66 66.071z" 
                      className="fill-success"></path>
                    </svg>
                  </motion.div>
                </button>
                {/* Dropdown roles */}
                <div>
                  <motion.button initial={{opacity: 0}} animate={{opacity: 1}}
                  transition={{stiffness: 200, damping: 24}} exit={{opacity: 0}} 
                  data-name="dropdown-button" onClick={() => {setIsRolesMenuOpen(!isRolesMenuOpen)}}
                  className="bg-backgroundThirdLight dark:bg-backgroundThirdDark
                  rounded-md transition-colors flex flex-row items-center h-8 px-2 font-medium
                  hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark mr-2">
                    <span className=" first-letter:uppercase pointer-events-none">
                      {currentAccessType}
                    </span>
                    <svg className="w-2.5 h-2.5 ml-1.5" aria-hidden="true" 
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path className="stroke-textLight dark:stroke-textDark" strokeLinecap="round" 
                      strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                  </motion.button>
                  {/* Dropdown himself */}
                  <AnimatePresence>
                    {isRolesMenuOpen === true ? (
                      <motion.div initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}}
                      transition={{stiffness: 200, damping: 24, duration: 0.1}} exit={{opacity: 0, y: -20}} 
                      className="absolute bg-backgroundThirdLight dark:bg-backgroundThirdDark
                      rounded-md transition-colors flex flex-col text-lg mt-1 overflow-hidden
                      shadow-defaultLight dark:shadow-none z-20">
                        <button data-name="editor" onClick={() => {setCurrentAccessType("editor")}}
                        className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark 
                        pl-2 pr-8 transition-colors flex flex-row items-center gap-2 py-0.5
                        border-borderLight dark:border-borderDark">
                          <div className="h-4 w-4 pointer-events-none">
                            <AnimatePresence>
                              {currentAccessType === "editor" ? (
                                <motion.svg initial={{x: -50}} animate={{x: 0}} exit={{x: -50}}
                                transition={{damping: 24, stiffness: 300, duration: 0.25}}
                                viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 absolute">
                                  <path d="M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 
                                  416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32 
                                  8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4c6.2-6.27 14.4-9.4 22.6-9.4 17.1 0 
                                  32 13.7 32 32z" className=" fill-iconLight dark:fill-iconDark"></path>
                                </motion.svg>
                              ) : null}
                            </AnimatePresence>
                          </div>
                          <span className="pointer-events-none">Editor</span>
                        </button>
                        <button data-name="editor" onClick={() => {setCurrentAccessType("reader")}}
                        className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark 
                        pl-2 pr-8 transition-colors flex flex-row items-center gap-2 py-0.5
                        border-borderLight dark:border-borderDark">
                          <div className="h-4 w-4 pointer-events-none">
                            <AnimatePresence>
                              {currentAccessType === "reader" ? (
                                <motion.svg initial={{x: -50}} animate={{x: 0}} exit={{x: -50}}
                                transition={{damping: 24, stiffness: 300, duration: 0.25}}
                                viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 absolute">
                                  <path d="M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 
                                  416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32 
                                  8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4c6.2-6.27 14.4-9.4 22.6-9.4 17.1 0 
                                  32 13.7 32 32z" className=" fill-iconLight dark:fill-iconDark"></path>
                                </motion.svg>
                              ) : null}
                            </AnimatePresence>
                          </div>
                          <span className="pointer-events-none">Reader</span>
                        </button>
                        <button data-name="editor" onClick={() => {setCurrentAccessType("guest")}}
                        className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark 
                        pl-2 pr-8 transition-colors flex flex-row items-center gap-2 py-0.5
                        border-borderLight dark:border-borderDark">
                          <div className="h-4 w-4 pointer-events-none">
                            <AnimatePresence>
                              {currentAccessType === "guest" ? (
                                <motion.svg initial={{x: -50}} animate={{x: 0}} exit={{x: -50}}
                                transition={{damping: 24, stiffness: 300, duration: 0.25}}
                                viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 absolute">
                                  <path d="M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 
                                  416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32 
                                  8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4c6.2-6.27 14.4-9.4 22.6-9.4 17.1 0 
                                  32 13.7 32 32z" className=" fill-iconLight dark:fill-iconDark"></path>
                                </motion.svg>
                              ) : null}
                            </AnimatePresence>
                          </div>
                          <span className="pointer-events-none">Guest</span>
                        </button>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
                {/* Role description */}
                <div>
                  {currentAccessType === "editor" ? (
                    <motion.p initial={{opacity: 0, x: 40}} animate={{opacity: 1, x: 0}}
                    transition={{stiffness: 200, damping: 24}} exit={{opacity: 0, x: -40}}>
                      Anyone with this link can edit content inside this folder (sign-in required)
                    </motion.p>
                  ) : currentAccessType === "reader" ? (
                    <motion.section initial={{opacity: 0, x: 40}} animate={{opacity: 1, x: 0}}
                    transition={{stiffness: 200, damping: 24}} exit={{opacity: 0, x: -40}}>
                      Anyone with this link can watch and download content inside this folder (sign-in required)
                    </motion.section>
                  ) : ( // guest
                    <motion.div initial={{opacity: 0, x: 40}} animate={{opacity: 1, x: 0}}
                    transition={{stiffness: 200, damping: 24}} exit={{opacity: 0, x: -40}}>
                      Anyone with this link can watch and download content inside this folder (doesn't affect stats)
                    </motion.div>
                  )}
                </div>
              </div>
            ) : (
              // Private
              <div className="bg-backgroundSecondLight dark:bg-backgroundSecondDark rounded-md p-1.5
              flex flex-row mt-2 items-center">
                <button onClick={() => {setCurrentAccessType("guest"); setIsFolderPublic(true);}}
                className="bg-backgroundThirdLight dark:bg-backgroundThirdDark 
                rounded-md transition-colors
                hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark mr-2">
                  <motion.section initial={{opacity: 0.4}} animate={{opacity: 1}}>
                    <svg viewBox="0 0 1262 1710.258" xmlns="http://www.w3.org/2000/svg" 
                    enableBackground="new 0 0 1262 1710.258" className="w-8 h-8 p-1.5">
                      <path d="M1196.495 713.258H1090V459.592C1090 206.307 884.198.242 630.999.242 
                      377.799.242 172 206.442 172 459.892v253.366H66.686C30.195 713.258 0 742.241 
                      0 778.731v766.42c0 91.079 74.712 165.106 165.792 165.106h931.597c91.08 0 
                      164.611-74.027 164.611-165.106v-766.42c0-36.49-29.015-65.473-65.505-65.473zM304 
                      459.892c0-180.588 146.664-327.508 326.999-327.508C811.335 132.384 958 279.168 
                      958 459.592v253.666H304V459.892zm826 1085.259c0 18.218-14.395 33.106-32.611 
                      33.106H165.792c-18.216 0-33.792-14.889-33.792-33.106V845.258h998v699.893z" 
                      className="fill-error"></path>
                      <path d="M631 1409.707c36.491 0 66-29.58 
                      66-66.071v-237.854c0-36.49-29.51-66.07-66-66.07-36.49 0-66 29.58-66 
                      66.07v237.854c0 36.491 29.509 66.071 66 66.071z"
                      className="fill-error"></path>
                    </svg>
                  </motion.section>
                </button>
                <div>
                  <motion.p initial={{opacity: 0, x: 40}} animate={{opacity: 1, x: 0}}
                    transition={{stiffness: 200, damping: 24}} exit={{opacity: 0, x: -40}}
                  className="font-semibold">Access is limited</motion.p>
                </div>
              </div>
            )}
          </AnimatePresence>
          <button className="bg-backgroundSecondLight dark:bg-backgroundSecondDark rounded-md p-1.5
          grid grid-cols-alerts mt-2 items-center relative gap-x-2 w-full transition-colors
          hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark" onClick={() => {setCurrentPage("generate")}}>
            {/* Shield */}
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" 
            className="fill-[url(#ShieldGradient)] h-6 w-6 m-0.5">
              <defs>
                <linearGradient id="ShieldGradient" gradientTransform="rotate(30)">
                  <stop offset="0%" stopColor="#e22a3c"></stop>
                  <stop offset="80%" stopColor="#9333EA"></stop>
                  <stop offset="100%" stopColor="#3875db"></stop>
                </linearGradient>
              </defs>
              <path d="M496 127.1C496 381.3 309.1 512 255.1 512C204.9 512 16 385.3 16 
              127.1c0-19.41 11.7-36.89 29.61-44.28l191.1-80.01c4.906-2.031 13.13-3.701 
              18.44-3.701c5.281 0 13.58 1.67 18.46 3.701l192 80.01C484.3 91.1 496 108.6 496 127.1z"/>
            </svg>
            <p className="text-left">Generate a link with the ability to set a password, expiration time and disable downloads</p>
          </button>
        </>
      ) : ( // generate
        <>
          {/* password */}
          <div className="bg-backgroundSecondLight dark:bg-backgroundSecondDark rounded-md
          flex flex-row mt-2 items-center relative gap-x-2">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 absolute translate-x-1.5">
              <path d="M21 2a8.998 8.998 0 0 0-8.612 11.612L2 24v6h6l10.388-10.388A9 
              9 0 1 0 21 2Zm0 16a7.013 7.013 0 0 1-2.032-.302l-1.147-.348-.847.847-3.181 
              3.181L12.414 20 11 21.414l1.379 1.379-1.586 1.586L9.414 23 8 24.414l1.379 
              1.379L7.172 28H4v-3.172l9.802-9.802.848-.847-.348-1.147A7 7 0 1 1 21 18Z" 
              className="fill-iconLight dark:fill-iconDark"></path>
              <circle cx="22" cy="10" r="2" className="fill-iconLight dark:fill-iconDark"></circle>
              <path d="M0 0h32v32H0z" fill="none"></path>
            </svg>
            <input className="w-full border-borderLight dark:border-borderDark 
            text-textLight text-sm rounded-lg block focus:outline-none 
            bg-backgroundSecondLight dark:bg-backgroundSecondDark
            dark:text-textDark py-2.5 pl-11 pr-9"
            type="text" placeholder="Folder's password..." ref={newUrlPasswordRef}/>
            <button className=" absolute left-full group -translate-x-10 p-1.5 rounded-md" 
            title="Clear password" onClick={() => {newUrlPasswordRef.current.value = ""}}>
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7">
                <path d="m7 7 18 18M7 25 25 7" fill="none" strokeLinecap="round" 
                strokeLinejoin="round" strokeWidth="3px"
                className="stroke-iconLight dark:stroke-iconDark transition-colors
                group-hover:stroke-buttonHoverLight group-hover:dark:to-buttonHoverDark"></path>
              </svg>
            </button>
          </div>
          {/* time */}
          <div className="bg-backgroundSecondLight dark:bg-backgroundSecondDark rounded-md p-1.5
          flex flex-row mt-2 items-start gap-x-2">
            <div className="p-1 absolute md:static md:flex items-center justify-center">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"><g data-name="22.time">
                <circle cx="12" cy="12" r="11" fill="none" 
                className="stroke-iconLight dark:stroke-iconDark" 
                strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px"></circle>
                <path d="M12 6v6l4 4" fill="none" 
                className="stroke-iconLight dark:stroke-iconDark" strokeLinecap="round" 
                strokeLinejoin="round" strokeWidth="2px"></path></g>
              </svg>
            </div>
            {/* w-92 MDH */}
            <div className="flex flex-row-reverse md:flex-row lg:flex-col gap-x-2">
              <div className="w-min flex flex-col lg:flex-row lg:gap-x-2">
                <div>
                  <p className="text-center font-medium">Months</p>
                  <div className="flex flex-row font-semibold">
                    <button className="w-7 bg-backgroundThirdLight dark:bg-backgroundThirdDark
                    hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark transition-colors
                    text-lg border-r border-borderLight dark:border-borderDark"
                    onClick={SubtractMonths}>-</button>
                    <input className="w-9 text-sm block focus:outline-none
                    bg-backgroundThirdLight dark:bg-backgroundThirdDark
                    dark:text-textDark text-textLight py-1 text-center"
                    type="number" placeholder="0" ref={inputTimeMonthsRef}
                    max="2" min="0" maxLength={2} defaultValue={0}/>
                    <button className="w-7 bg-backgroundThirdLight dark:bg-backgroundThirdDark
                    hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark transition-colors
                    text-lg border-l border-borderLight dark:border-borderDark"
                    onClick={AddMonths}>+</button>
                  </div>
                </div>
                <div>
                  <p className="text-center font-medium">Days</p>
                  <div className="flex flex-row font-semibold">
                    <button className="w-7 bg-backgroundThirdLight dark:bg-backgroundThirdDark
                    hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark transition-colors
                    text-lg border-r border-borderLight dark:border-borderDark"
                    onClick={SubtractDays}>-</button>
                    <input className="w-9 text-sm block focus:outline-none
                    bg-backgroundThirdLight dark:bg-backgroundThirdDark
                    dark:text-textDark text-textLight py-1 text-center"
                    type="number" placeholder="0" ref={inputTimeDaysRef}
                    max="2" min="0" maxLength={2} defaultValue={0}/>
                    <button className="w-7 bg-backgroundThirdLight dark:bg-backgroundThirdDark
                    hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark transition-colors
                    text-lg border-l border-borderLight dark:border-borderDark"
                    onClick={AddDays}>+</button>
                  </div>
                </div>
                <div>
                  <p className="text-center font-medium">Hours</p>
                  <div className="flex flex-row font-semibold">
                    <button className="w-7 bg-backgroundThirdLight dark:bg-backgroundThirdDark
                    hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark transition-colors
                    text-lg border-r border-borderLight dark:border-borderDark"
                    onClick={SubtractHours}>-</button>
                    <input className="w-9 text-sm block focus:outline-none
                    bg-backgroundThirdLight dark:bg-backgroundThirdDark
                    dark:text-textDark text-textLight py-1 text-center"
                    type="number" placeholder="0" ref={inputTimeHoursRef}
                    max="2" min="0" maxLength={2} defaultValue={0}/>
                    <button className="w-7 bg-backgroundThirdLight dark:bg-backgroundThirdDark
                    hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark transition-colors
                    text-lg border-l border-borderLight dark:border-borderDark"
                    onClick={AddHours}>+</button>
                  </div>
                </div>
              </div>
              <div>
                <p className="indent-8 md:indent-0 mt-0.5 text-justify">
                  <span>Set link expiration time. </span>
                  <span>After the expiration date, the link will be unavailable. </span>
                </p>
                <p>
                  <span>Leave the fields 
                    <button className="mx-1 underline text-buttonLight dark:text-buttonDark
                    hover:text-buttonHoverLight hover:dark:text-buttonHoverDark transition-colors"
                    onClick={ClearExpirationTime}>blank</button> 
                  to clear the expiration time.</span>
                </p>
              </div>
            </div>
          </div>
          {/* download */}
          <div className="bg-backgroundSecondLight dark:bg-backgroundSecondDark rounded-md p-1.5
          flex flex-row mt-2 items-center relative gap-x-2">
            <div className="p-1 flex items-center justify-center">
              <svg className="stroke-iconLight dark:stroke-iconDark w-5 h-5" fill="none" 
              strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"></path>
              </svg>
            </div>
            <label className="relative inline-flex items-center mr-1 cursor-pointer">
              <input type="checkbox" defaultChecked={true} className="sr-only peer"/>
              <div className="w-9 h-5 rounded-full peer peer-checked:after:translate-x-full 
              bg-backgroundThirdLight dark:bg-backgroundThirdDark transition-colors
              after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
              after:bg-white after:border-gray-300 after:border after:rounded-full 
              after:h-4 after:w-4 after:transition-all border-borderLight dark:border-borderDark 
              peer-checked:bg-iconLight peer-checked:dark:bg-iconDark" title="Download files"></div>
            </label>
            <p>Allow downloads</p>
          </div>
          {/* can edit */}
          <div className="bg-backgroundSecondLight dark:bg-backgroundSecondDark rounded-md p-1.5
          flex flex-row mt-2 items-center relative gap-x-2">
            <div className="p-1 flex items-center justify-center">
              <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5">
                <path d="m402.3 344.9 32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 
                0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 
                1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 
                10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 
                43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174 402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 
                174zm64.8-79.7-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"
                className="fill-iconLight dark:fill-iconDark"></path>
              </svg>
            </div>
            <label className="relative inline-flex items-center mr-1 cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer"/>
              <div className="w-9 h-5 rounded-full peer peer-checked:after:translate-x-full 
              bg-backgroundThirdLight dark:bg-backgroundThirdDark transition-colors
              after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
              after:bg-white after:border-gray-300 after:border after:rounded-full 
              after:h-4 after:w-4 after:transition-all border-borderLight dark:border-borderDark 
              peer-checked:bg-iconLight peer-checked:dark:bg-iconDark" title="Edit permissions"></div>
            </label>
            <p>Edit permissions</p>
          </div>
          {/* auth required */}
          <div className="bg-backgroundSecondLight dark:bg-backgroundSecondDark rounded-md p-1.5
          flex flex-row mt-2 items-center relative gap-x-2">
            <div className="flex items-center justify-center">
              <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7">
                <path fill="none" d="M0 0h256v256H0z"></path>
                <path fill="none" strokeLinecap="round" className="stroke-iconLight dark:stroke-iconDark" 
                strokeLinejoin="round" strokeWidth="12" d="M152 112h40M152 144h40"></path>
                <circle cx="92.1" cy="120" fill="none" r="24" strokeLinecap="round" strokeLinejoin="round" 
                strokeWidth="12" className="stroke-iconLight dark:stroke-iconDark"></circle>
                <path d="M61.1 168a32 32 0 0 1 62 0" fill="none" strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="12" className="stroke-iconLight dark:stroke-iconDark"></path>
                <rect fill="none" height="160" rx="8" strokeLinecap="round" strokeLinejoin="round" 
                strokeWidth="12" width="192" x="32" y="48" className="stroke-iconLight dark:stroke-iconDark"></rect>
              </svg>
            </div>
            <label className="relative inline-flex items-center mr-1 cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer"/>
              <div className="w-9 h-5 rounded-full peer peer-checked:after:translate-x-full 
              bg-backgroundThirdLight dark:bg-backgroundThirdDark transition-colors
              after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
              after:bg-white after:border-gray-300 after:border after:rounded-full 
              after:h-4 after:w-4 after:transition-all border-borderLight dark:border-borderDark 
              peer-checked:bg-iconLight peer-checked:dark:bg-iconDark" title="Authentification required"></div>
            </label>
            <p>Require authorization</p>
          </div>
        </>
      )}
      {/* Buttons */}
      <div className="flex flex-row justify-between font-medium mt-4">
        <button className="flex flex-row items-center py-1 px-3 rounded-full
        border border-borderLight dark:border-borderDark transition-colors
        hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark"
        onClick={CopyButtonClick}>
          {generatedToken === null ? (
            <>
              <svg aria-hidden="true" role="status" className="w-4 h-4 animate-spin" 
              viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 
                78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 
                100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 
                91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 
                9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                className="fill-textLight dark:fill-textDark"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 
                28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 
                7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 
                0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 
                9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 
                10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 
                21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 
                38.2158 91.5421 39.6781 93.9676 39.0409Z"
                className="fill-textLight dark:fill-textDark"/>
              </svg>
              <span className="pointer-events-none ml-2">Loading...</span>
            </>
          ) : (
            <>
              <IconLink classes="h-5 w-5" fillClasses="fill-textLight dark:fill-textDark"></IconLink>
              <span className="pointer-events-none ml-2">Copy link</span>
            </>
          )}
        </button>
        {/* Close modal button */}
        {children}
      </div>

      {/* Successfully copied */}
      <AnimatePresence>
        {isCopied ? (
          <motion.button initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}}
          transition={{stiffness: 200, damping: 24, duration: 0.1}}
          onClick={(e:any) => {e.target.style.marginTop = "-40px"}}
          className="text-success rounded-2xl absolute
          bg-backgroundLight dark:bg-backgroundDark p-2 min-w-xs w-full -ml-4 mt-6 -z-10
          flex justify-center items-center font-medium transition-[margin]">
            <IconAlerts classes="h-4 w-4 mr-2" type="success"></IconAlerts>
            <span className="pointer-events-none">Copied</span>
          </motion.button>
        ) : null}
      </AnimatePresence>

      {/* Error alert */}
      <AnimatePresence>
        {isError ? (
          <motion.button initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}}
          transition={{stiffness: 200, damping: 24, duration: 0.1}}
          onClick={(e:any) => {e.target.style.marginTop = "-40px"; setTimeout(() => {
            setIsError(false)
          }, 100);}}
          className="text-error rounded-2xl absolute
          bg-backgroundLight dark:bg-backgroundDark p-2 min-w-xs w-full -ml-4 mt-6 -z-10
          flex justify-center items-center font-medium transition-[margin]">
            <IconAlerts classes="mr-2 h-5 w-5" type="error"></IconAlerts>
            <span className="pointer-events-none">Failes to copy new link</span>
          </motion.button>
        ) : null}
      </AnimatePresence>

      {/* Warning alert */}
      <AnimatePresence>
        {isWarning ? (
          <motion.button initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}}
          transition={{stiffness: 200, damping: 24, duration: 0.1}}
          onClick={(e:any) => {e.target.style.marginTop = "-40px"; setTimeout(() => {
            setIsWarning(false)
          }, 100);}}
          className="text-warning rounded-2xl absolute
          bg-backgroundLight dark:bg-backgroundDark p-2 min-w-xs w-full -ml-4 mt-6 -z-10
          flex justify-center items-center font-medium transition-[margin]">
            <IconAlerts type="warning" classes="h-5 w-5 mr-2"></IconAlerts>
            <span className="pointer-events-none">{warningText}</span>
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  )
}