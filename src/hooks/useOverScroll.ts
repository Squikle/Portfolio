import { RefObject, useEffect } from "react";

export default function useOverScroll(
  swipeElementRef: RefObject<HTMLElement>,
  onSwipe: (overScrollPercent: number) => void,
) {
  useEffect(() => {
    const element = swipeElementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight) {
        const scrolledPastEnd =
          ((scrollTop + clientHeight - scrollHeight) / scrollHeight) * 100;
        if (onSwipe) onSwipe(scrolledPastEnd);
      }

      if (scrollTop < 0) {
        const scrolledPastTop = (scrollTop / scrollHeight) * 100;
        if (onSwipe) onSwipe(scrolledPastTop);
      }
    };

    element.addEventListener("scroll", handleScroll);

    return () => element.removeEventListener("scroll", handleScroll);
  }, [swipeElementRef, onSwipe]);
}
