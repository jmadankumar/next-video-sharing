import { AnyAction } from 'redux';
import { VideoDTO } from '../../types/video';

export interface HomeState {
  videos: VideoDTO[];
}

export const SET_VIDEO = '@home/set-videos';

export interface SetVideosAction {
  type: typeof SET_VIDEO;
  payload: {
    videos: VideoDTO[];
  };
}

export type HomeActionTypes = SetVideosAction;
