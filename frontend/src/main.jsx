import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
// Context APIs
import { ConnectionProvider } from "./contexts/ServerData";
import { ValidateAssessProvider } from "./contexts/ValidateAssessment.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ConnectionProvider>
        <ValidateAssessProvider>
          <App />
        </ValidateAssessProvider>
      </ConnectionProvider>
    </BrowserRouter>
  </StrictMode>
);
