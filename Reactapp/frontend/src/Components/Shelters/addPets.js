import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";

const AddPet = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    type:"",
    description: "",
    gender:"",
    image: null
  });

  const [preview, setPreview] = useState(null); // Image preview

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file)); // Show preview
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");
    if (!token) {
      alert("You are not logged in. Please log in first.");
      return;
    }
  
    const data = new FormData();
    data.append("name", formData.name);
    data.append("age", formData.age);
    data.append("type", formData.type);  // ✅ Added this
    data.append("description", formData.description);
    data.append("gender", formData.gender)
    if (formData.image) {
      data.append("image", formData.image);
    }
  
    // Debugging FormData
    for (let pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/pets/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Response:", response.data);
      alert("Pet added successfully!");
    } catch (error) {
      console.error("Full error:", error);
      console.error("Error response:", error.response);
      alert(`Failed to add pet: ${error.response?.data?.message || error.message}`);
    }
  };
  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "40rem", padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <Card.Body>
          <h3 className="text-center mb-4">🐾 Add a Pet for Adoption</h3>
          <Form onSubmit={handleSubmit}>
            {/* Pet Name */}
            <Form.Group className="mb-3">
              <Form.Label>Pet Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter pet's name" value={formData.name} onChange={handleChange} required />
            </Form.Group>

            {/* Age & Breed (Row Layout) */}
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Age (in years)</Form.Label>
                  <Form.Control type="number" name="age" placeholder="Enter age" value={formData.age} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
            <Form.Label>Pet Type</Form.Label>
            <Form.Select name="type" value={formData.type} onChange={handleChange} required>
              <option value="">Select type</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="rabbit">Rabbit</option>
              <option value="other">Other</option>
            </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select name="gender" value={formData.type} onChange={handleChange} required>
              <option value="">Select type</option>
              <option value="dog">Male</option>
              <option value="cat">Female</option>
            </Form.Select>
            </Form.Group>
            
            {/* Description */}
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" rows={3} placeholder="Describe the pet" value={formData.description} onChange={handleChange} required />
            </Form.Group>

            {/* Image Upload */}
            <Form.Group className="mb-3">
              <Form.Label>Upload Pet Image</Form.Label>
              <Form.Control type="file" name="image" accept="image/*" onChange={handleChange} required />
            </Form.Group>

            {/* Image Preview */}
            {preview && (
              <div className="text-center mb-3">
                <img src={preview} alt="Pet Preview" style={{ width: "100%", maxHeight: "250px", objectFit: "cover", borderRadius: "10px" }} />
              </div>
            )}

            {/* Submit Button */}
            <Button variant="primary" type="submit" className="w-100">
              🐶 List Pet
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddPet;
