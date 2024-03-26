import styles from "./ScrollButton.module.css";
import React, { useEffect, useState } from "react";
declare module "*.scss";
type Props = {
  elementRef: React.RefObject<HTMLElement>;
  mainContainerId?: string;
  scrollElementId?: string;
};

export default function ScrollButton({
  elementRef,
  mainContainerId = "main-container",
  scrollElementId = "scroll",
}: Props) {
  const [isShown, setIsShown] = useState(true);

  const scroll = () => {
    const mainContainer = document.getElementById(mainContainerId);
    if (!mainContainer)
      throw new Error(
        "couldn't retrieve main container with id: " + mainContainerId,
      );
    mainContainer.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  useEffect(() => {
    if (!elementRef.current)
      throw new Error("element ref current must be not null!");

    const scrollElement = document.getElementById(scrollElementId);
    if (!scrollElement)
      throw new Error(
        "couldn't retrieve scroll element with id: " + scrollElementId,
      );

    const isBottom =
      elementRef.current.getBoundingClientRect().bottom >=
      scrollElement.offsetHeight;
    setIsShown(!isBottom);
  }, []);

  return (
    isShown && <div className={styles.circle} onClick={() => scroll()}></div>
  );
}
