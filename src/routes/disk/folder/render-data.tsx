import { useState } from "react"

type Props = {
  currentSortType: string
  currentSortBy:string
}
export default function RenderData({currentSortType, currentSortBy}:Props) {
  // Main part
  interface FoldersResponse {
    id: number,
    token: string,
    icon_link: string,
    name: string,
    size: number, // in bytes
    created_at: string,
    is_public: boolean,
    watches: number | null,
    downloads: number | null,
  }
  interface FilesResponse {
    id: number,
    icon_link: string,
    name: string,
    size: number, // in bytes
    created_at: string,
    is_public: boolean,
    watches: number | null,
    downloads: number | null,
  }
  
  let folders:FoldersResponse[] = [
    {
      id: 1,
      token: "123",
      icon_link: "url",
      name: "folder1",
      size: 18256,
      created_at: "13032001",
      is_public: false,
      watches: null,
      downloads: null,
    },
    {
      id: 2,
      token: "234",
      icon_link: "url",
      name: "folder2",
      size: 90000,
      created_at: "14042004",
      is_public: true,
      watches: 12,
      downloads: 6,
    }
  ]
  let files:FilesResponse[] = [
    {
      id: 1,
      icon_link: "url",
      name: "dfile1.apng",
      size: 18256,
      created_at: "20122002",
      is_public: false,
      watches: null,
      downloads: null,
    },
    {
      id: 2,
      icon_link: "url",
      name: "file2.jpg",
      size: 90000,
      created_at: "19122002",
      is_public: true,
      watches: 12,
      downloads: 6,
    },
    {
      id: 3,
      icon_link: "url",
      name: "lfile3.ajpg",
      size: 97000,
      created_at: "11822002",
      is_public: true,
      watches: 12,
      downloads: 6,
    }
  ]

  function CutSize(num: number, stage: number = 0):string {
    return num < 10240 ? num / 10 + (
      stage === 0 ? " B"
      : stage === 1 ? " KB"
      : stage === 2 ? " MB"
      : stage === 3 ? " GB" : " TB"
    ) : CutSize(Math.round(num / 1024), stage+1)
  }

  const [currentDragElement, setCurrentDragElement]:any = useState(null)
  function OnDropFolder(e:any) {
    console.log("Target: " + e.nativeEvent.target.dataset.type + " " + e.nativeEvent.target.dataset.key)
    console.log("Drag: " + e.nativeEvent.target.dataset.type + " " + currentDragElement.dataset.key)
  }


  return (
    <main className="py-4">
      <div className="relative overflow-x-auto sm:rounded-t-lg">
        <table className="w-full text-base text-left text-textLight dark:text-textDark">
          <thead className="uppercase font-normal bg-backgroundLight dark:bg-backgroundDark text-textLight dark:text-textDark">
            <tr>
              <th scope="col" className="px-4 w-10">
                <svg viewBox="0 0 256 256" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" d="M0 0h256v256H0z"></path>
                  <path d="M224 177.3V78.7a8.1 8.1 0 0 0-4.1-7l-88-49.5a7.8 7.8 0 
                  0 0-7.8 0l-88 49.5a8.1 8.1 0 0 0-4.1 7v98.6a8.1 8.1 0 0 0 4.1 7l88 
                  49.5a7.8 7.8 0 0 0 7.8 0l88-49.5a8.1 8.1 0 0 0 4.1-7Z" 
                  fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" 
                  className=" stroke-textLight dark:stroke-textDark"></path>
                  <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" 
                  d="M177 152.5v-52L80 47" className="stroke-textLight dark:stroke-textDark"></path>
                  <path fill="none" className="stroke-textLight dark:stroke-textDark" 
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" 
                  d="m222.9 74.6-94 53.4-95.8-53.4M128.9 128l-.9 106.8"></path>
                </svg>
              </th>
              <th scope="col" className="py-3 w-max">name</th>
              <th scope="col" className="py-3 w-20 text-center">file size</th>
              <th scope="col" className="py-3 px-8 w-40 text-center">created at</th>
              <th scope="col" className="py-3 w-12"></th>
              <th scope="col" className="py-3 w-12"></th>
              <th scope="col" className="py-3 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {folders.sort((a, b) => {
              if (currentSortType === "size" ? a.size < b.size
                : currentSortType === "date" ? a.created_at < b.created_at
                : a.name < b.name) 
              { return currentSortBy === "descending" ? 1 : -1; }
              if (currentSortType === "size" ? a.size > b.size
              : currentSortType === "date" ? a.created_at > b.created_at
              : a.name > b.name) 
              { return currentSortBy === "descending" ? -1 : 1; }
              return 0;
            }).map((item, index) => (
              <tr key={index} data-key={item.id} draggable="true" 
              onDragOver={(e:any) => {if (currentDragElement.dataset.key !== e.target.dataset.key) e.preventDefault()}}
              onDrop={OnDropFolder} onDragStart={(e:any) => {setCurrentDragElement(e.target); e.target.style.width = "10px"}}
              className="border-b border-borderLight transition-colors h-8
              dark:border-borderDark hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark" 
              onDoubleClick={() => {window.location.replace("/disk/folder/" + item.token)}}>
                <td data-key={item.id} draggable="false" className="flex items-center justify-center">
                  <img src={item.icon_link} alt=""></img>
                </td>
                <td data-key={item.id} data-type="folder" draggable="false" className="font-medium text">{item.name}</td>
                <td data-key={item.id} draggable="false" className="text-center">{CutSize(item.size * 10)}</td>
                <td data-key={item.id} draggable="false" className="text-center">change later</td>
                <td data-key={item.id} draggable="false"></td>
                <td data-key={item.id} draggable="false">
                  {/* downloads and watches */}
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 16 16"
                  className="w-6 hover-first h-6 ml-3">
                    <path d="M8 2C4.69 2 2 4.69 2 8s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 11c-2.76 
                    0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" className="fill-textLight dark:fill-textDark"></path>
                    <path d="M8 6.85c-.28 0-.5.22-.5.5v3.4c0 .28.22.5.5.5s.5-.22.5-.5v-3.4c0-.27-.22-.5-.5-.5zM8.01 
                    4.8c-.26-.02-.5.25-.51.52v.08c0 .27.21.47.49.48H8c.27 0 .49-.24.5-.5v-.11c0-.29-.21-.47-.49-.47z" 
                    className="fill-textLight dark:fill-textDark"></path>
                  </svg>
                  <div className="hover-second ml-3 bg-backgroundThirdLight dark:bg-backgroundThirdDark px-2 py-1 rounded">
                    <div className="flex flex-row space-x-2 text-sm font-medium">
                      <svg className="w-5 h-5"
                      viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 512 512">
                        <path d="M256 128c-81.9 0-145.7 48.8-224 128 67.4 67.7 124 128 224 128 99.9 0 173.4-76.4 
                        224-126.6C428.2 198.6 354.8 128 256 128zm0 219.3c-49.4 0-89.6-41-89.6-91.3 0-50.4 40.2-91.3 
                        89.6-91.3s89.6 41 89.6 91.3c0 50.4-40.2 91.3-89.6 91.3z" className="fill-textLight dark:fill-textDark"></path>
                        <path d="M256 224c0-7.9 2.9-15.1 7.6-20.7-2.5-.4-5-.6-7.6-.6-28.8 0-52.3 23.9-52.3 53.3s23.5 
                        53.3 52.3 53.3 52.3-23.9 52.3-53.3c0-2.3-.2-4.6-.4-6.9-5.5 4.3-12.3 6.9-19.8 6.9-17.8 
                        0-32.1-14.3-32.1-32z" className="fill-textLight dark:fill-textDark"></path>
                      </svg>
                      <p>{item.watches === null ? 0 : item.watches}</p>
                    </div>
                    <div className="flex flex-row space-x-2 text-base font-medium">
                      <svg  fill="none" className="w-5 h-5 stroke-textLight dark:stroke-textDark"
                      strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"></path>
                      </svg>
                      <p>{item.downloads === null ? 0 : item.downloads}</p>
                    </div>
                  </div>
                </td>
                <td data-key={item.id} draggable="false">
                  <div className="flex justify-center items-center h-full">
                    <div className=" cursor-pointer">
                      <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      className="stroke-textLight dark:stroke-textDark w-5 h-5"
                      viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path className=" pointer-events-none"
                        d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path className=" pointer-events-none"
                        d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            {files.sort((a, b) => {
              if (currentSortType === "name" ? a.name < b.name
                : currentSortType === "type" 
                  ? a.name.lastIndexOf('.') + 1 === a.name.length ? false
                  : b.name.lastIndexOf('.') + 1 === b.name.length ? true 
                    : a.name.slice(a.name.lastIndexOf('.') + 1) < b.name.slice(b.name.lastIndexOf('.') + 1)
                : currentSortType === "size" ? a.size < b.size
                : a.created_at < b.created_at) 
              { return currentSortBy === "descending" ? 1 : -1; }
              if (currentSortType === "name" ? a.name > b.name
              : currentSortType === "type" 
                ? a.name.lastIndexOf('.') + 1 === a.name.length ? true
                : b.name.lastIndexOf('.') + 1 === b.name.length ? false 
                  : a.name.slice(a.name.lastIndexOf('.') + 1) > b.name.slice(b.name.lastIndexOf('.') + 1)
              : currentSortType === "size" ? a.size > b.size
              : a.created_at > b.created_at) 
              { return currentSortBy === "descending" ? -1 : 1; }
              return 0;
            }).map((item, index) => (
              <tr key={index} data-key={item.id} draggable="true"
              onDrop={OnDropFolder} onDragStart={(e:any) => {setCurrentDragElement(e.target)}}
              data-type="file"
              className="border-b border-borderLight transition-colors h-8
              dark:border-borderDark hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark">
                <td data-key={item.id} draggable="false">
                  <img src={item.icon_link} alt=""></img>
                </td>
                <td data-key={item.id} draggable="false" className="font-medium">{item.name}</td>
                <td data-key={item.id} draggable="false" className="text-center">{CutSize(item.size * 10)}</td>
                <td data-key={item.id} draggable="false" className="text-center">change later</td>
                <td data-key={item.id} draggable="false"></td>
                <td data-key={item.id} draggable="false" colSpan={2}></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </main>
  )
}