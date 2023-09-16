import { AnimatePresence, motion } from "framer-motion";
import { FunctionComponent, memo, useEffect, useState } from "react";
import { RotateArray } from "../../../lib/utils";
import { cn } from "../../../lib/color-utils";

interface FontAppearanceProps {
  
}
 
const FontAppearance: FunctionComponent<FontAppearanceProps> = memo(() => {
  // User's data
  let isCustomizable:boolean = true

  
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
      // setCurrentErrorText("Unable to get response\nfrom Google Font API")
      // if (isAlertErrorOpen === false) {
      //   CloseOpenErrorAlert()
      // }
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
          //setIsAlertSuccessOpen(true)
        }, 500);
      } else {
        setTimeout(() => {
          //setIsAlertWarningOpen(true)
        }, 500);
      }
      localStorage.setItem("font", name)
    } else {
      localStorage.removeItem("font")
    }
  }

  useEffect(() => {
    document.addEventListener("click", CloseDropdown)

    function CloseDropdown(e:any) {
      e.preventDefault()
      if (!e.target.dataset.name) {
        setIsFontSortModalOpen(false)
      }
    }

    return () => document.removeEventListener("click", CloseDropdown)
  }, [])


  return (
    <>
      <label className="font-semibold text-base">Font</label>
      <p className="opacity-80 dark:opacity-70 text-sm">Set the font you want to use in the dashboard.</p>
      <div className="mt-2 border border-borderLight dark:border-borderDark rounded-md">
        <div className="flex flex-row p-1">
          <div className="text-sm font-semibold flex flex-row">
            <button onClick={() => {setIsFontSortModalOpen(!isFontSortModalOpen)}}
            data-name="dropdown-font-sort" className="h-full flex flex-row items-center
            bg-backgroundThirdLight dark:bg-backgroundThirdDark p-1 rounded-lg w-24 justify-center
            hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark transition-colors">
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
                <div className="pb-2 absolute translate-y-[37px] w-[150px] z-10">
                  <motion.div initial={{opacity: 0, y: -40}} animate={{opacity: 1, y: 0}}
                  transition={{stiffness: 200, damping: 24, duration: 0.1}} exit={{opacity: 0, y: -20}}
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
                        bg-backgroundSecondLight dark:bg-backgroundSecondDark animate-pulse h text-xs px-4">{item}</div>
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
                      pl-2 pr-2 transition-colors flex flex-row items-center gap-2 py-0.5
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
          <input type="text" placeholder='search...' onInput={SearchFonts}
          className="pr-2 pl-3 bg-backgroundSecondLight dark:bg-backgroundSecondDark
          focus:border-none focus:outline-none w-full"></input>
        </div>
        <div className="py-2 w-full overflow-y-auto overflow-x-hidden h-[206px]
        border-t border-borderLight dark:border-borderDark rounded-b-md">
          {!fontsRenderList ? ( // Skeleton
            <div className="animate-pulse flex flex-col">
              {Array(10).fill(null).map((item, index) => (
                <div key={index} className="ml-2">
                  <div className="h-2 rounded-full bg-backgroundThirdLight dark:bg-backgroundThirdDark max-w-[160px] mb-2.5"></div>
                  <div className="h-2 rounded-full bg-backgroundThirdLight dark:bg-backgroundThirdDark max-w-[180px] mb-2.5"></div>
                  <div className="h-2 rounded-full bg-backgroundThirdLight dark:bg-backgroundThirdDark max-w-[220px] mb-2.5"></div>
                  <div className="h-2 rounded-full bg-backgroundThirdLight dark:bg-backgroundThirdDark max-w-[200px] mb-2.5"></div>
                  <div className="h-2 rounded-full bg-backgroundThirdLight dark:bg-backgroundThirdDark max-w-[240px] mb-2.5"></div>
                  <div className="h-2 rounded-full bg-backgroundThirdLight dark:bg-backgroundThirdDark max-w-[200px] mb-2.5"></div>
                  <div className="h-2 rounded-full bg-backgroundThirdLight dark:bg-backgroundThirdDark max-w-[180px] mb-2.5"></div>
                  <div className="h-2 rounded-full bg-backgroundThirdLight dark:bg-backgroundThirdDark max-w-[190px] mb-2.5"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {fontsRenderList.map((item:any, index:any) => (
                <button key={index} onClick={() => {SetSelectedFont(item.family)}}
                className={cn("text-left px-1.5 border-x-2 rounded-sm transition-colors " +
                "hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark", {
                  "bg-backgroundThirdLight dark:bg-backgroundThirdDark border-iconLight dark:border-iconDark": item.family === currentFont,
                  "border-backgroundSecondLight dark:border-backgroundSecondDark": item.family !== currentFont
                })}>{item.family}</button>
              ))}
            </div>
          )}
        </div>
      </div>
      <button className="bg-backgroundThirdLight dark:bg-backgroundThirdDark
      hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark
      px-4 py-1 mt-2 mb-8 rounded-md font-medium transition-colors"
      onClick={() => {SetSelectedFont()}}>Set to default</button>
    </>
  );
})
 
export default FontAppearance;