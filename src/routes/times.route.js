const express = require('express');
const router = express.Router();
const timesController = require('../controllers/times.controller');

// Create a new time availability
router.post('/', timesController.createTime);

// Get all time availabilities
router.get('/', timesController.getAllTimes);

// Get times by subdomain
router.get('/subdomain/:subdomain', timesController.getTimesBySubdomain);

// Update time availability by ID
router.patch('/:id', timesController.updateTime);

// Delete time availability by ID
router.delete('/:id', timesController.deleteTime);

module.exports = router;