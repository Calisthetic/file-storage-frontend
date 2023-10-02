import { useState, useRef, useEffect, useCallback, FunctionComponent, memo, lazy, Suspense } from "react"
import { useNavigate, useParams } from 'react-router-dom';

import "../../../styles/focus-elems.css"
import { CutNumber, CutSize, IsNumeric } from "../../../lib/utils";
import { GetCSSValue, BlurColor, cn, isDarkMode} from "../../../lib/color-utils";
// @ts-ignore
import Hammer from 'hammerjs';
import { modalWindowStyle } from "../../../data/style/modal-styles";
import { apiUrl } from "../../../data/data";

const FileIcon = lazy(() => import("../file-icon"));
const FolderAccessModal = lazy(() => import("./folder-access-modal"));
const IconInfo = lazy(() => import("../../../components/icons/IconInfo"));
const IconLink = lazy(() => import("../../../components/icons/IconLink"));
const IconEdit = lazy(() => import("../../../components/icons/IconEdit"));
const IconDownload = lazy(() => import("../../../components/icons/IconDownload"));
const IconBin = lazy(() => import("../../../components/icons/IconBin"));
const IconWatch = lazy(() => import("../../../components/icons/IconWatch"));
const IconTileStar = lazy(() => import("../../../components/icons/IconTileStar"));
const ColorPicker = lazy(() => import("../../../components/color-picker"));
const Box = lazy(() => import('@mui/material/Box'));
const Modal = lazy(() => import('@mui/material/Modal'));

type Props = {
  currentSortType: string
  currentSortBy:string
  currentRenderType:string
  updateTrigger:boolean
}

