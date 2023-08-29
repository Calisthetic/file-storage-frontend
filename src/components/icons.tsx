import { FunctionComponent } from "react";

// Styles
interface ColorProps {
  firstColor: string,
  secondColor: string,
}
interface FillProps {
  fillClasses: string
}
interface SizeProps {
  width: string,
  height: string,
}
interface ClassesProps {
  classes: string
}
// Custom
interface TypeProps {
  type: string
}
interface IsActiveProps {
  isActive: boolean
}



type IconTileStarProps = ColorProps & SizeProps & IsActiveProps
const IconTileStar: FunctionComponent<IconTileStarProps> = ({firstColor, secondColor, width, height, isActive}:IconTileStarProps) => {
  return isActive ? ( 
    <svg style={{width: width, height: height}} version="1.1" viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><desc/><defs/><g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1"><g transform="translate(-1.000000, 0.000000)">
      <path d="M31.7569,1.14435 L39.2006,16.94809 C39.4742047,17.5450605 40.0274966,17.9662669 40.67576,18.07109 L57.32037,20.60534 C58.0728338,20.7512497 58.6840769,21.2991656 58.9110909,22.0312558 C59.1381048,22.7633461 58.9440977,23.560962 58.4062,24.107 L46.36205,36.40845 C45.8969861,36.8906851 45.6879532,37.5647752 45.79858,38.22553 L48.64182,55.59553 C48.7969313,56.3422303 48.5093863,57.1116407 47.9025754,57.5735945 C47.2957646,58.0355484 46.4775729,58.1079148 45.7991,57.75964 L30.9117,49.55864 C30.3445605,49.2442297 29.6554395,49.2442297 29.0883,49.55864 L14.2009,57.75964 C13.5224271,58.1079148 12.7042354,58.0355484 12.0974246,57.5735945 C11.4906137,57.1116407 11.2030687,56.3422303 11.35818,55.59553 L14.20142,38.22553 C14.3120468,37.5647752 14.1030139,36.8906851 13.63795,36.40845 L1.5938,24.107 C1.05593046,23.5609597 0.861941478,22.7633618 1.08895299,22.0312898 C1.31596449,21.2992177 1.92718692,20.7513115 2.67963,20.60539 L19.32424,18.0711 C19.9725034,17.9662769 20.5257953,17.5450705 20.7994,16.9481 L28.2431,1.14435 C28.5505421,0.448721422 29.2394609,-5.16717968e-06 30,-5.16717968e-06 C30.7605391,-5.16717968e-06 31.4494579,0.448721422 31.7569,1.14435 Z" 
        fill={secondColor} id="Shape"/>
      <path d="M18.14844,38.87158 C18.4633166,36.9540814 17.8494148,35.0009438 16.49414,33.6084 L7.07031,23.98291 L19.92676,22.02591 C21.8914891,21.7210725 23.5752482,20.4575107 24.417,18.65625 L30,6.80225 L35.581,18.65283 C36.4226712,20.4555677 38.1072282,21.720432 40.07319,22.02583 L52.92964,23.98283 L43.50386,33.61027 C42.1493392,35.0034307 41.5362139,36.9566633 41.85156,38.874 L44.03613,52.22166 L32.8418,46.05518 C31.0734665,45.0789497 28.9278569,45.0785721 27.15918,46.05418 L15.96387,52.22168 L18.14844,38.87158 Z" 
        fill={firstColor}/></g></g>
    </svg>
  ) : (
    <svg style={{width: width, height: height, transform: "translate(0px, 2px)"}} 
    fill="none" stroke={firstColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
  )
}
export default IconTileStar;


export function IconAlerts({classes, type}:ClassesProps & TypeProps) {
  return type === "error" ? (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={classes}>
      <path d="M20 2H4c-1.103 0-2 .894-2 1.992v12.016C2 17.106 2.897 18 4 
      18h3v4l6.351-4H20c1.103 0 2-.894 2-1.992V3.992A1.998 1.998 0 0 0 20 
      2zm-7 13h-2v-2h2v2zm0-4h-2V5h2v6z" className="fill-errorLight dark:fill-errorDark"></path>
    </svg>
  ) : (type === "success" ? (
    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"
    className={classes}>
      <path d="M58.395 32.156 42.995 50.625l-5.39-6.463a5.995 5.995 0 1 0-9.212 
      7.676l9.997 12a5.991 5.991 0 0 0 9.21.006l20.005-24a5.999 5.999 0 1 0-9.211-7.688Z" 
      className="fill-successLight dark:fill-successDark"></path>
      <path d="M48 0a48 48 0 1 0 48 48A48.051 48.051 0 0 0 48 0Zm0 84a36 
      36 0 1 1 36-36 36.04 36.04 0 0 1-36 36Z" 
      className="fill-successLight dark:fill-successDark"></path>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={classes}>
      <path className="fill-warningLight dark:fill-warningDark" fillRule="evenodd" clipRule="evenodd" 
      d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 
      3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
    </svg>
  ))
}

export function IconInfo({classes, fillClasses}:ClassesProps & FillProps) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" 
    enableBackground="new 0 0 24 24" className={classes}><g>
      <path d="M12 10c-.6 0-1 .4-1 1v5c0 .6.4 1 1 1s1-.4 1-1v-5c0-.6-.4-1-1-1z" 
      className={fillClasses}></path>
      <circle cx="12" cy="8" r="1" className={fillClasses}></circle>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 
      18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" 
      className={fillClasses}></path></g>
    </svg>
  )
}

