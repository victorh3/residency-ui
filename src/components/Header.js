import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../contexts';

const Header = () => {
  const { isLoading, user, loginWithRedirect, logout } = useAuth0();

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
        <Nav.Item>
          <Nav.Link as={Link} to="/map">
            Map
          </Nav.Link>
        </Nav.Item>
        {user && (
          <NavDropdown title="Actions" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/addProgram">
              Add Program
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/editProgram">
              Edit Program
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/addProgramDetail">
              Add Program Detail
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/editProgramDetail">
              Edit Program Detail
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/external-api">
              API status
            </NavDropdown.Item>
          </NavDropdown>
        )}
      </Nav>
      <Nav className="mr-sm-2">
        <Nav.Item className="justify-content-end">
          {!isLoading && !user && (
            <Nav.Link onClick={loginWithRedirect}>Sign in</Nav.Link>
          )}
          {!isLoading && user && (
            <Nav.Link
              className="justify-content-end"
              onClick={() =>
                logout({ returnTo: `${window.location.origin}/residency-ui` })
              }
            >
              Sign Out
            </Nav.Link>
          )}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default Header;
