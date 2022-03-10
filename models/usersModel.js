const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
      type: String,
      required: false
    },
    lastname: {
      type: String,
      required: false
    },
    username: {
      type: String,
      // unique: true,
      required: false
    },
    mobile: {
      type: String
    },
    location: {
      type: String
    },
    image:{
      type: String,
      required: false
    },
    docType: {
      type: String
    },
    docName: {
      type: String
    },
    email: {
      type: String,
      unique: true,
      required: false
    },
    password: {
      type: String,
      required: false
    },
    emailVerified: {
      type: Boolean,
      default: false,
      required: false
    },
    planType: {
      type: String,
      required: false
    },
    iskyc: {
      type: Boolean,
      default: false,
      required: false
    },
    logintype: {
      type: String,
      required: false
    }
});

const User = mongoose.model('User', UserSchema)

module.exports = User;
