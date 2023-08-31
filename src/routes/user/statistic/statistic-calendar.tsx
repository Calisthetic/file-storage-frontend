// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsiveCalendar } from '@nivo/calendar'
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { IActivityStat } from './user-statistic'
import { GetColorGradient, GetCSSValue } from '../../../lib/utils'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
interface StatisticCalendarProps {
  data: IActivityStat[],
}

const StatisticCalendar:FunctionComponent<StatisticCalendarProps> = ({data}:StatisticCalendarProps) => {
  function GetCurrentYear():number {
    var currentTime = new Date()
    return currentTime.getFullYear()
  }

  setTimeout(() => {
    let elems:SVGRectElement[] = Array.from(document.getElementsByTagName("rect"))
    if (elems.length > 372) { // from 6 to 392
      for (let i = 6; i < 372; i++) {
        elems[i].setAttributeNS(null, "rx", "4")
        elems[i].setAttributeNS(null, "ry", "4")
      }
    }
  }, 250);
  

  return (
    <div className="rounded border border-borderLight dark:border-borderDark">
      <div className=" overflow-x-auto">
        <div className="h-[140px] w-full min-w-[768px] max-w-[768px]">
          <ResponsiveCalendar
            data={data}
            from={GetCurrentYear().toString() + "-01-01"}
            to={GetCurrentYear().toString() + "-12-31"}
            emptyColor={GetCSSValue("backgroundThird")}
            colors={GetColorGradient(GetCSSValue("icon"), 4)}
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
      </div>
    </div>
  )
}

export default StatisticCalendar