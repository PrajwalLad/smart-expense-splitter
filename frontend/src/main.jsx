import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <div className="font-mono">
          <App />
          <Toaster position="bottom-center" reverseOrder={true} />
        </div>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
