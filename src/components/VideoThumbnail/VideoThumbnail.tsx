import React from 'react';
import styled from 'styled-components';

const VideoThumbnailWrapper = styled.div`
  width: 160px;
  height: 90px;
  img {
    width: 100%;
    height: auto;
    margin: 0 auto;
  }
`;
interface VideoThumbnailProps {
  src: string;
  title: string;
}
const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ src, title }) => {
  return (
    <VideoThumbnailWrapper className="video-thumbail">
      <img src={src} alt={title} className="image-fluid object-contain"/>
    </VideoThumbnailWrapper>
  );
};

export default VideoThumbnail;
