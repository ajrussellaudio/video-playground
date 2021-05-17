import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { CustomPlayerOverlay } from './CustomPlayerOverlay';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Video = styled.video`
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
      videoNode.addEventListener('pause', function () {
        setState({ isPaused: true, time: this.currentTime });
      });
      videoNode.addEventListener('play', function () {
        setDimensions({ width: this.videoWidth, height: this.videoHeight });
        setState({ isPaused: false });
      });
    }
  }, []);

  return (
    <Container>
      <Video ref={videoRef} controls>
        <source src="//cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4" type="video/mp4" />
      </Video>
      {state.isPaused && <CustomPlayerOverlay time={state.time} {...dimensions} />}
    </Container>
  );
}
