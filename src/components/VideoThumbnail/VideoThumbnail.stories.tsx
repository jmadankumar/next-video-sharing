import React from 'react';
import VideoThumbnail from './VideoThumbnail';

export default {
  title: 'Video Thumbnail',
};

export const videoThumbnail = () => {
  return (
    <VideoThumbnail
      src="https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg"
      title="Test"
    />
  );
};
