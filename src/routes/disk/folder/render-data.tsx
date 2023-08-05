import { useState } from "react"

type Props = {
  currentSortType: string
  currentSortBy:string
  currentRenderType:string
}
export default function RenderData({currentSortType, currentSortBy, currentRenderType}:Props) {
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
    is_elected: boolean,
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
    is_elected: boolean,
  }
  
  let folders:FoldersResponse[] = [
    {
      id: 1,
      token: "123",
      icon_link: "url",
      name: "folder1",
      size: 77828556,
      created_at: "13032001",
      is_public: false,
      watches: null,
      downloads: null,
      is_elected: true,
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
      is_elected: false,
    }
  ]
  let files:FilesResponse[] = [
    {
      id: 1,
      icon_link: "url",
      name: "dfile1.apng",
      size: 1825600000,
      created_at: "20122002",
      is_public: false,
      watches: null,
      downloads: null,
      is_elected: true,
    },
    {
      id: 2,
      icon_link: "url",
      name: "file2.jpg",
      size: 90,
      created_at: "19122002",
      is_public: true,
      watches: 12,
      downloads: 6,
      is_elected: false,
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
      is_elected: true,
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
      {currentRenderType === "list" ? (
        <div>list</div>
      ) : currentRenderType === "table" ? (
        <div className="overflow-x-auto sm:overflow-x-hidden sm:rounded-t-lg">
          <table className="w-full whitespace-nowrap text-base text-left text-textLight dark:text-textDark">
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
                <th scope="col" className="py-3 w-20">file size</th>
                <th scope="col" className="py-3 px-8 w-36 text-center">created at</th>
                <th scope="col" className="py-3 w-8"></th>
                <th scope="col" className="py-3 w-8"></th>
                {/* For actions */}
                <th scope="col" className="py-3 w-8"></th>
                <th scope="col" className="py-3 w-8"></th>
                <th scope="col" className="py-3 w-8"></th>
                <th scope="col" className="py-3 w-8"></th>
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
                onDrop={OnDropFolder} onDragStart={(e:any) => {setCurrentDragElement(e.target);}}
                className="border-b border-borderLight transition-colors h-8 hover-parent
                dark:border-borderDark hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark" 
                onDoubleClick={() => {window.location.replace("/disk/folder/" + item.token)}}>
                  <td data-key={item.id} draggable="false" className="flex items-center justify-center">
                    <img src={item.icon_link} alt=""></img>
                  </td>
                  <td data-key={item.id} data-type="folder" draggable="false" 
                  className="font-medium text">{item.name}</td>
                  <td data-key={item.id} data-type="folder" draggable="false" 
                  className="">{CutSize(item.size * 10)}</td>
                  <td data-key={item.id} data-type="folder" draggable="false" 
                  className="text-center">change later</td>
                  {/* Links */}
                  <td data-key={item.id} data-type="folder" draggable="false">
                    <div className="flex hover-child justify-center items-center h-full">
                      <div className=" cursor-pointer" data-title="Access settings">
                        <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                          <path d="M598.6 41.41C570.1 13.8 534.8 0 498.6 0s-72.36 13.8-99.96 41.41l-43.36 43.36c15.11 8.012 
                          29.47 17.58 41.91 30.02 3.146 3.146 5.898 6.518 8.742 9.838l37.96-37.96C458.5 72.05 477.1 64 498.6 
                          64c20.67 0 40.1 8.047 54.71 22.66 14.61 14.61 22.66 34.04 22.66 54.71s-8.049 40.1-22.66 54.71l-133.3 
                          133.3C405.5 343.1 386 352 365.4 352s-40.1-8.048-54.71-22.66C296 314.7 287.1 295.3 287.1 274.6s8.047-40.1 
                          22.66-54.71l4.44-3.49c-2.1-3.9-4.3-7.9-7.5-11.1-8.6-8.6-19.9-13.3-32.1-13.3-11.93 0-23.1 4.664-31.61 
                          12.97-30.71 53.96-23.63 123.6 22.39 169.6C293 402.2 329.2 416 365.4 416c36.18 0 72.36-13.8 99.96-41.41L598.6 
                          241.3c28.45-28.45 42.24-66.01 41.37-103.3-.87-35.9-14.57-69.84-41.37-96.59zM234 387.4l-37.9 37.9C181.5 
                          439.1 162 448 141.4 448c-20.67 0-40.1-8.047-54.71-22.66-14.61-14.61-22.66-34.04-22.66-54.71s8.049-40.1 
                          22.66-54.71l133.3-133.3C234.5 168 253.1 160 274.6 160s40.1 8.048 54.71 22.66c14.62 14.61 22.66 34.04 
                          22.66 54.71s-8.047 40.1-22.66 54.71l-3.51 3.52c2.094 3.939 4.219 7.895 7.465 11.15C341.9 315.3 353.3 
                          320 365.4 320c11.93 0 23.1-4.664 31.61-12.97 30.71-53.96 23.63-123.6-22.39-169.6C346.1 109.8 310.8 96 
                          274.6 96c-36.2 0-72.3 13.8-99.9 41.4L41.41 270.7C13.81 298.3 0 334.48 0 370.66c0 36.18 13.8 72.36 41.41 
                          99.97C69.01 498.2 105.2 512 141.4 512c36.18 0 
                          72.36-13.8 99.96-41.41l43.36-43.36c-15.11-8.012-29.47-17.58-41.91-30.02-3.21-3.11-5.91-6.51-8.81-9.81z" 
                          className=" fill-textLight dark:fill-textDark"></path>
                        </svg>
                      </div>
                    </div>
                  </td>
                  {/* Edit */}
                  <td data-key={item.id} data-type="folder" draggable="false" 
                  className="text-center">
                    <div className="flex hover-child justify-center items-center h-full">
                      <div data-key={item.id} className="cursor-pointer">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"><g>
                          <path d="M2 29a1 1 0 0 1-1-1.11l.77-7a1 1 0 0 1 .29-.59L18.42 3.94a3.2 
                          3.2 0 0 1 4.53 0l3.11 3.11a3.2 3.2 0 0 1 0 4.53L9.71 27.93a1 1 0 0 1-.59.29l-7 
                          .77Zm7-1.78Zm-5.27-5.77-.6 5.42 5.42-.6 16.1-16.1a1.2 1.2 0 0 0 0-1.7l-3.12-3.12a1.2 
                          1.2 0 0 0-1.7 0Z" className="fill-textLight dark:fill-textDark"></path>
                          <path d="M23 14.21a1 1 0 0 1-.71-.29l-6.21-6.23a1 1 0 0 1 1.42-1.42l6.23 6.23a1 1 0 
                          0 1 0 1.42 1 1 0 0 1-.73.29Z" className="fill-textLight dark:fill-textDark"></path>
                          <path transform="rotate(-45 12.901 17.096)" d="M7.39 16.1H18.4v2H7.39z" 
                          className="fill-textLight dark:fill-textDark"></path>
                          <path d="M30 29H14a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2Z" 
                          className="fill-textLight dark:fill-textDark"></path></g>
                        </svg>
                      </div>
                    </div>
                  </td>
                  {/* Download */}
                  <td data-key={item.id} data-type="folder" draggable="false" 
                  className="text-center">
                    <div className="flex hover-child justify-center items-center h-full">
                      <div data-key={item.id} className="cursor-pointer">
                        <svg className=" stroke-textLight dark:stroke-textDark w-5 h-5" fill="none" 
                        strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"></path>
                        </svg>
                      </div>
                    </div>
                  </td>
                  {/* Delete */}
                  <td data-key={item.id} data-type="folder" draggable="false" 
                  className="text-center">
                    <div className="flex hover-child justify-center items-center h-full">
                      <div data-key={item.id} className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="h-5 w-5" viewBox="0,0,256,256">
                          <g className="fill-textLight dark:fill-textDark" fillRule="nonzero" stroke="none" 
                          strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDashoffset="0" 
                          fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none">
                          <g transform="scale(10.66667,10.66667)">
                            <path d="M10,2l-1,1h-4c-0.6,0 -1,0.4 -1,1c0,0.6 0.4,1 1,1h2h10h2c0.6,0 1,-0.4 1,-1c0,-0.6 
                            -0.4,-1 -1,-1h-4l-1,-1zM5,7v13c0,1.1 0.9,2 2,2h10c1.1,0 2,-0.9 2,-2v-13zM9,9c0.6,0 
                            1,0.4 1,1v9c0,0.6 -0.4,1 -1,1c-0.6,0 -1,-0.4 -1,-1v-9c0,-0.6 0.4,-1 1,-1zM15,9c0.6,0 
                            1,0.4 1,1v9c0,0.6 -0.4,1 -1,1c-0.6,0 -1,-0.4 -1,-1v-9c0,-0.6 0.4,-1 1,-1z"></path>
                          </g></g>
                        </svg>
                      </div>
                    </div>
                  </td>
                  {/* Info watches and downloads */}
                  <td data-key={item.id} data-type="folder" draggable="false">
                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 16 16"
                    className="w-6 hover-first h-6 ml-1">
                      <path d="M8 2C4.69 2 2 4.69 2 8s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 11c-2.76 
                      0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" className="fill-textLight dark:fill-textDark"></path>
                      <path d="M8 6.85c-.28 0-.5.22-.5.5v3.4c0 .28.22.5.5.5s.5-.22.5-.5v-3.4c0-.27-.22-.5-.5-.5zM8.01 
                      4.8c-.26-.02-.5.25-.51.52v.08c0 .27.21.47.49.48H8c.27 0 .49-.24.5-.5v-.11c0-.29-.21-.47-.49-.47z" 
                      className="fill-textLight dark:fill-textDark"></path>
                    </svg>
                    <div className="hover-second ml-4 bg-backgroundThirdLight dark:bg-backgroundThirdDark px-2 py-1 rounded">
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
                  {/* Actions */}
                  {/* <td data-key={item.id} data-type="folder" draggable="false"
                  className="">
                    <div className="h-full flex items-center justify-center hover-first">
                      <div className="">
                        <svg viewBox="0 0 256 256"  xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6">
                          <path fill="none" d="M0 0h256v256H0z"></path>
                          <circle cx="128" cy="128" r="96" className="stroke-textLight dark:stroke-textDark" 
                          strokeMiterlimit="10" strokeWidth="16" fill="none"></circle>
                          <circle cx="128" cy="128" r="12" className="fill-textLight dark:fill-textDark"></circle>
                          <circle cx="128" cy="80" r="12" className="fill-textLight dark:fill-textDark"></circle>
                          <circle cx="128" cy="176" r="12" className="fill-textLight dark:fill-textDark"></circle>
                        </svg>
                      </div>
                    </div>
                    <div className="hover-second bg-red-800 ml-5
                    bg-backgroundThirdLight dark:bg-backgroundThirdDark rounded overflow-hidden">
                      <div className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark cursor-pointer py-1 px-2">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"><g>
                          <path d="M2 29a1 1 0 0 1-1-1.11l.77-7a1 1 0 0 1 .29-.59L18.42 3.94a3.2 
                          3.2 0 0 1 4.53 0l3.11 3.11a3.2 3.2 0 0 1 0 4.53L9.71 27.93a1 1 0 0 1-.59.29l-7 
                          .77Zm7-1.78Zm-5.27-5.77-.6 5.42 5.42-.6 16.1-16.1a1.2 1.2 0 0 0 0-1.7l-3.12-3.12a1.2 
                          1.2 0 0 0-1.7 0Z" className="fill-textLight dark:fill-textDark"></path>
                          <path d="M23 14.21a1 1 0 0 1-.71-.29l-6.21-6.23a1 1 0 0 1 1.42-1.42l6.23 6.23a1 1 0 
                          0 1 0 1.42 1 1 0 0 1-.73.29Z" className="fill-textLight dark:fill-textDark"></path>
                          <path transform="rotate(-45 12.901 17.096)" d="M7.39 16.1H18.4v2H7.39z" 
                          className="fill-textLight dark:fill-textDark"></path>
                          <path d="M30 29H14a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2Z" 
                          className="fill-textLight dark:fill-textDark"></path></g>
                        </svg>
                      </div>
                      <div className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark cursor-pointer py-1 px-2">
                        {item.is_elected === true ? (
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5">
                            <path d="m21.82 10.74-5.12 3.71 2 6a1 1 0 0 1-.37 1.12 1 1 0 0 1-1.17 0L12 17.87l-5.12 
                            3.72a1 1 0 0 1-1.17 0 1 1 0 0 1-.37-1.12l2-6-5.16-3.73a1 1 0 0 1 .59-1.81h6.32l2-6a1 
                            1 0 0 1 1.9 0l2 6h6.32a1 1 0 0 1 .59 1.81Z"
                            className="fill-iconLight dark:fill-iconDark"></path>
                          </svg>
                        ) : (
                          <svg viewBox="0 0 32 32" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                            <path d="M31.881 12.557a2.303 2.303 0 0 0-1.844-1.511l-8.326-1.238-3.619-7.514A2.318 
                            2.318 0 0 0 16 1c-.896 0-1.711.505-2.092 1.294l-3.619 7.514-8.327 1.238A2.3 2.3 0 0 
                            0 .12 12.557a2.207 2.207 0 0 0 .537 2.285l6.102 6.092-1.415 8.451a2.224 2.224 0 0 0 
                            .948 2.203 2.351 2.351 0 0 0 2.449.131L16 27.811l7.26 3.908a2.367 2.367 0 0 0 2.449-.131 
                            2.225 2.225 0 0 0 .947-2.203l-1.416-8.451 6.104-6.092c.603-.603.81-1.485.537-2.285zm-8.293 
                            6.806a2.216 2.216 0 0 0-.627 1.934l1.416 8.451-7.26-3.906a2.361 2.361 0 0 0-2.235 0l-7.26 
                            3.906 1.416-8.451a2.212 2.212 0 0 0-.626-1.934L2.31 13.271l8.326-1.24a2.306 2.306 0 0 0 
                            1.743-1.268L16 3.251l3.62 7.513a2.31 2.31 0 0 0 1.742 1.268l8.328 1.24-6.102 6.091z" 
                            className="fill-textLight dark:fill-textDark"></path>
                          </svg>
                        )}
                      </div>
                      <div className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark cursor-pointer py-1 px-2">
                        <svg className=" stroke-textLight dark:stroke-textDark" fill="none" 
                        strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"></path>
                        </svg>
                      </div>
                      <div className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark cursor-pointer py-1 px-2">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="h-5 w-5" viewBox="0,0,256,256">
                          <g className="fill-textLight dark:fill-textDark" fillRule="nonzero" stroke="none" 
                          strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDashoffset="0" 
                          fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none">
                          <g transform="scale(10.66667,10.66667)">
                            <path d="M10,2l-1,1h-4c-0.6,0 -1,0.4 -1,1c0,0.6 0.4,1 1,1h2h10h2c0.6,0 1,-0.4 1,-1c0,-0.6 
                            -0.4,-1 -1,-1h-4l-1,-1zM5,7v13c0,1.1 0.9,2 2,2h10c1.1,0 2,-0.9 2,-2v-13zM9,9c0.6,0 
                            1,0.4 1,1v9c0,0.6 -0.4,1 -1,1c-0.6,0 -1,-0.4 -1,-1v-9c0,-0.6 0.4,-1 1,-1zM15,9c0.6,0 
                            1,0.4 1,1v9c0,0.6 -0.4,1 -1,1c-0.6,0 -1,-0.4 -1,-1v-9c0,-0.6 0.4,-1 1,-1z"></path>
                          </g></g>
                        </svg>
                      </div>
                    </div>
                  </td> */}
                  {/* Star */}
                  <td data-key={item.id} data-type="folder" draggable="false" 
                  className="text-center">
                    <div className="flex justify-center items-center h-full">
                      <div data-key={item.id} className="cursor-pointer">
                        {item.is_elected === true ? (
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5">
                            <path d="m21.82 10.74-5.12 3.71 2 6a1 1 0 0 1-.37 1.12 1 1 0 0 1-1.17 0L12 17.87l-5.12 
                            3.72a1 1 0 0 1-1.17 0 1 1 0 0 1-.37-1.12l2-6-5.16-3.73a1 1 0 0 1 .59-1.81h6.32l2-6a1 
                            1 0 0 1 1.9 0l2 6h6.32a1 1 0 0 1 .59 1.81Z"
                            className="fill-iconLight dark:fill-iconDark"></path>
                          </svg>
                        ) : (
                          <svg viewBox="0 0 32 32" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                            <path d="M31.881 12.557a2.303 2.303 0 0 0-1.844-1.511l-8.326-1.238-3.619-7.514A2.318 
                            2.318 0 0 0 16 1c-.896 0-1.711.505-2.092 1.294l-3.619 7.514-8.327 1.238A2.3 2.3 0 0 
                            0 .12 12.557a2.207 2.207 0 0 0 .537 2.285l6.102 6.092-1.415 8.451a2.224 2.224 0 0 0 
                            .948 2.203 2.351 2.351 0 0 0 2.449.131L16 27.811l7.26 3.908a2.367 2.367 0 0 0 2.449-.131 
                            2.225 2.225 0 0 0 .947-2.203l-1.416-8.451 6.104-6.092c.603-.603.81-1.485.537-2.285zm-8.293 
                            6.806a2.216 2.216 0 0 0-.627 1.934l1.416 8.451-7.26-3.906a2.361 2.361 0 0 0-2.235 0l-7.26 
                            3.906 1.416-8.451a2.212 2.212 0 0 0-.626-1.934L2.31 13.271l8.326-1.24a2.306 2.306 0 0 0 
                            1.743-1.268L16 3.251l3.62 7.513a2.31 2.31 0 0 0 1.742 1.268l8.328 1.24-6.102 6.091z" 
                            className="fill-textLight dark:fill-textDark"></path>
                          </svg>
                        )}
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
                  <td data-key={item.id} draggable="false" className="">{CutSize(item.size * 10)}</td>
                  <td data-key={item.id} draggable="false" className="text-center">change later</td>
                  <td data-key={item.id} draggable="false"></td>
                  <td data-key={item.id} draggable="false" colSpan={2}></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : currentRenderType === "tile" ? (
        <div>tile</div>
      ) : (
        <div>big tile</div>
      )}

    </main>
  )
}