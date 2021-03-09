import React, { Fragment, Component } from 'react';
import './Movement.css';
import totalListOfVideos from '../resources/Movement.json';
// import { Player } from 'video-react';
// import Container from 'react-bootstrap/'
// import Row from 'react-bootstrap/lib/Row'
// import Col from 'react-bootstrap/lib/Col'
// import TabContainer from 'react-bootstrap/lib/TabContainer'
// import { Table } from "material-ui";

/** have to use embed instead of watch */

export const Movement = () => {
  const renderAllvideos = () => {
    var videoArr = [];

    totalListOfVideos.forEach((video) =>
      videoArr.push(
        <div id={video.label}>
          <iframe
            src={video.value}
            frameBorder='0'
            allow='autoplay; encrypted-media'
            allowFullScreen
            title='video'
          />
          <p>{String(video.label)}</p>
        </div>
      )
    );

    return videoArr;
  };

  return (
    <Fragment>
      <h1>Movement Library</h1>
      <div className='container-of-boxes'>{renderAllvideos()}</div>
    </Fragment>
  );
};
export default Movement;

{
  /* <div id='seated db bench'>
          <iframe
            src='https://www.youtube.com/embed/VoA-Hhd5e1U' //have to use embed instead of watch
            frameBorder='0'
            allow='autoplay; encrypted-media'
            allowFullScreen
            title='video'
            // name="Seated Dumbell BenchPress"
          />
          <p>Seated Dumbell BenchPress</p>
        </div>
        <div id='db bench'>
          <iframe
            src='https://www.youtube.com/embed/O-zZAKgj0JY'
            frameBorder='0'
            allow='autoplay; encrypted-media'
            allowFullScreen
            title='video'
          />
          <p>Dumbell BenchPress</p>
        </div>
        <div id='thruster'>
          <iframe
            src='https://www.youtube.com/embed/yP7k8eGvymA'
            frameBorder='0'
            allow='autoplay; encrypted-media'
            allowFullScreen
            title='video'
          />
          <p>Thruster</p>
        </div>
        <div>
          <iframe
            src='https://www.youtube.com/embed/uRT0BAcMOgg'
            frameBorder='0'
            allow='autoplay; encrypted-media'
            allowFullScreen
            title='video'
          />
          <p>Air Squat</p>
        </div> */
}
