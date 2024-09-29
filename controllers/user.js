const User = require("../models/user");
const { unhash } = require("../services/unhash");
require("dotenv").config();

let { ADMIN_EMAIL, ROLE } = process.env;
module.exports.user_get = (req, res) => {
  User.find()
    .then((resp) => {
      res.json(resp);
    })
    .catch((err) => {
      res.json(err.message);
    });
};
module.exports.user_post = (req, res) => {
  let { firstName, lastName, email, password } = req.body;
  let role = "normal";
  if (email === ADMIN_EMAIL) {
    role = ROLE;
  }
  let upd = { firstName, lastName, email, password, role };
  let toDb = new User(upd);
  toDb
    .save()
    .then((resp) => {
      res.json(resp);
    })
    .catch((err) => {
      res.json(err.message);
    });
};
module.exports.user_delete = (req, res) => {
  let { id } = req.body;
  User.findByIdAndDelete({ _id: id })
    .then((ans) => {
      res.json({ status: true, msg: "user deleted successfully!" });
    })
    .catch((err) => {
      res.json({ err: true, msg: err });
    });
};
module.exports.user_patch = (req, res) => {
  res.json({ user: "user update page" });
};
module.exports.user_login = (req, res) => {
  let { email, password } = req.body;
  // console.log(email,password)
  // check if this email exist in db
  User.findOne({ 'email': email })
    .then(async (ans) => {
      // check if the password matches the one in db
      let role = 'normal';
  
        try {
            let check = await unhash(password,ans.password);
            let isAdmin = await unhash(ROLE,ans.role);
            if(isAdmin) {
                role = ROLE;
            }
          if(check) {
              res.json({status: true, data: {firstName: ans.firstName, email,role: role}});
          }else{
              res.json({err: 'wrong email or password'})
          }
         } catch (error) {
           res.json({err: 'wrong email or password',error})
         }
    })
    .catch((err) => {
      res.json({ err: "wrong email or password", err });
    });
};
