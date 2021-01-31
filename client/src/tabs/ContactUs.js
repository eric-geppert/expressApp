import React, { Fragment } from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

const ContactUs = () => {
  return (
    <Fragment>
      <h1 className='large text-primary'>Contact Us</h1>
      <p className='lead'>Email: contact@findmyworkoutplan.com</p>
      
      {/* <p className='lead'>Facebook:</p>
      <p className='lead'>Twitter:</p>
      <p className='lead'>Instagram:</p> */}
      <p className='lead'>
        Reach out with any questions regarding programming, the website, or your
        find my workoutplan account.
      </p>
      <p>
        click on any of the below icons for our social media
      </p>
      <a href="https://www.facebook.com/mitch.hein.927">
        <FacebookIcon/>
      </a>
      <a >
        <TwitterIcon/>
      </a>
      <a >
        <InstagramIcon/>
      </a>
      <p style={{color:"red"}}>
      need to add links to other icons
      </p>
    </Fragment>
  );
};
export default ContactUs;
