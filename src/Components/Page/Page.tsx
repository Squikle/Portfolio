import styles from "./Page.module.scss";
import { ReactNode, useEffect, useRef } from "react";
import { CurrentPageContextProvider } from "./CurrentPageContext/Contexts";
import classNames from "classnames";

type Props = {
  isActive: boolean;
  className?: string;
  children?: ReactNode;
  onActiveUpdate?: (active: boolean) => void;
};

export default function Page({
  isActive,
  className,
  children,
  onActiveUpdate,
}: Props) {
  const ref = useRef(null);

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
