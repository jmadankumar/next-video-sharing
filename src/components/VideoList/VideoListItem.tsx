import { Avatar, Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import ReactTimeago from 'react-timeago';
import styled from 'styled-components';
import { VideoDTO } from '../../types/video';

const VideoListItemWrapper = styled.a`
  width: 100%;
  margin-bottom: 20px;

  .video-image {
    width: 300px;
    height: 225px;
  }
`;

interface VideoListItemProps {
  video: VideoDTO;
}
const VideoListItem: React.FC<VideoListItemProps> = ({ video }) => {
  return (
    <Link href={`/watch?v=${video.id}`} passHref>
      <VideoListItemWrapper>
        <Card className="w-full">
          <div className="flex flex-row ">
            <CardMedia image={video.thumbnailUrl} className="video-image" />
            <CardContent className="flex-grow p-4 pl-8">
              <Typography component="h5" variant="h5" className="mb-2">
                {video.title}
              </Typography>
              <div className="flex flex-row items-center mb-2">
                <Typography variant="subtitle2" className="text-gray-700">
                  {video.createdDate && <ReactTimeago date={video.createdDate} />}
                </Typography>
              </div>
              <Link href={`/channel/${video.channel.id}`} passHref>
                <a className="flex flex-row items-center mb-2">
                  <Avatar
                    src={video.channel.imageUrl}
                    alt={video.channel.name}
                    className="w-6 h-6"
                  />
                  <Typography variant="subtitle1" color="textSecondary" className="ml-2">
                    {video.channel.name}
                  </Typography>
                </a>
              </Link>

              <Typography variant="subtitle1" color="textSecondary" className="mb-2">
                {video.description}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </VideoListItemWrapper>
    </Link>
  );
};

export default VideoListItem;
