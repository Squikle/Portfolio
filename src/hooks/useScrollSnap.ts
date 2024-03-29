import { RefObject, useEffect } from "react";
import createScrollSnap, { ScrollSnapSettings } from "scroll-snap";

export default function useScrollSnap(
  ref: RefObject<HTMLElement>,
  settings: ScrollSnapSettings,
  callback?: () => void,
) {
  useEffect(() => {
    const element = ref.current;

    if (element) {
      const { unbind } = createScrollSnap(element, settings, callback);
      return () => unbind();
    }
  }, []);
}
