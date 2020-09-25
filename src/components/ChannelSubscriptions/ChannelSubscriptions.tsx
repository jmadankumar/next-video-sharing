import { List, ListItem, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const ChannelSubscriptionsWrapper = styled.div``;

const ChannelSubscriptions: React.FC = () => {
  return (
    <ChannelSubscriptionsWrapper>
      <Typography variant="body1" className="px-4 py-1">Subscriptions</Typography>
      <List>
        <ListItem></ListItem>
      </List>
    </ChannelSubscriptionsWrapper>
  );
};

export default ChannelSubscriptions;
