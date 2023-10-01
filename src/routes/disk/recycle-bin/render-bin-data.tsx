import { FunctionComponent, memo } from "react";

interface RenderBinDataProps {
  currentSortType: string
  currentSortBy:string
  currentRenderType:string
  updateTrigger:boolean
}
 
const RenderBinData: FunctionComponent<RenderBinDataProps> = memo(({currentSortType, currentSortBy, currentRenderType, updateTrigger}:RenderBinDataProps) => {
  return (
    <div></div>
  );
})
 
export default RenderBinData;