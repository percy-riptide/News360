// authors: Navaneeth Manikyala  && Pratik Patil
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import "../App.css";
import logo from "../Assets/undraw_Safe_re_kiil.png";
import { useState } from "react";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import links from "../Components/HostedLinks";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    const response = await axios.post(`${links}login`, data);
    console.log(response);
    try {
      if (response.data.signal === "0") {
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("categories", response.data.categories);
        sessionStorage.setItem("language", response.data.language);
        navigate("/profile");
      } else {
        alert("Incorrect credentials, please enter the proper credentials");
        setEmail("");
        setPassword("");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      alert("Incorrect credentials, please enter the proper credentials");
      setEmail("");
      setPassword("");
      navigate("/login");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.4, duration: 1 }}
    >
      <div className="flex-container">
        <div className="flex-child">
          <p style={{ fontSize: "30px" }}>Login</p>
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
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                required
                placeholder="Enter Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>
                {" "}
                <Button variant="outline-primary" type="submit">
                  Login
                </Button>{" "}
              </span>
              <span>
                <Link to="/forgotpassword">Forgot Password?</Link>
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p style={{ paddingTop: "20px" }}>
                No Account? <Link to="/signup">Register</Link>
              </p>
            </div>
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
    </motion.div>
  );
}

export default LoginPage;
