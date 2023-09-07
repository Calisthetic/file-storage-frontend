import { ResponsiveLine } from '@nivo/line'
import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import YearSelectList from './select-year'
import { GetCSSValue } from '../../../lib/color-utils'

interface IUsageStat {
  id: string
  color: string
  data: IUsageData[]
}
interface IUsageData {
  x: string
  y: number
}

interface StatisticGraphProps {
  availableYears: number[]
}
const StatisticGraph:FunctionComponent<StatisticGraphProps> = ({availableYears}:StatisticGraphProps) => {
  // Style text and rectangles
  function ModifyGraph() {
    let textElems:SVGTextElement[] = Array.from(document.getElementsByTagName("text"))
    if (textElems.length > 53) { // from 27 to 53
      for (let i = 27; i < 54; i++) {
        textElems[i].style.fill = GetCSSValue("text")
      }
    }
    let pathElems:SVGPathElement[] = Array.from(document.getElementsByTagName("path"))
    pathElems[pathElems.length - 1].style.stroke = GetCSSValue("icon")

    let circleElems:SVGCircleElement[] = Array.from(document.getElementsByTagName("circle"))
    if (circleElems.length > 28) { // from 17 to 28
      for (let i = circleElems.length - 1; i > circleElems.length - 13; i--) {
        circleElems[i].style.stroke = GetCSSValue("icon")
      }
    }
  }
  setTimeout(() => ModifyGraph(), 50);

  // If css variable changed
  const MutationHandler = useCallback((mutation:MutationRecord) => {
    if (mutation.type === "attributes") {
      ModifyGraph()
    }
  }, [])

  // Check css variable changed event
  useEffect(() => {
    var observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation:any) => MutationHandler(mutation));
    });

    var observerConfig = {
      attributes: true,
      childList: false,
      characterData: false,
      attributeOldValue: true
    };
    var targetNode = document.querySelector('div');
    if (targetNode) {
      observer.observe(targetNode, observerConfig);
    }

    return () => observer.disconnect()
  }, [MutationHandler])


  // Calendar data
  const usageStatTemp:IUsageStat[] = [
    {
      "id": "japan",
      "color": "hsl(250, 70%, 50%)",
      "data": [
        {
          "x": "January",
          "y": 290
        },
        {
          "x": "February",
          "y": 263
        },
        {
          "x": "March",
          "y": 180
        },
        {
          "x": "April",
          "y": 23
        },
        {
          "x": "May",
          "y": 170
        },
        {
          "x": "June",
          "y": 107
        },
        {
          "x": "July",
          "y": 66
        },
        {
          "x": "August",
          "y": 241
        },
        {
          "x": "September",
          "y": 197
        },
        {
          "x": "October",
          "y": 229
        },
        {
          "x": "November",
          "y": 167
        },
        {
          "x": "December",
          "y": 132
        }
      ]
    },
  ]
  const [usageStat, setUsageStat] = useState<IUsageStat[]>(usageStatTemp)
  // Available years
  const [selectedYear, setSelectedYear] = useState<number>(availableYears[0])

  useEffect(() => {
    // Request to year stat (calendar)
  }, [selectedYear])
  

  return (
    <div className="rounded border border-borderLight dark:border-borderDark">
      <div className="flex flex-col xl:flex-row xl:justify-center">
        <div>
          <div className="overflow-x-auto px1050:overflow-x-visible py-2 px1050:flex flex-col items-center">
            {/* Calendar */}
            <div className="h-[400px] w-[766px]">
              <ResponsiveLine
                data={usageStat}
                margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                  type: 'linear',
                  min: 'auto',
                  max: 'auto',
                  stacked: true,
                  reverse: false
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'DISK USAGE',
                  legendOffset: 36,
                  legendPosition: 'middle'
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'count',
                  legendOffset: -40,
                  legendPosition: 'middle'
                }}
                colors={{ scheme: 'set1' }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[]}
              />
            </div>
          </div>
        </div>
        {/* Years list right */}
        <YearSelectList select={(e:any) => setSelectedYear(parseInt(e.target.dataset.year))}
        data={availableYears} selected={selectedYear} classes="hidden xl:flex"></YearSelectList>
      </div>
      <div className="flex flex-row px800:justify-center">
        <div className="flex flex-row justify-between w-full px800:w-[766px]">
          <YearSelectList select={(e:any) => setSelectedYear(parseInt(e.target.dataset.year))}
          data={availableYears} selected={selectedYear} 
          classes="xl:hidden flex border-none flex-row-reverse flex-wrap justify-center
          child:p-2 child:w-auto child:md:w-auto w-full child:py-1"></YearSelectList>
        </div>
      </div>
    </div>
  )
}
export default StatisticGraph