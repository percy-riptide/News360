import React from "react";
import { motion } from "framer-motion";
import { Image, Button } from "react-bootstrap";
import logo from "../Assets/undraw_Positive_attitude_re_wu7d.png";
import { useNavigate } from "react-router-dom";

function AboutUs() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex-container">
        <div className="flex-child">
        <h1>About Us - News360</h1>
        <h2>Our Mission</h2>
        <p>Our mission is simple yet profound: to streamline your news consumption experience while promoting accessibility and inclusivity. In a fast-paced world brimming with information, we strive to be your trusted source for accurate, relevant, and summarized news updates. Our commitment to inclusivity drives us to provide comprehensive accessibility tools that cater to a diverse audience.</p>
        <h2>Key Features</h2>
        <ul class="feature-list">
            <li><strong>News Summaries:</strong> We understand that your time is valuable. News360 curates and delivers comprehensive news summaries, allowing you to grasp the core of each story swiftly. Say goodbye to information overload – with News360, you're always in control of your news intake.</li>
            <li><strong>News Categorization:</strong> Stay organized and informed effortlessly. Our intuitive news categorization system ensures that you can explore topics of interest with ease. From global politics to lifestyle trends, we've got you covered.</li>
            <li><strong>Accessibility Settings:</strong> Everyone deserves equal access to information. Our commitment to accessibility means you can customize your news-reading experience to suit your preferences:</li>
            <ul>
                <li><strong>Text-to-Voice:</strong> Transform written articles into spoken words with our text-to-voice feature. Whether you're multitasking or prefer auditory learning, this tool ensures that news reaches your ears, not just your eyes.</li>
                <li><strong>Article Translations:</strong> Break language barriers with our article translation functionality. Enjoy news from around the world by seamlessly translating articles into your preferred language.</li>
                <li><strong>Font Adjustments:</strong> Tailor your reading environment for optimal comfort. Adjust font sizes and line spacings to reduce strain and enhance readability.</li>
            </ul>
        </ul>

        <h2>Our Vision</h2>
        <p>We envision a world where information knows no bounds, where everyone can engage with the latest news stories on their terms. News360 aspires to be the catalyst for a more informed and connected global community, fostering empathy, understanding, and progress.</p>
        
        <h2>Join Us in the News Revolution</h2>
        <p>Welcome to News360, where news summaries meet accessibility innovation. Whether you're a curious individual, a dedicated news enthusiast, or an advocate for inclusivity, we invite you to embark on this journey with us. Together, we can reshape the way news is consumed, shared, and experienced.</p>
        <Button
              variant="outline-primary"
              onClick={() => {
                navigate("/");
              }}
            >
              Home Page
            </Button>
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

export default AboutUs;
