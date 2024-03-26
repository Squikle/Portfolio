import backgroundImage from "./squik.png";
import { ForwardedRef, forwardRef, RefObject, useEffect } from "react";
import styles from "./Logo.module.css";

type ImageSize = { width: number; height: number };
type ImagePosition = { top: number; left: number };

type Props = {
  onImageResize: (imageSize: ImageSize, imagePosition: ImagePosition) => void;
  onLoad: (imageSize: ImageSize, imagePosition: ImagePosition) => void;
};

export default forwardRef<HTMLImageElement, Props>(function Logo(
  { onImageResize, onLoad }: Props,
  imageRef: ForwardedRef<HTMLImageElement>,
) {
  useEffect(() => {
    let resizeTimer: number;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        onImageResize(getImageSize(), getImagePosition());
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [onImageResize]);

  const getImageSize = () => {
    const image = imageRef as RefObject<HTMLImageElement>;
    if (!image.current) throw new Error("Image ref must be not null!");

    return {
      width: image.current!.clientWidth,
      height: image.current!.clientHeight,
    };
  };

  const getImagePosition = () => {
    const image = imageRef as RefObject<HTMLImageElement>;
    if (!image.current) throw new Error("Image ref must be not null!");

    const imageRect = image.current.getBoundingClientRect();
    return {
      left: imageRect.left,
      top: imageRect.top,
    };
  };

  return (
    <img
      src={backgroundImage}
      className={styles.logo}
      ref={imageRef}
      onLoad={() => onLoad(getImageSize(), getImagePosition())}
      alt="logo"
    />
  );
});
