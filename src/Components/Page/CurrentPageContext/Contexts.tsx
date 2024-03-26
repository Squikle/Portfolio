import React, { createContext, ReactNode } from "react";

type PageContextData = {
  isActive: boolean;
};

type Props = PageContextData & {
  children: ReactNode;
};

export const CurrentPageContext = createContext<PageContextData | null>(null);

export const CurrentPageContextProvider = ({ isActive, children }: Props) => {
  const contextValue = {
    isActive,
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
}: Props) => {
  const contextValue = {
    isActive,
  };

  return (
    <CurrentSectionContext.Provider value={contextValue}>
      {children}
    </CurrentSectionContext.Provider>
  );
};
