import { FunctionComponent } from "react";

interface UserProfileProps {
  
}
 
const UserProfile: FunctionComponent<UserProfileProps> = () => {
  return ( 
    <div className="min-h-fullWithHeader flex flex-col items-center">
      <div className="text-textLight dark:text-textDark 
      w-[calc(100dvw-24px)] sm:w-[calc(100dvw-256px-24px)] xl:w-[800px]">
        <div className="border-b border-borderLight dark:border-borderDark py-4">
          <p className="text-xl font-semibold">Profile</p>
          <p>This is how others will see you on the site</p>
        </div>
        <div className="mt-4">
          <label>Username</label>
          <input type="text"></input>
          <p>This is your public display name. It can be your real name or a pseudonym.</p>
        </div>
        <div>
          <label>Email</label>
          <select></select>
          <p>You can manage verified email addresses in your account settings.</p>
        </div>
        <div>
          <label>About</label>
          <textarea id="about" name="about" rows={3} aria-label="about"
          className="block w-full pl-2 py-1.5 border-1 border-borderLight dark:border-borderDark
          ring-1 ring-inset ring-borderLight dark:ring-borderDark placeholder:text-gray-400 
          focus:outline-offset-1 focus:ring-2 text-sm sm:text-base sm:leading-6 bg-white
          focus:ring-black focus:dark:ring-backgroundDark text-gray-900 shadow-sm
          focus:dark:outline-white focus:outline-0 focus:dark:outline-1 rounded-md transition-inputs
          bg-backgroundSecondLight dark:bg-backgroundSecondDark"></textarea>
          <p>Write a few sentences about yourself.</p>
        </div>
      </div>
    </div>
   );
}
 
export default UserProfile;