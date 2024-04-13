import styles from "./Page.module.scss";
import classNames from "classnames";
import { ReactNode, useEffect, useRef } from "react";
import { CurrentSectionContextProvider } from "./CurrentPageContext/Contexts";
import { BackgroundControl } from "./Page.tsx";
import { useCurrentPageContext } from "./CurrentPageContext/Contexts";
import { useAnalytics } from "../Analytics/AnalyticsContext.tsx";

export type PageSectionProps<TContextData> = {
  isActive: boolean;
  sectionName?: string;
  index?: number;
  className?: string;
  children?: ReactNode;
  height?: string;
  isAlwaysVisible?: boolean;
  backgroundControl?: BackgroundControl;
  backgroundOpacity?: number;
} & TContextData;

export default function PageSection<TContextData>({
  isActive,
  sectionName,
  className,
  children,
  height,
  isAlwaysVisible,
  backgroundOpacity = 1,
  index,
  ...contextData
}: PageSectionProps<TContextData>) {
  const ref = useRef(null);
  const pageContext = useCurrentPageContext();
  const analytics = useAnalytics();

  useEffect(() => {
    if (isActive && pageContext?.backgroundControl?.setOpacity != null) {
      pageContext.backgroundControl.setOpacity(backgroundOpacity!);
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive)
      analytics.setDocumentTitle(pageContext.contextName + "/" + sectionName);
  }, [isActive, pageContext.contextName]);

  const overriddenStyles = {
    height: height || undefined,
  };

  return (
    <CurrentSectionContextProvider
      contextName={sectionName}
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
