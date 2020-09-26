import { SET_SUBSCRIPTIONS, SideBarActionTypes, SidebarState } from './types';

const initialState: SidebarState = {
  subscriptions: [],
};

export default function sidebarReducer(
  state = initialState,
  action: SideBarActionTypes,
): SidebarState {
  switch (action.type) {
    case SET_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: action.payload.subscriptions,
      };
    default:
      return {
        ...state,
      };
  }
}
