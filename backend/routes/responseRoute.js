var express = require('express');
const { getAllResponses, createResponse } = require('../controllers/responseController');


var router = express.Router();

router.route('/surveys/:surveyId/responses').get(getAllResponses)
router.route('/create-response').post(createResponse)
module.exports = router;