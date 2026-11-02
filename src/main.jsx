import React from "react";
import { createRoot } from "react-dom/client";
import ProductBoard from "./ProductBoard.jsx";
import "./ProductBoard.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductBoard />
  </React.StrictMode>
);
