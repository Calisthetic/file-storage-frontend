import { useParams } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion"
import { Dropdown, Ripple, initTE, } from "tw-elements";

import "../../../styles/data-title.css"
import "../../../styles/hover-elems.css"
import RenderData from "./render-data";

initTE({ Dropdown, Ripple });

export default function DiskFolder() {
  const inputFileButtonRef:any = useRef()
  const addDropRef:any = useRef() // dropdown
  const [isAddDrop, setIsAddDrop] = useState(true)
  const cellTypeDropRef:any = useRef() // dropdown
  const [isCellTypeDrop, setIsCellTypeDrop] = useState(true)
  const sortDropRef:any = useRef() // dropdown
  const [isSortDrop, setIsSortDrop] = useState(true)
  const [currentRenderType, setCurrentRenderType] = useState("list")
  const [currentSortType, setCurrentSortType] = useState("name")
  const [currentSortBy, setCurrentSortBy] = useState("ascending")

  function VisualizeAddDrop() {
    setIsAddDrop(!isAddDrop)
    if (isAddDrop === true) {
      addDropRef.current.style.opacity = 1
      addDropRef.current.style.transform = "scale(1,1) translate(0%, 0%)"
    } else {
      addDropRef.current.style.opacity = 0
      addDropRef.current.style.transform = "scale(1,0) translate(0%, -100%)"
    }
  }
  function VisualizeCellTypeDrop() {
    setIsCellTypeDrop(!isCellTypeDrop)
    if (isCellTypeDrop === true) {
      cellTypeDropRef.current.style.opacity = 1
      cellTypeDropRef.current.style.transform = "scale(1,1) translate(0%, 0%)"
    } else {
      cellTypeDropRef.current.style.opacity = 0
      cellTypeDropRef.current.style.transform = "scale(1,0) translate(0%, -100%)"
    }
  }
  function VisualizeSortDrop() {
    setIsSortDrop(!isSortDrop)
    if (isSortDrop === true) {
      sortDropRef.current.style.opacity = 1
      sortDropRef.current.style.transform = "scale(1,1) translate(calc(-100% + 42px), 0%)"
    } else {
      sortDropRef.current.style.opacity = 0
      sortDropRef.current.style.transform = "scale(1,0) translate(calc(-100% + 42px), -100%)"
    }
  }
  function SelectCurrentRenderType(e: any) {
    setCurrentRenderType(e.target.dataset.name)
  }

  function CloseAllDrops(e:any) {
    if (!isAddDrop) {
      VisualizeAddDrop()
    }
    if (!isCellTypeDrop) {
      VisualizeCellTypeDrop()
    }
    if (!isSortDrop && e.target.dataset.popup === undefined) {
      VisualizeSortDrop()
    }
  }

  // File uploader
  const params: any = useParams();
  if (params.id === undefined) {
    window.location.replace("./folder/main")
  }

  const fileUploaderRef:any = useRef()
  const [isDragVisible, setIsDragVisible] = useState(false);
  const [file, setFile] = useState([]);
  const handleChange = (files: any) => {
    setFile(files);
    setIsDragVisible(false)
    console.log(file)
  };

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
    <div onDragEnter={VisualizeUploader} onClick={CloseAllDrops} 
    className="w-full min-h-fullWithHeader sm:px-6">
      <header className="w-full px-1 sm:px-0 pt-1 flex flex-row justify-between">
        {/* All actions drop */}
        <div>
          <button onClick={VisualizeAddDrop} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" 
          className=" text-textLight dark:text-textDark hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark first-letter:uppercase
          font-medium rounded-full text-base sm:text-lg px-4 py-2 text-center inline-flex items-center transition-dropDown
          focus:dark:bg-backgroundThirdDark" 
          type="button">My storage
            <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path className="stroke-textLight dark:stroke-textDark" strokeLinecap="round" 
              strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
          </button>
          <div id="dropdown" className="z-10 opacity-0 divide-y divide-gray-100 rounded w-44 mt-0.5
          absolute transition-dropDown shadow-defaultLight dark:shadow-none scale-y-0
          bg-backgroundSecondLight dark:bg-backgroundThirdDark overflow-hidden"
          ref={addDropRef}>
            <ul className="py-2 text-sm font-medium text-textLight dark:text-textDark" aria-labelledby="dropdownDefaultButton">
              <li>
                <p className="cursor-pointer transition-colors px-2 py-2 flex flex-row 
                hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark justify-start items-center
                bg-backgroundSecondLight dark:bg-backgroundThirdDark">
                  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 12V9h2v3h3v2h-3v3h-2v-3H8v-2h3Zm10-7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 
                    2 0 0 1 2-2h6c1.12 0 1.833.475 2.549 1.379.048.06.261.337.313.402.158.195.19.219.14.219H21Zm0 
                    14V7h-9.005c-.719-.004-1.186-.34-1.69-.963-.069-.086-.29-.373-.323-.416C9.607 5.15 9.384 5 9 5H3v14h18Z" 
                    fillRule="evenodd" className="fill-iconLight dark:fill-iconDark"></path>
                  </svg>
                  <span>Create folder</span>
                </p>
              </li>
              <li>
                  <input className="absolute w-full text-sm text-gray-900 border border-gray-300 cursor-pointer -z-10
                  bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 py-1
                  dark:placeholder-gray-400" id="file_input" multiple={true} type="file" ref={inputFileButtonRef}/>
                  <p onClick={() => {inputFileButtonRef.current.click()}} 
                  className="cursor-pointer transition-colors px-2 py-2 flex flex-row
                  hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark justify-start items-center
                  bg-backgroundSecondLight dark:bg-backgroundThirdDark">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24"
                    className="w-6 h-6 mr-2"><g id="_icons">
                      <path d="M11.3 15.7c.1.1.2.2.3.2.1.1.3.1.4.1s.3 0 .4-.1c.1-.1.2-.1.3-.2l4-4c.4-.4.4-1 0-1.4s-1-.4-1.4 0L13 
                      12.6V5c0-.6-.4-1-1-1s-1 .4-1 1v7.6l-2.3-2.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l4 4z" className="fill-iconLight dark:fill-iconDark"></path>
                      <path d="M19 13c-.6 0-1 .4-1 1v2c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2v-2c0-.6-.4-1-1-1s-1 .4-1 1v2c0 2.2 1.8 4 4 
                      4h8c2.2 0 4-1.8 4-4v-2c0-.6-.4-1-1-1z" className="fill-iconLight dark:fill-iconDark"></path></g>
                    </svg>
                    <span>Add files</span>
                  </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-row items-center space-x-1">
          {/* Sorting */}
          <div>
            <button onClick={VisualizeSortDrop} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" 
            className=" text-textLight dark:text-textDark hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark
            font-medium rounded-full text-base sm:text-lg w-10 h-10 sm:w-11 sm:h-11 
            text-center justify-center inline-flex items-center transition-dropDown
            focus:bg-none focus:dark:bg-backgroundThirdDark first-letter:uppercase" 
            type="button">
              <motion.svg initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} 
              transition={{damping: 24, duration: 0.25, stiffness: 300}}
              viewBox="0 0 24 24" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                <path d="m6 20 4-4H7V4H5v12H2zm5-12h9v2h-9zm0 4h7v2h-7zm0-8h11v2H11zm0 12h5v2h-5z" 
                className="fill-iconLight dark:fill-iconDark"></path>
              </motion.svg>
            </button>
            <div id="dropdown" className="z-10 opacity-0 divide-y divide-gray-100 rounded w-44 mt-0.5
            absolute transition-dropDown -translate-x-3/4 shadow-defaultLight dark:shadow-none
            bg-backgroundSecondLight dark:bg-backgroundThirdDark overflow-hidden scale-y-0"
            ref={sortDropRef}>
              <ul className="py-1.5 text-sm font-medium text-textLight dark:text-textDark" aria-labelledby="dropdownDefaultButton">
                <li>
                  <div className="cursor-pointer transition-colors px-2 py-1.5 
                  hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark 
                  flex flex-row justify-start items-center" data-popup="true"
                  data-name="name" onClick={(e:any) => {setCurrentSortType(e.target.dataset.name)}}>
                    <AnimatePresence>
                      {currentSortType === "name" && (
                        <motion.svg initial={{x: -50}} animate={{x: 0}} exit={{x: -50}}
                        transition={{damping: 24, stiffness: 300, duration: 0.25}}
                        viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 pointer-events-none absolute">
                          <path d="M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 
                          416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32 
                          8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4c6.2-6.27 14.4-9.4 22.6-9.4 17.1 0 
                          32 13.7 32 32z" className=" fill-iconLight dark:fill-iconDark"></path>
                        </motion.svg>
                      )}
                    </AnimatePresence>
                    <span className="pointer-events-none ml-6">Name</span>
                  </div>
                </li>
                <li>
                  <div className="cursor-pointer transition-colors px-2 py-1.5 
                  hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark 
                  flex flex-row justify-start items-center" data-popup="true"
                  data-name="type" onClick={(e:any) => {setCurrentSortType(e.target.dataset.name)}}>
                    <AnimatePresence>
                      {currentSortType === "type" && (
                        <motion.svg initial={{x: -50}} animate={{x: 0}} exit={{x: -50}}
                        transition={{damping: 24, stiffness: 300, duration: 0.25}}
                        viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 pointer-events-none absolute">
                          <path d="M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 
                          416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32 
                          8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4c6.2-6.27 14.4-9.4 22.6-9.4 17.1 0 
                          32 13.7 32 32z" className=" fill-iconLight dark:fill-iconDark"></path>
                        </motion.svg>
                      )}
                    </AnimatePresence>
                    <span className="pointer-events-none ml-6">Type</span>
                  </div>
                </li>
                <li>
                  <div className="cursor-pointer transition-colors px-2 py-1.5 
                  hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark 
                  flex flex-row justify-start items-center" data-popup="true"
                  data-name="size" onClick={(e:any) => {setCurrentSortType(e.target.dataset.name)}}>
                    <AnimatePresence>
                      {currentSortType === "size" && (
                        <motion.svg initial={{x: -50}} animate={{x: 0}} exit={{x: -50}}
                        transition={{damping: 24, stiffness: 300, duration: 0.25}}
                        viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 pointer-events-none absolute">
                          <path d="M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 
                          416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32 
                          8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4c6.2-6.27 14.4-9.4 22.6-9.4 17.1 0 
                          32 13.7 32 32z" className=" fill-iconLight dark:fill-iconDark"></path>
                        </motion.svg>
                      )}
                    </AnimatePresence>
                    <span className="pointer-events-none ml-6">Size</span>
                  </div>
                </li>
                <li>
                  <div className="cursor-pointer transition-colors px-2 py-1.5 
                  hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark 
                  flex flex-row justify-start items-center" data-popup="true"
                  data-name="date" onClick={(e:any) => {setCurrentSortType(e.target.dataset.name)}}>
                    <AnimatePresence>
                      {currentSortType === "date" && (
                        <motion.svg initial={{x: -50}} animate={{x: 0}} exit={{x: -50}}
                        transition={{damping: 24, stiffness: 300, duration: 0.25}}
                        viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 pointer-events-none absolute">
                          <path d="M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 
                          416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32 
                          8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4c6.2-6.27 14.4-9.4 22.6-9.4 17.1 0 
                          32 13.7 32 32z" className=" fill-iconLight dark:fill-iconDark"></path>
                        </motion.svg>
                      )}
                    </AnimatePresence>
                    <span className="pointer-events-none ml-6">Date</span>
                  </div>
                </li>
                <li>
                  <div className="border my-1 border-borderLight dark:border-borderDark"></div>
                </li>
                {/* is order by descending */}
                <li>
                  <div className="cursor-pointer transition-colors px-2 py-1.5 
                  hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark 
                  flex flex-row justify-start items-center" data-popup="true"
                  data-name="ascending" onClick={(e:any) => {setCurrentSortBy(e.target.dataset.name)}}>
                    <AnimatePresence>
                      {currentSortBy === "ascending" && (
                        <motion.svg initial={{x: -50}} animate={{x: 0}} exit={{x: -50}}
                        transition={{damping: 24, stiffness: 300, duration: 0.25}}
                        viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 pointer-events-none absolute">
                          <path d="M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 
                          416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32 
                          8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4c6.2-6.27 14.4-9.4 22.6-9.4 17.1 0 
                          32 13.7 32 32z" className=" fill-iconLight dark:fill-iconDark"></path>
                        </motion.svg>
                      )}
                    </AnimatePresence>
                    <span className="pointer-events-none ml-6">Ascending</span>
                  </div>
                </li>
                <li>
                  <div className="cursor-pointer transition-colors px-2 py-1.5 
                  hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark 
                  flex flex-row justify-start items-center" data-popup="true"
                  data-name="descending" onClick={(e:any) => {setCurrentSortBy(e.target.dataset.name)}}>
                    <AnimatePresence>
                      {currentSortBy === "descending" && (
                        <motion.svg initial={{x: -50}} animate={{x: 0}} exit={{x: -50}}
                        transition={{damping: 24, stiffness: 300, duration: 0.25}}
                        viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 pointer-events-none absolute">
                          <path d="M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 
                          416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32 
                          8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4c6.2-6.27 14.4-9.4 22.6-9.4 17.1 0 
                          32 13.7 32 32z" className=" fill-iconLight dark:fill-iconDark"></path>
                        </motion.svg>
                      )}
                    </AnimatePresence>
                    <span className="pointer-events-none ml-6">Descending</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>


          {/* Cell types drop */}
          <div>
            <button onClick={VisualizeCellTypeDrop} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" 
            className="text-white hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark first-letter:uppercase
            font-medium rounded-full text-center h-10 w-10 inline-flex items-center transition-dropDown
            focus:dark:bg-backgroundThirdDark" 
            type="button">
              {currentRenderType === "list" ? (
                <motion.p initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} 
                transition={{damping: 24, duration: 0.25, stiffness: 300}} data-title="list"
                className="w-10 h-10 flex justify-center items-center">
                  <motion.svg
                  className="h-6 w-6 fill-iconLight dark:fill-iconDark pointer-events-none"
                  viewBox="0 0 18 10" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 6h2V4H0v2Zm0 4h2V8H0v2Zm0-8h2V0H0v2Zm4 4h14V4H4v2Zm0 4h14V8H4v2ZM4 
                    0v2h14V0H4Z" fillRule="evenodd" className="fill-iconLight dark:fill-iconDark"></path>
                  </motion.svg>
                </motion.p>
                
              ) : (currentRenderType === "table" ? (
                <motion.section initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} 
                transition={{damping: 24, duration: 0.25, stiffness: 300}} data-title="table"
                className="w-10 h-10 flex justify-center items-center">
                  <svg className="h-6 w-6 fill-iconLight dark:fill-iconDark pointer-events-none"
                  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 14h12v-3H9v3Zm-2 0v-3H3v3h4Zm2-8v3h12V6H9ZM7 6H3v3h4V6Zm2 13h12v-3H9v3Zm-2 
                    0v-3H3v3h4ZM3 4h18a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" 
                    fillRule="evenodd" className="fill-iconLight dark:fill-iconDark"></path>
                  </svg>
                </motion.section>
              ) : (currentRenderType === "tile" ? (
                <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} 
                transition={{damping: 24, duration: 0.25, stiffness: 300}} data-title="tiles"
                className="w-10 h-10 flex justify-center items-center">
                  <svg className="h-6 w-6 fill-iconLight dark:fill-iconDark pointer-events-none"
                  viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 16 16">
                    <path d="M0 0h4v4H0zM6 0h4v4H6zM12 0h4v4h-4zM0 6h4v4H0zM6 6h4v4H6zM12 6h4v4h-4zM0 12h4v4H0zM6 
                    12h4v4H6zM12 12h4v4h-4z" className="fill-iconLight dark:fill-iconDark"></path>
                  </svg>
                </motion.div>
              ) : ( // bigTile
                <motion.span initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} 
                transition={{damping: 24, duration: 0.25, stiffness: 300}} data-title="big tiles"
                className="w-10 h-10 flex justify-center items-center">
                  <svg className="h-6 w-6 fill-iconLight dark:fill-iconDark pointer-events-none"
                  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h9v9H0V0zm2 2v5h5V2H2zm-2 9h9v9H0v-9zm2 2v5h5v-5H2zm9-13h9v9h-9V0zm2 
                    2v5h5V2h-5zm-2 9h9v9h-9v-9zm2 2v5h5v-5h-5z" 
                    className="fill-iconLight dark:fill-iconDark"></path>
                  </svg>
                </motion.span>
              )))}
            </button>
            <div id="dropdown" className="z-10 opacity-0 divide-y divide-gray-100 rounded w-10 mt-0.5
            absolute transition-dropDown shadow-defaultLight dark:shadow-none overflow-hidden scale-y-0
            bg-backgroundSecondLight dark:bg-backgroundThirdDark" ref={cellTypeDropRef}>
              <ul className=" text-sm font-medium text-textLight dark:text-textDark" aria-labelledby="dropdownDefaultButton">
                {currentRenderType !== "list" && (
                  <li>
                    <div className="cursor-pointer transition-colors px-2 py-2 flex flex-row
                    hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark justify-start items-center" 
                    data-name="list" onClick={SelectCurrentRenderType}>
                      <svg className="h-6 w-6 fill-iconLight dark:fill-iconDark pointer-events-none"
                      viewBox="0 0 18 10" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 6h2V4H0v2Zm0 4h2V8H0v2Zm0-8h2V0H0v2Zm4 4h14V4H4v2Zm0 4h14V8H4v2ZM4 
                        0v2h14V0H4Z" fillRule="evenodd" className="fill-iconLight dark:fill-iconDark"></path>
                      </svg>
                    </div>
                  </li>
                )}
                {currentRenderType !== "table" && (
                  <li>
                    <div className="cursor-pointer transition-colors px-2 py-2 flex flex-row
                    hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark justify-start items-center" 
                    data-name="table" onClick={SelectCurrentRenderType}>
                      <svg className="h-6 w-6 pointer-events-none"
                      viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 14h12v-3H9v3Zm-2 0v-3H3v3h4Zm2-8v3h12V6H9ZM7 6H3v3h4V6Zm2 13h12v-3H9v3Zm-2 
                        0v-3H3v3h4ZM3 4h18a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" 
                        fillRule="evenodd" className="fill-iconLight dark:fill-iconDark"></path>
                      </svg>
                    </div>
                  </li>
                )}
                {currentRenderType !== "tile" && (
                  <li>
                    <div className="cursor-pointer transition-colors px-2 py-2 flex flex-row
                    hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark justify-start items-center" 
                    data-name="tile" onClick={SelectCurrentRenderType}>
                      <svg className="h-6 w-6 fill-iconLight dark:fill-iconDark pointer-events-none"
                      viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 16 16">
                        <path d="M0 0h4v4H0zM6 0h4v4H6zM12 0h4v4h-4zM0 6h4v4H0zM6 6h4v4H6zM12 6h4v4h-4zM0 12h4v4H0zM6 
                        12h4v4H6zM12 12h4v4h-4z" className="fill-iconLight dark:fill-iconDark"></path>
                      </svg>
                    </div>
                  </li>
                )}
                {currentRenderType !== "bigTile" && (
                  <li>
                    <div className="cursor-pointer transition-colors px-2 py-2 flex flex-row
                    hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark justify-start items-center" 
                    data-name="bigTile" onClick={SelectCurrentRenderType}>
                      <svg className="h-6 w-6 fill-iconLight dark:fill-iconDark pointer-events-none"
                      viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h9v9H0V0zm2 2v5h5V2H2zm-2 9h9v9H0v-9zm2 2v5h5v-5H2zm9-13h9v9h-9V0zm2 
                        2v5h5V2h-5zm-2 9h9v9h-9v-9zm2 2v5h5v-5h-5z" 
                        className="fill-iconLight dark:fill-iconDark"></path>
                      </svg>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>

      <RenderData currentSortBy={currentSortBy} currentSortType={currentSortType}></RenderData>

      {/* Drag and drop files */}
      {isDragVisible === true && (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} ref={fileUploaderRef}
        onMouseMove={VisualizeUploader} className="absolute transition-dropFiles top-0 left-0 z-50 h-fulldvh w-fulldvw bg-black/70">
          <FileUploader onDragEnter={VisualizeUploader} multiple={true} onTypeError={(err:any) => console.log(err)} 
          classes=" max-h-fulldvh h-full100 max-w-fulldvw w-full100 justify-center text-center fill-white
          p-dfUploadFiles sm:p-smUploadFiles md:p-mdUploadFiles lg:p-lgUploadFiles xl:p-xlUploadFiles 2xl:p-xl2UploadFiles
          outline-3 -outline-offset-8 outline-blue-700 outline-dashed border-imp0 hover:bg-red"
          handleChange={handleChange} name="file" />
        </motion.div>
      )}
    </div>
  )
}