import React from 'react';
import VideoPlayer from './VideoPlayer';

export const videoPlayerDefault = () => (
  <VideoPlayer
    src="https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4"
    poster="https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg"
  />
);

export default {
  title: 'Video Player',
};
