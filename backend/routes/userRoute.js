var express = require('express');
const { isAuthenticatedUser } = require('../middleware/auth');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');


var router = express.Router();

router.route('/profile/me').get(isAuthenticatedUser,getUserProfile)
router.route('/profile/update').put(isAuthenticatedUser,updateUserProfile)


module.exports = router;