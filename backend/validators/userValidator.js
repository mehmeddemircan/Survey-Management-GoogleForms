const { check, validationResult } = require("express-validator");

exports.validateRegisterRequest = [
  check("firstname")
    .isLength({ max: 30 })
    .withMessage("İsim 30 karakterden fazla olamaz"),
  check("lastname")
    .isLength({ max: 30 })
    .withMessage("Soyisim 30 karakterden fazla olamaz"),
  check("email").isEmail().withMessage("Geçerli bir email giriniz lütfen"),
  // check('password')
  // .isLength({ min: 6 })
  // .withMessage('Password must be at least 6 character long')
];

exports.validateLoginRequest = [
  check("email").isEmail().withMessage("Geçerli bir email giriniz lütfen"),
  // check('password')
  // .isLength({ min: 6 })
  // .withMessage('Password must be at least 6 character long')
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
