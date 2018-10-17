import { combineReducers } from "redux";
import sessionReducer from "./session";
import userReducer from "./user";
import filmReducer from "./film";

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  filmState: filmReducer
});

export default rootReducer;
