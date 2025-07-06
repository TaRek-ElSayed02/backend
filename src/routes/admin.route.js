const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

router.post('/login', adminController.loginAdmin);
router.get('/check-auth', adminController.checkAuth);
router.post('/logout', adminController.logoutAdmin);
module.exports = router;
