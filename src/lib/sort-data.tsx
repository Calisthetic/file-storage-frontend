export const SortFiles = (array:any[], currentSortType:string, currentSortBy:string):any[] => {
  return array.sort((a:any, b:any) => {
    if (currentSortType === "name" ? a.name < b.name
    : currentSortType === "type" 
      ? a.name.lastIndexOf('.') + 1 === a.name.length ? false
      : b.name.lastIndexOf('.') + 1 === b.name.length ? true 
        : a.name.slice(a.name.lastIndexOf('.') + 1) < b.name.slice(b.name.lastIndexOf('.') + 1)
      : currentSortType === "size" ? a.fileSize < b.fileSize
      : a.createdAt < b.createdAt) 
    { return currentSortBy === "descending" ? 1 : -1;}
    if (currentSortType === "name" ? a.name > b.name
    : currentSortType === "type" 
      ? a.name.lastIndexOf('.') + 1 === a.name.length ? true
      : b.name.lastIndexOf('.') + 1 === b.name.length ? false 
        : a.name.slice(a.name.lastIndexOf('.') + 1) > b.name.slice(b.name.lastIndexOf('.') + 1)
    : currentSortType === "size" ? a.fileSize > b.fileSize
    : a.createdAt > b.createdAt) 
    { return currentSortBy === "descending" ? -1 : 1; }
    return 0;
  })
}

export const SortFolders = (array:any[], currentSortType:string, currentSortBy:string):any[] => {
  return array.sort((a, b) => {
    if (currentSortType === "size" ? a.size < b.size
      : currentSortType === "date" ? a.createdAt < b.createdAt
      : a.name < b.name) 
    { return currentSortBy === "descending" ? 1 : -1; }
    if (currentSortType === "size" ? a.size > b.size
      : currentSortType === "date" ? a.createdAt > b.createdAt
      : a.name > b.name) 
    { return currentSortBy === "descending" ? -1 : 1; }
    return 0;
  })
}