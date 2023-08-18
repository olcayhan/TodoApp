import React from "react";
import Sidebar from "../components/Sidebar";
import TodoList from "../components/TodoList";
import Rightbar from "../components/Rightbar";
import { BarProvider } from "../context/BarContext";

export default function Layout() {
  return (
    <div className="relative flex flex-row justify-between align-items-center gap-4 h-full w-full">
      <Sidebar />
      <BarProvider>
        <TodoList />
      </BarProvider>
    </div>
  );
}
