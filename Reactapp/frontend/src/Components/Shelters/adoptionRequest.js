import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

const AdoptionRequests = () => {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchRequests = async () => {
      if (!token) {
        console.error("No token found"); // Debugging log
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/adopt/adoption-requests", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched Requests:", response.data); // Debugging log
        setRequests(response.data); // Assuming response.data is the array
      } catch (error) {
        console.error("Error fetching adoption requests:", error.response?.data || error.message);
      }
    };

    fetchRequests();
  }, [token]); // Include token as a dependency

  const handleStatusUpdate = async (id, status) => {
    if (!token) return;

    try {
      await axios.put(
        `http://localhost:5000/api/adoptionRequests/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the UI immediately after status change
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === id ? { ...req, status } : req
        )
      );
    } catch (error) {
      console.error("Error updating status:", error.response?.data || error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Adoption Requests</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Pet</th>
            <th>User</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((req) => (
              <tr key={req._id}>
                <td>{req.pet?.name || "N/A"}</td>
                <td>{req.user?.fullName || req.user?.name || "N/A"}</td>
                <td>{req.status}</td>
                <td>
                  {req.status === "Pending" && ( // Fixed incorrect status comparison
                    <>
                      <Button
                        variant="success"
                        onClick={() => handleStatusUpdate(req._id, "Approved")}
                      >
                        Approve
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => handleStatusUpdate(req._id, "Rejected")}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No adoption requests found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default AdoptionRequests;
