import { FunctionComponent } from "react";
import { ClassesProps } from "./IconProps";
 
const IconDelete: FunctionComponent<ClassesProps> = ({classes}:ClassesProps) => {
  return (
    <svg fill="none" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" className={classes}>
      <path d="M7.8 13a.8.8 0 0 0-.8.8v.4a.8.8 0 0 0 .8.8h12.4a.8.8 0 0 0 .8-.8v-.4a.8.8 0 0 0-.8-.8H7.8Z"></path>
      <path clipRule="evenodd" d="M14 1C6.82 1 1 6.82 1 14s5.82 13 13 13 13-5.82 13-13S21.18 1 14 1ZM3 14C3 7.925 7.926 
      3 14 3s11 4.925 11 11-4.926 11-11 11S3 20.075 3 14Z" fillRule="evenodd"></path>
    </svg>
  );
}
 
export default IconDelete;