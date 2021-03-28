import React, { useState, Fragment } from 'react';
import totalListOfVideos from '../resources/Movement.json';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import './Movement.css';
/** have to use embed instead of watch on youtube links*/

export const Movement = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const renderAllvideos = () => {
    var videoArr = [];

    totalListOfVideos.forEach((video) =>
      videoArr.push(
        <div key={video.label}>
          {/* <iframe
            src={video.value}
            frameBorder='0'
            allow='autoplay; encrypted-media'
            allowFullScreen
            title='video'
          /> */}
          <p>{String(video.label)}</p>
        </div>
      )
    );

    return videoArr;
  };

  const renderVideo = (video) => {
    return (
      <div id='videoObject' key={video.label}>
        <iframe
          src={video.value}
          frameBorder='0'
          allow='autoplay; encrypted-media'
          allowFullScreen
          title='video'
        />
        <h2>{String(video.label)}</h2>
        <hr />
      </div>
    );
  };

  return (
    <Fragment>
      <h1>Movement Library</h1>
      <Autocomplete
        id='combo-box-demo'
        options={totalListOfVideos}
        getOptionLabel={(option) => option.label}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label='Combo box' variant='outlined' />
        )}
        onChange={(event, video) => {
          if (video == null) console.log('null autocomplete');
          else setSelectedVideo(video);
        }}
      />
      {selectedVideo != null ? renderVideo(selectedVideo) : null}
      <div className='container-of-boxes'>{renderAllvideos()}</div>
    </Fragment>
  );
};
export default Movement;
