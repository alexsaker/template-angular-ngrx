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
import * as fromPosts from "../reducers/post.reducer";
import { ErrorUtils } from "../../shared/effects.utils";
import { PostService } from "../services/post.service";
import * as PostActions from "../actions/post.actions";
import { Post } from "../models/post.models";
import { Observable } from "rxjs/Observable";

@Injectable()
export class PostEffects {
  constructor(
    private actions: Actions,
    private postService: PostService,
    private router: Router,
    private store: Store<State>
  ) {}

  @Effect()
  postsGetAll = this.actions
    .ofType(PostActions.GETALL)
    .exhaustMap(() =>
      this.postService
        .getAll()
        .map(res => res.json() || [])
        .map(
          getAllResult => new PostActions.GetAllSuccess({ posts: getAllResult })
        )
        .catch(error =>
          of(new PostActions.GetAllFailure(ErrorUtils.extractError(error)))
        )
    );
}
