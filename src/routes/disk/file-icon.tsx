import { FunctionComponent } from "react";

interface FileIconProps {
  classes:string
  fileType:string
}

const FileIcon: FunctionComponent<FileIconProps> = ({classes, fileType}:FileIconProps) => {
  switch (fileType) {
    // Images
    case "apng":
    case "avif":
    case "gif":
    case "jpg":
    case "jpeg":
    case "jfif":
    case "pjpeg":
    case "pjp":
    case "png":
    case "svg":
    case "webp":
    case "tif":
    case "tiff":
    case "bmp":
    case "ico":
      return (
        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#DC17FF">
          <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
          <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 
          1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"></path>
        </svg>
      );
    // Docs
    case "pdf":
      return (
        <svg version="1.1" viewBox="0 0 512 512" width="512px" xmlns="http://www.w3.org/2000/svg" className={classes}>
          <g><g><polygon points="367.309,53.245 426.374,112.496 426.146,112.714 367.811,112.758 367.266,53.289" fill="#F1F1F1"/>
          <path d="M208.747,146.766c0,11.242-6.28,16.552-15.919,16.476c-1.319,0-2.792,0-3.696-0.207v-30.782 
          c0.904-0.207,2.442-0.425,4.819-0.425C203.088,131.829,208.813,136.997,208.747,146.766z" fill="#F1F1F1"/>
          <path d="M161.131,138.6c0,4.819-3.49,7.687-9.137,7.687c-1.538,0-2.661-0.076-3.566-0.283v-13.892 
          c0.774-0.207,2.235-0.414,4.394-0.414C158.132,131.698,161.131,134.271,161.131,138.6z" fill="#F1F1F1"/>
          <path d="M125.65,94.625h183.182v105.766H125.65h-0.447H86.396V94.625h38.806H125.65z" fill="#F1F1F1"/>
          <path d="M281.182,254.997c0.13,10.98-6.892,32.405-6.892,32.405c-2.422-2.551-7.263-16.203-7.263-28.83 
          c0-12.626,4.079-16.071,7.263-16.071C277.484,242.501,281.049,244.028,281.182,254.997z" fill="#DC1D00"/>
          <path d="M357.638,350.754c0,14.502-26.278,8.591-42.438-6.794 C315.2,343.96,357.638,336.262,357.638,350.754z" fill="#DC1D00"/>
          <path d="M205.149,398.512c-13.008-7.785,27.303-31.763,34.576-32.525 C239.725,365.986,218.768,406.656,205.149,398.512z" fill="#DC1D00"/>
          <path d="M280.417,311.26c7.394,13.772,22.069,29.975,22.069,29.975s-5.616,0.633-18.666,3.827 
          c-13.053,3.194-19.605,6.51-19.605,6.51s0,0,5.354-11.994C274.933,327.583,280.417,311.26,280.417,311.26z" fill="#DC1D00"/>
          <path d="M426.593,112.714V458.81H125.65V200.391h183.182V94.625H125.65V53.191h241.616l0.043,0.054 
          l-0.043,0.043l0.545,59.469l58.335-0.044l0.229-0.218L426.593,112.714z" fill="#DC1D00"/>
          <path d="M239.725,365.986c-7.272,0.763-47.584,24.74-34.576,32.525 
          C218.768,406.656,239.725,365.986,239.725,365.986z M315.2,343.96c16.159,15.385,42.438,21.296,42.438,6.794 
          C357.638,336.262,315.2,343.96,315.2,343.96z M302.486,341.234c0,0-14.676-16.202-22.069-29.975c0,0-5.484,16.323-10.849,28.317 
          c-5.354,11.994-5.354,11.994-5.354,11.994s6.553-3.315,19.605-6.51C296.87,341.867,302.486,341.234,302.486,341.234z 
          M274.29,287.402c0,0,7.021-21.425,6.892-32.405c-0.133-10.969-3.697-12.496-6.892-12.496c-3.184,0-7.263,3.445-7.263,16.071
          C267.027,271.199,271.868,284.852,274.29,287.402z M283.1,303.987c7.143,15.439,26.791,35.328,26.791,35.328 
          s6.368-1.657,32.646-2.289c26.288-0.633,27.434,14.152,27.553,15.428c0.131,1.287,1.157,13.02-19.768,13.782 
          c-20.913,0.764-42.611-21.044-42.611-21.044s-8.92,1.406-16.313,3.185c-7.393,1.787-31.13,8.297-31.13,8.297 
          s-7.022,12.757-22.582,33.158c-15.57,20.412-33.005,18.886-37.978,12.124c-5.779-7.85-1.319-15.688,9.65-25.896 
          c10.969-10.205,36.277-18.667,36.277-18.667s5.103-9.181,12.583-26.703c7.479-17.522,13.139-35.121,13.139-35.121 
          s-7.404-16.813-8.844-31.119c-1.613-15.952,0.175-26.67,12.42-26.801c12.246-0.131,16.072,9.061,16.454,25.001 
          C291.768,278.604,283.1,303.987,283.1,303.987z" fill="#FFFFFF"/>
          <g><polygon points="255,133 255,124 227,124 227,171 237,171 237,152 254,152 254,144 237,144 237,133" fill="#A51600"/>
          <path d="M212.094,128.688c-4.536-3.424-10.548-5.027-19.489-5.027c-5.375,0-10.605,0.349-14.605,0.981 
          v46.21c3,0.349,6.787,0.697,12.304,0.697c9.214,0,16.871-1.952,21.821-6.073c4.536-3.838,7.874-10.054,7.874-19.06 
          C219.999,138.12,216.99,132.319,212.094,128.688z M192.262,163.242c-1.319,0-2.262,0-4.262-0.207v-30.782 
          c2-0.207,3.008-0.425,5.386-0.425c9.137,0,14.861,5.168,14.795,14.938C208.181,158.008,201.9,163.318,192.262,163.242z" fill="#A51600"/>
          <path d="M166.648,127.434c-3.14-2.519-8.259-3.772-14.824-3.772c-6.488,0-11.824,0.425-14.824,0.981V171 
          h11v-16.765c1,0.142,2.449,0.218,3.846,0.218c6.28,0,11.762-1.538,15.394-4.961c2.791-2.649,4.381-6.564,4.381-11.165 
          C171.621,133.715,169.646,129.811,166.648,127.434z M151.779,146.287c-1.537,0-2.779-0.076-3.779-0.283v-13.892 
          c1-0.207,2.449-0.414,4.607-0.414c5.311,0,8.309,2.573,8.309,6.902C160.916,143.419,157.427,146.287,151.779,146.287z" fill="#A51600"/></g></g></g>
        </svg>
      )
    // Microsoft Office
    case "ods":
    case "xlr":
    case "xls":
    case "xlsx":
      return (
        <svg version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className={classes}>
          <path d="M441.412,140.235v338.781c0,18.219-14.778,32.983-32.983,32.983H103.572 
          c-18.219,0-32.983-14.764-32.983-32.983V32.983C70.588,14.764,85.352,0,103.572,0h197.605L441.412,140.235z" fill="#28B446"/>
          <polygon points="320.31,137.188 441.412,187.079 441.412,140.235 372.751,119.962 " fill="#219B38"/>
          <path d="M441.412,140.235H334.16c-18.22,0-32.983-14.764-32.983-32.983V0L441.412,140.235z" fill="#6ACE7C"/>
          <path d="M337.115,254.946H174.876c-5.82,0-10.536,4.717-10.536,10.536v141.169
          c0,5.818,4.716,10.536,10.536,10.536h162.239c5.82,0,10.536-4.717,10.536-10.536V265.482 
          C347.651,259.664,342.935,254.946,337.115,254.946z M185.412,322.682h60.048v26.773h-60.048V322.682z M266.531,322.682h60.048 
          v26.773h-60.048V322.682z M326.58,301.611h-60.048v-25.593h60.048L326.58,301.611L326.58,301.611z M245.46,276.018v25.592h-60.048 
          v-25.592H245.46z M185.412,370.526h60.048v25.592h-60.048V370.526z M266.531,396.117v-25.592h60.048v25.592H266.531z" fill="#FFFFFF"/>
        </svg>
      )
    case "doc":
    case "docx":
      return (
        <svg version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className={classes}>
          <path d="M441.412,140.235v338.781c0,18.219-14.778,32.983-32.983,32.983H103.572 
          c-18.219,0-32.983-14.764-32.983-32.983V32.983C70.588,14.764,85.352,0,103.572,0h197.605L441.412,140.235z" fill="#518EF8"/>
          <g><rect height="21.071" fill="#FFFFFF" width="189.626" x="161.18" y="257.054"/>
          <rect height="21.071" fill="#FFFFFF" width="189.626" x="161.18" y="304.112"/>
          <rect height="21.071" fill="#FFFFFF" width="189.626" x="161.18" y="351.171"/>
          <rect height="21.071" fill="#FFFFFF" width="134.855" x="161.18" y="398.23"/></g>
          <polygon points="320.31,137.188 441.412,187.079 441.412,140.235 372.751,119.962" fill="#3A5BBC"/>
          <path d="M441.412,140.235H334.16c-18.22,0-32.983-14.764-32.983-32.983V0L441.412,140.235z" fill="#ACD1FC"/><g/>
        </svg>
      )
    case "rtf":
    case "txt":
    case "tex":
      return (
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" 
        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={classes + " !fill-none"}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/>
          <line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/>
        </svg>
      )
    case "ppt":
    case "pptx":
      return (
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 512 512">
          <path d="M142.6 354.2c2.3-2.5 3.5-5.6 3.5-9.4 0-3.8-1.2-7-3.5-9.5s-5.8-3.8-10.5-3.8H116V358h16.2c4.6-.1 8.1-1.3 10.4-3.8z" fill="#e0532f"></path>
          <path d="M458 118.2 346.5 8.4C345 6.9 342.9 6 340.7 6H135c-31.1 0-56.3 26.6-56.3 59.4v219.2H51.3v148.6h27.4v13.4c0 32.7 25.3 59.4 56.3 
          59.4h269.4c31.1 0 56.3-26.6 56.3-59.4V124.7c0-2.4-.9-4.8-2.7-6.5zM337.9 24.4l97 95.6h-52.8c-24.4 0-44.2-19.5-44.2-43.4V24.4zm105.8 422.2c0 
          22.9-17.6 41.5-39.3 41.5H135c-21.7 0-39.3-18.6-39.3-41.5v-13.4h187c36.5 0 66-33.3 66-74.3s-29.6-74.3-66-74.3h-187V65.4c0-22.9 17.6-41.5 
          39.3-41.5h185.9v52.7c0 33.8 27.4 61.3 61.2 61.3h61.6v308.7zm-340.3-50.2v-75h28.7c8.3 0 14.8 2.1 19.4 6.4s7 9.9 7 16.9c0 7-2.3 12.7-7 16.9-4.7 
          4.2-11.2 6.4-19.4 6.4H116v28.4h-12.6zm70.4 0v-75h28.7c8.3 0 14.8 2.1 19.4 6.4s7 9.9 7 16.9c0 7-2.3 12.7-7 16.9-4.7 4.2-11.2 6.4-19.4 
          6.4h-16.2v28.4h-12.5zm64.2-64.9v-10h58.5v10h-23.2v65h-12.5v-65H238z" fill="#e0532f"></path>
          <path d="M213 354.2c2.3-2.5 3.5-5.6 3.5-9.4 0-3.8-1.2-7-3.5-9.5s-5.8-3.8-10.5-3.8h-16.2V358h16.2c4.7-.1 8.1-1.3 10.5-3.8z" fill="#e0532f"></path>
        </svg>
      )
    case "xml":
    case "json":
    case "xaml":
    case "yml":
    case "html":
    case "htmlx":
    case "css":
    case "php":
    case "ts":
    case "tsx":
    case "js":
    case "jsx":
    case "cs":
    case "java":
    case "cpp":
    case "py":
    case "ruby":
    case "go":
    case "appx":
    case "c":
    case "class":
    case "env":
    case "config":
    case "h":
    case "kt":
    case "lua":
    case "md":
    case "m":
    case "pl":
    case "sb3":
    case "sln":
    case "swift":
    case "unity":
    case "vb":
    case "vcxproj":
    case "xcodeproj":
      return (
        <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg" className={classes}>
          <path d="M1596 380q28 28 48 76t20 88v1152q0 40-28 68t-68 28H224q-40 0-68-28t-28-68V96q0-40 28-68t68-28h896q40 0 88 20t76 
          48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528V640h-416q-40 0-68-28t-28-68V128H256v1536h1280zM608 768q8-11 
          21-12.5t24 6.5l51 38q11 8 12.5 21t-6.5 24l-182 243 182 243q8 11 6.5 24t-12.5 21l-51 38q-11 8-24 6.5t-21-12.5l-226-301q-14-19 
          0-38zm802 301q14 19 0 38l-226 301q-8 11-21 12.5t-24-6.5l-51-38q-11-8-12.5-21t6.5-24l182-243-182-243q-8-11-6.5-24t12.5-21l51-38q11-8 
          24-6.5t21 12.5zm-620 461q-13-2-20.5-13t-5.5-24l138-831q2-13 13-20.5t24-5.5l63 10q13 2 20.5 13t5.5 24l-138 831q-2 13-13 20.5t-24 5.5z"></path>
        </svg>
      )
    // Audio
    case "mp3": 
    case "aif":
    case "flac":
    case "m3u":
    case "m4a":
    case "ogg":
    case "wav":
    case "wave":
    case "wma":
    case "mid":
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={classes}>
          <path d="M14 3.815A10.022 10.022 0 0 0 21 7a1 1 0 0 0 0-2C16.641 5 13.884.529 13.857.485A1 1 0 0 0 12 
          1v12.54A5.992 5.992 0 1 0 14 18ZM8 22a4 4 0 1 1 4-4 4 4 0 0 1-4 4Z"></path>
        </svg>
      )
    // Video
    case "3gp": 
    case "asf":
    case "avi":
    case "flv":
    case "m4v":
    case "mov":
    case "mp4": 
    case "mpg":
    case "srt":
    case "vob":
    case "wmv":
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={classes}>
          <path d="m16 8.38 4.55-2.27A1 1 0 0 1 22 7v10a1 1 0 0 1-1.45.9L16 15.61V17a2 2 0 0 1-2 2H4a2 2 0 0 
          1-2-2V7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v1.38zm0 2.24v2.76l4 2V8.62l-4 2zM14 17V7H4v10h10z"></path>
        </svg>
      )
    // Database
    case "accdb":
    case "db":
    case "mdb":
    case "odb":
    case "pdb":
    case "sql":
    case "sqlite":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M3 15v3.4c-.004 0 0 0 0 .1 0 2.4 4.03 4.5 9 4.5 4.971 0 9-2.1 9-4.5V15H3z" fill="#8a9596"></path>
          <path d="M21 15a9 4 0 1 1-18 0 9 4 0 1 1 18 0z" fill="#bdc3c7"></path>
          <path d="M3.063 18.5c-.047.1-.063.3-.063.5 0 2.2 4.03 4 9 4 4.971 0 9-1.8 9-4 0-.2-.017-.4-.062-.5C20.384 
          20.4 16.589 22 12 22c-4.59 0-8.384-1.6-8.938-3.5z" fill="#7f8c8d"></path>
          <path d="M3 10v3.4c-.004 0 0 0 0 .1 0 2.4 4.03 4.5 9 4.5 4.971 0 9-2.1 9-4.5V10H3z" fill="#8a9596"></path>
          <path d="M21 10a9 4 0 1 1-18 0 9 4 0 1 1 18 0z" fill="#bdc3c7"></path>
          <path d="M3.063 13.5c-.047.1-.063.3-.063.5 0 2.2 4.03 4 9 4 4.971 0 9-1.8 9-4 0-.2-.017-.4-.062-.5C20.384 
          15.4 16.589 17 12 17c-4.59 0-8.384-1.6-8.938-3.5z" fill="#7f8c8d"></path>
          <path d="M3 5v3.4c-.004 0 0 0 0 .1 0 2.4 4.03 4.5 9 4.5 4.971 0 9-2.1 9-4.5V5H3z" fill="#8a9596"></path>
          <path d="M3.063 8.5C3.015 8.6 3 8.8 3 9c0 2.2 4.03 4 9 4 4.971 0 9-1.8 9-4 0-.2-.017-.4-.062-.5C20.384 10.4 
          16.589 12 12 12c-4.59 0-8.384-1.6-8.938-3.5z" fill="#7f8c8d"></path>
          <path d="M12 15v8c4.971 0 9-2.1 9-4.5V15h-9z" fill="#bdc3c7"></path>
          <path d="M12 11v8c4.971 0 9-1.791 9-4 0-2.21-4.029-4-9-4z" fill="#ecf0f1"></path>
          <path d="M12 10v8c4.971 0 9-2.015 9-4.5V10h-9z" fill="#bdc3c7"></path>
          <path d="M20.938 13.5C20.384 15.473 16.589 17 12 17v1c4.971 0 9-1.791 9-4 0-.17-.017-.336-.062-.5z" fill="#8a9596"></path>
          <path d="M12 6v8c4.971 0 9-1.791 9-4 0-2.21-4.029-4-9-4z" fill="#ecf0f1"></path>
          <path d="M12 5v8c4.971 0 9-2.015 9-4.5V5h-9z" fill="#bdc3c7"></path>
          <path d="M20.938 8.5C20.384 10.473 16.589 12 12 12v1c4.971 0 9-1.791 9-4 0-.17-.017-.336-.062-.5zM20.938 
          18.5C20.384 20.4 16.589 22 12 22v1c4.971 0 9-1.8 9-4 0-.2-.017-.4-.062-.5z" fill="#8a9596"></path>
          <path d="M21 5A9 4 0 1 1 3 5a9 4 0 1 1 18 0z" fill="#bdc3c7"></path>
        </svg>
      )
    // 3D
    case "blend":
    case "3dm":
    case "3ds":
    case "dae":
    case "fbx":
    case "max":
    case "obj":
      return (
        <svg width="512" height="512" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" 
        strokeWidth="3" stroke="#19f5f1" className={classes + " !fill-none"}>
          <path d="M2 14 L32 2,L62 14,L62 50,L32 62, L2 50,Z"></path>
          <path d="M2 14 L32 26 L62 14"></path>
          <path d="M32 26 L32 62"></path>
        </svg>
      )
    // Disk
    case "bin":
    case "dmg":
    case "img":
    case "iso":
    case "mdf":
    case "rom":
    case "vcd":
      return (
        <svg viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg" className={classes}>
          <path d="M17.5 16.7a2 2 0 1 1 2-2 2 2 0 0 1-2 2Zm0-2Z"></path>
          <path d="M28.559 34.75H6.441a4.2 4.2 0 0 1-4.191-4.191V4.442A4.2 4.2 0 0 1 6.441.25h22.118a4.2 4.2 0 0 1 
          4.191 4.192v26.117a4.2 4.2 0 0 1-4.191 4.191Zm-22.118-32A1.694 1.694 0 0 0 4.75 4.442v26.117a1.693 1.693 
          0 0 0 1.691 1.691h22.118a1.693 1.693 0 0 0 1.691-1.691V4.442a1.694 1.694 0 0 0-1.691-1.692Z"></path>
          <path d="M17.46 23.445a8.75 8.75 0 1 1 8.75-8.75 8.759 8.759 0 0 1-8.75 8.75Zm0-15a6.25 6.25 0 1 0 6.25 
          6.25 6.257 6.257 0 0 0-6.25-6.25ZM8.2 7.45a1.251 1.251 0 0 0 0-2.5 1.251 1.251 0 0 0 0 2.5ZM26.8 7.45a1.251 
          1.251 0 0 0 0-2.5 1.251 1.251 0 0 0 0 2.5ZM8.2 29.67a1.251 1.251 0 0 0 0-2.5 1.251 1.251 0 0 0 0 2.5ZM26.8 
          29.67a1.251 1.251 0 0 0 0-2.5 1.251 1.251 0 0 0 0 2.5Z"></path>
          <path d="M10.46 24.31a1.251 1.251 0 0 1-.89-2.128l4.5-4.56a1.25 1.25 0 0 1 1.78 1.756l-4.5 4.56a1.246 1.246 0 0 1-.89.372Z"></path>
        </svg>
      )
    // Archieves
    case "7z":
    case "cbr":
    case "deb":
    case "gz":
    case "pak":
    case "pkg":
    case "rar":
    case "rpm":
    case "xapk":
    case "zip":
    case "zipx":
      return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" className={classes + " !fill-none"}>
          <g transform="translate(0 -1028.4)"><g transform="translate(-72,66)">
            <path d="m76 965.36c-1.105 0-2 0.9-2 2v8 2 1 6c0 1.11 0.895 2 2 2h2 12 2c1.105 0 2-0.89 
            2-2v-6-1-2-4-4c0-1.1-0.895-2-2-2h-2-2-2-8-2z" fill="#e67e22"/>
            <path d="m76-64c-1.105 0-2 0.895-2 2v8 2 1 6c0 1.105 0.895 2 2 2h2 12 2c1.105 0 2-0.895 
            2-2v-6-1-2-4-4c0-1.105-0.895-2-2-2h-2-2-2-8-2z" fill="#f39c12" transform="translate(0 1028.4)"/>
            <path d="m76-65c-1.105 0-2 0.895-2 2v8 2 1 6c0 1.105 0.895 2 2 2h2 12 2c1.105 0 2-0.895 
            2-2v-6-1-2-4-4c0-1.105-0.895-2-2-2h-2-2-2-8-2z" fill="#e67e22" transform="translate(0 1028.4)"/>
            <path d="m76-66c-1.105 0-2 0.895-2 2v8 2 1 6c0 1.105 0.895 2 2 2h2 12 2c1.105 0 2-0.895 
            2-2v-6-1-2-4-4c0-1.105-0.895-2-2-2h-2-2-2-8-2z" fill="#f1c40f" transform="translate(0 1028.4)"/></g>
            <path d="m17 1040.4c-1.105 0-2 0.9-2 2v4c0 1.1 0.895 2 2 2s2-0.9 2-2v-4c0-1.1-0.895-2-2-2zm0 
            1c0.552 0 1 0.4 1 1 0 0.5-0.448 1-1 1s-1-0.5-1-1c0-0.6 0.448-1 1-1zm0 3c0.552 0 1 0.4 1 1v1c0 
            0.5-0.448 1-1 1s-1-0.5-1-1v-1c0-0.6 0.448-1 1-1z" fill="#f39c12"/><g transform="translate(5)">
            <path d="m10 1028.4v10c0 1.1 0.895 2 2 2s2-0.9 2-2v-10h-4z" fill="#34495e"/>
            <path d="m12 1028.4v1h1v-1h-1zm0 1h-1v1h1v-1zm0 1v1h1v-1h-1zm0 1h-1v1h1v-1zm0 1v1h1v-1h-1zm0 
            1h-1v1h1v-1zm0 1v1h1v-1h-1zm0 1h-1v1h1v-1zm0 1v1h1v-1h-1zm0 1h-1v1h1v-1zm0 1v1c0.552 0 1-0.5 1-1h-1z" fill="#95a5a6"/>
            <path d="m11 1028.4v1h1v-1h-1zm0 2v1h1v-1h-1zm0 2v1h1v-1h-1zm0 2v1h1v-1h-1zm0 2v1h1v-1h-1zm0 2c0 0.5 0.448 1 1 1v-1h-1z" fill="#ecf0f1"/>
            </g><path d="m17 1039.4c-1.105 0-2 0.9-2 2v4c0 1.1 0.895 2 2 2s2-0.9 2-2v-4c0-1.1-0.895-2-2-2zm0 
            1c0.552 0 1 0.4 1 1 0 0.5-0.448 1-1 1s-1-0.5-1-1c0-0.6 0.448-1 1-1zm0 3c0.552 0 1 0.4 1 1v1c0 0.5-0.448 
            1-1 1s-1-0.5-1-1v-1c0-0.6 0.448-1 1-1z" fill="#ecf0f1"/>
          </g>
        </svg>
      )
  }
  // Default file
  return (
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" 
    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={classes + " !fill-none"}>
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>
    </svg>
  )
}
 
export default FileIcon;