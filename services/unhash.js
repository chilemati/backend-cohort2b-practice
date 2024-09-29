var bcrypt = require('bcryptjs');
require('dotenv').config();

module.exports.unhash = (text,hash)=> new Promise (function(accept,reject){
    bcrypt.compare(text, hash)
    .then((res) => {
        // res === true
        accept(res);
    })
    .catch(err=> {
        reject(err)
    })
})