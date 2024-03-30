import backgroundImage from "./squik.png";
import { RefObject, useCallback, useEffect, useRef } from "react";
import styles from "./Logo.module.css";
import { OnImageUpdate } from "./types.ts";
import useResizeObserver from "@react-hook/resize-observer";
import { debounceAndExecute } from "../../utils/debounce.ts";
import { ImageData } from "./types.ts";

type Props = {
  onImageResize: OnImageUpdate;
  onLoad: OnImageUpdate;
};

export default function Logo({ onImageResize, onLoad }: Props) {
  const imageRef = useRef(null);

  const handleResize = useCallback(
    debounceAndExecute(() => onImageResize(getImageData()), 200),
    [onImageResize],
  );
  useResizeObserver(imageRef, handleResize);
  useEffect(() => {}, []);

  const getImageData = (): ImageData => {
    const image = getImageElement();
    const imageRect = image.getBoundingClientRect();
    return {
      width: image.clientWidth,
      height: image.clientHeight,
      left: imageRect.left,
      top: imageRect.top,
    };
  };

  const getImageElement = () => {
    const image = imageRef as RefObject<HTMLImageElement>;
    if (!image.current) throw new Error("Image ref must be not null!");
    return image.current;
  };

  return (
    <div className={styles.container}>
      <img
        src={backgroundImage}
        className={styles.logo}
        ref={imageRef}
        onLoad={() => onLoad(getImageData())}
        alt="logo"
      />
    </div>
  );
}
