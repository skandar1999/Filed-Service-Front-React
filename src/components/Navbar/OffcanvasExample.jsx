import React, { useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  Offcanvas,
  NavDropdown,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faUser,
  faEnvelope,
  faTv,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import './OffcanvasExample.css'; 
import { faMobileAlt } from "@fortawesome/free-solid-svg-icons";



function OffcanvasExample() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [activeLink, setActiveLink] = useState(null); 

  const handleOffcanvasToggle = () => setShowOffcanvas(!showOffcanvas);

  const handleNavItemClick = (index) => {
    if (activeLink === index) {
      setActiveLink(null); 
    } else {
      setActiveLink(index); 
    }
  };

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-blue mb-3">
          <Container fluid>
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              onClick={handleOffcanvasToggle}
              
            />
          <Navbar.Brand className="d-flex align-items-center">
          
              <span className="text-white">STABLE TEST 0.1</span>
            </Navbar.Brand>
            <Nav.Link
              href="#"
              className="navbar-brand d-flex align-items-center ms-auto"
            >
              <FontAwesomeIcon
                icon={faUser}
                size="lg"
                className="me-1"
                style={{ color: "white" }}
              />
              <FontAwesomeIcon
                icon={faEnvelope}
                size="lg"
                className="ms-2"
                style={{ color: "white" }}
              />

              
            </Nav.Link>

            <Navbar.Offcanvas
              show={showOffcanvas}
              onHide={() => setShowOffcanvas(false)}
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
              style={{ width: "290px" }}
              className="custom-offcanvas"
            >
             <Offcanvas.Header closeButton style={{ borderBottom: '1px #dee2e4', backgroundColor: '#f8f9fa', color: '#0d87a5' }}>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} className="custom-offcanvas-title">
                ORDER LIST
              </Offcanvas.Title>  
            </Offcanvas.Header>

              <Offcanvas.Body>
                {/* Offcanvas menu content */}
                <Nav className="flex-column">
                  <Nav.Link
                    href="#"
                    className="custom-nav-link"
                    onClick={() => handleNavItemClick(1)}
                  >
                    <FontAwesomeIcon
                      icon={faMobileAlt}
                      size="lg"
                      className="me-2"
                    />
                    <span className="nav-text">Mobile workforce client</span>
                    {activeLink === 1 && (
                      <span className="submenu">
                        <NavDropdown.Item href="#">Option 1</NavDropdown.Item>
                        <NavDropdown.Item href="#">Option 2</NavDropdown.Item>
                      </span>
                    )}
                  </Nav.Link>
                  <Nav.Link
                    href="#"
                    className="custom-nav-link"
                    onClick={() => handleNavItemClick(2)}
                  >
                    <FontAwesomeIcon
                      icon={faVideo}
                      size="lg"
                      className="me-2"
                    />
                    <span className="nav-text">Video support client</span>
                    {activeLink === 2 && (
                      <span className="submenu">
                        <NavDropdown.Item href="#">Option A</NavDropdown.Item>
                        <NavDropdown.Item href="#">Option B</NavDropdown.Item>
                      </span>
                    )}
                  </Nav.Link>
                  <Nav.Link
                    href="#"
                    className="custom-nav-link"
                    onClick={() => handleNavItemClick(3)}
                  >
                    <FontAwesomeIcon icon={faTv} size="lg" className="me-2" />
                    <span className="nav-text">Schedule client</span>
                    {activeLink === 3 && (
                      <span className="submenu">
                        <NavDropdown.Item href="#">Option X</NavDropdown.Item>
                        <NavDropdown.Item href="#">Option Y</NavDropdown.Item>
                        <NavDropdown.Item href="#">Option Z</NavDropdown.Item>
                      </span>
                    )}
                  </Nav.Link>
                  <Nav.Link
                    href="#"
                    className="custom-nav-link"
                    onClick={() => handleNavItemClick(4)}
                  >
                    <FontAwesomeIcon icon={faUser} size="lg" className="me-2" />
                    <span className="nav-text">My info</span>
                    {activeLink === 4 && (
                      <span className="submenu">
                        <NavDropdown.Item href="#">Option P</NavDropdown.Item>
                        <NavDropdown.Item href="#">Option Q</NavDropdown.Item>
                      </span>
                    )}
                  </Nav.Link>

                  <Nav.Link
                    href="#"
                    className="custom-nav-link"
                    onClick={() => handleNavItemClick(5)}
                  >
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      size="lg"
                      className="me-2"
                    />
                    <span className="nav-text">Log out</span>
                    
                  </Nav.Link>
                  
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;
