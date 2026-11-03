import React, { useState, useEffect } from 'react';
import { Container, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import logo from "../../../Images/Pawhome.png"; 
import { useNavigate } from 'react-router-dom';

function ShelterNav() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  // Function to check login status & update role
  const updateRole = () => {
    const token = localStorage.getItem("userToken");
    const role = localStorage.getItem("userRole");

    setIsLoggedIn(!!token);
    setUserRole(role?.toLowerCase() || ''); 

    console.log("Updated Role in Navbar:", role); // Debugging
  };

  useEffect(() => {
    const updateRole = () => {
      const role = localStorage.getItem("userRole");
      console.log("Updated Role in Navbar:", role);
      setUserRole(role?.toLowerCase() || '');
      setIsLoggedIn(!!localStorage.getItem("userToken"));
    };
  
    updateRole(); // Run once on mount
  
    // Trigger update when storage changes
    const handleStorageChange = (event) => {
      if (event.key === "userRole" || event.key === "userToken") {
        updateRole();
      }
    };
  
    window.addEventListener("storage", handleStorageChange);
  
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);  
  

  const handleLogout = () => {
    localStorage.removeItem('userToken'); 
    localStorage.removeItem('userRole'); 
    setIsLoggedIn(false);
    setUserRole('');
    navigate('/'); 
    window.dispatchEvent(new Event("storage")); // Ensure UI updates
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Navbar
      style={{
        backgroundColor: '#1c1c3d',
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

        {/* Conditional Buttons */}
        {isLoggedIn ? (
          <div className="d-flex align-items-center">
            {userRole === 'shelteradmin' && (
              <Button
                variant="outline-warning"
                className="fw-bold me-2"
                onClick={() => handleNavigation('/shelterPanel')}
              >
                Shelter Panel
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

export default ShelterNav;
