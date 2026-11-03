import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Articleform = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] }); // Store the uploaded file
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    if (formData.image) {
      formDataToSend.append('image', formData.image); // Append the image
    }

    try {
      const response = await fetch('http://localhost:5000/article', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Server Response:', result);
        alert('Form submitted successfully!');
      } else {
        const errorData = await response.json();
        console.error('Error Response:', errorData);
        alert(errorData.error || 'Form submission failed!');
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      alert('Error submitting the form. Please check the console for details.');
    }
  };

  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div style={{ textAlign: 'center' }}>
          <Button variant="primary" type="submit" style={{ width: '100px' }}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Articleform;
