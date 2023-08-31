import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import links from './HostedLinks';

const SavedArticlesList = () => {
  const [userEmail, setUserEmail] = useState('');
  const [savedArticles, setSavedArticles] = useState([]);
  const [showFullContent, setShowFullContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    
    const userEmailFromSession = sessionStorage.getItem('email');
    
    if (userEmailFromSession) {
      setUserEmail(userEmailFromSession);
    }
  }, []);

  useEffect(() => {
    if (userEmail) {
      const fetchSavedArticles = async () => {
        try {
          const response = await axios.get(`${links}saved-articles`,{
          params: {
            userEmail,
          },
        });
          console.log(response);
          setSavedArticles(response.data);
        } catch (error) {
          console.error('Error fetching saved articles:', error);
        }
      };
      fetchSavedArticles();
    }
  }, [userEmail]);

  const handleCardClick = (article) => {
    setShowFullContent(!showFullContent);
    console.log(article);
    navigate(`/article/${article._id}`, { state: { article } });
  };

  return (
    <div>
      <ul>
        {savedArticles.map((article) => (
          <>
          <Row xs={1} md={4} className="mb-4 mx-2"  key={article.articleId._id}>
         <Card style={{ width: "40rem", cursor: "pointer"}} className="p-3 !rounded-2xl"  onClick={() => handleCardClick(article.articleId)} >
           <img variant="top" src={article.articleId.imageUrl} alt={article.articleId.title} className='!rounded-2xl aspect-[50/30]'/>
           <h3 className='text-gray-800 text-lg font-semibold line-clamp-3 text-ellipsisx'>{article.articleId.title}</h3>
         </Card>
         </Row>
         </>
        ))}
      </ul>
    </div>
  );
};

export default SavedArticlesList;
