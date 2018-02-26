import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/take";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Effect, Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import {
  RouterAction,
  ROUTER_NAVIGATION,
  RouterNavigationAction
} from "@ngrx/router-store";

import { State } from "../../reducers";
import * as fromRoot from "../../reducers";
import * as fromAuth from "../../authentication/reducers";

import * as UserActions from "../actions/user.actions";
import * as PostActions from "../actions/post.actions";

/**
 * This class needs to be updated in order to optimize and preload needed data when
 * specific routes are hit
 */

@Injectable()
export class CoreRoutingEffects {
  constructor(
    private actions: Actions,
    private router: Router,
    private store: Store<State>
  ) {}

  @Effect({ dispatch: false })
  navigateToUsers = this.actions
    .ofType(ROUTER_NAVIGATION)
    .map((r: RouterNavigationAction) => r.payload.routerState.url)
    .filter(s => s.match(new RegExp("^/users")) !== null)
    .do(url => {
      const userId = url.split("/").pop();
      if (userId) {
        this.store.dispatch(new UserActions.Select(parseInt(userId)));
      }
      this.getUsersFromStoreOrAPI();
      this.getPostsFromStoreOrAPI();
    });

  private getUsersFromStoreOrAPI() {
    this.store
      .select(fromRoot.getUsersLoaded)
      .take(1)
      .subscribe(loaded => {
        if (!loaded) {
          this.store.dispatch(new UserActions.GetAll());
        }
      });
  }
  private getPostsFromStoreOrAPI() {
    this.store
      .select(fromRoot.getPostsLoaded)
      .take(1)
      .subscribe(loaded => {
        if (!loaded) {
          this.store.dispatch(new PostActions.GetAll());
        }
      });
  }
}
