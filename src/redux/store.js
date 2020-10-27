import { createStore, combineReducers, applyMiddleware } from "redux";
import regionReducer from "./modules/region";
import settingsReducer from "./modules/settings";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  regions: regionReducer,
  settings: settingsReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
