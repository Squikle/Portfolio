import styles from "./Page.module.css";
import classNames from "classnames";
import ScrollButton from "./ScrollButton";
import { ReactNode, useCallback, useRef, useState } from "react";
import useActiveClass from "./useActiveClass";
import { CurrentSectionContextProvider } from "./CurrentPageContext/Contexts";

type Props = {
  className?: string;
  children?: ReactNode;
  height?: string;
  onActiveUpdate?: (active: boolean) => void;
  alwaysActive?: boolean;
};

export default function PageSection({
  className,
  children,
  height,
  onActiveUpdate,
  alwaysActive,
}: Props) {
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

  const overriddenStyles = {
    height: height || undefined,
  };

  return (
    <CurrentSectionContextProvider isActive={isActive}>
      <div
        ref={ref}
        className={classNames(className, styles.content, styles.section, {
          [styles.inactive]: !isActive && !alwaysActive,
        })}
        style={overriddenStyles}
      >
        {children}
        <ScrollButton elementRef={ref}></ScrollButton>
      </div>
    </CurrentSectionContextProvider>
  );
}
