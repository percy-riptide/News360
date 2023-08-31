import React, { useState } from 'react';
import ReplyForm from './ReplyForm';
import '../App.css';

const CommentList = ({ comments, onReply }) => {
  const [showReplyFormId, setShowReplyFormId] = useState(null);

  const handleToggleReplyForm = (commentId) => {
    setShowReplyFormId(commentId === showReplyFormId ? null : commentId);
  };

  return (
    <div className="comment-section">
      <h2 className="discussion-heading">Discussions</h2>
      {comments.map((comment) => (
        <div className="comment" key={comment._id}>
          <p className="comment-text">
            <span className="user-email">{comment.userEmail}:</span> {comment.text}
          </p>
          {comment.replies.length > 0 && (
            <div className="replies">
              <p className="replies-heading">Replies:</p>
              {comment.replies.map((reply) => (
                <p className="reply" key={reply._id}>
                  <span className="user-email">{reply.userEmail}</span> {reply.text}
                </p>
              ))}
            </div>
          )}
          
          {showReplyFormId === comment._id && (
            <ReplyForm commentId={comment._id} userEmail={comment.userEmail} />
          )}
          
          <button className="reply-button" onClick={() => handleToggleReplyForm(comment._id)}>
            {showReplyFormId === comment._id ? 'Cancel' : 'Reply'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
