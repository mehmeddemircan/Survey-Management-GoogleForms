const { check, validationResult } = require("express-validator");

exports.validateQuestionRequest = [
    check('questionType')
    .custom((value, { req }) => {
      if (value !== 'coktanSecmeli') {
        throw new Error('Question type must be "multipleChoice" for choices validation');
      }
      return true;
    }),
  check('options')
    .isArray({ min: 1 })
    .withMessage('En az bir seçenek eklenmelidir')
   
  ];
  
exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
  };