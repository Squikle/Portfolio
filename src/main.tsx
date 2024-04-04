import ReactDOM from "react-dom/client";
import App from "./App.js";
import { StrictMode } from "react";
import "lazysizes/plugins/blur-up/ls.blur-up";
// @ts-ignore
import lazySizes from "lazysizes";
lazySizes.cfg.blurupMode = "auto";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
