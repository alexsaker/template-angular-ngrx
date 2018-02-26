import { TestBed } from "@angular/core/testing";
import { StoreModule, Store } from "@ngrx/store";
import { RouterTestingModule } from "@angular/router/testing";
import { LoggedInGuard } from "./logged-in.guard";
import { MockStore } from "../../../../mock/mock-ngrx/mock-store";
describe("LoggedInGuard", () => {
  describe("Cannot activate when user don't have a token", () => {
    let loggedInGuard: LoggedInGuard;
    let store: any;
    beforeEach(() => {
      const authenticationStateMock: Object = {
        authentication: {
          user: {
            token: null
          }
        }
      };
      TestBed.configureTestingModule({
        providers: [
          LoggedInGuard,
          { provide: Store, useValue: new MockStore(authenticationStateMock) }
        ],
        imports: [RouterTestingModule]
      });
      loggedInGuard = TestBed.get(LoggedInGuard);
      store = TestBed.get(Store);
    });

    it("should return false when user is not logged in", async () => {
      spyOn(store, "dispatch").and.callThrough();
      loggedInGuard.canActivate().subscribe(result => {
        expect(result).toBe(false);
        expect(store.dispatch).toHaveBeenCalled();
      });
    });
  });
  describe("Canactivate when only user has token", () => {
    let loggedInGuard: LoggedInGuard;
    let store: any;
    beforeEach(() => {
      const authenticationStateMock: Object = {
        authentication: {
          user: {
            token: "token"
          }
        }
      };
      TestBed.configureTestingModule({
        providers: [
          { provide: Store, useValue: new MockStore(authenticationStateMock) },
          LoggedInGuard
        ],
        imports: [RouterTestingModule]
      });
      loggedInGuard = TestBed.get(LoggedInGuard);
      store = TestBed.get(Store);
    });
  });
});
