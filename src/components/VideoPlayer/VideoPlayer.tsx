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
  const [ended, setEnded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1.0);

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
      setEnded(false);
    }
  };
  const handleTimeUpdate = () => {
    if (ref?.current) {
      setCurrentTime(ref.current.currentTime);
    }
  };
  const handleEnded = () => {
    setPaused(true);
    setEnded(true);
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

  const handleSeekChange = (currentTime: number) => {
    if (ref?.current) {
      ref.current.currentTime = currentTime;
      setCurrentTime(currentTime);
    }
  };

  const handleMute = () => {
    if (ref?.current) {
      ref.current.muted = true;
      setMuted(true);
    }
  };
  const handleUnmute = () => {
    if (ref?.current) {
      ref.current.muted = false;
      setMuted(false);
    }
  };
  const handleVolumeChange = (volume: number) => {
    if (ref?.current) {
      ref.current.volume = volume;
      setVolume(volume);
    }
  };

  const handleReplay = () => {
    if (ref?.current) {
      ref.current.currentTime = 0;
      setCurrentTime(0);
      setEnded(false);
      setPaused(false);
      ref.current.play();
    }
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
        onClick={paused ? handlePlay : handlePause}
      />
      <VideoProgressBar
        currentTime={currentTime}
        duration={duration}
        fullScreen={fullScreen}
        onSeekChange={handleSeekChange}
      />
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
        onMute={handleMute}
        onUnmute={handleUnmute}
        onVolumeChange={handleVolumeChange}
        muted={muted}
        volume={volume}
        ended={ended}
        onReplay={handleReplay}
      />
    </VideoPlayerWrapper>
  );
};

export default VideoPlayer;
