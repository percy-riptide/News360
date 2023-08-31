import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "react-bootstrap/Image";
import logo from "../Assets/undraw_Preferences_re_49in.png";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SavedArticlesList from "../Components/SavedArticlesList";
import links from "../Components/HostedLinks";


function Preferences() {
  const navigate = useNavigate();
  var chosenCategories = sessionStorage.getItem("categories");
  var language = window.sessionStorage.getItem("language");
  const [preferredLanguage, setPreferredLanguage] = useState(language);
  const [activeButton, setActiveButton] = useState(1);
  const [selectedOption, setSelectedOption] = useState(language);
  const [selectedItems, setSelectedItems] = useState([]);
  const email = sessionStorage.getItem("email");
  const categories = [
    "politics",
    "entertainment",
    "technology",
    "economics",
    "education",
    "health",
    "science",
    "sports",
    "art",
    "lifestyle",
    "culture",
  ];
  const handleSwitchToggle = (item) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(item)) {
        // If the item is already in the selectedItems array, remove it
        return prevSelected.filter((category) => category !== item);
      } else {
        // If the item is not in the selectedItems array, add it
        return [...prevSelected, item];
      }
    });
    console.log("select items:" + selectedItems);
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleLanguageSubmit = async (event) => {
      try {
    window.sessionStorage.setItem("language", preferredLanguage);
    window.sessionStorage.setItem("categories", selectedItems);
    const data = {
      email: window.sessionStorage.getItem("email"),
      language: preferredLanguage,
      categories: selectedItems,
    };

    // Use await to wait for the response from the API call
    const response = await axios.post(`${links}preferences/set`, data);

    // The code below will only execute after the axios.post() call is complete.
    navigate("/");

  } catch (error) {
    // Handle any errors that might occur during the API call
    console.error("Error while handling language submit:", error);
  }
    // window.sessionStorage.setItem("language", preferredLanguage);
    // window.sessionStorage.setItem("categories", selectedItems.slice(1));
    // const data = {
    //   email: window.sessionStorage.getItem("email"),
    //   language: preferredLanguage,
    //   categories: selectedItems.slice(1),
    // };
    // const response = await axios.post(
    //   "https://g17csci5709a3.onrender.com/language/set",
    //   data
    // );
    // navigate("/");
  };

  useEffect(() => {
    setSelectedOption(language);
    if (chosenCategories !== null) {
      setSelectedItems(chosenCategories.split(","));
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex-container">
        <div className="flex-child">
          <ToggleButtonGroup type="radio" name="options" value={activeButton}>
            <ToggleButton
              id="tbg-radio-1"
              variant="outline-success"
              value={1}
              onChange={() => setActiveButton(1)}
            >
              Language
            </ToggleButton>
            <ToggleButton
              id="tbg-radio-2"
              variant="outline-success"
              value={2}
              onChange={() => setActiveButton(2)}
            >
              News Categories
            </ToggleButton>
            <ToggleButton
              id="tbg-radio-3"
              variant="outline-success"
              value={3}
              onChange={() => setActiveButton(3)}
            >
              Saved Articles
            </ToggleButton>
          </ToggleButtonGroup>
          {activeButton === 1 && (
            <div style={{ margin: "20px" }}>
              <h2>Choose a language</h2>
              <Form>
                {["English", "French", "Spanish"].map((option) => (
                  <div key={`default-${option}`} className="mb-3">
                    <Form.Check
                      type="radio"
                      name="radioGroup"
                      value={option}
                      checked={selectedOption === option}
                      id={`default-${option}`}
                      label={`${option}`}
                      onChange={(e) => {
                        setPreferredLanguage(e.target.value);
                        handleRadioChange(e);
                      }}
                    />
                  </div>
                ))}
              </Form>
            </div>
          )}
          {activeButton === 2 && (
            <div style={{ margin: "20px" }}>
              <h2>Choose your news categories</h2>
              <Form>
                {categories.map((item) => (
                  <Form.Check
                    key={item}
                    type="switch"
                    id={`custom-switch-${item}`}
                    label={item}
                    onChange={() => handleSwitchToggle(item)}
                    checked={selectedItems.includes(item)}
                  />
                ))}
              </Form>
            </div>
          )}
          {activeButton === 3 && (
            <div style={{ margin: "20px" }}>
              <SavedArticlesList/>
            </div>
          )}
          {activeButton != 3 && ( <Button
            variant="outline-primary"
            style={{ marginLeft: "15px" }}
            onClick={() => {
              handleLanguageSubmit();
            }}
          >
            Save Preferences
          </Button>)}
         
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

export default Preferences;
