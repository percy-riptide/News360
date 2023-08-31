import React, { useState, useEffect } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import CommentList from "../Components/CommentList";
import CommentForm from "../Components/CommentForm";
import ReplyForm from "../Components/ReplyForm";
import LikeButton from "../Components/LikeButton";
import SaveButton from "../Components/SaveButton";
import { FaPlay, FaStop } from "react-icons/fa";
import links from "../Components/HostedLinks";

function ArticleView() {
  const language = window.sessionStorage.getItem("language");
  const location = useLocation();
  const article = location.state.article;
  const navigate = useNavigate();
  const [articleContent, setArticleContent] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechInstance, setSpeechInstance] = useState(null);
  const [comments, setComments] = useState([]);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const articleId = article._id;
  const userEmail = sessionStorage.getItem("email");
  const [fontSize, setFontSize] = useState(16);
  const [lineSpacing, setLineSpacing] = useState("28");

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments]);

  useEffect(() => {
    setLanguage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if ("speechSynthesis" in window) {
      const getVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      };
      getVoices();
      window.speechSynthesis.onvoiceschanged = getVoices;
    } else {
      alert("Text-to-speech not supported in this browser.");
    }
    return () => {
      if (speechInstance) {
        window.speechSynthesis.cancel();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speechInstance]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const setLanguage = () => {
    if (language === "English") {
      setSelectedLanguage("en-US");
      setArticleContent(article.content);
    } else if (language === "Spanish") {
      setSelectedLanguage("es-ES");
      setArticleContent(article.content_es);
    } else if (language === "French") {
      setSelectedLanguage("fr-FR");
      setArticleContent(article.content_fr);
    } else {
      setSelectedLanguage("en-US");
      setArticleContent(article.content);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${links}comments/${articleId}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSpeak = () => {
    if ("speechSynthesis" in window) {
      const voice = voices.find((v) => v.lang === selectedLanguage);
      if (!voice) {
        alert("Voice not available for the selected language.");
        return;
      }

      if (!isSpeaking) {
        const speech =
          speechInstance || new SpeechSynthesisUtterance(articleContent);
        speech.voice = voice;
        speech.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(speech);
        setSpeechInstance(speech);
        setIsSpeaking(true);
      } else {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    } else {
      alert("Text-to-speech not supported in this browser.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`${links}/comments/${commentId}`);
      // You can update the state or fetch comments again after successful deletion
      console.log("Comment deleted successfully");
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleReplyClick = (commentId) => {
    setSelectedCommentId(commentId);
    setShowReplyForm(true);
  };

  return (
    <div className="flex-container">
      <div className="flex-child">
        <Container fluid>
          <Card style={{ width: "100%" }}>
            <Card.Body>
              <Card.Title>
                <h1>{article.title}</h1>
              </Card.Title>
              <Card.Img
                variant="top"
                src={article.imageUrl}
                alt={article.title}
              />


              <div className="flex my-2 justify-around items-center">

                <LikeButton
                  articleId={article._id}
                  userId={sessionStorage.getItem("userId")}
                ></LikeButton>

                <div onClick={handleSpeak}>
                  {isSpeaking ? (
                    <FaStop style={{ fontSize: "32px", color: "#08c" }} />
                  ) : (
                    <FaPlay style={{ fontSize: "32px", color: "#08c" }} />
                  )}
                </div>
                <SaveButton articleId={article._id} userEmail={userEmail} />
                <div>
                  <label className="block text-center">font-size</label>
                  <input
                    type="range"
                    min="10"
                    max="40"
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}

                  />
                  
                </div>

                <div>
                <label className="block text-center">line-spacing</label>
                <input
                type="range"
                min="20"
                max="60"
                value={lineSpacing}
                onChange={(e) => setLineSpacing(e.target.value)}

              />
              
            </div>


              </div>


              <Card.Text style={{ marginTop: "20px", fontSize: `${fontSize}px`, lineHeight: `${lineSpacing}px` }}>
                {articleContent}
              </Card.Text>
              <Button variant="primary" href={article.newsUrl} target="_blank">
                Go to Article
              </Button>
              <Button
                variant="secondary"
                style={{ marginLeft: "10px" }}
                onClick={handleBackClick}
              >
                Go Back
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </div>
      <div className="flex-child">
        <CommentList comments={comments} onReply={handleReplyClick} />
        {showReplyForm && <ReplyForm userEmail={userEmail} commentId={selectedCommentId} />}
        {userEmail ? (
          <CommentForm articleId={articleId} userEmail={userEmail} />
        ) : (
          <p>
            You need to be logged in to be able to add comments to the article!
            Please login <Link to="/login">here</Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default ArticleView;
