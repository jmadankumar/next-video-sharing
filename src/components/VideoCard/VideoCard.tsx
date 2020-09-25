import React from 'react';
import { VideoDTO } from '../../types/video';
import VideoThumbnail from '../VideoThumbnail';
import TimeAgo from 'react-timeago';
import { Typography } from '@material-ui/core';
import Link from 'next/link';
import cx from 'classnames';
interface VideoCardProps {
  videoDetail: VideoDTO;
  className: string;
}
const VideoCard = React.forwardRef<HTMLDivElement, VideoCardProps>(
  ({ videoDetail, className, ...props }, ref) => {
    return (
      <div className={cx(className)} ref={ref} {...props}>
        <VideoThumbnail src={videoDetail.thumbnailUrl} title={videoDetail.title} />
        <Typography variant="h6" className="capitalize font-bold mt-2">
          {videoDetail.title}
        </Typography>
        <div className="flex justify-between mt-1">
          <Link href={`/channel/${videoDetail.channel.id}`} passHref>
            <Typography variant="subtitle1" component="a" className="text-gray-700">
              {videoDetail.channel.name}
            </Typography>
          </Link>
          <Typography variant="subtitle1" className="text-gray-700">
            {videoDetail.createdDate && <TimeAgo date={videoDetail.createdDate} />}
          </Typography>
        </div>
      </div>
    );
  },
);

export default VideoCard;
