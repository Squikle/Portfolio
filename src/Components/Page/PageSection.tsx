import styles from "./Page.module.scss";
import classNames from "classnames";
import { ReactNode, useEffect, useRef } from "react";
import { CurrentSectionContextProvider } from "./CurrentPageContext/Contexts";
import { BackgroundControl } from "./Page.tsx";
import { useCurrentPageContext } from "./CurrentPageContext/Contexts";

export type PageSectionProps<TContextData> = {
  isActive: boolean;
  index?: number;
  className?: string;
  children?: ReactNode;
  height?: string;
  isAlwaysVisible?: boolean;
  backgroundControl?: BackgroundControl;
  backgroundOpacity?: number;
  onActiveChange?: (active: boolean, index?: number) => void;
} & TContextData;

export default function PageSection<TContextData>({
  isActive,
  className,
  children,
  height,
  isAlwaysVisible,
  backgroundOpacity = 1,
  index,
  onActiveChange,
  ...contextData
}: PageSectionProps<TContextData>) {
  const ref = useRef(null);
  const pageContext = useCurrentPageContext();

  useEffect(() => {
    if (isActive && pageContext?.backgroundControl?.setOpacity != null) {
      pageContext.backgroundControl.setOpacity(backgroundOpacity!);
    }

    if (onActiveChange) onActiveChange(isActive, index);
  }, [isActive]);

  const overriddenStyles = {
    height: height || undefined,
  };

  return (
    <CurrentSectionContextProvider
      isActive={isActive}
      index={index}
      {...contextData}
    >
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
