const express = require('express');
const router = express.Router();
const joinController = require('../controllers/joinController');

router.get('/', joinController.join_get);
router.post('/', joinController.join_post);

module.exports = router;