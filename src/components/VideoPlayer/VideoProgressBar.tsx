import React, { useRef } from 'react';
import styled from 'styled-components';
import Slider from '../Slider';

const VideoProgressBarWrapper = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 44px;
  border-radius: 2px;
  height: auto;
  margin: 1px;
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
