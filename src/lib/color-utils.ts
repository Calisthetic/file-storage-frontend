import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Dark mode
export const isDarkMode = ():boolean => ('theme' in localStorage) 
  ? (localStorage.theme === 'dark' ? true : false) 
  : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? true : false;

// Css variables
export function GetCSSValue(name: string, useTheme:boolean = true) {
  return getComputedStyle(document.documentElement).getPropertyValue(useTheme ? ('--' + name + (isDarkMode() ? "Dark" : "Light")) : ('--' + name))
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
  if (isDarkMode()) {
    if (r < 64 && g < 64 && b < 64) {
      r+=64
      g+=64
      b+=64
    }
  } else {
    if (r > 192 && g > 192 && b > 192) {
      r-=64
      g-=64
      b-=64
    }
  }
  var rindex = isDarkMode() ? Math.floor(r / count) : Math.floor((255 - r) / 4),
    gindex = isDarkMode() ? Math.floor(g / count) : Math.floor((255 - g) / 4),
    bindex = isDarkMode() ? Math.floor(b / count) : Math.floor((255 - b) / 4);
  
  let result:string[] = []
  for (let i = 0; i < count; i++) {
    if (isDarkMode()) {
      result.push('#' + padZero((r - rindex * i).toString(16)) 
        + padZero((g - gindex * i).toString(16)) + padZero((b - bindex * i).toString(16)))
    } else {
      result.push('#' + padZero((r + rindex * i).toString(16)) 
        +padZero((g + gindex * i).toString(16)) 
        +padZero((b + bindex * i).toString(16)))
    }
  }
  return result.reverse()
}

function padZero(str:string) {
  let len:number = 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}