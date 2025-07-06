const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');

// Create a new menu item
router.post('/', menuController.createMenuItem);

// Get all menu items
router.get('/', menuController.getAllMenuItems);

// Get menu items by subdomain
router.get('/subdomain/:subdomain', menuController.getMenuItemsBySubdomain);

// Update menu item by ID
router.patch('/:id', menuController.updateMenuItem);

// Delete menu item by ID
router.delete('/:id', menuController.deleteMenuItem);

module.exports = router;