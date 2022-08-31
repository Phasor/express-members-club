const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/', messageController.message_get);
router.post('/', messageController.message_post);

module.exports = router;