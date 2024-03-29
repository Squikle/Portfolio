import styles from "./Page.module.css";
import classNames from "classnames";
import ScrollButton from "./ScrollButton";
import { ReactNode, useEffect, useRef } from "react";
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
  const isActive = useActiveClass(ref);

  useEffect(() => {
    if (onActiveUpdate) onActiveUpdate(isActive);
  }, [isActive]);

  const overriddenStyles = {
    height: height || undefined,
  };

  return (
    <CurrentSectionContextProvider isActive={isActive}>
      <div
        ref={ref}
        className={classNames(className, styles.section, {
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
