import { FunctionComponent, memo } from "react";
import { CSSVariables, CSSVariablesExtended } from "../../../data/style/css-variables";
import { GetCSSValue } from "../../../lib/color-utils";
import ColorPicker from "../../../components/color-picker";

interface CustomThemeAppearanceProps {
  
}
 
const CustomThemeAppearance: FunctionComponent<CustomThemeAppearanceProps> = memo(() => {
  // Colors logic
  function SetColor(data:any) {
    if (data.color.length === 6) {
      data.color = "#" + data.color
    }

    document.documentElement.style
      .setProperty('--' + data.id + "Dark", data.color);
    document.documentElement.style
      .setProperty('--' + data.id + "Light", data.color);
    SaveChanges()

    const elem = document.getElementById("select-" + data.id + "-color")
    const label = document.getElementById("label-" + data.id + "-color")
    if (elem && label) {
      elem.style.backgroundColor = data.color
      label.innerText = data.color
    }
  }

  // Saving changes
  interface StyleObject {
    name: string;
    value: string;
  }
  function SaveChanges() {
    // Animation

    // Saving changes
    let colors:StyleObject[] = []
    CSSVariablesExtended.forEach(x => {
      colors.push({
        name: x,
        value: GetCSSValue(x),
      })
    });
    localStorage.setItem("colors", JSON.stringify(colors))
  }
  
  // Default color settings
  function ThemeToDefault() {
    localStorage.removeItem("colors")
    window.location.reload()
  }


  return (
    <>
      <label className="font-semibold text-base">Custom theme</label>
      <p className="opacity-80 dark:opacity-70 text-sm">Customize your color scheme that you want to see on the site.</p>
      <div className="mt-2">
        {CSSVariables.map((item, index) => (
          <div key={index} className="flex gap-x-1.5">
            <div className="flex items-center flex-row">
              <button className="w-4 h-4 border border-borderLight dark:border-borderDark rounded focus-first-right" 
              style={{backgroundColor: GetCSSValue(item)}} 
              id={"select-" + item + "-color"} aria-label="Select color"></button>
              <div className="bg-backgroundLight dark:bg-backgroundThirdDark
              focus-second-right rounded-lg text-base z-10 px-2 pb-2 pt-1 w-max">
                <ColorPicker type="default" currentColor={GetCSSValue(item)} dataId={item.toString()} onSelect={SetColor}></ColorPicker>
              </div>
            </div>
            <div className="flex flex-row">
              <p className="first-letter:uppercase">{item}:</p>
              <span className="ml-1 opacity-70" id={"label-" + item + "-color"}>{GetCSSValue(item)}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="bg-backgroundThirdLight dark:bg-backgroundThirdDark
      hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark
      px-4 py-1 mt-2 rounded-md font-medium transition-colors"
      onClick={ThemeToDefault}>Set to default</button>
    </>
  );
})
 
export default CustomThemeAppearance;