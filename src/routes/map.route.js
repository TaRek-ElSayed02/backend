const express = require('express');
const router = express.Router();
const mapController = require('../controllers/map.controller');

// Create a new map
router.post('/', mapController.createMap);

// Get all maps
router.get('/', mapController.getAllMaps);

// Get maps by subdomain
router.get('/subdomain/:subdomain', mapController.getMapsBySubdomain);

// Update map by ID
router.patch('/:id', mapController.updateMap);

// Delete map by ID
router.delete('/:id', mapController.deleteMap);

module.exports = router;