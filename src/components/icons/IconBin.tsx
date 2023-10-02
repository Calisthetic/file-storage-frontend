import { ClassesProps, FillProps } from "./IconProps";

export default function IconBin({classes, fillClasses}:ClassesProps & FillProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" 
    className={classes} viewBox="0,0,256,256">
      <g className={fillClasses} fillRule="nonzero" stroke="none" 
      strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDashoffset="0" 
      fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none">
      <g transform="scale(10.66667,10.66667)">
        <path d="M10,2l-1,1h-4c-0.6,0 -1,0.4 -1,1c0,0.6 0.4,1 1,1h2h10h2c0.6,0 1,-0.4 1,-1c0,-0.6 
        -0.4,-1 -1,-1h-4l-1,-1zM5,7v13c0,1.1 0.9,2 2,2h10c1.1,0 2,-0.9 2,-2v-13zM9,9c0.6,0 
        1,0.4 1,1v9c0,0.6 -0.4,1 -1,1c-0.6,0 -1,-0.4 -1,-1v-9c0,-0.6 0.4,-1 1,-1zM15,9c0.6,0 
        1,0.4 1,1v9c0,0.6 -0.4,1 -1,1c-0.6,0 -1,-0.4 -1,-1v-9c0,-0.6 0.4,-1 1,-1z"></path>
      </g></g>
    </svg>
  )
}