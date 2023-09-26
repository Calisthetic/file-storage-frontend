import { FunctionComponent, lazy, useState } from "react";
import { motion } from "framer-motion";
const StatisticPie = lazy(() => import("./statistic-pie"));
const StatisticCalendar = lazy(() => import("./statistic-calendar"));
const StatisticTree = lazy(() => import("./statistic-tree"));
const StatisticGraph = lazy(() => import("./statistic-graph"));
 

const UserStatistic: FunctionComponent = () => {

  // for calendar and usage graph
  const [availableYears, setAvailableYears] = useState<number[]>([2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023])
  
  return (
    <div className="min-h-fullWithHeader flex flex-col xl:flex-row justify-center xl:items-center w-full">
      <div className="pb-3 sm:rounded-tl-2xl overflow-y-hidden">
        <motion.div initial={{y: 50, opacity: 0}}
        transition={{damping: 24, stiffness: 300}} 
        whileInView={{y: 0, opacity: 1}}
        viewport={{ once: true }}
        className="w-[calc(100%-24px)] ml-3 xl:w-[1024px] mt-3">
          <StatisticPie></StatisticPie>
        </motion.div>
        <motion.div initial={{y: 50, opacity: 0}}
        transition={{delay: 0.1, damping: 24, stiffness: 300}} 
        whileInView={{y: 0, opacity: 1}}
        viewport={{ once: true }}
         className="w-[calc(100%-24px)] ml-3 xl:w-[1024px] mt-3">
          <StatisticCalendar availableYears={availableYears}></StatisticCalendar>
        </motion.div>
        <motion.div initial={{y: 50, opacity: 0}}
        transition={{damping: 24, stiffness: 300}} 
        whileInView={{y: 0, opacity: 1}}
        viewport={{ once: true }}
         className="w-[calc(100%-24px)] ml-3 xl:w-[1024px] mt-3">
          <StatisticTree></StatisticTree>
        </motion.div>
        <motion.div initial={{y: 50, opacity: 0}}
        transition={{damping: 24, stiffness: 300}}
        whileInView={{y: 0, opacity: 1}}
        viewport={{ once: true }}
         className="w-[calc(100%-24px)] ml-3 xl:w-[1024px] mt-3">
          <StatisticGraph availableYears={availableYears}></StatisticGraph>
        </motion.div>
      </div>
    </div>
  );
}
 
export default UserStatistic;