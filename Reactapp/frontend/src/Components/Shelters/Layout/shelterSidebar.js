import React, { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaUserCircle, FaPaw } from "react-icons/fa";
import PetsList from "../../cards";
import AddPet from "../addPets";
import AdoptionRequests from "../adoptionRequest";
const ShelterSideBar = () => {
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("profile"); // Track active tab

  const handleToggle = () => setOpen(!open);

  const items = [
    { text: "Profile", icon: <FaUserCircle />, key: "profile" },
    { text: "Add Pets", icon: <FaPaw />, key: "addPets" },
    { text: "Listed Pets", icon: <FaPaw />, key: "ListedPets" },
    { text: "Adoption Requests", icon: <FaUserCircle />, link: "/AdoptionRequests", key: "adoptionRequests" },
  ];

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Navbar
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          height: "100%",
          backgroundColor: "#1c1c3d",
          width: open ? "300px" : "60px",
          zIndex: 1000,
          transition: "width 0.3s ease",
        }}
        variant="light"
        className="flex-column"
      >
        {/* Toggle Button */}
        <Button
          variant="outline-light"
          onClick={handleToggle}
          style={{
            position: "absolute",
            top: "130px",
            right: "-20px",
            zIndex: 1100,
            borderRadius: "50%",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {open ? <FaChevronLeft size={18} /> : <FaChevronRight size={18} />}
        </Button>

        {/* Sidebar Content */}
        <Nav className="flex-column mt-5" style={{ fontSize: "20px", position: "absolute", top: "150px" }}>
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedTab(item.key)}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                padding: "10px 15px",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              <span style={{ fontSize: "30px", color: "#fff" }}>{item.icon}</span>
              {open && (
                <span style={{ marginLeft: "10px", paddingTop: "8px" }}>
                  {item.text}
                </span>
              )}
            </div>
          ))}
        </Nav>
      </Navbar>
      

      {/* Sidebar Overlay Style */}
      <div
        className={`main-content ${open ? "sidebar-open" : "sidebar-closed"}`}
        style={{ marginLeft: open ? "300px" : "60px", padding: "20px", width: "100%" }}
      >
        {selectedTab === "addPets" && <AddPet />} {/* Show AddPet when clicked */}
        {selectedTab === "adoptionRequests" && <AdoptionRequests />}
        {selectedTab === "ListedPets" && <PetsList />}
      </div>
    </div>
  );
};

export default ShelterSideBar;
