const express = require('express');
const router = express.Router();
const Article = require('../models/news');
const SavedArticle = require('../models/savedArticles');



router.get('/api/articles', async (req, res) => {
    try {
      // Retrieve data from the database
      const articles = await Article.find();
      //console.log(articles);
      // Send the data as a response in JSON format
      res.json(articles);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Something went wrong.' });
    }
  });

  router.get('/check-save-article', async (req, res) => {
    console.log(req.query)
    const { articleId, userEmail } = req.query;
  
    try {
      const existingSavedArticle = await SavedArticle.findOne({ userEmail, articleId });
      if (existingSavedArticle) {
        res.status(200).json({ isSaved: true });
      }

  
      res.status(200).json({ isSaved: false });
    } catch (error) {
      console.error('Error checking if article is saved:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });

// router.get('/saved-articles', async (req, res) => {
//     try {
//       console.log(req.query)
//     const {userEmail } = req.query;
//       const savedArticles = await SavedArticle.find({ userEmail }).populate('articleId');
//       // The 'populate' method will populate the 'articleId' field with the actual article document data
  
//       res.json(savedArticles);
//     } catch (error) {
//       console.error('Error fetching saved articles:', error);
//       res.status(500).json({ error: 'Error fetching saved articles' });
//     }
//   });

router.post('/save-article', async (req, res) => {
  const { userEmail, articleId } = req.body;
  try {
      // Check if the article is already saved
      console.log(req.body);
      const existingSavedArticle = await SavedArticle.findOne({ userEmail, articleId });
      if (existingSavedArticle) {
        return res.status(200).json({ message: 'Article already saved.' });
      }
  
      // Save the article
      const savedArticle = new SavedArticle({ userEmail, articleId });
      await savedArticle.save();
      res.json({ message: 'Article saved successfully.' });
    } catch (error) {
      console.error('Error saving article:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });
  
  router.delete('/unsave-article', async (req, res) => {
    const { userEmail, articleId } = req.query;
  
    try {
      // Check if the article is saved
      const existingSavedArticle = await SavedArticle.findOne({ userEmail, articleId });
      if (!existingSavedArticle) {
        return res.status(400).json({ message: 'Article not saved.' });
      }
  
      // Unsave the article
      await SavedArticle.findByIdAndDelete(existingSavedArticle._id);
      res.json({ message: 'Article unsaved successfully.' });
    } catch (error) {
      console.error('Error unsaving article:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });

  router.get('/saved-articles', async (req, res) => {
      const {userEmail } = req.query;
    try {
      console.log(req.query)
    
    const savedArticles = await SavedArticle.find({ userEmail }).populate('articleId');
      console.log(savedArticles);
      res.status(200).json(savedArticles);
    } catch (error) {
      console.error('Error fetching saved articles:', error);
      res.status(500).json({ error: 'Error fetching saved articles' });
    }
  }); 
  
  module.exports = router;
