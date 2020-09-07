import React from 'react';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { IconButton } from '@material-ui/core';
import Slider from '../Slider';
import styled from 'styled-components';

const VolumeControllerWrapper = styled.div`
  display: flex;
  align-items: center;
  .volume-slide-container {
    display: none;
    width: 60px;
    height: 14px;
  }
  &:hover .volume-slide-container {
    display: inline-block;
    padding-right: 12px;
  }
`;

const MAX_VOLUME = 1.0;

interface VolumeControllerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onVolumeChange'> {
  volume?: number;
  muted?: boolean;
  controlClassName?: string;
  onMute?: () => void;
  onUnmute?: () => void;
  onVolumeChange?: (volume: number) => void;
}

const VolumeController: React.FC<VolumeControllerProps> = ({
  volume = 1.0,
  muted = true,
  controlClassName,
  onMute,
  onUnmute,
  onVolumeChange,
}) => {
  
  const renderVolumeIcon = () => {
    if (muted) {
      return <VolumeOffIcon />;
    } else if (volume >= 0.0 && volume < 0.3) {
      return <VolumeMuteIcon />;
    } else if (volume >= 0.3 && volume < 0.65) {
      return <VolumeDownIcon />;
    }
    return <VolumeUpIcon />;
  };

  const handleVolumeToggle = () => {
    if (muted) {
      onUnmute?.();
    } else {
      onMute?.();
    }
  };

  const handleSliderChange = (value: number) => {
    onVolumeChange?.((MAX_VOLUME * value) / 100);
  };

  return (
    <VolumeControllerWrapper className="volume-controller">
      <IconButton className={controlClassName} onClick={handleVolumeToggle}>
        {renderVolumeIcon()}
      </IconButton>
      <div className="volume-slide-container">
        <Slider max={MAX_VOLUME} value={volume} onChange={handleSliderChange} color={'#fff'} trackHeight={4}/>
      </div>
    </VolumeControllerWrapper>
  );
};

export default VolumeController;
