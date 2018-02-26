import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
  MatMenuModule,
  MatButtonModule,
  MatExpansionModule,
  MatIconModule
} from "@angular/material";
import { SidenavMenuComponent } from "./sidenav-menu.component";
import { Router } from "@angular/router";
import { of } from "rxjs/observable/of";
import { MockStore } from "../../../../../mock/mock-ngrx/mock-store";
import { StoreModule, Store, Action } from "@ngrx/store";
import * as UserActions from "../../actions/user.actions";
import DataMockUsers from "../../../../../mock/mock-data/mock-users";

describe("SidenavMenuComponent", () => {
  let component: SidenavMenuComponent;
  let fixture: ComponentFixture<SidenavMenuComponent>;
  let store: any;
  const router = {
    navigate: jasmine.createSpy("navigate"),
    events: of()
  };

  const storeInitialState: Object = {
    layout: {
      sidenavMenuOpened: true,
      sidenavFormOpened: true
    },
    authentication: {
      user: {
        token: "token",
        error: false
      }
    },
    users: {
      ids: DataMockUsers.map(user => user["id"]),
      entities: DataMockUsers.reduce((acc, current) => {
        acc[current["id"]] = current;
        return acc;
      }, {})
    }
  };
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [SidenavMenuComponent],
        imports: [
          BrowserAnimationsModule,
          MatMenuModule,
          MatButtonModule,
          MatIconModule,
          MatExpansionModule,
          RouterTestingModule
        ],
        providers: [
          { provide: Store, useValue: new MockStore(storeInitialState) },
          { provide: Router, useValue: router }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.get(Store);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
