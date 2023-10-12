import { AnimatePresence, motion } from "framer-motion";
import { FunctionComponent } from "react";
import "./../../../styles/focus-elems.css"

interface SortDropdownProps {
  setCurrentSortBy: (e:any) => void
  currentSortBy:string
  setCurrentSortType: (e:any) => void
  currentSortType:string
}
 
const sortTypes = ["name", "type", "size", "date"]
const SortDropdown: FunctionComponent<SortDropdownProps> = (
  {currentSortBy, setCurrentSortBy, currentSortType, setCurrentSortType}:SortDropdownProps
) => {
  return (
    <div>
      <button id="drop-sort" aria-label="Sort"
      className=" dark:text-textDark hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark
      font-medium rounded-full text-base sm:text-lg w-10 h-10 sm:w-11 sm:h-11 text-textLight 
      text-center justify-center inline-flex items-center peer transition-colors duration-300
      focus:bg-none focus:dark:bg-backgroundThirdDark first-letter:uppercase">
        <motion.svg initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} 
        transition={{damping: 24, duration: 0.25, stiffness: 300}}
        viewBox="0 0 24 24" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
          <path d="m6 20 4-4H7V4H5v12H2zm5-12h9v2h-9zm0 4h7v2h-7zm0-8h11v2H11zm0 12h5v2h-5z" 
          className="fill-iconLight dark:fill-iconDark"></path>
        </motion.svg>
      </button>
      <div className="rounded w-44 mt-0.5 z-10 absolute overflow-hidden
      shadow-defaultLight dark:shadow-none peer-focus:py-1.5 focus-within:py-1.5
      bg-backgroundSecondLight dark:bg-backgroundThirdDark -translate-x-[calc(100%-40px)]
      grid grid-rows-[0fr] peer-focus:grid-rows-[1fr] focus-within:grid-rows-[1fr]
      transition-[grid-template-rows,padding] duration-300">
        <ul className="text-sm font-medium text-textLight dark:text-textDark overflow-hidden">
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
      </div>
    </div>
  );
}
 
export default SortDropdown;