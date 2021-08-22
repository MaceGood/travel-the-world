import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import settings from "./settings";

export const reducers = combineReducers({ posts, auth, settings });
