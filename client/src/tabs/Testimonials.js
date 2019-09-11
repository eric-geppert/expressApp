// import React, { Component } from 'react';
import React, { Fragment } from 'react';
// import './Testimonials.css';

const Testimonials = () => {
  return (
    <Fragment>
      <h1 className='large text-primary'>Testimonials</h1>
      {/* <section className='testimonial-section'> */}
      {/* <div className='container-of-testimonial-images'> */}
      <div className='testimonial-section'>
        <div id='colten quote'>
          <p style={{ paddingTop: '50px' }}>
            “Mitch is an excellent coach and will put in time for any questions
            you might have. He knows what he is talking about and will help you
            produce.”
          </p>
          <p style={{ textAlign: 'right' }}>-Colton Taylor</p>
        </div>
        <img src={require('../img/testimonials/Colton2.jpg')} />
        <div className='Aaidan-pic'>
          <img
            // style={{ marginTop: '-7rem' }}
            // className='container-of-testimonial-images'
            src={require('../img/testimonials/Aaidan.jpeg')}
            // paddingleft='100px'
          />
        </div>

        <div className='Aaidan-quote'>
          <p>
            “I wanted a more personalized experience to better hit my goals.
            Since starting... I have lost 30lbs and about 10% body fat, which
            has been amazing because those were the two things I cared the most
            about losing. He goes out of his way to help you reach your goals
            and he's always motivating you to go past your goals and set new
            ones!”
          </p>
          <p style={{ textAlign: 'right' }}>-Aaidan Hebert</p>
        </div>
        <div className='Chase-quote'>
          <p style={{ paddingTop: '50px' }}>
            “I was able to dramatically improve my cardio while getting
            stronger. It’s a great experience...if you do everything you are
            supposed to, you will get results.”
          </p>
          <p style={{ textAlign: 'right' }}>-Chase Dolfi</p>
        </div>
        {/* <div id='chase pic' style={{ marginTop: '-7rem' }}> */}
        <div className='Chase-pic'>
          <img src={require('../img/testimonials/Chase.JPG')} />
        </div>
        <div className='Katya-pic'>
          {/* style={{ marginTop: '-7rem' }}> */}
          <img src={require('../img/testimonials/Katya.jpg')} />
        </div>
        <div className='Katya-quote'>
          {/* style={{ marginTop: '-7rem' }}> */}
          <p style={{ paddingTop: '50px' }}>
            “I've learned many exercises that engage muscle groups I previously
            did not know how to work; and with Mitch's help I continue to learn
            how to improve my nutrition in order to increase strength, recover
            quickly after workouts, and enhance my overall health. Mitch has
            helped me work towards many of my personal goals.”
          </p>
          <p style={{ textAlign: 'right' }}>-Katya Cope</p>
        </div>
      </div>
      {/* </section> */}
    </Fragment>
  );
};
export default Testimonials;

// export default class Home extends Component {
//   render() {
//     return (
//       <div className='Home'>
//         <div className='lander'>
//           <h1>Testimonials</h1>
//           <div className='container-of-images'>
//             <div>
//               <img
//                 src={require('../img/testimonials/Aaidan.jpeg')}
//                 paddingleft='100px'
//               />
//             </div>
//             <div className='padding-right'>
//               <p style={{ paddingTop: '50px' }}>
//                 “I wanted a more personalized experience to better hit my goals.
//                 Since starting... I have lost 30lbs and about 10% body fat,
//                 which has been amazing because those were the two things I cared
//                 the most about losing. He goes out of his way to help you reach
//                 your goals and he's always motivating you to go past your goals
//                 and set new ones!”
//               </p>
//               <p style={{ textAlign: 'right' }}>-Aaidan Hebert</p>
//             </div>
// <div id='person2'>
//   <p style={{ paddingTop: '50px' }}>
//     “I was able to dramatically improve my cardio while getting
//     stronger. It’s a great experience...if you do everything you are
//     supposed to, you will get results.”
//   </p>
//   <p style={{ textAlign: 'right' }}>-Chase Dolfi</p>
// </div>
// <div>
//   <img src={require('../img/testimonials/Chase.JPG')} />
// </div>
// <div>
//   <img src={require('../img/testimonials/Katya.jpg')} />
// </div>
// <div className='padding-right'>
//   <p style={{ paddingTop: '50px' }}>
//     “I've learned many exercises that engage muscle groups I
//     previously did not know how to work; and with Mitch's help I
//     continue to learn how to improve my nutrition in order to
//     increase strength, recover quickly after workouts, and enhance
//     my overall health. Mitch has helped me work towards many of my
//     personal goals.”
//   </p>
//   <p style={{ textAlign: 'right' }}>-Katya Cope</p>
// </div>
//             <div id='person3'>
//   <p style={{ paddingTop: '50px' }}>
//     “Mitch is an excellent coach and will put in time for any
//     questions you might have. He knows what he is talking about and
//     will help you produce.”
//   </p>
//   <p style={{ textAlign: 'right' }}>-Colton Taylor</p>
// </div>
// <div>
//   <img src={require('../img/testimonials/Colton2.jpg')} />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
