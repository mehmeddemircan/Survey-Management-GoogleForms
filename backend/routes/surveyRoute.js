var express = require("express");
const {
  createSurvey,
  getAllSurvey,
  deleteSurvey,
  toggleQuestionIsRequired,
  getSurveyDetails,
  updateSurvey,
  getResponsesBySurveyId,
  saveResponses,
  surveySearchQuery,
  addQuestionsToSurvey,
} = require("../controllers/surveyController");
const {
  isRequestValidated,
  validateSurveyRequest,
} = require("../validators/surveyValidator");
const upload = require("../middleware/upload");


var router = express.Router();

router
  .route("/create-survey")
  .post(validateSurveyRequest, isRequestValidated,upload.single('image'),createSurvey);
router.route("/get-surveys").get(getAllSurvey);
router.route("/surveys/:id/details").get(getSurveyDetails);
router.route("/surveys/:id/delete").delete(deleteSurvey);
router.route("/surveys/:id/update").put(updateSurvey);
router.route('/surveys/:surveyId/addQuestions').post(addQuestionsToSurvey)

router.route("/surveys/search").get(surveySearchQuery);

module.exports = router;
