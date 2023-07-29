import { useRef} from 'react';

export default function EditUIModal() {
  const primaryBackgroundRef:any = useRef()
  const secondaryBackgroundRef:any = useRef()
  const thirdBackgroundRef:any = useRef()
  const backgroundHoverRef:any = useRef()
  const borderRef:any = useRef()
  const textRef:any = useRef()
  const iconRef:any = useRef()

  let isDarkMode:boolean = false;
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode = true
  }

  function ChangeTheme(e:any) {
    // if (inputColor.current) {
    //   document.documentElement.style
    //   .setProperty('--textDark', inputColor.current.value);
    // }
  }

  return (
    <div className="text-textLight dark:text-textDark bg-backgroundSecondaryLight dark:bg-backgroundSecondaryDark 
    rounded-2xl w-full h-full justify-center text-center">
      <p className="py-2 px-3 border-b-2 whitespace-nowrap text-xl font-bold
      border-borderLight dark:border-borderDark">Customize the interface</p>
      <div className="whitespace-nowrap pt-2 pb-4 px-3 font-medium w-full">
        <div className=" my-2 flex justify-between">
          <span className="mr-2">text</span>
          <input ref={textRef} type="color" onInput={ChangeTheme} defaultValue={isDarkMode ? "dddddd" : "111827"}></input>
        </div>
        <div className=" my-2 flex justify-between">
          <span className="mr-2">icons</span>
          <input ref={iconRef} type="color" onInput={ChangeTheme} defaultValue={isDarkMode ? "#ff0000" : "#ff0000"}></input>
        </div>
        <div className=" my-2 flex justify-between">
          <span className="mr-2">borders</span>
          <input ref={borderRef} type="color" onInput={ChangeTheme} defaultValue={isDarkMode ? "#43464a" : "#c3c6c9"}></input>
        </div>
        <div className=" my-2 flex justify-between">
          <span className="mr-2">primary backgroung</span>
          <input ref={primaryBackgroundRef} type="color" onInput={ChangeTheme} defaultValue={isDarkMode ? "#131619" : "#f7f9fc"}></input>
        </div>
        <div className=" my-2 flex justify-between">
          <span className="mr-2">secondary backgroung</span>
          <input ref={secondaryBackgroundRef} type="color" onInput={ChangeTheme} defaultValue={isDarkMode ? "#0f1316" : "#ffffff"}></input>
        </div>
        <div className=" my-2 flex justify-between">
          <span className="mr-2">third backgroung</span>
          <input ref={thirdBackgroundRef} type="color" onInput={ChangeTheme} defaultValue={isDarkMode ? "#232629" : "#e9eaef"}></input>
        </div>
        <div className=" my-2 flex justify-between">
          <span className="mr-2">hover backgroung</span>
          <input ref={backgroundHoverRef} type="color" onInput={ChangeTheme} defaultValue={isDarkMode ? "#333639" : "#e3e6ee"}></input>
        </div>
      </div>
    </div>
  )
}