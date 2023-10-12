import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
 
const UserProfileDropdown: FunctionComponent = () => {
  // User image url
  let temp:string | null = localStorage.getItem("userImage")
  const userImage:string | undefined = temp === null ? undefined : temp


  let token = localStorage.getItem("token")
  return token ? (
    <div className="flex items-center">
      <div className="flex ml-3">
        <button className="flex text-sm bg-backgroundThirdLight dark:bg-backgroundThirdDark 
        rounded-full peer focus:pointer-events-none">
          <img className="w-8 h-8 rounded-full pointer-events-none" alt="user" draggable="false"
          src={userImage} />
        </button>
        <div className="grid absolute grid-rows-[0fr] peer-focus:grid-rows-[1fr] focus-within:grid-rows-[1fr]
        -translate-x-[calc(100%-32px)] duration-300 w-max mt-10 transition-[grid-template-rows,margin]">
          <div className="z-50 text-base list-none bg-backgroundThirdLight 
          dark:bg-backgroundThirdDark dark:divide-borderDark text-textLight dark:text-textDark
          shadow-lightLight dark:shadow-lightDark rounded overflow-hidden">
            <div className="px-4 py-3">
              <p className="">
                Neil Sims
              </p>
              <p className="font-medium">
                neil.sims@flowbite.com
              </p>
            </div>
            <div className="py-1">
              <Link to="/welcome" className="block px-4 py-2 hover:bg-backgroundHoverLight w-full text-left
                dark:hover:bg-backgroundHoverDark" role="menuitem">Home
              </Link>
              <Link to="/disk/folder/main" className="block px-4 py-2 hover:bg-backgroundHoverLight w-full text-left
                dark:hover:bg-backgroundHoverDark" role="menuitem">Disk
              </Link>
              <Link to="/user/profile" className="block px-4 py-2 hover:bg-backgroundHoverLight w-full text-left
                dark:hover:bg-backgroundHoverDark" role="menuitem">Profile
              </Link>
              <Link to="/user/statistic" className="block px-4 py-2 hover:bg-backgroundHoverLight w-full text-left
                dark:hover:bg-backgroundHoverDark" role="menuitem">Statistic
              </Link>
              <Link to="/docs" className="block px-4 py-2 hover:bg-backgroundHoverLight w-full text-left
                dark:hover:bg-backgroundHoverDark" role="menuitem">Documentation
              </Link>
              <Link to="/auth/signin" className="block px-4 py-2 hover:bg-backgroundHoverLight w-full text-left
                dark:hover:bg-backgroundHoverDark" role="menuitem">Sign out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
   ) : (
    <div className="flex items-center gap-x-4 text-textLight dark:text-textDark">
      <Link to="/auth/signin" className="py-1 px-2 rounded-lg capitalize bg-backgroundThirdLight dark:bg-backgroundThirdDark
      border border-borderLight dark:border-borderDark
      hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark transition-colors">sign in</Link>
      <Link to="/auth/signup" className="py-1 px-2 rounded-lg capitalize bg-buttonLight dark:bg-buttonDark
      hover:bg-buttonHoverLight hover:dark:bg-buttonHoverDark transition-colors">sign up</Link>
    </div>
   );
}
 
export default UserProfileDropdown;