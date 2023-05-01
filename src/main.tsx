import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { recipesApi } from "./store/API/recipesApi.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApiProvider api={recipesApi}>
      <App />
    </ApiProvider>
  </React.StrictMode>
);
