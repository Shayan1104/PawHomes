import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams

const PetAdoptionForm = () => {
  const { id } = useParams(); // Get pet ID from the URL
  const [petName, setPetName] = useState(""); // Store pet name
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    adopterName: "",
    contactNo: "",
    secondaryContact: "",
    cnic: "",
    email: "",
    residentialAddress: "",
    hadPetsBefore: "",
    whereAreTheyNow: "",
    primaryVet: "",
    familyAllergic: "",
    permissionFromHousehold: "",
    indoorOutdoor: "",
  });

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Check authentication
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch pet details using the ID
  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/pets/${id}`);
        setPetName(response.data.name);
      } catch (error) {
        console.error("Error fetching pet details:", error);
      }
    };

    if (id) {
      fetchPetDetails();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.adopterName) newErrors.adopterName = "Adopter's name is required.";
    if (!formData.contactNo) {
      newErrors.contactNo = "Contact number is required.";
    } else if (!/^\d{10,15}$/.test(formData.contactNo)) {
      newErrors.contactNo = "Invalid contact number. Must be 10-15 digits.";
    }
    if (!formData.cnic) {
      newErrors.cnic = "CNIC number is required.";
    } else if (!/^\d{13}$/.test(formData.cnic)) {
      newErrors.cnic = "CNIC must be 13 digits.";
    }
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.residentialAddress) newErrors.residentialAddress = "Address is required.";
    if (!formData.hadPetsBefore) newErrors.hadPetsBefore = "Please answer if you had pets before.";
    if (!formData.primaryVet) newErrors.primaryVet = "Primary vet information is required.";
    if (!formData.familyAllergic) newErrors.familyAllergic = "Please answer about allergies.";
    if (!formData.permissionFromHousehold) newErrors.permissionFromHousehold = "Permission is required.";
    if (!formData.indoorOutdoor) newErrors.indoorOutdoor = "Specify indoor or outdoor.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(false);
      return;
    }

    setErrors({});
    try {
      const token = localStorage.getItem("userToken");

      const response = await axios.post(
        "http://localhost:5000/api/adopt/adopt-request",
        { ...formData, pet: id }, // Use pet ID from URL
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Form submitted:", response.data);
      setSuccess(true);
      setFormData({
        adopterName: "",
        contactNo: "",
        secondaryContact: "",
        cnic: "",
        email: "",
        residentialAddress: "",
        hadPetsBefore: "",
        whereAreTheyNow: "",
        primaryVet: "",
        familyAllergic: "",
        permissionFromHousehold: "",
        indoorOutdoor: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      alert("Failed to submit adoption request.");
      setSuccess(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div
        style={{
          backgroundColor: "lightblue",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container
          className="p-5"
          style={{
            margin: "20px",
            border: "1px solid black",
            borderRadius: "10px",
            backgroundColor: "black",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h3 className="text-center mb-4" style={{ color: "white" }}>
            You need to log in or sign up to access this form.
          </h3>
          <div className="d-flex justify-content-center">
            <Button variant="primary" onClick={() => alert("You need to Sign up first!")}>
              Log In / Sign Up
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "lightblue",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        className="p-5"
        style={{
          margin: "20px",
          border: "1px solid black",
          borderRadius: "10px",
          backgroundColor: "black",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h3 className="text-center mb-4" style={{ color: "white" }}>
          Pet Adoption Form for {petName || "Loading..."}
        </h3>
        {success && <Alert variant="success">Adoption form submitted successfully!</Alert>}
        <Form onSubmit={handleSubmit} style={{ color: "white" }}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "white" }}>Adopter's Name</Form.Label>
                <Form.Control
                  type="text"
                  name="adopterName"
                  value={formData.adopterName}
                  onChange={handleChange}
                  isInvalid={!!errors.adopterName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.adopterName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "white" }}>Contact No</Form.Label>
                <Form.Control
                  type="text"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  isInvalid={!!errors.contactNo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.contactNo}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Secondary Contact</Form.Label>
                <Form.Control
                  type="text"
                  name="secondaryContact"
                  value={formData.secondaryContact}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>CNIC No</Form.Label>
                <Form.Control
                  type="number"
                  name="cnic"
                  value={formData.cnic}
                  onChange={handleChange}
                  isInvalid={!!errors.cnic}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.cnic}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
          <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Residential Address</Form.Label>
            <Form.Control
              type="text"
              name="residentialAddress"
              value={formData.residentialAddress}
              onChange={handleChange}
              isInvalid={!!errors.residentialAddress}
            />
            <Form.Control.Feedback type="invalid">
              {errors.residentialAddress}
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
          </Row>
          <Row>
          <Col md={6}>  
          <Form.Group className="mb-3">
            <Form.Label>Have you had pets before?</Form.Label>
            <Form.Select
              name="hadPetsBefore"
              value={formData.hadPetsBefore}
              onChange={handleChange}
              isInvalid={!!errors.hadPetsBefore}
            >
              <option value="">Select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.hadPetsBefore}
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
          <Col>
          <Form.Group className="mb-3">
            <Form.Label>If so, where are they now?</Form.Label>
            <Form.Control
              type="text"
              name="whereAreTheyNow"
              value={formData.whereAreTheyNow}
              onChange={handleChange}
            />
          </Form.Group>
          </Col>
          </Row>
          <Row>
          <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Primary Vet</Form.Label>
            <Form.Control
              type="text"
              name="primaryVet"
              value={formData.primaryVet}
              onChange={handleChange}
              isInvalid={!!errors.primaryVet}
            />
            <Form.Control.Feedback type="invalid">
              {errors.primaryVet}
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
           <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Is anyone in your family allergic to pets?</Form.Label>
            <Form.Select
              name="familyAllergic"
              value={formData.familyAllergic}
              onChange={handleChange}
              isInvalid={!!errors.familyAllergic}
            >
              <option value="">Select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.familyAllergic}
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
          </Row>
          <Row>
            <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Do you have permission from your household?</Form.Label>
            <Form.Select
              name="permissionFromHousehold"
              value={formData.permissionFromHousehold}
              onChange={handleChange}
              isInvalid={!!errors.permissionFromHousehold}
            >
              <option value="">Select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.permissionFromHousehold}
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
          <Col>
          <Form.Group className="mb-4">
            <Form.Label>Will the pet be kept indoors or outdoors?</Form.Label>
            <Form.Select
              name="indoorOutdoor"
              value={formData.indoorOutdoor}
              onChange={handleChange}
              isInvalid={!!errors.indoorOutdoor}
            >
              <option value="">Select...</option>
              <option value="Indoors">Indoors</option>
              <option value="Outdoors">Outdoors</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.indoorOutdoor}
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
          </Row>
          <div className="d-flex justify-content-center">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default PetAdoptionForm;
