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

  return (
    <div className="text-textLight dark:text-textDark bg-backgroundSecondaryLight dark:bg-backgroundSecondaryDark 
    rounded-2xl w-full h-full justify-center text-center">
      <p className="py-2 px-3 border-b-2 whitespace-nowrap text-xl font-bold
      border-borderLight dark:border-borderDark">Customize the interface</p>
      <div className="whitespace-nowrap pt-2 pb-4 px-3 font-medium w-full">
        <div className=" my-2 flex justify-between">
          <span className="mr-2">text</span>
          <input type="color" onInput={ChangeTheme} 
          defaultValue={isDarkMode ? "#dddddd" : "#111827"} data-target="text"></input>
        </div>
        <div className=" my-2 flex justify-between">
          <span className="mr-2">text hover</span>
          <input type="color" onInput={ChangeTheme} 
          defaultValue={isDarkMode ? "#ff9999" : "#660000"} data-target="textHover"></input>
        </div>
        <div className=" my-2 flex justify-between">
          <span className="mr-2">icons</span>
          <input type="color" onInput={ChangeTheme} 
          defaultValue={isDarkMode ? "#ff0000" : "#ff0000"} data-target="icon"></input>
        </div>
        <div className=" my-2 flex justify-between">
          <span className="mr-2">borders</span>
          <input type="color" onInput={ChangeTheme} 
          defaultValue={isDarkMode ? "#43464a" : "#c3c6c9"} data-target="border"></input>
        </div>
        <div className=" my-2 flex justify-between">
          <span className="mr-2">primary backgroung</span>
          <input type="color" onInput={ChangeTheme} 
          defaultValue={isDarkMode ? "#131619" : "#f7f9fc"} data-target="background"></input>
        </div>
        <div className=" my-2 flex justify-between">
          <span className="mr-2">secondary backgroung</span>
          <input type="color" onInput={ChangeTheme} 
          defaultValue={isDarkMode ? "#0f1316" : "#ffffff"} data-target="backgroundSecondary"></input>
        </div>
        <div className=" my-2 flex justify-between">
          <span className="mr-2">third backgroung</span>
          <input type="color" onInput={ChangeTheme} 
          defaultValue={isDarkMode ? "#232629" : "#e9eaef"} data-target="backgroundThird"></input>
        </div>
        <div className=" my-2 flex justify-between">
          <span className="mr-2">backgroung accent</span>
          <input type="color" onInput={ChangeTheme} 
          defaultValue={isDarkMode ? "#ff712b" : "#ff5500"} data-target="backgroundAccent"></input>
        </div>
        <div className=" my-2 flex justify-between">
          <span className="mr-2">hover backgroung</span>
          <input type="color" onInput={ChangeTheme} 
          defaultValue={isDarkMode ? "#333639" : "#e3e6ee"} data-target="backgroundHover"></input>
        </div>
      </div>
    </div>
  )
}