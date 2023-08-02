import { Dropdown, Ripple, initTE, } from "tw-elements";
import { useParams } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { useState, useRef } from "react";
import { motion } from "framer-motion"

initTE({ Dropdown, Ripple });

export default function DiskFolder() {
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
      setIsDragVisible(true)
    } else if (isDragVisible === true && e.type === "mousemove") {
      fileUploaderRef.current.style.opacity = 0
      setTimeout(() => {
        setIsDragVisible(false)
      }, 100);
    } 
  }


  return (
    <div onDragEnter={VisualizeUploader} className="w-full min-h-fullWithHeader">
      <div className="relative w-min" data-te-dropdown-ref>
        <button
          className="flex items-center whitespace-nowrap rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium 
          uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out 
          hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
          focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
          focus:outline-none focus:ring-0 active:bg-primary-700 dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] 
          active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none 
          dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
          dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
          dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          type="button" id="dropdownMenuButton1" data-te-dropdown-toggle-ref
          aria-expanded="false" data-te-ripple-init data-te-ripple-color="light">
          My storage
          <span className="ml-2 w-2 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 pointer-events-none">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 
              11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"/>
            </svg>
          </span>
        </button>

        <ul aria-labelledby="dropdownMenuButton1" data-te-dropdown-menu-ref
          className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden 
          rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg 
          dark:bg-neutral-700 [&[data-te-dropdown-show]]:block w-full py-1.5">
          <li>
            <button data-te-dropdown-item-ref className="block w-full whitespace-nowrap 
            bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 
            active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent 
            disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600 text-left">
              Create folder
            </button>
          </li>
          <li>
            <button data-te-dropdown-item-ref className="block w-full whitespace-nowrap 
            bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 
            active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent 
            disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600 text-left">
              Upload files
            </button>
          </li>
        </ul>
      </div>
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
      
      <button className="w-12 h-6 bg-white" onClick={() => {console.log(file)}}></button>
    </div>
  )
}