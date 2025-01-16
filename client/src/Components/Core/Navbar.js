import React from 'react';
import { Link } from 'react-router-dom';
// import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import Auth from '../../util/auth';
import {Container,NavDropdown, Nav, Navbar} from 'react-bootstrap';
import '../../App.css';

import Hero from '../../Assets/choregasboardLong.png';



function AppNavbar(){

    return (
  <>
<div className="image-container"> 
  <img src={Hero} alt="Top Image" className="img-fluid top-image" /> 
  </div>

  <Navbar expand="lg" className="bg-body-tertiary">
  <Container>
    <Navbar.Brand href="#home"></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
      {Auth.loggedIn() ? (
        <>
        <Nav.Link href="Welcome">Dashboard</Nav.Link>
        <NavDropdown title="Household" id="basic-nav-dropdown">
          <NavDropdown.Item href="/AddHelpers">Add Helpers</NavDropdown.Item>
          <NavDropdown.Item href="/AddTasks">
            Add Tasks
          </NavDropdown.Item>
          <NavDropdown.Item href="/AddRewards">Add Rewards</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="/" onClick={Auth.logout}>Logout</Nav.Link>
        </>
         ) : (
          <>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/Signup">Sign Up</Nav.Link>
          </>

        )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
</>
);
}
      
  
  
  
  export default AppNavbar;
  