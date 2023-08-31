const express = require('express');
const router = express.Router();
const Reply = require('../models/reply');
const Comment = require('../models/comment');
// Create a new reply to a comment
router.post('/replies', async (req, res) => {
    try {
      const { commentId, userEmail, text } = req.body;
      //const cId = mongoose.Types.ObjectId(commentId);
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      const newReply = await Reply.create({ commentId, userEmail, text });
      comment.replies.push(newReply);
      await comment.save();
  
      res.status(201).json(newReply);
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Failed to create reply' });
    }
  });
  


  // Delete a reply
  router.delete('/replies/:replyId', async (req, res) => {
    try {
      const { replyId } = req.params;
      await Reply.findByIdAndRemove(replyId);
      res.status(200).json({ message: 'Reply deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete reply' });
    }
  });

  module.exports = router;