import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import IconSuccessFactors from "../../components/icons/IconSuccessFactors";
import IconSecure from "../../components/icons/IconSecure";
import IconOpenSource from "../../components/icons/IconOpenSource";
import IconDevices from "../../components/icons/IconDevices";
import NavBar from "../../components/nav-bar";

interface WelcomeProps {
  
}
 
const Welcome: FunctionComponent<WelcomeProps> = () => {
  const navigate = useNavigate()
  let token = localStorage.getItem("token")
  console.log(token)
  
  return (
    <div className="!min-h-[100vh]">
      <NavBar></NavBar>

      <div className="pt-14 transition-transform text-textLight dark:text-textDark text-lg">
        <div className="bg-backgroundSecondLight overflow-x-hidden dark:bg-backgroundSecondDark min-h-fullWithHeader">

          <div className="max-w-lg mx-auto px-6 pb-16 pt-10 flex flex-col items-center text-center">
            <h2 className="text-lg font-semibold text-buttonLight dark:text-buttonDark opacity-80 uppercase lg:text-3xl">File storage</h2>
            <h1 className="text-5xl font-semibold mb-4 mt-2">Securely store, manage and share your data online</h1>
            <p>We use the latest technologies, constantly improving user experience and services security</p>
            <button className="px-5 py-2 mt-4 text-sm tracking-wider uppercase transition-colors 
            transform rounded-lg lg:w-auto focus:outline-none font-semibold text-textDark
            bg-buttonLight dark:bg-buttonDark hover:bg-buttonHoverLight hover:dark:bg-buttonHoverDark"
            onClick={() => navigate(token === null ? "/auth/signup" : "/disk/folder/main")}>Sign up for 10GB free storage</button>
          </div>

          <div className="container px-6 py-16 mx-auto">
            <div className="items-center flex lg:flex-row flex-col-reverse">
              <div className="w-full lg:w-1/2">
                <div className="lg:max-w-lg">
                  <h1 className="text-3xl font-semibold lg:text-4xl">Best place to store your 
                    <span className="ml-2 text-buttonLight dark:text-buttonDark">data</span>
                  </h1>
                    
                  <p className="mt-3 mr-1">Disk usage statistics, file analysis and folder trees will help you visualize and conveniently interact with your data</p>
                    
                  <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider uppercase transition-colors 
                  transform rounded-lg lg:w-auto focus:outline-none font-semibold text-textDark
                  bg-buttonLight dark:bg-buttonDark hover:bg-buttonHoverLight hover:dark:bg-buttonHoverDark"
                  onClick={() => navigate(token === null ? "/auth/signin" : "/disk/folder/main")}>Start Now</button>
                </div>
              </div>

              <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                <IconSuccessFactors classes="w-full h-full lg:max-w-3xl"></IconSuccessFactors>
              </div>
            </div>
          </div>
          
          <div className="container px-6 py-16 mx-auto">
            <div className="items-center flex lg:flex-row flex-col">
              <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                <IconSecure classes="w-full h-full lg:max-w-3xl"></IconSecure>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="lg:max-w-lg">
                  <h1 className="text-3xl font-semibold lg:text-4xl">Safety and secure</h1>
                    
                  <p className="mt-3 mr-1 mb-6">
                    No one will be able to view your data without your consent.
                    Using the latest authentication technologies allows us to keep your files secure from outside interference.
                    If you lose one of your devices, use the quick space cleaning function or track your file browsing history
                  </p>
                    
                  <Link className="w-full px-5 py-2 text-sm tracking-wider uppercase transition-colors 
                  transform rounded-lg lg:w-auto focus:outline-none font-semibold text-textDark
                  bg-buttonLight dark:bg-buttonDark hover:bg-buttonHoverLight hover:dark:bg-buttonHoverDark"
                  to={"/docs"}>Read docs</Link>
                </div>
              </div>

            </div>
          </div>

          <div className="container px-6 py-16 mx-auto">
            <div className="items-center flex lg:flex-row flex-col-reverse">
              <div className="w-full lg:w-1/2">
                <div className="lg:max-w-lg">
                  <h1 className="text-3xl font-semibold lg:text-4xl">Open source</h1>
                    
                  <div className="mt-5 mr-1 space-y-4 mb-5">
                    <p className="flex items-center -mx-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 stroke-iconLight dark:stroke-iconDark" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="mx-2">Available API</span>
                    </p>

                    <p className="flex items-center -mx-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 stroke-iconLight dark:stroke-iconDark" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="mx-2">Сommunity support</span>
                    </p>

                    <p className="flex items-center -mx-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 stroke-iconLight dark:stroke-iconDark" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="mx-2">Fork us on 
                        <a className="ml-1 underline" target="_blank" rel="noopener noreferrer" href="https://github.com/Calisthetic/file-storage-frontend">GitHub</a>
                      </span>
                    </p>
                  </div>
                    
                  <Link className="w-full px-5 py-2 text-sm tracking-wider uppercase transition-colors 
                  transform rounded-lg lg:w-auto focus:outline-none font-semibold text-textDark
                  bg-buttonLight dark:bg-buttonDark hover:bg-buttonHoverLight hover:dark:bg-buttonHoverDark"
                  to={"/docs/code"}>See code</Link>
                </div>
              </div>

              <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                <IconOpenSource classes="w-full h-full lg:max-w-3xl"></IconOpenSource>
              </div>
            </div>
          </div>
          
          <div className="container px-6 py-16 mx-auto">
            <div className="items-center flex lg:flex-row flex-col">
              <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                <IconDevices classes="w-full h-full lg:max-w-3xl"></IconDevices>
              </div>

              <div className="w-full lg:w-1/2 lg:ml-2">
                <div className="lg:max-w-lg">
                  <h1 className="text-3xl font-semibold lg:text-4xl">Access from multiple devices</h1>
                    
                  <p className="mt-3 mr-1">
                    The storage provides the ability to centrally store files online for file sharing and data synchronization. 
                    Log into your account through any browser and get access to your files wherever you are currently located
                  </p>
                    
                  <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider uppercase transition-colors 
                  transform rounded-lg lg:w-auto focus:outline-none font-semibold text-textDark
                  bg-buttonLight dark:bg-buttonDark hover:bg-buttonHoverLight hover:dark:bg-buttonHoverDark"
                  onClick={() => navigate(token === null ? "/auth/signin" : "/disk/folder/main")}>Log in</button>
                </div>
              </div>

            </div>
          </div>

          <div className=" border-b bg-borderLight dark:border-borderDark mt-20"></div>
          
          <footer className="max-w-lg mx-auto px-6 py-16 flex flex-col items-center">
            <h1 className="text-2xl font-semibold lg:text-3xl">Ready to start?</h1>
            <button className="px-5 py-2 mt-4 text-sm tracking-wider uppercase transition-colors 
            transform rounded-lg lg:w-auto focus:outline-none font-semibold text-textDark
            bg-buttonLight dark:bg-buttonDark hover:bg-buttonHoverLight hover:dark:bg-buttonHoverDark"
            onClick={() => navigate(token === null ? "/auth/signin" : "/disk/folder/main")}>Open disk</button>
          </footer>
        </div>
      </div>
    </div>
  );
}
 
export default Welcome;