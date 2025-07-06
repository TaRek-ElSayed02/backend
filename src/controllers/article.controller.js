const articleService = require('../services/article.service');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

// تعديل الـ upload middleware ليكون أكثر مرونة
exports.uploadMiddleware = upload.single('img_article');



exports.createArticle = async (req, res) => {
  try {
    // التحقق من وجود ملف مرفوع
    const imageFile = req.files?.img_article;

    let articleData = {
      ...req.body,
      img_article: imageFile ? imageFile.data : null,
      img_article_mime_type: imageFile ? imageFile.mimetype : null
    };

    // التحقق من الحقول المطلوبة
    if (!articleData.article_title || !articleData.article_content || !articleData.subdomain) {
      return res.status(400).json({
        success: false,
        message: 'article_title, article_content, and subdomain are required'
      });
    }

    // إصلاح حقل schema (من scema إلى schema)
    // if (articleData.scema) {
    //   articleData.schema = articleData.scema;
    //   delete articleData.scema;
    // }
    if (articleData.schema) {
      articleData.scema = articleData.schema;
      delete articleData.schema;
    }

    const article = await articleService.createArticle(articleData);
    res.status(201).json({
      success: true,
      message: 'Article created successfully',
      data: article
    });
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating article',
      error: error.message
    });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const imageFile = req.files?.img_article;

    const updateData = {
      ...req.body,
      img_article: imageFile ? imageFile.data : undefined,
      img_article_mime_type: imageFile ? imageFile.mimetype : undefined
    };

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No update data provided'
      });
    }

    const updated = await articleService.updateArticle(id, updateData);
    if (updated.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Article updated successfully',
      updatedFields: Object.keys(updateData)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating article',
      error: error.message
    });
  }
};



exports.getAllArticles = async (req, res) => {
  try {
    const articles = await articleService.getAllArticles();
    res.status(200).json({
      success: true,
      data: articles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching articles',
      error: error.message
    });
  }
};

exports.getArticlesBySubdomain = async (req, res) => {
  try {
    const articles = await articleService.getArticlesBySubdomain(req.params.subdomain);
    if (!articles || articles.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No articles found for this subdomain'
      });
    }
    res.status(200).json({
      success: true,
      data: articles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching articles',
      error: error.message
    });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = {
      ...req.body,
      img_article: req.file ? req.file.buffer : undefined,
      img_article_mime_type: req.file ? req.file.mimetype : undefined
    };

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No update data provided'
      });
    }

    const updated = await articleService.updateArticle(id, updateData);
    if (updated.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Article updated successfully',
      updatedFields: Object.keys(updateData)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating article',
      error: error.message
    });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const deleted = await articleService.deleteArticle(req.params.id);
    if (deleted.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Article deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting article',
      error: error.message
    });
  }
};


exports.getArticleById = async (req, res) => {
  try {
    const article = await articleService.getArticleById(req.params.id);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    res.status(200).json({
      success: true,
      data: article
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching article',
      error: error.message
    });
  }
};
