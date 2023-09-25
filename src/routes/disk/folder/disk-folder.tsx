import { FileUploader } from "react-drag-drop-files";
import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import "../../../styles/hover-elems.css"
import RenderData from "./render-data";
import IconAlerts from "../../../components/icons/IconAlerts";
import { apiUrl } from "../../../data/data";

export default function DiskFolder() {
  const inputFileButtonRef:any = useRef()
  // dropdowns
  const [isAddDrop, setIsAddDrop] = useState(false)
  const [isCellTypeDrop, setIsCellTypeDrop] = useState(false)
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
  const sortTypes = ["name", "type", "size", "date"]
  const [currentSortType, setCurrentSortType] 
    = useState(renderValues.sort_type ? renderValues.sort_type : sortTypes[0])
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
            "name": currentName
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
    e.preventDefault()
    if (e.target.dataset.drop !== "add" && e.target.dataset.drop !== "child") {
      setIsAddDrop(false)
    }
    if (e.target.dataset.drop !== "cellType" && e.target.dataset.drop !== "child") {
      setIsCellTypeDrop(false)
    }
    if (e.target.dataset.drop !== "sort" && e.target.dataset.drop !== "child") {
      setIsSortDrop(false)
    }
  }

  useEffect(() => {
    let rootElem = document.getElementById("root")
    if (rootElem) {
      rootElem.addEventListener('click', CloseAllDrops);
    }

    return () => {
      rootElem?.removeEventListener("click", CloseAllDrops)
    }
  }, [])

  // File uploader
  const fileUploaderRef:any = useRef()
  const [isDragVisible, setIsDragVisible] = useState(false);
  //const [file, setFile] = useState([]);
  const handleChange = useCallback((files: any) => {
    const pushFiles = async () => {
      const request = new XMLHttpRequest();
      const formData = new FormData();

      request.open("POST", apiUrl + "files", true);
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          console.log(request.responseText);
        }
      };
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
      }
      request.send(formData);
    }
    pushFiles()

    setIsDragVisible(false)
    console.log(files)
  }, []);

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
  


  



  return (
    <div onDragEnter={VisualizeUploader} 
    className="w-full min-h-fullWithHeader h-fullWithHeader px-2 md:px-6">
      <header className="w-full px-1 sm:px-0 pt-1 flex flex-row justify-between">
        {/* All actions drop */}
        <div>
          <motion.button initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} 
          transition={{damping: 24, duration: 0.25, stiffness: 300}} 
          onClick={() => {setIsAddDrop(!isAddDrop)}} id="drop-actions" aria-label="Actions" data-drop="add"
          className=" text-textLight dark:text-textDark hover:bg-backgroundHoverLight 
          dark:hover:bg-backgroundHoverDark first-letter:uppercase
          font-medium rounded-full text-base sm:text-lg px-4 py-2 text-center
          focus:dark:bg-backgroundThirdDark inline-flex items-center">My storage
            <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" 
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path className="stroke-textLight dark:stroke-textDark" strokeLinecap="round" 
              strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
          </motion.button>
          <AnimatePresence>
            {isAddDrop ? (
              <motion.div initial={{opacity: 0, y: -50, scaleY: 0.2}} animate={{opacity: 1, y: 0, scaleY: 1}}
              transition={{stiffness: 200, damping: 24, duration: 0.16}} exit={{opacity: 0, y: -50, scaleY: 0.2}} 
              className="z-10 opacity-0 divide-y divide-gray-100 rounded w-44 mt-0.5
              absolute shadow-defaultLight dark:shadow-none scale-y-0
              bg-backgroundSecondLight dark:bg-backgroundThirdDark overflow-hidden">
                <div className="py-2 text-sm font-medium text-textLight dark:text-textDark">
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
                  <input className="absolute w-full text-sm text-gray-900 border border-gray-300 cursor-pointer -z-10
                  bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 py-1
                  dark:placeholder-gray-400" id="file_input" multiple={true} type="file" ref={inputFileButtonRef}/>
                  <button onClick={() => {inputFileButtonRef.current.click()}} 
                  className="transition-colors px-2 py-2 flex flex-row w-full
                  hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark justify-start items-center
                  bg-backgroundSecondLight dark:bg-backgroundThirdDark">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24"
                    className="w-6 h-6 mr-2"><g>
                      <path d="M11.3 15.7c.1.1.2.2.3.2.1.1.3.1.4.1s.3 0 .4-.1c.1-.1.2-.1.3-.2l4-4c.4-.4.4-1 0-1.4s-1-.4-1.4 0L13 
                      12.6V5c0-.6-.4-1-1-1s-1 .4-1 1v7.6l-2.3-2.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l4 4z" className="fill-iconLight dark:fill-iconDark"></path>
                      <path d="M19 13c-.6 0-1 .4-1 1v2c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2v-2c0-.6-.4-1-1-1s-1 .4-1 1v2c0 2.2 1.8 4 4 
                      4h8c2.2 0 4-1.8 4-4v-2c0-.6-.4-1-1-1z" className="fill-iconLight dark:fill-iconDark"></path></g>
                    </svg>
                    <span>Add files</span>
                  </button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="flex flex-row items-center space-x-1">
          {/* Sorting */}
          <div className="">
            <button onClick={() => {setIsSortDrop(!isSortDrop)}} id="drop-sort" aria-label="Sort" data-drop="sort"
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
                    {sortTypes.map((item, index) => (
                      <li key={index}>
                        <button className="transition-colors px-2 py-1.5 w-full
                        hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark 
                        flex flex-row justify-start items-center" data-drop="child"
                        data-name={item} onClick={() => {setCurrentSortType(item)}}>
                          <AnimatePresence>
                            {currentSortType === item ? (
                              <motion.svg initial={{x: -50}} animate={{x: 0}} exit={{x: -50}}
                              transition={{damping: 24, stiffness: 300, duration: 0.25}}
                              viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4 absolute">
                                <path d="M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 
                                412.9 200.2 416 192 416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 
                                32 264.2 32 256c0-18.28 14.95-32 32-32 8.188 0 16.38 3.125 22.62 9.375L192 
                                338.8l233.4-233.4c6.2-6.27 14.4-9.4 22.6-9.4 17.1 0 32 13.7 32 32z" 
                                className=" fill-iconLight dark:fill-iconDark"></path>
                              </motion.svg>
                            ) : null}
                          </AnimatePresence>
                          <span className="pointer-events-none ml-6 first-letter:uppercase">{item}</span>
                        </button>
                      </li>
                    ))}
                    <li>
                      <div className="border my-1 border-borderLight dark:border-borderDark"></div>
                    </li>
                    {/* is order by ascending or descending */}
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
              ) : (currentRenderType === "table" ? (
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
              ) : ( // tile
                <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} 
                transition={{damping: 24, duration: 0.25, stiffness: 300}}
                className="w-10 h-10 flex justify-center items-center pointer-events-none">
                  <svg className="h-6 w-6 fill-iconLight dark:fill-iconDark"
                  viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 16 16">
                    <path d="M0 0h4v4H0zM6 0h4v4H6zM12 0h4v4h-4zM0 6h4v4H0zM6 6h4v4H6zM12 6h4v4h-4zM0 12h4v4H0zM6 
                    12h4v4H6zM12 12h4v4h-4z" className="fill-iconLight dark:fill-iconDark"></path>
                  </svg>
                </motion.div>
              ))}
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
                    {currentRenderType !== "tile" ? (
                      <li>
                        <button className="transition-colors px-2 py-2 flex flex-row
                        hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark justify-start items-center" 
                        title="tiles" onClick={() => {setCurrentRenderType("tile")}}>
                          <svg className="h-6 w-6 fill-iconLight dark:fill-iconDark"
                          viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 16 16">
                            <path d="M0 0h4v4H0zM6 0h4v4H6zM12 0h4v4h-4zM0 6h4v4H0zM6 6h4v4H6zM12 6h4v4h-4zM0 12h4v4H0zM6 
                            12h4v4H6zM12 12h4v4h-4z" className="fill-iconLight dark:fill-iconDark"></path>
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

      <RenderData currentSortBy={currentSortBy} updateTrigger={isUpdate}
      currentSortType={currentSortType} currentRenderType={currentRenderType}></RenderData>

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
          handleChange={handleChange} name="file" />
        </motion.div>
      ) : null}
    </div>
  )
}