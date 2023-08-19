import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { selfUrl } from "../../../data/data"

type Props = {
  children:string | JSX.Element | JSX.Element[]
  folderId:number
  folderName:string
  folderCurrentAccess:string | null
  folderToken:string
}
export default function FolderAccessModal({children, folderId, folderName, folderCurrentAccess, folderToken}: Props) {
  const [isFolderPublic, setIsFolderPublic] = useState(folderCurrentAccess !== undefined)
  const [currentAccessType, setCurrentAccessType] = useState(folderCurrentAccess)

  const [isRolesMenuOpen, setIsRolesMenuOpen] = useState(false)

  // Copied notification
  const [isCopied, setIsCopied] = useState(false)
  function CopyText(folderToken:string) {
    navigator.clipboard.writeText(selfUrl + "disk/folder/" + folderToken);
    setIsCopied(false)
    setTimeout(() => {
      setIsCopied(true)
    }, 100);
  }

  return (
    <div className="text-textLight dark:text-textDark rounded-2xl
    bg-backgroundLight dark:bg-backgroundDark p-4 min-w-xs"
    onClick={(e:any) => {if (e.target.dataset.name === undefined) {setIsRolesMenuOpen(false)}}}>
      <div className="font-medium text-center text-xl">{"Share - " + folderName}</div>
      {/* Warning */}
      <div className="bg-backgroundSecondLight dark:bg-backgroundSecondDark rounded-md
      grid grid-cols-alerts mt-2 p-2 items-center gap-x-2">
        <svg fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 min-w-min mr-2">
          <path d="M17 9a8 8 0 1 0-6.278 7.814 5.932 5.932 0 0 1-.388-.94 7 7 0 1 1 
          5.64-7.474l.032.03c.2.209.399.387.597.537.131.1.263.186.394.263.002-.077.003-.153.003-.23Z" 
          className="fill-warningLight dark:fill-warningDark"></path>
          <path d="M9.049 5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5ZM9 7.5a.5.5 0 0 1 
          .492.41L9.5 8v4.502a.5.5 0 0 1-.992.09l-.008-.09V8a.5.5 0 0 1 .5-.5ZM17 
          10.347a4.632 4.632 0 0 1-1-.583 6.055 6.055 0 0 1-.716-.642.389.389 0 0 
          0-.566 0c-.995 1.036-2.095 1.545-3.318 1.545-.22 
          0-.4.186-.4.416v2.501l.004.266c.027.797.174 1.514.44 2.15A4.813 4.813 0 0 0 13 
          18c.524.4 1.15.727 1.874.979.083.028.171.028.254 0 2.56-.89 3.873-2.713 
          3.873-5.395v-2.5l-.008-.085a.405.405 0 0 0-.392-.332 4.057 4.057 0 0 1-1.6-.32Z" 
          className="fill-warningLight dark:fill-warningDark"></path>
        </svg>
        <motion.div initial={{opacity: 0, x: 40}} animate={{opacity: 1, x: 0}}
        transition={{stiffness: 200, damping: 24}}>
          Everyone who has the link will be able to view and download all the content inside the current folder
        </motion.div>
      </div>
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
                  className="fill-successLight dark:fill-successDark"></path>
                  <path d="M631 1409.707c36.491 0 
                  66-29.58 66-66.071v-237.854c0-36.49-29.51-66.07-66-66.07-36.49 
                  0-66 29.58-66 66.07v237.854c0 36.491 29.509 66.071 66 66.071z" 
                  className="fill-successLight dark:fill-successDark"></path>
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
                {isRolesMenuOpen === true && (
                  <motion.div initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}}
                  transition={{stiffness: 200, damping: 24, duration: 0.1}} exit={{opacity: 0, y: -20}} 
                  className="absolute bg-backgroundThirdLight dark:bg-backgroundThirdDark
                  rounded-md transition-colors flex flex-col text-lg mt-1 overflow-hidden
                  shadow-defaultLight dark:shadow-none">
                    <button data-name="editor" onClick={() => {setCurrentAccessType("editor")}}
                    className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark 
                    pl-2 pr-8 transition-colors flex flex-row items-center gap-2 py-0.5
                    border-borderLight dark:border-borderDark">
                      <div className="h-4 w-4 pointer-events-none">
                        <AnimatePresence>
                          {currentAccessType === "editor" && (
                            <motion.svg initial={{x: -50}} animate={{x: 0}} exit={{x: -50}}
                            transition={{damping: 24, stiffness: 300, duration: 0.25}}
                            viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 absolute">
                              <path d="M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 
                              416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32 
                              8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4c6.2-6.27 14.4-9.4 22.6-9.4 17.1 0 
                              32 13.7 32 32z" className=" fill-iconLight dark:fill-iconDark"></path>
                            </motion.svg>
                          )}
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
                          {currentAccessType === "reader" && (
                            <motion.svg initial={{x: -50}} animate={{x: 0}} exit={{x: -50}}
                            transition={{damping: 24, stiffness: 300, duration: 0.25}}
                            viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 absolute">
                              <path d="M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 
                              416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32 
                              8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4c6.2-6.27 14.4-9.4 22.6-9.4 17.1 0 
                              32 13.7 32 32z" className=" fill-iconLight dark:fill-iconDark"></path>
                            </motion.svg>
                          )}
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
                          {currentAccessType === "guest" && (
                            <motion.svg initial={{x: -50}} animate={{x: 0}} exit={{x: -50}}
                            transition={{damping: 24, stiffness: 300, duration: 0.25}}
                            viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 absolute">
                              <path d="M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 
                              416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32 
                              8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4c6.2-6.27 14.4-9.4 22.6-9.4 17.1 0 
                              32 13.7 32 32z" className=" fill-iconLight dark:fill-iconDark"></path>
                            </motion.svg>
                          )}
                        </AnimatePresence>
                      </div>
                      <span className="pointer-events-none">Guest</span>
                    </button>
                  </motion.div>
                )}
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
                  className="fill-errorLight dark:fill-errorDark"></path>
                  <path d="M631 1409.707c36.491 0 66-29.58 
                  66-66.071v-237.854c0-36.49-29.51-66.07-66-66.07-36.49 0-66 29.58-66 
                  66.07v237.854c0 36.491 29.509 66.071 66 66.071z"
                  className="fill-errorLight dark:fill-errorDark"></path>
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
      {/* Buttons */}
      <div className="flex flex-row justify-between font-medium mt-4">
        <button className="flex flex-row items-center py-1 px-3 rounded-full
        border border-borderLight dark:border-borderDark transition-colors
        hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark"
        onClick={() => {CopyText(folderToken)}}>
          <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg" 
          className="w-5 h-5">
            <path d="M598.6 41.41C570.1 13.8 534.8 0 498.6 0s-72.36 13.8-99.96 41.41l-43.36 43.36c15.11 8.012 
            29.47 17.58 41.91 30.02 3.146 3.146 5.898 6.518 8.742 9.838l37.96-37.96C458.5 72.05 477.1 64 498.6 
            64c20.67 0 40.1 8.047 54.71 22.66 14.61 14.61 22.66 34.04 22.66 54.71s-8.049 40.1-22.66 54.71l-133.3 
            133.3C405.5 343.1 386 352 365.4 352s-40.1-8.048-54.71-22.66C296 314.7 287.1 295.3 287.1 274.6s8.047-40.1 
            22.66-54.71l4.44-3.49c-2.1-3.9-4.3-7.9-7.5-11.1-8.6-8.6-19.9-13.3-32.1-13.3-11.93 0-23.1 4.664-31.61 
            12.97-30.71 53.96-23.63 123.6 22.39 169.6C293 402.2 329.2 416 365.4 416c36.18 0 72.36-13.8 99.96-41.41L598.6 
            241.3c28.45-28.45 42.24-66.01 41.37-103.3-.87-35.9-14.57-69.84-41.37-96.59zM234 387.4l-37.9 37.9C181.5 
            439.1 162 448 141.4 448c-20.67 0-40.1-8.047-54.71-22.66-14.61-14.61-22.66-34.04-22.66-54.71s8.049-40.1 
            22.66-54.71l133.3-133.3C234.5 168 253.1 160 274.6 160s40.1 8.048 54.71 22.66c14.62 14.61 22.66 34.04 
            22.66 54.71s-8.047 40.1-22.66 54.71l-3.51 3.52c2.094 3.939 4.219 7.895 7.465 11.15C341.9 315.3 353.3 
            320 365.4 320c11.93 0 23.1-4.664 31.61-12.97 30.71-53.96 23.63-123.6-22.39-169.6C346.1 109.8 310.8 96 
            274.6 96c-36.2 0-72.3 13.8-99.9 41.4L41.41 270.7C13.81 298.3 0 334.48 0 370.66c0 36.18 13.8 72.36 41.41 
            99.97C69.01 498.2 105.2 512 141.4 512c36.18 0 
            72.36-13.8 99.96-41.41l43.36-43.36c-15.11-8.012-29.47-17.58-41.91-30.02-3.21-3.11-5.91-6.51-8.81-9.81z" 
            className=" fill-textLight dark:fill-textDark"></path>
          </svg>
          <p className="pointer-events-none ml-2">Copy link</p>
        </button>
        {/* Close modal button */}
        {children}
      </div>

      <AnimatePresence>
        {isCopied && (
          <motion.button initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}}
          transition={{stiffness: 200, damping: 24, duration: 0.1}}
          onClick={(e:any) => {e.target.style.marginTop = "-40px"}}
          className="text-successLight dark:text-successDark rounded-2xl absolute
          bg-backgroundLight dark:bg-backgroundDark p-2 min-w-xs w-full -ml-4 mt-6 -z-10
          flex justify-center items-center font-medium transition-[margin]">
            <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2">
              <path d="M58.395 32.156 42.995 50.625l-5.39-6.463a5.995 5.995 0 1 0-9.212 
              7.676l9.997 12a5.991 5.991 0 0 0 9.21.006l20.005-24a5.999 5.999 0 1 0-9.211-7.688Z" 
              className=" fill-successLight dark:fill-successDark"></path>
              <path d="M48 0a48 48 0 1 0 48 48A48.051 48.051 0 0 0 48 0Zm0 84a36 
              36 0 1 1 36-36 36.04 36.04 0 0 1-36 36Z" 
              className=" fill-successLight dark:fill-successDark"></path>
            </svg>
            <span className="pointer-events-none">Copied</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}