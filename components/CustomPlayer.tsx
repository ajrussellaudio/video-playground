import React, { useEffect, useRef, useState } from 'react';
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

export function CustomPlayer() {
  const videoNode = useRef<HTMLVideoElement>(null);
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (videoNode.current) {
      const { videoHeight, videoWidth } = videoNode.current;
      setDimensions({ width: videoWidth, height: videoHeight });

      videoNode.current.addEventListener('pause', () => setIsPaused(true));
      videoNode.current.addEventListener('play', () => setIsPaused(false));
    }
  }, []);

  return (
    <Container>
      <Video ref={videoNode} controls>
        <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
      </Video>
      {isPaused && <CustomPlayerOverlay {...dimensions} />}
    </Container>
  );
}
