const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments.controller');

// Create a new comment
router.post('/', commentsController.createComment);

// Get all comments
router.get('/', commentsController.getAllComments);

// Get comments by subdomain
router.get('/subdomain/:subdomain', commentsController.getCommentsBySubdomain);

// Update comment by ID
router.patch('/:id', commentsController.updateComment);

// Delete comment by ID
router.delete('/:id', commentsController.deleteComment);

module.exports = router;