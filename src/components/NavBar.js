import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
  const { isLoggedIn, user, logOutUser, isManager } = useContext(AuthContext);
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>Flying-parcel</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              {isLoggedIn && isManager && (
                <>
                  <Nav.Link as={Link} to="/deliveries">
                    Deliveries
                  </Nav.Link>
                  <Nav.Link as={Link} to="/items">
                    Items
                  </Nav.Link>
                </>
              )}
              {!isManager && isLoggedIn && (
                <Nav.Link as={Link} to="/deliveries">
                  Deliveries
                </Nav.Link>
              )}
            </Nav>
            <Nav>
              {!isLoggedIn && (
                <>
                  <Nav.Link as={Link} to="/signup">
                    Sign Up
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                </>
              )}
              {!isManager && isLoggedIn && (
                <>
                  <span className="spanInNav">Hello, {user && user.name}</span>
                  <Link className="signupButton" onClick={logOutUser}>
                    Logout
                  </Link>
                </>
              )}
              {isManager && isLoggedIn && (
                <>
                  <span className="spanInNav">Hello, {user && user.name}</span>
                  <Link className="signupButton" onClick={logOutUser}>
                    Logout
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
