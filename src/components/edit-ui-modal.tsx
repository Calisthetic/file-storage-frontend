import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion"
import { isDarkMode } from '../lib/color-utils';
import { CSSVariablesExtended } from '../data/style/css-variables';
import IconClose from './icons/IconClose';
import IconAlerts from './icons/IconAlerts';

export default function EditUIModal() {
  // Pages (colors/fonts) logic
  const [currentPage, setCurrentPage] = useState("colors")

  // User's data
  let isCustomizable:boolean = true 

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
  const [isAlertSuccessOpen, setIsAlertSuccessOpen] = useState(false);
  function CloseOpenSuccessAlert() {
    setIsAlertSuccessOpen(!isAlertSuccessOpen)
  }
  
  const [isAlertWarningOpen, setIsAlertWarningOpen] = useState(false);
  function CloseOpenWarningAlert() {
    setIsAlertWarningOpen(!isAlertWarningOpen)
  }
  
  const [isAlertErrorOpen, setIsAlertErrorOpen] = useState(false);
  const [currentErrorText, setCurrentErrorText] = useState<string>("Please try again");
  function CloseOpenErrorAlert() {
    setIsAlertErrorOpen(!isAlertErrorOpen)
  }

  // Css variables
  var styleVariables = getComputedStyle(document.body)
  function GetCSSValue(name: string) {
    return styleVariables.getPropertyValue('--' + name)
  }


  // Saving changes
  interface StyleObject {
    name: string;
    value: string;
  }
  function SaveChanges() {
    // Animation
    if (isAlertErrorOpen === false) {
      if (isCustomizable === true) {
        setIsAlertSuccessOpen(true)
      } else {
        setIsAlertWarningOpen(true)
      }
    }

    // Saving changes
    let colors:StyleObject[] = []
    CSSVariablesExtended.forEach(x => {
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
  const sortParams = ["alpha", "date", "popularity", "style", "trending"]
  const [currentFontSort, setCurrentFontSort] = useState("popularity")
  const sortParams2 = ["ascending", "descending"]
  const [currentFontSort2, setCurrentFontSort2] = useState("ascending")

  const [isFontSortModalOpen, setIsFontSortModalOpen] = useState(false)

  const apiKey:string = "AIzaSyDHKa98Bj7yDYmOW9Dq0AUsmYuyhrUrcc0"
  useEffect(() => {
    fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=" + apiKey + "&sort=" + currentFontSort, {method: 'GET'}).then(
      response => response.json()
    ).then(
      data => {
        setFontsList(data.items)
        setFontsRenderList(currentFontSort2 === "descending" ? RotateArray(data.items) : data.items)
      }
    ).catch((e:any) => {
      console.log(e);
      setFontsRenderList(null)
      // Show error
      setCurrentErrorText("Unable to get response\nfrom Google Font API")
      if (isAlertErrorOpen === false) {
        CloseOpenErrorAlert()
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFontSort, currentFontSort2])

  // Fonts filters
  function SearchFonts(e:any) {
    if (fontsList) {
      setFontsRenderList(fontsList.filter(
        (x:any) => e.target.value.length > 0 ? (x.family.toLowerCase().includes(e.target.value)) : true
      ))
    }
  }

  let fontLink = document.getElementById("GoogleFontsLink") as HTMLLinkElement
  let rootElement:HTMLElement = document.getElementById("custom-root") as HTMLElement
  const [currentFont, setCurrentFont] = useState<string>(rootElement?.style?.fontFamily)
  function SetSelectedFont(name:string = "") {
    if (fontLink && rootElement) {
      setCurrentFont(name)
      rootElement.style.fontFamily = name
      if (name.length > 0) {
        fontLink.href = "https://fonts.googleapis.com/css?family=" + name
      }
    }

    if (name.length > 0) {
      if (isCustomizable === true) {
        setTimeout(() => {
          setIsAlertSuccessOpen(true)
        }, 500);
      } else {
        setTimeout(() => {
          setIsAlertWarningOpen(true)
        }, 500);
      }
      localStorage.setItem("font", name)
    } else {
      localStorage.removeItem("font")
    }
  }

  function CloseDropdown(e:any) {
    if (!e.target.dataset.name) {
      setIsFontSortModalOpen(false)
    }
  }

  function RotateArray(arr:string[]) {
    for (let i = 0; i < Math.floor(arr.length / 2); i++) {
      let temp = arr[i];
      arr[i] = arr[arr.length - 1 - i]
      arr[arr.length - 1 - i] = temp
    }
    return arr
  }


  return (
    <div className="text-textLight dark:text-textDark bg-backgroundSecondLight dark:bg-backgroundSecondDark 
    rounded-2xl min-w-xs h-full justify-center text-center max-w-xs transition-all overflow-x-hidden"
    onClick={CloseDropdown}>
      {/* Header buttons */}
      <AnimatePresence>
        {currentPage === "colors" ? (
          <div className="whitespace-nowrap text-lg font-semibold grid grid-cols-2">
            <button onClick={() => {setCurrentPage("colors")}}
            className="py-2 pl-3 border-b-2 rounded-ss-2xl
            border-buttonLight dark:border-buttonDark">Colors</button>
            <button onClick={() => {setCurrentPage("fonts")}}
            className="transition-colors py-2 pr-3 border-b-2 rounded-se-2xl
            border-borderLight dark:border-borderDark">Fonts</button>
          </div>
        ) : (
          <div className="whitespace-nowrap text-lg font-semibold grid grid-cols-2">
            <button onClick={() => {setCurrentPage("colors")}}
            className="transition-colors py-2 pl-3 border-b-2 rounded-ss-2xl
            border-borderLight dark:border-borderDark">Colors</button>
            <button onClick={() => {setCurrentPage("fonts")}}
            className="py-2 pr-3 border-b-2 rounded-se-2xl
            border-buttonLight dark:border-buttonDark">Fonts</button>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {currentPage === "colors" ? (
          <motion.div initial={{opacity: 0, x: -100}} animate={{opacity: 1, x: 0}}
          transition={{stiffness: 200, damping: 24, duration: 0.1}} exit={{opacity: 0, x: 100}}
          className="whitespace-nowrap py-2 px-4 font-medium w-full">
            <div className=" space-y-1">
              <div className=" flex justify-between">
                <span className="mr-2">text</span>
                <input type="color" onInput={ChangeTheme} data-target="text"
                defaultValue={GetCSSValue("text" + (isDarkMode() ? "Dark" : "Light"))}></input>
              </div>
              <div className=" flex justify-between">
                <span className="mr-2">button</span>
                <input type="color" onInput={ChangeTheme} data-target="button"
                defaultValue={GetCSSValue("button" + (isDarkMode() ? "Dark" : "Light"))}></input>
              </div>
              <div className=" flex justify-between">
                <span className="mr-2">button hover</span>
                <input type="color" onInput={ChangeTheme} data-target="buttonHover"
                defaultValue={GetCSSValue("buttonHover" + (isDarkMode() ? "Dark" : "Light"))}></input>
              </div>
              <div className=" flex justify-between">
                <span className="mr-2">icons</span>
                <input type="color" onInput={ChangeTheme} data-target="icon"
                defaultValue={GetCSSValue("icon" + (isDarkMode() ? "Dark" : "Light"))}></input>
              </div>
              <div className=" flex justify-between">
                <span className="mr-2">shadows</span>
                <input type="color" onInput={ChangeTheme} data-target="shadow"
                defaultValue={GetCSSValue("shadow" + (isDarkMode() ? "Dark" : "Light"))}></input>
              </div>
              <div className=" flex justify-between">
                <span className="mr-2">borders</span>
                <input type="color" onInput={ChangeTheme} data-target="border"
                defaultValue={GetCSSValue("border" + (isDarkMode() ? "Dark" : "Light"))}></input>
              </div>
              <div className=" flex justify-between">
                <span className="mr-2">primary backgroung</span>
                <input type="color" onInput={ChangeTheme} data-target="background"
                defaultValue={GetCSSValue("background" + (isDarkMode() ? "Dark" : "Light"))}></input>
              </div>
              <div className=" flex justify-between">
                <span className="mr-2">secondary backgroung</span>
                <input type="color" onInput={ChangeTheme} data-target="backgroundSecond"
                defaultValue={GetCSSValue("backgroundSecond" + (isDarkMode() ? "Dark" : "Light"))}></input>
              </div>
              <div className=" flex justify-between">
                <span className="mr-2">third backgroung</span>
                <input type="color" onInput={ChangeTheme} data-target="backgroundThird"
                defaultValue={GetCSSValue("backgroundThird" + (isDarkMode() ? "Dark" : "Light"))}></input>
              </div>
              <div className=" flex justify-between">
                <span className="mr-2">backgroung accent</span>
                <input type="color" onInput={ChangeTheme} data-target="backgroundAccent"
                defaultValue={GetCSSValue("backgroundAccent" + (isDarkMode() ? "Dark" : "Light"))}></input>
              </div>
              <div className=" flex justify-between">
                <span className="mr-2">backgroung hover</span>
                <input type="color" onInput={ChangeTheme} data-target="backgroundHover"
                defaultValue={GetCSSValue("backgroundHover" + (isDarkMode() ? "Dark" : "Light"))}></input>
              </div>
            </div>
            <button onClick={ToDefault} className="bg-buttonLight dark:bg-buttonDark w-full py-1.5 mt-2 rounded-lg
            hover:bg-buttonHoverLight dark:hover:to-buttonHoverDark" title='Require page reload'>Default settings</button>
          </motion.div>
        ) : ( // fonts
          <motion.section initial={{opacity: 0, x: 100}} animate={{opacity: 1, x: 0}}
          transition={{stiffness: 200, damping: 24, duration: 0.1}} exit={{opacity: 0, x: -100}}
          className="whitespace-nowrap w-full">
            <div className=" py-2 px-4 w-full overflow-y-auto overflow-x-hidden min-h-[347px] max-h-[347px] flex flex-col">
              {!fontsRenderList ? ( // Skeleton
                <div className="animate-pulse">
                {Array(10).fill(null).map(() => (
                  <>
                    <div className="h-2 rounded-full bg-backgroundThirdLight dark:bg-backgroundThirdDark max-w-[160px] mb-2.5"></div>
                    <div className="h-2 rounded-full bg-backgroundThirdLight dark:bg-backgroundThirdDark max-w-[180px] mb-2.5"></div>
                    <div className="h-2 rounded-full bg-backgroundThirdLight dark:bg-backgroundThirdDark max-w-[220px] mb-2.5"></div>
                    <div className="h-2 rounded-full bg-backgroundThirdLight dark:bg-backgroundThirdDark max-w-[200px] mb-2.5"></div>
                    <div className="h-2 rounded-full bg-backgroundThirdLight dark:bg-backgroundThirdDark max-w-[240px] mb-2.5"></div>
                    <div className="h-2 rounded-full bg-backgroundThirdLight dark:bg-backgroundThirdDark max-w-[200px] mb-2.5"></div>
                    <div className="h-2 rounded-full bg-backgroundThirdLight dark:bg-backgroundThirdDark max-w-[180px] mb-2.5"></div>
                    <div className="h-2 rounded-full bg-backgroundThirdLight dark:bg-backgroundThirdDark max-w-[190px] mb-2.5"></div>
                  </>
                ))}
              </div>
              ) : fontsRenderList.map((item:any, index:any) => (
                item.family === currentFont ? (
                  <button key={index} data-name={item.family} 
                  onClick={(e:any) => {SetSelectedFont(e.target.dataset.name.toString())}}
                  className="text-left px-1.5 border-x-2 border-iconLight dark:border-iconDark rounded-sm transition-colors
                  hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark">{item.family}</button>
                ) : (
                  <button key={index} data-name={item.family} 
                  onClick={(e:any) => {SetSelectedFont(e.target.dataset.name.toString())}}
                  className="text-left px-1.5 border-x-2 rounded-sm transition-colors
                  border-backgroundSecondLight dark:border-backgroundSecondDark
                  hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark">{item.family}</button>
                )
              ))}
            </div>
            <div className="border-t-2 border-borderLight dark:border-borderDark
            flex flex-row">
              <input type="text" placeholder='search...' onInput={SearchFonts}
              className="pr-2 pl-4 bg-backgroundSecondLight dark:bg-backgroundSecondDark
              focus:border-none focus:outline-none w-full"></input>
              <div className="flex flex-row items-center w-max">
                <div className="text-base font-semibold flex flex-row">
                  <button onClick={() => {setIsFontSortModalOpen(!isFontSortModalOpen)}}
                  data-name="dropdown-font-sort" className="h-full py-1 flex flex-row items-center
                  bg-backgroundLight dark:bg-backgroundDark px-2 rounded-lg
                  hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark">
                    <p className="pointer-events-none">Sort By</p>
                    <svg className="w-2.5 h-2.5 ml-1.5" aria-hidden="true" 
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path className="stroke-textLight dark:stroke-textDark" strokeLinecap="round" 
                      strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                  </button>
                  {/* Dropdown himself */}
                  <AnimatePresence>
                    {isFontSortModalOpen ? (
                      <div className="pb-2 absolute -translate-y-full">
                        <motion.div initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}}
                        transition={{stiffness: 200, damping: 24, duration: 0.1}} exit={{opacity: 0, y: 40}}
                        className=" bg-backgroundLight dark:bg-backgroundThirdDark
                          rounded-md transition-colors flex flex-col text-base overflow-hidden
                          shadow-defaultLight dark:shadow-none font-normal">
                          {fontsRenderList ? sortParams.map((item, index) => (
                            <button key={index} onClick={() => {setCurrentFontSort(item)}}
                            className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark 
                            pl-2 pr-8 transition-colors flex flex-row items-center gap-2 py-0.5
                            border-borderLight dark:border-borderDark" data-name={item}>
                              <div className="w-4 h-4 pointer-events-none">
                                <AnimatePresence>
                                  {currentFontSort === item ? (
                                    <motion.svg initial={{opacity: 0, x: -24}} animate={{opacity: 1, x: 0}}
                                    transition={{damping: 24, stiffness: 300, duration: 0.1}} exit={{opacity: 0, x: -24}}
                                    viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 absolute">
                                      <path d="M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 
                                      416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32 
                                      8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4c6.2-6.27 14.4-9.4 22.6-9.4 17.1 0 
                                      32 13.7 32 32z" className="fill-iconLight dark:fill-iconDark"></path>
                                    </motion.svg>
                                  ) : null}
                                </AnimatePresence>
                              </div>
                              <span className="pointer-events-none first-letter:uppercase">{item}</span>
                            </button>
                          )) : sortParams.map((item, index) => (
                            <button className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark 
                            pl-2 pr-8 transition-colors flex flex-row items-center gap-2 py-0.5
                            border-borderLight dark:border-borderDark h-7" key={index}>
                              <div className="w-4 h-4 pointer-events-none"></div>
                              <div className="rounded-full text-backgroundSecondLight dark:text-backgroundSecondDark
                              bg-backgroundSecondLight dark:bg-backgroundSecondDark animate-pulse text-xs px-4">{item}</div>
                            </button>
                          ))}
                          <div className="border-t border-borderLight dark:border-borderDark w-full"></div>
                          {fontsRenderList ? sortParams2.map((item, index) => (
                            <button key={index} onClick={() => { 
                              setFontsRenderList(item === currentFontSort2 ? fontsList : RotateArray(fontsList));
                              setCurrentFontSort2(item);
                            }}
                            className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark 
                            pl-2 pr-8 transition-colors flex flex-row items-center gap-2 py-0.5
                            border-borderLight dark:border-borderDark" data-name={item}>
                              <div className="w-4 h-4 pointer-events-none">
                                <AnimatePresence>
                                  {currentFontSort2 === item ? (
                                    <motion.svg initial={{opacity: 0, x: -24}} animate={{opacity: 1, x: 0}}
                                    transition={{damping: 24, stiffness: 300, duration: 0.1}} exit={{opacity: 0, x: -24}}
                                    viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 pointer-events-none absolute">
                                      <path d="M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 
                                      416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32 
                                      8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4c6.2-6.27 14.4-9.4 22.6-9.4 17.1 0 
                                      32 13.7 32 32z" className="fill-iconLight dark:fill-iconDark"></path>
                                    </motion.svg>
                                  ) : null}
                                </AnimatePresence>
                              </div>
                              <span className="pointer-events-none first-letter:uppercase">{item}</span>
                            </button>
                          )) : sortParams2.map((item, index) => (
                            <button className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark 
                            pl-2 pr-8 transition-colors flex flex-row items-center gap-2 py-0.5
                            border-borderLight dark:border-borderDark h-7" key={index}>
                              <div className="w-4 h-4 pointer-events-none"></div>
                              <div className="rounded-full text-backgroundSecondLight dark:text-backgroundSecondDark
                              bg-backgroundSecondLight dark:bg-backgroundSecondDark animate-pulse text-xs px-4">{item}</div>
                            </button>
                          ))}
                        </motion.div>
                      </div>
                    ) : null}
                  </AnimatePresence>
                </div>
                {/* Reset font */}
                <button type="button" title="Set to default" 
                onClick={() => {SetSelectedFont()}} 
                className="bg-buttonLight dark:bg-buttonDark my-2 mx-2
                rounded-lg p-1.5 items-center justify-center h-8 w-8 flex
                hover:bg-buttonHoverLight hover:dark:bg-buttonHoverDark">
                  <IconClose classes='h-3.5 w-3.5' strokeClasses='stroke-textLight dark:stroke-textDark'></IconClose>
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Alert success */}
      <AnimatePresence>
        {isAlertSuccessOpen === true ? (
          <motion.div initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}}
          transition={{stiffness: 200, damping: 24, duration: 0.1}} exit={{opacity: 0, y: -40}}
          id="alert-1" className="absolute w-full items-center p-4 text-success 
          opacity-0 bg-backgroundSecondLight dark:bg-backgroundSecondDark dark:text-blue-400h 
          flex rounded-xl mt-2 -z-10" role="alert">
            <IconAlerts classes='w-4 h-4' type='success'></IconAlerts>
            <span className="sr-only">Info</span>
            <div className="ml-3 text-sm font-medium">
              Changes saved
            </div>
            <button type="button" onClick={CloseOpenSuccessAlert} 
            className="bg-backgroundSecondLight dark:bg-backgroundSecondDark 
            rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 ml-auto -mx-1.5 -my-1.5
            hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark">
              <IconClose classes='h-3 w-3' strokeClasses='stroke-success'></IconClose>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Alert warning */}
      <AnimatePresence>
        {isAlertWarningOpen === true ? (
          <motion.div initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}}
          transition={{stiffness: 200, damping: 24, duration: 0.1}} exit={{opacity: 0, y: -40}}
          id="alert-1" className="absolute w-full items-center p-2 text-warning 
          opacity-0 bg-backgroundSecondLight dark:bg-backgroundSecondDark dark:text-blue-400h 
          flex rounded-xl justify-between mt-2 -z-10" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path className="fill-warning" fillRule="evenodd" clipRule="evenodd" 
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 
              3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
            </svg>
            <span className="sr-only">Info</span>
            <div className="ml-2 text-sm font-medium">
              <p>Upgrade your account to</p>
              <p>save changes automatically</p>
            </div>
            <button type="button" onClick={CloseOpenWarningAlert} 
            className="bg-backgroundSecondLight dark:bg-backgroundSecondDark 
            rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 -my-1.5
            hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark">
              <IconClose classes='h-3 w-3' strokeClasses='stroke-warning'></IconClose>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Alert fonts error */}
      <AnimatePresence>
        {isAlertErrorOpen === true ? (
          <motion.div initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}}
          transition={{stiffness: 200, damping: 24, duration: 0.1}} exit={{opacity: 0, y: -40}}
          id="alert-1" className="absolute w-full items-center p-2 text-error dark:text-error
          opacity-0 bg-backgroundSecondLight dark:bg-backgroundSecondDark dark:text-blue-400h 
          flex rounded-xl justify-between mt-2 -z-10" role="alert">
            <IconAlerts classes="mr-2 h-5 w-5" type="error"></IconAlerts>
            <span className="sr-only">Info</span>
            <div className="ml-2 text-sm font-medium whitespace-pre-wrap">
              {currentErrorText}
            </div>
            <button type="button" onClick={CloseOpenErrorAlert} 
            className="bg-backgroundSecondLight dark:bg-backgroundSecondDark 
            rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 -my-1.5
            hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark">
              <IconClose classes='h-3 w-3' strokeClasses='stroke-error'></IconClose>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}