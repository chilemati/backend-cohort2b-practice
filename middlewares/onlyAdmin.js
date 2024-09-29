const User = require("../models/user");
const { unhash } = require("../services/unhash");
require("dotenv").config();

let { ROLE } = process.env;

module.exports.onlyAmdin = async (req, res, next) => {
  let { email } = req.body;

  if (email === undefined) {
    res.json({ err: "Please provide your email" });
  } else {
    try {
      let resp = await User.findOne({ email: email });
      // check if role is admin
      let check = await unhash(ROLE, resp.role);
      if (check) {
        // else allow
        next();
      } else {
        res.json({ err: "unAuthorized" });
      }
    } catch (error) {
      res.json({ err: "protected route" });
    }
  }
};
