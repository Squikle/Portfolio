import styles from "./Page.module.scss";
import classNames from "classnames";
import { ReactNode, useRef } from "react";
import { CurrentSectionContextProvider } from "./CurrentPageContext/Contexts";
import { BackgroundControl } from "./Page.tsx";

type Props = {
  isActive: boolean;
  className?: string;
  children?: ReactNode;
  height?: string;
  alwaysActive?: boolean;
  backgroundControl?: BackgroundControl;
};

export default function PageSection({
  isActive,
  className,
  children,
  height,
  alwaysActive,
  backgroundControl,
}: Props) {
  const ref = useRef(null);

  const overriddenStyles = {
    height: height || undefined,
  };

  return (
    <CurrentSectionContextProvider
      isActive={isActive}
      backgroundControl={backgroundControl}
    >
      <div
        ref={ref}
        className={classNames(className, styles.section, {
          [styles.inactive]: !isActive && !alwaysActive,
        })}
        style={overriddenStyles}
      >
        {children}
      </div>
    </CurrentSectionContextProvider>
  );
}
