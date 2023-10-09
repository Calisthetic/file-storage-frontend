import { FunctionComponent } from "react";
import NavBar from "../../components/nav-bar";

interface DocsProps {
  
}
 
const Docs: FunctionComponent<DocsProps> = () => {
  return (
    <div className="min-h-fulldvh">
      <NavBar></NavBar>

      <div className="pt-14 transition-transform text-textLight dark:text-textDark text-lg">
        <div className="bg-backgroundSecondLight overflow-x-hidden dark:bg-backgroundSecondDark min-h-fullWithHeader">


          
        </div>
      </div>
    </div>
  );
}
 
export default Docs;