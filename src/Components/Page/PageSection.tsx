import styles from "./Page.module.scss";
import classNames from "classnames";
import { ReactNode, useRef } from "react";
import { CurrentSectionContextProvider } from "./CurrentPageContext/Contexts";

type Props = {
  isActive: boolean;
  className?: string;
  children?: ReactNode;
  height?: string;
  alwaysActive?: boolean;
};

export default function PageSection({
  isActive,
  className,
  children,
  height,
  alwaysActive,
}: Props) {
  const ref = useRef(null);

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
        <div className={styles.content}>{children}</div>
      </div>
    </CurrentSectionContextProvider>
  );
}
