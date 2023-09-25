import { FunctionComponent } from "react";

interface FileIconProps {
  fileType:string
}
 
const FileIcon: FunctionComponent<FileIconProps> = ({fileType}:FileIconProps) => {
  return fileType === "ico" ? (
    <></>
  ) : (<></>);
}
 
export default FileIcon;