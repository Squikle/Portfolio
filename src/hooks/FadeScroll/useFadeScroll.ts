import { RefObject, useLayoutEffect } from "react";
import styles from "./FadeScroll.module.scss";

export default function useFadeScroll(
  scrollableElementRef: RefObject<HTMLElement>,
) {
  useLayoutEffect(() => {
    const element = scrollableElementRef.current;
    if (!element) return;

    const handleScroll = () => {
      updateFadeEffect(element.scrollHeight, element.clientHeight);
    };

    const updateFadeEffect = (scrollHeight: number, clientHeight: number) => {
      scrollHeight ??= element.scrollHeight;
      clientHeight ??= element.clientHeight;
      const isScrollable = scrollHeight > clientHeight;

      if (!isScrollable) {
        element.classList.remove(styles.fadeBottom, styles.fadeTop);
        return;
      }

      const scrollTop = element.scrollTop;

      const maxScrollHeight = scrollHeight - clientHeight;
      const currentScrollPercentage = (scrollTop / maxScrollHeight) * 100;

      element.classList.toggle(
        styles.fadeBottom,
        currentScrollPercentage < 100,
      );
      element.classList.toggle(styles.fadeTop, currentScrollPercentage > 0);
    };

    element.addEventListener("scroll", handleScroll);
    handleScroll();

    const handleResize = (entries: ResizeObserverEntry[]) => {
      const { scrollHeight, clientHeight } = entries[0]?.target;
      updateFadeEffect(scrollHeight, clientHeight);
      resizeObserver.disconnect();
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(element);

    return () => element.removeEventListener("scroll", handleScroll);
  }, [scrollableElementRef]);
}
