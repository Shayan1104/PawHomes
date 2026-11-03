import React, { useState, useEffect } from 'react';
import { Container, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import logo from '../../../Images/Pawhome.png';
import { useNavigate } from 'react-router-dom';

function AdminHeader() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  // Check login status and role on mount
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const role = localStorage.getItem('userRole'); // Retrieve the user's role
    setIsLoggedIn(!!token); // Set state based on token presence
    setUserRole(role); // Set role state
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Remove token
    localStorage.removeItem('userRole'); // Remove role
    setIsLoggedIn(false); // Update login state
    setUserRole(''); // Reset role
    navigate('/'); // Redirect to home page
  };

  const handleNavigation = (path) => {
    navigate(path); // Navigate to specified path
  };

  return (
    <Navbar
      style={{
        backgroundColor: '#1c1c3d',
        // borderBottom: '2px solid #4a90e2',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
      variant="dark"
      expand="lg"
      className="py-3"
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Pawhomes Logo"
            width="200px"
            height="75px"
            className="d-inline-block align-top me-2"
          />
        </Navbar.Brand>

        {/* Search Bar */}
        <Form className="d-flex ms-auto me-3">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
        </Form>

        {/* Conditional Rendering for Buttons */}
        {isLoggedIn ? (
          <div className="d-flex align-items-center">
            {userRole === 'admin' && (
              <Button
                variant="outline-warning"
                className="fw-bold me-2"
                onClick={() => handleNavigation('/adminPanel')}
              >
                Admin Panel
              </Button>
            )}
            <Button
              variant="outline-light"
              className="fw-bold me-2"
              onClick={() => handleNavigation('/profile')}
            >
              Profile
            </Button>
            <Button
              variant="outline-danger"
              className="fw-bold"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="d-flex">
            <Button
              variant="outline-light"
              className="fw-bold me-2"
              onClick={() => handleNavigation('/signup')}
            >
              Sign Up
            </Button>
            <Button
              variant="outline-light"
              className="fw-bold"
              onClick={() => handleNavigation('/login')}
            >
              Login
            </Button>
          </div>
        )}
      </Container>
    </Navbar>
  );
}

export default AdminHeader;
