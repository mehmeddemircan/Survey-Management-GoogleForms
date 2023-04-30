var express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  getUserProfile,
  updateUserProfile,
  getAllUser,
  deleteUser,
  addSurveyToFavorites,
  removeFromFavorites,
  getFavoriteSurveys,
} = require("../controllers/userController");
const upload = require("../middleware/upload");

var router = express.Router();

router.route('/users').get(getAllUser)
router.route('/users/:id/delete').delete(deleteUser)

router.route("/profile/me").get(isAuthenticatedUser, getUserProfile);
router
  .route("/profile/update")
  .put(isAuthenticatedUser, upload.single("avatar"), updateUserProfile);

router.route('/users/:userId/surveys/:surveyId/add-favorite').put(addSurveyToFavorites)
router.route('/users/:userId/surveys/:surveyId/remove-favorite').put(removeFromFavorites)
router.route('/users/:userId/favorites').get(getFavoriteSurveys)

module.exports = router;
