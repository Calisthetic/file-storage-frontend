import { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import Redirect from "../../../components/redirect";

interface UserProfileProps {
  
}
 
const UserProfile: FunctionComponent<UserProfileProps> = () => {
  return ( 
    <div className="min-h-fullWithHeader flex flex-row md:flex-col items-center">
      <div>
        <button>Account</button>
      </div>
      <Routes>
        <Route path="*" element={<Redirect location="/user/profile"></Redirect>}></Route>
        <Route path="profile" element={<div></div>}></Route>
        <Route path="account" element={<div></div>}></Route>
        <Route path="tariff" element={<div></div>}></Route>
        <Route path="statistic" element={<div></div>}></Route>
        <Route path="appearance" element={<div></div>}></Route>
      </Routes>
      <div className="text-textLight dark:text-textDark">
        <div className="border-b border-borderLight dark:border-borderDark">
          <h3>Profile</h3>
          <p>This is how others will see you on the site</p>
        </div>
        <div>
          <label>Username</label>
          <input type="text"></input>
          <p>This is your public display name. It can be your real name or a pseudonym.</p>
        </div>
        <div>
          <label>Email</label>
          <select></select>
          <p>You can manage verified email addresses in your account settings.</p>
        </div>
      </div>
    </div>
   );
}
 
export default UserProfile;