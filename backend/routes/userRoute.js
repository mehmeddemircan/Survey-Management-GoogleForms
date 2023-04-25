var express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");
const upload = require("../middleware/upload");

var router = express.Router();

router.route("/profile/me").get(isAuthenticatedUser, getUserProfile);
router
  .route("/profile/update")
  .put(isAuthenticatedUser, upload.single("avatar"), updateUserProfile);

module.exports = router;
