import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface ReadMoreProps {
  to?:string
  href?:string
}
 
const ReadMore: FunctionComponent<ReadMoreProps> = ({to, href}:ReadMoreProps) => {
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" 
    className="flex items-center -mx-1 text-sm capitalize transition-colors duration-300 transform hover:underline 
    text-buttonLight dark:text-buttonDark hover:text-buttonHoverLight hover:dark:text-buttonHoverDark">
      <span className="mx-1">read more</span>
      <svg className="w-4 h-4 mx-1 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
      </svg>
    </a>
  ) : to ? (
    <Link to={to} className="flex items-center -mx-1 text-base capitalize transition-colors duration-300 transform hover:underline 
    text-buttonLight dark:text-buttonDark hover:text-buttonHoverLight hover:dark:text-buttonHoverDark">
      <span className="mx-1">read more</span>
      <svg className="w-4 h-4 mx-1 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
      </svg>
    </Link>
  ) : (<div></div>);
}
 
export default ReadMore;