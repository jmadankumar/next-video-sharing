import { List, ListItem } from '@material-ui/core';
import React from 'react';
import { ChannelDTO } from '../../types/channel';
import ChanneListItem from './ChannelListItem';

interface ChannelListProps {
  channels: ChannelDTO[];
}

const ChannelList: React.FC<ChannelListProps> = ({ channels }) => {
  return (
    <List>
      {channels.map((channel) => (
        <ChanneListItem channel={channel} key={channel.id}/>
      ))}
    </List>
  );
};

export default ChannelList;
