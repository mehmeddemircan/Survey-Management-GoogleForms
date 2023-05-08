const { check, validationResult } = require("express-validator");

exports.validateSurveyRequest = [
    check('title')
      .notEmpty()
      .withMessage('Başlık Zorunlu ')
      .isLength({ max: 100 })
      .withMessage('Başlık 100 karakterden fazla olamaz '),
    check('description')
      .optional()
      .isLength({ max: 250 })
      .withMessage('Açıklama 250 karakterden fazla olamaz'),
  
  ];
  
exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
  };