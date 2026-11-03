import React, { useState } from "react";
import { Alert, Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cat from "../../Images/Cat.jpg";
import Layout from "../../Layout/Layout";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    }
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      const { token, role } = res.data;

      if (!token || !role) throw new Error("Invalid response from server.");

      localStorage.setItem("userToken", token);
      localStorage.setItem("userRole", role);

      window.dispatchEvent(new Event("storage"));

      setSuccess(true);
      setErrors({});

      setTimeout(() => {
        if (role === "admin") {
          navigate("/AdminHome");
        } else if (role === "shelterAdmin") {
          navigate("/ShelterHome");
        } else {
          navigate("/");
        }
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ login: error.response?.data?.message || "Something went wrong" });
      setSuccess(false);
    }
  };

  return (
    <Layout>
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Container className="d-flex bg-white shadow" style={{ maxWidth: "900px", height: "80vh", borderRadius: "10px", overflow: "hidden", padding: 0 }}>
          {/* Left Section: Login Form */}
          <div className="d-flex flex-column justify-content-center align-items-center text-dark p-4" style={{ width: "100%" }}>
            <h1 className="text-center" style={{ fontSize: "36px" }}>Login</h1>
            <p className="text-center" style={{ color: "#999999", fontSize: "14px" }}>
              Welcome Back! Please enter your details.
            </p>

            {success && <Alert variant="success">Log in successful!</Alert>}
            {errors.login && <Alert variant="danger">{errors.login}</Alert>}

            <Form onSubmit={handleLogin} style={{ width: "100%" }}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>

              <Button
                type="submit"
                className="w-100"
                style={{ background: "#1c1c3d", border: "none", color: "#fff", padding: "10px" }}
              >
                Login
              </Button>

              <div className="text-center mt-3">
                <p>
                  Create a new account?
                  <Link to="/signup" className="text-decoration-none" style={{ color: "#1c1c3d" }}>
                    Sign Up
                  </Link>
                </p>
              </div>
            </Form>
          </div>

          {/* Right Section: Image & Welcome Message (Hidden on Small Screens) */}
          <div
            className="d-none d-md-flex flex-column justify-content-center align-items-center text-white"
            style={{
              width: "100%",
              background: "#1c1c3d",
              padding: "20px",
              margin: 0,
              height: "100%",
            }}
          >
            <h2 className="text-center mb-4">Welcome to PawHomes!</h2>
            <p className="text-center mb-4" style={{ color: "#E0E0E0", fontSize: "14px" }}>
              Find the perfect pet for adoption and give them a loving home. Join our community now!
            </p>
            <img
              src={Cat}
              alt="Adopt a pet"
              style={{ width: "100%", maxWidth: "300px", borderRadius: "10px" }}
            />
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default Login;
