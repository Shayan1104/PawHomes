import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PlaceholderImage from "../Images/Cat.jpg"; // Placeholder image
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../Layout/Layout";

const ListofPets = () => {
    const navigate = useNavigate();
    const [pets, setPets] = useState([]);
    const [shelters, setShelters] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch pets
          const petResponse = await axios.get("http://localhost:5000/api/pets/all");
          setPets(petResponse.data);
  
          // Fetch shelters
          const response = await axios.get("http://localhost:5000/getallshelters");
        setShelters(response.data || []); 
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <Layout>
      <Container className="mt-4">
        <h3 className="text-center">🐾 Adoptable Pets</h3>
        <p className="text-center">Find a loving companion looking for a home.</p>
        <Row className="justify-content-center">
          {pets.length > 0 ? (
            pets.map((pet) => {
              // Find the shelter that matches the pet's shelter ID
              const shelter = Array.isArray(shelters) ? shelters.find(s => s.id === pet.shelterId) : null;
              return (
                <Col key={pet._id} md={4} className="mb-4">
                  <Card style={{ width: "18rem", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                    <Card.Img
                      variant="top"
                      src={pet.image ? `http://localhost:5000/uploads/${pet.image}` : PlaceholderImage}
                      alt={pet.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title>{pet.name}</Card.Title>
                      <Card.Text>{pet.description}</Card.Text>
                      <Card.Text>
                        <strong>Shelter:</strong> {shelter ? shelters.name : "N/A"}
                      </Card.Text>
                      <Button variant="primary" onClick={() => navigate(`/petProfile/${pet._id}`)}>
                         View Profile
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <div className="text-center mt-4">
              <p>No pets are currently available for adoption.</p>
              <p>Check back soon, new pets are added regularly!</p>
            </div>
          )}
        </Row>
      </Container>
      </Layout>
  )
}
export default ListofPets;
