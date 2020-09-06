import React, { CSSProperties, useRef } from 'react';
import styled from 'styled-components';

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
}

const VideoProgressBar: React.FC<VideoProgressBarProps> = ({ currentTime = 0, duration = 1 }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const seekProgressWidth = (currentTime / duration) * 100;
  const calculateSeekProgressStyle = (): CSSProperties => {
    return {
      width: `${seekProgressWidth}%`,
    };
  };
  const calculateSeekMarkerStyle = (): CSSProperties => {
    const width = wrapperRef.current?.clientWidth || 0;
    const seekerXPos = (width * seekProgressWidth) / 100 - seekerMarkerWidth / 2;
    return {
      transform: `translateX(${seekerXPos}px) translateY(-9px)`,
    };
  };
  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    console.log(event.clientX);
  };
  return (
    <VideoProgressBarWrapper ref={wrapperRef}>
      <div className="video-progress-bar-container">
        <div className="buffered-progress"></div>
        <div className="seek-progress" style={calculateSeekProgressStyle()}></div>
      </div>
      <div
        className="seek-marker"
        style={calculateSeekMarkerStyle()}
        draggable
        onDrag={handleDrag}
      ></div>
    </VideoProgressBarWrapper>
  );
};

export default VideoProgressBar;
