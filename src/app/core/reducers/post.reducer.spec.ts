import { reducer } from "./post.reducer";
import * as fromPost from "./post.reducer";
import * as postActions from "../actions/post.actions";
import { Post } from "../models/post.models";
import { Action } from "@ngrx/store";
import DataMockPosts from "../../../../mock/mock-data/mock-posts";

describe("postReducer", () => {
  describe("undefined action", () => {
    it("should return the default state", () => {
      const action = {} as any;

      const result = reducer(undefined, action);
      expect(result).toEqual(fromPost.initialState);
    });
  });

  describe("GETALL action", () => {
    it("should set loading to true in posts state", () => {
      const getAllAction = new postActions.GetAll();

      const expectedResult = {
        ids: [],
        entities: {},
        loaded: false,
        loading: true,
        error: null,
        toast: null
      };

      const result = reducer(fromPost.initialState, getAllAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("GETALL_SUCCESS action", () => {
    it("should set entities object, ids array  and loading to false in posts state", () => {
      const getAllSuccessAction = new postActions.GetAllSuccess({
        posts: DataMockPosts
      });
      const expectedResult = {
        ids: DataMockPosts.sort((a: any, b: any) =>
          a.title.localeCompare(b.title)
        ).map(user => user["id"]),
        entities: DataMockPosts.reduce((acc, current) => {
          acc[current["id"]] = current;
          return acc;
        }, {}),
        loaded: true,
        loading: false,
        error: null,
        toast: null
      };
      const result = reducer(fromPost.initialState, getAllSuccessAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("GETALL_FAILURE action", () => {
    it("should set error in posts state", () => {
      const getAllError = new Error("error");
      const getAllFailureAction = new postActions.GetAllFailure(getAllError);

      const expectedResult = {
        ids: [],
        entities: {},
        loaded: false,
        loading: false,
        error: getAllError,
        toast: null
      };

      const result = reducer(fromPost.initialState, getAllFailureAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("GET action", () => {
    it("should set loading to true in posts state", () => {
      const getAction = new postActions.Get(1);

      const expectedResult = {
        ids: [],
        entities: {},
        loaded: false,
        loading: true,
        error: null,
        toast: null
      };
      const result = reducer(fromPost.initialState, getAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("GET_SUCCESS action", () => {
    it("should set entities object, ids array  and loading to false in posts state", () => {
      const postValue = DataMockPosts[0] as Post;
      const getSuccessAction = new postActions.GetSuccess({ post: postValue });
      const postValueEntities = {};
      postValueEntities[postValue["id"]] = postValue;
      const postIds = [postValue["id"]];
      const expectedResult = {
        ids: postIds,
        entities: postValueEntities,
        loaded: true,
        loading: false,
        error: null,
        toast: null
      };

      const result = reducer(fromPost.initialState, getSuccessAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("GET_FAILURE action", () => {
    it("should set error in posts state", () => {
      const getError = new Error("error");
      const getFailureAction = new postActions.GetFailure(getError);

      const expectedResult = {
        ids: [],
        entities: {},
        loaded: false,
        loading: false,
        error: getError,
        toast: { type: "error", action: "GET_FAILURE" }
      };

      const result = reducer(fromPost.initialState, getFailureAction);
      expect(result).toEqual(expectedResult);
    });
  });
});
