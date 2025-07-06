const express = require('express');
const router = express.Router();
const faqsController = require('../controllers/faqs.controller');

// Create a new FAQ
router.post('/', faqsController.createFaq);

// Get all FAQs
router.get('/', faqsController.getAllFaqs);

// Get FAQs by subdomain
router.get('/subdomain/:subdomain', faqsController.getFaqsBySubdomain);

// Update FAQ by ID
router.patch('/:id', faqsController.updateFaq);

// Delete FAQ by ID
router.delete('/:id', faqsController.deleteFaq);

module.exports = router;