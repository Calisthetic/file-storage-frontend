import { useState, useRef } from "react"

type Props = {
  children:string | JSX.Element | JSX.Element[]
  folderId:number
  folderName:string
  folderCurrentAccess:string
}
export default function FolderAccessModal({children, folderId, folderName, folderCurrentAccess}: Props) {
  const [isFolderPublic, setIsFolderPublic] = useState(false)

  return (
    <div className="text-textLight dark:text-textDark rounded-2xl
    bg-backgroundSecondLight dark:bg-backgroundSecondDark p-4 min-w-xs">
      <div className="font-madium text-center text-lg">{"Share - " + folderName}</div>
      {/* Warning */}
      <div className="bg-backgroundThirdLight dark:bg-backgroundThirdDark rounded-md
      flex flex-row mt-2 p-2 items-center">
        <svg fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 min-w-min pointer-events-none mr-2">
          <path d="M17 9a8 8 0 1 0-6.278 7.814 5.932 5.932 0 0 1-.388-.94 7 7 0 1 1 
          5.64-7.474l.032.03c.2.209.399.387.597.537.131.1.263.186.394.263.002-.077.003-.153.003-.23Z" 
          className="fill-iconLight dark:fill-iconDark"></path>
          <path d="M9.049 5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5ZM9 7.5a.5.5 0 0 1 
          .492.41L9.5 8v4.502a.5.5 0 0 1-.992.09l-.008-.09V8a.5.5 0 0 1 .5-.5ZM17 
          10.347a4.632 4.632 0 0 1-1-.583 6.055 6.055 0 0 1-.716-.642.389.389 0 0 
          0-.566 0c-.995 1.036-2.095 1.545-3.318 1.545-.22 
          0-.4.186-.4.416v2.501l.004.266c.027.797.174 1.514.44 2.15A4.813 4.813 0 0 0 13 
          18c.524.4 1.15.727 1.874.979.083.028.171.028.254 0 2.56-.89 3.873-2.713 
          3.873-5.395v-2.5l-.008-.085a.405.405 0 0 0-.392-.332 4.057 4.057 0 0 1-1.6-.32Z" 
          className="fill-iconLight dark:fill-iconDark"></path>
        </svg>
        <div>
          Everyone who has the link will be able to view and download all the content inside the current folder and folders inside
        </div>
      </div>
      <div className="bg-backgroundThirdLight dark:bg-backgroundThirdDark rounded-md p-2
      flex flex-row mt-2 items-center">
        <button className="
        bg-backgroundThirdLight dark:bg-backgroundSecondDark rounded-md transition-colors
        hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark mr-2">
          <svg viewBox="0 0 1262 1710.258" xmlns="http://www.w3.org/2000/svg" 
          enableBackground="new 0 0 1262 1710.258" className="w-7 h-7 p-1">
            <path d="M1196.495 713.258H1090V459.592C1090 206.307 884.198.242 630.999.242 
            377.799.242 172 206.442 172 459.892v253.366H66.686C30.195 713.258 0 742.241 
            0 778.731v766.42c0 91.079 74.712 165.106 165.792 165.106h931.597c91.08 0 
            164.611-74.027 164.611-165.106v-766.42c0-36.49-29.015-65.473-65.505-65.473zM304 
            459.892c0-180.588 146.664-327.508 326.999-327.508C811.335 132.384 958 279.168 
            958 459.592v253.666H304V459.892zm826 1085.259c0 18.218-14.395 33.106-32.611 
            33.106H165.792c-18.216 0-33.792-14.889-33.792-33.106V845.258h998v699.893z" 
            className="fill-iconLight dark:fill-iconDark"></path>
            <path d="M631 1409.707c36.491 0 66-29.58 
            66-66.071v-237.854c0-36.49-29.51-66.07-66-66.07-36.49 0-66 29.58-66 
            66.07v237.854c0 36.491 29.509 66.071 66 66.071z"
            className="fill-iconLight dark:fill-iconDark"></path>
          </svg>
        </button>
        <div>
          <p className=" font-semibold">Access is limited</p>
          <p></p>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex flex-row justify-between font-medium mt-4">
        <button className="flex flex-row items-center py-1 px-3 rounded-full
        border border-borderLight dark:border-borderDark
        hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark transition-colors">
          <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg" 
          className="w-5 h-5 pointer-events-none">
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
        {children}
      </div>
    </div>
  )
}