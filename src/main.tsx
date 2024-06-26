import ReactDOM from "react-dom/client";
import App from "./App.js";
import {StrictMode} from "react";
import "lazysizes/plugins/blur-up/ls.blur-up";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {AnalyticsContextProvider} from "./components/Analytics/AnalyticsContext.tsx";

gsap.registerPlugin(useGSAP);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AnalyticsContextProvider>
      <App/>
    </AnalyticsContextProvider>
  </StrictMode>,
);
