var bcrypt = require('bcryptjs');
require('dotenv').config();
let {SALT} = process.env;

module.exports.hash = (text)=> new Promise (function(accept,reject){
    bcrypt.hash(text, Number(SALT), function(err, hash) {
        if(err) {

            reject(err);
        }
        accept(hash);
    });
})