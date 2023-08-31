import React, { useState } from 'react';
import { Card, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function ArticleCard({ article }) {
    const [showFullContent, setShowFullContent] = useState(false);
  const navigate = useNavigate();
  const handleCardClick = () => {
    setShowFullContent(!showFullContent);
    navigate(`/article/${article._id}`, { state: { article } });
  };

  return (
    <>
     <Row xs={1} md={4} className="mb-4 mx-2" >
    <Card style={{ width: "40rem", cursor: "pointer"}} className="p-3 !rounded-2xl"  onClick={handleCardClick} >
      <img variant="top" src={article.imageUrl} alt={article.title} className='!rounded-2xl aspect-[50/30]'/>
      <h3 className='text-gray-800 text-lg font-semibold line-clamp-3 text-ellipsisx'>{article.title}</h3>
    </Card>
    </Row>
    </>
  );
};

export default ArticleCard;
