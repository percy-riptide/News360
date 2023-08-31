// Route handlers related to articles
const express = require('express');
const router = express.Router();
const Article = require('../models/news');
 


router.post('/getLikes', async (req, res) => {
  const { articleId, email } = req.body;

  try {
    const article = await Article.findOne({ _id: articleId });

    if (!article) {
      return res.status(404).json({ message: 'Article not found.', signal: 1 });
    }

    let likecount = 0;
    let liked = false;

    // Check if the article has an "upvotes" key
    if ('upvotes' in article) {
      likecount = article.upvotes;
    } else {

    }

    // Check if the user has already liked the article
    if ("like" in article && Array.isArray(article.like)) {
      liked = article.like.includes(email);
    }

    return res.json({ signal: 0, liked, likecount });
  } catch (error) {
    console.error('Error in incrementing upvote count:', error);
    return res.status(500).json({ message: 'Unable to increment upvote count.' });
  }
});

// Handler to increment upvotes for a specific article
// Handler to increment upvotes for a specific article and manage likes
router.post('/upvote', async (req, res) => {
  const { articleId, email, value } = req.body;

  try {
    const article = await Article.findOne({ _id: articleId });

    if (!article) {
      return res.status(404).json({ message: 'Article not found.', signal: 1 });
    }

    if (!article.newsUrl) {
      article.newsUrl = "www.abc.com";
    }

    // Check if the user has already liked the article
    const likedIndex = article.like.indexOf(email);
    if (likedIndex !== -1 && value === -1) {
      // If the user has liked the article and the value is -1 (unlike action)
      // Remove the user's email from the like array and decrement the upvotes
      article.like.splice(likedIndex, 1);
      article.upvotes--;
    } else if (likedIndex === -1 && value === 1) {
      // If the user has not liked the article and the value is 1 (like action)
      // Add the user's email to the like array and increment the upvotes
      article.like.push(email);
      article.upvotes++;
    } else {
      // If the value is neither 1 nor -1, it means the user is trying to perform an invalid action
      return res.status(400).json({ message: 'Invalid action.', signal: 1 });
    }

    // Save the updated article in the database
    await article.save();

    return res.json({ upvotes: article.upvotes, signal: 0 });
  } catch (error) {
    console.error('Error in incrementing upvote count:', error);
    return res.status(500).json({ message: 'Unable to increment upvote count.' });
  }
});

module.exports = router;
