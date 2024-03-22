import { useCallback, useEffect, useRef, useState } from "react";
import backgroundImage from "./squik.png";
import canvasParticlesOptions from "./Particles/canvas-particles.json";
import globalParticlesOptions from "./Particles/global-particles.json";
import emittersParticlesOptions from "./Particles/emitters-particles.json";
import Particles from "./Particles/Particles";
import Emitters from "./Particles/Emitters";
import { adaptParticles } from "./retinaAdapter";
import { useParticlesEngine } from "./hooks/useParticlesEngine";
import Parallax from "./Parallax/Parallax";

export default function App() {
  const imageRef = useRef(null);
  const cardRef = useRef(null);
  const [imageData, setImageData] = useState();
  const [loadState, setLoadState] = useState({});
  const options = useRef({});

  const updateImage = useCallback(() => {
    setImageData({ ...getImagePosition(), ...getImageSize() });
  }, []);

  useEffect(() => {
    let resizeTimer;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateImage();
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [updateImage]);

  useEffect(() => {
    if (!imageData?.width && !imageData?.height) {
      return;
    }
    const newSize = { width: imageData.width, height: imageData.height };
    options.current = {
      global: adaptParticles(globalParticlesOptions, newSize),
      emitters: adaptParticles(emittersParticlesOptions, newSize),
      canvas: adaptParticles(canvasParticlesOptions, newSize),
    };
  }, [imageData]);

  const getImageSize = () => {
    console.log(
      `[${imageRef.current.clientWidth}, ${imageRef.current.clientHeight}, ]`,
    );
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
    setLoadState((prev) => {
      if (prev?.image !== true) {
        return { ...prev, image: true };
      }
      return prev;
    });
    updateImage();
  }, [updateImage]);

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

  useParticlesEngine(onParticlesLoaded);

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
        <script src="https://embed.tidal.com/tidal-embed.js"></script>
      </div>
      <div className="particles-container">
        <img
          src={backgroundImage}
          className="image"
          ref={imageRef}
          onLoad={onImageLoad}
        />
        {isLoaded() && (
          <Particles id="global-particles" options={options.current.global} />
        )}
        {isLoaded() && (
          <Emitters
            id="emitters-particles"
            options={options.current.emitters}
            imageData={imageData}
          />
        )}
        {isLoaded() && (
          <Particles id="canvas-particles" options={options.current.canvas} />
        )}
      </div>
      <Parallax></Parallax>
    </div>
  );
}
