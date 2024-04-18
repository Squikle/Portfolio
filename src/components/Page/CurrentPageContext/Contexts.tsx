import {createContext, ReactNode, useContext} from "react";
import {BackgroundControl} from "../Page.tsx";
import {SwiperClass} from "swiper/react";

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

export const CurrentPageContextProvider = <T, >({
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

  return value as PageContextData<T>;
}

let pageStateContext: any;
export const createPageStateContext = <T, >() => {
  if (!pageStateContext)
    pageStateContext = createContext<PageContextData<T> | null>(null);

  return pageStateContext;
};

export const CurrentSectionContextProvider = <T, >({
  isActive,
  children,
  swiper,
  ...contextData
}: Props<T>) => {
  const SectionContext = createPageSectionStateContext<T>();
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

let pageSectionStateContext: any;
export const createPageSectionStateContext = <T, >() => {
  if (!pageSectionStateContext)
    pageSectionStateContext = createContext<PageContextData<T> | null>(null);

  return pageSectionStateContext;
};

export function useCurrentSectionContext<T>() {
  const value = useContext(createPageSectionStateContext<T>());

  if (value == null)
    throw new Error("Should be within CurrentSectionContextProvider");

  return value as PageContextData<T>;
}
