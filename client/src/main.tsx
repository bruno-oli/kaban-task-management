import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeAppContextProvider } from "./contexts/ThemeAppContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeAppContextProvider>
      <App />
    </ThemeAppContextProvider>
  </React.StrictMode>
);
