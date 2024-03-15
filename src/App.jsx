import { useCallback, useEffect, useRef, useState } from "react";
import backgroundImage from "./squik.png";
import canvasParticlesOptions from "./Particles/canvas-particles.json";
import globalParticlesOptions from "./Particles/global-particles.json";
import emittersParticlesOptions from "./Particles/emitters-particles.json";
import Particles from "./Particles/Particles";
import Emitters from "./Particles/Emitters";
import CanvasParticles from "./Particles/CanvasParticles";

export default function App() {
  const imageRef = useRef(null);
  const cardRef = useRef(null);
  const [imageSize, setImageSize] = useState();
  const [imagePosition, setImagePosition] = useState();
  const [loadState, setLoadState] = useState({});

  useEffect(() => {
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setImageSize(getImageSize());
        setImagePosition(getImagePosition());
      }, 50);
    };

    let resizeTimer;

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  useEffect(() => {
    setImagePosition(getImagePosition());
  }, [imageSize]);

  const getImageSize = () => {
    return {
      width: imageRef.current.clientWidth,
      height: imageRef.current.clientHeight,
    };
  };

  const getImagePosition = () => {
    const imageRect = imageRef.current.getBoundingClientRect();
    return {
      left: imageRect.left,
      top: imageRect.top,
    };
  };

  const onImageLoad = useCallback(() => {
    setImageSize(getImageSize());
    setImagePosition(getImagePosition());
    setLoadState((prev) => {
      if (prev?.image !== true) {
        return { ...prev, image: true };
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    window.onbeforeunload = function () {
      //window.scrollTo(0, 0);
    };
  }, []);

  const onParticlesLoaded = useCallback(() => {
    setLoadState((prev) => {
      if (prev?.particles !== true) {
        return { ...prev, particles: true };
      }
      return prev;
    });
  }, []);

  const isLoaded = () => {
    return isImageLoaded() && loadState?.particles == true;
  };

  const isImageLoaded = () => {
    return loadState?.image == true;
  };

  return (
    <div className="content">
      <div className="empty">
        {isLoaded() && (
          <div
            className="circle"
            onClick={() =>
              window.scroll({ top: window.innerHeight, behavior: "smooth" })
            }
          ></div>
        )}
      </div>
      <div className="info">
        <div className="card" ref={cardRef}>
          <h1>Michael Dovhalov</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut
            assumenda perferendis laudantium numquam architecto, iusto, porro
            debitis facilis magnam minima in optio officiis placeat eum
            consequuntur possimus nostrum repellat dolorem molestiae illo!
            Vitae, consectetur voluptas doloribus optio repellendus facere,
            tenetur delectus autem illo deserunt distinctio provident atque
            veritatis et! Unde?
          </p>
        </div>
      </div>
      <img
        src={backgroundImage}
        className="image"
        ref={imageRef}
        onLoad={onImageLoad}
      />
      {isImageLoaded() && (
        <Particles
          id="global-particles"
          onLoaded={onParticlesLoaded}
          options={globalParticlesOptions}
        />
      )}
      {isImageLoaded() && (
        <Emitters
          id="emitters-particles"
          onLoaded={onParticlesLoaded}
          options={emittersParticlesOptions}
          imagePosition={imagePosition}
          imageSize={imageSize}
        />
      )}
      {isImageLoaded() && (
        <CanvasParticles
          id="canvas-particles"
          onLoaded={onParticlesLoaded}
          options={canvasParticlesOptions}
        />
      )}
    </div>
  );
}
