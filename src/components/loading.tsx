import { FunctionComponent } from "react";

interface LoadingProps {
  
}
 
const Loading: FunctionComponent<LoadingProps> = () => {
  return (
    <div className="h-full w-full bg-backgroundLight dark:bg-backgroundDark">
      {/* <span className="loading loading-spinner loading-lg"></span> */}
    </div>
  );
}
 
export default Loading;