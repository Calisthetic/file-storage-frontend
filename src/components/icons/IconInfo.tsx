import { ClassesProps, FillProps } from "./IconProps";

export default function IconInfo({classes, fillClasses}:ClassesProps & FillProps) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" 
    enableBackground="new 0 0 24 24" className={classes}><g>
      <path d="M12 10c-.6 0-1 .4-1 1v5c0 .6.4 1 1 1s1-.4 1-1v-5c0-.6-.4-1-1-1z" 
      className={fillClasses}></path>
      <circle cx="12" cy="8" r="1" className={fillClasses}></circle>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 
      18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" 
      className={fillClasses}></path></g>
    </svg>
  )
}