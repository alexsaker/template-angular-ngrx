import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { cold, hot, getTestScheduler } from "jasmine-marbles";
import {
  TestActions,
  getActions
} from "../../../../mock/mock-actions/mock-actions";
import { UserEffects } from "./user.effects";
import { UserService } from "../services/user.service";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import * as UserActions from "../actions/user.actions";
import { User } from "../models/user.models";
import { Router } from "@angular/router";
import { MockStore } from "../../../../mock/mock-ngrx/mock-store";
import { StoreModule, Store, Action } from "@ngrx/store";
import { Response, ResponseOptions } from "@angular/http";
import DataMockUsers from "../../../../mock/mock-data/mock-users";

describe("UserEffects", () => {
  let effects: UserEffects;
  let userService: any;
  let actions: TestActions;
  let router: Router;
  let store: any;
  const storeInitialState: Object = {
    users: {
      ids: [],
      entities: {},
      error: null
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        {
          provide: UserService,
          useValue: jasmine.createSpyObj("UserService", ["getAll"])
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
    store = TestBed.get(Store);
  });

  describe("GetAll", () => {
    it("should get all users", () => {
      const action = new UserActions.GetAll();
      const completion = new UserActions.GetAllSuccess({
        users: DataMockUsers
      });
      actions.stream = hot("-a", { a: action });
      const response = cold("-b", { b: DataMockUsers });
      const expected = cold("-c", { c: completion });
      userService.getAll.and.returnValue(
        of(new Response(new ResponseOptions({ body: DataMockUsers })))
      );
      expect(effects.usersGetAll).toBeObservable(expected);
    });
  });
});
