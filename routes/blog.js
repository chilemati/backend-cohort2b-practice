const express = require('express');
const { blog_get, blog_post, blog_delete, blog_patch, blog_single } = require('../controllers/blog');
const { blogValidation } = require('../validate/blog');
const { onlyAmdin } = require('../middlewares/onlyAdmin');

const blogRouter = express.Router();


blogRouter.get('/blog',blog_get)
blogRouter.get('/blog/:id',blog_single)
blogRouter.post('/blog',onlyAmdin,blogValidation,blog_post)
blogRouter.delete('/blog',onlyAmdin,blog_delete)
blogRouter.patch('/blog',onlyAmdin,blog_patch)

module.exports = blogRouter;