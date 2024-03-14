import { useEffect, useRef, useState } from "react";
import ParticleHm from "./ParticleHm";
import backgroundImage from "/src/squik-triangle-hd-color.png";

export default function AppHm() {
  const imageRef = useRef();
  const [isLoaded, setIsLoaded] = useState();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  const onImageLoaded = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    function onResize() {
      if (!isLoaded) {
        return;
      }

      setWidth(imageRef.current.clientWidth);
      setHeight(imageRef.current.clientHeight);
    }

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [isLoaded]);

  return (
    <div className="content">
      <img
        src={backgroundImage}
        className="image"
        alt="Your Image"
        ref={imageRef}
        onLoad={onImageLoaded}
      />
      {isLoaded && <ParticleHm width={width} height={height}></ParticleHm>}
    </div>
  );
}
