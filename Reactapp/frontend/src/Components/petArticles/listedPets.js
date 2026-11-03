import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import axios from "axios";

  const ListedPets = () => {
    const [listedPets,setlistedPets] = useState([]);
   const [sidebarOpen, setSidebarOpen] = useState(false);
     useEffect(() => {
    const fetchPets = async () => {
        try {
            const response = await axios.get("http://localhost5000/getallPets")
            setlistedPets(response.data.alllistedPets)
        } catch (error) {
            console.error("Error fetching shelters:", error);
        }
    };
    fetchPets();
   }, []);
   
    return (
    <div style={{ display: "flex" }}>
      {/* Content */}
      <div
        style={{
          marginLeft: sidebarOpen ? "300px" : "60px", // Adjust content margin based on sidebar
          transition: "margin-left 0.3s ease",
          padding: "20px",
          width: "100%",
        }}
      >
        {listedPets.map((Pets) => (
          <Card style={{ width: "18rem", marginBottom: "20px" }} key={Pets._id}>
            <Card.Body>
              <Card.Title>{Pets.PetName}</Card.Title>
              <Card.Text>{Pets.description}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ListedPets
