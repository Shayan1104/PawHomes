import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";


const RegisteredShelters = () => {
  const [shelters, setShelters] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Track sidebar state

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getallshelters");
        setShelters(response.data.allshelters);
      } catch (error) {
        console.error("Error fetching shelters:", error);
      }
    };

    fetchShelters();
  }, []);

  return (
    <div style={{ display: "column"}}>
      {/* Content */}
      <div
        style={{
          marginLeft: sidebarOpen ? "300px" : "60px", // Adjust content margin based on sidebar
          transition: "margin-left 0.3s ease",
          padding: "20px",
          width: "100%",
        }}
      >
        {shelters.map((shelter) => (
          <Card style={{ width: "18rem", marginBottom: "20px" }} key={shelter._id}>
            <Card.Body>
              <Card.Title>{shelter.name}</Card.Title>
              <Card.Text>{shelter.description}</Card.Text>
              <Card.Text>{shelter.contact}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RegisteredShelters;
