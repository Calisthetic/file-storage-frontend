import { ResponsiveNetwork } from '@nivo/network'
import { FunctionComponent, useState } from 'react'

interface StatisticTreeProps {
  data:any
}
 
const StatisticTree: FunctionComponent<StatisticTreeProps> = (props:StatisticTreeProps) => {

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
        <div className="flex flex-row font-semibold text-textLight dark:text-textDark"></div>
      </div>
      <div className="overflow-y-auto h-auto w-full min-h md:flex justify-center">
        <div className=" h-[400px] w-[638px]" style={{
          transform: "scale(" + (fileStatScale / 10) + ")",
        }}>
          <ResponsiveNetwork
            data={props.data}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            linkDistance={(e:any) => e.distance}
            centeringStrength={0.3}
            repulsivity={6}
            nodeSize={(n:any) => n.size}
            activeNodeSize={(n:any) => 1.5*n.size}
            nodeColor={(e:any) => e.color}
            nodeBorderWidth={1}
            nodeBorderColor={{
              from: 'color',
              modifiers: [
                [
                  'darker',
                  0.8
                ]
              ]
            }}
            linkThickness={(n:any) => 2+2*n.target.data.height}
            linkBlendMode="multiply"
            motionConfig="wobbly"
          />
        </div>
      </div>
    </div>
  )
}
 
export default StatisticTree;