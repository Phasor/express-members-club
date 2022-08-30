const userController = require('../controllers/userController');
var express = require('express');
var router = express.Router();


/* GET create new user. */
router.get('/', userController.user_create_get);

/* POST create new user. */
router.post('/', userController.user_create_post);


module.exports = router;
