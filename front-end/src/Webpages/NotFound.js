import React from 'react';
import { motion } from 'framer-motion';
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';
import logo from '../Assets/undraw_Empty_re_opql.png';
import Image from "react-bootstrap/Image";

function NotFound() {
  const navigate = useNavigate();
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity:1}} exit={{opacity:0}}>
        <div className="flex-container">
            <div className="flex-child" style={{textAlign:'justify'}}>
                <h1>Did you go astray??</h1>
                <br />
                <h2>The webpage you are trying to find in not available!</h2>
                <br />
                <h2>Please check the URL or go back to the home page using the button below</h2>
                <br/>
                <Button variant='outline-primary' onClick={() => {navigate('/')}}>Home Page</Button>
            </div>
            <div className="flex-child">
            <Image src={logo} fluid style={{width:'100%',height:'100%'}}></Image>
            </div>
        </div>
    </motion.div>
  )
}

export default NotFound;