import styles from "./ScrollButton.module.css";
import React, { useEffect, useState } from "react";

type Props = {
  elementRef: React.RefObject<HTMLElement>;
  mainContainerId?: string;
  contentElementId?: string;
};

export default function ScrollButton({
  elementRef,
  mainContainerId = "main-container",
  contentElementId = "content",
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

    const contentElement = document.getElementById(contentElementId);
    if (!contentElement)
      throw new Error(
        "couldn't retrieve scroll element with id: " + contentElementId,
      );

    const isBottom =
      elementRef.current.getBoundingClientRect().bottom >=
      contentElement.offsetHeight;
    setIsShown(!isBottom);
  }, []);

  return isShown && <div className={styles.circle} onClick={scroll} />;
}
