import { RefObject, useEffect, useLayoutEffect, useState } from "react";

export default function (
  ref: RefObject<HTMLInputElement>,
  scrollElementId: string,
): boolean {
  const [isActive, setIsActive] = useState(false);

  /*useEffect(() => {
    const scrollElement = document.getElementById(scrollElementId);
    if (!ref.current?.className.includes("logo")) return;
    if (!scrollElement)
      throw new Error(
        "Couldn't retrieve scroll element with Id " + scrollElementId,
      );

    const updateActive = () => {
      console.log(ref);
      if (!ref.current) throw new Error("ref must be not null!");
      const rect = ref.current.getBoundingClientRect();
      const viewPortHeight =
        window.innerHeight || document.documentElement.clientHeight;

      const isTopInView = rect.top >= 0 && rect.top < viewPortHeight;
      const isBottomInView = rect.bottom > 0 && rect.bottom < viewPortHeight;
      const newIsActive =
        isTopInView || isBottomInView || (rect.top < 0 && rect.bottom > 0);
      console.log(rect.top);
      setIsActive(newIsActive);
    };

    updateActive();
    scrollElement.addEventListener("scroll", updateActive, false);
    return () => scrollElement.removeEventListener("scroll", updateActive);
  }, []);*/

  useLayoutEffect(() => {
    const rect = ref.current?.getBoundingClientRect();
    console.log(rect, ref.current);
  }, []);

  return isActive;
}
