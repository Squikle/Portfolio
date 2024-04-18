import React, {useCallback, useRef} from "react";

type TextTimeoutsRef = {
  nameTimeout?: NodeJS.Timeout,
  devTimeout?: NodeJS.Timeout,
}

export function useTextHovering() {
  const textTimeouts = useRef<TextTimeoutsRef>({nameTimeout: undefined, devTimeout: undefined})

  const getParentNode = (e: EventTarget) => {
    return (e as HTMLDivElement).parentNode as HTMLDivElement;
  }

  const onDevTextPointerEnter = useCallback((e: React.PointerEvent) => {
    if (e.pointerType != "touch")
      return;
    const parentNode = getParentNode(e.target);
    if (parentNode) {
      textTimeouts.current.devTimeout && clearTimeout(textTimeouts.current.devTimeout);
      parentNode.classList.toggle("active", true)
    }
  }, [])

  const onNameTextPointerEnter = useCallback((e: React.PointerEvent) => {
    if (e.pointerType != "touch")
      return;
    const parentNode = getParentNode(e.target);
    if (parentNode) {
      textTimeouts.current.nameTimeout && clearTimeout(textTimeouts.current.nameTimeout);
      parentNode.classList.toggle("active", true)
    }
  }, [])

  const onDevTextPointerLeave = useCallback((e: React.PointerEvent) => {
    if (e.pointerType != "touch")
      return;
    const parentNode = getParentNode(e.target);
    if (parentNode) {
      textTimeouts.current.devTimeout && clearTimeout(textTimeouts.current.devTimeout);
      textTimeouts.current.devTimeout = setTimeout(() => parentNode.classList.toggle("active", false), 300);
    }
  }, [])

  const onNameTextPointerLeave = useCallback((e: React.PointerEvent) => {
    if (e.pointerType != "touch")
      return;
    const parentNode = getParentNode(e.target);
    if (parentNode) {
      textTimeouts.current.nameTimeout && clearTimeout(textTimeouts.current.nameTimeout);
      textTimeouts.current.nameTimeout = setTimeout(() => parentNode.classList.toggle("active", false), 300);
    }
  }, [])

  return {
    onDevTextPointerEnter,
    onNameTextPointerEnter,
    onDevTextPointerLeave,
    onNameTextPointerLeave
  }
}