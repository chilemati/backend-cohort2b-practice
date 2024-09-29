const mongoose = require('mongoose');
const { hash } = require('../services/hash');

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required:[true,'firstName is required']
  }, 
  lastName: {
    type: String,
    required:[true,'lastName is required']
  },
  password: {
    type: String,
    required:[true,'password is required']
  },
  role: {
    type: String,
    required:[true,'role is required']
  },
  email: {
    type: String,
    required:[true,'email is required'],
    unique: true,
  },
 
},{timestamps: true});

// middlewares

userSchema.pre('save', async function() {
  try {
    const passHash = await hash(this.password);
    const roleHash = await hash(this.role);
    this.password = passHash;
    this.role = roleHash;
  } catch (error) {
    console.log(error)
  }
});

const User = mongoose.model('User', userSchema);

module.exports= User;