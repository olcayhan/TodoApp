import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTodo } from "../contexts/TodoContext";
import { useNavigate } from "react-router-dom";

export default function SignUpScreen() {
  const { registerUser, user } = useTodo();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    password: "",
    phoneNumber: "",
    email: "",
  });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (
      formData.password.length >= 8 &&
      formData.fullname.length >= 3 &&
      formData.phoneNumber.length >= 10 &&
      formData.email.length >= 5
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formData]);

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
            registerUser(formData);
            if (user !== null) navigate("/signin");
          }}
        >
          <Form.Group className="text-white py-2" controlId="formBasicEmail">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              onChange={(e) =>
                setFormData({ ...formData, fullname: e.target.value })
              }
              type="text"
              placeholder="Enter name"
            />
          </Form.Group>

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

          <Form.Group className="text-white py-2" controlId="formBasicPassword">
            <Form.Label>Password Again</Form.Label>
            <Form.Control type="password" placeholder="Enter password again" />
          </Form.Group>

          <Form.Group className="text-white py-2" controlId="formBasicPassword">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              type="text"
              placeholder="Phone number"
            />
          </Form.Group>

          <Form.Group className="d-grid">
            <Button
              disabled={disabled}
              type="submit"
              variant="primary"
              size="lg"
              className="border-none mt-4"
              style={{
                backgroundColor: "#AC4425",
              }}
            >
              Sign Up
            </Button>
            <Form.Text className="text-center text-white py-2">
              Do you have an Account ?
              <Link to="/" className="ms-2 text-white">
                Sign In
              </Link>
            </Form.Text>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
