import { FunctionComponent } from "react";

interface DiskFavoritesProps {
  
}
 
const DiskFavorites: FunctionComponent<DiskFavoritesProps> = () => {
  return (
    <div>
      <input type="file" multiple onChange={(e:any) => console.log(e)}></input>
    </div>
  );
}
 
export default DiskFavorites;