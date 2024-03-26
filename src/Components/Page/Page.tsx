import React, { ReactNode, useCallback, useRef, useState } from "react";
import useActiveClass from "./useActiveClass";
import { CurrentPageContextProvider } from "./CurrentPageContext/Contexts";

type Props = {
  className?: string;
  children?: ReactNode;
  onActiveUpdate?: (active: boolean) => void;
};

export default function Page({ className, children, onActiveUpdate }: Props) {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const handleActiveUpdate = useCallback(
    (active: boolean) => {
      setIsActive(active);
      if (onActiveUpdate) onActiveUpdate(active);
    },
    [onActiveUpdate],
  );
  useActiveClass(ref, handleActiveUpdate);

  return (
    <CurrentPageContextProvider isActive={isActive}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </CurrentPageContextProvider>
  );
}
