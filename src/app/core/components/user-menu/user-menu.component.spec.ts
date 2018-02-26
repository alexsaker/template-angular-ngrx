import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync
} from "@angular/core/testing";

import { HttpClientModule } from "@angular/common/http";
import { MockStore } from "../../../../../mock/mock-ngrx/mock-store";
import { StoreModule, Store, Action } from "@ngrx/store";
import {
  MatMenuModule,
  MatButtonModule,
  MatIconModule
} from "@angular/material";
import { UserMenuComponent } from "./user-menu.component";
import * as fromAuth from "../../../authentication/reducers";

describe("UserMenuComponent", () => {
  let component: UserMenuComponent;
  let fixture: ComponentFixture<UserMenuComponent>;
  let store: Store<any>;
  const storeInitialState: Object = {
    layout: {
      sidenavMenuOpened: true,
      theme: "cyan-theme"
    },
    authentication: {
      user: {
        error: null,
        loading: false,
        token: null
      }
    }
  };
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [UserMenuComponent],
        imports: [
          HttpClientModule,
          MatMenuModule,
          MatButtonModule,
          MatIconModule
        ],
        providers: [
          { provide: Store, useValue: new MockStore(storeInitialState) }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, "select").and.callThrough();
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should have menu closed", () => {
    expect(component.isMenuClosed).toBeTruthy();
  });
});
