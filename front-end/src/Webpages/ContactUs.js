import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import "../App.css";
import logo from "../Assets/undraw_term_sheet_re_ju7s.png";
import { useState } from "react";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PhoneInput, usePhoneValidation } from "react-international-phone";
import "react-international-phone/style.css";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import links from "../Components/HostedLinks";

function ContactUs() {
  const issues = [
    {
      id: "1",
      store: "General",
    },
    {
      id: "2",
      store: "Technical",
    },
    {
      id: "3",
      store: "Feature Requests",
    },
    {
      id: "4",
      store: "Feedback",
    },
  ];

  const navigate = useNavigate();
  const handleIssueField = (event) => {
    setIssueField(event);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      email: email,
      phone: telephone,
      queryField: issueField,
      queryDetails: query,
    };
    try {
      const response = await axios.post(
        `${links}/contact`,
        // `http://localhost:3000/contact`,
        formData
      );
      console.log(response.data.message);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error during sending contact data", error);
    }
    handleShow();
  };
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [message, setMessage] = useState("");
  const [issueField, setIssueField] = useState("");
  const phoneValidation = usePhoneValidation(telephone);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex-container">
        <div className="flex-child">
          <p style={{ fontSize: "30px" }}>
            Always ready to give you an helping hand! Contact us right away!
          </p>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="emailID">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                value={email}
                placeholder="Enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Label>Phone</Form.Label>
                  <PhoneInput
                  defaultCountry="ca"
                  value={telephone}
                  onChange={(phone) => setTelephone(phone)}
                  style={{ marginBottom: "15px" }}
                />
                </Col>
                <Col>
                  <Form.Label>Query Field</Form.Label>
                  <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="Text input with dropdown button"
                    value={issueField}
                    required
                    placeholder="mention issue (if not present)"
                    onChange={(e) => setIssueField(e.target.value)}
                  />
                  <DropdownButton
                    variant="outline-secondary"
                    title=""
                    id="input-group-dropdown-1"
                    onSelect={handleIssueField}
                  >
                    {issues.map((stores) => (
                      <>
                        <Dropdown.Item eventKey={stores.store}>
                          {stores.store}
                        </Dropdown.Item>
                      </>
                    ))}
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClickCapture={() => {
                        setIssueField("");
                      }}
                    >
                      Clear
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>Cancel</Dropdown.Item>
                  </DropdownButton>
                </InputGroup>
                </Col>
              </Row>
              {!phoneValidation.isValid && (
                <Alert variant="warning">
                  Please enter a valid phone number
                </Alert>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="TextArea">
              <Form.Label>Query</Form.Label>
              <Form.Control
                as="textarea"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                rows={5}
                placeholder="Please give us a brief description of the query"
                required
              />
            </Form.Group>
            <Button
              variant="outline-primary"
              type="submit"
              disabled={!phoneValidation.isValid}
            >
              Submit
            </Button>{" "}
          </Form>
        </div>
        <div className="flex-child">
          <Image
            src={logo}
            fluid
            style={{ width: "100%", height: "100%" }}
          ></Image>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thank you for contacting us!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            onClick={() => {
              handleClose();
              navigate(`/`);
            }}
          >
            Home Page
          </Button>
        </Modal.Footer>
      </Modal>
    </motion.div>
  );
}

export default ContactUs;
