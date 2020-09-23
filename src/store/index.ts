import { createStore, applyMiddleware, combineReducers, Reducer, Middleware } from 'redux';
import { createWrapper, MakeStore, HYDRATE } from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import authReducer from './auth/reducers';
import homeReducer from './home/reducers';
import { HomeActionTypes } from './home/types';
import { AuthActionTypes } from './auth/types';

const combinedReducer = combineReducers({
  authState: authReducer,
  homeState: homeReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;

interface HydrateAction {
  type: typeof HYDRATE;
  payload: any;
}

const rootReducer: Reducer<RootState, HydrateAction | AuthActionTypes | HomeActionTypes> = (
  state,
  action,
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const bindMiddleware = (middlewares: Middleware[]) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middlewares));
  }
  return applyMiddleware(...middlewares);
};

const makeStore: MakeStore = () => createStore(rootReducer, bindMiddleware([thunk]));

export const wrapperRedux = createWrapper(makeStore);
