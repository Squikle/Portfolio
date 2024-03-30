import styles from "./Page.module.css";
import { ReactNode, useEffect, useRef } from "react";
import useActiveClass from "./useActiveClass";
import { CurrentPageContextProvider } from "./CurrentPageContext/Contexts";
import classNames from "classnames";

type Props = {
  className?: string;
  children?: ReactNode;
  onActiveUpdate?: (active: boolean) => void;
};

export default function Page({ className, children, onActiveUpdate }: Props) {
  const ref = useRef(null);
  const isActive = useActiveClass(ref, "scroller");

  useEffect(() => {
    if (onActiveUpdate) onActiveUpdate(isActive);
  }, [isActive]);

  return (
    <CurrentPageContextProvider isActive={isActive}>
      <div
        ref={ref}
        className={classNames(className, styles.page, {
          [styles.inactive]: !isActive,
        })}
      >
        <div className={styles.content}>{children}</div>
      </div>
    </CurrentPageContextProvider>
  );
}
