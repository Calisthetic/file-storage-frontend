import { FunctionComponent } from "react";
import { ClassesProps } from "./IconProps";
 
const IconRestore: FunctionComponent<ClassesProps> = ({classes}:ClassesProps) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={classes}>
      <path d="M12.25 2a9.81 9.81 0 0 0-7.48 3.46L3.41 4.25a1 1 0 0 0-1.07-.16 1 1 0 0 0-.59.91v4a1 
      1 0 0 0 1 1h4.5a1 1 0 0 0 .93-.64 1 1 0 0 0-.27-1.11L6.26 6.78a7.86 7.86 0 0 1 6-2.78 8 8 0 1 
      1-7.54 10.67 1 1 0 0 0-1.89.66A10 10 0 1 0 12.25 2Z"></path>
      <path d="M16 16a1 1 0 0 1-.6-.2l-4-3a1 1 0 0 1-.4-.8V8a1 1 0 0 1 2 0v3.5l3.6 2.7a1 1 0 0 
      1 .2 1.4 1 1 0 0 1-.8.4Z"></path>
    </svg>
  );
}
 
export default IconRestore;