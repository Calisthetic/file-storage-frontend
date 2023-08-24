import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Dark mode
export let isDarkMode:boolean = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? true : false;

// Css variables
export function GetCSSValue(name: string) {
  return getComputedStyle(document.body).getPropertyValue('--' + name + (isDarkMode ? "Dark" : "Light"))
}

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

// white to black
export function InvertColor(hex:string) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
    g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
    b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
  return '#' + padZero(r) + padZero(g) + padZero(b);
}

export function BlurColor(hex:string, value: number) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  var temp_r = parseInt(hex.slice(0, 2), 16) + value,
    temp_g = parseInt(hex.slice(2, 4), 16) + value,
    temp_b = parseInt(hex.slice(4, 6), 16) + value;
  var r = temp_r > 255 ? (temp_r - 255).toString(16) : temp_r < 0 ? "0" : temp_r.toString(16),
    g = temp_g > 255 ? (temp_g - 255).toString(16) : temp_g < 0 ? "0" : temp_g.toString(16),
    b = temp_b > 255 ? (temp_b - 255).toString(16) : temp_b < 0 ? "0" : temp_b.toString(16);
  return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str:string) {
  let len:number = 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}



export function IsNumeric(n:any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}