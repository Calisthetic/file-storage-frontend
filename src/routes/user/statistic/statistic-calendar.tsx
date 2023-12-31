import { ResponsiveCalendar } from '@nivo/calendar'
import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { GetColorGradient, GetCSSValue } from '../../../lib/color-utils'
import { GetCurrentDate, GetCurrentYear } from '../../../lib/utils'
import YearSelectList from './select-year'
import DailyStatistic from './calendar-daily-stat'
import { motion } from 'framer-motion'

export interface IDayActivityStat {
  binValue?:number,
  deletedValue?:number,
  addedFiles?:number,
  downloadFiles?:number,
}

interface IActivityStat {
  value:number,
  day:string
}

interface StatisticCalendarProps {
  availableYears: number[]
}

const StatisticCalendar:FunctionComponent<StatisticCalendarProps> = ({availableYears}:StatisticCalendarProps) => {
  const currentDate = GetCurrentDate()

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
  }, 50);

  // Current calendar colors
  const [calendarColors, setCalendarColors] = useState<string[]>(GetColorGradient(GetCSSValue("icon"), 4))

  // If css variable changed
  const MutationHandler = useCallback((mutation:MutationRecord) => {
    if (mutation.type === "attributes") {
      setCalendarColors(GetColorGradient(GetCSSValue("icon"), 4))
      
      let textElems:SVGTextElement[] = Array.from(document.getElementsByTagName("text"))
      if (textElems.length > 22) {
        for (let i = 10; i < 23; i++) {
          textElems[i].style.fill = GetCSSValue("text")
        }
      }
    }
  }, [])
  // Check css variable changed event
  useEffect(() => {
    var observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation:MutationRecord) => MutationHandler(mutation));
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
  const activityStatTemp:IActivityStat[] = [
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
  const [activityStat, setActivityStat] = useState<IActivityStat[]>(activityStatTemp)
  // Available years
  const [selectedYear, setSelectedYear] = useState<number>(availableYears[availableYears.length-1])

  useEffect(() => {
    // Request to year stat (calendar)
  }, [selectedYear])

  // Current day data
  const [selectedDay, setSelectedDay] = useState<string>(currentDate)
  const selectedDayStatTemp:IDayActivityStat = {
    binValue:23,
    deletedValue:50,
    addedFiles:13,
    downloadFiles:14,
  }
  const [selectedDayStat, setSelectedDayStat] = useState<IDayActivityStat>(selectedDayStatTemp)

  useEffect(() => {
    // Request to daily statictic
  }, [selectedDay])
  

  return activityStat === undefined ? null : (
    <motion.div initial={{y: 50, opacity: 0}}
    transition={{damping: 24, stiffness: 300}} 
    whileInView={{y: 0, opacity: 1}}
    viewport={{ once: true }}>
      <div className="rounded border border-borderLight dark:border-borderDark">
        <div className="flex flex-col xl:flex-row xl:justify-center">
          <div>
            <div className="overflow-x-auto px1050:overflow-x-visible py-2 px1050:flex flex-col items-center">
              {/* Calendar */}
              <div className="h-[140px] w-[766px]">
                <ResponsiveCalendar
                  data={activityStat}
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
                  onClick={(e:any) => setSelectedDay(e.data.day)}
                />
              </div>
              {/* Bottom section */}
              <div className="w-[766px] h-4 px-10 -mt-2 text-xs flex flex-row justify-between
              text-textLight dark:text-textDark">
                <button className="hover:text-buttonHoverLight hover:dark:text-buttonHoverDark opacity-80">
                  How we count your actions?
                </button>
                <div className="flex flex-row items-center gap-x-1">
                  <span className="opacity-90">Less</span>
                  <div className="gap-x-0.5 flex flex-row pt-0.5">
                    <div style={{backgroundColor: GetCSSValue("backgroundThird")}}
                    className="h-2.5 w-2.5 rounded-sm"></div>
                    {calendarColors.map((item, index) => (
                      <div key={index} style={{backgroundColor: item}}
                      className="h-2.5 w-2.5 rounded-sm"></div>
                    ))}
                  </div>
                  <span className="opacity-90">More</span>
                </div>
              </div>
            </div>
            <DailyStatistic data={selectedDayStat} date={selectedDay} classes='hidden xl:flex'></DailyStatistic>
          </div>
          {/* Years list right */}
          <YearSelectList select={(e:any) => setSelectedYear(parseInt(e.target.dataset.year))}
          data={availableYears} selected={selectedYear} classes="hidden xl:flex"></YearSelectList>
        </div>
        <div className="flex flex-row px1050:justify-center">
          <div className="flex flex-row justify-between w-full px1050:w-[766px]">
            <DailyStatistic data={selectedDayStat} date={selectedDay} classes='flex xl:hidden'></DailyStatistic>
            {/* Years list bottom */}
            <YearSelectList select={(e:any) => setSelectedYear(parseInt(e.target.dataset.year))}
            data={availableYears} selected={selectedYear} classes="xl:hidden flex"></YearSelectList>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
export default StatisticCalendar
