import '../App.css';
import { motion } from 'framer-motion';
import React from 'react';

function Footer() {
    return (
      <motion.div style={{marginTop:"auto", textAlign:'center',background:'#d7d9db'}} initial={{opacity: 0}} animate={{opacity:1}} exit={{opacity:0}}>
            <p style={{marginTop:'12px'}}>News360. is your one stop solution to stay up to date on all things happening around the world!</p>
      </motion.div>
    );
  }
  
  export default Footer;