// authors: navaneeth Manikyala 
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../App.css";
import { useNavigate, Link ,useLocation} from "react-router-dom";

import Button from "react-bootstrap/Button";

import Alert from "react-bootstrap/Alert";
import axios from "axios";
import links from "../Components/HostedLinks";

const containerStyle = {
    alignItems: "center",
    margin: "20px 0px",
    flexDirection: "column"
  };

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

export default function Otp(){
    const location = useLocation();
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [show,setShow]=useState("");
    const messageFromHome = location.state?.email;
    const [otp,setOtp]=useState("");


    useEffect(()=>{
const a=async()=>{
        try {
            const response = await axios.post(
              `${links}otp`,
              {"email":messageFromHome}
            );
      
            if (response.data.signal ==0) {
              setOtp(response.data.otp);
            } 
            else{

            alert("Something wrong please with password reset please try again later");
            }
          } catch (error) {
            alert("Something wrong please with password reset please try again later");
          }

        }
        a();
    },[]);

    const handleChange =()=>{
if(otp==email){

navigate("/changeforgottenpassword",{ state: { email: messageFromHome } });
}
else{
    alert("wrong OTP try again later");
}
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.4, duration: 1 }} >
        <div className="flex-container w-[100%] sm:w-[640px]">
          <div className="flex-child">
            <p style={{ fontSize: "30px" }}>Enter the otp</p>
            <Form>
  
             
  
              <Form.Group className="mb-3" controlId="email">
              <Form.Label>Please enter the otp sent to {messageFromHome}</Form.Label>
              <Form.Control
                type="email"
                value={email}
                required
                placeholder="Enter your OPT"
                onChange={(e) => {setEmail(e.target.value);}}
              />
            </Form.Group>



      
  
  

            {(
                <>
                  <div style={containerStyle}>
                    <Button variant="outline-primary" onClick={handleChange}>
                      Sumbit OTP
                    </Button>{" "}
                  </div>
                </>
              )}


            
            </Form>
          
            </div>
            </div>
       
  
       
      </motion.div>
    );
}