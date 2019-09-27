const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

//for payment
const stripe = require('stripe')('sk_test_0nG9Ty2vlJMtbg8rfGEmo8Ue00nraHrJ0Q');
router.use(require('body-parser').text());

// @route
//req type GET
//endpoint api/auth
//@desc test route
//@access Public
// adding auth as second parameter makes route protected

router.get('/', auth, async (req, res) => {
  // router.get('/', async (req, res) => {
  try {
    console.log('/api/auth/ inside get route');
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
//@desc Authenticate user and get token, and charge
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

// @route
//req type POST
//endpoint api/auth/charge
//@desc stripe payment route
//@access Public      ???????????????????
//todo: q: add in auth middleware here????????????
router.post('/charge', async (req, res) => {
  //todo: add in error checking here

  console.log(
    'inside /charge route----------------------------------------------------------------------------------'
  );
  console.log('req.body.amount: ');
  // console.log(req.body.amount);
  // console.log(req.body.Router);
  // console.log(req.body.name);

  try {
    let { status } = await stripe.charges.create({
      amount: 70,
      currency: 'usd',
      description: 'An example charge',
      source: req.body
    });

    res.json({ status });
  } catch (err) {
    res.status(500).end();
    // throw (err)
  }
});

module.exports = router;

//remove later
//can use nested try catches
// routes.post('/login', async (req, res) => {
//   try {
//     ...
//     let user = null
//     try {
//       user = await findUser(req.body.login)
//     } catch (error) {
//       doAnythingWithError(error)
//       throw error //<-- THIS IS ESSENTIAL FOR BREAKING THE CHAIN
//     }
//     ...
//   } catch (error) {
//     errorResult(res, error)
//   }
