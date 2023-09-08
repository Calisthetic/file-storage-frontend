import { FunctionComponent } from "react"
import { monthNames } from "../../../data/common/months"
import { twMerge } from "tailwind-merge"
import { motion } from "framer-motion"
import { IDayActivityStat } from "./statistic-calendar"

interface DailyStatisticProps {
  data: IDayActivityStat
  classes: string
  date:string
}
const DailyStatistic: FunctionComponent<DailyStatisticProps> = (props:DailyStatisticProps) => {
  const maxValue = Math.max((props.data.binValue ? props.data.binValue : 0),
  (props.data.addedFiles ? props.data.addedFiles : 0),
  (props.data.generatedLinks ? props.data.generatedLinks : 0),
  (props.data.deletedValue ? props.data.deletedValue : 0))
  
  return (
    <div className={twMerge("flex-col w-full p-4 text-textLight dark:text-textDark", props.classes)}>
      <ol className="relative h-full sm:h-auto border-l border-borderLight dark:border-borderDark">
        <li className="mb-4 ml-4">
          <div className="absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 
          bg-borderLight dark:bg-borderDark text-textLight dark:text-textDark
          border border-backgroundSecondLight dark:border-backgroundSecondDark"></div>
          <time className="mb-1 text-sm font-medium leading-none">
            <span>{monthNames[parseInt(props.date.slice(props.date.indexOf("-") + 1, props.date.lastIndexOf("-")))-1]}</span>
            <span className="mx-1">{props.date.slice(props.date.lastIndexOf("-") - props.date.length + 1) + ","}</span>
            <span className="opacity-80 font-normal">{props.date.slice(0, props.date.indexOf("-"))}</span>
          </time>
          <div>
            {props.data.binValue && (
              <div className="mt-2 sm:grid grid-cols-2 items-center">
                <p>Moved files to trash</p>
                <div className="w-full bg-backgroundThirdLight mt-1 rounded-full h-3 dark:bg-backgroundThirdDark">
                  <motion.div initial={{width: 0}} animate={{width: (props.data.binValue / maxValue * 100) + "%"}}
                  className="bg-iconLight dark:bg-iconDark h-3 rounded-full items-center justify-center flex">
                    <span className="opacity-90 font-medium text-xs">{props.data.binValue}</span>
                  </motion.div>
                </div>
              </div>
            )}
            {props.data.deletedValue && (
              <div className="mt-2 sm:grid grid-cols-2 items-center">
                <p>Permanently deleted files</p>
                <div className="w-full bg-backgroundThirdLight mt-1 rounded-full h-3 dark:bg-backgroundThirdDark">
                  <motion.div initial={{width: 0}} animate={{width: (props.data.deletedValue * 100 / maxValue) + "%"}}
                  className=" bg-iconLight dark:bg-iconDark h-3 rounded-full items-center justify-center
                  text-sm flex">
                    <span className="opacity-90 font-medium text-xs">{props.data.deletedValue}</span>
                  </motion.div>
                </div>
              </div>
            )}
            {props.data.addedFiles && (
              <div className="mt-2 sm:grid grid-cols-2 items-center">
                <p>Added files</p>
                <div className="w-full bg-backgroundThirdLight mt-1 rounded-full h-3 dark:bg-backgroundThirdDark">
                  <motion.div initial={{width: 0}} animate={{width: (props.data.addedFiles / maxValue * 100) + "%"}}
                  className=" bg-iconLight dark:bg-iconDark h-3 rounded-full items-center justify-center
                  text-sm flex">
                    <span className="opacity-90 font-medium text-xs">{props.data.addedFiles}</span>
                  </motion.div>
                </div>
              </div>
            )}
            {props.data.generatedLinks && (
              <div className="mt-2 sm:grid grid-cols-2 items-center">
                <p>Moved files to trash</p>
                <div className="w-full bg-backgroundThirdLight mt-1 rounded-full h-3 dark:bg-backgroundThirdDark">
                  <motion.div initial={{width: 0}} animate={{width: (props.data.generatedLinks / maxValue * 100) + "%"}}
                  className=" bg-iconLight dark:bg-iconDark h-3 rounded-full items-center justify-center
                  text-sm flex">
                    <span className="opacity-90 font-medium text-xs">{props.data.generatedLinks}</span>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </li>
      </ol>
    </div>
  );
}
export default DailyStatistic