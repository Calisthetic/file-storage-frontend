import { FunctionComponent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconAlerts, IconClose } from "./icons";
import { cn } from "../lib/utils";

interface AlertButtonProps {
  open:boolean
  close: () => void
  type:string
  text:string
  title:string
  position?:number
}

const AlertButton: FunctionComponent<AlertButtonProps> = (props:AlertButtonProps) => {
  const cornerMargin = "12px"
  return (
    <AnimatePresence>
      {props.open && (
        <motion.div initial={{
          y: "-50%",
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
        }}
        transition={{stiffness: 200, damping: 24, duration: 0.1}} 
        className={cn("absolute min-w-[300px] max-w-[300px] sm:max-w-lg"
        + " flex flex-row justify-between items-center py-1 px-2" 
        + " rounded-md bg-backgroundThirdLight dark:bg-backgroundThirdDark", {
          // Corners from top left
          "top-0 left-0": props.position === 0,
          "top-0 left-[calc(100%)]": props.position === 1,
          "top-[calc(100%)] left-[calc(100%)]": props.position === 2 || props.position === undefined,
          "top-[calc(100%)] left-0": props.position === 3,
        })}>
          <div className="grid grid-cols-alerts items-center gap-x-1 sm:gap-x-2">
            <IconAlerts classes="h-6 w-6" type={props.type}></IconAlerts>
            <div className="text-textLight dark:text-textDark">
              <div className="font-medium">{props.title}</div>
              <div className="whitespace-pre-wrap">{props.text}</div>
            </div>
          </div>
          <button className="ml-2" onClick={props.close}>
            <IconClose classes="w-3.5 h-3.5" strokeClasses={"stroke-" + props.type + "Light dark:stroke-" + props.type + "Dark"}></IconClose>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
 
export default AlertButton;