import { FunctionComponent, useState } from "react";
import StatisticPie from "./statistic-pie";
 
export interface IFileStat {
  id:string,
  label:string,
  value:number,
  color?:string
}

const UserStatistic: FunctionComponent = () => {
  const fileStatTempData:IFileStat[] = [{
    "id": "scala",
    "label": "scala",
    "value": 273,
  },
  {
    "id": "python",
    "label": "python",
    "value": 378,
  },
  {
    "id": "erlang",
    "label": "erlang",
    "value": 340,
  },
  {
    "id": "stylus",
    "label": "stylus",
    "value": 63,
  },
  {
    "id": "haskell",
    "label": "haskell",
    "value": 564,
  }]

  const [fileStat, setFileStat] = useState<IFileStat[]>(fileStatTempData)
  
  return (
    <div className="min-h-fullWithHeader flex flex-col items-center">
      <div className="w-[calc(100%-24px)] lg:max-w-5xl lg:w-[1024px] mt-3">
        <StatisticPie data={fileStat}></StatisticPie>
      </div>
    </div>
  );
}
 
export default UserStatistic;