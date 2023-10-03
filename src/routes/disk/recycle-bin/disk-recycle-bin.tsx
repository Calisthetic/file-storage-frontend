import { FunctionComponent, Suspense, useEffect, useState } from "react";
import SortDropdown from "../components/sort-dropdown";
import CellTypesDropdown from "../components/cell-types-dropdown";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../../../data/data";
import RenderBinData from "./render-bin-data";
import { cn } from "../../../lib/color-utils";

interface DiskRecycleBinProps {
  
}
 
const DiskRecycleBin: FunctionComponent<DiskRecycleBinProps> = () => {
  const params: any = useParams();
  if (params.id === undefined) {
    throw Error("Check params")
  }

  // Update render component
  const [isUpdate, setIsUpdate] = useState(false)

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

  const [currentFolder, setCurrentFolder] = useState<any>();
  useEffect(() => {
    const getData = async () => {
      let token = localStorage.getItem("token")
      await fetch(apiUrl + "folders/binName/" + params.id, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token === null ? "" : token,
        },
      })
      .then((res) => {
        if (res.status === 404) {
          throw new Error('Folder not found');
        }
        if (res.status === 403) {
          setCurrentFolder(null)
          throw new Error("Bad request")
        }
        if (res.status === 400) {
          throw new Error('Bad request');
        }
        return res.json()
      })
      .then(data => setCurrentFolder(data.name))
      .catch(error => {
        console.log(error)
        //ShowError("User not found", "404")
      })
    }
    if (params.id === "main") {
      setCurrentFolder(undefined)
    } else {
      getData()
    }
    setSelectedPath(params.id)
  }, [params.id])

  const [selectedPath, setSelectedPath] = useState(params.id)
  const navigate = useNavigate()
  useEffect(() => {
    if (selectedPath !== params.id) {
      navigate('/disk/bin/' + selectedPath)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPath])
  
  const [isAddDrop, setIsAddDrop] = useState(false)
  function CloseAllDrops(e:any) {
    if (e.target.dataset.drop !== "add" && e.target.dataset.drop !== "child") {
      setIsAddDrop(false)
    }
  }
  useEffect(() => {
    document.addEventListener('click', CloseAllDrops);

    return () => {
      document.removeEventListener("click", CloseAllDrops)
    }
  }, [])

  async function DownloadBinFolder() {
    let url = apiUrl + "folders/download/" + params.id
    const a = document.createElement('a')
    a.href = url
    a.download = url.split('/').pop() ?? ""
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  async function RestoreBin() {
    const restoreBinOrFolder = async () => {
      let token = localStorage.getItem("token")
      await fetch(apiUrl + (params.id === "main" ? "bin/restore" : ("folders/restore/" + params.id)), {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token === null ? "" : token,
        },
      })
      .then((res) => {
        if (res.status === 400) {
          throw new Error('Bad request');
        }
        if (res.status === 404) {
          throw new Error('Not found');
        }
      })
      .then(() => {setIsUpdate(!isUpdate); navigate("disk/bin/main")})
      .catch(error => {
        console.log(error)
        //ShowError("User not found", "404")
      })
    }
    restoreBinOrFolder()
  }

  async function CleanBin() {
    const cleanBinOrFolder = async () => {
      let token = localStorage.getItem("token")
      await fetch(apiUrl + (params.id === "main" ? "bin/clean" : ("folders/" + params.id)), {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token === null ? "" : token,
        },
      })
      .then((res) => {
        if (res.status === 400) {
          throw new Error('Bad request');
        }
        if (res.status === 404) {
          throw new Error('Not found');
        }
      })
      .then(() => {setIsUpdate(!isUpdate); navigate("disk/bin/main")})
      .catch(error => {
        console.log(error)
        //ShowError("User not found", "404")
      })
    }
    cleanBinOrFolder()
  }
  
  return (
    <div className="w-full min-h-fullWithHeader h-fullWithHeader px-2 md:px-6">
      <header className="w-full px-1 sm:px-0 pt-1 flex flex-row justify-between">
        {/* All actions drop */}
        <div className="flex flex-row items-center">
          {/* Home */}
          <AnimatePresence>
            {currentFolder !== undefined && (
              <div className="flex items-center transition-[width] absolute">
                <motion.button transition={{stiffness: 300, damping: 24}} 
                initial={{x: -20, opacity: 0}} animate={{x: 0, opacity: 1}} exit={{x:-60, opacity: 0}}
                className="text-textLight dark:text-textDark hover:bg-backgroundHoverLight 
                dark:hover:bg-backgroundHoverDark first-letter:uppercase transition-colors
                font-medium rounded-full text-base sm:text-lg px-2 py-2 text-center
                inline-flex items-center" onClick={() => setSelectedPath("main")}>
                  <svg viewBox="0 0 20 16" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 0H2C.9 0 0 .9 0 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2h-8L8 0Z" 
                    fillRule="evenodd" className="fill-textLight dark:fill-textDark"></path>
                  </svg>
                </motion.button>
                <motion.svg transition={{stiffness: 300, damping: 0}} 
                initial={{x: -20, opacity: 0}} animate={{x: 0, opacity: 1}} exit={{x:-60, opacity: 0}}
                fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg" className="stroke-textLight dark:stroke-textDark h-5 w-5 -mx-1 md:mx-0 opacity-80">
                  <path d="m9 18 6-6-6-6"></path>
                </motion.svg>
              </div>
            )}
          </AnimatePresence>
          
          {/* Current folder */}
          <div className={cn("transition-all", {
            "ml-[60px]": currentFolder !== undefined,
            "ml-0": currentFolder === undefined
          })}>
            {currentFolder === null ? (
              <motion.div initial={{opacity: 0}} animate={{opacity: 1, y: 0}} 
              transition={{damping: 24, stiffness: 300, delay: 0.2}} exit={{opacity: 0, x: 20}}
              onClick={() => {setIsAddDrop(!isAddDrop)}} id="drop-actions" aria-label="Actions" data-drop="add"
              className="text-textLight dark:text-textDark
              font-medium rounded-full text-base sm:text-lg px-2 py-2 text-center 
              max-w-[37dvw] sm:max-w-[28dvw] md:max-w-none
              focus:dark:bg-backgroundThirdDark focus:bg-backgroundThirdLight inline-flex items-center">
                <span className="truncate pointer-events-none">...</span>
              </motion.div>
            ) : (
              <>
                <motion.button initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} 
                transition={{damping: 24, stiffness: 300, delay: 0.2}}
                onClick={() => {setIsAddDrop(!isAddDrop)}} id="drop-actions" aria-label="Actions" data-drop="add"
                className="text-textLight dark:text-textDark hover:bg-backgroundHoverLight 
                dark:hover:bg-backgroundHoverDark first-letter:uppercase transition-colors
                font-medium rounded-full text-base sm:text-lg px-2 py-2 text-center 
                max-w-[37dvw] sm:max-w-[28dvw] md:max-w-none
                focus:dark:bg-backgroundThirdDark focus:bg-backgroundThirdLight inline-flex items-center">
                  <span className="truncate pointer-events-none">
                    {currentFolder ? currentFolder : "My bin"}
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
                        {params.id === "main" ? null : (
                          <button className="transition-colors px-2 py-2 flex flex-row w-full
                          hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark justify-start items-center
                          bg-backgroundSecondLight dark:bg-backgroundThirdDark" onClick={DownloadBinFolder}>
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" 
                            className="fill-iconLight dark:fill-iconDark w-6 h-6 mr-2">
                              <path d="M11 14.59V3a1 1 0 0 1 2 0v11.59l3.3-3.3a1 1 0 0 1 1.4 1.42l-5 5a1 
                              1 0 0 1-1.4 0l-5-5a1 1 0 0 1 1.4-1.42l3.3 3.3zM3 17a1 1 0 0 1 2 0v3h14v-3a1 
                              1 0 0 1 2 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3z"></path>
                            </svg>
                            <span>Download folder</span>
                          </button>
                        )}
                        <button className="transition-colors px-2 py-2 flex flex-row w-full
                        hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark justify-start items-center
                        bg-backgroundSecondLight dark:bg-backgroundThirdDark" onClick={RestoreBin}>
                          <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 12V9h2v3h3v2h-3v3h-2v-3H8v-2h3Zm10-7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 
                            2 0 0 1 2-2h6c1.12 0 1.833.475 2.549 1.379.048.06.261.337.313.402.158.195.19.219.14.219H21Zm0 
                            14V7h-9.005c-.719-.004-1.186-.34-1.69-.963-.069-.086-.29-.373-.323-.416C9.607 5.15 9.384 5 9 5H3v14h18Z" 
                            fillRule="evenodd" className="fill-iconLight dark:fill-iconDark"></path>
                          </svg>
                          <span>{params.id === "main" ? "Retrieve all" : "Retrieve folder"}</span>
                        </button>
                        <button className="transition-colors px-2 py-2 flex flex-row w-full
                        hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark justify-start items-center
                        bg-backgroundSecondLight dark:bg-backgroundThirdDark" onClick={CleanBin}>
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                          className="fill-iconLight dark:fill-iconDark w-6 h-6 mr-2">
                            <path d="M21 5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6c1.12 
                            0 1.833.475 2.549 1.379.048.06.261.337.313.402.158.195.19.219.14.219H21Zm0 
                            14V7h-9.005c-.719-.004-1.186-.34-1.69-.963-.069-.086-.29-.373-.323-.416C9.607 5.15 9.384 5 9 
                            5H3v14h18Zm-9-7.414 2.293-2.293 1.414 1.414L13.414 13l2.293 2.293-1.414 1.414L12 14.414l-2.293 
                            2.293-1.414-1.414L10.586 13l-2.293-2.293 1.414-1.414L12 11.586Z" fillRule="evenodd"></path></svg>
                          <span>{params.id === "main" ? "Delete all" : "Delete folder"}</span>
                        </button>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-row items-center space-x-1">
          {/* Sorting */}
          <SortDropdown currentSortBy={currentSortBy} setCurrentSortBy={(value:string) => setCurrentSortBy(value)}
          currentSortType={currentSortType} setCurrentSortType={(value:string) => setCurrentSortType(value)}></SortDropdown>

          {/* Cell types drop */}
          <CellTypesDropdown currentRenderType={currentRenderType} 
          setCurrentRenderType={(value:string) => setCurrentRenderType(value)}></CellTypesDropdown>
        </div>
      </header>

      <Suspense fallback={<div></div>}>
        <RenderBinData currentSortBy={currentSortBy} updateTrigger={isUpdate}
        currentSortType={currentSortType} currentRenderType={currentRenderType}></RenderBinData>
      </Suspense>
    </div>
  );
}
 
export default DiskRecycleBin;