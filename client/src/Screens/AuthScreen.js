// import needed library and routers
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTodo } from "../contexts/TodoContext";
import { useNavigate } from "react-router-dom";

export default function AuthScreen() {
  // navigate to screen
  const { loginUser, signin } = useTodo();
  const navigate = useNavigate();

  signin && navigate("/home");
  //setting form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div
        className="
        flex 
        flex-col 
        items-center 
        justify-center 
        rounded-3xl
        bg-gradient-to-b 
        from-[#00adb5]
        to-[#222831]
        w-[400px] 
        h-auto
        py-10
      "
      >
        <Form
          className="w-3/4"
          onSubmit={(e) => {
            e.preventDefault();
            loginUser(formData);
          }}
        >
          <Form.Group className="text-white py-2" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="text-white py-2" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Form.Group className="grid">
            <Button
              disabled={formData.email === "" || formData.password === ""}
              type="submit"
              size="lg"
              style={{ backgroundColor: "#AC4425", border: "none" }}
            >
              Sign In
            </Button>
            <Form.Text className="text-white text-center py-2">
              Don't have an Account ?
              <Link to="/signup">
                <span className="text-white ms-2 ">Sign Up</span>
              </Link>
            </Form.Text>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
