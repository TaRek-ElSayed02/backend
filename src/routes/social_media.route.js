const express = require('express');
const router = express.Router();
const socialMediaController = require('../controllers/social_media.controller');

// Create a new social media link
router.post('/', socialMediaController.createSocialMedia);

// Get all social media links
router.get('/', socialMediaController.getAllSocialMedia);

// Get social media by subdomain
router.get('/subdomain/:subdomain', socialMediaController.getSocialMediaBySubdomain);

// Update social media by ID
router.patch('/:id', socialMediaController.updateSocialMedia);

// Delete social media by ID
router.delete('/:id', socialMediaController.deleteSocialMedia);

module.exports = router;