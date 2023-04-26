var express = require('express');
const { createQuestion, toggleQuestionIsRequired, deleteQuestion, getSurveyQuestions } = require('../controllers/questionController');






var router = express.Router();

router.route('/create-question').post(createQuestion)
router
  .route("/surveys/questions/:questionId/changeIsRequired")
  .put(toggleQuestionIsRequired);
router.route('/surveys/:surveyId/questions/:questionId/delete').delete(deleteQuestion)
router.route('/surveys/:surveyId/questions').get(getSurveyQuestions)

module.exports = router;