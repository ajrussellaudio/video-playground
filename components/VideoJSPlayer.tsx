import React, { useEffect, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

type VideoJSPlayerProps = {
  options: videojs.PlayerOptions;
};

const initialOptions: videojs.PlayerOptions = {
  controls: true,
  fluid: true,
  liveui: true,
  playbackRates: [0.5, 1, 1.5, 2],
  controlBar: {
    volumePanel: {
      inline: false,
    },
  },
};

function Greeting() {
  return <h1>hiya!</h1>;
}

export function VideoJSPlayer({ options }: VideoJSPlayerProps) {
  const videoNode = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const player = videojs(
      videoNode.current,
      {
        ...initialOptions,
        ...options,
      },
      function () {
        var ModalDialog = videojs.getComponent('ModalDialog');

        var modal = new ModalDialog(player, { content: renderToString(<Greeting />), temporary: false });

        modal.on('modalclose', function () {
          player.play();
        });

        player.addChild(modal);

        player.on('pause', function () {
          modal.open();
        });

        player.on('play', function () {
          modal.close();
        });
      },
    );

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [options]);

  return <video ref={videoNode} className="video-js vjs-big-play-centered" />;
}
