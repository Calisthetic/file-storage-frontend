import { useState, useRef, useEffect, useCallback, FunctionComponent, memo, lazy, Suspense } from "react"
import { useNavigate } from 'react-router-dom';

import "../../../styles/focus-elems.css"
import { CutNumber, CutSize } from "../../../lib/utils";
// @ts-ignore
import Hammer from 'hammerjs';
import { modalWindowStyle } from "../../../data/style/modal-styles";
import { apiUrl } from "../../../data/data";
import Loading from "../../../components/loading";
import AlertButton from "../../../components/alert-button";
import { CheckForError } from "../../../lib/check-errors";
import EmptyData from "../components/empty-data";
import DiskErrorResponse from "../components/disk-error-response";
import { SortFiles } from "../../../lib/sort-data";

const FileIcon = lazy(() => import("../file-icon"));
const IconInfo = lazy(() => import("../../../components/icons/IconInfo"));
const IconEdit = lazy(() => import("../../../components/icons/IconEdit"));
const IconDownload = lazy(() => import("../../../components/icons/IconDownload"));
const IconBin = lazy(() => import("../../../components/icons/IconBin"));
const IconWatch = lazy(() => import("../../../components/icons/IconWatch"));
const Box = lazy(() => import('@mui/material/Box'));
const Modal = lazy(() => import('@mui/material/Modal'));

type Props = {
  currentSortType: string
  currentSortBy:string
  currentRenderType:string
  updateTrigger:boolean
}

