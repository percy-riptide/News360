import React from "react";
import { motion } from "framer-motion";
import "../App.css";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/undraw_Newspaper_re_syf5.png";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex-container">
        <div className="flex-child">
          <br />
          <div style={{ textAlign: "justify" }}>
            <h2>Welcome to News360.</h2>
            <br />
            <h3>
              News360. is your destination to get information on current
              affairs and daily news updates from all around the world in one
              place!
            </h3>
            <br />
            <h3>
              Choose from various categories of your interest and read fresh
              news on the topics of your choice!
            </h3>
            <br />
            <h3>
              We love saving your time, so we give you a summary of the article
              for a quick read, which of course you can read in detail if it
              fancies your brain.
            </h3>
            <br />
            <h3>Hope you have a great time at News360.!</h3>
          </div>
          <br />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Button
              variant="outline-success"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => {
                navigate("/feed");
              }}
              style={{ marginLeft: "10px" }}
            >
              Use as guest
            </Button>
          </div>
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

export default LandingPage;