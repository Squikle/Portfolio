import { RefObject, useEffect } from "react";
import { useCurrentSectionContext } from "../../Page/CurrentPageContext/Contexts";

export default function useResumeScrollReset(
  scrollableElementRef: RefObject<HTMLElement>,
) {
  const { isActive } = useCurrentSectionContext();

  useEffect(() => {
    if (!scrollableElementRef.current) return;

    if (isActive)
      scrollableElementRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }, [isActive, scrollableElementRef]);
}
