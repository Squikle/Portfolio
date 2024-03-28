type ImageSize = { width: number; height: number };
type ImagePosition = { top: number; left: number };

export type OnImageResize = (
  imageSize: ImageSize,
  imagePosition: ImagePosition,
) => void;

export type OnImageLoaded = (size: ImageSize, position: ImagePosition) => void;
