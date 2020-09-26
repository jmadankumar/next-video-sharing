import { ChannelDTO } from '../../types/channel';
import { SetSubscriptionsAction, SET_SUBSCRIPTIONS } from './types';

export const setSubscriptions = (subscriptions: ChannelDTO[]): SetSubscriptionsAction => {
  return {
    type: SET_SUBSCRIPTIONS,
    payload: {
      subscriptions,
    },
  };
};
