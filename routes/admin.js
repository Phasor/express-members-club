const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/',adminController.admin_get);
router.post('/',adminController.admin_post);

module.exports = router;