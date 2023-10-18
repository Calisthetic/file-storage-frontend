import { FunctionComponent } from "react";
import { apiDocs } from "../../../data/data";
import { useNavigate } from "react-router-dom";
import ReadMore from "../../../components/read-more";

interface TechStackInfo {
  badge?:any
  badgeUrl?:string
  badgeAlt?:string
  srcUrl:string
  title?:string
  text:string
}

const DocsCode: FunctionComponent = () => {
  const navigate = useNavigate();

  const techStack:TechStackInfo[] = [
    {
      // badge: (<svg viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
      //   <circle cx="0" cy="0" r="2" fill="#149eca"></circle>
      //   <g stroke="#149eca" strokeWidth="1" fill="none">
      //     <ellipse rx="10" ry="4.5"></ellipse>
      //     <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
      //     <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
      //   </g>
      // </svg>),
      badgeUrl: "https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB",
      srcUrl: "https://react.dev/",
      text: "The library for web and native user interfaces"
    },
    {
      badge: (<svg viewBox="0 0 248 31" className="w-auto my-[6px] h-5">
        <path fillRule="evenodd" clipRule="evenodd" d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z" fill="#38bdf8"></path>
        <path fillRule="evenodd" clipRule="evenodd" d="M76.546 12.825h-4.453v8.567c0 2.285 1.508 2.249 4.453 2.106v3.463c-5.962.714-8.332-.928-8.332-5.569v-8.567H64.91V9.112h3.304V4.318l3.879-1.143v5.937h4.453v3.713zM93.52 9.112h3.878v17.849h-3.878v-2.57c-1.365 1.891-3.484 3.034-6.285 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.285 2.999V9.112zm-5.674 14.636c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm16.016-17.313c-1.364 0-2.477-1.142-2.477-2.463a2.475 2.475 0 012.477-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.879v17.849h-3.879zm8.368 0V.9h3.878v26.06h-3.878zm29.053-17.849h4.094l-5.638 17.849h-3.807l-3.735-12.03-3.771 12.03h-3.806l-5.639-17.849h4.094l3.484 12.315 3.771-12.315h3.699l3.734 12.315 3.52-12.315zm8.906-2.677c-1.365 0-2.478-1.142-2.478-2.463a2.475 2.475 0 012.478-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.878v17.849h-3.878zm17.812-18.313c4.022 0 6.895 2.713 6.895 7.354V26.96h-3.878V16.394c0-2.713-1.58-4.14-4.022-4.14-2.55 0-4.561 1.499-4.561 5.14v9.567h-3.879V9.112h3.879v2.285c1.185-1.856 3.124-2.749 5.566-2.749zm25.282-6.675h3.879V26.96h-3.879v-2.57c-1.364 1.892-3.483 3.034-6.284 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.284 2.999V1.973zm-5.674 21.775c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm22.553 3.677c-5.423 0-9.481-4.105-9.481-9.389 0-5.318 4.058-9.388 9.481-9.388 3.519 0 6.572 1.82 8.008 4.605l-3.34 1.928c-.79-1.678-2.549-2.749-4.704-2.749-3.16 0-5.566 2.392-5.566 5.604 0 3.213 2.406 5.605 5.566 5.605 2.155 0 3.914-1.107 4.776-2.749l3.34 1.892c-1.508 2.82-4.561 4.64-8.08 4.64zm14.472-13.387c0 3.249 9.661 1.285 9.661 7.89 0 3.57-3.125 5.497-7.003 5.497-3.591 0-6.177-1.607-7.326-4.177l3.34-1.927c.574 1.606 2.011 2.57 3.986 2.57 1.724 0 3.052-.571 3.052-2 0-3.176-9.66-1.391-9.66-7.781 0-3.356 2.909-5.462 6.572-5.462 2.945 0 5.387 1.357 6.644 3.713l-3.268 1.82c-.647-1.392-1.904-2.035-3.376-2.035-1.401 0-2.622.607-2.622 1.892zm16.556 0c0 3.249 9.66 1.285 9.66 7.89 0 3.57-3.124 5.497-7.003 5.497-3.591 0-6.176-1.607-7.326-4.177l3.34-1.927c.575 1.606 2.011 2.57 3.986 2.57 1.724 0 3.053-.571 3.053-2 0-3.176-9.66-1.391-9.66-7.781 0-3.356 2.908-5.462 6.572-5.462 2.944 0 5.386 1.357 6.643 3.713l-3.268 1.82c-.646-1.392-1.903-2.035-3.375-2.035-1.401 0-2.622.607-2.622 1.892z" fill="currentColor"></path>
      </svg>),
      srcUrl: "https://tailwindcss.com/",
      text: "Utility-first CSS framework for rapidly building modern websites without ever leaving your HTML"
    },
    {
      badgeUrl: "https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white",
      badgeAlt: "PostgreSQL",
      srcUrl: "https://www.postgresql.org/",
      text: "The World's most advanced open source relational database"
    },
    {
      badgeUrl: "https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white",
      badgeAlt: ".NET",
      srcUrl: "https://learn.microsoft.com/en-us/aspnet/core/mvc/overview?view=aspnetcore-7.0&source=recommendations",
      text: "ASP.NET Core MVC is a rich framework for building web apps and APIs using C# and the Model-View-Controller design pattern"
    },
    {
      badge: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 201" version="1.1" className="h-8 w-auto">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g>
            <rect fill="#000000" x="0" y="0.5" width="400" height="200"/>
            <g transform="translate(50.000000, 50.000000)">
                <g>
                    <path d="M57.8,27.2 L57.7,0.3 L42.7,0.3 L42.8,27.2 L50.3,37.5 L57.8,27.2 Z" fill="#FFFFFF"/>
                    <path d="M42.8,73.3 L42.8,100.3 L57.8,100.3 L57.8,73.3 L50.3,63 L42.8,73.3 Z" fill="#FFFFFF"/>
                    <path d="M57.8,73.3 L73.6,95.1 L85.7,86.3 L69.9,64.5 L57.8,60.6 L57.8,73.3 Z" fill="#00F2E6"/>
                    <path d="M42.8,27.2 L26.9,5.4 L14.8,14.2 L30.6,36 L42.8,39.9 L42.8,27.2 Z" fill="#00F2E6"/>
                    <path d="M30.6,36 L5,27.7 L0.4,41.9 L26,50.3 L38.1,46.3 L30.6,36 Z" fill="#00B9F1"/>
                    <path d="M62.4,54.2 L69.9,64.5 L95.5,72.8 L100.1,58.6 L74.5,50.3 L62.4,54.2 Z" fill="#00B9F1"/>
                    <path d="M74.5,50.3 L100.1,41.9 L95.5,27.7 L69.9,36 L62.4,46.3 L74.5,50.3 Z" fill="#D63AFF"/>
                    <path d="M26,50.3 L0.4,58.6 L5,72.8 L30.6,64.5 L38.1,54.2 L26,50.3 Z" fill="#D63AFF"/>
                    <path d="M30.6,64.5 L14.8,86.3 L26.9,95.1 L42.8,73.3 L42.8,60.6 L30.6,64.5 Z" fill="#FB015B"/>
                    <path d="M69.9,36 L85.7,14.2 L73.6,5.4 L57.8,27.2 L57.8,39.9 L69.9,36 Z" fill="#FB015B"/>
                </g>
                <path d="M156.1,25.8 L156.1,60.8 C156.1,68.5 149.8,74.8 142.1,74.8 L142.1,67.8 C146,67.8 149.1,64.7 149.1,60.8 L149.1,25.8 L156.1,25.8 L156.1,25.8 Z M283.9,32.8 L299.7,32.8 L299.7,25.8 L261.2,25.8 L261.2,32.8 L276.9,32.8 L276.9,74.8 L283.9,74.8 L283.9,32.8 L283.9,32.8 Z M240.1,25.8 L240.1,60.8 C240.1,64.7 237,67.8 233.1,67.8 C229.2,67.8 226.1,64.7 226.1,60.8 L226.1,39.8 C226.1,32.1 219.8,25.8 212.1,25.8 C204.4,25.8 198.1,32.1 198.1,39.8 L198.1,60.8 C198.1,64.7 195,67.8 191.1,67.8 C187.2,67.8 184.1,64.7 184.1,60.8 L184.1,25.8 L177.1,25.8 L177.1,60.8 C177.1,68.5 183.4,74.8 191.1,74.8 C198.8,74.8 205.1,68.5 205.1,60.8 L205.1,39.8 C205.1,35.9 208.2,32.8 212.1,32.8 C216,32.8 219.1,35.9 219.1,39.8 L219.1,39.8 L219.1,60.8 C219.1,68.5 225.4,74.8 233.1,74.8 C240.8,74.8 247.1,68.5 247.1,60.8 L247.1,25.8 L240.1,25.8 L240.1,25.8 Z" fill="#FFFFFF"/>
            </g>
          </g>
        </g>
      </svg>),
      badgeUrl: "https://jwt.io/img/logo-asset.svg",
      badgeAlt: "JWT",
      srcUrl: "https://jwt.io/",
      text: "JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties"
    },
    {
      badgeUrl: "https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white",
      badgeAlt: "Vercel",
      srcUrl: "https://vercel.com/",
      text: "Vercel's frontend cloud gives developers frameworks, workflows, and infrastructure to build a faster, more personalized web"
    },
  ]

  return (
    <>
      <section>
        <div className="container px-2 sm:px-6 py-10 mx-auto">
          <h1 className="text-2xl font-semibold text-center capitalize lg:text-3xl">explore our
            <span className="text-iconLight dark:text-iconDark ml-2">Code</span>
          </h1>

          <div className="grid grid-cols-1 gap-4 mt-8 xl:mt-12 lg:gap-8 md:grid-cols-3">
            {/* Frontend */}
            <div className="flex flex-col items-center p-6 space-y-3 text-center rounded-xl bg-backgroundLight dark:bg-backgroundDark">
              <div className="flex flex-row sm:flex-col items-center">
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

                <h1 className="text-xl ml-2 sm:ml-0 font-semibold capitalize">Frontend code</h1>
              </div>

              <p>
                This product contains open source code, which eliminates spying on you, as you can personally verify.
                As a developer, you can bring your own features to the interface
              </p>

              <ReadMore href="https://github.com/Calisthetic/file-storage-frontend"></ReadMore>
            </div>

            {/* API */}
            <div className="flex flex-col items-center p-6 space-y-3 text-center rounded-xl bg-backgroundLight dark:bg-backgroundDark">
              <div className="flex flex-row sm:flex-col items-center">
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

                <h1 className="text-xl ml-2 sm:ml-0 font-semibold capitalize">API</h1>
              </div>

              <p>
                With the help of Swagger's detailed documentation you can see all endpoints used in web application. 
                As a developer you can use it for your tasks and personal solutions
              </p>

              <ReadMore href={apiDocs}></ReadMore>
            </div>

            {/* Backend */}
            <div className="flex flex-col items-center p-6 space-y-3 text-center rounded-xl bg-backgroundLight dark:bg-backgroundDark">
              <div className="flex flex-row sm:flex-col items-center">
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

                <h1 className="text-xl ml-2 sm:ml-0 font-semibold capitalize">Backend code</h1>
              </div>

              <p>
                Here you can see how we process requests and store your data. 
                As a developer, you can add new functionality or optimize some parts of the application
              </p>

              <ReadMore href="https://github.com/Calisthetic/file-storage-backend"></ReadMore>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container px-2 sm:px-6 py-10 mx-auto">
          <h1 className="text-2xl font-semibold text-center capitalize lg:text-3xl">tech stack</h1>

          <div className="grid grid-cols-1 gap-4 mt-8 xl:mt-12 lg:gap-8 md:grid-cols-3">
            {techStack.map((item, index) => (
              <TechStackBadge key={index} badge={item.badge} badgeUrl={item.badgeUrl} badgeAlt={item.badgeAlt} srcUrl={item.srcUrl} title={item.title} text={item.text}></TechStackBadge>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container px-2 sm:px-6 pt-4 pb-10 mx-auto">
          <h1 className="text-2xl font-semibold text-center capitalize lg:text-3xl">developers</h1>

          <div className="mt-4 gap-4 flex justify-center">
            <a href="https://github.com/Calisthetic" target="_blank" rel="noopener noreferrer"
            className="text-center hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark px-4 py-4 pb-2 rounded-xl transition-colors">
              <img className="h-28 w-28 rounded-full" src="https://avatars.githubusercontent.com/u/72902666?v=4" alt="Calisthetic"></img>
              <h3 className="mt-2 font-semibold text-lg">Vladimir</h3>
              <p className="opacity-80 text-base">Full stack dev</p>
            </a>
          </div>
        </div>
      </section>

      <div className="flex justify-center pb-10">
        <button className=" bg-buttonLight dark:bg-buttonDark rounded-xl text-lg font-semibold px-4 py-2
        hover:bg-buttonHoverLight hover:dark:bg-buttonHoverDark transition-colors"
        onClick={() => navigate("/docs")}>Back to Documentation</button>
      </div>
    </>
  );
}

const TechStackBadge:FunctionComponent<TechStackInfo> = (props:TechStackInfo) => {
  return (
    <div className="flex flex-col items-center text-center p-6 space-y-3 rounded-xl bg-backgroundLight dark:bg-backgroundDark">
      <a href={props.srcUrl} target="_blank" rel="noopener noreferrer">
        {props.badge ?? (<img className="h-8" src={props.badgeUrl} alt={props.badgeAlt ?? props.title}></img>)}
      </a>
      <p className="mt-2">{props.text}</p>
    </div>
  )
}
 
export default DocsCode;