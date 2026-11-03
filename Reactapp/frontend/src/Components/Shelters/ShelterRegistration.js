import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Cat from '../../Images/Cat.jpg';
import axios from 'axios';

const ShelterRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    contact: '',
    operatingHours: '',
    description: '',
    verificationDocument: null,
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, verificationDocument: file });
  };

  const validate = () => {
    const newErrors = {};
    const { name, email, password, location, contact, operatingHours, description, verificationDocument } =
      formData;

    if (!name) newErrors.name = 'Shelter name is required.';
    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      newErrors.email = 'Email must be a valid Gmail address.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(password)) {
      newErrors.password = 'Password must include an uppercase letter and a special character.';
    }
    if (!location) newErrors.location = 'Location is required.';
    if (!contact) newErrors.contact = 'Contact is required.';
    if (!operatingHours) newErrors.operatingHours = 'Operating hours are required.';
    if (!description) newErrors.description = 'Description is required.';
    if (!verificationDocument) {
      newErrors.verificationDocument = 'Verification document is required.';
    } else if (!['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'].includes(verificationDocument.type)) {
      newErrors.verificationDocument = 'Only PDF, JPG, and PNG files are allowed.';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
  
    const token = localStorage.getItem("userToken"); // Retrieve token from localStorage
  
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("contact", formData.contact);
    formDataToSend.append("operatingHours", formData.operatingHours);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("verificationDocument", formData.verificationDocument);
  
    console.log("Sending Form Data:", Object.fromEntries(formDataToSend));
    console.log("Token retreived", token);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/shelters/registeryourshelter",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      
      console.log("Request Headers:", response.config.headers);
      
      setSuccessMessage("Shelter Registered Successfully");
      setFormData({
        name: '',
        email: '',
        password: '',
        location: '',
        contact: '',
        operatingHours: '',
        description: '',
        verificationDocument: null,
      });
  
      setErrors({});
      navigate('/');
    } catch (error) {
      console.error("Error:", error.response || error);
      setErrorMessage(error.response?.data?.message || "Failed to register shelter.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        backgroundImage: `url(${Cat})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '500px',
          width: '100%',
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
        }}
      >
        <h3 style={{ textAlign: 'center', color: 'white' }}>Shelter Registration</h3>
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formShelterName">
            <Form.Label style={{ color: 'white' }}>Shelter Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter shelter name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formEmail">
                <Form.Label style={{ color: 'white' }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Gmail address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formPassword">
                <Form.Label style={{ color: 'white' }}>Password</Form.Label>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                <Form.Check
                  type="checkbox"
                  label="Show Password"
                  style={{ color: 'white', marginTop: '5px' }}
                  onChange={(e) => setShowPassword(e.target.checked)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formLocation">
                <Form.Label style={{ color: 'white' }}>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  isInvalid={!!errors.location}
                />
                <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formContact">
                <Form.Label style={{ color: 'white' }}>Contact</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter contact info"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  isInvalid={!!errors.contact}
                />
                <Form.Control.Feedback type="invalid">{errors.contact}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formOperatingHours">
            <Form.Label style={{ color: 'white' }}>Operating Hours</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter operating hours"
              name="operatingHours"
              value={formData.operatingHours}
              onChange={handleChange}
              isInvalid={!!errors.operatingHours}
            />
            <Form.Control.Feedback type="invalid">{errors.operatingHours}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formDescription" style={{ gridColumn: 'span 2' }}>
            <Form.Label style={{ color: 'white' }}>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter goals or objectives"
              name="description"
              value={formData.description}
              onChange={handleChange}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formVerificationDocument">
            <Form.Label style={{ color: 'white' }}>Verification Document</Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileChange}
              isInvalid={!!errors.verificationDocument}
            />
            <Form.Control.Feedback type="invalid">{errors.verificationDocument}</Form.Control.Feedback>
          </Form.Group>
          <div style={{ display: "flex", justifyContent: 'center', marginTop: '20px' }}>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Register'}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ShelterRegistration;