export function IconDelete({classes, fillClasses}:ClassesProps & FillProps) {
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

export function IconLink({classes, fillClasses}:ClassesProps & FillProps) {
  return (
    <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg" className={classes}>
      <path d="M598.6 41.41C570.1 13.8 534.8 0 498.6 0s-72.36 13.8-99.96 41.41l-43.36 43.36c15.11 8.012 
      29.47 17.58 41.91 30.02 3.146 3.146 5.898 6.518 8.742 9.838l37.96-37.96C458.5 72.05 477.1 64 498.6 
      64c20.67 0 40.1 8.047 54.71 22.66 14.61 14.61 22.66 34.04 22.66 54.71s-8.049 40.1-22.66 54.71l-133.3 
      133.3C405.5 343.1 386 352 365.4 352s-40.1-8.048-54.71-22.66C296 314.7 287.1 295.3 287.1 274.6s8.047-40.1 
      22.66-54.71l4.44-3.49c-2.1-3.9-4.3-7.9-7.5-11.1-8.6-8.6-19.9-13.3-32.1-13.3-11.93 0-23.1 4.664-31.61 
      12.97-30.71 53.96-23.63 123.6 22.39 169.6C293 402.2 329.2 416 365.4 416c36.18 0 72.36-13.8 99.96-41.41L598.6 
      241.3c28.45-28.45 42.24-66.01 41.37-103.3-.87-35.9-14.57-69.84-41.37-96.59zM234 387.4l-37.9 37.9C181.5 
      439.1 162 448 141.4 448c-20.67 0-40.1-8.047-54.71-22.66-14.61-14.61-22.66-34.04-22.66-54.71s8.049-40.1 
      22.66-54.71l133.3-133.3C234.5 168 253.1 160 274.6 160s40.1 8.048 54.71 22.66c14.62 14.61 22.66 34.04 
      22.66 54.71s-8.047 40.1-22.66 54.71l-3.51 3.52c2.094 3.939 4.219 7.895 7.465 11.15C341.9 315.3 353.3 
      320 365.4 320c11.93 0 23.1-4.664 31.61-12.97 30.71-53.96 23.63-123.6-22.39-169.6C346.1 109.8 310.8 96 
      274.6 96c-36.2 0-72.3 13.8-99.9 41.4L41.41 270.7C13.81 298.3 0 334.48 0 370.66c0 36.18 13.8 72.36 41.41 
      99.97C69.01 498.2 105.2 512 141.4 512c36.18 0 
      72.36-13.8 99.96-41.41l43.36-43.36c-15.11-8.012-29.47-17.58-41.91-30.02-3.21-3.11-5.91-6.51-8.81-9.81z" 
      className={fillClasses}></path>
    </svg>
  )
}

export function IconEdit({classes, fillClasses}:ClassesProps & FillProps) {
  return (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"
    className={classes}><g>
      <path d="M2 29a1 1 0 0 1-1-1.11l.77-7a1 1 0 0 1 .29-.59L18.42 3.94a3.2 
      3.2 0 0 1 4.53 0l3.11 3.11a3.2 3.2 0 0 1 0 4.53L9.71 27.93a1 1 0 0 1-.59.29l-7 
      .77Zm7-1.78Zm-5.27-5.77-.6 5.42 5.42-.6 16.1-16.1a1.2 1.2 0 0 0 0-1.7l-3.12-3.12a1.2 
      1.2 0 0 0-1.7 0Z" className={fillClasses}></path>
      <path d="M23 14.21a1 1 0 0 1-.71-.29l-6.21-6.23a1 1 0 0 1 1.42-1.42l6.23 6.23a1 1 0 
      0 1 0 1.42 1 1 0 0 1-.73.29Z" className={fillClasses}></path>
      <path transform="rotate(-45 12.901 17.096)" d="M7.39 16.1H18.4v2H7.39z" 
      className={fillClasses}></path>
      <path d="M30 29H14a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2Z" 
      className={fillClasses}></path></g>
    </svg>
  )
}

export function IconWatch({classes, fillClasses}:ClassesProps & FillProps) {
  return (
    <svg className={classes} enableBackground="new 0 0 512 512"
    viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path d="M256 128c-81.9 0-145.7 48.8-224 128 67.4 67.7 124 128 224 128 99.9 0 173.4-76.4 
      224-126.6C428.2 198.6 354.8 128 256 128zm0 219.3c-49.4 0-89.6-41-89.6-91.3 0-50.4 40.2-91.3 
      89.6-91.3s89.6 41 89.6 91.3c0 50.4-40.2 91.3-89.6 91.3z" className={fillClasses}></path>
      <path d="M256 224c0-7.9 2.9-15.1 7.6-20.7-2.5-.4-5-.6-7.6-.6-28.8 0-52.3 23.9-52.3 53.3s23.5 
      53.3 52.3 53.3 52.3-23.9 52.3-53.3c0-2.3-.2-4.6-.4-6.9-5.5 4.3-12.3 6.9-19.8 6.9-17.8 
      0-32.1-14.3-32.1-32z" className={fillClasses}></path>
    </svg>
  )
}

export function IconDownload({classes}:ClassesProps) {
  return (
    <svg fill="none" className={classes}
    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"></path>
    </svg>
  )
}