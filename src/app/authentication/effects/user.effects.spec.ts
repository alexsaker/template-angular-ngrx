import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { cold, hot, getTestScheduler } from "jasmine-marbles";
import { empty } from "rxjs/observable/empty";
import { UserEffects } from "./user.effects";
import { UserService } from "../services/user.service";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import * as UserActions from "../actions/user.actions";
import { UserToken, UserCredentials } from "../models/user.models";
import { Router } from "@angular/router";
import { MockStore } from "../../../../mock/mock-ngrx/mock-store";
import { StoreModule, Store, Action } from "@ngrx/store";
import { Response, ResponseOptions } from "@angular/http";
import {
  TestActions,
  getActions
} from "../../../../mock/mock-actions/mock-actions";

describe("UserEffects", () => {
  let effects: UserEffects;
  let userService: any;
  let actions: TestActions;
  let router: Router;
  const storeInitialState: Object = {
    authentication: {
      user: {
        loading: false,
        error: null
      }
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        {
          provide: UserService,
          useValue: jasmine.createSpyObj("UserService", ["login"])
        },
        { provide: Actions, useFactory: getActions },
        {
          provide: Router,
          useValue: jasmine.createSpyObj("Router", ["navigate"])
        },
        { provide: Store, useValue: new MockStore(storeInitialState) }
      ]
    });

    effects = TestBed.get(UserEffects);
    userService = TestBed.get(UserService);
    actions = TestBed.get(Actions);
    router = TestBed.get(Router);
  });

  describe("Login", () => {
    it("should login as a user", () => {
      spyOn(Storage.prototype, "setItem");
      const userCredentials = {
        user: "admin",
        password: "admin"
      } as UserCredentials;
      const userToken = { token: "token" } as UserToken;
      const action = new UserActions.Login(userCredentials);
      const completion = new UserActions.LoginSuccess(userToken);
      actions.stream = hot("-a", { a: action });
      const response = cold("-b", { b: userToken });
      const expected = cold("-c", { c: completion });
      userService.login.and.returnValue(of({ token: "token" }));
      expect(effects.userLogin).toBeObservable(expected);
      expect(localStorage.setItem).toHaveBeenCalled();
    });
    it("should return an error when super admin login fails", () => {
      const userCredentials = {
        user: "johndoe@github.com",
        password: "pwd"
      } as UserCredentials;
      const userToken = { token: "token" } as UserToken;
      const error = new Error("Error");

      const action = new UserActions.Login(userCredentials);
      const completion = new UserActions.LoginFailure({
        name: "Error",
        message: "Error"
      });

      actions.stream = hot("-a", { a: action });
      const response = cold("-#", {}, error);
      const expected = cold("--c", { c: completion });
      userService.login.and.returnValue(response);
      expect(effects.userLogin).toBeObservable(expected);
    });
  });

  describe("Login Success", () => {
    it("should redirect to default page when LOGIN_SUCCESS dispatched", () => {
      const userToken = { token: "token" } as UserToken;
      const action = new UserActions.LoginSuccess(userToken);
      actions.stream = hot("-a", { a: action });
      const response = cold("-b", { b: action });
      const expected = cold("-c", { c: action });
      expect(effects.userLoginSuccess).toBeObservable(expected);
      expect(router.navigate).toHaveBeenCalledWith([""]);
    });
  });

  describe("Login Redirect", () => {
    beforeEach(() => {
      spyOn(Storage.prototype, "removeItem");
    });
    it("should redirect to user login page when LOGIN_REDIRECT action dispatched", () => {
      const action = new UserActions.LoginRedirect();
      actions.stream = hot("-a", { a: action });
      const response = cold("-b", { b: action });
      const expected = cold("-c", { c: action });
      expect(effects.userLoginRedirect).toBeObservable(expected);
      expect(router.navigate).toHaveBeenCalledWith([
        "/authentication/user/login"
      ]);
      expect(localStorage.removeItem).toHaveBeenCalled();
    });
    it("should redirect to user login page when LOGOUT action dispatched", () => {
      const action = new UserActions.Logout();
      actions.stream = hot("-a", { a: action });
      const response = cold("-b", { b: action });
      const expected = cold("-c", { c: action });
      expect(effects.userLoginRedirect).toBeObservable(expected);
      expect(router.navigate).toHaveBeenCalledWith([
        "/authentication/user/login"
      ]);
      expect(localStorage.removeItem).toHaveBeenCalled();
    });
  });
});
