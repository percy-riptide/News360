// authors: navaneeth Manikyala 
import React, { useState } from "react";
import { motion } from "framer-motion";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../App.css";
import { useNavigate, Link } from "react-router-dom";

import Button from "react-bootstrap/Button";

import Alert from "react-bootstrap/Alert";

const containerStyle = {
    alignItems: "center",
    margin: "20px 0px",
    flexDirection: "column"
  };

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

export default function ForgotPassword(){
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [show,setShow]=useState("");
    

    const handleChange =()=>{
navigate("/otp",{ state: { email: email } });
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.4, duration: 1 }} >
        <div className="flex-container w-[100%] sm:w-[640px]">
          <div className="flex-child">
            <p style={{ fontSize: "30px" }}>Change your password</p>
            <Form>
  
             
  
              <Form.Group className="mb-3" controlId="email">
              <Form.Label>enter your email id associated with your account to recieve a OTP to reset your password</Form.Label>
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
  
  

            {validateEmail(email)  ? (
                <>
                  <div style={containerStyle}>
                    <Button variant="outline-primary" onClick={handleChange}>
                      email OTP
                    </Button>{" "}
                  </div>
                </>
              ) : (
                <>
                  <div style={containerStyle}>
                    <p style={{ alignItems: "center" }}>
                    </p>
                    <Button variant="outline-secondary" disabled>
                    email OTP
                    </Button>{" "}
                  </div>
                </>
              )}


            
            </Form>
          
            </div>
            </div>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Alert !!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>An email with password reset link will be the sent if the given email is associated to any account.</Modal.Body>
          
          <Modal.Footer>
          <Button
          variant="outline-success"
          onClick={() => {
          navigate("/");
          } } className="w-[50%] mx-auto"
        >
          got to home
        </Button>
          </Modal.Footer>
        </Modal>
  
       
      </motion.div>
    );
}