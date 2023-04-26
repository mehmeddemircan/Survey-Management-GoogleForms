const { check, validationResult } = require("express-validator");

exports.validateQuestionRequest = [
    check('questionType')
    .custom((value, { req }) => {
      if (value !== 'coktanSecmeli') {
        throw new Error('Question type must be "multipleChoice" for choices validation');
      }
      return true;
    }),
  check('choices')
    .isArray({ min: 1 })
    .withMessage('At least one choice must be added')
    // check('questions')
    //   .notEmpty()
    //   .withMessage('At least one question is required')
    //   .isArray({ min: 1 })
    //   .withMessage('Questions must be an array with at least one item'),
    // check('responses')
    //   .optional()
    //   .isArray()
    //   .withMessage('Responses must be an array'),
  ];
  
exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
  };