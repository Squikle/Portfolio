import backgroundImage from "../../../../../assets/squik.webp";
import backgroundImageLow from "../../../../../assets/squik-low.webp";
import { RefObject, useCallback, useRef } from "react";
import styles from "./Logo.module.scss";
import { OnImageUpdate } from "./types.ts";
import useResizeObserver from "@react-hook/resize-observer";
import { debounceAndExecute } from "../../../../utils/debounce.ts";
import { ImageData } from "./types.ts";
import classNames from "classnames";

type Props = {
  onImageResize: OnImageUpdate;
  onLoad: OnImageUpdate;
};

export default function Logo({ onImageResize, onLoad }: Props) {
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleResize = useCallback(
    debounceAndExecute(() => {
      onImageResize(getImageData());
    }, 200),
    [onImageResize],
  );
  useResizeObserver(containerRef, handleResize);

  const getImageData = (): ImageData => {
    const container = getContainerElement();
    const image = getImageElement();

    const imageRect = image.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    return {
      width: image.clientWidth,
      height: image.clientHeight,
      left: imageRect.left - containerRect.left,
      top: imageRect.top - containerRect.top,
    };
  };

  const getImageElement = () => {
    const image = imageRef as RefObject<HTMLImageElement>;
    if (!image.current) throw new Error("Image ref must be not null!");
    return image.current;
  };

  const getContainerElement = () => {
    const container = containerRef as RefObject<HTMLDivElement>;
    if (!container.current) throw new Error("Image ref must be not null!");
    return container.current;
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <img
        fetchPriority={"high"}
        src={backgroundImageLow}
        data-src={backgroundImage}
        className={classNames("lazyload", "blur-up", styles.logo)}
        ref={imageRef}
        onLoad={() => onLoad(getImageData())}
        alt="logo"
      />
    </div>
  );
}
