import { Dispatch } from 'redux';
import { VideoDTO } from '../../types/video';
import { SetVideosAction, SET_VIDEO } from './types';

export const setVideos = (videos: VideoDTO[]) => {
  return {
    type: SET_VIDEO,
    payload: {
      videos,
    },
  };
};
