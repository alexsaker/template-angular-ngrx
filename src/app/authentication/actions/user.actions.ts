import { Action } from "@ngrx/store";
import { UserToken, UserCredentials } from "../models/user.models";

export const LOGIN = "[User] Login";
export const LOGOUT = "[User] Logout";
export const LOGIN_SUCCESS = "[User] Login Success";
export const LOGIN_FAILURE = "[User] Login Failure";
export const LOGIN_REDIRECT = "[User] Login Redirect";

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: UserCredentials) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: UserToken) {}
}

export class LoginFailure implements Action {
  readonly type = LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class LoginRedirect implements Action {
  readonly type = LOGIN_REDIRECT;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type Actions =
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout;
