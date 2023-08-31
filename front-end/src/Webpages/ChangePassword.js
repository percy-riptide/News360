// authors: navaneeth Manikyala && pratik patil
import React, { useState } from "react";
import { motion } from "framer-motion";
import PasswordChecklist from "react-password-checklist";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import "../App.css";
import logo from "../Assets/undraw_Fingerprint_login_re_t71l.png";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import links from "../Components/HostedLinks";
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "20px",
  flexDirection: "column"
};

function ChangePassword() {

  const navigate=useNavigate();
  const [enteredCurrentPassword, setEnteredCurrentPassword] = useState("");
  const [secondValidation, setSecondValidation] = useState(false);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showMessage, setShowMessage] = useState("");
  const email=sessionStorage.getItem("email");

  const handleCurrentPassword = (e) => {
    setEnteredCurrentPassword(e.target.value);
  };

  const handleChange = async (event) => {
    if(enteredCurrentPassword==newPassword){
      setShowMessage("current password and new password cannot be same");
      setShow(true);
      setNewPassword("");
      setEnteredCurrentPassword("");
      setConfirmNewPassword("");
      return;
    }
    event.preventDefault();
    const data = {
      email: email, // Replace this with the user's email
      currentPassword: enteredCurrentPassword,
      newPassword: newPassword
    };

    try {
      const response = await axios.post(
        `${links}changePassword`,
        data
      );

      if (response.data.signal === 0) {
        setShowMessage(response.data.message);
        setShow1(true);
      } else {
        setShowMessage(response.data.message);
        setShow(true);
        setNewPassword("");
        setEnteredCurrentPassword("");
        setConfirmNewPassword("");
      }
    } catch (error) {
      setShowMessage(error.message);
      setShow(true);
      setNewPassword("");
      setEnteredCurrentPassword("");
      setConfirmNewPassword("");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="flex-container">
        <div className="flex-child">
          <p style={{ fontSize: "30px" }}>Change your password</p>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={enteredCurrentPassword}
                placeholder="Enter Current Password"
                onChange={(e) => {
                  handleCurrentPassword(e);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                required
                placeholder="Choose a strong one :)"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm New Password</Form.Label>
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
              value={newPassword}
              valueAgain={confirmNewPassword}
              onChange={(isValid) => {
                setSecondValidation(isValid);
              }}
            />

            {secondValidation ? (
              <>
                <div style={containerStyle}>
                  <Button variant="outline-primary" onClick={handleChange}>
                    Change Password
                  </Button>{" "}
                </div>
              </>
            ) : (
              <>
                <div style={containerStyle}>
                  <p style={{ alignItems: "center" }}>
                    Meet all the conditions to change password
                  </p>
                  <Button variant="outline-secondary" disabled>
                    Change Password
                  </Button>{" "}
                </div>
              </>
            )}
          </Form>
        </div>
        <div className="flex-child">
          <Image src={logo} fluid style={{ width: "100%", height: "100%" }}></Image>
        </div>
      </div>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Problem !!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{showMessage}</Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <Modal show={show1} onHide={() => setShow1(false)}>
        <Modal.Header closeButton>
          <Modal.Title>success !!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{showMessage}</Modal.Body>
       

        <Modal.Footer>
        <Button
        variant="outline-success"
        onClick={() => {
        navigate("/profile");
        } } className="w-[50%] mx-auto"
      >
        got to profile
      </Button>
        </Modal.Footer>
      </Modal>
    </motion.div>
  );
}

export default ChangePassword;
