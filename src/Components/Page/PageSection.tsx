import styles from "./Page.module.scss";
import classNames from "classnames";
import { ReactNode, useEffect, useRef } from "react";
import { CurrentSectionContextProvider } from "./CurrentPageContext/Contexts";
import { BackgroundControl } from "./Page.tsx";
import { useCurrentPageContext } from "./CurrentPageContext/useContexts.ts";

type Props = {
  isActive: boolean;
  className?: string;
  children?: ReactNode;
  height?: string;
  isAlwaysVisible?: boolean;
  backgroundControl?: BackgroundControl;
  backgroundOpacity?: number;
};

export default function PageSection({
  isActive,
  className,
  children,
  height,
  isAlwaysVisible,
  backgroundOpacity = 1,
}: Props) {
  const ref = useRef(null);
  const backgroundControl = useCurrentPageContext();

  useEffect(() => {
    if (isActive && backgroundControl?.backgroundControl?.setOpacity) {
      backgroundControl.backgroundControl.setOpacity(backgroundOpacity);
    }
  }, [isActive]);

  const overriddenStyles = {
    height: height || undefined,
  };

  return (
    <CurrentSectionContextProvider isActive={isActive}>
      <div
        ref={ref}
        className={classNames(className, styles.section, {
          [styles.inactive]: !isActive && !isAlwaysVisible,
        })}
        style={overriddenStyles}
      >
        {children}
      </div>
    </CurrentSectionContextProvider>
  );
}
