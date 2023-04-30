var express = require('express');
const { createQuestion, toggleQuestionIsRequired, deleteQuestion, getSurveyQuestions, updateQuestion, getSingleQuestion } = require('../controllers/questionController');






var router = express.Router();

router.route('/create-question').post(createQuestion)
router
  .route("/surveys/questions/:questionId/changeIsRequired")
  .put(toggleQuestionIsRequired);
router.route('/surveys/:surveyId/questions/:questionId/delete').delete(deleteQuestion)
router.route('/questions/:questionId/update').put(updateQuestion)
router.route('/surveys/:surveyId/questions').get(getSurveyQuestions)
router.route('/questions/:questionId/details').get(getSingleQuestion)

module.exports = router;