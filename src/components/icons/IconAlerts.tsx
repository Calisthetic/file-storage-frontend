import { ClassesProps, OptionalFillProps } from "./IconProps";

interface TypeProps {
  type: string
}

export default function IconAlerts(props:ClassesProps & TypeProps & OptionalFillProps) {
  return props.fillClasses !== undefined ? (props.type === "error" ? (
    <svg className={props.classes} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 
      36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 
      3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"
      className={props.fillClasses}/>
    </svg>
  ) : (props.type === "success" ? (
    <svg className={props.classes} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 
      20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 
      3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 
      10.9666L31.6667 13.3333L16.6667 28.3333Z" 
      className={props.fillClasses}/>
    </svg>
  ) : ( // warning
    <svg className={props.classes} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 
      36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 
      3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 
      21.6666H18.3334V11.6666H21.6667V21.6666Z"
      className={props.fillClasses}></path>
    </svg>
  ))) : (props.type === "error" ? ( // Auto fill color
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={props.classes}>
      <path d="M20 2H4c-1.103 0-2 .894-2 1.992v12.016C2 17.106 2.897 18 4 
      18h3v4l6.351-4H20c1.103 0 2-.894 2-1.992V3.992A1.998 1.998 0 0 0 20 
      2zm-7 13h-2v-2h2v2zm0-4h-2V5h2v6z" className="fill-error"></path>
    </svg>
  ) : props.type === "success" ? (
    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"
    className={props.classes}>
      <path d="M58.395 32.156 42.995 50.625l-5.39-6.463a5.995 5.995 0 1 0-9.212 
      7.676l9.997 12a5.991 5.991 0 0 0 9.21.006l20.005-24a5.999 5.999 0 1 0-9.211-7.688Z" 
      className="fill-success"></path>
      <path d="M48 0a48 48 0 1 0 48 48A48.051 48.051 0 0 0 48 0Zm0 84a36 
      36 0 1 1 36-36 36.04 36.04 0 0 1-36 36Z" 
      className="fill-success"></path>
    </svg>
  ) : ( // warning
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={props.classes}>
      <path className="fill-warning" fillRule="evenodd" clipRule="evenodd" 
      d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 
      3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
    </svg>
  ))
}