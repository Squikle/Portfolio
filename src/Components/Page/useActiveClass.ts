import { RefObject, useEffect } from "react";

type Callback = (isActive: boolean) => void;

export default function (
  ref: RefObject<HTMLInputElement>,
  onUpdate: Callback,
): void {
  useEffect(() => {
    const updateActive = () => {
      if (!ref.current) throw new Error("ref must be not null!");

      const rect = ref.current.getBoundingClientRect();
      const viewHeight = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight,
      );

      const isActive = !(rect.bottom <= 0 || rect.top - viewHeight >= 0);
      if (onUpdate) onUpdate(isActive);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, true);
    return () => window.removeEventListener("scroll", updateActive);
  }, [onUpdate]);
}
