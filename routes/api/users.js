const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

/**use await anytime were returning a promise otherwise we
 * would have to use .then etc etc
 */

// @route
//req type POST
//endpoint api/users/paid
//@desc set users paid variable to true
//@access Public
router.put('/paid', async (req, res) => {
  try {
    // let originalUser = await User.findOne(req.body.email);
    console.log('request.body: ' + req.body);
    let originalUser = await User.findOne(req.body);
    await originalUser.update({ paid: true });
    // let userPaid = await User.update({ paid: true });
  } catch (err0) {
    console.log('problem with updating paid in api');
  }
});

// @route
//req type POST
//endpoint api/users
//@desc Register user
//@access Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //   console.log(req.body);

    //destructuring req/body
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        //check if user exists
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      const paid = false;

      user = new User({
        name,
        email,
        avatar,
        password,
        paid
      }); //remove later add credit card cred?
      //rl: cant because dont know exactly what its sending

      //encrypt pass
      const salt = await bcrypt.genSalt(10); //10 rounds more you have
      //the safer but the slower you are

      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
