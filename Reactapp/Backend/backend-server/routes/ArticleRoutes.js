const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/articleController');

// Article Routes
router.post('/add', ArticleController.addArticle);
router.get('/', ArticleController.getArticles);
router.put('/update/:id', ArticleController.updateArticle);
router.delete('/delete/:id', ArticleController.deleteArticle);

module.exports = router;
