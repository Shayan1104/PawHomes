import { NavLink } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navebar() {
  return (
    <>
      <Navbar style={{background:'Black'}}>
        <Container>
          <Nav className="me-auto">
            <NavLink href="/PetArticle" style={{color:'white'}}>Pet Arcticles</NavLink>
            <NavLink href="/ListofPets" style={{color:'white'}}>Pet Adoption</NavLink>
            <NavLink href="/Shelters" style={{color:'white'}}>Shelters</NavLink>
            <NavLink href="/ShelterRegistration" style={{color:'white'}}>Register your Shelter</NavLink>
            <NavLink href='/requests-status' style={{color:'white'}}>Requests Status</NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
export default Navebar;