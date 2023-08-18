// import needed library
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import Important from "./pages/Important";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster />
      <Router>
        <main className="h-screen">
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/important" element={<Important />} />
            <Route path="/auth" element={<Login />} />
            <Route path="/register" element={<Register />} />,
          </Routes>
        </main>
      </Router>
    </>
  );
}
