// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from '@nivo/pie'
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { IFileStat } from './user-statistic'
import { GetCSSValue } from '../../../lib/utils'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
interface StatisticPieProps {
  data: IFileStat[],
}

const StatisticPie:FunctionComponent<StatisticPieProps> = ({data}:StatisticPieProps) => {

  const textColor = GetCSSValue("text")

  const [fileStatCount, setFileStatCount] = useState<number>(6)
  function CalculateFileStatCount(operation:string = "") {
    if (operation === "+") {
      setFileStatCount(fileStatCount >= 12 ? 12 : fileStatCount + 1)
    } else if (operation === "-") {
      setFileStatCount(fileStatCount <= 2 ? 2 : fileStatCount - 1)
    } else {
      setFileStatCount(6)
    }
  }
  useEffect(() => {
    console.log(fileStatCount)
  }, [fileStatCount])

  const [fileStatScale, setFileStatScale] = useState<number>(10)
  function CalculateFileStatScale(operation:string = "") {
    if (operation === "+") {
      setFileStatScale(fileStatScale >= 20 ? 20 : fileStatScale + 1)
    } else if (operation === "-") {
      setFileStatScale(fileStatScale <= 2 ? 2 : fileStatScale - 1)
    } else {
      setFileStatScale(10)
    }
  }

  return (
    <div className="grid grid-rows-[36px,minmax(0,1fr)] rounded
    border border-borderLight dark:border-borderDark">
      <div className="flex flex-row justify-between items-center w-full
      border-b border-borderLight dark:border-borderDark p-1 rounded-t">
        <div className="flex flex-row">
          <button title="Zoom in" id="zoom-in-btn" aria-label="Zoom in"
          onClick={() => CalculateFileStatScale("+")} className="rounded p-1 transition-colors
          hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark">
            <svg viewBox="0 0 14 14" className="h-5 w-5 fill-iconLight dark:fill-iconDark">
              <path d="M6 3.5c.28 0 .5.22.5.5v1.5H8a.5.5 0 0 1 0 1H6.5V8a.5.5 0 0 1-1 
              0V6.5H4a.5.5 0 0 1 0-1h1.5V4c0-.28.22-.5.5-.5Z"></path>
              <path fillRule="evenodd" d="M9.54 10.2a5.5 5.5 0 1 1 .66-.66c.06.03.11.06.15.1l3 
              3a.5.5 0 0 1-.7.71l-3-3a.5.5 0 0 1-.1-.14ZM10.5 6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"></path>
            </svg>
          </button>
          <button title="Zoom out" id="zoom-out-btn" aria-label="Zoom out"
          onClick={() => CalculateFileStatScale("-")} className="rounded p-1 transition-colors
          hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark">
            <svg viewBox="0 0 14 14" className="h-5 w-5 fill-iconLight dark:fill-iconDark">
              <path d="M4 5.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H4Z"></path>
              <path fillRule="evenodd" d="M6 11.5c1.35 0 2.59-.49 
              3.54-1.3.03.06.06.11.1.15l3 3a.5.5 0 0 0 .71-.7l-3-3a.5.5 0 0 
              0-.14-.1A5.5 5.5 0 1 0 6 11.5Zm0-1a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"></path>
            </svg>
          </button>
          <button title="Reset zoom" id="reset-zoom-btn" aria-label="Reset zoom"
          onClick={() => CalculateFileStatScale()} className="rounded p-1 transition-colors
          hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark">
            <svg viewBox="0 0 14 14" className="h-5 w-5 fill-iconLight dark:fill-iconDark">
              <path d="M1.5 2.84V1.5a.5.5 0 0 0-1 0V4c0 .28.22.5.5.5h2.5a.5.5 0 0 0 
              0-1H2.26a4.5 4.5 0 1 1-.5 4.02.5.5 0 1 0-.94.33 5.5 5.5 0 0 0 8.72 
              2.36l.1.14 3 3a.5.5 0 0 0 .71-.7l-3-3a.5.5 0 0 0-.14-.1 5.5 5.5 0 1 0-8.7-6.7Z"></path>
            </svg>
          </button>
        </div>
        <div className="flex flex-row font-semibold text-textLight dark:text-textDark">
          <span className="mr-2 hidden sm:block">Number of file types: </span>
          <span className="mr-2 sm:hidden">Amount: </span>
          <button id="subtract-file-stat-count-btn" aria-label="Subtract file stat count" 
          className="w-7 bg-backgroundThirdLight dark:bg-backgroundThirdDark
          hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark transition-colors
          text-lg border-r border-borderLight dark:border-borderDark"
          onClick={() => CalculateFileStatCount("-")}>-</button>
          <input disabled aria-label="File stat count" className="w-9 text-sm block focus:outline-none
          bg-backgroundThirdLight dark:bg-backgroundThirdDark py-1 text-center"
          type="number" placeholder="0" max="10" min="2" maxLength={2} value={fileStatCount}/>
          <button id="add-file-stat-count-btn" aria-label="Add file stat count"
          className="w-7 bg-backgroundThirdLight dark:bg-backgroundThirdDark
          hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark transition-colors
          text-lg border-l border-borderLight dark:border-borderDark"
          onClick={() => CalculateFileStatCount("+")}>+</button>
        </div>
      </div>
      <div className="overflow-y-auto h-auto w-full min-h sm:flex justify-center">
        <div className=" h-[400px] w-[638px]" style={{
          transform: "scale(" + (fileStatScale / 10) + ")",
        }}>
          <ResponsivePie
            data={data}
            margin={{ top: fileStatScale > 10 ? (fileStatScale) * 8 : 40, 
              right: 0, bottom: 60, 
              left: fileStatScale > 10 ? (fileStatScale-10) * 8 : 0
            }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={2}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
              from: 'color',
              modifiers: [
                [
                  'darker',
                  0.2
                ]
              ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={textColor}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: 'color',
              modifiers: [
                [
                    'darker',
                    2
                ]
              ]
            }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'ruby'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'c'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'go'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'python'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'scala'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'lisp'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'elixir'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'javascript'
                    },
                    id: 'lines'
                }
            ]}
            legends={[]}
          />
        </div>
      </div>
    </div>
  )
}

export default StatisticPie