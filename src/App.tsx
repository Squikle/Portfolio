import { useEffect, useRef } from "react";
import ParallaxPage from "./Pages/ParallaxPage.tsx";
import LogoPage from "./Pages/LogoPage.tsx";
import useScrollSnap from "./hooks/useScrollSnap.ts";

export default function App() {
  const contentRef = useRef<HTMLInputElement | null>(null);
  useScrollSnap(contentRef, {
    snapDestinationY: "100vh",
    duration: 300,
    timeout: 0,
    threshold: 0.1,
    easing: (t) =>
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    snapStop: true,
  });

  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  useEffect(() => {
    const updateViewportHeight = () => {
      document.documentElement.style.setProperty(
        "--viewport-height",
        `${window.innerHeight}px`,
      );
    };

    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);
    return window.removeEventListener("resize", updateViewportHeight);
  }, []);

  return (
    <div id="main-container" ref={contentRef}>
      <div id="scroll">
        <ParallaxPage></ParallaxPage>
        <LogoPage></LogoPage>
      </div>
    </div>
  );
}
