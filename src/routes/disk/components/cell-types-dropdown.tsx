import { motion } from "framer-motion";
import { FunctionComponent } from "react";

interface CellTypesDropdownProps {
  currentRenderType: string
  setCurrentRenderType: (e:any) => void
}
 
const CellTypesDropdown: FunctionComponent<CellTypesDropdownProps> = (
  {currentRenderType, setCurrentRenderType}:CellTypesDropdownProps
) => {
  return (
    <div>
      <button id="drop-cell-type" aria-label="Cell type"
      className="hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark
      font-medium rounded-full text-center h-10 w-10 inline-flex items-center first-letter:uppercase
      focus:dark:bg-backgroundThirdDark peer transition-colors duration-300">
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
          <div className="grid grid-rows-[0fr] peer-focus:grid-rows-[1fr] focus-within:grid-rows-[1fr]
          -translate-x-[calc(100%-40px)] duration-300 rounded w-10 mt-0.5
          absolute shadow-defaultLight dark:shadow-none z-10
          peer-focus:bg-backgroundSecondLight peer-focus:dark:bg-backgroundThirdDark">
            <ul className="text-sm font-medium text-textLight rounded dark:text-textDark overflow-hidden">
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
          </div>
    </div>
  );
}
 
export default CellTypesDropdown;