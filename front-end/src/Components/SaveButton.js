import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'; // Import the required icons
import IconButton from '@mui/material/IconButton';
import links from './HostedLinks';
const SaveButton = ({ articleId, userEmail }) => {
  const [isArticleSaved, setIsArticleSaved] = useState(false);

  useEffect(() => {
    // Fetch API to check if the article is already saved
    const fetchSavedArticle = async () => {
      try {
        const response = await axios.get(`${links}check-save-article`, {
          params: {
            articleId,
            userEmail,
          },
        });
        console.log(response);
        setIsArticleSaved(response.data.isSaved);
      } catch (error) {
        console.error('Error checking if article is saved:', error);
      }
    };
    fetchSavedArticle();
  }, [articleId, userEmail]);

  const handleSaveArticle = async () => {
    try {
      // Call API to save the article
      const response = await axios.post(`${links}save-article`, {
        articleId,
        userEmail,
      });
      console.log(response);
      setIsArticleSaved(true);
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleUnsaveArticle = async () => {
    try {
      // Call API to unsave the article
      await axios.delete(`https://g17csci5709a3.onrender.com/unsave-article`, {
        params: {
          articleId,
          userEmail,
        },
      });
      setIsArticleSaved(false);
    } catch (error) {
      console.error('Error unsaving article:', error);
    }
  };

  return (

    <IconButton  type="button" onClick={isArticleSaved ? handleUnsaveArticle : handleSaveArticle} disabled={!userEmail} >
      {isArticleSaved ? <FaBookmark /> : <FaRegBookmark />}
    </IconButton>

  );
};

export default SaveButton;
