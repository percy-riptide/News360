const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  articleId: { type: Schema.Types.ObjectId, required: true },
  userEmail: { type: String, required: true }, // Changed from userId to userEmail
  text: { type: String, required: true },
  replies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }],
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
