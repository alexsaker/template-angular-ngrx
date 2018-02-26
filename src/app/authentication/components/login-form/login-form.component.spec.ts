import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";

import { FormGroup, FormBuilder } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { StoreModule, Store, Action } from "@ngrx/store";
import { LoginFormComponent } from "./login-form.component";
import { MockStore } from "../../../../../mock/mock-ngrx/mock-store";
import { CoreModule } from "../../../core/core.module";
import { MatFormFieldModule, MatInputModule } from "@angular/material";

describe("LoginFormComponent", async () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let router: Router;
  const storeInitialState: Object = {
    authentication: {
      user: {
        error: null,
        loading: false
      }
    }
  };
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MatFormFieldModule,
          MatInputModule,
          CoreModule,
          ReactiveFormsModule,
          RouterTestingModule
        ],
        declarations: [LoginFormComponent],
        providers: [
          FormBuilder,
          { provide: Store, useValue: new MockStore(storeInitialState) },
          {
            provide: Router,
            useValue: jasmine.createSpyObj("Router", ["navigate"])
          }
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    component.type = "user";
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should to not be valid when empty", () => {
    expect(component.myForm.valid).toBeFalsy();
  });

  it("should create a form with 1 control when type different from super-admin", () => {
    expect(component.myForm instanceof FormGroup).toBeTruthy();
    expect(Object.keys(component.myForm.controls).length).toEqual(2);
  });

  it('should set password input type to "password"', () => {
    expect(component.passwordInputType).toEqual("password");
  });

  it("should toggle password input type", () => {
    component.toggleInputType();
    expect(component.passwordInputType).toEqual("text");
  });
  it("should emit form with form data", () => {
    spyOn(component.formData, "emit");
    component.myForm.controls["user"].setValue("user");
    component.myForm.controls["password"].setValue("password");
    component.emitForm();

    expect(component.myForm.valid).toBeTruthy();
    expect(component.formData.emit).toHaveBeenCalled();
  });
});
