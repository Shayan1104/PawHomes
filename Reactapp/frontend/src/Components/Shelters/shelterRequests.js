import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { Card} from "react-bootstrap";
const SheltersRequest = () => {
  const [shelterRequests, setShelterRequests] = useState([]);
  const API_BASE_URL = "http://localhost:5000/api/shelters"; // Avoid repeating the base URL

  // Fetch shelter requests
  const fetchShelterRequests = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized: No token found. Please log in again.");
      return;
    }
  
    try {
      const response = await axios.get(`${API_BASE_URL}/unapproved-shelters`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShelterRequests(response.data.data);
    } catch (error) {
      toast.error(`Failed to load shelter requests: ${error.response?.data?.message || error.message}`);
    }
  };
  useEffect(() => {
    fetchShelterRequests();
  }, []);

  // Approve shelter request
  const handleApprove = async (shelterId) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token); // Debugging step ✅
  
      if (!token) {
        toast.error("No token found. Please log in again.");
        return;
      }
  
      const response = await axios.put(
        `http://localhost:5000/api/shelters/approve-shelter/${shelterId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      fetchShelterRequests();
    } catch (error) {
      console.error("Approval error:", error);
      toast.error(`Failed to approve shelter: ${error.response?.data?.message || error.message}`);
    }
  };
  
  // Reject shelter request
  const handleReject = async (shelterId) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token); // Debugging step ✅
  
      if (!token) {
        toast.error("No token found. Please log in again.");
        return;
      }
  
      const response = await axios.delete(
        `http://localhost:5000/api/shelters/reject-shelter/${shelterId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      fetchShelterRequests();
    } catch (error) {
      console.error("Rejection error:", error);
      toast.error(`Failed to reject shelter: ${error.response?.data?.message || error.message}`);
    }
  };
  
  return (
    <div style={{ margin: "20px", marginLeft: "100px" }}>
      <h1>Shelter Requests</h1>
      {shelterRequests.length === 0 ? (
        <p>No shelter requests at the moment.</p>
      ) : ( <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '25px' }}>
             {shelterRequests.map((shelter) => (
            <Card style={{ width: '18rem' }} key={shelter.id}>
              <Card.Img variant="top" src={shelter.image} alt={shelter.image} />
              <Card.Body>
            <Card.Title>{shelter.name}</Card.Title>
            <Card.Text>{shelter.description}</Card.Text>
            <Card.Text>{shelter.contact}</Card.Text>
            <Card.Text>{shelter.email}</Card.Text>
              <div style={{ display: "flex", gap: "15px" }}>
                <Button variant="success" onClick={() => handleApprove(shelter._id)}>Approve</Button>
                <Button variant="danger" onClick={() => handleReject(shelter._id)}>Reject</Button>
              </div>
              </Card.Body>
            </Card>
          ))}
        
        </div>
      )}
    </div>
  );
};

export default SheltersRequest;
