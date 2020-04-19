import React, { Fragment } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../react-auth0-spa';

const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Navbar.Brand as={Link} to="/">
        Residency UI
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Item>
          <Nav.Link as={Link} to="/marketplace">
            Marketplace
          </Nav.Link>
        </Nav.Item>
        {isAuthenticated && (
          <NavDropdown title="Actions" id="basic-nav-dropdown">
            <NavDropdown.Item href="/addProgram">Add Program</NavDropdown.Item>
            <NavDropdown.Item href="/editProgram">
              Edit Program
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/addProgramDetail">
              Add Program Detail
            </NavDropdown.Item>
            <NavDropdown.Item href="/editProgramDetail">
              Edit Program Detail
            </NavDropdown.Item>
          </NavDropdown>
        )}
      </Nav>
      <Nav className="mr-sm-2">
        <Nav.Item className="justify-content-end">
          {!isAuthenticated && (
            <Nav.Link
              onClick={() =>
                loginWithRedirect({
                  scope: 'read:status, write:program',
                  audience: 'https://github.com/tguar/ResidencyAPI',
                })
              }
            >
              Sign in
            </Nav.Link>
          )}

          {isAuthenticated && (
            <Nav.Link className="justify-content-end" onClick={() => logout()}>
              Sign Out
            </Nav.Link>
          )}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default Header;
