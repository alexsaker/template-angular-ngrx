import { reducer } from "./user.reducer";
import * as fromUser from "./user.reducer";
import * as UserActions from "../actions/user.actions";
import { UserToken, UserCredentials } from "../models/user.models";
import { Action } from "@ngrx/store";

describe("UserReducer", () => {
  describe("undefined action", () => {
    it("should return the default state", () => {
      const action = {} as any;

      const result = reducer(undefined, action);
      expect(result).toEqual(fromUser.initialState);
    });
  });

  describe("LOGIN action", () => {
    it("should set user value in user state", () => {
      const userCredentials = { password: "test" } as UserCredentials;
      const loginAction = new UserActions.Login(userCredentials);

      const expectedResult = {
        token: null,
        loading: true,
        error: null
      };

      const result = reducer(fromUser.initialState, loginAction);
      expect(result).toEqual(jasmine.objectContaining(expectedResult));
    });
  });

  describe("LOGIN_SUCCESS action", () => {
    it("should set isLoggedIn to true in user state", () => {
      const user = { token: "test" } as UserToken;
      const loginSuccessAction = new UserActions.LoginSuccess(user);

      const expectedResult = {
        token: "test",
        loading: false,
        error: null
      };

      const result = reducer(fromUser.initialState, loginSuccessAction);
      expect(result).toEqual(jasmine.objectContaining(expectedResult));
    });
  });

  describe("LOGIN_FAILURE action", () => {
    it("should set error in user state when login fails", () => {
      const userError = new Error("error");
      const loginErrorAction = new UserActions.LoginFailure(userError);

      const expectedResult = {
        token: null,
        loading: false,
        error: new Error("error")
      };

      const result = reducer(fromUser.initialState, loginErrorAction);
      expect(result).toEqual(jasmine.objectContaining(expectedResult));
    });
  });

  describe("LOGOUT action", () => {
    it("should logout a user", () => {
      const initialState = {
        token: "test",
        loading: false,
        error: null
      } as fromUser.State;
      const logoutAction = new UserActions.Logout();

      const expectedResult = {
        token: null,
        loading: false,
        error: null
      };

      const result = reducer(initialState, logoutAction);
      expect(result).toEqual(jasmine.objectContaining(expectedResult));
    });
  });
});
