import { Action } from "@ngrx/store";
import { Post } from "../models/post.models";

export const GETALL = "[Post] Get All";
export const GETALL_SUCCESS = "[Post] Get All Success";
export const GETALL_FAILURE = "[Post] Get All Failure";
export const GET = "[Post] Get";
export const GET_SUCCESS = "[Post] Get Success";
export const GET_FAILURE = "[Post] Get Failure";
export const SELECT = "[Post] Select";

export class GetAll implements Action {
  readonly type = GETALL;
  constructor(public payload?: any) {}
}

export class GetAllSuccess implements Action {
  readonly type = GETALL_SUCCESS;
  constructor(public payload: { posts: Post[] }) {}
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
  constructor(public payload: { post: Post }) {}
}

export class GetFailure implements Action {
  readonly type = GET_FAILURE;
  constructor(public payload: any) {}
}

export type Actions =
  | GetAll
  | GetAllSuccess
  | GetAllFailure
  | Get
  | GetSuccess
  | GetFailure;
