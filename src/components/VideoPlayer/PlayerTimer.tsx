import React, { DetailedHTMLProps } from 'react';
import { formatTimer } from '../../helper/timer';
import styled from 'styled-components';

const PlayerTimerWrapper = styled.div`
  .time {
    padding: 0.125rem;
  }
`;

interface PlayerTimerProps extends React.HTMLAttributes<HTMLDivElement> {
  currenTime: number;
  duration: number;
}

const PlayerTimer: React.FC<PlayerTimerProps> = ({ currenTime, duration, ...props }) => {
  return (
    <PlayerTimerWrapper {...props}>
      <span className="time">{formatTimer(currenTime)}</span>
      <span className="time">/</span>
      <span className="time">{formatTimer(duration)}</span>
    </PlayerTimerWrapper>
  );
};

export default PlayerTimer;
