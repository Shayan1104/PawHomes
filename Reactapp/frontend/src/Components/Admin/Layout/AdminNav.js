import React from 'react'
import { Navbar,Container,NavLink,Nav } from 'react-bootstrap'

const AdminNav = () => {
  return (
    <>
      <Navbar style={{background:'black'}}>
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/PetArticle" style={{color:'white'}}>Pet Arcticles</Nav.Link>
            <Nav.Link href="/PetsList" style={{color:'white'}}>Pet Adoption</Nav.Link>
            <NavLink href="/Shelters" style={{color:'white'}}>Shelters</NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default AdminNav
