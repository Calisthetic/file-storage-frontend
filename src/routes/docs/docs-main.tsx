import { FunctionComponent } from "react";
import ReadMore from "../../components/read-more";
 
const DocsMain: FunctionComponent = () => {
  return (
    <>
      <section>
        <div className="container px-2 sm:px-6 py-10 mx-auto items-center flex flex-col">
          <h1 className="text-2xl font-semibold text-center capitalize lg:text-3xl">explore our
            <span className="text-iconLight dark:text-iconDark ml-2">Documentation</span>
          </h1>

          <div className="grid grid-cols-1 gap-y-4 gap-x-4 mt-8 xl:mt-12 lg:gap-x-8 xl:gap-x-16 md:grid-cols-2 max-w-7xl">

            {/* User account */}
            <div className="flex flex-col items-center px-2 py-4 sm:p-6 space-y-3 text-center rounded-xl 
            bg-backgroundSecondLight dark:bg-backgroundDark shadow-tileLight dark:shadow-none">
              <div className="flex gap-2">
                <div className="w-8 h-8">
                  <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 48 48"
                  className="h-8 w-8 fill-iconLight dark:fill-iconDark stroke-iconLight dark:stroke-iconDark">
                    <path d="M24 26c6.6 0 12-5.4 12-12S30.6 2 24 2 12 7.4 12 14s5.4 12 12 12zm0-22c5.5 0 10 4.5 10 10s-4.5 10-10 10-10-4.5-10-10S18.5 
                    4 24 4zM33 28H15C7.8 28 2 33.8 2 41v5h2v-5c0-6.1 4.9-11 11-11h18c6.1 0 11 4.9 11 11v5h2v-5c0-7.2-5.8-13-13-13z"></path>
                  </svg>
                </div>
                <h1 className="text-xl font-semibold">User account</h1>
              </div>
              <p className="mt-2 opacity-80">
                Each user has a limit of 10GB of free space. 
                In the near future the possibility of increasing the volume will be added
              </p>
            </div>

            {/* Statistic */}
            <div className="flex flex-col items-center px-2 py-4 sm:p-6 space-y-3 text-center rounded-xl 
            bg-backgroundSecondLight dark:bg-backgroundDark shadow-tileLight dark:shadow-none">
              <div className="flex gap-2">
                <div className="w-8 h-8">
                  <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 fill-iconLight dark:fill-iconDark">
                    <g fill="none" fillRule="evenodd">
                      <path d="M8.999 38H39v-2.001H8.999V38ZM15 19.999A2.001 2.001 0 0 0 12.999 
                      22v12H19V22a2.001 2.001 0 0 0-2.001-2.001H15ZM31 14a2 2 0 0 0-2.001 
                      1.999V34H35V15.999A2 2 0 0 0 32.999 14H31Zm-8-6.001A2.001 2.001 0 0 0 
                      20.999 10v24H27V10a2.001 2.001 0 0 0-2.001-2.001H23Z" 
                      className="fill-iconLight dark:fill-iconDark"></path>
                    </g>
                  </svg>
                </div>
                <h1 className="text-xl font-semibold">Statistic</h1>
              </div>
              <p className="mt-2 opacity-80">
                We provide statistics on activity, use of free disk space, and a pie of all types of files that are stored in the cloud
              </p>
            </div>

            {/* Security */}
            <div className="flex flex-col items-center px-2 py-4 sm:p-6 space-y-3 text-center rounded-xl 
            bg-backgroundSecondLight dark:bg-backgroundDark shadow-tileLight dark:shadow-none">
              <div className="flex gap-2">
                <div className="w-8 h-8">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 fill-iconLight dark:fill-iconDark">
                    <path clipRule="evenodd" d="m18 5.415-6.5-2.294L5 5.415v5.403a8 8 0 0 0 3.387 6.536l3.113 2.198 3.114-2.198A8 8 0 0 0 18 
                    10.818V5.415ZM11.5 22l4.267-3.012A10 10 0 0 0 20 10.818V4l-8.5-3L3 4v6.818a10 10 0 0 0 4.233 8.17L11.5 22Z" fillRule="evenodd"></path>
                  </svg>
                </div>
                <h1 className="text-xl font-semibold">Security</h1>
              </div>
              <p className="mt-2 opacity-80">
                The use of advanced technologies in the field of web application security, such as password hashing, 
                json web tokens, and so on, significantly reduces the risk of hacking and malicious attacks
              </p>
            </div>

            {/* Customize */}
            <div className="flex flex-col items-center px-2 py-4 sm:p-6 space-y-3 text-center rounded-xl 
            bg-backgroundSecondLight dark:bg-backgroundDark shadow-tileLight dark:shadow-none">
              <div className="flex gap-2">
                <div className="w-8 h-8">
                  <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 fill-iconLight dark:fill-iconDark"><g>
                    <path d="M1.75 7.75h6.68c.336 1.295 1.504 2.259 2.903 2.259s2.567-.964 2.903-2.259H24.25a.75.75 0 0 0 
                    0-1.5H14.236c-.336-1.295-1.504-2.259-2.903-2.259S8.766 4.955 8.43 6.25H1.75a.75.75 0 0 0 0 1.5zm9.583-2.259c.832 
                    0 1.509.677 1.509 1.509s-.677 1.509-1.509 1.509S9.824 7.832 9.824 7s.677-1.509 1.509-1.509zM24.25 
                    12.25h-1.606c-.336-1.295-1.504-2.259-2.903-2.259s-2.567.964-2.902 2.259H1.75a.75.75 0 0 0 0 1.5h15.089c.335 
                    1.295 1.503 2.259 2.902 2.259s2.567-.964 2.903-2.259h1.606a.75.75 0 0 0 0-1.5zm-4.509 2.259c-.832 
                    0-1.509-.677-1.509-1.509s.677-1.509 1.51-1.509a1.51 1.51 0 0 1 0 3.018zM24.25 18.25H9.718a3.005 3.005 0 0 
                    0-2.902-2.259 3.006 3.006 0 0 0-2.902 2.259H1.75a.75.75 0 0 0 0 1.5h2.164a3.006 3.006 0 0 0 2.902 2.259 
                    3.005 3.005 0 0 0 2.902-2.259H24.25a.75.75 0 0 0 0-1.5zM6.816 20.509c-.832 0-1.508-.677-1.508-1.509s.676-1.509 
                    1.508-1.509c.831 0 1.508.677 1.508 1.509s-.677 1.509-1.508 1.509z"></path></g>
                  </svg>
                </div>
                <h1 className="text-xl font-semibold">Customize</h1>
              </div>
              <p className="mt-2 opacity-80">
                The user interface has great possibilities for personalization. 
                There are fonts for any choice, light and dark themes, as well as editing each color with subsequent use every time
              </p>
            </div>

            {/* Downloads */}
            <div className="flex flex-col items-center px-2 py-4 sm:p-6 space-y-3 text-center rounded-xl 
            bg-backgroundSecondLight dark:bg-backgroundDark shadow-tileLight dark:shadow-none">
              <div className="flex gap-2">
                <div className="w-8 h-8">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 fill-iconLight dark:fill-iconDark">
                    <path d="M11 14.59V3a1 1 0 0 1 2 0v11.59l3.3-3.3a1 1 0 0 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 0 1 
                    1.4-1.42l3.3 3.3zM3 17a1 1 0 0 1 2 0v3h14v-3a1 1 0 0 1 2 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3z"></path>
                  </svg>
                </div>
                <h1 className="text-xl font-semibold">Downloads</h1>
              </div>
              <p className="mt-2 opacity-80">
                Using a script for dynamically creating archives, you can download any files, folders, and even your entire disk with one click
              </p>
            </div>

            {/* Privacy */}
            <div className="flex flex-col items-center px-2 py-4 sm:p-6 space-y-3 text-center rounded-xl 
            bg-backgroundSecondLight dark:bg-backgroundDark shadow-tileLight dark:shadow-none">
              <div className="flex gap-2">
                <div className="w-8 h-8">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 fill-iconLight dark:fill-iconDark">
                    <path d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 
                    2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm6 10 .002 8H6v-8h12zm-9-2V7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9z"></path>
                  </svg>
                </div>
                <h1 className="text-xl font-semibold">Privacy</h1>
              </div>
              <p className="mt-2 opacity-80">
                Any added file will be available only to you. If desired, you can create various links and share files
              </p>
            </div>

            {/* Code */}
            <div className="flex flex-col items-center px-2 py-4 sm:p-6 space-y-3 text-center rounded-xl 
            bg-backgroundSecondLight dark:bg-backgroundDark shadow-tileLight dark:shadow-none">
              <div className="flex gap-2">
                <div className="w-8 h-8">
                  <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 fill-iconLight dark:fill-iconDark">
                    <path d="M416 31.94C416 21.75 408.1 0 384.1 0c-13.98 0-26.87 9.072-30.89 23.18l-128 448a31.933 31.933 
                    0 0 0-1.241 8.801C223.1 490.3 232 512 256 512c13.92 0 26.73-9.157 30.75-23.22l128-448c.85-2.97 1.25-5.93 
                    1.25-8.84zM176 143.1c0-18.28-14.95-32-32-32-8.188 0-16.38 3.125-22.62 9.376l-112 112C3.125 239.6 0 247.8 
                    0 255.1s3.125 17.3 9.375 23.5l112 112c6.225 6.3 14.425 8.5 22.625 8.5 17.05 0 32-13.73 32-32 
                    0-8.188-3.125-16.38-9.375-22.63L77.25 255.1l89.38-89.38c6.27-5.42 9.37-13.52 9.37-22.62zm464 
                    112c0-8.188-3.125-16.38-9.375-22.63l-112-112C512.4 115.1 504.2 111.1 496 111.1c-17.05 0-32 13.73-32 32 
                    0 8.188 3.125 16.38 9.375 22.63l89.38 89.38-89.38 89.38C467.1 351.6 464 359.8 464 367.1c0 18.28 14.95 
                    32 32 32 8.188 0 16.38-3.125 22.62-9.376l112-112C636.9 272.4 640 264.2 640 255.1z"></path>
                  </svg>
                </div>
                <h1 className="text-xl font-semibold">Learn more about our code</h1>
              </div>
              <p className="mt-2 opacity-80">
                The technologies are described here, API documentation and links to source code are provided
              </p>
              <ReadMore to="/docs/code"></ReadMore>
            </div>

            {/* Didn't find the answer? */}
            <div className="flex flex-col items-center px-2 py-4 sm:p-6 space-y-3 text-center rounded-xl 
            bg-backgroundSecondLight dark:bg-backgroundDark shadow-tileLight dark:shadow-none">
              <div className="flex gap-2">
                <div className="w-8 h-8">
                  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 fill-iconLight dark:fill-iconDark">
                    <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 464c-114.7 
                    0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208-93.3 208-208 208zm0-128c-18 0-32 14-32 32s13.1 
                    32 32 32c17.1 0 32-14 32-32s-14.9-32-32-32zm33.1-208H238c-39 0-70 31-70 70 0 13 11 24 24 24s24-11 24-24c0-12 
                    9.1-22 21.1-22h51.1c12.9 0 23.8 10 23.8 22 0 8-4 14.1-11 18.1L244 251c-8 5-12 13-12 21v16c0 13 11 24 24 
                    24s24-11 24-24v-2l45.1-28c21-13 34-36 34-60 .9-39-30.1-70-70-70z"></path>
                  </svg>
                </div>
                <h1 className="text-xl font-semibold">Didn't find the answer?</h1>
              </div>
              <p className="mt-2 opacity-80">
                Using a script for dynamically creating archives, you can download any files, folders, and even your entire disk with one click
              </p>
              <ReadMore to="/docs/help"></ReadMore>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
 
export default DocsMain;