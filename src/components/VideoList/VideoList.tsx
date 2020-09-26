import { List, ListItem } from '@material-ui/core';
import React from 'react';
import { VideoDTO } from '../../types/video';
import VideoListItem from './VideoListItem';

interface VideoListProps {
  videos: VideoDTO[];
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  return (
    <List>
      {videos.map((video) => (
        <VideoListItem video={video} key={video.id}/>
      ))}
    </List>
  );
};

export default VideoList;
