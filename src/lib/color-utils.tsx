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

export function GetColorGradient(hex:string, count:number):string[] {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  var r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16);
  var rindex = Math.floor(r / count),
    gindex = Math.floor(g / count),
    bindex = Math.floor(b / count);
  
  let result:string[] = []
  for (let i = 0; i < count; i++) {
    result.push('#' + padZero((r - rindex * i).toString(16)) 
      + padZero((g - gindex * i).toString(16)) + padZero((b - bindex * i).toString(16)))
  }
  return result
}

function padZero(str:string) {
  let len:number = 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}