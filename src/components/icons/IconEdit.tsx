import { ClassesProps, FillProps } from "./IconProps";

export default function IconEdit({classes, fillClasses}:ClassesProps & FillProps) {
  return (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"
    className={classes}><g>
      <path d="M2 29a1 1 0 0 1-1-1.11l.77-7a1 1 0 0 1 .29-.59L18.42 3.94a3.2 
      3.2 0 0 1 4.53 0l3.11 3.11a3.2 3.2 0 0 1 0 4.53L9.71 27.93a1 1 0 0 1-.59.29l-7 
      .77Zm7-1.78Zm-5.27-5.77-.6 5.42 5.42-.6 16.1-16.1a1.2 1.2 0 0 0 0-1.7l-3.12-3.12a1.2 
      1.2 0 0 0-1.7 0Z" className={fillClasses}></path>
      <path d="M23 14.21a1 1 0 0 1-.71-.29l-6.21-6.23a1 1 0 0 1 1.42-1.42l6.23 6.23a1 1 0 
      0 1 0 1.42 1 1 0 0 1-.73.29Z" className={fillClasses}></path>
      <path transform="rotate(-45 12.901 17.096)" d="M7.39 16.1H18.4v2H7.39z" 
      className={fillClasses}></path>
      <path d="M30 29H14a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2Z" 
      className={fillClasses}></path></g>
    </svg>
  )
}