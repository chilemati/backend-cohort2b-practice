const mongoose = require('mongoose');
require('dotenv').config();

let {MONGODB_URI,DB_URL2} = process.env

async function db (cb) {
    try {
        result = await mongoose.connect(MONGODB_URI);
        // console.log(result.STATES.connected === 1)
        if(result.STATES.connected === 1) {
            console.log('db connected successfully!');
            cb();
        }else{
            console.log('Error connecting to db. please check your internet')
        }
        // console.log(result)
      } catch (error) {
        console.log(error.message)
      }

}

module.exports = db;
