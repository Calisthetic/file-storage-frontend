import { FunctionComponent } from "react";
import { ClassesProps, FillProps } from "./IconProps";

const IconLogo: FunctionComponent<ClassesProps&FillProps> = ({classes, fillClasses}:ClassesProps & FillProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" className={classes + " " + fillClasses}>
      <polygon points="25.24 128.8, 10 120, 10 64, 58.5 36, 73.74 44.8, 25.24 72.8"></polygon>
      <polygon points="10 57.6, 10 40, 58.5 12, 107 40, 107 57.6, 58.5 29.6"></polygon>
      <polygon points="64.04 8.8, 80 0, 128.5 28, 128.5 84, 113.36 92.8 113.26 36.8"></polygon>
      <polygon points="134.76 31.2, 150 40, 150 96, 101.5 124, 86.26 115.2, 134.76 87.2"></polygon>
      <polygon points="150 102.4, 150 120, 101.5 148, 53 120, 53 101.5, 101.5 130.4"></polygon>
      <polygon points="95.24 151.2, 80 160, 31.5 132, 31.5 76, 46.74 67.2, 46.74 123.2"></polygon>
    </svg>
  );
}
 
export default IconLogo;