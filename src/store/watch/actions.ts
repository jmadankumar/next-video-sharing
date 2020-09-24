import { VideoDTO } from '../../types/video';
import { SetWatchVideoAction, SET_WATCH_VIDEO } from './types';

export const setWatchVideo = (video: VideoDTO): SetWatchVideoAction => {
  return {
    type: SET_WATCH_VIDEO,
    payload: {
      video,
    },
  };
};
