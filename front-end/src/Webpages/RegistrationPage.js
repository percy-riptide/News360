// authors: Navaneeth Manikyala  && Pratik Patil
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import "../App.css";
import logo from "../Assets/undraw_Welcoming_re_x0qo.png";
import { useState } from "react";
import PasswordChecklist from "react-password-checklist";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React from 'react';
import axios from "axios";
import links from "../Components/HostedLinks";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "20px",
  flexDirection: "column",
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

function RegistrationPage(){
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [validation, setValidation] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [password, setPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [problem,setProblem]=useState("");





  const handleSubmit = async () => {
    const formData={firstName,lastName,email,password,"language":"English","categories":""};
    try {
      const response = await axios.post(`${links}register`, formData);

      console.log(response.data);
      if(response.data.signal==="0"){

        console.log("12");
        navigate('/login');
      }
      else{

        console.log("1")
        setProblem(response.data.message);
        handleShow();
      }
      // 
      // Handle success or redirect as needed
    } catch (error) {
      console.error('Error during registration', error);
      // Handle error or show error message
    }
  };

  return (


   <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.4, duration: 1 }} // Adding a delay of 1 second before the animation starts
    >
      <div className="flex-container">
        <div className="flex-child">
          <p style={{ fontSize: "30px" }}>We would love to have you onboard!</p>

          <Form>


            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                placeholder="Enter your first name (only letters allowed)"
                required
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                onKeyPress={(event) => {
                  if (!/[A-Za-z]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </Form.Group>


            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                placeholder="Enter your last name (only letters allowed)"
                required
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                onKeyPress={(event) => {
                  if (!/[A-Za-z]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </Form.Group>



            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Enter your email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                required
                placeholder="Enter your email address"
                onChange={(e) => {setEmail(e.target.value);}}
              />
            </Form.Group>



            {validateEmail(email) ? (
              <>
                <Alert variant="success">
                  Email is in correct format
                </Alert>
              </>
            ) : (
              <>
                <Alert variant="warning">
                  Email is not in correct format
                </Alert>
              </>
            )}


            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Enter Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                required
                placeholder="Choose a strong one :)"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />


            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={confirmNewPassword}
                placeholder="Don't forget it!"
                onChange={(e) => {
                  setConfirmNewPassword(e.target.value);
                }}
              />


            </Form.Group>
            <PasswordChecklist
              rules={["minLength", "specialChar", "number", "capital", "match"]}
              minLength={8}
              value={password}
              valueAgain={confirmNewPassword}
              onChange={(isValid) => {
                setValidation(isValid);
              }}
            />

            
            {validation && validateEmail(email) ? (
              <>
                <div style={containerStyle}>
                  <Button variant="outline-primary" onClick={()=>{handleSubmit()}}>
                    Sign up
                  </Button>{" "}
                </div>
              </>
            ) : (
              <>
                <div style={containerStyle}>
                  <p style={{ alignItems: "center" }}>
                    Meet all the conditions to signup!
                  </p>
                  <Button variant="outline-secondary" disabled >
                    Sign up
                  </Button>{" "}
                </div>
              </>
            )}


          </Form>


        </div>
        <div className="flex-child">
          <Image src={logo} fluid style={{width:'100%',height:'100%'}}></Image>
        </div>
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Problem !</Modal.Title>
        </Modal.Header>
        <Modal.Body>{problem}</Modal.Body>
        <Modal.Footer>
         
         
        </Modal.Footer>
      </Modal>


    </motion.div>
  );
}

export default RegistrationPage;