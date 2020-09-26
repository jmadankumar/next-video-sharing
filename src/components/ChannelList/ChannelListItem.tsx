import { Button, Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { ChannelDTO } from '../../types/channel';

const ChannelListItemWrapper = styled.a`
  width: 100%;
  margin-bottom: 20px;

  .channel-image {
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }
`;

interface ChannelListItemProps {
  channel: ChannelDTO;
}
const ChannelListItem: React.FC<ChannelListItemProps> = ({ channel }) => {
  return (
    <Link href={`/channel/${channel.id}`} passHref>
      <ChannelListItemWrapper>
        <Card className="w-full">
          <div className="flex flex-row p-4">
            <CardMedia image={channel.imageUrl} className="channel-image" />
            <CardContent className="flex-grow pl-8">
              <Typography component="h5" variant="h5">
                {channel.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {channel.description}
              </Typography>
            </CardContent>
            <div className="flex items-center p-4">
              <Button color="secondary" variant="contained" disableElevation>
                Subscribe
              </Button>
            </div>
          </div>
        </Card>
      </ChannelListItemWrapper>
    </Link>
  );
};

export default ChannelListItem;
