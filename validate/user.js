const { body, validationResult } = require("express-validator");
const User = require("../models/user");

exports.userValidationSignup = [
  body("firstName")
    .isLength({ min: 4 })
    .withMessage("firstName must be at least 4 chars long")
    .isLength({ max: 100 })
    .withMessage(" firstName must be less than 100 chars long")
    .exists()
    .withMessage("firstName is required")
    .trim(),
  body("lastName")
    .isLength({ min: 4 })
    .withMessage("lasttName must be at least 4 chars long")
    .isLength({ max: 100 })
    .withMessage(" lasttName must be less than 100 chars long")
    .exists()
    .withMessage("lasttName is required")
    .trim(),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid Email")
    .exists(),
  body("password")
    .isString()
    .withMessage("password must be a s string")
    .isStrongPassword()
    .withMessage(
      "Password must contain: Capital letter,number and special character"
    )
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 chars long"),
  async(req, res, next) => {
    try {
      let result = await User.findOne({"email" : req.body?.email});
      if(result?.email === req.body?.email) {
          res.json({err: 'A user with this email already exist'})
      }else{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
        
      }
    } catch (error) {
      console.log(error)
    }
  },
];
