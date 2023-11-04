import { FunctionComponent } from "react";

interface DiskErrorResponseProps {
  code:number,
  title:string,
  text:string
}
 
const DiskErrorResponse: FunctionComponent<DiskErrorResponseProps> = ({code, title, text}:DiskErrorResponseProps) => {
  let isItFun = true
  return isItFun ? (
    <main className="flex justify-center items-center text-textLight dark:text-textDark h-[calc(100vh-100px)] sm:h-[calc(100vh-104px)]">
      <div className="flex flex-col items-center py-4 px-4 max-w-xs text-center">
        <img src={"https://http.cat/" + code} alt="meme" className=" w-[60vw] aspect-square"></img>
        {/* <h1 className="text-2xl font-semibold">{title}</h1> */}
        <h3 className="text-base font-medium mt-2">{text}</h3>
      </div>
    </main>
  ) : (
    <main className="h-[calc(100%-44px)] sm:h-[calc(100%-48px)] flex items-center justify-center">
      <div className="flex flex-col items-center py-4 px-4 max-w-xs text-center text-textLight dark:text-textDark">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <h3 className="text-base font-normal mt-2">{text}</h3>
      </div>
    </main>
  );
}
 
export default DiskErrorResponse;