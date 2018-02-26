import { reducer } from "./user.reducer";
import * as fromUser from "./user.reducer";
import * as userActions from "../actions/user.actions";
import { User } from "../models/user.models";
import { Action } from "@ngrx/store";
import DataMockUsers from "../../../../mock/mock-data/mock-users";

describe("userReducer", () => {
  describe("undefined action", () => {
    it("should return the default state", () => {
      const action = {} as any;

      const result = reducer(undefined, action);
      expect(result).toEqual(fromUser.initialState);
    });
  });

  describe("GETALL action", () => {
    it("should set loading to true in users state", () => {
      const getAllAction = new userActions.GetAll();

      const expectedResult = {
        ids: [],
        entities: {},
        loaded: false,
        loading: true,
        error: null,
        toast: null,
        selected: null
      };

      const result = reducer(fromUser.initialState, getAllAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("GETALL_SUCCESS action", () => {
    it("should set entities object, ids array  and loading to false in users state", () => {
      const getAllSuccessAction = new userActions.GetAllSuccess({
        users: DataMockUsers
      });
      const expectedResult = {
        ids: DataMockUsers.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        ).map(user => user["id"]),
        entities: DataMockUsers.reduce((acc, current) => {
          acc[current["id"]] = current;
          return acc;
        }, {}),
        loaded: true,
        loading: false,
        error: null,
        toast: null,
        selected: null
      };
      const result = reducer(fromUser.initialState, getAllSuccessAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("GETALL_FAILURE action", () => {
    it("should set error in users state", () => {
      const getAllError = new Error("error");
      const getAllFailureAction = new userActions.GetAllFailure(getAllError);

      const expectedResult = {
        ids: [],
        entities: {},
        loaded: false,
        loading: false,
        error: getAllError,
        toast: null,
        selected: null
      };

      const result = reducer(fromUser.initialState, getAllFailureAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("GET action", () => {
    it("should set loading to true in users state", () => {
      const getAction = new userActions.Get(1);

      const expectedResult = {
        ids: [],
        entities: {},
        loaded: false,
        loading: true,
        error: null,
        toast: null,
        selected: null
      };
      const result = reducer(fromUser.initialState, getAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("GET_SUCCESS action", () => {
    it("should set entities object, ids array  and loading to false in users state", () => {
      const userValue = DataMockUsers[0] as User;
      const getSuccessAction = new userActions.GetSuccess({ user: userValue });
      const userValueEntities = {};
      userValueEntities[userValue["id"]] = userValue;
      const userIds = [userValue["id"]];
      const expectedResult = {
        ids: userIds,
        entities: userValueEntities,
        loaded: true,
        loading: false,
        error: null,
        toast: null,
        selected: null
      };

      const result = reducer(fromUser.initialState, getSuccessAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("GET_FAILURE action", () => {
    it("should set error in users state", () => {
      const getError = new Error("error");
      const getFailureAction = new userActions.GetFailure(getError);

      const expectedResult = {
        ids: [],
        entities: {},
        loaded: false,
        loading: false,
        error: getError,
        toast: { type: "error", action: "GET_FAILURE" },
        selected: null
      };

      const result = reducer(fromUser.initialState, getFailureAction);
      expect(result).toEqual(expectedResult);
    });
  });
});
