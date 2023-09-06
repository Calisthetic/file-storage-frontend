import { FunctionComponent } from "react"
import { twMerge } from "tailwind-merge"

interface YearSelectListProps {
  select: (e:any) => void
  data: number[]
  selected: number
  classes: string
}
const YearSelectList: FunctionComponent<YearSelectListProps> = (props:YearSelectListProps) => {
  return (
    <div className={twMerge("flex-col md:gap-y-1.5 px-2 md:px-4 my-4", 
    "border-l border-borderLight dark:border-borderDark", props.classes)}>
      {props.data.sort((a,b) => (b-a)).map((item, index) => props.selected === item ? (
        <button key={index} id={"select-year" + item + "-btn"} aria-label="Select year"
        className="text-textLight dark:text-textDark md:w-32 py-1 md:py-1.5 px-3 md:px-4 text-left
        bg-buttonLight dark:bg-buttonDark rounded-lg transition-colors" disabled>
          <span className="opacity-90 text-sm font-medium pointer-events-none">{item}</span>
        </button>
      ) : (
        <button key={index} id={"select-year" + item + "-btn"} aria-label="Select year"
        className="text-textLight dark:text-textDark md:w-32 py-1 md:py-1.5 px-3 md:px-4 text-left transition-colors
        hover:bg-backgroundThirdLight hover:dark:bg-backgroundThirdDark rounded-lg"
        onClick={props.select} data-year={item}>
          <span className="opacity-90 text-sm font-medium pointer-events-none">{item}</span>
        </button>
      ))}
    </div>
  );
}
export default YearSelectList;