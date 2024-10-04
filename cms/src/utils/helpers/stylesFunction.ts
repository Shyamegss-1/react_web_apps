import * as IFC from "./helper.interface";

//------------------------------------------------------------

export const HEIGHTOPR: IFC.ifHeight = (id, value) => {
  if (value !== "") {
    const element = document.getElementsByClassName(id)[0] as HTMLElement;
    element.style.height = String(value);
  }
};

export const WIDTHOPR: IFC.ifHeight = (id, value) => {
  if (value !== "") {
    const element = document.getElementsByClassName(id)[0] as HTMLElement;
    element.style.width = String(value);
  }
};

export const PADDINGOPR: IFC.elSpacing = (id, value, side) => {
  if (value !== "") {
    const element = document.getElementsByClassName(id)[0] as HTMLElement;
    element.style[side as any] = String(value);
  }
};

export const MARGINOPR: IFC.elSpacing = (id, value, side) => {
  if (value !== "") {
    const element = document.getElementsByClassName(id)[0] as HTMLElement;
    element.style[side as any] = String(value);
  }
};

export const STYLEINFO: IFC.ifStyle = (id, prop) => {
  const element = document
    .getElementsByClassName(id)[0]
    ?.computedStyleMap()
    ?.get(prop);
  return element;
};

export const IMGEDIT: IFC.ifStyle = (id) => {
  const holder = document.getElementsByClassName(id)[0] as HTMLElement;
  let a = holder.querySelector("label");
  a?.setAttribute("src", "/home/");
};

declare global {
  interface Window {
    globalFunction: (value: string) => void;
  }
}

window.globalFunction = (value) => {
  console.log(value);
};
