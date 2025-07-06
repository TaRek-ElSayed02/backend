
// const express = require('express');
// const router = express.Router();
// const articleController = require('../controllers/article.controller');

// // تحديد نوع المحتوى المسموح به
// router.post('/articles', 
//   (req, res, next) => {
//     if (req.is('multipart/form-data')) {
//       return articleController.uploadMiddleware(req, res, next);
//     }
//     next();
//   },
//   articleController.createArticle
// );

// // التحديث مع دعم رفع صورة جديدة
// router.put('/articles/:id', articleController.uploadMiddleware, articleController.updateArticle);

// //get article by id
// router.get('/:id', articleController.getArticleById);
// // باقي العمليات
// router.get('/articles', articleController.getAllArticles);
// router.get('/articles/:subdomain', articleController.getArticlesBySubdomain);
// router.delete('/articles/:id', articleController.deleteArticle);

// module.exports = router;


const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article.controller');

// إزالة middleware multer تماماً
router.post('/articles', articleController.createArticle);
router.put('/articles/:id', articleController.updateArticle);

// باقي الروابط تبقى كما هي
router.get('/articles/:subdomain', articleController.getArticlesBySubdomain);
router.get('/articles', articleController.getAllArticles);
router.get('/:id', articleController.getArticleById);
router.delete('/articles/:id', articleController.deleteArticle);

module.exports = router;