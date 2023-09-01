import { ResponsiveCalendar } from '@nivo/calendar'
import { FunctionComponent, useState } from 'react'
import { IActivityStat } from './user-statistic'
import { GetColorGradient, GetCSSValue } from '../../../lib/utils'

interface StatisticCalendarProps {
  data: IActivityStat[],
}

const StatisticCalendar:FunctionComponent<StatisticCalendarProps> = ({data}:StatisticCalendarProps) => {
  function GetCurrentYear():number {
    var currentTime = new Date()
    return currentTime.getFullYear()
  }

  // Style text and rectangles
  setTimeout(() => {
    let rectElems:SVGRectElement[] = Array.from(document.getElementsByTagName("rect"))
    if (rectElems.length > 372) { // from 6 to 372
      for (let i = 6; i < 372; i++) {
        rectElems[i].setAttributeNS(null, "rx", "4")
        rectElems[i].setAttributeNS(null, "ry", "4")
      }
    }
    let textElems:SVGTextElement[] = Array.from(document.getElementsByTagName("text"))
    if (textElems.length > 22) {
      for (let i = 10; i < 23; i++) {
        textElems[i].style.fill = GetCSSValue("text")
      }
    }
  }, 250);

  // Current calendar colors
  const [calendarColors, setCalendarColors] = useState<string[]>(GetColorGradient(GetCSSValue("icon"), 4))
  // Check css variable changed
  var observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation:any) => {
      if (mutation.type === "attributes") {
        setCalendarColors(GetColorGradient(GetCSSValue("icon"), 4))
      }
    });
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

  // Available years
  const [availableYears, setAvailableYears] = useState<number[]>([2020, 2021, 2022, 2023])
  const [selectedYear, setSelectedYear] = useState<number>(GetCurrentYear())
  

  return (
    <div className="rounded border border-borderLight dark:border-borderDark">
      <div className="flex flex-col lg:flex-row lg:justify-center">
        <div className="mt-2">
          <div className="overflow-x-auto md:overflow-x-visible pb-2">
            {/* Calendar */}
            <div className="h-[140px] w-[766px]">
              <ResponsiveCalendar
                data={data}
                from={GetCurrentYear().toString() + "-01-01"}
                to={GetCurrentYear().toString() + "-12-31"}
                emptyColor={GetCSSValue("backgroundThird")}
                colors={calendarColors}
                margin={{ top: 20, right: 0, bottom: 0, left: 30 }}
                yearSpacing={40}
                monthBorderColor={GetCSSValue("backgroundSecond")}
                dayBorderWidth={3}
                dayBorderColor={GetCSSValue("backgroundSecond")}
                legends={[
                  {
                    anchor: 'bottom-right',
                    direction: 'row',
                    translateY: 36,
                    itemCount: 4,
                    itemWidth: 42,
                    itemHeight: 36,
                    itemsSpacing: 14,
                    itemDirection: 'right-to-left'
                  }
                ]}
                onClick={(e:any) => console.log(e)}
              />
            </div>
            {/* Bottom section */}
            <div className="w-[766px] h-4 px-10 -mt-2 text-xs flex flex-row justify-between">
              <button className="hover:text-buttonHoverLight hover:dark:text-buttonHoverDark">
                How we count your actions?
              </button>
              <div className="flex flex-row items-center gap-x-1">
                <span>Less</span>
                <div className="gap-x-0.5 flex flex-row pt-0.5">
                  <div style={{backgroundColor: GetCSSValue("backgroundThird")}}
                  className="h-2.5 w-2.5 rounded-sm"></div>
                  {calendarColors.reverse().map((item, index) => (
                    <div key={index} style={{backgroundColor: item}}
                    className="h-2.5 w-2.5 rounded-sm"></div>
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
        {/* Years list */}
        <div className="flex flex-col gap-y-1.5 px-4 my-4 
        lg:border-l border-borderLight dark:border-borderDark">
          {availableYears.sort((a,b) => (b-a)).map((item, index) => selectedYear === item ? (
            <button key={index} id={"select-year" + item + "-btn"} aria-label="Select year"
            className="text-textLight dark:text-textDark w-32 py-1.5 pl-4 text-left
            bg-buttonLight dark:bg-buttonDark rounded-lg transition-colors" disabled>
              <span className="opacity-90 text-sm font-medium">{item}</span>
            </button>
          ) : (
            <button key={index} id={"select-year" + item + "-btn"} aria-label="Select year"
            className="text-textLight dark:text-textDark w-32 py-1.5 pl-4 text-left transition-colors
            hover:bg-backgroundThirdLight hover:dark:bg-backgroundThirdDark rounded-lg"
            onClick={() => {setSelectedYear(item)}}>
              <span className="opacity-90 text-sm font-medium">{item}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StatisticCalendar