//authors: Navaneeth manikyala  &  Pratik Patil
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "react-bootstrap/Image";
import logo from "../Assets/amritansh-dubey-XPwau36g4x8-unsplash.jpeg";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import camera from '../Assets/camera.svg';
import links from "../Components/HostedLinks";

import Modal from "react-bootstrap/Modal";
function ProfilePage(props) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [twitter, setTwitter] = useState("");
  const [profilePic, setProfilePic] = useState(""); // State to store the profile picture file

  const [isEditing, setIsEditing] = useState(false);

  const userEmail = sessionStorage.getItem("email");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [errors, setErrors] = useState({}); 
  const [profilePicDataUri, setProfilePicDataUri] = useState("");




  const validateName = (name) => /^[A-Za-z\s]+$/.test(name);
  const validateLinkedIn = (link) => /^(https?:\/\/)?(www\.)?linkedin\.com\/[A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=.]+$/i.test(link);
  const validateTwitter = (link) => /^(https?:\/\/)?(www\.)?twitter\.com\/[A-Za-z0-9_]+$/i.test(link);


  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };


  const handleProfilePicChange = async (file) => {
    if (file) {
      if (!file.type.includes("image/jpeg") && !file.type.includes("image/png")) {
        alert("Only JPEG and PNG formats are allowed");
        setProfilePicDataUri("");
      } else if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2MB limit try to upload images less than 2mb");
        setProfilePicDataUri("");
      } else {
        const dataUri = await convertFileToBase64(file);
        setProfilePicDataUri(dataUri);
        console.log(dataUri,typeof(dataUri));
        uploadImage(dataUri);

      }
    }
  };
  

const uploadImage=async(dataUri)=>{

  const response = await axios.post(`${links}profilePic`, { email, "profilePic":dataUri } );

  alert(response.data.message);
}

  useEffect(() => {
    axios.get(`${links}user/${userEmail}`).then((response) => {
      const user = response.data;
      setEmail(user.email);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setBio(user.bio);
      setLinkedIn(user.linkedIn);
      setTwitter(user.twitter);
      setProfilePicDataUri(user.profilePic);
      console.log(user);
    });
    
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {

    const newErrors = {};

    if (!validateName(firstName)) {
      newErrors.firstName = "Invalid first name format";
    }

    if (!validateName(lastName)) {
      newErrors.lastName = "Invalid last name format";
    }

    if (linkedIn && !validateLinkedIn(linkedIn)) {
      newErrors.linkedIn = "Invalid LinkedIn profile URL";
    }

    if (twitter && !validateTwitter(twitter)) {
      newErrors.twitter = "Invalid Twitter profile URL";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }





    const formData = {
      firstName,
      lastName,
      email,
      bio,
      linkedIn,
      twitter // Convert the file to base64 string if it exists
    };

    try {
      const response = await axios.post(`${links}user/update/`, formData);

      alert(response.data.message);
    } catch (error) {
      console.log("Error during update", error);
    }

    setIsEditModalOpen(false);
  };

  // Function to convert a file to base64 string
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <motion.div
       initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.4, duration: 1 }}
      className="text-center"
    >
      <div className="border-2 lg:w-[60%] mx-auto my-4 p-4 relative">
       {/*} {isEditing && <h3 className="text-red-600">* edits not saved</h3>}*/}
        {
        //   isEditing ? (
        //   <div className="flex absolute top-2 right-2 space-x-2">
        //     <button
        //       className="bg-blue-500 px-3 py-2 text-white text-xl font-bold rounded-xl"
        //       onClick={}
        //     >
        //       Save
        //     </button>
        //   </div>
        // ) : (
          
        // )
        <button
            className="bg-blue-500 px-3 py-2 text-white text-xl font-bold rounded-xl absolute top-2 right-2"
            onClick={()=>setIsEditModalOpen(!isEditModalOpen) }
          >
          ✏️  Edit
          </button>
      
      
      }

        <div className="mb-1 mt-4  ">
        <div className="relative inline-block">
        <h1>Profile Page</h1>
         <Image
    className="rounded-full w-[150px] h-[150px] mx-auto border"
    src={ `https://api.multiavatar.com/${email}.png`}
  />
<p>Your unique avatar for {email}</p>
  {/*
        <div className="p-2 rounded-full bg-gray-400 wrap inline-block absolute bottom-2 right-2 cursor-pointer">
        
        <label htmlFor="profilePicInput"  className="cursor-pointer">
    <img src={camera} alt="camera" className="w-6 h-6 " />
  </label>
  <input
    id="profilePicInput"
    type="file"
    accept=".jpg, .jpeg, .png"
    onChange={(e) => handleProfilePicChange(e.target.files[0])}
    className="hidden"
  />
       
  </div> */}
        </div>
       
        </div>

 

        <div className="flex flex-col items-center mb-4 ">

    
        <p className="font-bold mt-4 text-left">First Name: <span className="font-normal">{firstName}</span></p>
        
  
        <p className="font-bold mt-4 text-left">Last Name: <span className="font-normal">{lastName}</span></p>
        
    
          <p className="font-bold mt-4">Bio:</p>
          <p><span className="font-normal">{bio}</span></p>
          <p className="font-bold mt-4">LinkedIn:</p>
          <p><span className="font-normal">{linkedIn}</span></p>
          <p className="font-bold mt-4">Twitter:</p>
          <p><span className="font-normal">{twitter}</span></p>
         
        </div>

        <div className="flex justify-center items-center my-4">
          <Button
            variant="outline-primary"
            className="mr-4"
            onClick={() => {
              navigate("/changepass");
            }}
          >
            Change Password
          </Button>
          <Button variant="outline-warning" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>




      <Modal show={isEditModalOpen} onHide={() => setIsEditModalOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Input fields for editing profile information */}
          <div>
          <label className="font-semibold mx-1">First Name : </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-gray-400 rounded p-2 w-full"
            
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
          </div>



          <div className="mt-3">
          <label className="font-semibold mx-1">Last Name : </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-gray-400 rounded p-2 w-full "
          />
          {errors.lastName && <p className="text-red-500">{errors.firstName}</p>}
          </div>



          <div className="mt-3">
          <p className="font-semibold mx-1">Bio:</p>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            cols={50}
            className="border border-gray-400 rounded p-2 w-full h-24"
          />
          
          </div>


          <div className="mt-3">
          <label className="font-semibold mx-1">LinkedIn : </label>
          <input
            type="text"
            value={linkedIn}
            onChange={(e) => setLinkedIn(e.target.value)}
            className="border border-gray-400 rounded p-2 w-full "
          />
          {errors.linkedIn && <p className="text-red-500">{errors.linkedIn}</p>}
          </div>


          <div className="mt-3">
          <label className="font-semibold mx-1">Twitter : </label>
          <input
            type="text"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            className="border border-gray-400 rounded p-2 w-full "
          />
          {errors.twitter && <p className="text-red-500">{errors.twitter}</p>}
          </div>
          
          {/* Repeat similar input fields for other profile information */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </motion.div>
  );
}

export default ProfilePage;
