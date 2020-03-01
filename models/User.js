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
  paid: {
    type: Boolean,
    required: true,
    default: false
  },
  // avatar: {
  //   type: String
  // },
  date: {
    type: Date,
    default: new Date(),
    required: true
  }
});

module.exports = User = mongoose.model('user', UserSchema);
