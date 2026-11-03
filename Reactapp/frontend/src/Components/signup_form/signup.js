import React, { useState } from "react";
import { Alert, Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Cat from "../../Images/Dog.jpg";
import Layout from "../../Layout/Layout";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [backendError, setBackendError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w.+-]+@gmail\.com$/.test(formData.email)) {
      newErrors.email = "Only Gmail accounts (@gmail.com) are allowed.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password must include at least one uppercase letter.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password = "Password must include at least one special character.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBackendError("");
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(false);
    } else {
      setErrors({});
      try {
        const response = await axios.post("http://localhost:5000/api/auth/signup", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        if (response.data.message === "User successfully registered") {
          setSuccess(true);
          setFormData({ name: "", email: "", password: ""});
        } else {
          setBackendError(response.data.message);
        }
      } catch (error) {
        console.error(error);
        setBackendError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <Layout>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <Container
          className="d-flex flex-column flex-md-row bg-white shadow"
          style={{
            maxWidth: "900px",
            minHeight: "80vh",
            borderRadius: "10px",
            overflow: "hidden",
            padding: 0,
          }}
        >
          {/* Left Section: Welcome Text & Image (Hidden on Small Screens) */}
          <div
            className="d-none d-md-flex flex-column justify-content-center align-items-center text-white p-4"
            style={{
              width: "50%",
              background: "#1c1c3d",
            }}
          >
            <h2 className="text-center mb-3">Join PawHomes Today!</h2>
            <p className="text-center mb-3" style={{ color: "#E0E0E0", fontSize: "14px" }}>
              Sign up to find your perfect pet or help others by listing pets for adoption.
            </p>
            <img
              src={Cat}
              alt="Signup"
              style={{ width: "100%", maxWidth: "250px", borderRadius: "10px" }}
            />
          </div>

          {/* Right Section: Signup Form */}
          <div
            className="d-flex flex-column justify-content-center align-items-center text-dark p-4"
            style={{ width: "100%", flex: "1", overflowY: "auto" }}
          >
            <h1 className="text-center" style={{ fontSize: "32px" }}>Sign Up</h1>
            <p className="text-center" style={{ color: "#999999", fontSize: "14px" }}>
              Create an account to start your journey!
            </p>

            {success && <Alert variant="success">User successfully registered!</Alert>}
            {backendError && <Alert variant="danger">{backendError}</Alert>}
            {Object.keys(errors).length > 0 && <Alert variant="danger">Please fix the highlighted errors.</Alert>}

            <Form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "350px" }}>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>

              <Button
                type="submit"
                className="w-100 mb-3"
                style={{ background: "#1c1c3d", border: "none", padding: "10px" }}
              >
                Sign Up
              </Button>

              <div className="text-center">
                <p>
                  Already have an account?
                  <Link to="/login" className="text-decoration-none" style={{ color: "#1c1c3d" }}>
                    Login Here
                  </Link>
                </p>
              </div>
            </Form>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default Signup;
