import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import axios from 'axios';
import links from "./HostedLinks";

const LikeButton = ({ articleId }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const email = sessionStorage.getItem("email");
  const isLoggedIn = !!email;

  // Load the liked status from local storage on component mount
  useEffect(() => {
    const likedStatus = localStorage.getItem(`liked_${articleId}`);
    setLiked(likedStatus === "true");
  }, [articleId]);

  // Save the liked status to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(`liked_${articleId}`, (liked || false).toString());
  }, [articleId, liked]);

  useEffect(() => {
    axios.post(`${links}getLikes`, {
      articleId,
      email 
    })
    .then(res => {
      setLikes(res.data.likecount);
      
      setLiked(res.data.liked);
      console.log("Like data fetched successfully:", res.data);
    })
    .catch(err => {
      console.error("Error fetching like data:", err);
    });
  }, [articleId, email]);

  const handleLike = () => {
    if (isLoggedIn) {
      const likeValue = liked ? -1 : 1;
  
      axios.post(`${links}upvote`, {
        articleId: articleId,
        email: email,
        value: likeValue
      })
      .then(res => {
        setLikes(res.data.upvotes);
        setLiked(likeValue > 0); 
        console.log("Like action successful:", res.data);
      })
      .catch(err => {
        console.error("Error performing like action:", err);
        console.error("Error response:", err.response);
      });
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <Button variant="outline-primary" onClick={handleLike} disabled={!isLoggedIn}>
          {liked ? <FaThumbsUp /> : <FaRegThumbsUp />} Like
        </Button>
      ) : (
        <Button variant="outline-primary" disabled>
          <FaRegThumbsUp /> Like
        </Button>
      )}
      <span className="ml-2">{likes}</span> {/* Display the number of likes */}
    </div>
  );
};

export default LikeButton;
