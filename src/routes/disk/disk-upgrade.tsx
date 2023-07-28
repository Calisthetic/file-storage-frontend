import { Component, useRef} from 'react';

export default function DiskUpgrade() {
  const inputColor : any = useRef()
  const inputColor2 : any = useRef()

  function ChangeTheme() {
    if (inputColor.current) {
      document.documentElement.style
      .setProperty('--textDark', inputColor.current.value);
    }
  }
  function ChangeTheme2() {
    if (inputColor2.current) {
      document.documentElement.style
      .setProperty('--iconDark', inputColor2.current.value);
    }
  }

  return (
    <div>
      <input ref={inputColor} type='color' onInput={ChangeTheme}></input>
      <input ref={inputColor2} type='color' onInput={ChangeTheme2}></input>
    </div>
  )
}