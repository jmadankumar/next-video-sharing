import { ChannelDTO } from "../../types/channel";

export interface SidebarState{
    subscriptions: ChannelDTO[];
}

export const SET_SUBSCRIPTIONS = '@sidebar/subscriptions';

export interface SetSubscriptionsAction {
    type:typeof SET_SUBSCRIPTIONS,
    payload:{
        subscriptions: ChannelDTO[];
    }
}

export type SideBarActionTypes = SetSubscriptionsAction;