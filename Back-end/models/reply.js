const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const replySchema = new Schema({
  commentId: { type: Schema.Types.ObjectId, required: true },
  userEmail: { type: String, required: true }, // Changed from userId to userEmail
  text: { type: String, required: true },
}, { timestamps: true });

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;
