export function CutSize(num: number, stage: number = 0):string {
  return num < 10240 ? num / 10 + (
    stage === 0 ? " B"
    : stage === 1 ? " KB"
    : stage === 2 ? " MB"
    : stage === 3 ? " GB" : " TB"
  ) : CutSize(Math.floor(num / 1024), stage+1)
}
export function CutNumber(num: number, stage: number = 0):string {
  return num < 1000 ? (
    stage === 0 ? num + " "
    : stage === 1 ? num + "k"
    : stage === 2 ? num + "M"
    : "1B+"
  ) : CutNumber(Math.floor(num / 1000), stage+1)
}

// Date
export function GetCurrentYear():number {
  var currentTime = new Date()
  return currentTime.getFullYear()
}
export function GetCurrentDate():string {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  return yyyy + '-' + mm + '-' + dd;
}

export function IsNumeric(n:any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function RotateArray(arr:any[]) {
  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    let temp = arr[i];
    arr[i] = arr[arr.length - 1 - i]
    arr[arr.length - 1 - i] = temp
  }
  return arr
}