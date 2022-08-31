var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Home', user: req.user });
// });

router.get('/', indexController.index_get);

module.exports = router;
