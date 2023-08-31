// models/savedArticle.js
const mongoose = require('mongoose');

const savedArticleSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'multiLingual',
  },
});

const SavedArticle = mongoose.model('SavedArticle', savedArticleSchema);

module.exports = SavedArticle;
