import { FunctionComponent } from "react";

interface EmptyDataProps {
  title:string,
  text:string
}
 
const EmptyData: FunctionComponent<EmptyDataProps> = ({title, text}:EmptyDataProps) => {
  return (
    <main className="h-[calc(100%-44px)] sm:h-[calc(100%-48px)] flex items-center justify-center">
      <div className="flex flex-col items-center py-4 px-4 max-w-xs text-center text-textLight dark:text-textDark">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <h3 className="text-base font-normal mt-2">{text}</h3>
      </div>
    </main>
  );
}
 
export default EmptyData;