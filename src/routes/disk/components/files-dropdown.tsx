import { FunctionComponent, memo, useRef, useState } from "react";
import { cn } from "../../../lib/color-utils";

interface FilesDropdownProps {
  children: JSX.Element | JSX.Element[]
  currentRenderType:string
  title:string
}
 
const FilesDropdown: FunctionComponent<FilesDropdownProps> = memo(({children, currentRenderType, title}:FilesDropdownProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const targetRef:any = useRef()

  function OpenCloseItems() {
    setIsVisible(!isVisible)
    if (isVisible) {
      ((targetRef.current as HTMLElement).children[0] as HTMLElement).style.overflow = "hidden";
      (targetRef.current as HTMLElement).style.gridTemplateRows = "0fr";
    } else {
      (targetRef.current as HTMLElement).style.gridTemplateRows = "1fr";
      setTimeout(() => {
        ((targetRef.current as HTMLElement).children[0] as HTMLElement).style.overflow = "visible"
      }, 300);
    }
  }

  return (
    <>
      <div className="px-2 mb-2 pb-1
      font-semibold text-base border-b border-borderLight dark:border-borderDark
      flex flex-row justify-between items-center opacity-80"
      onClick={OpenCloseItems}>
        <p className=" text-textLight dark:text-textDark pointer-events-none">{title}</p>
        <svg className={cn("w-2.5 h-2.5 ml-2.5 transition-transform", {
          "-rotate-180": isVisible,
          "rotate-0": !isVisible,
        })} aria-hidden="true" 
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path className="stroke-textLight dark:stroke-textDark" strokeLinecap="round" 
          strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
      </div>
      <div className="grid transition-[grid-template-rows]" ref={targetRef}
      style={{gridTemplateRows: "1fr"}}>
        {(currentRenderType === "tile" && title.toLowerCase().includes("folder")) ? (
          <div className="flex gap-x-1 md:gap-x-1.5 lg:gap-x-2 mt-2 flex-row flex-wrap transition-all h-auto"
          style={{overflow: "visible"}}>
            {children}
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-2 gap-y-1 h-auto"
          style={{overflow: "visible"}}>
            {children}
          </div>
        )}
      </div>
    </>
  );
})
 
export default FilesDropdown;