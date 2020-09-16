import React from 'react';
import { VideoDTO } from '../../types/video';
import VideoThumbnail from '../VideoThumbnail';

interface VideoCardProps {
  videoDetail: VideoDTO;
}
const VideoCard: React.FC<VideoCardProps> = ({ videoDetail }) => {
  return (
    <div>
      <VideoThumbnail src={videoDetail.thumbnailUrl} title={videoDetail.title} />
      <div>{videoDetail.title}</div>
      <div>{videoDetail.channelId}</div>
      <div>{videoDetail.createdDate}</div>
    </div>
  );
};

export default VideoCard;
