import { FunctionComponent } from "react";
import NavBar from "../../components/nav-bar";
import { apiDocs } from "../../data/data";

interface TechStackInfo {
  badgeUrl:string
  badgeAlt?:string
  srcUrl:string
  title:string
  text:string
}

const Docs: FunctionComponent = () => {
  const techStack:TechStackInfo[] = [
    {
      badgeUrl: "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB",
      srcUrl: "",
      title: "React",
      text: ""
    },
    {
      badgeUrl: "https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white",
      srcUrl: "",
      title: "TailwindCSS",
      text: ""
    },
    {
      badgeUrl: "https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white",
      badgeAlt: "Vercel",
      srcUrl: "",
      title: "Vercel deploy",
      text: ""
    },
    {
      badgeUrl: "https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white",
      badgeAlt: ".NET",
      srcUrl: "",
      title: "ASP .NET Core",
      text: ""
    },
    {
      badgeUrl: "https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink",
      badgeAlt: "JWT",
      srcUrl: "",
      title: "Json Web Tokens",
      text: ""
    },
    {
      badgeUrl: "https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white",
      srcUrl: "",
      title: "PostgreSQL",
      text: ""
    },
  ]
  return (
    <div className="min-h-fulldvh">
      <NavBar></NavBar>

      <div className="pt-14 transition-transform text-textLight dark:text-textDark text-lg">
        <div className="bg-backgroundSecondLight overflow-x-hidden dark:bg-backgroundSecondDark min-h-fullWithHeader">

          <section>
            <div className="container px-6 py-10 mx-auto">
              <h1 className="text-2xl font-semibold text-center capitalize lg:text-3xl">explore our
                <span className="text-iconLight dark:text-iconDark ml-2">Code</span>
              </h1>

              <div className="grid grid-cols-1 gap-4 mt-8 xl:mt-12 lg:gap-8 xl:gap-16 md:grid-cols-3">
                {/* Frontend */}
                <div className="flex flex-col items-center p-6 space-y-3 text-center rounded-xl bg-backgroundLight dark:bg-backgroundDark">
                  <span className="inline-block p-3 rounded-full bg-backgroundThirdLight dark:bg-backgroundThirdDark">
                    <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 fill-iconLight dark:fill-iconDark">
                      <path d="M416 31.94C416 21.75 408.1 0 384.1 0c-13.98 0-26.87 9.072-30.89 23.18l-128 448a31.933 31.933 
                      0 0 0-1.241 8.801C223.1 490.3 232 512 256 512c13.92 0 26.73-9.157 30.75-23.22l128-448c.85-2.97 1.25-5.93 
                      1.25-8.84zM176 143.1c0-18.28-14.95-32-32-32-8.188 0-16.38 3.125-22.62 9.376l-112 112C3.125 239.6 0 247.8 
                      0 255.1s3.125 17.3 9.375 23.5l112 112c6.225 6.3 14.425 8.5 22.625 8.5 17.05 0 32-13.73 32-32 
                      0-8.188-3.125-16.38-9.375-22.63L77.25 255.1l89.38-89.38c6.27-5.42 9.37-13.52 9.37-22.62zm464 
                      112c0-8.188-3.125-16.38-9.375-22.63l-112-112C512.4 115.1 504.2 111.1 496 111.1c-17.05 0-32 13.73-32 32 
                      0 8.188 3.125 16.38 9.375 22.63l89.38 89.38-89.38 89.38C467.1 351.6 464 359.8 464 367.1c0 18.28 14.95 
                      32 32 32 8.188 0 16.38-3.125 22.62-9.376l112-112C636.9 272.4 640 264.2 640 255.1z"></path>
                    </svg>
                  </span>

                  <h1 className="text-xl font-semibold capitalize">Frontend code</h1>

                  <p>
                    This product contains open source code, which eliminates spying on you, as you can personally verify.
                    As a developer, you can bring your own features to the interface
                  </p>

                  <a href="https://github.com/Calisthetic/file-storage-frontend" target="_blank" rel="noopener noreferrer" 
                  className="flex items-center -mx-1 text-sm capitalize transition-colors duration-300 transform hover:underline 
                  text-buttonLight dark:text-buttonDark hover:text-buttonHoverLight hover:dark:text-buttonHoverDark">
                    <span className="mx-1">read more</span>
                    <svg className="w-4 h-4 mx-1 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                </div>

                {/* API */}
                <div className="flex flex-col items-center p-6 space-y-3 text-center rounded-xl bg-backgroundLight dark:bg-backgroundDark">
                  <span className="inline-block p-3 rounded-full bg-backgroundThirdLight dark:bg-backgroundThirdDark">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 fill-iconLight dark:fill-iconDark">
                      <path d="M17 18.184v-4.368a3 3 0 1 0-2 0v4.369a3 3 0 1 0 2 0ZM16 10a1 1 0 1 1-1 1 1 1 0 0 1 1-1Zm0 
                      12a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z"></path>
                      <path d="M30.414 17.414a2 2 0 0 0 0-2.828l-5.787-5.787 2.9-2.862a2.002 2.002 0 1 0-1.44-1.388l-2.874 
                      2.836-5.799-5.8a2 2 0 0 0-2.828 0L8.799 7.374 5.937 4.472A2.002 2.002 0 1 0 4.55 5.914l2.835 2.873-5.8 
                      5.799a2 2 0 0 0 0 2.828l5.8 5.799-2.835 2.873a1.998 1.998 0 1 0 1.387 1.442l2.862-2.9 5.787 5.786a2 2 
                      0 0 0 2.828 0l5.8-5.799 2.872 2.836a1.998 1.998 0 1 0 1.442-1.387l-2.9-2.863ZM16 29 3 16 16 3l13 13Z"></path>
                      <path d="M0 0h32v32H0z" fill="none"></path>
                    </svg>
                  </span>

                  <h1 className="text-xl font-semibold capitalize">API</h1>

                  <p>
                    With the help of Swagger's detailed documentation you can see all endpoints used in web application. 
                    As a developer you can use it for your tasks and personal solutions
                  </p>

                  <a href={apiDocs} target="_blank" rel="noopener noreferrer" 
                  className="flex items-center -mx-1 text-sm capitalize transition-colors duration-300 transform hover:underline 
                  text-buttonLight dark:text-buttonDark hover:text-buttonHoverLight hover:dark:text-buttonHoverDark">
                    <span className="mx-1">read more</span>
                    <svg className="w-4 h-4 mx-1 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                </div>

                {/* Backend */}
                <div className="flex flex-col items-center p-6 space-y-3 text-center rounded-xl bg-backgroundLight dark:bg-backgroundDark">
                  <span className="inline-block p-3 rounded-full bg-backgroundThirdLight dark:bg-backgroundThirdDark">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 32 32"
                    className="h-6 w-6 fill-iconLight dark:fill-iconDark">
                      <path d="M1 10h30v18H1zM1 4h30v6H1z" fill="none" strokeWidth="2" 
                      className="stroke-iconLight dark:stroke-iconDark"
                      strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></path>
                      <circle cx="5" cy="7" r="1"></circle>
                      <circle cx="9" cy="7" r="1"></circle>
                      <circle cx="13" cy="7" r="1"></circle>
                      <path d="m11.5 14-5 5 5 5M20.5 14l5 5-5 5M14.5 25l3-12" fill="none" 
                      className="stroke-iconLight dark:stroke-iconDark" 
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></path>
                    </svg>
                  </span>

                  <h1 className="text-xl font-semibold capitalize">Backend code</h1>

                  <p>
                    Here you can see how we process requests and store your data. 
                    As a developer, you can add new functionality or optimize some parts of the application
                  </p>

                  <a href="https://github.com/Calisthetic/file-storage-backend" target="_blank" rel="noopener noreferrer" 
                  className="flex items-center -mx-1 text-sm capitalize transition-colors duration-300 transform hover:underline 
                  text-buttonLight dark:text-buttonDark hover:text-buttonHoverLight hover:dark:text-buttonHoverDark">
                    <span className="mx-1">read more</span>
                    <svg className="w-4 h-4 mx-1 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="container px-6 py-10 mx-auto">
              <h1 className="text-2xl font-semibold text-center capitalize lg:text-3xl">tech stack</h1>

              <div className="grid grid-cols-1 gap-4 mt-8 xl:mt-12 lg:gap-8 xl:gap-16 md:grid-cols-3">
                {techStack.map((item, index) => (
                  <TechStackBadge key={index} badgeUrl={item.badgeUrl} badgeAlt={item.badgeAlt} srcUrl={item.srcUrl} title={item.title} text={item.text}></TechStackBadge>
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

const TechStackBadge:FunctionComponent<TechStackInfo> = (props:TechStackInfo) => {
  return (
    <div className="flex flex-col items-center text-center p-6 space-y-3 rounded-xl bg-backgroundLight dark:bg-backgroundDark">
      <img className="h-8" src={props.badgeUrl} alt={props.badgeAlt ?? props.title}></img>
      <h1 className="text-xl font-semibold">{props.title}</h1>
      <p className="mt-2">{props.text}</p>
    </div>
  )
}
 
export default Docs;