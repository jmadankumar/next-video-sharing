import React from 'react';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { IconButton } from '@material-ui/core';

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

  return (
    <div>
      <IconButton className={controlClassName} onClick={handleVolumeToggle}>
        {renderVolumeIcon()}
      </IconButton>
      <div></div>
    </div>
  );
};

export default VolumeController;
