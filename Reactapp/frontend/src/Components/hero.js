import React, { useState } from "react";
import { Carousel, Form, Button, ToggleButton, ToggleButtonGroup, Spinner } from "react-bootstrap";
import axios from "axios";
import Dog from "../Images/Dog.jpg";
import Dog1 from "../Images/Dog1.jpg";
import Cat2 from "../Images/Cat2.jpg";

// PetSearchFilter Component
function PetSearchFilter({ onSearch,setSearching }) {
  const [petTypeFilter, setPetTypeFilter] = useState("Dog");
  const [ageFilter, setAgeFilter] = useState("");
  const [area, setArea] = useState("");

  const handleSearch = () => { 
    setSearching(true);
    onSearch({ petType: petTypeFilter, age: ageFilter, area });
  };

  return (
    <div style={{ background: "#fff", padding: "20px" }}>
      <h3>Welcome to Pawhomes</h3>
      <h5>Unlock the Joy of Pet Parenting</h5>

      <Form.Group className="mb-3">
        <Form.Label><strong>Pet Type</strong></Form.Label><br />
        <ToggleButtonGroup type="radio" name="petType" value={petTypeFilter} onChange={setPetTypeFilter}>
          <ToggleButton id="tbg-radio-1" value="dog" variant="outline-secondary">Dog</ToggleButton>
          <ToggleButton id="tbg-radio-2" value="cat" variant="outline-secondary">Cat</ToggleButton>
          <ToggleButton id="tbg-radio-3" value="other" variant="outline-secondary">Other</ToggleButton>
        </ToggleButtonGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label><strong>Select Age</strong></Form.Label>
        <Form.Select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
          <option value="">Select from menu...</option>
          <option value="0-6">0-6 months</option>
          <option value="6-12">6-12 months</option>
          <option value="1-3">1-3 years</option>
          <option value="3+">3+ years</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label><strong>Area</strong></Form.Label>
        <Form.Control type="text" placeholder="Enter Area" value={area} onChange={(e) => setArea(e.target.value)} />
      </Form.Group>

      <Button variant="danger" className="w-50 fw-bold" onClick={handleSearch}>
        Start Your Search →
      </Button>
    </div>
  );
}

// PetResults Component (New Component)
function PetResults({ pets, loading, error, isSearching }) {
  return (
    <div style={{ marginTop: "20px" }}>
      {isSearching && <><h4>Search Results</h4>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="danger" />
          <p>Loading pets...</p>
        </div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : pets.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
          {pets.map((pet) => (
            <div key={pet._id} style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "10px", textAlign: "center" }}>
              <img src={`http://localhost:5000/uploads/${pet.image}`} alt={pet.name} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "10px" }} />
              <h5>{pet.name}</h5>
              <p>{pet.type} - {pet.age} years old</p>
              <p>{pet.area}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No pets found matching your criteria.</p>
      )}</>}
      
    </div>
  );
}

// ControlledCarousel Component
function ControlledCarousel() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const [searching,setSearching]=useState(false)
  const fetchPets = async (filters) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:5000/api/pets/search", {  // ✅ Corrected API endpoint
        params: {
          petType: filters.petType || "",
          age: filters.age || "",
          // area: filters.area || "",
        },
      });
  
      setSearchResults(response.data);
    } catch (err) {
      console.log("error")
      setError("Failed to fetch pets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px", margin: "20px" }}>
          <div style={{ flex: 1, padding: "10px", borderRadius: "10px" }}>
            <Carousel activeIndex={carouselIndex} onSelect={setCarouselIndex}>
              <Carousel.Item>
                <img className="d-block w-100" src={Dog} alt="First slide" />
                <Carousel.Caption>
                  <h3>Find Your Best Friend</h3>
                  <p>Search and adopt your perfect pet today.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={Dog1} alt="Second slide" />
                <Carousel.Caption>
                  <h3>Give Them a Home</h3>
                  <p>Provide love and care to a rescued pet.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={Cat2} alt="Third slide" />
                <Carousel.Caption>
                  <h3>Adopt, Don’t Shop</h3>
                  <p>Help reduce stray population by adopting.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
    
          <div style={{ flex: 1 }}>
            <PetSearchFilter onSearch={fetchPets} setSearching={setSearching} />
          </div>
        </div>
    
        {/* Pet Results Component */}
        <PetResults isSearching={searching} pets={searchResults} loading={loading} error={error} />
      </>
    );
} 
export default ControlledCarousel;
