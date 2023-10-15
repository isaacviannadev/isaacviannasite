import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyles from "./global";
import "./i18n";
import { LanguageProvider } from "./contexts/LanguageContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
      <GlobalStyles />
    </LanguageProvider>
  </React.StrictMode>
);
