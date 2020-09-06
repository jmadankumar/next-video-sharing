import React, { useRef, useEffect, DetailedHTMLProps, useState } from 'react';
import styled from 'styled-components';
import PlayerControls from './PlayerControls';
import VideoProgressBar from './VideoProgressBar';

const VideoPlayerWrapper = styled.div`
  width: 100%;
  position: relative;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;

  .video-player {
    width: 100%;
  }
`;

type DetailedVideoProps = DetailedHTMLProps<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
>;

interface VideoPlayerProps extends DetailedVideoProps {}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ ...props }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {}, []);

  const handlePause = () => {
    if (ref?.current) {
      ref.current.pause();
      setPaused(true);
    }
  };
  const handlePlay = () => {
    if (ref?.current) {
      ref.current.play();
      setPaused(false);
    }
  };
  const handleTimeUpdate = () => {
    if (ref?.current) {
      setCurrentTime(ref.current.currentTime);
    }
  };
  const handleEnded = () => {
    setPaused(true);
  };

  const handleDurationChange = () => {
    if (ref?.current) {
      setDuration(ref.current.duration);
    }
  };

  const handleFullScreen = () => {
    if (containerRef?.current) {
      containerRef?.current.requestFullscreen();
      setFullScreen(true);
    }
  };

  const handleExitFullScreen = () => {
    document.exitFullscreen();
    setFullScreen(false);
  };

  return (
    <VideoPlayerWrapper className="video-container" ref={containerRef}>
      <video
        {...props}
        ref={ref}
        className="video-player"
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
        onDurationChange={handleDurationChange}
      />
      <VideoProgressBar currentTime={currentTime} duration={duration} fullScreen={fullScreen} />
      <PlayerControls
        className="player-controls"
        paused={paused}
        onPause={handlePause}
        onPlay={handlePlay}
        currentTime={currentTime}
        duration={duration}
        onFullScreen={handleFullScreen}
        onExitFullScreen={handleExitFullScreen}
        fullScreen={fullScreen}
      />
    </VideoPlayerWrapper>
  );
};

export default VideoPlayer;
