import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Residency UI</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Item>
          <Link to="/marketplace ">Marketplace</Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default Header;
