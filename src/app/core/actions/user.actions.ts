import { Action } from "@ngrx/store";
import { User } from "../models/user.models";

export const GETALL = "[User] Get All";
export const GETALL_SUCCESS = "[User] Get All Success";
export const GETALL_FAILURE = "[User] Get All Failure";
export const GET = "[User] Get";
export const GET_SUCCESS = "[User] Get Success";
export const GET_FAILURE = "[User] Get Failure";
export const SELECT = "[User] Select";

export class GetAll implements Action {
  readonly type = GETALL;
  constructor(public payload?: any) {}
}

export class GetAllSuccess implements Action {
  readonly type = GETALL_SUCCESS;
  constructor(public payload: { users: User[] }) {}
}

export class GetAllFailure implements Action {
  readonly type = GETALL_FAILURE;
  constructor(public payload: any) {}
}

export class Get implements Action {
  readonly type = GET;
  constructor(public payload: number) {}
}

export class GetSuccess implements Action {
  readonly type = GET_SUCCESS;
  constructor(public payload: { user: User }) {}
}

export class GetFailure implements Action {
  readonly type = GET_FAILURE;
  constructor(public payload: any) {}
}
export class Select implements Action {
  readonly type = SELECT;
  constructor(public payload: number) {}
}
export type Actions =
  | GetAll
  | GetAllSuccess
  | GetAllFailure
  | Get
  | GetSuccess
  | GetFailure
  | Select;
