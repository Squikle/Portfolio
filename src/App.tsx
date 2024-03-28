import { useEffect } from "react";
import ParallaxPage from "./Pages/ParallaxPage.tsx";
import LogoPage from "./Pages/LogoPage.tsx";

export default function App() {
  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <div className="content" id="main-container">
      <div id="scroll">
        <ParallaxPage></ParallaxPage>
        <LogoPage></LogoPage>
      </div>
    </div>
  );
}
