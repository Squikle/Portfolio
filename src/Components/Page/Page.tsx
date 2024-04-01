import styles from "./Page.module.scss";
import { ReactNode, useEffect, useRef } from "react";
import { CurrentPageContextProvider } from "./CurrentPageContext/Contexts";
import classNames from "classnames";

type Props = {
  isActive: boolean;
  className?: string;
  children?: ReactNode;
  onActiveUpdate?: (active: boolean) => void;
  backgroundControl?: BackgroundControl;
  isAlwaysVisible?: boolean;
};

export type BackgroundControl = {
  setOpacity: (opacity: number) => void;
  setClassName: (classNames: classNames.ArgumentArray) => void;
};

export default function Page({
  isActive,
  className,
  children,
  onActiveUpdate,
  backgroundControl,
  isAlwaysVisible,
}: Props) {
  const ref = useRef(null);

  useEffect(() => {
    if (onActiveUpdate) onActiveUpdate(isActive);
  }, [isActive]);

  return (
    <CurrentPageContextProvider
      isActive={isActive}
      backgroundControl={backgroundControl}
    >
      <div
        ref={ref}
        className={classNames(className, styles.page, {
          [styles.inactive]: !isActive && !isAlwaysVisible,
        })}
      >
        {children}
      </div>
    </CurrentPageContextProvider>
  );
}
