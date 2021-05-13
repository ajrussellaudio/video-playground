import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Mask = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

const BoundingBox = styled.div<{ aspectRatio: number }>`
  position: relative;
  width: 100%;
  padding-top: ${props => 100 / props.aspectRatio}%;
  background-color: rgba(255, 0, 0, 0.3);
  overflow: hidden;
`;

const Circles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const Circle = styled.div<{ position: Point }>`
  position: absolute;
  top: ${props => props.position.y}%;
  left: ${props => props.position.x}%;
  pointer-events: initial;
  height: 20px;
  width: 20px;
  border-radius: 20px;
  background-color: orangered;
  border: 1px solid white;
  transition: transform 0.2s;
  transform: translate(-10px, -10px);

  &:hover {
    cursor: pointer;
    transform: translate(-10px, -10px) scale(1.5);
  }
`;

type CustomPlayerOverlayProps = {
  height: number;
  width: number;
};

type Point = {
  x: number;
  y: number;
};

export function CustomPlayerOverlay({ height, width }: CustomPlayerOverlayProps) {
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    const fetchPoints = async () =>
      Promise.resolve(Array.from({ length: 12 }, () => ({ x: Math.random(), y: Math.random() }))).then(
        fetchedPoints => {
          setPoints(fetchedPoints.map(point => ({ x: point.x * 100, y: point.y * 100 })));
        },
      );
    fetchPoints();
  }, []);

  return (
    <Mask>
      <BoundingBox aspectRatio={width / height}>
        <Circles>
          {points.map(point => (
            <Circle key={point.x} position={point} onClick={() => console.log('clicked!')} />
          ))}
        </Circles>
      </BoundingBox>
    </Mask>
  );
}
