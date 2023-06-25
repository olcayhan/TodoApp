//importing needed library
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TodoProvider } from "./contexts/TodoContext";
import "./style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TodoProvider>
    <App />
  </TodoProvider>
);
