import {createContext, ReactNode, useContext} from "react";
import useAnalyticsInit, {Analytics} from "../../hooks/useAnalytics.ts";

type Props = {
  children: ReactNode;
};

const AnalyticsContext = createContext<Analytics | null>(null);

export const AnalyticsContextProvider = ({children}: Props) => {
  const analytics = useAnalyticsInit();

  const contextData: Analytics = {
    ...analytics,
  };

  return (
    <AnalyticsContext.Provider value={contextData}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export function useAnalytics() {
  const value = useContext(AnalyticsContext);

  if (value == null)
    throw new Error("Should be within CurrentPageContextProvider");

  return value;
}
