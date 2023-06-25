// import needed library
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import AuthScreen from "./Screens/AuthScreen";
import SignUpScreen from "./Screens/SignUpScreen";
import TodoList from "./Screens/TodoList";
import Important from "./Screens/Important";

export default function App() {
  // set user objects

  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<AuthScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/home" element={<TodoList />} />
            <Route path="/important" element={<Important />} />
          </Routes>
        </Container>
      </main>
    </Router>
  );
}
