// authors: Navaneeth Manikyala  && Pratik Patil
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../Assets/pngegg.png";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function CollapsibleExample() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const userEmail = sessionStorage.getItem("email");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Navbar
        collapseOnSelect
        expand="lg"
        sticky="top"
        style={{ background: "#d7d9db" }}
      >
        <div className="container-fluid">
          <Navbar.Brand as={Link} to="/" className="ml-6">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            News360.
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto mr-16 space-x-9">
              <Nav.Link as={Link} to="/feed">
                Feed
              </Nav.Link>
              <Nav.Link as={Link} to="/faq">
                FAQ
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About Us
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact Us
              </Nav.Link>
              {userEmail ? (
                <DropdownButton
                  id="dropdown-basic-button"
                  title={userEmail.split("@")[0] + " "}
                  style={{ backgroundColor: "transparent" }}
                >
                  <Dropdown.Item
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    My Profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      navigate("/preferences");
                    }}
                  >
                    Preferences
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
                </DropdownButton>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </motion.div>
  );
}

export default CollapsibleExample;
