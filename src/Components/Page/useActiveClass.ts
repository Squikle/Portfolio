import { RefObject, useEffect, useState } from "react";

export default function (ref: RefObject<HTMLInputElement>): boolean {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const updateActive = () => {
      if (!ref.current) throw new Error("ref must be not null!");

      const rect = ref.current.getBoundingClientRect();
      const viewHeight = Math.max(
        document.documentElement.clientHeight,
        window.outerHeight,
      );

      const newIsActive = !(rect.bottom <= 0 || rect.top - viewHeight >= 0);
      setIsActive(newIsActive);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, true);
    return () => window.removeEventListener("scroll", updateActive);
  }, []);

  return isActive;
}
