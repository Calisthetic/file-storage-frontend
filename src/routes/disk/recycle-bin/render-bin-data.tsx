import { FunctionComponent, Suspense, memo, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../../../data/data";
// @ts-ignore
import Hammer from 'hammerjs';
import "./../../../styles/hover-elems.css"
import { BlurColor, GetCSSValue, cn } from "../../../lib/color-utils";
import { CutNumber, CutSize } from "../../../lib/utils";

import IconInfo from "../../../components/icons/IconInfo";
import IconDownload from "../../../components/icons/IconDownload";
import FileIcon from "../file-icon";
import IconWatch from "../../../components/icons/IconWatch";
import IconTileStar from "../../../components/icons/IconTileStar";
import IconRestore from "../../../components/icons/IconRestore";
import IconDelete from "../../../components/icons/IconDelete";

interface RenderBinDataProps {
  currentSortType: string
  currentSortBy:string
  currentRenderType:string
  updateTrigger:boolean
}
 
const RenderBinData: FunctionComponent<RenderBinDataProps> = memo(({currentSortType, currentSortBy, currentRenderType, updateTrigger}:RenderBinDataProps) => {
  // Data
  interface FoldersResponse {
    token: string,
    name: string,
    accessType: string | null,
    color: string | null,
    createdAt: string,
    downloads: number | null,
    views: number | null,
    filesInside: number,
    isElected: boolean,
    size: number, // in bytes
  }
  interface FilesResponse {
    token: string,
    name: string,
    fileSize: number, // in bytes
    createdAt: string,
    downloads: number | null,
    views: number | null,
    fileType: string,
    isElected: boolean,
  }
  
  const [foldersResponse, setFoldersResponse] = useState<FoldersResponse[]>();
  const [filesResponse, setFilesResponse] = useState<FilesResponse[]>();
  const [responseCode, setResponseCode] = useState<number>(200)
  const [isUpdate, setIsUpdate] = useState(true)
  const [isUpdated, setIsUpdated] = useState(true)

  const params: any = useParams();
  if (params.id === undefined) {
    throw Error("Check params")
  }
  
  // Get data
  useEffect(() => {
    const getData = async () => {
      let token = localStorage.getItem("token")
      await fetch(apiUrl + "bin/" + params.id, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token === null ? "" : token,
        },
      })
      .then((res) => {
        if (res.status === 404) {
          throw new Error('Folder not found');
        }
        if (res.status === 403) {
          setResponseCode(403);
          throw new Error('Forbidden');
        }
        return res.json();
      })
      .then(data => {setFilesResponse(data.files); setFoldersResponse(data.folders); setIsUpdated(!isUpdated); setResponseCode(200)})
      .catch(error => {
        console.log(error)
        //ShowError("User not found", "404")
      })
    }
    getData()
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, isUpdate, updateTrigger])

  // Hide files and folders
  const [isFoldersVisible, setIsFoldersVisible] = useState(true)
  const [isFilesVisible, setIsFilesVisible] = useState(true)
  const visualizeFoldersRef:any = useRef()
  const visualizeFilesRef:any = useRef()
  
  // Folder event
  const navigate = useNavigate();
  const DoubleTapEvent = useCallback((event:any) => {
    if (event.target.dataset.token !== undefined) {
      navigate('./../' + event.target.dataset.token)
      return
    }
    if (event.target.parentElement.dataset.token !== undefined) {
      navigate('./../' + event.target.parentElement.dataset.token)
      return
    }
    if (event.target.parentElement.parentElement.dataset.token !== undefined) {
      navigate('./../' + event.target.parentElement.parentElement.dataset.token)
      return
    }
  }, [navigate])
  
  useEffect(() => {
    const targetElems:any = [...Array.from(document.getElementsByClassName("rendered-folder")),
    ...Array.from(document.getElementsByClassName("rendered-file"))]

    if (targetElems) {
      for (let i = 0; i < targetElems.length; i++) {
        var hammer_folders = new Hammer(targetElems[i]);
        hammer_folders.on('doubletap', (event:any) => DoubleTapEvent(event));
      }
    }

    // Swith "on" => "off"
    return () => {
      if (targetElems) {
        for (let i = 0; i < targetElems.length; i++) {
          var hammer_folders = new Hammer(targetElems[i]);
          hammer_folders.off('doubletap', (event:any) => DoubleTapEvent(event));
        }
      }
    }
  }, [currentSortType, currentSortBy, currentRenderType, isUpdated, navigate, DoubleTapEvent, params.id])

  // Elect folder
  function ElectFolder(folderToken:string) {
    const elect = async () => {
      let elems = foldersResponse?.filter(x => x.token !== null)
      if (elems !== undefined) {
        elems[elems.findIndex(x => x.token === folderToken)].isElected = !elems[elems.findIndex(x => x.token === folderToken)].isElected
        setFoldersResponse(elems)
      }

      let token = localStorage.getItem("token")
      await fetch(apiUrl + "folders/elect/" + folderToken, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token === null ? "" : token,
        },
      })
      .then((res) => {
        if (res.status === 400) {
          throw new Error('Bad request');
        }
        if (res.status === 404) {
          throw new Error('Not found');
        }
      })
      .catch(error => {
        console.log(error)
        let elems = foldersResponse?.filter(x => x.token !== null)
        if (elems !== undefined) {
          elems[elems.findIndex(x => x.token === folderToken)].isElected = !elems[elems.findIndex(x => x.token === folderToken)].isElected
          setFoldersResponse(elems)
        }
      })
    }
    elect()
  }

  // Elect file
  function ElectFile(fileToken:string) {
    const elect = async () => {
      let elems = filesResponse?.filter(x => x.token !== null)
      if (elems !== undefined) {
        elems[elems.findIndex(x => x.token === fileToken)].isElected = !elems[elems.findIndex(x => x.token === fileToken)].isElected
        setFilesResponse(elems)
      }

      let token = localStorage.getItem("token")
      await fetch(apiUrl + "files/elect/" + fileToken, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token === null ? "" : token,
        },
      })
      .then((res) => {
        if (res.status === 400) {
          throw new Error('Bad request');
        }
        if (res.status === 404) {
          throw new Error('Not found');
        }
      })
      .catch(error => {
        console.log(error)
        let elems = filesResponse?.filter(x => x.token !== null)
        if (elems !== undefined) {
          elems[elems.findIndex(x => x.token === fileToken)].isElected = !elems[elems.findIndex(x => x.token === fileToken)].isElected
          setFilesResponse(elems)
        }
      })
    }
    elect()
  }

  // Download file
  function DownloadFile(fileToken:string) {
    DownloadData(apiUrl + "files/download/" + fileToken)
  }
  // Download folder
  function DownloadFolder(folderToken:string) {
    DownloadData(apiUrl + "folders/download/" + folderToken)
  }
  function DownloadData(url:string) {
    const a = document.createElement('a')
    a.href = url
    a.download = url.split('/').pop() ?? ""
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  // Delete files/folders
  function DeleteFile(fileToken:string) {
    const deleteFile = async () => {
      let token = localStorage.getItem("token")
      await fetch(apiUrl + "files/" + fileToken, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token === null ? "" : token,
        },
      })
      .then((res) => {
        if (res.status === 400) {
          throw new Error('Bad request');
        }
        if (res.status === 404) {
          throw new Error('Not found');
        }
      })
      .then(() => {setIsUpdate(!isUpdate); console.log(0)})
      .catch(error => {
        console.log(error)
        //ShowError("User not found", "404")
      })
    }
    deleteFile()
  }
  function DeleteFolder(folderToken:string) {
    const deleteFolder = async () => {
      let token = localStorage.getItem("token")
      await fetch(apiUrl + "folders/" + folderToken, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token === null ? "" : token,
        },
      })
      .then((res) => {
        if (res.status === 400) {
          throw new Error('Bad request');
        }
        if (res.status === 404) {
          throw new Error('Not found');
        }
      })
      .then(() => setIsUpdate(!isUpdate))
      .catch(error => {
        console.log(error)
        //ShowError("User not found", "404")
      })
    }
    deleteFolder()
  }

  // Restore files/folders
  function RestoreFolder(folderToken:string) {
    const restoreFolder = async () => {
      let token = localStorage.getItem("token")
      await fetch(apiUrl + "folders/restore/" + folderToken, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token === null ? "" : token,
        },
      })
      .then((res) => {
        if (res.status === 400) {
          throw new Error('Bad request');
        }
        if (res.status === 404) {
          throw new Error('Not found');
        }
      })
      .then(() => setIsUpdate(!isUpdate))
      .catch(error => {
        console.log(error)
        //ShowError("User not found", "404")
      })
    }
    restoreFolder()
  }
  function RestoreFile(fileToken:string) {
    const restoreFile = async () => {
      let token = localStorage.getItem("token")
      await fetch(apiUrl + "files/restore/" + fileToken, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token === null ? "" : token,
        },
      })
      .then((res) => {
        if (res.status === 400) {
          throw new Error('Bad request');
        }
        if (res.status === 404) {
          throw new Error('Not found');
        }
      })
      .then(() => setIsUpdate(!isUpdate))
      .catch(error => {
        console.log(error)
        //ShowError("User not found", "404")
      })
    }
    restoreFile()
  }
  
  return responseCode === 403 ? (
    <main className="flex justify-center items-center text-textLight dark:text-textDark h-[calc(100dvh-100px)] sm:h-[calc(100dvh-104px)]">
      <div className="flex flex-col items-center py-4 px-4 max-w-xs text-center">
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="md:h-60 md:w-60 sm:h-[34dvw] sm:w-[34dvw] h-[50dvw] w-[50dvw]">
          <path d="M64,448 C64,448 64,448 64,448 S16,448 16,400 16,136 16,136 16,88 64,88 208,88 208,88 
          256,136 256,136 448,136 448,136 496,136 496,188 496,400, 496,400 496,448 448,448 z"
          className="stroke-iconLight dark:stroke-iconDark fill-none" strokeWidth="20"></path>
          <path d="m250.26 195.39 5.74 122 5.73-121.95a5.74 5.74 0 0 0-5.79-6h0a5.74 5.74 0 0 0-5.68 5.95Z" 
          className="fill-none stroke-iconLight dark:stroke-iconDark" 
          strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></path>
          <path d="M256 397.25a20 20 0 1 1 20-20 20 20 0 0 1-20 20Z"
          className="fill-iconLight dark:fill-iconDark"></path>
        </svg>
        <h1 className="text-2xl font-semibold">The folder is in your bin</h1>
        <h3 className="text-base font-normal mt-2">To view the contents of a folder, restore it from the recycle bin</h3>
        <button className="rounded-full bg-buttonLight dark:bg-buttonDark transition-colors 
        hover:bg-buttonHoverLight dark:hover:bg-buttonHoverDark mt-4 py-2 px-6 font-semibold text-lg"
        onClick={() => navigate("/disk/bin/main")}>
          Back
        </button>
      </div>
    </main>
  ) : (
    <main className="py-4">
      {(foldersResponse === undefined || filesResponse === undefined) ? null : currentRenderType === "list" ? (
        <div>
          <div className="px-2 mb-2 pb-1
          font-semibold text-base border-b border-borderLight dark:border-borderDark
          flex flex-row justify-between items-center opacity-80"
          onClick={() => setIsFoldersVisible(!isFilesVisible)}>
            <p className=" text-textLight dark:text-textDark pointer-events-none">Folders</p>
            <svg className={cn("w-2.5 h-2.5 ml-2.5 transition-transform", {
              "-rotate-180": isFoldersVisible,
              "rotate-0": !isFoldersVisible,
            })} aria-hidden="true" 
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path className="stroke-textLight dark:stroke-textDark" strokeLinecap="round" 
              strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
          </div>
          <div ref={visualizeFoldersRef}
          className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-2 gap-y-1 transition-all h-auto">
            {foldersResponse.sort((a, b) => {
              if (currentSortType === "size" ? a.size < b.size
                : currentSortType === "date" ? a.createdAt < b.createdAt
                : a.name < b.name) 
              { return currentSortBy === "descending" ? 1 : -1; }
              if (currentSortType === "size" ? a.size > b.size
                : currentSortType === "date" ? a.createdAt > b.createdAt
                : a.name > b.name) 
              { return currentSortBy === "descending" ? -1 : 1; }
              return 0;
            }).map((item, index) => (
              <div key={index} data-type="folder" data-token={item.token}
              className="h-full w-full text-textLight dark:text-textDark
              hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark 
              text-lg rounded-lg rendered-folder transition-colors
              bg-backgroundSecondLight dark:bg-backgroundSecondDark relative">
                <div className="flex px-2 py-1 flex-row justify-between">
                  <div className="flex flex-row items-center space-x-2 max-w-[calc(100dvw-88px)] 
                  sm:max-w-[calc(100dvw-348px)] md:max-w-[calc(100dvw-358px)] lg:max-w-[calc(100%-60px)]">
                    <div id={"open-folder-colors-" + item.token} aria-label="Folder colors"
                    className="w-6 flex flex-row">
                      <svg viewBox="0 0 20 16" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 0H2C.9 0 0 .9 0 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2h-8L8 0Z" 
                        fillRule="evenodd" className="transition-colors" fill={item.color ? ("#" + item.color) : "#888"}></path>
                      </svg>
                    </div>
                    <div className="truncate pointer-events-none">{item.name}</div>
                  </div>
                  <div className="flex flex-row items-center">
                    {/* Info */}
                    <div className="w-6 sm:w-7 mg:w-8" data-token={item.token}>
                      <div className="w-6 sm:w-7 mg:w-8 hover-first-info">
                        <IconInfo classes="h-6 w-6" fillClasses="fill-textLight dark:fill-textDark"></IconInfo>
                      </div>
                      <div className="hover-second-info px-1 overflow-hidden text-base whitespace-pre z-10
                      bg-backgroundThirdLight dark:bg-backgroundThirdDark rounded text-gray-700 dark:text-gray-400">
                        <div className="space-x-1">
                          <span className="text-sm">Size:</span>
                          <span className="text-base text-textLight dark:text-textDark">{item.size === null ? null : CutSize(item.size * 10)}</span>
                        </div>
                        <div className="space-x-1">
                          <span className="text-sm">Created:</span>
                          <span className="text-base text-textLight dark:text-textDark">{item.createdAt}</span>
                        </div>
                        <div className="space-x-1">
                          <span className="text-sm">Watches:</span>
                          <span className="text-base text-textLight dark:text-textDark">{item.views ? CutNumber(item.views) : 0}</span>
                        </div>
                        <div className="space-x-1">
                          <span className="text-sm">Downloads:</span>
                          <span className="text-base text-textLight dark:text-textDark">{item.downloads ? CutNumber(item.downloads) : 0}</span>
                        </div>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="w-6 sm:w-7 mg:w-8" data-token={item.token}>
                      <div className="h-full flex items-center justify-center hover-first">
                        <svg viewBox="0 0 256 256"  xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 pointer-events-none">
                          <path fill="none" d="M0 0h256v256H0z"></path>
                          <circle cx="128" cy="128" r="96" className="stroke-textLight dark:stroke-textDark" 
                          strokeMiterlimit="10" strokeWidth="16" fill="none"></circle>
                          <circle cx="128" cy="128" r="12" className="fill-textLight dark:fill-textDark"></circle>
                          <circle cx="128" cy="80" r="12" className="fill-textLight dark:fill-textDark"></circle>
                          <circle cx="128" cy="176" r="12" className="fill-textLight dark:fill-textDark"></circle>
                        </svg>
                      </div>
                      <div className="hover-second ml-3.5 w-8 z-10
                      bg-backgroundThirdLight dark:bg-backgroundThirdDark rounded overflow-hidden">
                        <button className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark py-1 px-1.5"
                        onClick={() => ElectFolder(item.token)}>
                          {item.isElected === true ? (
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
                        </button>
                        <button className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark py-1 px-1.5"
                        onClick={() => DownloadFolder(item.token)}>
                          <IconDownload classes="h-5 w-5 stroke-textLight dark:stroke-textDark"></IconDownload>
                        </button>
                        {params.id === "main" && (
                          <>
                            <button className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark py-1 px-1.5 h-8"
                            onClick={() => RestoreFolder(item.token)}>
                              <IconRestore classes="h-5 w-5 fill-textLight dark:fill-textDark"></IconRestore>
                            </button>
                            <button className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark py-1 px-1.5"
                            onClick={() => DeleteFolder(item.token)}>
                              <IconDelete classes="h-5 w-5 fill-textLight dark:fill-textDark"></IconDelete>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="px-2 mb-2 pb-1 mt-4
          font-semibold text-base border-b border-borderLight dark:border-borderDark
          flex flex-row justify-between items-center opacity-80"
          onClick={() => setIsFilesVisible(!isFilesVisible)}>
            <p className=" text-textLight dark:text-textDark pointer-events-none">Files</p>
            <svg className={cn("w-2.5 h-2.5 ml-2.5 transition-transform", {
              "-rotate-180": isFilesVisible,
              "rotate-0": !isFilesVisible,
            })} aria-hidden="true" 
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path className="stroke-textLight dark:stroke-textDark" strokeLinecap="round" 
              strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
          </div>
          <div ref={visualizeFilesRef}
          className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-2 gap-y-1 transition-all h-auto"
          >
            {filesResponse.sort((a, b) => {
              if (currentSortType === "name" ? a.name < b.name
              : currentSortType === "type" 
                ? a.name.lastIndexOf('.') + 1 === a.name.length ? false
                : b.name.lastIndexOf('.') + 1 === b.name.length ? true 
                  : a.name.slice(a.name.lastIndexOf('.') + 1) < b.name.slice(b.name.lastIndexOf('.') + 1)
                : currentSortType === "size" ? a.fileSize < b.fileSize
                : a.createdAt < b.createdAt) 
              { return currentSortBy === "descending" ? 1 : -1; }
              if (currentSortType === "name" ? a.name > b.name
              : currentSortType === "type" 
                ? a.name.lastIndexOf('.') + 1 === a.name.length ? true
                : b.name.lastIndexOf('.') + 1 === b.name.length ? false 
                  : a.name.slice(a.name.lastIndexOf('.') + 1) > b.name.slice(b.name.lastIndexOf('.') + 1)
              : currentSortType === "size" ? a.fileSize > b.fileSize
              : a.createdAt > b.createdAt) 
              { return currentSortBy === "descending" ? -1 : 1; }
              return 0;
            }).map((item, index) => (
              <div key={index} data-type="file" 
              className="text-textLight dark:text-textDark
              hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark 
              text-lg rounded-lg rendered-file h-full w-full relative
              bg-backgroundSecondLight dark:bg-backgroundSecondDark transition-colors">
                <div className="flex px-2 py-1 flex-row justify-between">
                  <div className="flex flex-row items-center space-x-2 
                  pointer-events-none max-w-[calc(100dvw-88px)] 
                  sm:max-w-[calc(100dvw-348px)] md:max-w-[calc(100dvw-358px)] lg:max-w-[calc(100%-60px)]">
                    <div className="h-6 w-6 flex items-center justify-center">
                      <Suspense fallback={<div></div>}>
                        <FileIcon fileType={item.name.slice(item.name.lastIndexOf('.') + 1)} 
                        classes="fill-textLight dark:fill-textDark h-6 w-6"></FileIcon>
                      </Suspense>
                    </div>
                    <div className="truncate">{item.name}</div>
                  </div>
                  <div className="flex flex-row items-center">
                    {/* Info */}
                    <div className="w-6 sm:w-7 mg:w-8">
                      <div className="w-6 sm:w-7 mg:w-8 hover-first-info">
                        <IconInfo classes="h-6 w-6" fillClasses="fill-textLight dark:fill-textDark"></IconInfo>
                      </div>
                      <div className="hover-second-info px-1 overflow-hidden text-base whitespace-pre z-10
                      bg-backgroundThirdLight dark:bg-backgroundThirdDark rounded text-gray-700 dark:text-gray-400">
                        <div className="space-x-1">
                          <span className="text-sm">Size:</span>
                          <span className="text-base text-textLight dark:text-textDark">{CutSize(item.fileSize * 10)}</span>
                        </div>
                        <div className="space-x-1">
                          <span className="text-sm">Created:</span>
                          <span className="text-base text-textLight dark:text-textDark">{item.createdAt}</span>
                        </div>
                        <div className="space-x-1">
                          <span className="text-sm">Watches:</span>
                          <span className="text-base text-textLight dark:text-textDark">{item.views ? item.views : 0}</span>
                        </div>
                        <div className="space-x-1">
                          <span className="text-sm">Downloads:</span>
                          <span className="text-base text-textLight dark:text-textDark">{item.downloads ? item.downloads : 0}</span>
                        </div>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="w-6 sm:w-7 mg:w-8">
                      <div data-type="file"
                      className="h-full flex items-center justify-center hover-first">
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
                      <div className="hover-second ml-3.5 w-8 z-10
                      bg-backgroundThirdLight dark:bg-backgroundThirdDark rounded overflow-hidden">
                        <button className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark py-1 px-1.5"
                        onClick={() => ElectFile(item.token)}>
                          {item.isElected === true ? (
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
                        </button>
                        <button className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark py-1 px-1.5 h-8"
                        onClick={() => DownloadFile(item.token)}>
                          <IconDownload classes="h-5 w-5 stroke-textLight dark:stroke-textDark"></IconDownload>
                        </button>
                        {params.id === "main" && (
                          <>
                            <button className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark py-1 px-1.5 h-8"
                            onClick={() => RestoreFile(item.token)}>
                              <IconRestore classes="h-5 w-5 fill-textLight dark:fill-textDark"></IconRestore>
                            </button>
                            <button className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark py-1 px-1.5"
                            onClick={() => DeleteFile(item.token)}>
                              <IconDelete classes="h-5 w-5 fill-textLight dark:fill-textDark"></IconDelete>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : currentRenderType === "table" ? (
        <div>
          <table className="w-full whitespace-nowrap overflow-y-visible text-base text-left text-textLight dark:text-textDark">
            <thead className="uppercase font-normal bg-backgroundLight dark:bg-backgroundDark text-textLight dark:text-textDark">
              <tr>
                <th scope="col" className="px-1 w-8 md:px-3 md:w-12">
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
                <th scope="col" className="py-3 min-w-[40px]">name</th>
                <th scope="col" className="py-3 w-20">file size</th>
                <th scope="col" className="py-3 w-36 hidden lg:table-cell">created at</th>
                {/* For actions */}
                <th scope="col" className="py-3 w-6 sm:w-7 mg:w-8"></th>
                <th scope="col" className="py-3 w-6 sm:w-7 mg:w-8"></th>
                <th scope="col" className="py-3 w-6 sm:w-7 mg:w-8"></th>
                <th scope="col" className="py-3 w-6 sm:w-7 mg:w-8"></th>
                <th scope="col" className="py-3 w-6 sm:w-7 mg:w-8"></th>
                <th scope="col" className="py-3 w-6 sm:w-7 mg:w-8"></th>
              </tr>
            </thead>
            <tbody>
              {foldersResponse.sort((a, b) => {
                if (currentSortType === "size" ? a.size < b.size
                  : currentSortType === "date" ? a.createdAt < b.createdAt
                  : a.name < b.name) 
                { return currentSortBy === "descending" ? 1 : -1; }
                if (currentSortType === "size" ? a.size > b.size
                : currentSortType === "date" ? a.createdAt > b.createdAt
                : a.name > b.name) 
                { return currentSortBy === "descending" ? -1 : 1; }
                return 0;
              }).map((item, index) => (
                <tr key={index} data-type="folder" data-token={item.token}
                className="border-b border-borderLight transition-colors h-8 -outline-offset-2
                dark:border-borderDark hover-parent rendered-folder relative
                hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark
                bg-backgroundSecondLight dark:bg-backgroundSecondDark">
                  <td className="flex items-center justify-center h-8 flex-row">
                    <div data-type="folder" className="w-6">
                      <svg viewBox="0 0 20 16" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 0H2C.9 0 0 .9 0 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2h-8L8 0Z" 
                        fillRule="evenodd" className="transition-colors" fill={item.color ? ("#" + item.color) : "#888"}></path>
                      </svg>
                    </div>
                  </td>
                  <td data-token={item.token}
                  className="font-medium text truncate max-w-[1px]">{item.name}</td>
                  <td
                  data-token={item.token}>{item.size === null ? null : CutSize(item.size * 10)}</td>
                  <td
                  data-token={item.token} className="hidden lg:table-cell">{item.createdAt}</td>
                  {/* Links */}
                  <td>
                    <div className="flex hover-child justify-center items-center h-full">
                    </div>
                  </td>
                  {/* Restore */}
                  <td className="text-center">
                    <div className="flex hover-child justify-center items-center h-full">
                      {params.id === "main" && (
                        <button className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark"
                        onClick={() => RestoreFolder(item.token)}>
                          <IconRestore classes="h-5 w-5 fill-textLight dark:fill-textDark"></IconRestore>
                        </button>
                      )}
                    </div>
                  </td>
                  {/* Delete */}
                  <td 
                  className="text-center">
                    <div data-type="folder" 
                    className="flex hover-child justify-center items-center h-full">
                      {params.id === "main" && (
                        <button className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark"
                        onClick={() => DeleteFolder(item.token)}>
                          <IconDelete classes="h-5 w-5 fill-textLight dark:fill-textDark"></IconDelete>
                        </button>
                      )}
                    </div>
                  </td>
                  {/* Info watches and downloads */}
                  <td>
                    <div className="hover-first-info">
                      <IconInfo classes="w-6 h-6 ml-0 sm:ml-0.5 md:ml-1" fillClasses="fill-textLight dark:fill-textDark"></IconInfo>
                    </div>
                    <div className="hover-second-info ml-4 bg-backgroundThirdLight dark:bg-backgroundThirdDark px-2 py-1 rounded z-10">
                      <div className="flex flex-row space-x-2 text-sm font-medium">
                        <IconWatch classes="h-5 w-5" fillClasses="fill-textLight dark:fill-textDark"></IconWatch>
                        <p>{item.views === null ? 0 : CutNumber(item.views)}</p>
                      </div>
                      <div className="flex flex-row space-x-2 text-base font-medium">
                        <IconDownload classes="w-5 h-5 stroke-textLight dark:stroke-textDark"></IconDownload>
                        <p>{item.downloads === null ? 0 : CutNumber(item.downloads)}</p>
                      </div>
                    </div>
                  </td>
                  {/* Download */}
                  <td 
                  className="text-center">
                    <div className="flex justify-center items-center h-full">
                      <button data-type="folder" onClick={() => DownloadFolder(item.token)}>
                        <IconDownload classes="w-5 h-5 stroke-textLight dark:stroke-textDark"></IconDownload>
                      </button>
                    </div>
                  </td>
                  {/* Star */}
                  <td className="text-center">
                    <div className="flex justify-center items-center h-full">
                      <button data-type="folder" onClick={() => ElectFolder(item.token)}>
                        {item.isElected === true ? (
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5">
                            <path d="m21.82 10.74-5.12 3.71 2 6a1 1 0 0 1-.37 1.12 1 1 0 0 1-1.17 0L12 17.87l-5.12 
                            3.72a1 1 0 0 1-1.17 0 1 1 0 0 1-.37-1.12l2-6-5.16-3.73a1 1 0 0 1 .59-1.81h6.32l2-6a1 
                            1 0 0 1 1.9 0l2 6h6.32a1 1 0 0 1 .59 1.81Z"
                            className="fill-iconLight dark:fill-iconDark"></path>
                          </svg>
                        ) : (
                          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" 
                          className="w-5 h-5">
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
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filesResponse.sort((a, b) => {
                if (currentSortType === "name" ? a.name < b.name
                  : currentSortType === "type" 
                    ? a.name.lastIndexOf('.') + 1 === a.name.length ? false
                    : b.name.lastIndexOf('.') + 1 === b.name.length ? true 
                      : a.name.slice(a.name.lastIndexOf('.') + 1) < b.name.slice(b.name.lastIndexOf('.') + 1)
                  : currentSortType === "size" ? a.fileSize < b.fileSize
                  : a.createdAt < b.createdAt) 
                { return currentSortBy === "descending" ? 1 : -1; }
                if (currentSortType === "name" ? a.name > b.name
                : currentSortType === "type" 
                  ? a.name.lastIndexOf('.') + 1 === a.name.length ? true
                  : b.name.lastIndexOf('.') + 1 === b.name.length ? false 
                    : a.name.slice(a.name.lastIndexOf('.') + 1) > b.name.slice(b.name.lastIndexOf('.') + 1)
                : currentSortType === "size" ? a.fileSize > b.fileSize
                : a.createdAt > b.createdAt) 
                { return currentSortBy === "descending" ? -1 : 1; }
                return 0;
              }).map((item, index) => (
                <tr key={index} data-type="file"
                className="border-b border-borderLight dark:border-borderDark 
                transition-colors h-8 relative hover-parent rendered-files
                hover:bg-backgroundHoverLight dark:hover:bg-backgroundHoverDark 
                bg-backgroundSecondLight dark:bg-backgroundSecondDark 
                rendered-file -outline-offset-2">
                  <td className="flex items-center justify-center">
                    <div className="h-7 w-6 flex items-center justify-center">
                      <Suspense fallback={<div></div>}>
                        <FileIcon fileType={item.name.slice(item.name.lastIndexOf('.') + 1)} 
                        classes="fill-textLight dark:fill-textDark h-6 w-6"></FileIcon>
                      </Suspense>
                    </div>
                  </td>
                  <td data-type="file" 
                  className="font-medium text truncate max-w-[1px]">{item.name}</td>
                  <td data-type="file">{CutSize(item.fileSize * 10)}</td>
                  <td data-type="file"
                  className="hidden lg:table-cell">{item.createdAt}</td>
                  {/* Links */}
                  <td data-type="file"></td>
                  {/* Restore */}
                  <td data-type="file">
                    <div className="flex hover-child justify-center h-full">
                      {params.id === "main" && (
                        <button className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark"
                        onClick={() => RestoreFile(item.token)}>
                          <IconRestore classes="h-5 w-5 fill-textLight dark:fill-textDark"></IconRestore>
                        </button>
                      )}
                    </div>
                  </td>
                  {/* Delete */}
                  <td data-type="file">
                    <div className="flex hover-child justify-center items-center h-full">
                      {params.id === "main" && (
                        <button className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark"
                        onClick={() => DeleteFile(item.token)}>
                          <IconDelete classes="h-5 w-5 fill-textLight dark:fill-textDark"></IconDelete>
                        </button>
                      )}
                    </div>
                  </td>
                  {/* Info watches and downloads */}
                  <td>
                    <div className="hover-first-info">
                      <IconInfo classes="w-6 h-6 ml-0 sm:ml-0.5 md:ml-1" fillClasses="fill-textLight dark:fill-textDark"></IconInfo>
                    </div>
                    <div className="hover-second-info ml-4 bg-backgroundThirdLight dark:bg-backgroundThirdDark px-2 py-1 rounded z-10">
                      <div className="flex flex-row space-x-2 text-sm font-medium">
                        <IconWatch classes="h-5 w-5" fillClasses="fill-textLight dark:fill-textDark"></IconWatch>
                        <p>{item.views === null ? 0 : CutNumber(item.views)}</p>
                      </div>
                      <div className="flex flex-row space-x-2 text-base font-medium">
                        <IconDownload classes="w-5 h-5 stroke-textLight dark:stroke-textDark"></IconDownload>
                        <p>{item.downloads === null ? 0 : CutNumber(item.downloads)}</p>
                      </div>
                    </div>
                  </td>
                  {/* Download */}
                  <td data-type="file" className="text-center">
                    <div className="flex justify-center items-center h-full">
                      <button data-type="file" onClick={() => DownloadFile(item.token)}>
                        <IconDownload classes="w-5 h-5 stroke-textLight dark:stroke-textDark"></IconDownload>
                      </button>
                    </div>
                  </td>
                  {/* Star */}
                  <td data-type="file" className="text-center">
                    <div className="flex justify-center items-center h-full">
                      <button data-type="file" onClick={() => ElectFile(item.token)}>
                        {item.isElected === true ? (
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
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : ( // tile
        <div className="flex flex-col">
          <div className="px-2 lg:col-span-2 xl:col-span-3 2xl:col-span-4 mb-2 pb-1
          font-semibold text-base border-b border-borderLight dark:border-borderDark
          flex flex-row justify-between items-center opacity-80"
          onClick={() => setIsFoldersVisible(!isFoldersVisible)}>
            <p className=" text-textLight dark:text-textDark">Folders</p>
            <svg className={cn("w-2.5 h-2.5 ml-2.5 pointer-events-none transition-transform", {
              "-rotate-180": isFoldersVisible,
              "rotate-0": !isFoldersVisible,
            })} aria-hidden="true" 
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path className="stroke-textLight dark:stroke-textDark" strokeLinecap="round" 
              strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
          </div>
          <div ref={visualizeFoldersRef}
          className="flex gap-x-1 md:gap-x-1.5 lg:gap-x-2 mt-2 flex-row flex-wrap transition-all h-auto">
            {foldersResponse.sort((a, b) => {
              if (currentSortType === "size" ? a.size < b.size
                : currentSortType === "date" ? a.createdAt < b.createdAt
                : a.name < b.name) 
              { return currentSortBy === "descending" ? 1 : -1; }
              if (currentSortType === "size" ? a.size > b.size
                : currentSortType === "date" ? a.createdAt > b.createdAt
                : a.name > b.name) 
              { return currentSortBy === "descending" ? -1 : 1; }
              return 0;
            }).map((item, index) => (
              <div key={index} data-type="folder" data-token={item.token}
              className=" hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark
              px-2 w-36 rounded-md flex flex-col py-1 hover-parent rendered-folder
              bg-backgroundSecondLight dark:bg-backgroundSecondDark relative">
                {/* Actions */}
                <div data-type="folder" 
                className="h-6 flex flex-row justify-around flex-nowrap">
                  <div data-type="folder" className="hover-child">
                    <button data-type="folder" onClick={() => DownloadFolder(item.token)}
                    className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark p-0.5">
                      <IconDownload classes="w-5 h-5 stroke-textLight dark:stroke-textDark"></IconDownload>
                    </button>
                    {params.id === "main" && (
                      <>
                        <button className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark p-0.5"
                        onClick={() => RestoreFolder(item.token)}>
                          <IconRestore classes="h-5 w-5 fill-textLight dark:fill-textDark"></IconRestore>
                        </button>
                        <button className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark p-0.5"
                        onClick={() => DeleteFolder(item.token)}>
                          <IconDelete classes="h-5 w-5 fill-textLight dark:fill-textDark"></IconDelete>
                        </button>
                      </>
                      )}
                  </div>
                </div>
                {/* Main icon */}
                <div data-type="folder" className="px-2 flex flex-col">
                  <div data-token={item.token} data-type="folder">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    className="w-28 h-28">
                      <path d="M12 6c0 1.1-.895 2-2 2H2c-1.105 0-2 .9-2 2v11c0 1.1.895 
                      2 2 2h20c1.105 0 2-.9 2-2V8c0-1.1-.895-2-2-2H12z" 
                      className="transition-colors"fill={item.color ? BlurColor(item.color, -32) : "#686868"}></path>
                      <path d="M2 2a2 2 0 0 0-2 2v5h10v1h14V5a2 2 0 0 0-2-2H11.719A1.98 1.98 0 0 0 10 2H2z" 
                       className="transition-colors"fill={item.color ? BlurColor(item.color, -32) : "#686868"}></path>
                      <path d="M12 5c0 1.1-.895 2-2 2H2C.895 7 0 7.9 0 9v11c0 1.1.895 
                      2 2 2h20c1.105 0 2-.9 2-2V7c0-1.1-.895-2-2-2H12z" 
                      className="transition-colors"fill={item.color ? "#" + item.color : "#888888"}></path>
                    </svg>
                  </div>
                  {/* Folder info */}
                  <div className="absolute w-28 h-28 flex flex-col justify-between
                  text-textLight dark:text-textDark pointer-events-none">
                    {/* Watches and items in folder */}
                    <div data-type="folder" 
                    className="flex flex-row justify-between pt-2.5 px-0.5">
                      <div>
                        <IconInfo classes="w-6 h-6 hover-first-info pointer-events-auto" 
                        fillClasses="fill-textLight dark:fill-textDark"></IconInfo>
                        <div className="hover-second-info ml-3 bg-backgroundThirdLight dark:bg-backgroundThirdDark 
                        px-2 py-1 rounded z-10">
                          <div className="flex flex-row space-x-2 text-sm font-medium">
                            <IconWatch classes="h-5 w-5" fillClasses="fill-textLight dark:fill-textDark"></IconWatch>
                            <p>{item.views === null ? 0 : CutNumber(item.views)}</p>
                          </div>
                          <div className="flex flex-row space-x-2 text-base font-medium">
                            <IconDownload classes="w-5 h-5 stroke-textLight dark:stroke-textDark"></IconDownload>
                            <p>{item.downloads === null ? 0 : CutNumber(item.downloads)}</p>
                          </div>
                        </div>
                      </div>
                      <div className=" mt-2.5 mr-0.5 font-medium pointer-events-none"
                      style={{color: item.color ? BlurColor(item.color, -60) : "#585858"}}>
                        {item.filesInside}
                      </div>
                    </div>
                    {/* Elected and size */}
                    <div data-type="folder" 
                    className="flex flex-row justify-between items-end px-1 pb-1.5">
                      <div className="">
                        <button data-type="folder" className="pointer-events-auto" 
                        onClick={() => ElectFolder(item.token)}>
                          <IconTileStar width="24px" height="24px" isActive={item.isElected}
                          firstColor={GetCSSValue(item.isElected ? "icon" : "text")} 
                          secondColor={BlurColor(GetCSSValue("icon"), -48)}></IconTileStar>
                        </button>
                      </div>
                      <div data-type="folder" 
                      className="font-medium">{item.size === null ? null : CutSize(item.size * 10)}</div>
                    </div>
                  </div>
                </div>
                <div data-type="folder" className="flex cursor-default justify-center">
                  <span className="text-center pointer-events-auto transition-all whitespace-pre-wrap">
                    {item.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="px-2 lg:col-span-2 xl:col-span-3 2xl:col-span-4 mb-2 pb-1 mt-4
          font-semibold text-base border-b border-borderLight dark:border-borderDark
          flex flex-row justify-between items-center opacity-80"
          onClick={() => setIsFilesVisible(!isFilesVisible)}>
            <p className=" text-textLight dark:text-textDark">Folders</p>
            <svg className={cn("w-2.5 h-2.5 ml-2.5 transition-transform", {
              "-rotate-180": isFilesVisible,
              "rotate-0": !isFilesVisible,
            })} aria-hidden="true" 
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path className="stroke-textLight dark:stroke-textDark" strokeLinecap="round" 
              strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
          </div>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 transition-all h-auto">
            {filesResponse.sort((a, b) => {
              if (currentSortType === "name" ? a.name < b.name
              : currentSortType === "type" 
                ? a.name.lastIndexOf('.') + 1 === a.name.length ? false
                : b.name.lastIndexOf('.') + 1 === b.name.length ? true 
                  : a.name.slice(a.name.lastIndexOf('.') + 1) < b.name.slice(b.name.lastIndexOf('.') + 1)
                : currentSortType === "size" ? a.fileSize < b.fileSize
                : a.createdAt < b.createdAt) 
              { return currentSortBy === "descending" ? 1 : -1; }
              if (currentSortType === "name" ? a.name > b.name
              : currentSortType === "type" 
                ? a.name.lastIndexOf('.') + 1 === a.name.length ? true
                : b.name.lastIndexOf('.') + 1 === b.name.length ? false 
                  : a.name.slice(a.name.lastIndexOf('.') + 1) > b.name.slice(b.name.lastIndexOf('.') + 1)
              : currentSortType === "size" ? a.fileSize > b.fileSize
              : a.createdAt > b.createdAt) 
              { return currentSortBy === "descending" ? -1 : 1; }
              return 0;
            }).map((item, index) => (
              <div key={index} data-type="file" 
              className="text-textLight dark:text-textDark
              hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark 
              text-lg rounded-lg rendered-file h-full w-full relative
              bg-backgroundSecondLight dark:bg-backgroundSecondDark transition-colors">
                <div className="flex px-2 py-1 flex-row justify-between">
                  <div className="flex flex-row items-center space-x-2 
                  pointer-events-none max-w-[calc(100dvw-88px)] 
                  sm:max-w-[calc(100dvw-348px)] md:max-w-[calc(100dvw-358px)] lg:max-w-[calc(100%-60px)]">
                    <div className="h-6 w-6 flex items-center justify-center">
                      <Suspense fallback={<div></div>}>
                        <FileIcon fileType={item.name.slice(item.name.lastIndexOf('.') + 1)} 
                        classes="fill-textLight dark:fill-textDark h-6 w-6"></FileIcon>
                      </Suspense>
                    </div>
                    <div className="truncate">{item.name}</div>
                  </div>
                  <div className="flex flex-row items-center">
                    {/* Info */}
                    <div className="w-6 sm:w-7 mg:w-8">
                      <div className="w-6 sm:w-7 mg:w-8 hover-first-info">
                        <IconInfo classes="h-6 w-6" fillClasses="fill-textLight dark:fill-textDark"></IconInfo>
                      </div>
                      <div className="hover-second-info px-1 overflow-hidden text-base whitespace-pre z-10
                      bg-backgroundThirdLight dark:bg-backgroundThirdDark rounded text-gray-700 dark:text-gray-400">
                        <div className="space-x-1">
                          <span className="text-sm">Size:</span>
                          <span className="text-base text-textLight dark:text-textDark">{CutSize(item.fileSize * 10)}</span>
                        </div>
                        <div className="space-x-1">
                          <span className="text-sm">Created:</span>
                          <span className="text-base text-textLight dark:text-textDark">{item.createdAt}</span>
                        </div>
                        <div className="space-x-1">
                          <span className="text-sm">Watches:</span>
                          <span className="text-base text-textLight dark:text-textDark">{item.views ? item.views : 0}</span>
                        </div>
                        <div className="space-x-1">
                          <span className="text-sm">Downloads:</span>
                          <span className="text-base text-textLight dark:text-textDark">{item.downloads ? item.downloads : 0}</span>
                        </div>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="w-6 sm:w-7 mg:w-8">
                      <div data-type="file"
                      className="h-full flex items-center justify-center hover-first">
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
                      <div className="hover-second ml-3.5 w-8 z-10
                      bg-backgroundThirdLight dark:bg-backgroundThirdDark rounded overflow-hidden">
                        <button className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark py-1 px-1.5"
                        onClick={() => ElectFile(item.token)}>
                          {item.isElected === true ? (
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
                        </button>
                        <button className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark py-1 px-1.5 h-8"
                        onClick={() => DownloadFile(item.token)}>
                          <IconDownload classes="h-5 w-5 stroke-textLight dark:stroke-textDark"></IconDownload>
                        </button>
                        {params.id === "main" && (
                        <>
                          <button className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark py-1 px-1.5 h-8"
                          onClick={() => RestoreFile(item.token)}>
                            <IconRestore classes="h-5 w-5 fill-textLight dark:fill-textDark"></IconRestore>
                          </button>
                          <button className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark py-1 px-1.5 h-8"
                          onClick={() => DeleteFile(item.token)}>
                            <IconDelete classes="h-5 w-5 fill-textLight dark:fill-textDark"></IconDelete>
                          </button>
                        </>
                      )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
})
 
export default RenderBinData;