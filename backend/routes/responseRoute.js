var express = require('express');
const { createResponse, getResponsesBySurvey, getResponsesOfQuestionOfSurvey } = require('../controllers/responseController');


var router = express.Router();

router.route('/create-response').post(createResponse)
router.route('/surveys/:surveyId/responses').get(getResponsesBySurvey)
// router.route('/surveys/:surveyId/questions/:questionId/responses').get(getResponsesOfQuestionOfSurvey)
module.exports = router;