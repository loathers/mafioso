import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { configure } from "mobx";
import "./styles/css-reset.css";
import "./styles/main.scss";

configure({ enforceActions: "never" });

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
