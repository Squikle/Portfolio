import ReactDOM from "react-dom/client";
import "./main.scss";
import App from "./App.js";
import { StrictMode } from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
