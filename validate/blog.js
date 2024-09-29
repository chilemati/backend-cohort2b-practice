const{ body, validationResult } = require('express-validator');

exports.blogValidation =  [
    body('title')
      .isLength({ min: 4 })
      .withMessage('title must be at least 4 chars long')
      .isLength({ max: 100 })
      .withMessage(' username must be less than 12 chars long')
      .exists()
      .withMessage('title is required')
      .trim(),
    body('author') 
    .isLength({ min: 4 })
    .withMessage('author must be at least 4 chars long')
    .exists()
    .withMessage('author is required')
    .trim(),
    body('body')
    .isLength({ min: 4 })
    .withMessage('body must be at least 4 chars long')
    .exists()
    .withMessage('title is required')
    .trim(),
    (req, res,next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next()
      }
  ];


