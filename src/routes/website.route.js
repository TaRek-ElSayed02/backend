const express = require('express');
const router = express.Router();
const websiteController = require('../controllers/website.controller');
const fileUpload = require('express-fileupload');

router.use('/create', fileUpload());
router.use('/update', fileUpload());

// Create a new website
router.post('/', websiteController.createWebsite);

// Get all websites
router.get('/', websiteController.getAllWebsites);

// Get website by subdomain
router.get('/:subdomain', websiteController.getWebsiteBySubdomain);

// Update website by subdomain
router.patch('/:subdomain', websiteController.updateWebsite);

// Delete website by subdomain
router.delete('/:subdomain', websiteController.deleteWebsite);

module.exports = router;