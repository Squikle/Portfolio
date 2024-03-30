import { useEffect, useState } from "react";

type Control = {
  bind: () => void;
  unbind: () => void;
};

const NOOP = () => {};

export function useSwipeScroll(elementId: string): Control {
  const [bind, setBind] = useState(() => NOOP);
  const [unbind, setUnbind] = useState(() => NOOP);

  useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element)
      throw new Error("Couldn't retrieve element with id " + elementId);

    const { bind, unbind } = createSwipeScroll(element);
    setBind(() => bind);
    setUnbind(() => unbind);

    return unbind;
  }, []);

  return { bind, unbind };
}

const createSwipeScroll = (element: HTMLElement): Control => {
  let isBound: boolean = false;
  let yDown: number | null;
  let timeDown: number | null;
  let yDiff = null;
  const TIME_THRESHOLD = 150;
  const DIFF_THRESHOLD = 30;

  const handleTouchEnd = (e: TouchEvent) => {
    if (!yDown || !timeDown || !element) return;

    let timeDiff = Date.now() - timeDown;
    if (timeDiff > TIME_THRESHOLD) {
      return;
    }

    const clientY = e.changedTouches[0].clientY;

    yDiff = ((yDown - clientY) / element.offsetHeight) * 100;

    let scrollByY = 0;
    if (Math.abs(yDiff) > DIFF_THRESHOLD) {
      if (yDiff > 0) scrollByY = element.offsetHeight;
      else scrollByY = -element.offsetHeight;
    }

    element.scrollBy({ top: scrollByY });
    yDown = null;
    timeDown = null;
  };

  const handleTouchStart = (evt: TouchEvent) => {
    timeDown = Date.now();
    yDown = evt.touches[0].clientY;
    yDiff = 0;
  };

  const bindElement = (element: HTMLElement) => {
    if (isBound) return;
    element.addEventListener("touchstart", handleTouchStart, {
      passive: true,
      capture: false,
    });
    element.addEventListener("touchend", handleTouchEnd, false);
    isBound = true;
  };

  const unbindElement = (element: HTMLElement) => {
    element.removeEventListener("touchstart", handleTouchStart);
    element.removeEventListener("touchend", handleTouchEnd);
    isBound = false;
  };

  const bind = () => bindElement(element);
  const unbind = () => unbindElement(element);

  bind();
  return { bind, unbind };
};
