import { createContext, ReactNode } from "react";
import { BackgroundControl } from "../Page.tsx";

type PageContextData = {
  isActive: boolean;
  backgroundControl?: BackgroundControl;
};

type Props = PageContextData & {
  children: ReactNode;
};

export const CurrentPageContext = createContext<PageContextData | null>(null);

export const CurrentPageContextProvider = ({
  isActive,
  children,
  backgroundControl,
}: Props) => {
  const contextValue = {
    isActive,
    backgroundControl,
  };

  return (
    <CurrentPageContext.Provider value={contextValue}>
      {children}
    </CurrentPageContext.Provider>
  );
};

export const CurrentSectionContext = createContext<PageContextData | null>(
  null,
);
export const CurrentSectionContextProvider = ({
  isActive,
  children,
  backgroundControl,
}: Props) => {
  const contextValue = {
    isActive,
    backgroundControl,
  };

  return (
    <CurrentSectionContext.Provider value={contextValue}>
      {children}
    </CurrentSectionContext.Provider>
  );
};
