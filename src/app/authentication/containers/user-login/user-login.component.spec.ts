import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginFormComponent } from "../../components/login-form/login-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { StoreModule, Store, Action } from "@ngrx/store";
import { of } from "rxjs/observable/of";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { CoreModule } from "../../../core/core.module";
import { UserLoginComponent } from "./user-login.component";
import { MockStore } from "../../../../../mock/mock-ngrx/mock-store";
import * as UserActions from "../../actions/user.actions";

describe("UserLoginComponent", async () => {
  describe("Login error managenement", async () => {
    let component: UserLoginComponent;
    let fixture: ComponentFixture<UserLoginComponent>;
    let store: Store<any>;
    const storeInitialState: Object = {
      authentication: {
        user: {
          loading: false,
          error: new Error("Error")
        }
      }
    };

    beforeEach(
      async(() => {
        TestBed.configureTestingModule({
          imports: [
            CoreModule,
            MatInputModule,
            ReactiveFormsModule,
            RouterTestingModule
          ],
          declarations: [UserLoginComponent, LoginFormComponent],
          providers: [
            { provide: Store, useValue: new MockStore(storeInitialState) }
          ],
          schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
      })
    );

    beforeEach(async () => {
      fixture = TestBed.createComponent(UserLoginComponent);
      component = fixture.componentInstance;
      store = TestBed.get(Store);
      fixture.detectChanges();
    });

    it("should create", async () => {
      expect(component).toBeTruthy();
    });
  });

  describe("Get submitted form", async () => {
    let component: UserLoginComponent;
    let fixture: ComponentFixture<UserLoginComponent>;
    let store: Store<any>;
    const storeInitialState: Object = {
      authentication: {
        user: {
          loading: false,
          error: null
        }
      }
    };

    beforeEach(
      async(() => {
        TestBed.configureTestingModule({
          imports: [
            CoreModule,
            MatInputModule,
            ReactiveFormsModule,
            RouterTestingModule
          ],
          declarations: [UserLoginComponent, LoginFormComponent],
          providers: [
            { provide: Store, useValue: new MockStore(storeInitialState) }
          ],
          schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
      })
    );

    beforeEach(async () => {
      fixture = TestBed.createComponent(UserLoginComponent);
      component = fixture.componentInstance;
      store = TestBed.get(Store);
      fixture.detectChanges();
    });

    it("should get errors from the store on initialisation", () => {
      const formData = { user: "johndoe@test.com", password: "test" };
      spyOn(store, "dispatch");
      component.getSubmittedForm(formData);
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserActions.Login(formData)
      );
    });
  });
});
