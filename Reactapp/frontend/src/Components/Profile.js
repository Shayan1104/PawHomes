import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function Profile() {
  // State for user profile
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    profilePicture: '',
  });

  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [successMessage, setSuccessMessage] = useState(''); // Success feedback
  const [imageFile, setImageFile] = useState(null); // For uploading profile pictures

  // Load profile data from localStorage
  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
    } else {
      setUserProfile({
        name: 'John Doe',
        email: 'johndoe@example.com',
        profilePicture: '',
      });
    }
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Preview the uploaded image
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          profilePicture: event.target.result, // Save base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save changes to localStorage
  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    setSuccessMessage('Profile updated successfully!');
    setIsEditing(false); // Exit edit mode
  };

  return (
    <Container className="mt-5" style={{
        margin:"20px",
        padding:'20px',
        border: "1px solid black",
        borderRadius: "10px",
        backgroundColor: "lightgrey",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    }}>
      <h2 className="mb-4">Your Profile</h2>

      {/* Success Message */}
      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
          {successMessage}
        </Alert>
      )}

      <Form>
        {/* Profile Picture */}
        <div className="mb-3 text-center">
          <img
            src={
              userProfile.profilePicture || 'https://via.placeholder.com/150'
            }
            alt="Profile"
            className="rounded-circle"
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
        </div>

        {isEditing ? (
          <>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label style={{color:'white'}}>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={userProfile.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label style={{color:'white'}}>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userProfile.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </Form.Group>

            <Form.Group controlId="formProfilePicture" className="mb-3">
              <Form.Label style={{color:'white'}}>Profile Picture</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>

            <Button variant="success" className="me-2" onClick={handleSave}>
              Save Changes
            </Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <div className="mb-3">
              <strong>Name:</strong> {userProfile.name}
            </div>
            <div className="mb-3">
              <strong>Email:</strong> {userProfile.email}
            </div>

            <Button variant="primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          </>
        )}
      </Form>
    </Container>
  );
}

export default Profile;
