import ReactDOM from "react-dom/client";
import App from "./App.js";
import { StrictMode } from "react";
import "lazysizes/plugins/blur-up/ls.blur-up";
// @ts-ignore
import lazySizes from "lazysizes";
lazySizes.cfg.blurupMode = "auto";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import createStore from "./store/createStore.ts";
import { Provider } from "react-redux";
gsap.registerPlugin(useGSAP);

const store = createStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
