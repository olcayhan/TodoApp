import React from "react";
import Sidebar from "../components/bars/Sidebar";
import TodoList from "../components/home/TodoList";
import Important from "../components/important/Important";
import { BarProvider } from "../context/BarContext";

export default function Layout() {
  const path = window.location.pathname;
  let pathway = null;

  if (path === "/") {
    pathway = <TodoList />;
  } else if (path === "/important") {
    pathway = <Important />;
  }

  return (
    <div className="relative flex flex-row justify-between align-items-center gap-4 h-full w-full">
      <Sidebar />
      <BarProvider>{pathway}</BarProvider>
    </div>
  );
}
