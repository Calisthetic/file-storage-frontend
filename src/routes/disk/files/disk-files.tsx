import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion"

import "../../../styles/hover-elems.css"
import { apiUrl } from "../../../data/data";
import { useNavigate } from "react-router-dom";
import SortDropdown from "../components/sort-dropdown";
import CellTypesDropdown from "../components/cell-types-dropdown";

const RenderFilesData = lazy(() => import("./render-files-data"));

export default function DiskFolder() {
  // dropdowns
  const [isAddDrop, setIsAddDrop] = useState(false)
  const [isCellTypeDrop, setIsCellTypeDrop] = useState(false)
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
  const [currentSortType, setCurrentSortType] 
    = useState(renderValues.sort_type ? renderValues.sort_type : "name")
  const [currentSortBy, setCurrentSortBy] 
    = useState(renderValues.sort_by ? renderValues.sort_by : "ascending")

  const [isUpdate, setIsUpdate] = useState(true)

  // Auto saving render types and sorting
  useEffect(() => {
    let currentRenderValues:RenderValues = {
      render_type: currentRenderType,
      sort_type: currentSortType,
      sort_by: currentSortBy
    }
    localStorage.setItem("renderValues", JSON.stringify(currentRenderValues))
  }, [currentRenderType, currentSortType, currentSortBy])

  // Close dropdowns
  function CloseAllDrops(e:any) {
    if (e.target.dataset.drop !== "add" && e.target.dataset.drop !== "child") {
      setIsAddDrop(false)
    }
    if (e.target.dataset.drop !== "cellType" && e.target.dataset.drop !== "child") {
      setIsCellTypeDrop(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', CloseAllDrops);

    return () => {
      document.removeEventListener("click", CloseAllDrops)
    }
  }, [])

  function DownloadAllFiles() {}

  function DeleteAllFiles() {}

  



  return (
    <div className="w-full min-h-fullWithHeader h-fullWithHeader px-2 md:px-6">
      <header className="w-full px-1 sm:px-0 pt-1 flex flex-row justify-between">
        {/* All actions drop */}
        <div className="flex flex-row items-center">
          {/* Current file */}
          <div className="">
            <motion.button initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} 
            transition={{damping: 24, stiffness: 300, delay: 0.2}} 
            onClick={() => {setIsAddDrop(!isAddDrop)}} id="drop-actions" aria-label="Actions" data-drop="add"
            className="text-textLight dark:text-textDark hover:bg-backgroundHoverLight 
            dark:hover:bg-backgroundHoverDark first-letter:uppercase transition-colors
            font-medium rounded-full text-base sm:text-lg px-2 py-2 text-center 
            max-w-[37dvw] sm:max-w-[28dvw] md:max-w-none
            focus:dark:bg-backgroundThirdDark focus:bg-backgroundThirdLight inline-flex items-center">
              <span className="truncate pointer-events-none">
                My files
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
                    bg-backgroundSecondLight dark:bg-backgroundThirdDark" onClick={DownloadAllFiles}>
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" 
                      className="fill-iconLight dark:fill-iconDark w-6 h-6 mr-2">
                        <path d="M11 14.59V3a1 1 0 0 1 2 0v11.59l3.3-3.3a1 1 0 0 1 1.4 1.42l-5 5a1 
                        1 0 0 1-1.4 0l-5-5a1 1 0 0 1 1.4-1.42l3.3 3.3zM3 17a1 1 0 0 1 2 0v3h14v-3a1 
                        1 0 0 1 2 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3z"></path>
                      </svg>
                      <span>Download all</span>
                    </button>
                    <button className="transition-colors px-2 py-2 flex flex-row w-full
                    hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark justify-start items-center
                    bg-backgroundSecondLight dark:bg-backgroundThirdDark" onClick={DeleteAllFiles}>
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                      className="fill-iconLight dark:fill-iconDark w-6 h-6 mr-2">
                        <path d="M21 5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6c1.12 
                        0 1.833.475 2.549 1.379.048.06.261.337.313.402.158.195.19.219.14.219H21Zm0 
                        14V7h-9.005c-.719-.004-1.186-.34-1.69-.963-.069-.086-.29-.373-.323-.416C9.607 5.15 9.384 5 9 
                        5H3v14h18Zm-9-7.414 2.293-2.293 1.414 1.414L13.414 13l2.293 2.293-1.414 1.414L12 14.414l-2.293 
                        2.293-1.414-1.414L10.586 13l-2.293-2.293 1.414-1.414L12 11.586Z" fillRule="evenodd"></path>
                      </svg>
                      <span>Delete all</span>
                    </button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-row items-center space-x-1">
          {/* Sorting */}
          <SortDropdown currentSortBy={currentSortBy} setCurrentSortBy={(value:string) => setCurrentSortBy(value)}
          currentSortType={currentSortType} setCurrentSortType={(value:string) => setCurrentSortType(value)}></SortDropdown>

          {/* Cell types drop */}
          <div>
            <button data-drop="cellType" id="drop-cell-type" aria-label="Cell type"
            onClick={() => {setIsCellTypeDrop(!isCellTypeDrop)}}
            className="text-white hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark
            font-medium rounded-full text-center h-10 w-10 inline-flex items-center first-letter:uppercase
            focus:dark:bg-backgroundThirdDark">
              {currentRenderType === "list" ? (
                <motion.p initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} 
                transition={{damping: 24, duration: 0.25, stiffness: 300}}
                className="w-10 h-10 flex justify-center items-center pointer-events-none">
                  <svg className="h-6 w-6 fill-iconLight dark:fill-iconDark"
                  viewBox="0 0 18 10" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 6h2V4H0v2Zm0 4h2V8H0v2Zm0-8h2V0H0v2Zm4 4h14V4H4v2Zm0 4h14V8H4v2ZM4 
                    0v2h14V0H4Z" fillRule="evenodd" className="fill-iconLight dark:fill-iconDark"></path>
                  </svg>
                </motion.p>
              ) : ( // table
                <motion.section initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} 
                transition={{damping: 24, duration: 0.25, stiffness: 300}}
                className="w-10 h-10 flex justify-center items-center pointer-events-none">
                  <svg className="h-6 w-6 fill-iconLight dark:fill-iconDark"
                  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 14h12v-3H9v3Zm-2 0v-3H3v3h4Zm2-8v3h12V6H9ZM7 6H3v3h4V6Zm2 13h12v-3H9v3Zm-2 
                    0v-3H3v3h4ZM3 4h18a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" 
                    fillRule="evenodd" className="fill-iconLight dark:fill-iconDark"></path>
                  </svg>
                </motion.section>
              )}
            </button>
            <AnimatePresence>
              {isCellTypeDrop === true ? (
                <motion.div initial={{opacity: 0, y: -70, scaleY: 0.2}} animate={{opacity: 1, y: 0, scaleY: 1}}
                transition={{stiffness: 200, damping: 24, duration: 0.16}} exit={{opacity: 0, y: -70, scaleY: 0}}
                className="divide-y divide-gray-100 rounded w-10 mt-0.5
                absolute shadow-defaultLight dark:shadow-none z-10
                bg-backgroundSecondLight dark:bg-backgroundThirdDark">
                  <ul className=" text-sm font-medium text-textLight dark:text-textDark">
                    {currentRenderType !== "list" ? (
                      <li>
                        <button className="transition-colors px-2 py-2 flex flex-row
                        hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark justify-start items-center" 
                        title="list" onClick={() => {setCurrentRenderType("list")}}>
                          <svg className="h-6 w-6 fill-iconLight dark:fill-iconDark"
                          viewBox="0 0 18 10" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 6h2V4H0v2Zm0 4h2V8H0v2Zm0-8h2V0H0v2Zm4 4h14V4H4v2Zm0 4h14V8H4v2ZM4 
                            0v2h14V0H4Z" fillRule="evenodd" className="fill-iconLight dark:fill-iconDark"></path>
                          </svg>
                        </button>
                      </li>
                    ) : null}
                    {currentRenderType !== "table" ? (
                      <li>
                        <button className="transition-colors px-2 py-2 flex flex-row
                        hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark justify-start items-center" 
                        title="table" onClick={() => {setCurrentRenderType("table")}}>
                          <svg className="h-6 w-6"
                          viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 14h12v-3H9v3Zm-2 0v-3H3v3h4Zm2-8v3h12V6H9ZM7 6H3v3h4V6Zm2 13h12v-3H9v3Zm-2 
                            0v-3H3v3h4ZM3 4h18a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" 
                            fillRule="evenodd" className="fill-iconLight dark:fill-iconDark"></path>
                          </svg>
                        </button>
                      </li>
                    ) : null}
                  </ul>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <Suspense fallback={<div></div>}>
        <RenderFilesData currentSortBy={currentSortBy} updateTrigger={isUpdate}
        currentSortType={currentSortType} currentRenderType={currentRenderType}></RenderFilesData>
      </Suspense>
    </div>
  )
}