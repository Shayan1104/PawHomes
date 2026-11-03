import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Alert, Spinner, Tab, Tabs } from "react-bootstrap";
import Layout from "../Layout/Layout";

const RequestsStatus = () => {
  const [shelterStatus, setShelterStatus] = useState(null);
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem("userToken");
      console.log("Token being sent:", token); // Debugging
  
      try {
        const [shelterRes, adoptionRes] = await Promise.all([
          axios.get("http://localhost:5000/api/requests/shelter-status", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/requests/adoption-status", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
  
        setShelterStatus(shelterRes.data);
        setAdoptionRequests(adoptionRes.data.data);
      } catch (error) {
        console.error("API Request Failed:", error.response?.data || error);
        setError("Failed to fetch requests.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchRequests();
  }, []);
  

  return (
    <Layout>
    <div className="container mt-4">
      <h2 className="text-center mb-4">Requests Status</h2>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      <Tabs defaultActiveKey="shelter" className="mb-3">
        {/* Shelter Request Status */}
        <Tab eventKey="shelter" title="Shelter Registration Status">
          {shelterStatus ? (
            <Alert variant={shelterStatus.status === "approved" ? "success" : shelterStatus.status === "pending" ? "warning" : "danger"}>
              <strong>Status:</strong> {shelterStatus.status}
              {shelterStatus.status === "rejected" && <p><strong>Reason:</strong> {shelterStatus.rejectionReason}</p>}
            </Alert>
          ) : (
            <Alert variant="info">No shelter registration request found.</Alert>
          )}
        </Tab>

        {/* Adoption Request Status */}
        <Tab eventKey="adoption" title="Adoption Requests">
          {adoptionRequests.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Pet Name</th>
                  <th>Status</th>
                  <th>Reason (If Rejected)</th>
                </tr>
              </thead>
              <tbody>
                {adoptionRequests.map((request, index) => (
                  <tr key={index}>
                    <td>{request.petName}</td>
                    <td>{request.status}</td>
                    <td>{request.rejectionReason || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert variant="info">No adoption requests found.</Alert>
          )}
        </Tab>
      </Tabs>
    </div>
    </Layout>
  );
};

export default RequestsStatus;
