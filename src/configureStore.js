import { applyMiddleware, createStore, compose } from "redux";
import ReduxThunk from "redux-thunk";

import rootReducer from "./reducers";

/**
 * Old version of creating the Redux store
 */

// export const middlewares = [ReduxThunk];
// const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
// export default createStoreWithMiddleware(rootReducer);

/**
 * New version, including code to use Redux dev tools
 */

export const middlewares = [ReduxThunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
