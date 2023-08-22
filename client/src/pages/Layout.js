import React, { useEffect } from "react";
import Sidebar from "../components/bars/Sidebar";
import Home from "../components/home/Home";
import Important from "../components/important/Important";
import { BarProvider } from "../context/BarContext";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import useTodos from "../hooks/useTodos";
import Spinner from "../components/Spinner";

export default function Layout() {
  const path = window.location.pathname;
  let pathway = null;
  const { data: user, isLoading } = useUser();
  const { isLoading: isLoading2 } = useTodos(user?._id);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user === undefined) navigate("/auth");
  }, [navigate, isLoading, user]);

  if (path === "/") {
    pathway = <Home />;
  } else if (path === "/important") {
    pathway = <Important />;
  }

  if (isLoading || isLoading2) {
    return <Spinner />;
  }

  return (
    <div className="relative flex flex-row justify-between align-items-center gap-4 h-full w-full">
      <Sidebar />
      <BarProvider>{pathway}</BarProvider>
    </div>
  );
}
