import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Provider } from "react-redux";
import { store } from "./rtk/store";
import { DarkModeProvider } from "./context/DarkModeContext";
import { ScrollToTop } from "./components/ScrollToTop";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <DarkModeProvider>
          <ScrollToTop />
          <App />
        </DarkModeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
