import { FileUploader } from "react-drag-drop-files";
import { useState, useRef, useEffect, useCallback, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion"

import "../../../styles/hover-elems.css"
import IconAlerts from "../../../components/icons/IconAlerts";
import { apiUrl } from "../../../data/data";
import { useNavigate, useParams } from "react-router-dom";
import SortDropdown from "../components/sort-dropdown";
import CellTypesDropdown from "../components/cell-types-dropdown";

const RenderFolderData = lazy(() => import("./render-folder-data"));
const Box = lazy(() => import('@mui/material/Box'));
const Modal = lazy(() => import('@mui/material/Modal'));

export default function DiskFolder() {
  const inputFileButtonRef:any = useRef()
  // dropdowns
  const [isAddDrop, setIsAddDrop] = useState(false)
  const [isPathDrop, setIsPathDrop] = useState(false)
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

  
  // Modal create folder
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const modalCreateOpen = (e:any) => {
    setIsCreateModalOpen(true)
  };
  const modalCreateClose = () => {
    setIsErrorAlert(false)
    setIsCreateModalOpen(false)
  };

  const modalWindowStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "auto",
    bgcolor: 'none',
    boxShadow: 24,
    borderRadius: "16px"
  };

  // Create folder
  const [isUpdate, setIsUpdate] = useState(true)
  const newFolderNameInputRef:any = useRef()
  function CreateFolder() {
    let currentName = newFolderNameInputRef.current.value
    if (currentName.length <= 0) {
      PushCreateFolderError("Please enter folder name")
    } else if (currentName.length > 21) {
      PushCreateFolderError("Folder name is too long")
    } else {
      const createFolder = async () => {
        let token = localStorage.getItem("token")
        await fetch(apiUrl + "folder", {
          method: 'POST',
          body: JSON.stringify({
            "name": currentName,
            "upperFolderToken": params.id
          }),
          headers: {
            "Content-Type": "application/json",
            "Authorization": token === null ? "" : token,
          },
        })
        .then((res) => {
          if (res.status === 400) {
            throw new Error('Bad request');
          }
          return res.json();
        })
        .then(() => {setIsUpdate(!isUpdate); modalCreateClose()})
        .catch(error => {
          console.log(error)
          PushCreateFolderError("Bad request")
        })
      }
      createFolder()
    }
  }

  // Alerts
  const [isErrorAlert, setIsErrorAlert] = useState(false)
  const [currentError, setCurrentError] = useState<string>()
  function PushCreateFolderError(text:string) {
    setCurrentError(text)
    if (!isErrorAlert) {
      setIsErrorAlert(false)
      setTimeout(() => {
        setIsErrorAlert(true)
      }, 100);
    }
  }

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
    if (e.target.dataset.drop !== "path" && e.target.dataset.drop !== "child") {
      setIsPathDrop(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', CloseAllDrops);

    return () => {
      document.removeEventListener("click", CloseAllDrops)
    }
  }, [])
  
  const params: any = useParams();
  if (params.id === undefined) {
    throw Error("Check params")
  }
  // File uploader
  const fileUploaderRef:any = useRef()
  const [isDragVisible, setIsDragVisible] = useState(false);
  //const [file, setFile] = useState([]);
  const UploaderChange = useCallback((files: any) => {
    const pushFiles = async () => {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      formData.append("folderToken", params.id);

      let token = localStorage.getItem("token")
      await fetch(apiUrl + "file", {
        method: "POST",
        body: formData,
        headers: {
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
      .then(() => setIsUpdate(!isUpdate))
      .catch(error => {
        console.log(error)
        //ShowError("User not found", "404")
      })
    }
    pushFiles()

    setIsDragVisible(false)
  }, [params.id, isUpdate]);

  function FileInputChange(e:any) {
    //console.log(e)
    const pushFiles = async () => {
      const formData = new FormData();
      for (let i = 0; i < e.target.files.length; i++) {
        formData.append("files", e.target.files[i]);
      }
      formData.append("folderToken", params.id);

      let token = localStorage.getItem("token")
      await fetch(apiUrl + "file", {
        method: "POST",
        body: formData,
        headers: {
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
      .then(() => setIsUpdate(!isUpdate))
      .catch(error => {
        console.log(error)
        //ShowError("User not found", "404")
      })
    }
    pushFiles()
  }

  function VisualizeUploader(e:any | null) {
    if (e.type === "dragenter" && e.nativeEvent?.dataTransfer?.types.length !== 0) {
      setIsDragVisible(true)
    } else if (isDragVisible === true && e.type === "mousemove") {
      fileUploaderRef.current.style.opacity = 0
      setTimeout(() => {
        setIsDragVisible(false)
      }, 100);
    } 
  }
  
  function DownloadFolder() {
    let url = apiUrl + "folder/download/" + params.id
    const a = document.createElement('a')
    a.href = url
    a.download = url.split('/').pop() ?? ""
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  interface IfolderPaths {
    name:string,
    token:string
  }
  const [folderPaths, setfolderPaths] = useState<IfolderPaths[]>()
  useEffect(() => {
    const getData = async () => {
      let token = localStorage.getItem("token")
      await fetch(apiUrl + "folder/path/" + params.id, {
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
        if (res.status === 400) {
          throw new Error('Bad request');
        }
        return res.json();
      })
      .then(data => setfolderPaths(data))
      .catch(error => {
        console.log(error)
        //ShowError("User not found", "404")
      })
    }
    if (params.id !== "main") {
      getData()
      setSelectedPath(params.id)
    } else {
      setfolderPaths(undefined)
    }
  }, [params.id])

  const [selectedPath, setSelectedPath] = useState(params.id)
  const navigate = useNavigate()
  useEffect(() => {
    console.log(selectedPath + " | " + params.id)
    if (selectedPath !== params.id) {
      navigate('./../' + selectedPath)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPath])


  



  return (
    <div onDragEnter={VisualizeUploader} 
    className="w-full min-h-fullWithHeader h-fullWithHeader px-2 md:px-6">
      <header className="w-full px-1 sm:px-0 pt-1 flex flex-row justify-between">
        {/* All actions drop */}
        <div className="flex flex-row items-center">
          <input className="absolute text-sm text-gray-900 border border-gray-300 cursor-pointer -z-10
          bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 py-1 h-0 w-0
          dark:placeholder-gray-400" id="file_input" type="file" multiple onChange={FileInputChange} ref={inputFileButtonRef}/>
          {/* Home */}
          {folderPaths !== undefined && (
            <div className="flex items-center">
              <motion.button transition={{stiffness: 300, damping: 0}} 
              initial={{x: -20, opacity: 0}} animate={{x: 0, opacity: 1}} 
              className="text-textLight dark:text-textDark hover:bg-backgroundHoverLight 
              dark:hover:bg-backgroundHoverDark first-letter:uppercase transition-colors
              font-medium rounded-full text-base sm:text-lg px-2 py-2 text-center
              inline-flex items-center" onClick={() => setSelectedPath("main")}>
                <svg viewBox="0 0 20 16" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0H2C.9 0 0 .9 0 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2h-8L8 0Z" 
                  fillRule="evenodd" className="fill-textLight dark:fill-textDark"></path>
                </svg>
              </motion.button>
              <motion.svg transition={{stiffness: 300, damping: 0, delay: 0.05}} 
              initial={{x: -20, opacity: 0}} animate={{x: 0, opacity: 1}} 
              fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg" className="stroke-textLight dark:stroke-textDark h-5 w-5 -mx-1 md:mx-0 opacity-80">
                <path d="m9 18 6-6-6-6"></path>
              </motion.svg>
            </div>
          )}
          {/* Paths */}
          {folderPaths !== undefined && folderPaths.length > 1 && (
          <>
            <motion.div initial={{x: -20, opacity: 0}} animate={{x: 0, opacity: 1}}
            transition={{stiffness: 300, damping: 0, delay: 0.1}}>
              <button className="hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark transition-colors
              rounded-full text-base sm:text-lg px-2 py-2 text-center inline-flex items-center"
              onClick={() => setIsPathDrop(!isPathDrop)} data-drop="path" title="Other folders">
                <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                  <path d="M544 32H432L400 0h-80c-17.62 0-32 14.38-32 32v160c0 17.62 14.38 32 32 32h224c17.62 
                  0 32-14.38 32-32V64c0-17.62-14.4-32-32-32zm0 288H432l-32-32h-80c-17.62 0-32 14.38-32 32v160c0 
                  17.62 14.38 32 32 32h224c17.62 0 32-14.38 32-32V352c0-17.6-14.4-32-32-32zM64 
                  16c0-8.875-7.12-16-16-16H16C7.125 0 0 7.125 0 16v400c0 17.62 14.38 32 32 32h224v-64H64V160h192V96H64V16z" 
                  className="fill-textLight dark:fill-textDark"></path>
                </svg>
              </button>
              <AnimatePresence>
                {isPathDrop ? (
                  <motion.div initial={{opacity: 0, y: -50, scaleY: 0.2}} animate={{opacity: 1, y: 0, scaleY: 1}}
                  transition={{stiffness: 200, damping: 24, duration: 0.16}} exit={{opacity: 0, y: -50, scaleY: 0.2}}
                  className="z-10 opacity-0 divide-y divide-gray-100 rounded-md w-48 mt-0.5
                  absolute shadow-defaultLight dark:shadow-none scale-y-0
                  bg-backgroundSecondLight dark:bg-backgroundThirdDark overflow-hidden">
                    <div className="py-2 text-sm font-medium text-textLight dark:text-textDark flex flex-row">
                      <div>
                        <svg className="w-4 -translate-y-2 stroke-textLight dark:stroke-textDark opacity-80" 
                        style={{height: (folderPaths.length-1) * 36}}>
                        {folderPaths === undefined ? null : folderPaths.length > 1 ? folderPaths.map((item, index) => { 
                        return index < folderPaths.length - 1 ? index === folderPaths.length - 2 ? (
                          <path key={index} d={"M8 " + (index * 36 - 10) + " C8 " + (index * 36 + 12) + ",8 " + (index * 36 + 12) + ",8 " + (index * 36 + 18) + " S8 " + (index * 36 + 26) + ", 16 " + (index * 36 + 26)} fill="none" strokeWidth="2.4"/>
                        ) : (
                          <path key={index} d={"M8 " + (index * 36 - 10) + " L8 " + (index * 36 + 26) + " L16 " + (index * 36 + 26)} fill="none" strokeWidth="2.4"/>
                        ) : null}) : null}
                        </svg>
                      </div>
                      <div className="w-[168px]">
                        {folderPaths === undefined ? null : folderPaths.length > 1 ? folderPaths.map((item, index) => { return index < folderPaths.length - 1 ? (
                          <div key={index} className="flex items-center">
                            <button className="transition-colors px-2 py-2 flex flex-row w-full rounded
                            hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark justify-start items-center
                            bg-backgroundSecondLight dark:bg-backgroundThirdDark" 
                            onClick={() => setSelectedPath(item.token)}>
                              {item.name}
                            </button>
                          </div>
                        ) : null}) : null}
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
            <motion.svg initial={{x: -20, opacity: 0}} animate={{x: 0, opacity: 1}}
            transition={{stiffness: 300, damping: 0, delay: 0.15}}
            fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg" className="stroke-textLight dark:stroke-textDark h-5 w-5 -mx-1 md:mx-0 opacity-80">
              <path d="m9 18 6-6-6-6"></path>
            </motion.svg>
          </>
          )}
          {/* Current folder */}
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
                {folderPaths === undefined ? "My storage" : folderPaths[folderPaths.length-1].name}
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
                      bg-backgroundSecondLight dark:bg-backgroundThirdDark" onClick={DownloadFolder}>
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" 
                        className="fill-iconLight dark:fill-iconDark w-6 h-6 mr-2">
                          <path d="M11 14.59V3a1 1 0 0 1 2 0v11.59l3.3-3.3a1 1 0 0 1 1.4 1.42l-5 5a1 
                          1 0 0 1-1.4 0l-5-5a1 1 0 0 1 1.4-1.42l3.3 3.3zM3 17a1 1 0 0 1 2 0v3h14v-3a1 
                          1 0 0 1 2 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3z"></path>
                        </svg>
                        <span>Download folder</span>
                      </button>
                    )}
                    <button onClick={() => {inputFileButtonRef.current.click()}} 
                    className="transition-colors px-2 py-2 flex flex-row w-full
                    hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark justify-start items-center
                    bg-backgroundSecondLight dark:bg-backgroundThirdDark">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                      className="fill-iconLight dark:fill-iconDark w-6 h-6 mr-2">
                        <path d="M13 5.41V17a1 1 0 0 1-2 0V5.41l-3.3 3.3a1 1 0 0 1-1.4-1.42l5-5a1 
                        1 0 0 1 1.4 0l5 5a1 1 0 1 1-1.4 1.42L13 5.4zM3 17a1 1 0 0 1 2 0v3h14v-3a1 
                        1 0 0 1 2 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3z"></path>
                      </svg>
                      <span>Upload files</span>
                    </button>
                    <button className="transition-colors px-2 py-2 flex flex-row w-full
                    hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark justify-start items-center
                    bg-backgroundSecondLight dark:bg-backgroundThirdDark" onClick={modalCreateOpen}>
                      <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 12V9h2v3h3v2h-3v3h-2v-3H8v-2h3Zm10-7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 
                        2 0 0 1 2-2h6c1.12 0 1.833.475 2.549 1.379.048.06.261.337.313.402.158.195.19.219.14.219H21Zm0 
                        14V7h-9.005c-.719-.004-1.186-.34-1.69-.963-.069-.086-.29-.373-.323-.416C9.607 5.15 9.384 5 9 5H3v14h18Z" 
                        fillRule="evenodd" className="fill-iconLight dark:fill-iconDark"></path>
                      </svg>
                      <span>Create folder</span>
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
          <CellTypesDropdown currentRenderType={currentRenderType} 
          setCurrentRenderType={(value:string) => setCurrentRenderType(value)}></CellTypesDropdown>
        </div>
      </header>

      <Suspense fallback={<div></div>}>
        <RenderFolderData currentSortBy={currentSortBy} updateTrigger={isUpdate}
        currentSortType={currentSortType} currentRenderType={currentRenderType}></RenderFolderData>
      </Suspense>

      {/* Create folder */}
      <Modal open={isCreateModalOpen}
        onClose={modalCreateClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={modalWindowStyle}>
          <div className="text-textLight dark:text-textDark p-4 rounded-lg
          bg-backgroundSecondLight dark:bg-backgroundSecondDark min-w-xs">
            <p className=" text-2xl font-semibold">Create</p>
            <input className=" my-4 w-full border border-borderLight dark:border-borderDark 
            text-textLight text-sm rounded-lg block p-2 dark:focus:border-textDark
            focus:border-textLight bg-backgroundThirdLight dark:bg-backgroundThirdDark
            dark:placeholder-gray-400 dark:text-textDark "
            type="text" placeholder="folder name"
            ref={newFolderNameInputRef}></input>
            <div className="flex justify-end text-base gap-2">
              <button className=" hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark
              px-4 rounded-full transition-colors"
              onClick={modalCreateClose}>
                Calcel
              </button>
              <button className=" bg-buttonLight dark:bg-buttonDark rounded-full px-3 py-1
              hover:bg-buttonHoverLight hover:dark:bg-buttonHoverDark transition-colors"
              onClick={CreateFolder}>
                Create
              </button>
            </div>

            <AnimatePresence>
              {isErrorAlert ? (
                <motion.button initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}}
                transition={{stiffness: 200, damping: 24, duration: 0.1}}
                onClick={(e:any) => {e.target.style.marginTop = "-40px"; 
                  setTimeout(() => {
                    setIsErrorAlert(false)
                  }, 250);}}
                className="text-error rounded-2xl absolute
                bg-backgroundLight dark:bg-backgroundDark p-2 min-w-xs w-full -ml-4 mt-6 -z-10
                flex justify-center items-center font-medium transition-[margin]">
                  <IconAlerts classes="mr-2 h-5 w-5" type="error"></IconAlerts>
                  <span className="pointer-events-none">{currentError}</span>
                </motion.button>
              ) : null}
            </AnimatePresence>
          </div>
        </Box>
      </Modal>

      {/* Drag and drop files */}
      {isDragVisible === true ? (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} ref={fileUploaderRef}
        onMouseMove={VisualizeUploader} className="absolute transition-dropFiles top-0 left-0 z-50 h-fulldvh w-fulldvw bg-black/70">
          <FileUploader onDragEnter={VisualizeUploader} multiple={true} onTypeError={(err:any) => console.log(err)} 
          classes=" max-h-fulldvh h-full100 max-w-fulldvw w-full100 justify-center text-center fill-white
          p-dfUploadFiles sm:p-smUploadFiles md:p-mdUploadFiles lg:p-lgUploadFiles xl:p-xlUploadFiles 2xl:p-xl2UploadFiles
          outline-3 -outline-offset-8 outline-blue-700 outline-dashed border-imp0 hover:bg-red"
          handleChange={UploaderChange} name="file" />
        </motion.div>
      ) : null}
    </div>
  )
}