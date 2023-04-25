const { check, validationResult } = require("express-validator");

exports.validateSurveyRequest = [
    check('title')
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ max: 100 })
      .withMessage('Title can not exceed 100 characters'),
    check('description')
      .optional()
      .isLength({ max: 500 })
      .withMessage('Description can not exceed 500 characters'),
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