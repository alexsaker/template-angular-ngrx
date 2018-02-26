import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { cold, hot, getTestScheduler } from "jasmine-marbles";
import {
  TestActions,
  getActions
} from "../../../../mock/mock-actions/mock-actions";
import { PostEffects } from "./post.effects";
import { PostService } from "../services/post.service";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import * as PostActions from "../actions/post.actions";
import { Post } from "../models/post.models";
import { Router } from "@angular/router";
import { MockStore } from "../../../../mock/mock-ngrx/mock-store";
import { StoreModule, Store, Action } from "@ngrx/store";
import { Response, ResponseOptions } from "@angular/http";
import DataMockPosts from "../../../../mock/mock-data/mock-posts";

describe("PostEffects", () => {
  let effects: PostEffects;
  let postService: any;
  let actions: TestActions;
  let router: Router;
  let store: any;
  const storeInitialState: Object = {
    posts: {
      ids: [],
      entities: {},
      error: null
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostEffects,
        {
          provide: PostService,
          useValue: jasmine.createSpyObj("PostService", ["getAll"])
        },
        { provide: Actions, useFactory: getActions },
        {
          provide: Router,
          useValue: jasmine.createSpyObj("Router", ["navigate"])
        },
        { provide: Store, useValue: new MockStore(storeInitialState) }
      ]
    });

    effects = TestBed.get(PostEffects);
    postService = TestBed.get(PostService);
    actions = TestBed.get(Actions);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
  });

  describe("GetAll", () => {
    it("should get all posts", () => {
      const action = new PostActions.GetAll();
      const completion = new PostActions.GetAllSuccess({
        posts: DataMockPosts
      });
      actions.stream = hot("-a", { a: action });
      const response = cold("-b", { b: DataMockPosts });
      const expected = cold("-c", { c: completion });
      postService.getAll.and.returnValue(
        of(new Response(new ResponseOptions({ body: DataMockPosts })))
      );
      expect(effects.postsGetAll).toBeObservable(expected);
    });
  });
});
