import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from "@ngrx/store";

import * as fromLayout from "./layout.reducer";
import * as fromUser from "./user.reducer";
import * as fromPost from "./post.reducer";

export interface State {
  layout: fromLayout.State;
  users: fromUser.State;
  posts: fromPost.State;
}

export const reducers: ActionReducerMap<State> = {
  layout: fromLayout.reducer,
  users: fromUser.reducer,
  posts: fromPost.reducer
};

// /**
//  * Layout
//  */
export const selectLayoutState = createFeatureSelector<fromLayout.State>(
  "layout"
);

export const getLayoutSidenavMenuOpened = createSelector(
  selectLayoutState,
  fromLayout.getSidenavMenuOpened
);
export const getLayoutSidenavFormOpened = createSelector(
  selectLayoutState,
  fromLayout.getSidenavFormOpened
);
export const getTheme = createSelector(selectLayoutState, fromLayout.getTheme);

/**
 * Users
 */
export const selectUserState = createFeatureSelector<fromUser.State>("users");

export const getUsersAll = createSelector(selectUserState, fromUser.getAll);
export const getUsersSelected = createSelector(
  selectUserState,
  fromUser.getSelected
);

/**
 * Post
 */
export const selectPostState = createFeatureSelector<fromPost.State>("posts");

export const getPostsAll = createSelector(selectPostState, fromPost.getAll);
