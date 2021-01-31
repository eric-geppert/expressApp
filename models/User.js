const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // paid: {
  //   type: Boolean,
  //   required: true,
  //   default: false,
  // },
  // avatar: {
  //   type: String
  // },
  date: {
    type: Date,
    default: new Date(),
    required: true,
  },
  plan: {
    type: String,
    required: false /**since initially setting plan to null have to set required to false */,
    default: null,
  },
  days: {
    type: Number,
    required: false,
    default: null,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
