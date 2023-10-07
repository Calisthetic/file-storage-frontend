import { FunctionComponent } from "react";
import { ClassesProps, FillProps, StrokeProps } from "./IconProps";
 
const IconFolderError: FunctionComponent<StrokeProps&FillProps&ClassesProps> = 
({fillClasses, strokeClasses, classes}:StrokeProps&FillProps&ClassesProps) => {
  return (
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className={classes}>
      <path d="M64,448 C64,448 64,448 64,448 S16,448 16,400 16,136 16,136 16,88 64,88 208,88 208,88 
      256,136 256,136 448,136 448,136 496,136 496,188 496,400, 496,400 496,448 448,448 z"
      className={strokeClasses + " fill-none"} strokeWidth="20"></path>
      <path d="m250.26 195.39 5.74 122 5.73-121.95a5.74 5.74 0 0 0-5.79-6h0a5.74 5.74 0 0 0-5.68 5.95Z" 
      className={strokeClasses + " fill-none"} 
      strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></path>
      <path d="M256 397.25a20 20 0 1 1 20-20 20 20 0 0 1-20 20Z"
      className={fillClasses}></path>
    </svg>
  );
}
 
export default IconFolderError;