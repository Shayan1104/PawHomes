import { Button, Card, CardBody } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Layout/Layout";
import PlaceholderImage from "../Images/Cat.jpg"; // Fallback image

const PetsProfile = () => {
  const { id } = useParams();
  console.log("Extracted Pet ID:", id); // ✅ Get pet ID from URL
  const navigate = useNavigate(); // ✅ Fix navigation issue
  const [pet, setPet] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Pet ID from URL:", id); // 🔍 Debugging

    if (!id) {
      console.error("Pet ID is missing in URL!");
      setError("Invalid pet ID");
      return;
    }

    const fetchPetDetails = async () => {
      try {
        console.log(`Fetching pet details for ID: ${id}`); // Debugging API call
        const response = await axios.get(`http://localhost:5000/api/pets/${id}`);
        console.log("API Response:", response.data); // 🔍 Debugging API response
        setPet(response.data);
      } catch (error) {
        console.error("Error fetching pet details:", error.response?.data || error.message);
        setError(error.response?.data?.message || "Failed to load pet details");
      }
    };

    fetchPetDetails();
  }, [id]);

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  if (!pet) {
    return <p style={{ textAlign: "center" }}>Loading pet details...</p>;
  }

  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
        <img
          src={pet.image ? `http://localhost:5000/uploads/${pet.image}` : PlaceholderImage}
          style={{
            width: "500px",
            alignContent: "center",
            padding: "20px",
          }}
          alt={pet.name || "Pet Image"}
        />
        <Card
          style={{
            width: "500px",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardBody
            style={{
              display: "flex",
              gap: "20px",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Card.Text
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2>{pet.name || "No Name Available"}</h2>
              <h3>~ {pet.type || "Unknown Type"}</h3>
            </Card.Text>
            <Card.Text>
              <h4>{pet.age ? `${pet.age} Years Old` : "Age Unknown"} ~ {pet.gender || "Unknown Gender"}</h4>
            </Card.Text>
            <div style={{ display: "flex", gap: "15px" }}>
              <Button
                variant="light"
                style={{
                  borderRadius: "50px",
                  padding: "10px 20px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #ccc",
                }}
              >
                Favorite
              </Button>
              <Button
                variant="danger"
                style={{
                  borderRadius: "50px",
                  padding: "10px 20px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  border: "none",
                }}
                onClick={() => navigate(`/PetAdoptionForm/${pet._id}`)}
              >
                Adopt Here
              </Button>
            </div>
            <Card.Text>
              <p>{pet.description || "No description available."}</p>
            </Card.Text>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default PetsProfile;
