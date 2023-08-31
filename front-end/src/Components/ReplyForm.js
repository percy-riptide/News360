import React, { useState } from 'react';
import axios from 'axios';
import links from './HostedLinks';

const ReplyForm = ({ commentId }) => {
  const [text, setText] = useState('');
  const userEmail= sessionStorage.getItem('email');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post(`${links}replies`, { commentId, userEmail, text });
      // You can update the state or fetch comments again after successful submission
      console.log('Reply added:', response.data);
      setText('');
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  return (
    <div>
    {userEmail ? (<form onSubmit={handleSubmit} className="reply-form flex space-x-2 items-center ">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your reply"
        required
        className="reply-textarea border rounded-lg p-2 " // Add a class for the textarea
      />
      <button type="submit" className="submit-button">Add Reply</button> {/* Add a class for the button */}
    </form>):(<p></p>)}
    </div>
  );
};


export default ReplyForm;
