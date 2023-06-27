// import needed library
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthScreen from "./Screens/AuthScreen";
import SignUpScreen from "./Screens/SignUpScreen";
import TodoList from "./Screens/TodoList";
import Important from "./Screens/Important";

export default function App() {
  return (
    <Router>
      <main className="h-screen">
        <Routes>
          <Route path="/" element={<AuthScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />,
          <Route path="/home" element={<TodoList />} />
          <Route path="/important" element={<Important />} />
        </Routes>
      </main>
    </Router>
  );
}
