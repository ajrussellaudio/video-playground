import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { CustomPlayerOverlay } from './CustomPlayerOverlay';

const Container = styled.div`
  position: relative;
  width: 640px;
  height: 380px;
`;

const Video = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

type PlayingState = { isPaused: false } | { isPaused: true; time: number };

export function CustomPlayer() {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const [state, setState] = useState<PlayingState>({ isPaused: false });

  // see here:
  // https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
  const videoRef = useCallback((videoNode: HTMLVideoElement) => {
    if (videoNode !== null) {
      const { videoHeight, videoWidth } = videoNode;
      setDimensions({ width: videoWidth, height: videoHeight });

      videoNode.addEventListener('pause', function () {
        setState({ isPaused: true, time: this.currentTime });
      });
      videoNode.addEventListener('play', function () {
        setState({ isPaused: false });
      });
    }
  }, []);

  return (
    <Container>
      <Video ref={videoRef} controls>
        <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
      </Video>
      {state.isPaused && <CustomPlayerOverlay time={state.time} {...dimensions} />}
    </Container>
  );
}
