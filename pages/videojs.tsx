import React from 'react';
import { VideoJSPlayer } from '../components/VideoJSPlayer';

const Videojs: React.FC = () => {
  const videoJSOptions = {
    sources: [
      {
        src: '//vjs.zencdn.net/v/oceans.mp4',
        type: 'video/mp4',
      },
    ],
  };

  return (
    <>
      <h1>Video.js</h1>
      <VideoJSPlayer options={videoJSOptions} />
    </>
  );
};

export default Videojs;
