import { VideoDTO } from '../../types/video';
export const SET_WATCH_VIDEO = '@watch/set-watch-video';

export interface WatchState {
  video: VideoDTO | null;
}

export interface SetWatchVideoAction {
  type: typeof SET_WATCH_VIDEO;
  payload: {
    video: VideoDTO;
  };
}


export type WatchActionTypes = SetWatchVideoAction;
