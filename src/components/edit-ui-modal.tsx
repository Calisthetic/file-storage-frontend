import { useRef, useState} from 'react';

export default function EditUIModal() {
  const alertSuccessRef:any = useRef();
  const [isAlertSuccessOpen, setIsAlertSuccessOpen] = useState(false);
  interface StyleObject {
    name: string;
    value: string;
  }

  let isDarkMode:boolean = false;
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode = true
  }

  function ChangeTheme(e:any) {
    document.documentElement.style
      .setProperty('--' + e.target.dataset.target + "Dark", e.target.value);
    document.documentElement.style
      .setProperty('--' + e.target.dataset.target + "Light", e.target.value);
  }

  function CloseOpenSuccessAlert() {
    if (isAlertSuccessOpen === false) {
      alertSuccessRef.current.style.marginTop = "8px"
      alertSuccessRef.current.style.opacity = "1"
    } else {
      alertSuccessRef.current.style.marginTop = "0px"
      alertSuccessRef.current.style.opacity = "0"
    }
    setIsAlertSuccessOpen(!isAlertSuccessOpen)
  }

  var styleVariables = getComputedStyle(document.body)
  function GetCSSValue(name: string) {
    return styleVariables.getPropertyValue('--' + name)
  }

  

  const getAllCSSVariableNames = (styleSheets: StyleSheetList = document.styleSheets) => {
    const cssVars:string[] = [];

    Array.from(styleSheets).forEach((styleSheet) => {
      Array.from(styleSheet.cssRules).forEach((rule:any) => {
        if (!rule || !rule['style']) {
          return;
        }
        Array.from(rule['style']).forEach((style: any) => {
          if (style.startsWith('--') && cssVars.indexOf(style) == -1 && !style.startsWith('--tw')) {
            cssVars.push(style.substring(2));
          }
        });
      });
    });

    return cssVars;
  };

  function ToDefault() {
    localStorage.removeItem("colors")
    window.location.reload()
  }

  function SaveChanges() {
    // Animation
    if (isAlertSuccessOpen === false) {
      CloseOpenSuccessAlert()
    }

    // Act
    let colorNames:string[] = getAllCSSVariableNames()
    let colors:StyleObject[] = []
    colorNames.forEach(x => {
      colors.push({
        name: x,
        value: GetCSSValue(x),
      })
    });
    localStorage.setItem("colors", JSON.stringify(colors))
  }

  return (
    <div className="text-textLight dark:text-textDark bg-backgroundSecondLight dark:bg-backgroundSecondDark 
    rounded-2xl w-full h-full justify-center text-center">
      <p className="py-2 px-3 border-b-2 whitespace-nowrap text-xl font-bold
      border-borderLight dark:border-borderDark">Customize the interface</p>
      <div className="whitespace-nowrap py-2 px-4 font-medium w-full">
        <div className=" space-y-1">
          <div className=" flex justify-between">
            <span className="mr-2">text</span>
            <input type="color" onInput={ChangeTheme} 
            defaultValue={isDarkMode ? GetCSSValue("textDark") : GetCSSValue("textLight")} data-target="text"></input>
          </div>
          <div className=" flex justify-between">
            <span className="mr-2">button</span>
            <input type="color" onInput={ChangeTheme} 
            defaultValue={isDarkMode ? GetCSSValue("buttonDark") : GetCSSValue("buttonLight")} data-target="button"></input>
          </div>
          <div className=" flex justify-between">
            <span className="mr-2">button hover</span>
            <input type="color" onInput={ChangeTheme} 
            defaultValue={isDarkMode ? GetCSSValue("buttonHoverDark") : GetCSSValue("buttonHoverLight")} data-target="buttonHover"></input>
          </div>
          <div className=" flex justify-between">
            <span className="mr-2">icons</span>
            <input type="color" onInput={ChangeTheme} 
            defaultValue={isDarkMode ? GetCSSValue("iconDark") : GetCSSValue("iconLight")} data-target="icon"></input>
          </div>
          <div className=" flex justify-between">
            <span className="mr-2">shadows</span>
            <input type="color" onInput={ChangeTheme} 
            defaultValue={isDarkMode ? GetCSSValue("shadowDark") : GetCSSValue("shadowLight")} data-target="shadow"></input>
          </div>
          <div className=" flex justify-between">
            <span className="mr-2">borders</span>
            <input type="color" onInput={ChangeTheme} 
            defaultValue={isDarkMode ? GetCSSValue("borderDark") : GetCSSValue("borderLight")} data-target="border"></input>
          </div>
          <div className=" flex justify-between">
            <span className="mr-2">primary backgroung</span>
            <input type="color" onInput={ChangeTheme} 
            defaultValue={isDarkMode ? GetCSSValue("backgroundDark") : GetCSSValue("backgroundLight")} data-target="background"></input>
          </div>
          <div className=" flex justify-between">
            <span className="mr-2">secondary backgroung</span>
            <input type="color" onInput={ChangeTheme} 
            defaultValue={isDarkMode ? GetCSSValue("backgroundSecondDark") : GetCSSValue("backgroundSecondLight")} data-target="backgroundSecond"></input>
          </div>
          <div className=" flex justify-between">
            <span className="mr-2">third backgroung</span>
            <input type="color" onInput={ChangeTheme} 
            defaultValue={isDarkMode ? GetCSSValue("backgroundThirdDark") : GetCSSValue("backgroundThirdLight")} data-target="backgroundThird"></input>
          </div>
          <div className=" flex justify-between">
            <span className="mr-2">backgroung accent</span>
            <input type="color" onInput={ChangeTheme} 
            defaultValue={isDarkMode ? GetCSSValue("backgroundAccentDark") : GetCSSValue("backgroundAccentLight")} data-target="backgroundAccent"></input>
          </div>
          <div className=" flex justify-between">
            <span className="mr-2">backgroung hover</span>
            <input type="color" onInput={ChangeTheme} 
            defaultValue={isDarkMode ? GetCSSValue("backgroundHoverDark") : GetCSSValue("backgroundHoverLight")} data-target="backgroundHover"></input>
          </div>
        </div>
        <div className="flex flex-col">
          <button onClick={SaveChanges} className="bg-buttonLight dark:bg-buttonDark w-full py-1.5 mt-2 rounded-lg
          hover:bg-buttonHoverLight dark:hover:to-buttonHoverDark">Save changes</button>
          <button onClick={ToDefault} className="bg-buttonLight dark:bg-buttonDark w-full py-1.5 mt-2 rounded-lg
          hover:bg-buttonHoverLight dark:hover:to-buttonHoverDark" title='Require page reload'>Default settings</button>
        </div>
      </div>

      {/* Alert success */}
      <div ref={alertSuccessRef} id="alert-1" className="absolute w-full items-center p-4 text-successLight dark:text-successDark opacity-0
      bg-backgroundSecondLight dark:bg-backgroundSecondDark dark:text-blue-400h flex rounded-xl transition-alerts" role="alert">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" role="img" xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 512 512" className="w-4">
          <path className="fill-successLight dark:fill-successDark" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 
          387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 
          0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 
          104c6.249 6.249 16.379 6.249 22.628.001z"></path>
        </svg>
        <span className="sr-only">Info</span>
        <div className="ml-3 text-sm font-medium">
          Changes saved
        </div>
          <button type="button" onClick={CloseOpenSuccessAlert} className="bg-backgroundSecondLight dark:bg-backgroundSecondDark 
          rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 ml-auto -mx-1.5 -my-1.5
          hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark" data-dismiss-target="#alert-1" aria-label="Close">
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path className="stroke-successLight dark:stroke-successDark" strokeLinecap="round" 
              strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
      </div>
    </div>
  )
}