const RenderFolderData:FunctionComponent<Props> = memo(({currentSortType, currentSortBy, currentRenderType, updateTrigger}:Props) => {
  const newNameInputRef:any = useRef();
  const [selectedItem, setSelectedItem] = useState<any>();

  // Hide files and folders
  const [isFoldersVisible, setIsFoldersVisible] = useState(true)
  const [isFilesVisible, setIsFilesVisible] = useState(true)
  const visualizeFoldersRef:any = useRef()
  const visualizeFilesRef:any = useRef()

  function OpenCloseFolders() {
    setIsFoldersVisible(!isFoldersVisible)
    if (!isFoldersVisible) {
      visualizeFoldersRef.current.style.display = currentRenderType === "list" ? "grid" : "flex"
      setTimeout(() => {
        visualizeFoldersRef.current.style.height = "auto"
        visualizeFoldersRef.current.style.transform = "translate(0px, 0px)"
        visualizeFoldersRef.current.style.opacity = "1"
        setTimeout(() => {
          visualizeFoldersRef.current.style.transform = "initial"
        }, 250);
      }, 10);
    } else {
      visualizeFoldersRef.current.style.transform = "translate(0px, -16px)"
      visualizeFoldersRef.current.style.opacity = "0"
      setTimeout(() => {
        visualizeFoldersRef.current.style.height = "0px"
        visualizeFoldersRef.current.style.display = "none"
      }, 250);
    }
  }
  function OpenCloseFiles() {
    setIsFilesVisible(!isFilesVisible)
    if (!isFilesVisible) {
      visualizeFilesRef.current.style.display = currentRenderType === "list" ? "grid" : "flex"
      setTimeout(() => {
        visualizeFilesRef.current.style.height = "auto"
        visualizeFilesRef.current.style.transform = "translate(0px, 0px)"
        visualizeFilesRef.current.style.opacity = "1"
        setTimeout(() => {
          visualizeFilesRef.current.style.transform = "initial"
        }, 250);
      }, 10);
    } else {
      visualizeFilesRef.current.style.transform = "translate(0px, -16px)"
      visualizeFilesRef.current.style.opacity = "0"
      setTimeout(() => {
        visualizeFilesRef.current.style.height = "0px"
        visualizeFilesRef.current.style.display = "none"
      }, 250);
    }
  }

  // Modal windows
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const modalRenameOpen = (e:any) => {
    setIsRenameModalOpen(true)
    setSelectedItem(e.target.dataset)
  };
  const modalRenameClose = () => setIsRenameModalOpen(false);
  
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const modalAccessOpen = (e:any) => {
    setIsAccessModalOpen(true)
    setSelectedItem(e.target.dataset)
  };
  const modalAccessClose = () => setIsAccessModalOpen(false);

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
    fileType: string
    isElected: boolean,
  }
  
  const [foldersResponse, setFoldersResponse] = useState<FoldersResponse[]>();
  const [filesResponse, setFilesResponse] = useState<FilesResponse[]>();
  const [isUpdate, setIsUpdate] = useState(true)
  const [isUpdated, setIsUpdated] = useState(true)

  const params: any = useParams();
  if (params.id === undefined) {
    throw Error("Check params")
  }
  useEffect(() => {
    const getData = async () => {
      let token = localStorage.getItem("token")
      await fetch(apiUrl + "folder/" + params.id, {
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
        return res.json();
      })
      .then(data => {setFilesResponse(data.files); setFoldersResponse(data.folders); setIsUpdated(!isUpdated)})
      .catch(error => {
        console.log(error)
        //ShowError("User not found", "404")
      })
    }
    getData()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, isUpdate, updateTrigger])

  // Last moved item/folder data
  type MoveItemsProps = {
    dragged_id:string | undefined,
    target_id:string | undefined,
    dragged_type:string | undefined,
    target_type:string | undefined,
  }
  let lastMovedData = useRef({
    dragged_id:"",
    target_id:"",
    dragged_type:"",
    target_type:"",
  })

  // Mask to detect id and type of hover element
  const [isMaskActive, setIsMaskActive] = useState(false)
  const rootElem = document.getElementById("root")
  const navigate = useNavigate();

  // Move files/folders to folders
  const MoveItems = useCallback(({
    dragged_id, target_id,
    dragged_type, target_type,
  }:MoveItemsProps) => {
    if (!IsNumeric(target_id) || !IsNumeric(dragged_id)) {
      return false
    }
    if (target_type !== "folder" || dragged_type === undefined
    || target_id === undefined || dragged_id === undefined) {
      return false
    }
    if (target_id === dragged_id && target_type === dragged_type) {
      return false
    }
    if (lastMovedData.current.dragged_id === dragged_id
    && lastMovedData.current.target_id === target_id
    && lastMovedData.current.dragged_type === dragged_type
    && lastMovedData.current.target_type === target_type) {
      return false
    }
    setIsUpdate(!isUpdate)
    console.log("Target: " + target_type + ", id: " + target_id)
    console.log("Dragged: " + dragged_type + ", id: " + dragged_id)

    lastMovedData.current = {
      dragged_id: dragged_id,
      target_id: target_id,
      dragged_type: dragged_type,
      target_type: target_type,
    }
  }, [isUpdate])
  
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
  const PanEvent = useCallback((elem:HTMLElement, event:any) => {
    elem.style.transform = "translate(" + event.deltaX + "px, " + event.deltaY + "px)"
    if (event.isFinal) {
      elem.style.transform = "translate(0px, 0px)"
    }
  }, [])
  const PanStartEvent = useCallback((elem:HTMLElement) => {
    // Animations
    elem.style.transitionProperty = "initial"
    elem.style.transition = "initial"
    elem.style.zIndex = "16"
    elem.style.boxShadow = "0px 0px 5px -2px var(--shadow" + (isDarkMode() ? "Dark" : "Light") + ")"
    // Mask and cursor
    setIsMaskActive(true)
    if (rootElem) {
      rootElem.style.cursor = "grabbing"
    }
  }, [rootElem])
  const PanEndEvent = useCallback((elem: HTMLElement, event:any) => {
    // Animations
    elem.style.transitionProperty = "transform"
    elem.style.transition = "0.2s ease"
    setTimeout(() => {
      elem.style.transform = "initial"
      elem.style.boxShadow = "initial"
      setTimeout(() => {
        elem.style.zIndex = "initial"
        // Main moving action ! only PC works
        if (event.target.dataset.id && event.srcEvent.target.dataset.id && 
          event.srcEvent.target.dataset.type && event.target.dataset.type) {
          MoveItems({
            target_id: event.srcEvent.target.dataset.id,
            dragged_id: event.target.dataset.id,
            target_type: event.srcEvent.target.dataset.type,
            dragged_type: event.target.dataset.type,
          })
        }
      }, 200);
      // Mobile + PC version detect
      let targetElem = document.elementFromPoint(event.center.x, event.center.y) as HTMLElement
      if (targetElem) {
        MoveItems({
          target_id: targetElem.dataset.id,
          dragged_id: elem.dataset.id,
          target_type: targetElem.dataset.type,
          dragged_type: elem.dataset.type,
        })
      }
      // Mask and cursor
      setIsMaskActive(false)
      if (rootElem) {
        rootElem.style["cursor"] = "auto"
      }
    }, 10);
  }, [MoveItems, rootElem])

  // Folder/files events
  useEffect(() => {
    const targetElems:any = [...Array.from(document.getElementsByClassName("rendered-folder")),
    ...Array.from(document.getElementsByClassName("rendered-file"))]

    if (targetElems) {
      for (let i = 0; i < targetElems.length; i++) {
        var hammer_folders = new Hammer(targetElems[i]);
        hammer_folders.on('doubletap', (event:any) => DoubleTapEvent(event));
        hammer_folders.on('pan', (event:any) => PanEvent(targetElems[i], event));
        hammer_folders.on('panstart', () => PanStartEvent(targetElems[i]));
        hammer_folders.on('panend', (event:any) => PanEndEvent(targetElems[i], event));
      }
    }

    // Swith "on" => "off"
    return () => {
      if (targetElems) {
        for (let i = 0; i < targetElems.length; i++) {
          var hammer_folders = new Hammer(targetElems[i]);
          hammer_folders.off('doubletap', (event:any) => DoubleTapEvent(event));
          hammer_folders.off('pan', (event:any) => PanEvent(targetElems[i], event));
          hammer_folders.off('panstart', () => PanStartEvent(targetElems[i]));
          hammer_folders.off('panend', (event:any) => PanEndEvent(targetElems[i], event));
        }
      }
    }
  }, [currentSortType, currentSortBy, currentRenderType, isUpdated, navigate, 
  DoubleTapEvent, PanEvent, PanStartEvent, PanEndEvent, MoveItems])

  // Folder color
  function SetFolderColor(data:any) {
    // console.log("Folder - " + data.id);
    // console.log("Color - " + data.color)
    if (data.id === undefined || data.color === undefined) {
      // ShowError
      return;
    }

    let elems = foldersResponse?.filter(x => x.token === data.id)
    if (elems !== undefined && elems?.length > 0 && foldersResponse !== undefined) {
      let deleteIndex = foldersResponse.indexOf(elems[0])
      let lastColor = foldersResponse[deleteIndex].color
      let temp = foldersResponse.filter(x => x.token !== null)
      temp[deleteIndex].color = data.color
      setFoldersResponse(foldersResponse.filter(x => x.token !== data.id))
      setFoldersResponse(temp)

      const patchColor = async () => {
        let token = localStorage.getItem("token")
        await fetch(apiUrl + "folder/color/" + data.id, {
          method: 'PATCH',
          body: JSON.stringify({
            "color": data.color
          }),
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
        .then(() => {
        })
        .catch(error => {
          console.log(error)
          temp = foldersResponse.filter(x => x.token !== null)
          temp[deleteIndex].color = lastColor
          setFoldersResponse(foldersResponse.filter(x => x.token !== data.id))
          setFoldersResponse(temp)
        })
      }
      patchColor()
    } else {
      // not found
    }
  }

  // Bin folder
  function BinFolder(folderToken:string) {
    const binFolder = async () => {
      let token = localStorage.getItem("token")
      await fetch(apiUrl + "folder/bin/" + folderToken, {
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
    binFolder()
  }

  // Bin file
  function BinFile(fileToken:string) {
    const binFile = async () => {
      let token = localStorage.getItem("token")
      await fetch(apiUrl + "file/bin/" + fileToken, {
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
    binFile()
  }

  // Rename file/folder
  function handleRename() {
    let newName = selectedItem.type === "file" ? newNameInputRef.current.value + selectedItem.name.slice(selectedItem.name.lastIndexOf('.')) : newNameInputRef.current.value
    if (newName.length === 0 || newName.length > 20) {
      // Show error
      return
    }

    let oldName = selectedItem.name
    if (selectedItem.type === "file") {
      let elems = filesResponse?.filter(x => x.token !== null)
      if (elems !== undefined) {
        elems[elems.findIndex(x => x.token === selectedItem.token)].name = newName
        setFilesResponse(elems)
      }
    } else {
      let elems = foldersResponse?.filter(x => x.token !== null)
      if (elems !== undefined) {
        elems[elems.findIndex(x => x.token === selectedItem.token)].name = newName
        setFoldersResponse(elems)
      }
    }

    const getData = async () => {
      let token = localStorage.getItem("token")
      await fetch(apiUrl + selectedItem.type + "/name/" + selectedItem.token, {
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
        if (res.status === 400) {
          throw new Error('Bad request');
        }
        if (res.status === 404) {
          throw new Error('Not found');
        }
      })
      .catch(error => {
        console.log(error)
        if (selectedItem.type === "file") {
          let elems = filesResponse?.filter(x => x.token !== null)
          if (elems !== undefined) {
            elems[elems.findIndex(x => x.token === selectedItem.token)].name = oldName
            setFilesResponse(elems)
          }
        } else {
          let elems = foldersResponse?.filter(x => x.token !== null)
          if (elems !== undefined) {
            elems[elems.findIndex(x => x.token === selectedItem.token)].name = oldName
            setFoldersResponse(elems)
          }
        }
      })
    }
    getData()
    modalRenameClose()
  }

  // Elect folder
  function ElectFolder(folderToken:string) {
    const elect = async () => {
      let elems = foldersResponse?.filter(x => x.token !== null)
      if (elems !== undefined) {
        elems[elems.findIndex(x => x.token === folderToken)].isElected = !elems[elems.findIndex(x => x.token === folderToken)].isElected
        setFoldersResponse(elems)
      }

      let token = localStorage.getItem("token")
      await fetch(apiUrl + "folder/elect/" + folderToken, {
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
      await fetch(apiUrl + "file/elect/" + fileToken, {
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
    DownloadData(apiUrl + "file/download/" + fileToken)
  }
  // Download folder
  function DownloadFolder(folderToken:string) {
    DownloadData(apiUrl + "folder/download/" + folderToken)
  }
  function DownloadData(url:string) {
    const a = document.createElement('a')
    a.href = url
    a.download = url.split('/').pop() ?? ""
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }




  return (
    <main className="py-4">
      {(foldersResponse === undefined || filesResponse === undefined) ? null : currentRenderType === "list" ? (
        <div>
          <div className="px-2 mb-2 pb-1
          font-semibold text-base border-b border-borderLight dark:border-borderDark
          flex flex-row justify-between items-center opacity-80"
          onClick={OpenCloseFolders}>
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
                {isMaskActive ? (
                  <div data-token={item.token} data-type="folder" 
                  className="absolute h-full w-full z-20"></div>
                ) : null}
                <div className="flex px-2 py-1 flex-row justify-between">
                  <div className="flex flex-row items-center space-x-2 max-w-[calc(100dvw-88px)] 
                  sm:max-w-[calc(100dvw-348px)] md:max-w-[calc(100dvw-358px)] lg:max-w-[calc(100%-60px)]">
                    <button id={"open-folder-colors-" + item.token} aria-label="Folder colors"
                    className="w-6 focus-first-right flex flex-row">
                      <svg viewBox="0 0 20 16" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 0H2C.9 0 0 .9 0 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2h-8L8 0Z" 
                        fillRule="evenodd" className="transition-colors" fill={item.color ? ("#" + item.color) : "#888"}></path>
                      </svg>
                    </button>
                    {/* Color picker */}
                    <div className="bg-backgroundLight dark:bg-backgroundThirdDark w-max
                    focus-second-right rounded-lg text-base -mt-6 px-2 pb-2 pt-1 z-10">
                      <ColorPicker type="defaultt" currentColor={item.color} dataId={item.token} onSelect={SetFolderColor}></ColorPicker>
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
                        <button data-name={item.name}
                        data-access={item.accessType} data-token={item.token} onClick={modalAccessOpen}
                        className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark py-1 px-1.5">
                          <IconLink classes="h-5 w-5" fillClasses="fill-textLight dark:fill-textDark"></IconLink>
                        </button>
                        <button data-name={item.name} data-token={item.token} 
                        data-type="folder" onClick={modalRenameOpen}
                        className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark py-1 px-1.5">
                          <IconEdit classes="h-5 w-5" fillClasses="fill-textLight dark:fill-textDark"></IconEdit>
                        </button>
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
                        <button className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark py-1 px-1.5"
                        onClick={() => BinFolder(item.token)}>
                          <IconBin classes="h-5 w-5" fillClasses="fill-textLight dark:fill-textDark"></IconBin>
                        </button>
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
          onClick={OpenCloseFiles}>
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
              {isMaskActive ? (
                <div data-token={item.token} data-type="file" 
                className="absolute h-full w-full z-20"></div>
              ) : null}
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
                        <button data-name={item.name} data-token={item.token} data-type="file" onClick={modalRenameOpen}
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
                        onClick={() => DownloadFile(item.token)}>
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
                  {isMaskActive ? (
                    <td data-type="folder" data-token={item.token} 
                    className="absolute h-full w-full z-20"></td>
                  ) : null}
                  <td className="flex items-center justify-center h-8 flex-row">
                    <button data-type="folder" className="w-6 focus-first-right">
                      <svg viewBox="0 0 20 16" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 0H2C.9 0 0 .9 0 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2h-8L8 0Z" 
                        fillRule="evenodd" className="transition-colors" fill={item.color ? ("#" + item.color) : "#888"}></path>
                      </svg>
                    </button>
                    <div className="focus-second-right bg-backgroundLight dark:bg-backgroundThirdDark 
                    rounded-lg text-base px-2 pb-2 pt-1 z-10 w-max" data-intable="true">
                      <ColorPicker type="default" currentColor={item.color} dataId={item.token} onSelect={SetFolderColor}></ColorPicker>
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
                      <button data-name={item.name}
                      data-access={item.accessType} data-token={item.token} onClick={modalAccessOpen}>
                        <IconLink classes="h-5 w-5" fillClasses="fill-textLight dark:fill-textDark"></IconLink>
                      </button>
                    </div>
                  </td>
                  {/* Edit */}
                  <td className="text-center">
                    <div className="flex hover-child justify-center items-center h-full">
                      <button data-name={item.name} data-token={item.token} data-type="folder" onClick={modalRenameOpen}>
                        <IconEdit classes="h-5 w-5" fillClasses="fill-textLight dark:fill-textDark"></IconEdit>
                      </button>
                    </div>
                  </td>
                  {/* Delete */}
                  <td 
                  className="text-center">
                    <div data-type="folder" 
                    className="flex hover-child justify-center items-center h-full">
                      <button data-type="folder" onClick={() => BinFolder(item.token)}>
                        <IconBin classes="h-5 w-5" fillClasses="fill-textLight dark:fill-textDark"></IconBin>
                      </button>
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
                  {isMaskActive ? (
                    <td data-token={item.token} data-type="file"
                    className="absolute h-full w-full z-20"></td>
                  ) : null}
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
                  {/* Edit */}
                  <td data-type="file" 
                  className="text-center">
                    <div className="flex hover-child justify-center items-center h-full">
                      <button data-name={item.name} data-token={item.token} data-type="file" onClick={modalRenameOpen}>
                        <IconEdit classes="h-5 w-5" fillClasses="fill-textLight dark:fill-textDark"></IconEdit>
                      </button>
                    </div>
                  </td>
                  {/* Delete */}
                  <td data-type="file" className="text-center">
                    <div className="flex hover-child justify-center items-center h-full">
                      <button data-type="file" onClick={() => BinFile(item.token)}>
                        <IconBin classes="h-5 w-5" fillClasses="fill-textLight dark:fill-textDark"></IconBin>
                      </button>
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
          onClick={OpenCloseFolders}>
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
                {isMaskActive ? (
                  <div data-token={item.token} data-type="folder" 
                  className="absolute h-full w-full z-20"></div>
                ) : null}
                {/* Actions */}
                <div data-type="folder" 
                className="h-6 flex flex-row justify-around flex-nowrap">
                  <div data-type="folder" className="hover-child">
                    <button data-name={item.name} data-type="folder"
                    data-access={item.accessType} data-token={item.token} onClick={modalAccessOpen}
                    className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark p-0.5">
                      <IconLink classes="h-5 w-5" fillClasses="fill-textLight dark:fill-textDark"></IconLink>
                    </button>
                    <button data-type="folder" onClick={() => DownloadFolder(item.token)}
                    className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark p-0.5">
                      <IconDownload classes="w-5 h-5 stroke-textLight dark:stroke-textDark"></IconDownload>
                    </button>
                    <button data-type="folder" onClick={() => BinFolder(item.token)}
                    className="hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark p-0.5">
                      <IconBin classes="h-5 w-5" fillClasses="fill-textLight dark:fill-textDark"></IconBin>
                    </button>
                  </div>
                </div>
                {/* Main icon */}
                <div data-type="folder" className="px-2 flex flex-col">
                  <button data-token={item.token} data-type="folder" 
                  className="focus-first-bottom">
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
                  </button>
                  {/* Color picker */}
                  <div className="bg-backgroundLight dark:bg-backgroundThirdDark z-10 w-max
                  focus-second-bottom rounded-lg text-base px-2 pb-2 pt-1 mt-[112px] -ml-[20px]">
                    <ColorPicker type="default" currentColor={item.color} dataId={item.token} onSelect={SetFolderColor}></ColorPicker>
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
                  <button className="text-center pointer-events-auto transition-all whitespace-pre-wrap hover:underline" 
                 data-name={item.name} data-token={item.token} data-type="folder" onClick={modalRenameOpen}>
                    {item.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="px-2 lg:col-span-2 xl:col-span-3 2xl:col-span-4 mb-2 pb-1 mt-4
          font-semibold text-base border-b border-borderLight dark:border-borderDark
          flex flex-row justify-between items-center opacity-80"
          onClick={OpenCloseFiles}>
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
              {isMaskActive ? (
                <div data-token={item.token} data-type="file" 
                className="absolute h-full w-full z-20"></div>
              ) : null}
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
                        <button data-name={item.name} data-token={item.token} data-type="file" onClick={modalRenameOpen}
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
                        onClick={() => DownloadFile(item.token)}>
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
              : "last " + selectedItem.type + " name: " + selectedItem.name}
            defaultValue={selectedItem !== undefined && (selectedItem.type === "file" ? 
              (selectedItem.name.lastIndexOf('.') > 0 ? selectedItem.name.slice(0, selectedItem.name.lastIndexOf('.')) : selectedItem.name) : selectedItem.name)}
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

      {/* Folder access */}
      <Modal open={isAccessModalOpen}
        onClose={modalAccessClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={modalWindowStyle}>
          <FolderAccessModal folderId={selectedItem !== undefined && selectedItem.id} 
          folderName={selectedItem !== undefined && selectedItem.name} 
          folderToken={selectedItem !== undefined && selectedItem.token}
          folderCurrentAccess={selectedItem !== undefined && selectedItem.access}>
            <button onClick={modalAccessClose} 
            className="bg-buttonLight dark:bg-buttonDark transition-colors rounded-full px-4 py-1
            hover:bg-buttonHoverLight hover:dark:bg-buttonHoverDark">
              Ready
            </button>
          </FolderAccessModal>
        </Box>
      </Modal>
    </main>
  )
})
export default RenderFolderData