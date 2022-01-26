/* eslint-disable @typescript-eslint/no-explicit-any */

export const dragElement = (elmnt: any, callbackFunc?: () => void): void => {
  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  let pos4 = 0;

  const closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  };
  const elementDrag = (e: MouseEvent) => {
    e = e || window.event;
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    console.log(`${elmnt.offsetTop - pos2}px`);

    elmnt.style.top = `${elmnt.offsetTop - pos2}px`;
    elmnt.style.left = `${elmnt.offsetLeft - pos1}px`;
  };
  const dragMouseDown = (e: MouseEvent) => {
    e = e || window.event;
    e.preventDefault();

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;

    if (callbackFunc) callbackFunc();
  };
  elmnt.onmousedown = dragMouseDown;
};
