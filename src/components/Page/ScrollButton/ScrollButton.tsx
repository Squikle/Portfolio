import styles from "./ScrollButton.module.scss";
import React, {useEffect, useState} from "react";

type Props = {
  elementRef: React.RefObject<HTMLElement>;
  mainContainerId?: string;
  contentElementId?: string;
};

export default function ScrollButton({
  elementRef,
  mainContainerId = "root",
}: Props) {
  const [isShown, setIsShown] = useState(true);

  const scroll = () => {
    const mainContainer = document.getElementById(mainContainerId);
    if (!mainContainer)
      throw new Error(
        "couldn't retrieve main container with id: " + mainContainerId,
      );
    mainContainer.scrollBy({top: window.innerHeight, behavior: "smooth"});
  };

  useEffect(() => {
    if (!elementRef.current)
      throw new Error("element ref current must be not null!");

    const mainContainer = document.getElementById(mainContainerId);
    if (!mainContainer)
      throw new Error(
        "couldn't retrieve main container with id: " + mainContainerId,
      );

    const isBottom =
      elementRef.current.getBoundingClientRect().bottom >=
      mainContainer.offsetHeight;
    setIsShown(!isBottom);
  }, []);

  return isShown && <div className={styles.circle} onClick={scroll}/>;
}
