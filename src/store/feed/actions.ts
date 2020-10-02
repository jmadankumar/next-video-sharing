import { ChannelDTO } from '../../types/channel';
import {
  HideCustomizeChannelDialogAction,
  HIDE_CUSTOMIZE_CHANNEL_DIALOG,
  ShowCustomizeChannelDialogAction,
  SHOW_CUSTOMIZE_CHANNEL_DIALOG,
  SetFeedChannelAction,
  SET_FEED_CHANNEL,
} from './types';

export const setFeedChannel = (channel: ChannelDTO): SetFeedChannelAction => {
  return {
    type: SET_FEED_CHANNEL,
    payload: {
      channel,
    },
  };
};

export const showCustomizeChannelDialog = (): ShowCustomizeChannelDialogAction => {
  return {
    type: SHOW_CUSTOMIZE_CHANNEL_DIALOG,
  };
};

export const hideCustomizeChannelDialog = (): HideCustomizeChannelDialogAction => {
  return {
    type: HIDE_CUSTOMIZE_CHANNEL_DIALOG,
  };
};
