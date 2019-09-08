const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
// @route
//req type GET
//endpoint api/auth
//@desc test route
//@access Public
router.get('/', auth, async (req, res) => {
  // adding auth as second parameter makes route protected

  try {
    const user = await User.findById(req.user.id).select('-password');
    //returns everything except for the password^
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//----
// @route
//req type POST
//endpoint api/auth
//@desc Authenticate user and get token
//@access Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //destructuring req/body
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        //check if user exists
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      //password typed, pass in DB
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      //return json Web token
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 }, //change back to one hour a day later
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      //   res.send('User route');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
