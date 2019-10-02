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
//req type POST
//endpoint api/auth/hasPaid
//@desc see if user has paid
//@access Public
router.post('/hasPaid', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    res.json(user.paid);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

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

// @route
//req type PUT
//endpoint api/users/paid
//@desc set users paid variable to true
//@access Public
router.post('/createProduct', async (req, res) => {
  try {
    let product = await stripe.products.create({
      name: 'monthy sub product',
      type: 'service'
    });

    res.json({ product });
  } catch (err) {
    res.json({ err });
  }
});

router.post('/createPlan', async (req, res) => {
  try {
    let status = await stripe.plans.create({
      amount: 2000,
      interval: 'month',
      product: 'prod_Fv1N6dgygh4RRo',
      // {
      //   // name:
      //   // name: 'monthly subcription PRODUCT'
      // },
      currency: 'usd'
    });
    res.json({
      status
    }); /**be careful not to wrap both the original variable in {}
    as well as the response in {} you will get an empty response */
  } catch (err) {
    res.json({ err });
  }
});

//--------
router.post('/createSource', async (req, res) => {
  try {
    const source = await stripe.sources.create({
      // type: 'ach_credit_transfer',
      type: 'card',
      card: {
        number: 4242424242424242,
        exp_month: 8,
        exp_year: 2020,
        cvc: 333
      },
      currency: 'usd',
      owner: {
        email: 'jenny.rosen@example.com'
      }
    });
    res.json({ source });
  } catch (err) {
    res.json({ err });
  }
});

router.post('/createCustomer', async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      email: 'jenny.rosen1@example.com',
      source: 'src_1FPAmPJTpKSfmpF2HMLziYGq' //configure to credit card #??
    });

    res.json({ customer });
  } catch (err) {
    res.json({ err });
  }
});

router.post('/createSubscription', async (req, res) => {
  try {
    console.log('creating sub');
    let { status } = await stripe.subscriptions.create({
      customer: 'cus_Fv0pF1OJKL3umy',
      // 'jenny.rosen1@example.com', //'test9999@fakeme.com', //'cus_FugkTmiN6rJ6ty', //fix to hardcoded email then redux?
      items: [
        {
          plan: 'plan_Fv1PvlqBSb9m1l'
          //'monthly subcription PRODUCT'
          // plan: 'gold'
        }
      ]
    });
    console.log('status.customer');
    console.log(status.customer);
    res.json({ status });
  } catch (err) {
    console.log('caught error');
    res.json({ err });
  }
});

module.exports = router;
