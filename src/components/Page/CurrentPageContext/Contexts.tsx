import { createContext, ReactNode, useContext } from "react";
import { BackgroundControl } from "../Page.tsx";
import { SwiperClass } from "swiper/react";
import { once } from "lodash";

type PageContextData<T> = {
  isActive: boolean;
  contextName?: string;
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
  const PageContext = createPageStateContext<T>();
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
  const value = useContext(createPageStateContext<T>());

  if (value == null)
    throw new Error("Should be within CurrentPageContextProvider");

  return value;
}

export const createPageStateContext = once(<T,>() =>
  createContext<PageContextData<T> | null>(null),
);

export const CurrentSectionContextProvider = <T,>({
  isActive,
  children,
  swiper,
  ...contextData
}: Props<T>) => {
  const SectionContext = createSectionStateContext<T>();
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
export const createSectionStateContext = once(<T,>() =>
  createContext<PageContextData<T> | null>(null),
);

export function useCurrentSectionContext<T>() {
  const value = useContext(createSectionStateContext<T>());

  if (value == null)
    throw new Error("Should be within CurrentSectionContextProvider");

  return value;
}
