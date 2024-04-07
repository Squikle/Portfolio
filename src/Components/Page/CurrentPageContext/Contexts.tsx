import { createContext, ReactNode, useContext } from "react";
import { BackgroundControl } from "../Page.tsx";
import { SwiperClass } from "swiper/react";
import { once } from "lodash";

type PageContextData<T> = {
  isActive: boolean;
  backgroundControl?: BackgroundControl;
  swiper?: SwiperClass;
  index?: number;
} & T;

type Props<T> = PageContextData<T> & {
  children: ReactNode;
};

export const CurrentPageContextProvider = <T,>({
  isActive,
  children,
  backgroundControl,
  swiper,
  ...contextData
}: Props<T>) => {
  const PageContext = createStateContext<T>();
  const contextValue = {
    isActive,
    backgroundControl,
    swiper,
    ...contextData,
  };

  return (
    <PageContext.Provider value={contextValue as PageContextData<T>}>
      {children}
    </PageContext.Provider>
  );
};

export function useCurrentPageContext<T>() {
  const value = useContext(createStateContext<T>());

  if (value == null)
    throw new Error("Should be within CurrentPageContextProvider");

  return value;
}

export const CurrentSectionContextProvider = <T,>({
  isActive,
  children,
  swiper,
  ...contextData
}: Props<T>) => {
  const SectionContext = createStateContext<T>();
  const contextValue = {
    isActive,
    swiper,
    ...contextData,
  };

  return (
    <SectionContext.Provider value={contextValue as PageContextData<T>}>
      {children}
    </SectionContext.Provider>
  );
};

export const createStateContext = once(<T,>() =>
  createContext<PageContextData<T> | null>(null),
);

export function useCurrentSectionContext<T>() {
  const value = useContext(createStateContext<T>());

  if (value == null)
    throw new Error("Should be within CurrentSectionContextProvider");

  return value;
}
