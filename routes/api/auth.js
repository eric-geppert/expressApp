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

/**has to be post route so we can send information with it(email and password) */
router.post('/getCustomerDate', async (req, res) => {
  const { email } = req.body;
  console.log('whattttt outside of brackets');
  try {
    console.log('currentUser before');
    let currentUser = await User.findOne({ email });
    console.log('currentUser: ', currentUser);

    if (!currentUser) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    // const isMatch = await bcrypt.compare(password, currentUser.password);

    // if (!isMatch) {
    //   return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    // }
    res.json(currentUser);
  } catch (err) {
    console.log('errorrrrr: ', err);
    res.json({ err: 'there is an error' });
  }
});

router.put('/setCustomerPlan', async (req, res) => {
  User.findOneAndUpdate({ email: req.body.email }, { plan: req.body.plan })
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

router.put('/setCustomerDaysPerWeek', async (req, res) => {
  User.findOneAndUpdate({ email: req.body.email }, { days: req.body.days })
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

// not called anywhere depricated
// router.get('/getIsCustomerDelinquent', async (req, res) => {
  // try {
  //   console.log("customer Data req:", req)
  //   let myCustomer = await stripe.customers.retrieve('cus_FvNKEiG1w8yUno');
  //   // const delinquentcy= myCustomer.delinquent
  //   res.json(myCustomer.delinquent);

  //   // res.json({ myCustomer });
  // } catch (err) {
  //   res.json({ err });
//   }
// });

// @route
//req type POST
//endpoint api/auth/hasPaid
//@desc see if user has paid
//@access Public
router.post('/hasPaid', async (req, res) => {
  try {
    console.error("remove hasPaid from code don't use anymore")
    // console.log("customer Data req:", req)
    // let myCustomer = await stripe.customers.retrieve('cus_FvNKEiG1w8yUno');
    // // const delinquentcy= myCustomer.delinquent
    // // res.json(myCustomer.delinquent);
    // res.json({ myCustomer });
  } catch (err) {
    res.json({ err });
  }
});

// old has paid that checked bd
//   const { email, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
//     }
//     res.json(user.paid);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// @route
//req type GET
//endpoint api/auth
//@desc test route
//@access Public
// adding auth as second parameter makes route protected

router.get('/', auth, async (req, res) => {
  // router.get('/', async (req, res) => {
  try {
    // console.log('/api/auth/ inside get route');
    const user = await User.findById(req.user.id).select('-password');
    //returns everything except for the password^
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route
//req type POST
//endpoint api/auth
//@desc Authenticate user and get token, and charge
//@access Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
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
          id: user.id,
          email: user.email, //set so can get customer profile info in stripe calls
        },
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
  console.log('source: req.body: ' + req.body);
  try {
    let { status } = await stripe.charges.create({
      amount: 70,
      currency: 'usd',
      description: 'An example charge',
      source: req.body,
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

//monthly sub: prod_Fv1N6dgygh4RRo
router.post('/createProduct', async (req, res) => {
  try {
    let product = await stripe.products.create({
      name: 'monthy sub product',
      type: 'service',
    });

    res.json({ product });
  } catch (err) {
    res.json({ err });
  }
});

//prod_Fv4DqB50FbNbz0
router.post('/createDailyProduct', async (req, res) => {
  try {
    let product = await stripe.products.create({
      name: 'daily sub product',
      type: 'service',
    });

    res.json({ product });
  } catch (err) {
    res.json({ err });
  }
});

//daily plan: plan_Fv4F81jmdHtesu
router.post('/createPlan', async (req, res) => {
  try {
    let status = await stripe.plans.create({
      amount: 2000,
      nickname: 'monthly subscription 1',
      interval: 'month',
      // product: 'prod_Fv4DqB50FbNbz0',
      product: 'prod_Fv1N6dgygh4RRo',
      currency: 'usd',
    });
    res.json({
      status,
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
        cvc: 330,
      },
      currency: 'usd',
      owner: {
        email: 'jenny.rosen@example.com',
      },
    });
    res.json({ source });
  } catch (err) {
    res.json({ err });
  }
});

router.post('/createCustomer', async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      // id: req.body.email,
      email: req.body.email, //'jenny.rosen1@example.com',
      source: req.body.source, //'src_1FPAmPJTpKSfmpF2HMLziYGq'
    });
    // console.log('customer id after creation: ' + customer.id);
    // console.log('customer: ', customer);
    // console.log(customer);
    // res.json(customer.id); //could send whole customer object then extract later
    // res.send(customer.id);
    // res.send('testing123');
    res.json({ customer });
  } catch (err) {
    res.json({ err });
  }
});

//todo: question: need to make plans and products dynamic??
router.post('/createSubscription', async (req, res) => {
  console.log('req.body: ' + req.body);
  try {
    console.log('creating sub');
    let { status } = await stripe.subscriptions.create({
      customer: req.body, //customerToBePassed, // //'cus_Fv6GMW8OfqErc6',
      // customer: 'cus_FxJLeRVoscOMLY', //'cus_Fv0pF1OJKL3umy',
      // 'jenny.rosen1@example.com', //'test9999@fakeme.com', //'cus_FugkTmiN6rJ6ty', //fix to hardcoded email then redux?
      items: [
        {
          plan: 'plan_FxJEuAl9bXXNo1', //monthly sub with nickname
          //'plan_Fv1PvlqBSb9m1l' //monthly sub plan
          //'plan_Fv4F81jmdHtesu' //daily sub product for testing
        },
      ],
    });
    console.log('status');
    console.log(status);

    res.json({ status });
  } catch (err) {
    res.json({ err });
  }
});

// todo rename to getCusomer
router.post('/getAllCustomers', async (req, res) => {
  try {
    // console.log("zzzzzzzzzzzzzzzz stripe.customers", await stripe.customers)

    // console.log('inside getAllCustomers req.body.email: ', req.body.email);
    let allCustomers = await stripe.customers.list({
      email: req.body.email,
      // email: 'a18@me.com'
    });

    console.log("cust:", allCustomers)
    //   'allCustomers.data[0].subscriptions.data[0].id',
    //   allCustomers.data[0].subscriptions.data[0].id
    // );
    res.json({ allCustomers });
  } catch (err) {
    res.json({ err });
  }
});

router.put('/unsubscribe', async (req, res) => {
  try {
    console.log('in unsub endpoint req.body: ', req.body);
    let unsub = await stripe.subscriptions.update(req.body, {
      cancel_at_period_end: true,
    });

    res.json({ unsub });
  } catch (err) {
    res.json({ err });
  }
});

module.exports = router;

/**steps:
 * 1. create product (name: any, type: service/good)
 * 2. create plan with product code ()
 * ---
 * 3. create source:
 * 4. create customer:
 * 5. create subscription: customer "customer_id", item: {plan: "plan_id"}
 */
