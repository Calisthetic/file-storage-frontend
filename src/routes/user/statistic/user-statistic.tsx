import { FunctionComponent, useState } from "react";
import StatisticPie from "./statistic-pie";
import StatisticCalendar from "./statistic-calendar";
import StatisticTree from "./statistic-tree";
import StatisticGraph from "./statistic-graph";
 
export interface IFileStat {
  id:string,
  label:string,
  value:number,
  color?:string
}
interface IFoldersTree {
  nodes:ITreeNode[]
  links:ITreeLink[]
}
interface ITreeNode { 
  id:string
  height:number
  size:number
  color:string
}
interface ITreeLink { 
  source:string
  target:string
  distance:number
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

  const data:IFoldersTree = {
    nodes: [
      {
        id: "main",
        height: 1,
        size: 24,
        color: "var(--treeMain)"
      },
      {
        id: "folder1",
        height: 1,
        size: 18,
        color: "var(--treeFolder)"
      },
      {
        id: "folder2",
        height: 1,
        size: 18,
        color: "var(--treeFolder)"
      },
      {
        id: "folder11",
        height: 1,
        size: 12,
        color: "var(--treeFolder)"
      },
      {
        id: "folder12",
        height: 1,
        size: 12,
        color: "var(--treeFolder)"
      },
      {
        id: "folder13",
        height: 1,
        size: 12,
        color: "var(--treeFolder)"
      },
      {
        id: "folder21",
        height: 1,
        size: 12,
        color: "var(--treeFolder)"
      },
      {
        id: "folder22",
        height: 1,
        size: 12,
        color: "var(--treeFolder)"
      },
      {
        id: "folder23",
        height: 1,
        size: 12,
        color: "var(--treeFolder)"
      },
      {
        id: "folder24",
        height: 1,
        size: 12,
        color: "var(--treeFolder)"
      },
      {
        id: "file1",
        height: 1,
        size: 12,
        color: "var(--treeFile)"
      },
      {
        id: "file2",
        height: 1,
        size: 12,
        color: "var(--treeFile)"
      },
      {
        id: "file3",
        height: 1,
        size: 12,
        color: "var(--treeFile)"
      },
      {
        id: "file4",
        height: 1,
        size: 12,
        color: "var(--treeFile)"
      }
    ],
    links: [
      {
        source: "main",
        target: "folder1",
        distance: 50
      },
      {
        source: "main",
        target: "folder2",
        distance: 50
      },
      {
        source: "folder1",
        target: "folder11",
        distance: 30
      },
      {
        source: "folder1",
        target: "folder12",
        distance: 30
      },
      {
        source: "folder1",
        target: "folder13",
        distance: 30
      },
      {
        source: "folder2",
        target: "folder21",
        distance: 30
      },
      {
        source: "folder2",
        target: "folder22",
        distance: 30
      },
      {
        source: "folder2",
        target: "folder23",
        distance: 30
      },
      {
        source: "folder2",
        target: "folder24",
        distance: 30
      },
      {
        source: "folder11",
        target: "file1",
        distance: 30
      },
      {
        source: "folder11",
        target: "file2",
        distance: 30
      },
      {
        source: "folder11",
        target: "file3",
        distance: 30
      },
      {
        source: "folder11",
        target: "file4",
        distance: 30
      }
    ]
  }

  // for calendar and usage graph
  const [availableYears, setAvailableYears] = useState<number[]>([2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023])
  
  return (
    <div className="min-h-fullWithHeader flex flex-col items-center">
      <div className="w-[calc(100%-24px)] lg:max-w-5xl lg:w-[1024px] mt-3">
        <StatisticPie data={fileStat}></StatisticPie>
      </div>
      <div className="w-[calc(100%-24px)] lg:max-w-5xl lg:w-[1024px] mt-3">
        <StatisticCalendar availableYears={availableYears}></StatisticCalendar>
      </div>
      <div className="w-[calc(100%-24px)] lg:max-w-5xl lg:w-[1024px] mt-3">
        <StatisticTree data={data}></StatisticTree>
      </div>
      <div className="w-[calc(100%-24px)] lg:max-w-5xl lg:w-[1024px] mt-3">
        <StatisticGraph availableYears={availableYears}></StatisticGraph>
      </div>
    </div>
  );
}
 
export default UserStatistic;