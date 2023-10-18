import { FunctionComponent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../lib/color-utils";
import IconAlerts from "./icons/IconAlerts";

interface AlertButtonProps {
  open:boolean
  close: () => void
  type:string
  text:string
  title?:string
  position?:number
}

const AlertButton: FunctionComponent<AlertButtonProps> = (props:AlertButtonProps) => {
  const cornerMargin = "12px"
  return (
    <AnimatePresence>
      {props.open && (
        <motion.button initial={{
          y: "-150%",
          x: (props.position === undefined || props.position === 1 || props.position === 2) ? 
            "calc(-100% - " + cornerMargin + ")" : cornerMargin,
          opacity: 0,
        }} 
        animate={{
          y: (props.position === undefined || props.position > 1) ? "calc(-100% - " + cornerMargin + ")" : cornerMargin, 
          opacity: 1
        }}
        exit={{
          y: (props.position === undefined || props.position > 1) ? "-150%" : "50%", 
          opacity: 0
        }} onClick={props.close}
        transition={{stiffness: 200, damping: 24, duration: 0.1}} 
        className={cn("fixed min-w-[300px] max-w-[300px] sm:max-w-lg"
        + " grid grid-cols-alerts items-center gap-x-1 sm:gap-x-3 text-left"
        + " rounded-md bg-backgroundThirdLight dark:bg-backgroundThirdDark", {
          // Corners from top left
          "top-0 left-0": props.position === 0,
          "top-0 left-[calc(100%)]": props.position === 1,
          "top-[calc(100%)] left-[calc(100%)]": props.position === 2 || props.position === undefined,
          "top-[calc(100%)] left-0": props.position === 3,
        })}>
            <div className={cn("h-full flex items-center rounded-s px-1 w-8", {
              "bg-success" : props.type === "success",
              "bg-error" : props.type === "error",
              "bg-warning" : props.type === "warning",
            })}>
              <IconAlerts classes="h-6 w-6" type={props.type} fillClasses="fill-white"></IconAlerts>
            </div>
            <div className="text-textLight dark:text-textDark">
              <div className="font-medium first-letter:uppercase">{props.title ? props.title : props.type}</div>
              <div className="whitespace-pre-wrap first-letter:uppercase">{props.text}</div>
            </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
 
export default AlertButton;