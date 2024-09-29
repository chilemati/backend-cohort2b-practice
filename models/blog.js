const mongoose = require('mongoose');

const { Schema } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    required:[true,'title is required']
  }, 
  author: {
    type: String,
    required:[true,'author is required']
  },
  body: {
    type: String,
    required:[true,'body is required']
  },
 
},{timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);

module.exports= Blog;