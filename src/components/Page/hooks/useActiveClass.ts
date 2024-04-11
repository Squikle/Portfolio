import { RefObject, useEffect, useState } from "react";

export default function useActiveClass(
  ref: RefObject<HTMLInputElement>,
  scrollElementId: string,
): boolean {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const scrollElement = document.getElementById(scrollElementId);
    if (!scrollElement)
      throw new Error(
        "Couldn't retrieve scroll element with Id " + scrollElementId,
      );

    const updateActive = () => {
      if (!ref.current) throw new Error("ref must be not null!");

      const rect = ref.current.getBoundingClientRect();
      const viewPortHeight =
        window.innerHeight || document.documentElement.clientHeight;

      const isTopInView = rect.top >= 0 && rect.top < viewPortHeight;
      const isBottomInView = rect.bottom > 0 && rect.bottom < viewPortHeight;
      const newIsActive =
        isTopInView || isBottomInView || (rect.top < 0 && rect.bottom > 0);
      setIsActive(newIsActive);
    };

    updateActive();
    scrollElement.addEventListener("scroll", updateActive, false);
    return () => scrollElement.removeEventListener("scroll", updateActive);
  }, []);

  return isActive;
}