const RenderFilesData:FunctionComponent<Props> = memo(({currentSortType, currentSortBy, currentRenderType, updateTrigger}:Props) => {
  const newNameInputRef:any = useRef();
  const [selectedItem, setSelectedItem] = useState<any>();


  // Modal windows
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const modalRenameOpen = (e:any) => {
    setIsRenameModalOpen(true)
    setSelectedItem(e.target.dataset)
  };
  const modalRenameClose = () => setIsRenameModalOpen(false);

  // Data
  interface FilesResponse {
    token: string,
    name: string,
    fileSize: number, // in bytes
    createdAt: string,
    downloads: number | null,
    views: number | null,
    fileType: string
    isElected: boolean,
    folderToken: string,
    folderName: string,
  }
  
  const [filesResponse, setFilesResponse] = useState<FilesResponse[]|null>();
  const [isUpdate, setIsUpdate] = useState(true)
  const [isUpdated, setIsUpdated] = useState(true)
  const [currentError, setCurrentError] = useState("Error")
  const [lastResponseStatus, setLastResponseStatus] = useState<number>(404)

  useEffect(() => {
    const getData = async () => {
      let token = localStorage.getItem("token")
      await fetch(apiUrl + "files", {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token === null ? "" : token,
        },
      })
      .then((res) => {
        setLastResponseStatus(res.status);
        CheckForError(res.status)
        return res.json();
      })
      .then(data => {setFilesResponse(data); setIsUpdated(!isUpdated)})
      .catch(error => {
        setCurrentError(error.message)
        setFilesResponse(null)
      })
    }
    getData()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate, updateTrigger])

  const navigate = useNavigate();
  
  const DoubleTapEvent = useCallback((event:any) => {
    let token:string = ""
    if (event.target.dataset.token !== undefined) {
      token = event.target.dataset.token
    } else if (event.target.parentElement.dataset.token !== undefined) {
      token = event.target.parentElement.dataset.token
    } else if (event.target.parentElement.parentElement.dataset.token !== undefined) {
      token = event.target.parentElement.parentElement.dataset.token
    }
    if (token.length === 0) {
      return
    }
    navigate("/disk/folder/" + token)
  }, [navigate])
  
  // Files events
  useEffect(() => {
    const targetElems:any = [...Array.from(document.getElementsByClassName("rendered-file"))]

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
  }, [currentSortType, currentSortBy, currentRenderType, isUpdated, navigate, DoubleTapEvent])


  // Bin file
  function BinFile(fileToken:string) {
    const binFile = async () => {
      let token = localStorage.getItem("token")
      await fetch(apiUrl + "files/bin/" + fileToken, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token === null ? "" : token,
        },
      })
      .then((res) => {
        CheckForError(res.status)
      })
      .then(() => setIsUpdate(!isUpdate))
      .catch(error => {
        ShowError("Failed to remove folder", error.message)
      })
    }
    binFile()
  }

  // Rename file
  function handleRename() {
    let newName = newNameInputRef.current.value + selectedItem.name.slice(selectedItem.name.lastIndexOf('.'))
    if (newName.length === 0 || newName.length > 30) {
      // Show error
      return
    }

    let oldName = selectedItem.name
    let elems = filesResponse?.filter(x => x.token !== null)
    if (elems !== undefined) {
      elems[elems.findIndex(x => x.token === selectedItem.token)].name = newName
      setFilesResponse(elems)
    }

    const getData = async () => {
      let token = localStorage.getItem("token")
      await fetch(apiUrl + "files/name/" + selectedItem.token, {
        method: 'PATCH',
        body: JSON.stringify({
          "name": newName
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": token === null ? "" : token,
        },
      })
      .then((res) => {
        CheckForError(res.status)
      })
      .catch(error => {
        ShowError("Failed to rename file", error.message)
        let elems = filesResponse?.filter(x => x.token !== null)
        if (elems !== undefined) {
          elems[elems.findIndex(x => x.token === selectedItem.token)].name = oldName
          setFilesResponse(elems)
        }
      })
    }
    getData()
    modalRenameClose()
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
        CheckForError(res.status)
      })
      .catch(error => {
        ShowError("Failed to elect file", error.message)
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
  async function DownloadFile(fileToken:string, fileName:string) {
    let token = localStorage.getItem("token")
    await fetch(apiUrl + "files/download/" + fileToken, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token === null ? "" : token,
      },
    })
    .then(resp => {
      CheckForError(resp.status)
      if (resp.status === 200) {
        resp.headers.get('Content-Disposition');
        return resp.blob()
      } else {
        throw new Error('something went wrong')
      }
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url); 
    })
    .catch(error => {
      ShowError("Failed to download file", error.message)
    });
  }

  const [alertText, setAlertText] = useState("Something went wrong")
  const [alertTitle, setAlertTitle] = useState("Error!")
  const [alertType, setAlertType] = useState("error")
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  function ShowError(text:string, title:string, type:string = "error") {
    setAlertType(type)
    setIsAlertOpen(false)
    setAlertText(text)
    setAlertTitle(title)
    setTimeout(() => {
      setIsAlertOpen(true)
    }, 250);
  }




  return (filesResponse === undefined) ? (
    <main className="h-[calc(100%-44px)] sm:h-[calc(100%-48px)] w-full flex items-center justify-center">
      <Loading></Loading>
    </main>
    ) : (filesResponse === null) ? ( // error
      <DiskErrorResponse code={lastResponseStatus} title={currentError} text="Failed to get folder"></DiskErrorResponse>
    ) : (filesResponse.length === 0) ? (
      <EmptyData title="Files storage is empty" 
      text="You don't have files, add them to the main storage"></EmptyData>
    ) : (
    <main className="py-4">
      {currentRenderType === "list" ? (
        <div>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 
          gap-x-2 gap-y-1 transition-all h-auto">
            {SortFiles(filesResponse, currentSortType, currentSortBy).map((item, index) => (
              <div key={index} data-token={item.folderToken}
              className="text-textLight dark:text-textDark
              hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark 
              text-lg rounded-lg rendered-file h-full w-full relative
              bg-backgroundSecondLight dark:bg-backgroundSecondDark transition-colors">
                <div className="flex px-2 py-1 flex-row justify-between">
                  <div className="flex flex-row items-center space-x-2 
                  pointer-events-none max-w-[calc(100dvw-88px)] sm:max-w-[calc(100dvw-348px)] 
                  md:max-w-[calc(100dvw-358px)] lg:max-w-[calc(100%-60px)]"
                  data-token={item.folderToken}>
                    <div className="h-6 w-6 flex items-center justify-center">
                      <Suspense fallback={<div></div>}>
                        <FileIcon fileType={item.name.slice(item.name.lastIndexOf('.') + 1)} 
                        classes="fill-textLight dark:fill-textDark h-6 w-6"></FileIcon>
                      </Suspense>
                    </div>
                    <div className="truncate">{item.name}</div>
                  </div>
                  <div className="flex flex-row items-center" data-token={item.folderToken}>
                    {/* Info */}
                    <div className="w-6 sm:w-7 mg:w-8">
                      <div className="w-6 sm:w-7 mg:w-8 hover-first-info">
                        <IconInfo classes="h-6 w-6" fillClasses="fill-textLight dark:fill-textDark"></IconInfo>
                      </div>
                      <div className="hover-second-info px-1 overflow-hidden text-base whitespace-pre z-10
                      bg-backgroundThirdLight dark:bg-backgroundThirdDark rounded text-gray-700 dark:text-gray-400"
                      data-token={item.folderToken}>
                      <div className="space-x-1">
                        <span className="text-sm">Parent folder:</span>
                        <span className="text-base text-textLight dark:text-textDark">{item.folderName}</span>
                      </div>
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
                      <div data-token={item.folderToken}
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
                      bg-backgroundThirdLight dark:bg-backgroundThirdDark rounded overflow-hidden"
                      data-token={item.folderToken}>
                        <button data-name={item.name} data-token={item.token} onClick={modalRenameOpen}
                        className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark py-1 px-1.5">
                          <IconEdit classes="h-5 w-5" fillClasses="fill-textLight dark:fill-textDark"></IconEdit>
                        </button>
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
                        onClick={() => DownloadFile(item.token, item.name)}>
                          <IconDownload classes="h-5 w-5 stroke-textLight dark:stroke-textDark"></IconDownload>
                        </button>
                        <button className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark py-1 px-1.5"
                        onClick={() => BinFile(item.token)}>
                          <IconBin classes="h-5 w-5" fillClasses="fill-textLight dark:fill-textDark"></IconBin>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : ( // table
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
              </tr>
            </thead>
            <tbody>
              {SortFiles(filesResponse, currentSortType, currentSortBy).map((item, index) => (
                <tr key={index} data-token={item.folderToken}
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
                  <td className="font-medium text truncate max-w-[1px]">{item.name}</td>
                  <td>{CutSize(item.fileSize * 10)}</td>
                  <td className="hidden lg:table-cell">{item.createdAt}</td>
                  {/* Edit */}
                  <td className="text-center" data-token={item.folderToken}>
                    <div className="flex hover-child justify-center items-center h-full">
                      <button data-name={item.name} data-token={item.token} onClick={modalRenameOpen}>
                        <IconEdit classes="h-5 w-5" fillClasses="fill-textLight dark:fill-textDark"></IconEdit>
                      </button>
                    </div>
                  </td>
                  {/* Delete */}
                  <td className="text-center" data-token={item.folderToken}>
                    <div className="flex hover-child justify-center items-center h-full">
                      <button onClick={() => BinFile(item.token)}>
                        <IconBin classes="h-5 w-5" fillClasses="fill-textLight dark:fill-textDark"></IconBin>
                      </button>
                    </div>
                  </td>
                  {/* Info watches and downloads */}
                  <td>
                    <div className="hover-first-info">
                      <IconInfo classes="w-6 h-6 ml-0 sm:ml-0.5 md:ml-1" fillClasses="fill-textLight dark:fill-textDark"></IconInfo>
                    </div>
                    <div className="hover-second-info ml-4 bg-backgroundThirdLight dark:bg-backgroundThirdDark px-2 py-1 rounded z-10"
                    data-token={item.folderToken}>
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
                  <td className="text-center">
                    <div className="flex justify-center items-center h-full" data-token={item.folderToken}>
                      <button onClick={() => DownloadFile(item.token, item.name)}>
                        <IconDownload classes="w-5 h-5 stroke-textLight dark:stroke-textDark"></IconDownload>
                      </button>
                    </div>
                  </td>
                  {/* Star */}
                  <td className="text-center">
                    <div className="flex justify-center items-center h-full" data-token={item.folderToken}>
                      <button onClick={() => ElectFile(item.token)}>
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
      )}


      {/* Rename file/folder */}
      <Modal open={isRenameModalOpen}
        onClose={modalRenameClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={modalWindowStyle}>
          <div className="text-textLight dark:text-textDark p-4 rounded-lg
          bg-backgroundSecondLight dark:bg-backgroundSecondDark min-w-xs">
            <p className=" text-2xl font-semibold">Rename</p>
            <input className=" my-4 w-full border border-borderLight dark:border-borderDark 
            text-textLight text-sm rounded-lg block p-2 dark:focus:border-textDark
            focus:border-textLight bg-backgroundThirdLight dark:bg-backgroundThirdDark
            dark:placeholder-gray-400 dark:text-textDark "
            type="text" placeholder={selectedItem === undefined ? "name"
              : "last file name: " + selectedItem.name}
            defaultValue={selectedItem !== undefined && 
              (selectedItem.name.lastIndexOf('.') > 0 ? selectedItem.name.slice(0, selectedItem.name.lastIndexOf('.')) : selectedItem.name)}
            ref={newNameInputRef}></input>
            <div className="flex justify-end text-base gap-2">
              <button className=" hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark
              px-4 rounded-full transition-colors"
              onClick={modalRenameClose}>
                Calcel
              </button>
              <button className=" bg-buttonLight dark:bg-buttonDark rounded-full px-5 py-1
              hover:bg-buttonHoverLight hover:dark:bg-buttonHoverDark transition-colors"
              onClick={handleRename}>
                OK
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      
      <Suspense fallback={<div></div>}>
        <AlertButton open={isAlertOpen} text={alertText} title={alertTitle}
        type={alertType} close={() => setIsAlertOpen(false)}></AlertButton>
      </Suspense>
    </main>
  )
})
export default RenderFilesData