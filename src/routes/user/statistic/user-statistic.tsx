import { FunctionComponent, useState } from "react";
import StatisticPie from "./statistic-pie";
import StatisticCalendar from "./statistic-calendar";
 
export interface IFileStat {
  id:string,
  label:string,
  value:number,
  color?:string
}
export interface IActivityStat {
  value:number,
  day:string
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
  const activityStatTempData:IActivityStat[] = [
    {
      "value": 279,
      "day": "2023-08-21"
    },
    {
      "value": 53,
      "day": "2023-02-26"
    },
    {
      "value": 277,
      "day": "2023-03-05"
    },
    {
      "value": 214,
      "day": "2023-03-13"
    },
    {
      "value": 27,
      "day": "2023-09-22"
    },
    {
      "value": 329,
      "day": "2023-05-03"
    },
    {
      "value": 293,
      "day": "2023-08-06"
    },
    {
      "value": 136,
      "day": "2023-04-07"
    },
    {
      "value": 385,
      "day": "2023-03-22"
    },
    {
      "value": 87,
      "day": "2023-11-25"
    },
    {
      "value": 349,
      "day": "2023-10-20"
    },
    {
      "value": 244,
      "day": "2023-05-04"
    },
    {
      "value": 33,
      "day": "2023-03-13"
    },
    {
      "value": 7,
      "day": "2023-07-09"
    },
    {
      "value": 287,
      "day": "2023-12-02"
    },
    {
      "value": 244,
      "day": "2023-06-22"
    },
    {
      "value": 220,
      "day": "2023-03-30"
    },
    {
      "value": 96,
      "day": "2023-10-18"
    },
    {
      "value": 158,
      "day": "2023-12-26"
    },
    {
      "value": 151,
      "day": "2023-10-11"
    },
    {
      "value": 122,
      "day": "2023-10-06"
    },
    {
      "value": 83,
      "day": "2023-08-10"
    },
    {
      "value": 276,
      "day": "2023-12-29"
    },
    {
      "value": 21,
      "day": "2023-08-13"
    },
    {
      "value": 247,
      "day": "2023-12-05"
    },
    {
      "value": 200,
      "day": "2023-04-03"
    },
    {
      "value": 317,
      "day": "2023-09-18"
    },
    {
      "value": 90,
      "day": "2023-06-23"
    },
    {
      "value": 372,
      "day": "2023-07-21"
    },
    {
      "value": 157,
      "day": "2023-05-02"
    },
    {
      "value": 143,
      "day": "2023-07-03"
    },
    {
      "value": 344,
      "day": "2023-10-29"
    },
    {
      "value": 164,
      "day": "2023-08-08"
    },
    {
      "value": 307,
      "day": "2023-08-19"
    },
    {
      "value": 146,
      "day": "2023-09-07"
    },
    {
      "value": 288,
      "day": "2023-08-29"
    },
    {
      "value": 228,
      "day": "2023-05-23"
    },
    {
      "value": 83,
      "day": "2023-05-18"
    },
    {
      "value": 43,
      "day": "2023-11-22"
    },
    {
      "value": 328,
      "day": "2023-01-23"
    },
    {
      "value": 234,
      "day": "2023-10-14"
    },
    {
      "value": 53,
      "day": "2023-06-06"
    },
    {
      "value": 137,
      "day": "2023-06-05"
    },
    {
      "value": 341,
      "day": "2023-01-07"
    },
    {
      "value": 144,
      "day": "2023-03-03"
    },
    {
      "value": 188,
      "day": "2023-03-14"
    },
    {
      "value": 51,
      "day": "2023-03-04"
    },
    {
      "value": 175,
      "day": "2023-10-13"
    },
    {
      "value": 291,
      "day": "2023-03-25"
    },
    {
      "value": 177,
      "day": "2023-07-01"
    },
    {
      "value": 317,
      "day": "2023-04-04"
    },
    {
      "value": 242,
      "day": "2023-03-06"
    },
    {
      "value": 388,
      "day": "2023-12-21"
    },
    {
      "value": 106,
      "day": "2023-07-14"
    },
    {
      "value": 79,
      "day": "2023-06-10"
    },
    {
      "value": 195,
      "day": "2023-03-14"
    },
    {
      "value": 347,
      "day": "2023-08-08"
    },
    {
      "value": 312,
      "day": "2023-03-17"
    },
    {
      "value": 162,
      "day": "2023-01-08"
    },
    {
      "value": 80,
      "day": "2023-08-17"
    },
    {
      "value": 291,
      "day": "2023-01-01"
    },
    {
      "value": 360,
      "day": "2023-03-07"
    },
    {
      "value": 152,
      "day": "2023-11-25"
    },
    {
      "value": 304,
      "day": "2023-09-14"
    },
    {
      "value": 134,
      "day": "2023-11-27"
    },
    {
      "value": 34,
      "day": "2023-05-05"
    },
    {
      "value": 327,
      "day": "2023-01-27"
    },
    {
      "value": 3,
      "day": "2023-08-18"
    },
    {
      "value": 78,
      "day": "2023-07-05"
    },
    {
      "value": 53,
      "day": "2023-04-28"
    },
    {
      "value": 210,
      "day": "2023-11-09"
    },
    {
      "value": 316,
      "day": "2023-07-11"
    },
    {
      "value": 280,
      "day": "2023-07-31"
    },
    {
      "value": 119,
      "day": "2023-05-10"
    },
    {
      "value": 100,
      "day": "2023-07-08"
    },
    {
      "value": 361,
      "day": "2023-11-10"
    },
    {
      "value": 49,
      "day": "2023-10-09"
    },
    {
      "value": 133,
      "day": "2023-08-16"
    },
    {
      "value": 124,
      "day": "2023-05-08"
    },
  ]

  const [fileStat, setFileStat] = useState<IFileStat[]>(fileStatTempData)
  const [activityStat, setActivityStat] = useState<IActivityStat[]>(activityStatTempData)
  
  return (
    <div className="min-h-fullWithHeader flex flex-col items-center">
      <div className="w-[calc(100%-24px)] lg:max-w-5xl lg:w-[1024px] mt-3">
        <StatisticPie data={fileStat}></StatisticPie>
      </div>
      <div className="w-[calc(100%-24px)] lg:max-w-5xl lg:w-[1024px] mt-3">
        <StatisticCalendar data={activityStat}></StatisticCalendar>
      </div>
    </div>
  );
}
 
export default UserStatistic;