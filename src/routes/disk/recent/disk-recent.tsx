import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion"

import "../../../styles/hover-elems.css"
import { apiUrl } from "../../../data/data";
import CellTypesDropdown from "../components/cell-types-dropdown";
import { CheckForError } from "../../../lib/check-errors";
import AlertButton from "../../../components/alert-button";

const RenderRecentData = lazy(() => import("./render-recent-data"));

export default function DiskRecent() {
  // dropdowns
  const [isAddDrop, setIsAddDrop] = useState(false)
  const [isSortDrop, setIsSortDrop] = useState(false)
  // local storage sort and render items
  interface RenderValues {
    render_type: string,
    sort_type: string,
    sort_by: string
  }
  const renderValuesString = localStorage.getItem("renderValues")
  const renderValues:RenderValues = JSON.parse(renderValuesString ? renderValuesString : "{}")
  // sort and render types
  const [currentRenderType, setCurrentRenderType] 
    = useState(renderValues.render_type ? renderValues.render_type : "list")
  const [currentSortBy, setCurrentSortBy] 
    = useState(renderValues.sort_by ? renderValues.sort_by : "ascending")


  // Auto saving render types and sorting
  useEffect(() => {
    let currentRenderValues:RenderValues = {
      render_type: currentRenderType,
      sort_type: renderValues.sort_type ?? "name",
      sort_by: currentSortBy
    }
    localStorage.setItem("renderValues", JSON.stringify(currentRenderValues))
  }, [currentRenderType, currentSortBy, renderValues])

  // Close dropdowns
  function CloseAllDrops(e:any) {
    if (e.target.dataset.drop !== "add" && e.target.dataset.drop !== "child") {
      setIsAddDrop(false)
    }
    if (e.target.dataset.drop !== "sort" && e.target.dataset.drop !== "child") {
      setIsSortDrop(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', CloseAllDrops);

    return () => {
      document.removeEventListener("click", CloseAllDrops)
    }
  }, [])

  const [isUpdate, setIsUpdate] = useState(false)
  function ClearHistory() {
    const clean = async () => {
      let token = localStorage.getItem("token")
      await fetch(apiUrl + "statistic/views", {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token === null ? "" : token,
        },
      })
      .then((res) => {
        CheckForError(res.status)
      })
      .then(() => setIsUpdate(!isUpdate))
      .catch(error => {
        ShowError("Failed to delete folder from history", error.message)
      })
    }
    clean()
  }

  const [alertText, setAlertText] = useState("Something went wrong")
  const [alertTitle, setAlertTitle] = useState("Error!")
  const [alertType, setAlertType] = useState("error")
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  function ShowError(text:string, title:string, type:string = "error") {
    setAlertType(type)
    setIsAlertOpen(false)
    setAlertText(text)
    setAlertTitle(title)
    setTimeout(() => {
      setIsAlertOpen(true)
    }, 250);
  }


  



  return (
    <div className="w-full min-h-fullWithHeader h-fullWithHeader px-2 md:px-6">
      <header className="w-full px-1 sm:px-0 pt-1 flex flex-row justify-between">
        {/* All actions drop */}
        <div className="flex flex-row items-center">
          {/* Current folder */}
          <div className="">
            <motion.button initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} 
            transition={{damping: 24, stiffness: 300, delay: 0.2}} 
            onClick={() => {setIsAddDrop(!isAddDrop)}} id="drop-actions" aria-label="Actions" data-drop="add"
            className="text-textLight dark:text-textDark hover:bg-backgroundHoverLight 
            dark:hover:bg-backgroundHoverDark first-letter:uppercase transition-colors
            font-medium rounded-full text-base sm:text-lg px-2 py-2 text-center 
            max-w-[60dvw] md:max-w-none
            focus:dark:bg-backgroundThirdDark focus:bg-backgroundThirdLight inline-flex items-center">
              <span className="truncate pointer-events-none">
                My recent folders
              </span>
              <svg className="w-2.5 h-2.5 ml-1 md:ml-2.5" aria-hidden="true" 
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path className="stroke-textLight dark:stroke-textDark" strokeLinecap="round" 
                strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
              </svg>
            </motion.button>
            <AnimatePresence>
              {isAddDrop ? (
                <motion.div initial={{opacity: 0, y: -50, scaleY: 0.2}} animate={{opacity: 1, y: 0, scaleY: 1}}
                transition={{stiffness: 200, damping: 24, duration: 0.16}} exit={{opacity: 0, y: -50, scaleY: 0.2}} 
                className="z-10 opacity-0 divide-y divide-gray-100 rounded-md w-44 mt-0.5
                absolute shadow-defaultLight dark:shadow-none scale-y-0
                bg-backgroundSecondLight dark:bg-backgroundThirdDark overflow-hidden">
                  <div className="py-2 text-sm font-medium text-textLight dark:text-textDark">
                    <button className="transition-colors px-2 py-2 flex flex-row w-full
                    hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark justify-start items-center
                    bg-backgroundSecondLight dark:bg-backgroundThirdDark" onClick={ClearHistory}>
                      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2">
                        <path d="M504 255.531c.253 136.64-111.18 
                        248.372-247.82 248.468-59.015.042-113.223-20.53-155.822-54.911-11.077-8.94-11.905-25.541-1.839-35.607l11.267-11.267c8.609-8.609 
                        22.353-9.551 31.891-1.984C173.062 425.135 212.781 440 256 440c101.705 0 184-82.311 184-184 0-101.705-82.311-184-184-184-48.814 
                        0-93.149 18.969-126.068 49.932l50.754 50.754c10.08 10.08 2.941 27.314-11.313 27.314H24c-8.837 0-16-7.163-16-16V38.627c0-14.254 
                        17.234-21.393 27.314-11.314l49.372 49.372C129.209 34.136 189.552 8 256 8c136.81 0 247.747 110.78 248 247.531zm-180.912 78.784 
                        9.823-12.63c8.138-10.463 6.253-25.542-4.21-33.679L288 256.349V152c0-13.255-10.745-24-24-24h-16c-13.255 0-24 10.745-24 24v135.651l65.409 
                        50.874c10.463 8.137 25.541 6.253 33.679-4.21z" className="fill-iconLight dark:fill-iconDark"></path>
                      </svg>
                      {/* <IconBin classes="w-6 h-6 mr-2" fillClasses="fill-iconLight dark:fill-iconDark"></IconBin> */}
                      <span>Clear history</span>
                    </button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-row items-center space-x-1">
          {/* Sorting */}
          <div>
            <button onClick={() => {setIsSortDrop(!isSortDrop)}} 
            id="drop-sort" aria-label="Sort" data-drop="sort"
            className=" dark:text-textDark hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark
            font-medium rounded-full text-base sm:text-lg w-10 h-10 sm:w-11 sm:h-11 text-textLight 
            text-center justify-center inline-flex items-center
            focus:bg-none focus:dark:bg-backgroundThirdDark first-letter:uppercase">
              <motion.svg initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} 
              transition={{damping: 24, duration: 0.25, stiffness: 300}}
              viewBox="0 0 24 24" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                <path d="m6 20 4-4H7V4H5v12H2zm5-12h9v2h-9zm0 4h7v2h-7zm0-8h11v2H11zm0 12h5v2h-5z" 
                className="fill-iconLight dark:fill-iconDark"></path>
              </motion.svg>
            </button>
            <AnimatePresence>
              {isSortDrop ? (
                <motion.div initial={{opacity: 0, y: -110, scaleY: 0.2, x: "calc(-100% + 44px)"}} animate={{opacity: 1, y: 0, scaleY: 1}}
                transition={{stiffness: 200, damping: 24, duration: 0.16}} exit={{opacity: 0, y: -110, scaleY: 0}}
                className="rounded w-44 mt-0.5 overflow-hidden
                absolute shadow-defaultLight dark:shadow-none z-10
                bg-backgroundSecondLight dark:bg-backgroundThirdDark">
                  <ul className="py-1.5 text-sm font-medium text-textLight dark:text-textDark">
                    {/* order by ascending or descending */}
                    <li>
                      <button className="transition-colors px-2 py-1.5 
                      hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark w-full
                      flex flex-row justify-start items-center" data-drop="child"
                      onClick={() => {setCurrentSortBy("ascending")}}>
                        <AnimatePresence>
                          {currentSortBy === "ascending" ? (
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
                        <span className="pointer-events-none ml-6">Ascending</span>
                      </button>
                    </li>
                    <li>
                      <button className="transition-colors px-2 py-1.5 
                      hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark w-full
                      flex flex-row justify-start items-center" data-drop="child"
                      onClick={() => {setCurrentSortBy("descending")}}>
                        <AnimatePresence>
                          {currentSortBy === "descending" ? (
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
                        <span className="pointer-events-none ml-6">Descending</span>
                      </button>
                    </li>
                  </ul>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* Cell types drop */}
          <CellTypesDropdown currentRenderType={currentRenderType} 
          setCurrentRenderType={(value:string) => setCurrentRenderType(value)}></CellTypesDropdown>
        </div>
      </header>

      <Suspense fallback={<div></div>}>
        <RenderRecentData currentSortBy={currentSortBy} updateTrigger={isUpdate}
        currentRenderType={currentRenderType}></RenderRecentData>
      </Suspense>
      
      <Suspense fallback={<div></div>}>
        <AlertButton open={isAlertOpen} text={alertText} title={alertTitle}
        type={alertType} close={() => setIsAlertOpen(false)}></AlertButton>
      </Suspense>
    </div>
  )
}