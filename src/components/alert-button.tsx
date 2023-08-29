import { FunctionComponent, MouseEventHandler, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconAlerts, IconClose } from "./icons";
import { cn } from "../lib/utils";

interface AlertButtonProps {
  open:boolean
  close: () => void
  type:string
  text:string
  title:string
}

const AlertButton: FunctionComponent<AlertButtonProps> = (props:AlertButtonProps) => {
  return (
    <AnimatePresence>
      {props.open && (
        <motion.div initial={{y: "-50%", opacity: 0}} 
        animate={{y: "calc(-100% - 10px)", opacity: 1}}
        exit={{y: "-150%", opacity: 0}}
        transition={{stiffness: 200, damping: 24, duration: 0.1}} 
        className={cn("absolute top-alertTop left-alertLeft bg-white max-w-[300px] min-w-[300px]"
        + " flex flex-row justify-between items-center" 
        + " rounded-md p-1 bg-backgroundThirdLight dark:bg-backgroundThirdDark", {
          "translate-x-[200%]": props.open,
          "-translate-x-2.5": !props.open
        })}>
          <div className="flex flex-row items-center">
            <IconAlerts classes="h-6 w-6" type={props.type}></IconAlerts>
            <div className="text-textLight dark:text-textDark mx-1">
              <div className="font-medium">{props.title}</div>
              <div>{props.text}</div>
            </div>
          </div>
          <button className="mr-1" onClick={props.close}>
            <IconClose classes="w-3.5 h-3.5" strokeClasses={"stroke-" + props.type + "Light dark:stroke-" + props.type + "Dark"}></IconClose>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
 
export default AlertButton;