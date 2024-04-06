import { createContext, ReactNode } from "react";
import { BackgroundControl } from "../Page.tsx";
import { SwiperClass } from "swiper/react";

type PageContextData = {
  isActive: boolean;
  backgroundControl?: BackgroundControl;
  swiper?: SwiperClass;
};

type Props = PageContextData & {
  children: ReactNode;
};

export const CurrentPageContext = createContext<PageContextData | null>(null);

export const CurrentPageContextProvider = ({
  isActive,
  children,
  backgroundControl,
  swiper,
}: Props) => {
  const contextValue = {
    isActive,
    backgroundControl,
    swiper,
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
  swiper,
}: Props) => {
  const contextValue = {
    isActive,
    swiper,
  };

  return (
    <CurrentSectionContext.Provider value={contextValue}>
      {children}
    </CurrentSectionContext.Provider>
  );
};
