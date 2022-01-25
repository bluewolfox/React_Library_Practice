/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';

export const SmoothWheel: React.FC<{ children: JSX.Element; styles?: React.CSSProperties }> = ({
  children,
  styles,
}) => {
  const targetRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  const smoothScroll = (target: any, speed: number, smooth: number) => {
    if (target === document)
      target = document.scrollingElement || document.documentElement || document.body.parentNode || document.body; // cross browser support for document scrolling

    let moving = false;
    let pos = target.scrollTop;
    const frame = target === document.body && document.documentElement ? document.documentElement : target; // safari is the new IE

    function normalizeWheelDelta(e: any) {
      if (e.detail) {
        if (e.wheelDelta) return (e.wheelDelta / e.detail / 40) * (e.detail > 0 ? 1 : -1);
        // Opera
        return -e.detail / 3; // Firefox
      }
      return e.wheelDelta / 120; // IE,Safari,Chrome
    }

    const requestFrame = (function () {
      // requestAnimationFrame cross browser
      return (
        window.requestAnimationFrame ||
        function (func) {
          window.setTimeout(func, 1000 / 50);
        }
      );
    })();

    function update() {
      moving = true;

      const delta = (pos - target.scrollTop) / smooth;

      target.scrollTop += delta;

      if (Math.abs(delta) > 0.5) requestFrame(update);
      else moving = false;
    }

    function scrolled(e: any) {
      e.preventDefault(); // disable default scrolling

      const delta = normalizeWheelDelta(e);

      pos += -delta * speed;
      pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)); // limit scrolling

      if (!moving) update();
    }

    target.addEventListener('mousewheel', scrolled, { passive: false });
    target.addEventListener('DOMMouseScroll', scrolled, { passive: false });
  };
  useEffect(() => {
    if (!mounted) setMounted(true);
    if (mounted && targetRef.current) smoothScroll(targetRef.current, 120, 12);
  }, [mounted]);

  return (
    <div className="smoothScroll" ref={targetRef} style={{ maxHeight: 500, width: 100, overflow: 'auto', ...styles }}>
      {children}
    </div>
  );
};
