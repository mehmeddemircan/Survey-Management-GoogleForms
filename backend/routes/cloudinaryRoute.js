var express = require('express');
const { upload, remove, uploadImage } = require('../controllers/cloudinaryController');


var router = express.Router();

// Routes
router.route('/uploadimages').post(upload)
router.route('/removeimage').post(remove)
router.route('/uploadimage').post(uploadImage)

module.exports = router;