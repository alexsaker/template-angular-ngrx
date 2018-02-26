import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
  combineReducers
} from "@ngrx/store";
import { environment } from "../../environments/environment";
import * as fromRouter from "@ngrx/router-store";

import * as fromAuthentication from "../authentication/reducers";
/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

import * as fromLayout from "../core/reducers/layout.reducer";
import * as fromUser from "../core/reducers/user.reducer";
import * as fromPost from "../core/reducers/post.reducer";

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  layout: fromLayout.State;
  routerReducer: fromRouter.RouterReducerState;
  users: fromUser.State;
  posts: fromPost.State;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
  layout: fromLayout.reducer,
  routerReducer: fromRouter.routerReducer,
  users: fromUser.reducer,
  posts: fromPost.reducer
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log("state", state);
    console.log("action", action);
    return reducer(state, action);
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];

/**
 * Layout Reducers
 */
export const getLayoutState = createFeatureSelector<fromLayout.State>("layout");

export const getSidenavMenuOpened = createSelector(
  getLayoutState,
  fromLayout.getSidenavMenuOpened
);
export const getSidenavFormOpened = createSelector(
  getLayoutState,
  fromLayout.getSidenavFormOpened
);
export const getTheme = createSelector(getLayoutState, fromLayout.getTheme);

/**
 * Authentication
 *
 */
export const getIsUserLoggedIn = fromAuthentication.getIsUserLoggedIn;

/**
 * User Reducers
 */
export const getUserState = createFeatureSelector<fromUser.State>("users");
export const getAllUsers = createSelector(getUserState, fromUser.getAll);
export const getUsersLoaded = createSelector(getUserState, fromUser.getLoaded);
export const getUsersLoading = createSelector(
  getUserState,
  fromUser.getLoading
);
export const getUsersSelected = createSelector(
  getUserState,
  fromUser.getSelected
);
export const getUsersEntities = createSelector(
  getUserState,
  fromUser.getEntities
);
/**
 * Post Reducers
 */
export const getPostState = createFeatureSelector<fromPost.State>("posts");
export const getAllPosts = createSelector(getPostState, fromPost.getAll);
export const getPostsLoaded = createSelector(getPostState, fromPost.getLoaded);
export const getPostsLoading = createSelector(
  getPostState,
  fromPost.getLoading
);

export const getPostsPerUser = createSelector(
  getAllPosts,
  getUsersEntities,
  getUsersSelected,
  (posts, userEntities, selectedUser) => {
    return posts.filter(post => post["userId"] === selectedUser).map(post => {
      return { ...post, ...{ user: userEntities[selectedUser] } };
    });
  }
);
