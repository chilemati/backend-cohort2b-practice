const express = require('express');
const { user_get, user_post, user_delete, user_patch, user_login } = require('../controllers/user');
const { userValidationSignup } = require('../validate/user');
const { onlyAmdin } = require('../middlewares/onlyAdmin');

const userRouter = express.Router();


userRouter.get('/user',onlyAmdin,user_get)
userRouter.post('/user',userValidationSignup,user_post)
userRouter.delete('/user',onlyAmdin,user_delete)
userRouter.patch('/user',onlyAmdin,user_patch)
userRouter.post('/login',user_login)

module.exports = userRouter;