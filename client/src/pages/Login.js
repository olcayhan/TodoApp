// import needed library and routers
import React, { useCallback, useEffect, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Login() {
  // navigate to screen

  const { data: user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user !== undefined) navigate("/");
  }, [navigate, user, isLoading]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const login = await axios.post(
          "https://todoapp-backend-rlvk.onrender.com/users/login",
          formData
        );
        localStorage.setItem("token", login.data.token);
        localStorage.setItem("userID", login.data.user._id);
        toast.success("Login successful");
        navigate("/");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    [formData, navigate]
  );

  if (isLoading) {
    return <Spinner />;
  }

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
        <Form className="w-3/4" onSubmit={handleLogin}>
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
              <Link to="/register">
                <span className="text-white ms-2 ">Sign Up</span>
              </Link>
            </Form.Text>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
