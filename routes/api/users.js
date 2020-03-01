const express = require('express');
const router = express.Router();
// const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

/**use await anytime were returning a promise otherwise we
 * would have to use .then etc etc
 */

// @route
//req type PUT
//endpoint api/users/paid
//@desc set users paid variable to true
//@access Public
//todo: safety priority 1 change to private by adding auth below as an arg
router.put('/paid', async (req, res) => {
  //contition, update
  console.log('inside /paid endpoint email is: ' + req.body.email);
  console.log('inside /paid req.body: ' + req.body);
  console.log('inside /paid req: ' + req);

  User.findOneAndUpdate({ email: req.body.email }, { paid: true })
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
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
    ).isLength({ min: 1 })
    //todo: change back to 6
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //destructuring req/body
    console.log('req.body', req.body);
    const { name, email, password } = req.body; //todo: add paid and date here???

    try {
      let user = await User.findOne({ email });
      if (user) {
        //check if user exists
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // const avatar = gravatar.url(email, {
      //   s: '200',
      //   r: 'pg',
      //   d: 'mm'
      // });
      const paid = false;

      console.log('paid variable in reg: ' + paid);

      //todo: make pull from model later
      user = new User({
        name,
        email,
        // paid,
        password
        // date
      });
      //remove later add credit card cred?
      //rl: cant because dont know exactly what its sending

      //encrypt pass
      const salt = await bcrypt.genSalt(10); //10 rounds more you have
      //the safer but the slower you are

      user.password = await bcrypt.hash(password, salt);

      // user.date = new Date();
      console.log('date toString: ' + user.addListener.toString);
      console.log('user:', user);

      await user.save();

      //return json Web token
      const payload = {
        user: {
          id: user.id,
          email: user.email
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

      //---put payment here

      //   res.send('User route');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
