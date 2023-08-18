// import needed library
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster />
      <Router>
        <main className="h-screen">
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/important" element={<Layout />} />
            <Route path="/auth" element={<Login />} />
            <Route path="/register" element={<Register />} />,
          </Routes>
        </main>
      </Router>
    </>
  );
}
