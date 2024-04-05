import { RefObject, useEffect } from "react";
import styles from "./FadeScroll.module.scss";

export default function useFadeScroll(
  scrollableElementRef: RefObject<HTMLElement>,
) {
  useEffect(() => {
    const element = scrollableElementRef.current;
    if (!element) throw new Error("Scrollable element ref must be set!");

    const updateFadeEffect = () => {
      const isScrollable = element.scrollHeight > element.clientHeight;

      if (!isScrollable) {
        element.classList.remove(styles.fadeBottom, styles.fadeTop);
        return;
      }

      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;

      const maxScrollHeight = scrollHeight - clientHeight;
      const currentScrollPercentage = (scrollTop / maxScrollHeight) * 100;

      element.classList.toggle(
        styles.fadeBottom,
        currentScrollPercentage < 100,
      );
      element.classList.toggle(styles.fadeTop, currentScrollPercentage > 0);
    };

    element.addEventListener("scroll", updateFadeEffect);
    updateFadeEffect();

    return () => element.removeEventListener("scroll", updateFadeEffect);
  }, [scrollableElementRef]);
}
