import React from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import styled from 'styled-components';
import cx from 'classnames';
import PlayerTimer from './PlayerTimer';
import VolumeController from './VolumeController';
import { IconButton } from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';

const controlHeight = 36;
const PlayerControlsWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: ${controlHeight}px;
  background-color: rgba(0, 0, 0, 0.3);
  .controls-container {
    width: 100%;
    height: ${controlHeight}px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
  }
  .control-group {
    display: flex;
    align-items: center;
  }
  .control {
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    padding: 6px 12px;
    display: inline-block;
  }
  .player-timer {
    font-size: 16px;
    cursor: auto;
  }

  &.bottom {
    bottom: 0;
  }
`;

interface PlayerControlsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onVolumeChange'> {
  position?: 'bottom';
  onPause?: () => void;
  onPlay?: () => void;
  onFullScreen?: () => void;
  onExitFullScreen?: () => void;
  paused: boolean;
  currentTime?: number;
  duration?: number;
  fullScreen?: boolean;
  onMute?: () => void;
  onUnmute?: () => void;
  onVolumeChange?: (volume: number) => void;
  muted?: boolean;
  volume?: number;
  ended?: boolean;
  onReplay?: () => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  position = 'bottom',
  paused,
  onPause,
  onPlay,
  onFullScreen,
  onExitFullScreen,
  currentTime = 0,
  duration = 0,
  fullScreen,
  className,
  onMute,
  onUnmute,
  onVolumeChange,
  muted,
  volume,
  ended,
  onReplay,
  ...props
}) => {
  const renderPlayButton = () => {
    return (
      <IconButton className="control" onClick={paused ? onPlay : onPause}>
        {paused ? <PlayArrowIcon /> : <PauseIcon />}
      </IconButton>
    );
  };
  return (
    <PlayerControlsWrapper
      {...props}
      className={cx(
        {
          bottom: position === 'bottom',
        },
        className,
      )}
    >
      <div className="controls-container">
        <div className="control-group">
          {ended && (
            <IconButton className="control" onClick={onReplay}>
              <ReplayIcon />
            </IconButton>
          )}
          {!ended && renderPlayButton()}
          <VolumeController
            controlClassName="control"
            onMute={onMute}
            onUnmute={onUnmute}
            onVolumeChange={onVolumeChange}
            muted={muted}
            volume={volume}
          />
          <PlayerTimer
            className="control player-timer"
            currenTime={currentTime}
            duration={duration}
          />
        </div>
        <div className="control-group">
          <IconButton className="control" onClick={fullScreen ? onExitFullScreen : onFullScreen}>
            {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </div>
      </div>
    </PlayerControlsWrapper>
  );
};

export default PlayerControls;
