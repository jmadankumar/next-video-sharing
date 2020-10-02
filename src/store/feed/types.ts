import { ChannelDTO } from '../../types/channel';

export interface FeedState {
  channel: ChannelDTO | null;
  openCustomizeChannelDialog: boolean;
}

export const SET_FEED_CHANNEL = '@feed/set-feed-channel';
export const SHOW_CUSTOMIZE_CHANNEL_DIALOG = '@feed/show-customize-channel-dialog';
export const HIDE_CUSTOMIZE_CHANNEL_DIALOG = '@feed/hide-customize-channel-dialog';

export interface SetFeedChannelAction {
  type: typeof SET_FEED_CHANNEL;
  payload: {
    channel: ChannelDTO;
  };
}

export interface ShowCustomizeChannelDialogAction {
  type: typeof SHOW_CUSTOMIZE_CHANNEL_DIALOG;
}

export interface HideCustomizeChannelDialogAction {
  type: typeof HIDE_CUSTOMIZE_CHANNEL_DIALOG;
}

export type FeedActionTypes =
  | SetFeedChannelAction
  | ShowCustomizeChannelDialogAction
  | HideCustomizeChannelDialogAction;
