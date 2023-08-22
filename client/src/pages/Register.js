import React, { useCallback, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import axios from "axios";
import { toast } from "react-hot-toast";
import config from "../env/config";

export default function Register() {
  const navigate = useNavigate();

  const { data: user, isLoading } = useUser();

  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({
    fullname: "",
    password: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    if (!isLoading && user !== undefined) navigate("/");
  }, [navigate, user, isLoading]);

  useEffect(() => {
    const { password, fullname, phoneNumber, email } = formData;

    if (
      password.length >= 8 &&
      fullname.length >= 3 &&
      phoneNumber.length >= 10 &&
      email.length >= 5
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const url = new URL("/users/register", config.apiUrl);
        await axios.post(url, formData);
        toast.success("Register successfully");
        navigate("/auth");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    [formData, navigate]
  );

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
        <Form className="w-3/4" onSubmit={handleRegister}>
          <Form.Group className="text-white py-2" controlId="formBasicName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="fullname"
              type="text"
              placeholder="Enter name"
              required
            />
          </Form.Group>

          <Form.Group className="text-white py-2" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="text-white py-2" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>

          <Form.Group className="text-white py-2" controlId="formBasicPhone">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              placeholder="Phone number"
              name="phoneNumber"
              required
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
