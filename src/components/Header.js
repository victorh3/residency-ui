import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
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
        <Nav.Item>
          <Nav.Link as={Link} to="/add">
            Add a Residency
          </Nav.Link>
          <Nav.Link as={Link} to="/external-api">
            Categories Status
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Nav className="mr-sm-2">
        <Nav.Item className="justify-content-end">
          {!isAuthenticated && (
            <Nav.Link
              onClick={() =>
                loginWithRedirect({
                  scope: 'read:status',
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
