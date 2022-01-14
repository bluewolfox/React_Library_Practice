type pos = 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom' | 'center' | 'center-bottom';
type PositionModule = (arg: {
  alertRoot: HTMLDivElement;
  rootClass?: string;
  position?: pos;
  target: HTMLElement | null;
}) => void;

export const setPosition: PositionModule = ({ alertRoot, rootClass, position, target }) => {
  alertRoot.classList.add('alert-layout-wrapper');
  if (rootClass) alertRoot.classList.add(rootClass);
  alertRoot.style.position = 'fixed';

  if (!target) {
    if (position) {
      switch (position) {
        case 'center': {
          alertRoot.style.left = `50%`;
          alertRoot.style.top = `0`;
          alertRoot.style.transform = `translateX(-50%)`;
          break;
        }
        case 'left-bottom': {
          alertRoot.style.left = `0`;
          alertRoot.style.bottom = `0`;
          break;
        }
        case 'left-top': {
          alertRoot.style.left = `0`;
          alertRoot.style.top = `0`;
          break;
        }
        case 'right-bottom': {
          alertRoot.style.right = `0`;
          alertRoot.style.bottom = `0`;
          break;
        }
        default: {
          alertRoot.style.right = `0`;
          alertRoot.style.top = `0`;
          break;
        }
      }
    } else {
      alertRoot.style.right = '0px';
      alertRoot.style.top = '0px';
    }
  } else {
    const targetRect = target.getBoundingClientRect();

    const t_left = targetRect.x;
    const t_right = targetRect.x + targetRect.width;
    const t_top = targetRect.y;
    const t_bottom = targetRect.y + targetRect.height;

    if (position) {
      switch (position) {
        case 'center': {
          alertRoot.style.left = `50%`;
          alertRoot.style.top = `${t_top}px`;
          alertRoot.style.transform = `translateX(-50%)`;
          break;
        }
        case 'center-bottom': {
          alertRoot.style.left = `50%`;
          alertRoot.style.top = `${t_bottom}px`;
          alertRoot.style.transform = `translateX(-50%)`;
          break;
        }
        case 'left-bottom': {
          alertRoot.style.left = `${t_left}px`;
          alertRoot.style.top = `${t_bottom}px`;
          break;
        }
        case 'left-top': {
          alertRoot.style.left = `${t_left}px`;
          alertRoot.style.top = `${t_top}px`;
          break;
        }
        case 'right-bottom': {
          alertRoot.style.left = `${t_right}px`;
          alertRoot.style.top = `${t_bottom}px`;
          break;
        }
        case 'right-top': {
          alertRoot.style.left = `${t_right}px`;
          alertRoot.style.top = `${t_top}px`;
          break;
        }
      }
    } else {
      alertRoot.style.right = '0px';
      alertRoot.style.top = '0px';
    }
  }
};
