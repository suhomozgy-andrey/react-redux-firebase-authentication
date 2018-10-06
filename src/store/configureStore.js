import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";

export function configureStore(initialState) {
  const state = {
    ...initialState
  };

  const enhancers = [];
  const middleware = [];

  if (process.env.NODE_ENV === "development") {
    const { devToolsExtension } = window;

    if (typeof devToolsExtension === "function") {
      enhancers.push(devToolsExtension());
    }
  }

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );

  const store = createStore(rootReducer, state, composedEnhancers);

  return store;
}
