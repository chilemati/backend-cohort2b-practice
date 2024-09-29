const { isValidObjectId } = require("mongoose");
const Blog = require("../models/blog");

module.exports.blog_get = (req, res) => {
  Blog.find().sort({'updatedAt':-1})
    .then((resp) => {
      res.json(resp);
    })
    .catch((err) => {
      res.json(err.message);
    });
};
module.exports.blog_post = (req, res) => {
  let { title, body, author } = req.body;
  let upd = { title, body, author };
  let toDb = new Blog(upd);
  toDb
    .save()
    .then((resp) => {
      res.json(resp);
    })
    .catch((err) => {
      res.json(err.message);
    });
};
module.exports.blog_delete = (req, res) => {
  let { id } = req.body;
  console.log('delete id: ',id);
  Blog.findByIdAndDelete({ _id: id })
    .then((ans) => {
      res.json({ status: true, msg: "Blog deleted successfully!" });
    })
    .catch((err) => {
      res.json({ err: true, msg: err.message });
    });
};
module.exports.blog_patch = (req, res) => {
  let { id, title, body, author } = req.body;
  let upd = {};
  // check if id is valid
  if (isValidObjectId(id)) {
    //check if title, body or author exist
    if (title != undefined) {
      upd.title = title;
    }
    if (body != undefined) {
      upd.body = body;
    }
    if (author != undefined) {
      upd.author = author;
    }
    if (title === undefined && body === undefined && author === undefined) {
      // no data to update
      res.json({ err: "nothing to update" });
    } else {
      Blog.findByIdAndUpdate({ _id: id }, upd, {
        returnOriginal: false,
      })
        .then((ans) => {
          res.json(ans);
        })
        .catch((err) => {
          res.json({ err: err });
        });
    }
  } else {
    res.json({ err: "INvalid blog id" });
  }
};

module.exports.blog_single = (req,res)=> {
  let {id} = req.params;
   Blog.findById({'_id':id})
   .then(ans=> {
     res.json(ans);
   })
   .catch(err=> {
    res.json({err,msg: 'could not find the requested blog'})
   })
}
