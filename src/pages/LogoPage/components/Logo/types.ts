export type OnImageUpdate = (imageData: ImageData) => void;
export type ImageData = ImageSize & ImagePosition;

export type ImageSize = {
  width: number;
  height: number;
};

export type ImagePosition = {
  left: number;
  top: number;
};
