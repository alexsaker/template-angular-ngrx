import * as UserActions from "../actions/user.actions";
import { setDefaultToken } from "./reducer.utils";
import { UserToken, UserCredentials } from "../models/user.models";

export interface State {
  token: string;
  loading: boolean;
  error: any;
}

export const initialState: State = {
  token: setDefaultToken(),
  loading: false,
  error: null
};

export function reducer(
  state = initialState,
  action: UserActions.Actions
): State {
  switch (action.type) {
    case UserActions.LOGIN: {
      return {
        ...state,
        loading: true
      };
    }

    case UserActions.LOGIN_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: null
      };
    }
    case UserActions.LOGIN_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }

    case UserActions.LOGOUT: {
      return {
        ...state,
        token: null
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
export const getToken = (state: State) => state.token;
export const getIsLoggedIn = (state: State) =>
  !!state.token && localStorage.getItem("token") === state.token;
