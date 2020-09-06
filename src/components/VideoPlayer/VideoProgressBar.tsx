import React, { CSSProperties, useRef } from 'react';
import styled from 'styled-components';
import { Slide } from '@material-ui/core';
import Slider from '../Slider/Slider';

const seekerMarkerWidth = 12;
const videoProgressHeight = 6;

const VideoProgressBarWrapper = styled.div`
  position: absolute;
  left: 2px;
  right: 2px;
  bottom: 40px;
  border-radius: 2px;
  height: 6px;
  margin: 1px;
  .video-progress-bar-container {
    background-color: rgba(255, 255, 255, 0.3);
    width: 100%;
    height: ${videoProgressHeight}px;
    border-radius: 2px;
  }
  .seek-marker {
    width: ${seekerMarkerWidth}px;
    height: ${seekerMarkerWidth}px;
    border-radius: ${seekerMarkerWidth}px;
    background-color: #4caf50;
    transform: translateX(0px) translateY(-${seekerMarkerWidth - videoProgressHeight / 2}px);
    cursor: pointer;
    box-shadow: 0px 0px 2px #000;
  }

  .seek-progress {
    background-color: #4caf50;
    width: 0%;
    height: ${videoProgressHeight}px;
    border-radius: 2px;
    transition: 1s width linear;
  }
`;

interface VideoProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  currentTime?: number;
  duration?: number;
  fullScreen?: boolean;
  onSeekChange?: (currentTime: number) => void;
}

const VideoProgressBar: React.FC<VideoProgressBarProps> = ({
  currentTime = 0,
  duration = 1,
  onSeekChange,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSliderChange = (value: number) => {
    onSeekChange?.((duration * value) / 100);
  };

  return (
    <VideoProgressBarWrapper ref={wrapperRef}>
      <Slider max={duration} value={currentTime} onChange={handleSliderChange} color={'#4caf50'} />
    </VideoProgressBarWrapper>
  );
};

export default VideoProgressBar;
