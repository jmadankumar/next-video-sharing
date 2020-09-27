import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { ChannelDTO } from '../../types/channel';

const ChannelSubscriptionsWrapper = styled.div`
  .list-item-avatar {
    // min-width: 36px;
  }
`;

interface ChannelSubscriptionsProps {
  subscriptions: ChannelDTO[];
}
const ChannelSubscriptions: React.FC<ChannelSubscriptionsProps> = ({ subscriptions }) => {
  if (subscriptions.length === 0) {
    return null;
  }
  return (
    <ChannelSubscriptionsWrapper className="py-2">
      <Typography variant="body1" className="px-4 py-1 uppercase font-bold" color="textSecondary">
        Subscriptions
      </Typography>
      <List>
        {subscriptions.map((subscription) => (
          <Link href={`/channel/${subscription.id}`} passHref>
            <ListItem component="a">
              <ListItemAvatar className="list-item-avatar">
                <Avatar src={subscription.imageUrl} alt={subscription.name} className="w-6 h-6" />
              </ListItemAvatar>
              <ListItemText primary={subscription.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </ChannelSubscriptionsWrapper>
  );
};

export default ChannelSubscriptions;
