const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  newsUrl: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, required: true },
  like: {
    type: [String], // Array of strings
    default: [],   // Default value is an empty array
  },
  upvotes: { type: Number, default: 0 },
  content_es: { type: String, default: '' },
  content_fr: { type: String, default: '' },
},
{ collection: 'multiLingual' });

const Article = mongoose.model('multiLingual', articleSchema);

module.exports = Article;
