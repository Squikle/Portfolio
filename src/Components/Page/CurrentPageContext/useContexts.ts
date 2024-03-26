import { CurrentPageContext, CurrentSectionContext } from "./Contexts.js";
import { useContext } from "react";

export function useCurrentPageContext() {
  const value = useContext(CurrentPageContext);

  if (value == null)
    throw new Error("Should be within CurrentPageContextProvider");

  return value;
}

export function useCurrentSectionContext() {
  const value = useContext(CurrentSectionContext);

  if (value == null)
    throw new Error("Should be within CurrentSectionContextProvider");

  return value;
}
