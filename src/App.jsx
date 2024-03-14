import { useRef, useState } from "react";
import Particle from "./Particle";
import backgroundImage from "/src/squik-triangle-hd-color.png";

export default function App() {
  const imageRef = useRef();
  const [isLoaded, setIsLoaded] = useState();

  const onImageLoaded = () => {
    setIsLoaded(true);
  };

  return (
    <>
      {isLoaded && <Particle />}
      <div className="content">
        <img
          src={backgroundImage}
          className="image"
          alt="Your Image"
          ref={imageRef}
          onLoad={onImageLoaded}
        />
      </div>
    </>
  );
}
