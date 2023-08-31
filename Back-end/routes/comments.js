const express = require('express');
const router = express.Router();
const Comment =  require('../models/comment');

router.post('/comments', async (req, res) => {
    try {
      const { articleId, userEmail, text } = req.body;
      const newComment = await Comment.create({ articleId, userEmail, text });
      res.status(201).json(newComment);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create comment' });
    }
  });
  
  
  // Get all comments and their replies for a specific article
  router.get('/comments/:articleId', async (req, res) => {
    try {
      const { articleId } = req.params;
      const comments = await Comment.find({ articleId }).populate('replies');
      res.json(comments);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get comments' });
    }
  });
  
  // Delete a comment
  router.delete('/comments/:commentId', async (req, res) => {
    try {
      const { commentId } = req.params;
      await Comment.findByIdAndRemove(commentId);
      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete comment' });
    }
  });
  
  
  
  module.exports = router;