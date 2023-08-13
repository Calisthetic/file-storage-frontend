import { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion"

export default function EditUIModal() {
  // Pages (colors/fonts) logic
  const [currentPage, setCurrentPage] = useState("colors")

  // Dark mode
  let isDarkMode:boolean = false;
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode = true
  }

  // User's data
  let isCustomizable:boolean = false 

  // Live theme changing
  const [LastSaveTry, setLastSaveTry] = useState(Date.now())
  function ChangeTheme(e:any) {
    document.documentElement.style
      .setProperty('--' + e.target.dataset.target + "Dark", e.target.value);
    document.documentElement.style
      .setProperty('--' + e.target.dataset.target + "Light", e.target.value);
    setLastSaveTry(Date.now)
    setTimeout(() => {
      if (LastSaveTry < Date.now() - 1040) {
        SaveChanges()
      }
    }, 1000);
  }

  // Alerts animations
  const alertSuccessRef:any = useRef();
  const [isAlertSuccessOpen, setIsAlertSuccessOpen] = useState(false);
  function CloseOpenSuccessAlert() {
    if (isAlertSuccessOpen === false) {
      alertSuccessRef.current.style.marginTop = "8px"
      alertSuccessRef.current.style.opacity = "1"
    } else {
      alertSuccessRef.current.style.marginTop = "0px"
      alertSuccessRef.current.style.opacity = "0"
    }
    setIsAlertSuccessOpen(!isAlertSuccessOpen)
  }
  
  const alertWarningRef:any = useRef();
  const [isAlertWarningOpen, setIsAlertWarningOpen] = useState(false);
  function CloseOpenWarningAlert() {
    if (alertWarningRef.current) {
      if (isAlertWarningOpen === false) {
        alertWarningRef.current.style.marginTop = "8px"
        alertWarningRef.current.style.opacity = "1"
        setIsAlertWarningOpen(!isAlertWarningOpen)
      } else {
        alertWarningRef.current.style.marginTop = "0px"
        alertWarningRef.current.style.opacity = "0"
      }
    }
  }

  // Css variables
  var styleVariables = getComputedStyle(document.body)
  function GetCSSValue(name: string) {
    return styleVariables.getPropertyValue('--' + name)
  }

  const getAllCSSVariableNames = (styleSheets: StyleSheetList = document.styleSheets) => {
    const cssVars:string[] = [];
    Array.from(styleSheets).forEach((styleSheet) => {
      Array.from(styleSheet.cssRules).forEach((rule:any) => {
        if (!rule || !rule['style']) {
          return;
        }
        Array.from(rule['style']).forEach((style: any) => {
          if (style.startsWith('--') && cssVars.indexOf(style) === -1 && !style.startsWith('--tw')) {
            cssVars.push(style.substring(2));
          }
        });
      });
    });
    return cssVars;
  };

  // Saving changes
  interface StyleObject {
    name: string;
    value: string;
  }
  function SaveChanges() {
    // Animation
    if (isCustomizable === true) {
      if (isAlertSuccessOpen === false) {
        CloseOpenSuccessAlert()
      }
    } else {
      if (isAlertWarningOpen === false) {
        CloseOpenWarningAlert()
      }
    }

    // Saving changes
    let colorNames:string[] = getAllCSSVariableNames()
    let colors:StyleObject[] = []
    colorNames.forEach(x => {
      colors.push({
        name: x,
        value: GetCSSValue(x),
      })
    });
    localStorage.setItem("colors", JSON.stringify(colors))
  }

  // Default color settings
  function ToDefault() {
    localStorage.removeItem("colors")
    window.location.reload()
  }



  // Fonts
  const [fontsList, setFontsList] = useState<any>()
  const [fontsRenderList, setFontsRenderList] = useState<any>()
  const apiKey:string = "AIzaSyDHKa98Bj7yDYmOW9Dq0AUsmYuyhrUrcc0"
  useEffect(() => {
    fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=" + apiKey + "&sort=popularity", {method: 'GET'}).then(
      response => response.json()
    ).then(
      data => {
        setFontsList(data.items)
        setFontsRenderList(data.items)
      }
    )
  }, [])

  // Fonts filters
  function SearchFonts(e:any) {
    setFontsRenderList(fontsList.filter(
      (x:any) => e.target.value.length > 0 ? (x.family.toLowerCase().includes(e.target.value)) : true
    ))
  }

  let fontLink = document.getElementById("GoogleFontsLink") as HTMLLinkElement
  let rootElement:HTMLElement = document.getElementById("custom-root") as HTMLElement
  let currentFont = rootElement?.style?.fontFamily
  function SetSelectedFont(e:any) {
    if (fontLink && rootElement) {
      rootElement.style.fontFamily = e.target.dataset.name + ""
      fontLink.href = "https://fonts.googleapis.com/css?family=" + e.target.dataset.name
    }
  }

  return (
    <div className="text-textLight dark:text-textDark bg-backgroundSecondLight dark:bg-backgroundSecondDark 
    rounded-2xl sm:min-w-xs h-full justify-center text-center max-w-xs transition-all overflow-hidden">
        <AnimatePresence>
          {currentPage === "colors" ? (
            <div className="whitespace-nowrap text-lg font-semibold grid grid-cols-2">
              <button onClick={() => {setCurrentPage("colors")}}
              className="py-2 pl-3 border-b-2
              border-buttonLight dark:border-buttonDark">Colors</button>
              <button onClick={() => {setCurrentPage("fonts")}}
              className="transition-colors py-2 pr-3 border-b-2
              border-borderLight dark:border-borderDark">Fonts</button>
            </div>
          ) : (
            <div className="whitespace-nowrap text-lg font-semibold grid grid-cols-2">
              <button onClick={() => {setCurrentPage("colors")}}
              className="transition-colors py-2 pl-3 border-b-2
              border-borderLight dark:border-borderDark">Colors</button>
              <button onClick={() => {setCurrentPage("fonts")}}
              className="py-2 pr-3 border-b-2 
              border-buttonLight dark:border-buttonDark">Fonts</button>
            </div>
          )}
        </AnimatePresence>
      {currentPage === "colors" ? (
        <div className="whitespace-nowrap py-2 px-4 font-medium w-full">
          <div className=" space-y-1">
            <div className=" flex justify-between">
              <span className="mr-2">text</span>
              <input type="color" onInput={ChangeTheme} data-target="text"
              defaultValue={GetCSSValue("text" + (isDarkMode ? "Dark" : "Light"))}></input>
            </div>
            <div className=" flex justify-between">
              <span className="mr-2">button</span>
              <input type="color" onInput={ChangeTheme} data-target="button"
              defaultValue={GetCSSValue("button" + (isDarkMode ? "Dark" : "Light"))}></input>
            </div>
            <div className=" flex justify-between">
              <span className="mr-2">button hover</span>
              <input type="color" onInput={ChangeTheme} data-target="buttonHover"
              defaultValue={GetCSSValue("buttonHover" + (isDarkMode ? "Dark" : "Light"))}></input>
            </div>
            <div className=" flex justify-between">
              <span className="mr-2">icons</span>
              <input type="color" onInput={ChangeTheme} data-target="icon"
              defaultValue={GetCSSValue("icon" + (isDarkMode ? "Dark" : "Light"))}></input>
            </div>
            <div className=" flex justify-between">
              <span className="mr-2">shadows</span>
              <input type="color" onInput={ChangeTheme} data-target="shadow"
              defaultValue={GetCSSValue("shadow" + (isDarkMode ? "Dark" : "Light"))}></input>
            </div>
            <div className=" flex justify-between">
              <span className="mr-2">borders</span>
              <input type="color" onInput={ChangeTheme} data-target="border"
              defaultValue={GetCSSValue("border" + (isDarkMode ? "Dark" : "Light"))}></input>
            </div>
            <div className=" flex justify-between">
              <span className="mr-2">primary backgroung</span>
              <input type="color" onInput={ChangeTheme} data-target="background"
              defaultValue={GetCSSValue("background" + (isDarkMode ? "Dark" : "Light"))}></input>
            </div>
            <div className=" flex justify-between">
              <span className="mr-2">secondary backgroung</span>
              <input type="color" onInput={ChangeTheme} data-target="backgroundSecond"
              defaultValue={GetCSSValue("backgroundSecond" + (isDarkMode ? "Dark" : "Light"))}></input>
            </div>
            <div className=" flex justify-between">
              <span className="mr-2">third backgroung</span>
              <input type="color" onInput={ChangeTheme} data-target="backgroundThird"
              defaultValue={GetCSSValue("backgroundThird" + (isDarkMode ? "Dark" : "Light"))}></input>
            </div>
            <div className=" flex justify-between">
              <span className="mr-2">backgroung accent</span>
              <input type="color" onInput={ChangeTheme} data-target="backgroundAccent"
              defaultValue={GetCSSValue("backgroundAccent" + (isDarkMode ? "Dark" : "Light"))}></input>
            </div>
            <div className=" flex justify-between">
              <span className="mr-2">backgroung hover</span>
              <input type="color" onInput={ChangeTheme} data-target="backgroundHover"
              defaultValue={GetCSSValue("backgroundHover" + (isDarkMode ? "Dark" : "Light"))}></input>
            </div>
          </div>
          <button onClick={ToDefault} className="bg-buttonLight dark:bg-buttonDark w-full py-1.5 mt-2 rounded-lg
          hover:bg-buttonHoverLight dark:hover:to-buttonHoverDark" title='Require page reload'>Default settings</button>
        </div>
      ) : ( // fonst
        <div className="whitespace-nowrap w-full">
          <div className=" py-2 px-4 w-full overflow-y-auto overflow-x-hidden min-h-xs max-h-xs flex flex-col">
            {fontsRenderList && fontsRenderList.map((item:any, index:any) => (
              item.family === currentFont ? (
                <button key={index} data-name={item.family} onClick={SetSelectedFont}
                className="text-left px-1.5 border-x-2 border-iconLight dark:border-iconDark rounded-sm transition-colors
                hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark">{item.family}</button>
              ) : (
                <button key={index} data-name={item.family} onClick={SetSelectedFont}
                className="text-left px-2 rounded-sm transition-colors
                hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark">{item.family}</button>
              )
            ))}
          </div>
          <div className="border-t-2 border-borderLight dark:border-borderDark
          grid grid-cols-2">
            <div className="text-lg py-2 font-semibold">Sort By</div>
            <input type="text" placeholder='search...' onInput={SearchFonts}
            className="px-2 bg-backgroundSecondLight dark:bg-backgroundSecondDark
            focus:border-none focus:outline-none"></input>
          </div>
        </div>
      )}

      {/* Alert success */}
      <div ref={alertSuccessRef} id="alert-1" className="absolute w-full items-center p-4 text-successLight dark:text-successDark opacity-0
      bg-backgroundSecondLight dark:bg-backgroundSecondDark dark:text-blue-400h flex rounded-xl transition-alerts" role="alert">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" role="img" xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 512 512" className="w-4 h-4">
          <path className="fill-successLight dark:fill-successDark" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 
          387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 
          0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 
          104c6.249 6.249 16.379 6.249 22.628.001z"></path>
        </svg>
        <span className="sr-only">Info</span>
        <div className="ml-3 text-sm font-medium">
          Changes saved
        </div>
        <button type="button" onClick={CloseOpenSuccessAlert} className="bg-backgroundSecondLight dark:bg-backgroundSecondDark 
        rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 ml-auto -mx-1.5 -my-1.5
        hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark" data-dismiss-target="#alert-1" aria-label="Close">
          <span className="sr-only">Close</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path className="stroke-successLight dark:stroke-successDark" strokeLinecap="round" 
            strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      </div>

      {/* Alert warning */}
      <div ref={alertWarningRef} id="alert-1" className="absolute w-full items-center p-2 text-warningLight dark:text-warningDark opacity-0
      bg-backgroundSecondLight dark:bg-backgroundSecondDark dark:text-blue-400h flex rounded-xl justify-between transition-alerts" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path className="fill-warningLight dark:fill-warningDark" fillRule="evenodd" clipRule="evenodd" 
          d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 
          3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
        </svg>
        <span className="sr-only">Info</span>
        <div className="ml-2 text-sm font-medium">
          <p>Upgrade your account to</p>
          <p>save changes automatically</p>
           
        </div>
        <button type="button" onClick={CloseOpenWarningAlert} className="bg-backgroundSecondLight dark:bg-backgroundSecondDark 
        rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 -my-1.5
        hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark" data-dismiss-target="#alert-1" aria-label="Close">
          <span className="sr-only">Close</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path className="stroke-warningLight dark:stroke-warningDark" strokeLinecap="round" 
            strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      </div>
    </div>
  )
}