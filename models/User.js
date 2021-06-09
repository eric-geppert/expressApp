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
  /** date started to adjust calendar workouts accordingly */
  date: {
    type: Date,
    default: new Date(),
    required: true,
  },
  /** workout plan user selected */
  plan: {
    type: String,
    required: false /** since initially setting plan to null have to set required to false */,
    default: null,
  },
  /** days of the week user works out. 0 being Sunday */
  days: [
    {
      type: Number,
      required: false,
      default: null,
    },
  ],
  /** users current weight to track weight loss/gain */
  weightTracker: [
    {
      weight: {
        type: String,
        required: true,
      },
      dateRecorded: {
        type: Date,
        required: true,
      },
    },
  ],
});

module.exports = User = mongoose.model('user', UserSchema);
