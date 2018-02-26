import "rxjs/add/operator/take";
import "rxjs/add/operator/map";
import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import * as UserActions from "../actions/user.actions";
import * as fromAuthentication from "../reducers";

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private store: Store<fromAuthentication.State>) {}

  canActivate(): Observable<boolean> {
    return this.store
      .select(fromAuthentication.getIsUserLoggedIn)
      .take(1)
      .map(isLoggedIn => {
        if (!isLoggedIn) {
          this.store.dispatch(new UserActions.LoginRedirect());
          return false;
        }
        return true;
      });
  }
}
