import { useEffect, useRef } from "react";
import ParallaxPage from "./Pages/ParallaxPage.tsx";
import LogoPage from "./Pages/LogoPage.tsx";
import useScrollSnap from "./hooks/useScrollSnap.ts";

export default function App() {
  const contentRef = useRef<HTMLInputElement | null>(null);
  useScrollSnap(
    contentRef,
    {
      snapDestinationY: "100vh",
      duration: 500,
      timeout: 50,
      threshold: 0.2,
      easing: (t) =>
        t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
      snapStop: true,
    },
    () => console.log("snapped"),
  );

  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <div id="main-container" ref={contentRef}>
      <div id="content">
        <ParallaxPage></ParallaxPage>
        <LogoPage></LogoPage>
      </div>
    </div>
  );
}
