import React, { useState } from 'react';
import axios from 'axios';
import links from './HostedLinks';
import '../App.css';
const CommentForm = ({ articleId, userEmail }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${links}comments`, { articleId, userEmail, text });
      // You can update the state or fetch comments again after successful submission
      console.log('Comment added:', response.data);
      setText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return  (
    <form onSubmit={handleSubmit} className="form-container">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your comment"
        className="comment-textarea"
        required
      />
      <button type="submit" className="submit-button">
        Add Comment
      </button>
    </form>
  );
};

export default CommentForm;
