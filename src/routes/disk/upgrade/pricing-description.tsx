const PricingDescription = (props: any) => {
  return ( 
    props.active === true ? (
      <li className="flex space-x-3 items-center">
        <svg className="flex-shrink-0 w-4 h-4 fill-iconLight dark:fill-iconDark" 
          aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 
          1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        <p className="text-base text-textLight dark:text-textDark opacity-90 font-normal leading-tight">
          {props.text === undefined ? "Unknown feature" : props.text}
        </p>
      </li>
    ) : (
      <li className="flex space-x-3 items-center line-through decoration-textLight dark:decoration-textDark opacity-60">
        <svg className="flex-shrink-0 w-4 h-4 fill-textLight dark:fill-textDark opacity-60" 
          aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 
          1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        <p className="text-base font-normal leading-tight text-textLight dark:text-textDark">
          {props.text === undefined ? "Unknown feature" : props.text}
        </p>
      </li>
    )
  )
}
 
export default PricingDescription;