import { FunctionComponent, memo } from "react";
import { defaultColors, extendedColors } from "../data/style/folder-colors";
import { InvertColor } from "../lib/color-utils";

interface ColorPickerProps {
  onSelect:(e:any) => void
  type:string
  dataId?:any
  currentColor:string | null | undefined
}
 
const ColorPicker: FunctionComponent<ColorPickerProps> = memo(({onSelect, currentColor, type, dataId}:ColorPickerProps) => {
  const colorsInRow = 5
  return type === "default" ? (
    <>
      <div className="font-semibold mb-1">
        <div>Folder's color</div>
      </div>
      <div className="flex flex-row gap-1 md:gap-1.5">
        {defaultColors.slice(defaultColors.length - (Math.floor(defaultColors.length / colorsInRow)))
        .map((temp_default_color, temp_default_color_index) => (
          <div key={temp_default_color_index} className="flex flex-col gap-1 md:gap-1.5">
            {defaultColors.slice(temp_default_color_index * colorsInRow, temp_default_color_index * colorsInRow + colorsInRow)
            .map((default_color, default_color_index) => (
              <div key={default_color_index} className="h-6 w-6">
                <button className="rounded-full h-6 w-6 transition-shadow
                hover:shadow-defaultLight hover:dark:shadow-defaultDark pointer-events-auto"
                style={{backgroundColor: "#" + default_color.color}}
                id={"select-color-" + (temp_default_color_index * 4 + default_color_index).toString()} aria-label="Select color"
                title={default_color.name} onClick={() => onSelect({id: dataId, color: default_color.color})}>
                  {currentColor?.toLowerCase() === default_color.color.toLowerCase() ? (
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" 
                    enableBackground="new 0 0 24 24" className="w-6 h-6">
                      <path d="M10 18c-.5 0-1-.2-1.4-.6l-4-4c-.8-.8-.8-2 0-2.8.8-.8 2.1-.8 
                      2.8 0l2.6 2.6 6.6-6.6c.8-.8 2-.8 2.8 0 .8.8.8 2 0 2.8l-8 8c-.4.4-.9.6-1.4.6z" 
                      fill={InvertColor("#" + default_color.color)}></path>
                    </svg>
                  ) : null}
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  ) : (
    <>
      <div className="font-semibold mb-1">
        <div>Folder's color</div>
      </div>
      <div className="flex flex-col flex-wrap max-h-[145px] min-h-[145px]">
        {extendedColors.map((extended_color, extended_color_index) => currentColor === extended_color ? (
          <button className="rounded h-4 w-4 pointer-events-none" 
          style={{backgroundColor: "#" + extended_color}} key={extended_color_index}
          id={"select-color-" + extended_color_index.toString()} aria-label="Select color">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" 
            enableBackground="new 0 0 24 24" className="w-4 h-4">
              <path d="M10 18c-.5 0-1-.2-1.4-.6l-4-4c-.8-.8-.8-2 0-2.8.8-.8 2.1-.8 
              2.8 0l2.6 2.6 6.6-6.6c.8-.8 2-.8 2.8 0 .8.8.8 2 0 2.8l-8 8c-.4.4-.9.6-1.4.6z" 
              fill={InvertColor("#" + extended_color)}></path>
            </svg>
          </button>
        ) : (
          <button className="rounded h-4 w-4 m-[1px]" style={{backgroundColor: "#" + extended_color}}
          key={extended_color_index} onClick={() => onSelect({id: dataId, color: extended_color})}></button>
        ))}
      </div>
    </>
  );
})
 
export default ColorPicker;