import { Component} from 'react';

export default function EditUIModal() {
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

  var styleVariables = getComputedStyle(document.body)
  function GetCSSValue(name: string) {
    return styleVariables.getPropertyValue('--' + name)
  }

  return (
    <div className="text-textLight dark:text-textDark bg-backgroundSecondLight dark:bg-backgroundSecondDark 
    rounded-2xl w-full h-full justify-center text-center">
      <p className="py-2 px-3 border-b-2 whitespace-nowrap text-xl font-bold
      border-borderLight dark:border-borderDark">Customize the interface</p>
      <div className="whitespace-nowrap py-2 px-4 font-medium w-full">
        <div className=" my-2 flex justify-between">
          <span className="mr-2">text</span>
          <input type="color" onInput={ChangeTheme} 
          defaultValue={isDarkMode ? GetCSSValue("textDark") : GetCSSValue("textLight")} data-target="text"></input>
        </div>
        <div className=" my-2 flex justify-between">
          <span className="mr-2">button</span>
          <input type="color" onInput={ChangeTheme} 
          defaultValue={isDarkMode ? GetCSSValue("buttonDark") : GetCSSValue("buttonLight")} data-target="button"></input>
        </div>
        <div className=" my-2 flex justify-between">
          <span className="mr-2">button hover</span>
          <input type="color" onInput={ChangeTheme} 
          defaultValue={isDarkMode ? GetCSSValue("buttonHoverDark") : GetCSSValue("buttonHoverLight")} data-target="buttonHover"></input>
        </div>
        <div className=" my-2 flex justify-between">
          <span className="mr-2">icons</span>
          <input type="color" onInput={ChangeTheme} 
          defaultValue={isDarkMode ? GetCSSValue("iconDark") : GetCSSValue("iconLight")} data-target="icon"></input>
        </div>
        <div className=" my-2 flex justify-between">
          <span className="mr-2">shadows</span>
          <input type="color" onInput={ChangeTheme} 
          defaultValue={isDarkMode ? GetCSSValue("shadowDark") : GetCSSValue("shadowLight")} data-target="shadow"></input>
        </div>
        <div className=" my-2 flex justify-between">
          <span className="mr-2">borders</span>
          <input type="color" onInput={ChangeTheme} 
          defaultValue={isDarkMode ? GetCSSValue("borderDark") : GetCSSValue("borderLight")} data-target="border"></input>
        </div>
        <div className=" my-2 flex justify-between">
          <span className="mr-2">primary backgroung</span>
          <input type="color" onInput={ChangeTheme} 
          defaultValue={isDarkMode ? GetCSSValue("backgroundDark") : GetCSSValue("backgroundLight")} data-target="background"></input>
        </div>
        <div className=" my-2 flex justify-between">
          <span className="mr-2">secondary backgroung</span>
          <input type="color" onInput={ChangeTheme} 
          defaultValue={isDarkMode ? GetCSSValue("backgroundSecondDark") : GetCSSValue("backgroundSecondLight")} data-target="backgroundSecond"></input>
        </div>
        <div className=" my-2 flex justify-between">
          <span className="mr-2">third backgroung</span>
          <input type="color" onInput={ChangeTheme} 
          defaultValue={isDarkMode ? GetCSSValue("backgroundThirdDark") : GetCSSValue("backgroundThirdLight")} data-target="backgroundThird"></input>
        </div>
        <div className=" my-2 flex justify-between">
          <span className="mr-2">backgroung accent</span>
          <input type="color" onInput={ChangeTheme} 
          defaultValue={isDarkMode ? GetCSSValue("backgroundAccentDark") : GetCSSValue("backgroundAccentLight")} data-target="backgroundAccent"></input>
        </div>
        <div className=" my-2 flex justify-between">
          <span className="mr-2">hover backgroung</span>
          <input type="color" onInput={ChangeTheme} 
          defaultValue={isDarkMode ? GetCSSValue("backgroundHoverDark") : GetCSSValue("backgroundHoverLight")} data-target="backgroundHover"></input>
        </div>
      </div>
    </div>
  )
}