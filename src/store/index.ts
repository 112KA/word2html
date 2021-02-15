import { combineReducers } from "redux";
import logger from "redux-logger";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import textReducer from "./slice/text";

export const rootReducer = combineReducers({
  text: textReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const middlewares = [...getDefaultMiddleware(), logger];

export const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
});
