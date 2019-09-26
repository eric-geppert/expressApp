const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  // adding
  paid: {
    type: Boolean,
    default: false
  }
  // datePaid: {
  //   type: Date,
  //   default: null
  // }
});

module.exports = User = mongoose.model('user', UserSchema);
