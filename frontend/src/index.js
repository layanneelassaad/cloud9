import React from "react";
import ReactDOM from "react-dom/client"; // Updated import
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Create a root using ReactDOM.createRoot()
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
