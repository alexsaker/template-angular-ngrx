import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from "@angular/core/testing";
import { MockStore } from "../../../../../mock/mock-ngrx/mock-store";
import { StoreModule, Store, Action } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DATA,
  MatSnackBar
} from "@angular/material/snack-bar";

import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SnackbarErrorsComponent } from "./snackbar-errors.component";



describe("SnackbarErrorsComponent", () => {
  let component: SnackbarErrorsComponent;
  let fixture: ComponentFixture<SnackbarErrorsComponent>;
  let scrollbar: any;
  let snackBar: any;
  const storeInitialState: Object = {};
  const errorList = [
    { name: "ErrorName", message: "ErorrMessage" },
    { name: "ErrorName", message: "ErorrMessage2" }
  ];
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MatSnackBarModule
        ],
        declarations: [SnackbarErrorsComponent],
        providers: [
          {
            provide: MAT_SNACK_BAR_DATA,
            useValue: { errors: errorList }
          },
          MatSnackBar,
          { provide: Store, useValue: new MockStore(storeInitialState) }
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarErrorsComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.get(MatSnackBar);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it(
    "should initialyze",
    () => {
      expect(component.errors).toEqual(errorList);

    }
  );

  it("should dismiss snackbar", () => {
    component.snackbarErrorsComponent = snackBar;
    spyOn(component.snackbarErrorsComponent, "dismiss");
    component.dismissSnackbar();
    expect(component.snackbarErrorsComponent.dismiss).toHaveBeenCalled();
  });


});
