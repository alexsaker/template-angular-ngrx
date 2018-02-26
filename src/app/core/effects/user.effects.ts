import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/exhaustMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/take";
import "rxjs/add/operator/withLatestFrom";
import "rxjs/add/operator/filter";
import { of } from "rxjs/observable/of";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Effect, Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { State } from "../reducers";
import * as fromCore from "../reducers";
import * as fromUsers from "../reducers/user.reducer";
import { ErrorUtils } from "../../shared/effects.utils";
import { UserService } from "../services/user.service";
import * as UserActions from "../actions/user.actions";
import { User } from "../models/user.models";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private userService: UserService,
    private router: Router,
    private store: Store<State>
  ) {}

  @Effect()
  usersGetAll = this.actions
    .ofType(UserActions.GETALL)
    .exhaustMap(() =>
      this.userService
        .getAll()
        .map(res => res.json() || [])
        .map(
          getAllResult => new UserActions.GetAllSuccess({ users: getAllResult })
        )
        .catch(error =>
          of(new UserActions.GetAllFailure(ErrorUtils.extractError(error)))
        )
    );
}
