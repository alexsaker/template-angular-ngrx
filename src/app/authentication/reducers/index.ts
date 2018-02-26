import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromRoot from "../../reducers";
import * as fromUser from "./user.reducer";

export interface AuthenticationState {
  user: fromUser.State;
}

export interface State extends fromRoot.State {
  authentication: AuthenticationState;
}

export const reducers = {
  user: fromUser.reducer
};

export const selectAuthenticationState = createFeatureSelector<
  AuthenticationState
>("authentication");

// USER SUB STATE
export const selectUserAuthenticationState = createSelector(
  selectAuthenticationState,
  (state: AuthenticationState) => state.user
);
export const getIsUserLoggedIn = createSelector(
  selectUserAuthenticationState,
  fromUser.getIsLoggedIn
);

export const getUserLoading = createSelector(
  selectUserAuthenticationState,
  fromUser.getLoading
);
export const getUserError = createSelector(
  selectUserAuthenticationState,
  fromUser.getError
);
export const getUserToken = createSelector(
  selectUserAuthenticationState,
  fromUser.getToken
);
