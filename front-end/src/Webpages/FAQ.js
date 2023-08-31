import React from "react";
import { motion } from "framer-motion";
import Image from "react-bootstrap/Image";
import logo from "../Assets/undraw_Searching_re_3ra9.png";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import ListGroup from "react-bootstrap/ListGroup";
import { Accordion } from "react-bootstrap";

function FAQ() {
  const GeneralFAQ = [
    {
      title: "What is News360?",
      content: "News360 is a personalized news aggregation platform that curates a tailored news feed based on your interests. Available as a web application, News360 keeps you informed and engaged with the latest news relevant to you. ",
    },
    {
      title: "Is News360 free to use?",
      content: "Yes, News360 is free to use.",
    },
    {
      title: "How frequently is the news content updated on News360?",
      content: "The content is updated once every day",
    },
  ];

  const FeaturesFAQ = [
    {
      title: "Can I follow specific topics or categories on News360?",
      content: "Yes, you can follow specific topics or categories on News360 to receive personalized news content in those areas of interest.",
    },
    {
      title: "Can I save articles to read later on News360?",
      content: "Yes, you can save articles on News360 to read later at your convenience.",
    },
    {
      title: "Is News360 available in multiple languages?",
      content: "Yes, News360 is available in multiple languages to cater to a global audience.",
    },
    {
      title: "How can I listen to articles using the text-to-voice feature?",
      content: "To listen to articles using the text-to-voice feature in News360, simply tap on the article you want to listen to and look for the audio icon. Tap on the audio icon to start playing the text-to-voice conversion and enjoy listening to the article instead of reading it.",
    },
  ];

  const TechnicalFAQ = [
    {
      title: "What are the recommended system requirements for running News360?",
      content: "News360 is compatible with most modern smartphones, tablets, and desktop computers. It is recommended to have a device with a stable internet connection and the latest operating system version installed to ensure optimal performance.",
    },
    {
      title: "Is News360 available for both mobile and desktop platforms?",
      content: "Yes, News360 is available for both mobile and desktop platforms, allowing you to access and enjoy the app across various devices.",
    },
    {
      title: "What should I do if I encounter a technical issue with News360?",
      content: "1. Check your internet connection. Clear the cache and data of the News360 app. If the issue persists, reach out to our support team. Our dedicated support team will assist you in resolving the technical issue you are facing.",
    }
  ];

  const AccessibilityFAQ = [
    {
      title: "What accessibility features does News360 offer?",
      content: "News360 offers accessibility features including customizable font sizes and styles, support for screen readers, high contrast mode, and a text-to-voice feature. The text-to-voice functionality allows users to listen to articles, making it accessible and convenient for individuals with visual impairments or those who prefer audio content.",
    },
    {
      title: "How can I listen to articles using the text-to-voice feature in News360?",
      content: "To listen to articles using the text-to-voice feature in News360, simply open the article you wish to listen to. Look for the text-to-voice or audio icon within the article view. Tap on the icon, and News360 will start playing the article in a voice format",
    },
    {
      title: "Is the text-to-speech feature available for all articles or only specific ones?",
      content: "The text-to-speech feature in News360 is avialable for all articles",
    },
    {
      title: "Does News360 have a dark mode option?",
      content: "Yes, News360 offers a dark mode option. With dark mode, you can switch to a darker color scheme for the app interface, which provides a more comfortable viewing experience in low-light environments and helps reduce eye strain. ",
    },
  ];

  const MotivationFAQ = [
    {
      title: "What sets News360 apart from other news apps?",
      content: "News360 sets itself apart from other news apps through its advanced personalization capabilities. By utilizing sophisticated algorithms, News360 curates a highly personalized news feed tailored to each user's interests, ensuring relevant and diverse content. Additionally, features such as article summarization, categorization, and the ability to follow specific topics enhance the user experience and provide a comprehensive news discovery platform.",
    },
    {
      title: "Does News360 have features to encourage interaction and discussion?",
      content: "News360 provides a discussion thread for articles, allowing users to engage with each other by sharing their thoughts, opinions, and insights on various news topics. ",
    },
    {
      title: "How can News360 motivate me to save time while staying informed?",
      content: "News360 motivates you to save time while staying informed by providing features that streamline your news consumption. With article summarization, you can quickly grasp the main points of an article without reading the entire piece. The categorization and personalized content curation help you discover relevant news efficiently. Additionally, saving articles for later reading allows you to easily access and catch up on news at your convenience, ensuring you stay informed while optimizing your time.",
    },
    {
      title: "How can News360 help me stay motivated during busy schedules?",
      content: "News360 helps you stay motivated during busy schedules by offering flexibility and convenience in accessing news. With personalized content curation, News360 delivers relevant news directly to your feed, saving you time searching for updates. The save-for-later feature enables you to bookmark articles, ensuring you can catch up on news when you have more availability. Additionally, in-app notifications for breaking news or updates on your selected topics keep you informed, even during busy periods, and help you stay engaged with current events.",
    }
  ];

  const DevelopmentFAQ = [
    {
      title: "What technologies were used to develop News360?",
      content: "News360 is built using a combination of frontend technologies such as HTML, CSS, and JavaScript, along with backend technologies like Python, Node.js, or Java.",
    },
    {
      title: "Does News360 integrate with any third-party services or APIs?",
      content: "Yes, News360 integrates with various third-party services and APIs to enhance its features and provide a comprehensive news experience.",
    },
    {
      title: "Can I contribute to the development of News360 as a developer or submit feature requests?",
      content: "While we appreciate your interest, the development of News360 is primarily handled by our internal team. However, we encourage you to submit feature requests or provide feedback through our contact us page.",
    },
  ];

  const [accordianJson, setAccordianJson] = useState(GeneralFAQ);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [activeButton, setActiveButton] = useState(1);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex-container">
        <div className="flex-child">
          <h2>Unlocking Answers, One Question at a Time!</h2>
          <br />
          <div style={{ display: "flex"}}>
            <ToggleButtonGroup type="radio" name="options" value={activeButton}>
              <ToggleButton
                id="tbg-radio-1"
                variant="outline-success"
                value={1}
                onChange={() => setActiveButton(1)}
                onClick={() => {
                  setAccordianJson(GeneralFAQ);
                }}
              >
                General
              </ToggleButton>
              <ToggleButton
                id="tbg-radio-2"
                variant="outline-success"
                value={2}
                onChange={() => setActiveButton(2)}
                onClick={() => {
                  setAccordianJson(FeaturesFAQ);
                }}
              >
                Features
              </ToggleButton>
              <ToggleButton
                id="tbg-radio-3"
                variant="outline-success"
                value={3}
                onChange={() => setActiveButton(3)}
                onClick={() => {
                  setAccordianJson(TechnicalFAQ);
                }}
              >
                Technical
              </ToggleButton>
            </ToggleButtonGroup>
            <Button
              variant="outline-primary"
              style={{ marginLeft: "15px" }}
              onClick={handleShow}
            >
              View More
            </Button>
          </div>
          <br />
          <Accordion>
            {accordianJson.map((item, index) => (
              <Accordion.Item eventKey={index.toString()}>
                <Accordion.Header>{item.title}</Accordion.Header>
                <Accordion.Body>{item.content}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
        <div className="flex-child">
          <Image
            src={logo}
            fluid
            style={{ width: "100%", height: "100%" }}
          ></Image>
        </div>
      </div>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>FAQ Topics</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            <ListGroup.Item
              action
              onClick={() => {
                setAccordianJson(AccessibilityFAQ);
                setActiveButton(null);
                handleClose();
              }}
            >
              Accessibility
            </ListGroup.Item>
            <ListGroup.Item
              action
              onClick={() => {
                setAccordianJson(MotivationFAQ);
                setActiveButton(null);
                handleClose();
              }}
            >
              Motivation
            </ListGroup.Item>
            <ListGroup.Item
              action
              onClick={() => {
                setAccordianJson(DevelopmentFAQ);
                setActiveButton(null);
                handleClose();
              }}
            >
              Development
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </motion.div>
  );
}

export default FAQ;
