import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/exhaustMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/take";
import "rxjs/add/operator/withLatestFrom";
import "rxjs/add/operator/filter";
import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, Params } from "@angular/router";
import { Effect, Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs/observable/of";
import { Observable } from "rxjs/Observable";
import {
  RouterAction,
  ROUTER_NAVIGATION,
  RouterNavigationAction
} from "@ngrx/router-store";

import { AuthenticationState } from "../reducers";
import { UserService } from "../services/user.service";
import * as UserActions from "../actions/user.actions";
import { UserToken } from "../models/user.models";
import { ErrorUtils } from "../../shared/effects.utils";

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private userService: UserService,
    private router: Router,
    private store: Store<AuthenticationState>
  ) {}

  @Effect()
  userLogin = this.actions
    .ofType(UserActions.LOGIN)
    .map((action: UserActions.Login) => action.payload)
    .exhaustMap(user =>
      this.userService
        .login(user)
        .map(loginResult => {
          localStorage.setItem("token", loginResult.token);
          return new UserActions.LoginSuccess(loginResult as UserToken);
        })
        .catch(error =>
          of(new UserActions.LoginFailure(ErrorUtils.extractError(error)))
        )
    );

  @Effect({ dispatch: false })
  userLoginSuccess = this.actions.ofType(UserActions.LOGIN_SUCCESS).do(() => {
    this.router.navigate([""]);
  });

  @Effect({ dispatch: false })
  userLoginRedirect = this.actions
    .ofType(UserActions.LOGIN_REDIRECT, UserActions.LOGOUT)
    .do(() => {
      localStorage.removeItem("token");
      this.router.navigate(["/authentication/user/login"]);
    });
}
