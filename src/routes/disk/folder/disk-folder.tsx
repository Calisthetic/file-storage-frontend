import { useParams } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { useState, useRef } from "react";
import { motion } from "framer-motion"


export default function DiskFolder() {
  const inputFileButtonRef:any = useRef()
  const addDropRef:any = useRef() // dropdown
  const [isAddDrop, setIsAddDrop] = useState(true)

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

  function CloseAllDrops() {
    if (!isAddDrop) {
      VisualizeAddDrop()
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
  };

  function VisualizeUploader(e:any | null) {  
    if (e.type === "dragenter") {
      console.log(e)
      setIsDragVisible(true)
    } else if (isDragVisible === true && e.type === "mousemove") {
      fileUploaderRef.current.style.opacity = 0
      setTimeout(() => {
        setIsDragVisible(false)
      }, 100);
    } 
  }


  return (
    <div onDragEnter={VisualizeUploader} onClick={CloseAllDrops} className="w-full min-h-fullWithHeader">
      <button onClick={VisualizeAddDrop} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" 
      className="text-white hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark first-letter:uppercase
      font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center transition-dropDown
      focus:bg-backgroundThirdLight focus:dark:bg-backgroundThirdDark" 
      type="button">My storage
        <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>
      <div id="dropdown" className="z-10 opacity-0 divide-y divide-gray-100 rounded w-44 mt-1
      shadow-defaultLight dark:shadow-none absolute transition-dropDown
      bg-backgroundThirdLight dark:bg-backgroundThirdDark overflow-hidden"
      ref={addDropRef}>
        <ul className="py-2 text-sm font-medium text-textLight dark:text-textDark" aria-labelledby="dropdownDefaultButton">
          <li>
            <p className="cursor-pointer transition-colors px-2 py-2 
            hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark flex flex-row justify-start items-center
            bg-backgroundThirdLight dark:bg-backgroundThirdDark">
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
              <p onClick={() => {inputFileButtonRef.current.click()}} className="cursor-pointer transition-colors px-2 py-2 
              hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark flex flex-row justify-start items-center
              bg-backgroundThirdLight dark:bg-backgroundThirdDark">
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
          <li>
          
          </li>
        </ul>
      </div>

      <div className=" bg-white ml-96 h-10 w-10"></div>

      {/* Drag and drop files */}
      {isDragVisible === true && (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} ref={fileUploaderRef}
        onMouseMove={VisualizeUploader} className="absolute transition-dropFiles top-0 left-0 z-50 h-fulldvh w-fulldvw bg-black/70">
          <FileUploader
           onDragEnter={VisualizeUploader} multiple={true} onTypeError={(err:any) => console.log(err)} 
          classes=" max-h-fulldvh h-full100 max-w-fulldvw w-full100 justify-center text-center fill-white
          p-dfUploadFiles sm:p-smUploadFiles md:p-mdUploadFiles lg:p-lgUploadFiles xl:p-xlUploadFiles 2xl:p-xl2UploadFiles
          outline-3 -outline-offset-8 outline-blue-700 outline-dashed border-imp0 hover:bg-red"
          handleChange={handleChange} name="file" />
        </motion.div>
      )}
    </div>
  )
}